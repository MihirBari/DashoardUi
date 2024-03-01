import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Tag } from "primereact/tag";
import API_BASE_URL from "../../config";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import ExportTable from "./ExportTable";
import { toast } from "react-toastify";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const generateMarketColumns = (marketData, usersData) => {
  return marketData.map((marketItem) => ({
    name: marketItem.place,
    selector: (row) => {
      const costPrice = row.Final_cost;
      const percent = marketItem.percent;
      const newPrice = costPrice + (costPrice * percent) / 100;
      return newPrice.toFixed(2);
    },
    sortable: true,
    filterValue:
      marketItem.place && typeof marketItem.place === "string"
        ? marketItem.place.toLowerCase()
        : "",
  }));
};

export default function ProductTable() {
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState(null);
  const [market, setMarket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exportModalIsOpen, setExportModalIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();
  const [statuses] = useState(["active", "Close", "upcoming", "Draft"]);

  const getSeverity = (status) => {
    switch (status) {
      case "active":
        return "danger";

      case "Close":
        return "success";

      case "upcoming":
        return "info";

      case "Draft":
        return "warning";

      default:
        return null;
    }
  };

  const handleExportClick = () => {
    setExportModalIsOpen(true);
  };

  const handleViewClick = (row) => {
    navigate(`${row.product_id}`);
  };

  const handleEditClick = (row) => {
    navigate(`edit/${row.product_id}`);
  };

  const handleDeleteClick = (row) => {
    const productId = row.product_id;
    axios
      .delete(`${API_BASE_URL}/api/prod/delete`, { data: { productId } })
      .then((response) => {
        window.location.reload();
        toast.success("Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(
          `${API_BASE_URL}/api/prod/inventory`
        );
        const marketResponse = await axios.get(
          `${API_BASE_URL}/api/market/showMarket`
        );

        const [orders, marketData] = await Promise.all([
          ordersResponse,
          marketResponse,
        ]);

        const customersData = getCustomers(orders.data);

        setCustomers(customersData);
        setMarket(marketData.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  const formatDate = (value) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      product_id: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue("");
  };

  const clearFilter = () => {
    if (filters !== null) {
      initFilters();
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
        <span className="p-input-icon-left">
          {/* <i className="pi pi-search" /> */}
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{rowData.product_id}</span>
      </div>
    );
  };

  const filterClearTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        severity="secondary"
      ></Button>
    );
  };

  const filterApplyTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-check"
        onClick={options.filterApplyCallback}
        severity="success"
      ></Button>
    );
  };

  const filterFooterTemplate = () => {
    return (
      <div className="px-3 pt-0 pb-3 text-center">Filter by Product ID</div>
    );
  };

  const dateBodyTemplate = (rowData) => {
    // Parse the date string into a Date object
    const date = new Date(rowData.created_at);
    // Check if the date is valid before formatting it
    if (!isNaN(date.getTime())) {
      return formatDate(date);
    } else {
      return "Invalid Date";
    }
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const balanceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.product_price);
  };

  const balanceBodyTemplate1 = (rowData) => {
    return formatCurrency(rowData.Final_cost);
  };

  const balanceBodyTemplate2 = (rowData) => {
    return rowData.Stock;
  };

  const balanceFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        placeholder="Price"
        onChange={(e) => options.filterCallback(e.value, options.index)}
        mode="currency"
        currency="INR"
        locale="en-US"
      />
    );
  };

  const balanceFilterTemplate1 = (options) => {
    return (
      <InputNumber
        value={options.value}
        placeholder="Stock"
        onChange={(e) => options.filterCallback(e.value, options.index)}
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const statusBodyTemplate1 = (rowData) => {
    return rowData.product_type;
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const marketColumns = generateMarketColumns(market, users);

  const header = renderHeader();

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleExportClick}
      >
        Export
      </button>
      <ExportTable
        filters={filters} // Pass filters as props
        marketColumns={marketColumns} // Pass marketColumns as props
        isOpen={exportModalIsOpen}
        onRequestClose={() => setExportModalIsOpen(false)}
      />
      <DataTable
        value={customers}
        paginator
        stripedRows
        showGridlines
        rows={30}
        rowsPerPageOptions={[30, 40, 50, 60]}
        loading={loading}
        dataKey="id"
        filters={filters}
        globalFilterFields={[
          "name",
          "product_id",
          "representative.name",
          "balance",
          "status",
        ]}
        header={header}
        emptyMessage="No customers found."
      >
        <Column
          field="product_name"
          header="Product Name"
          filter
          filterPlaceholder="Search by name"
          sortable
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Product ID"
          filterField="product_id"
          style={{ minWidth: "10rem" }}
          body={countryBodyTemplate}
          filter
          filterPlaceholder="Search by ID"
          filterClear={filterClearTemplate}
          filterApply={filterApplyTemplate}
          filterFooter={filterFooterTemplate}
        />
        <Column
          header="Selling Price"
          filterField="product_price"
          dataType="numeric"
          style={{ minWidth: "11rem" }}
          filterPlaceholder="Search by Price"
          body={balanceBodyTemplate}
          filter
          filterElement={balanceFilterTemplate}
        />
        <Column
          header="Cost Price"
          filterField="Final_cost"
          dataType="numeric"
          style={{ minWidth: "10rem" }}
          filterPlaceholder="Search by Price"
          body={balanceBodyTemplate1}
          filter
          filterElement={balanceFilterTemplate}
        />
        <Column
          header="Stock"
          filterField="Stock"
          dataType="numeric"
          style={{ minWidth: "4rem" }}
          body={balanceBodyTemplate2}
          filter
          filterElement={balanceFilterTemplate1}
          filterPlaceholder="Search by Stock"
        />
        <Column
          field="status"
          header="Status"
          filterMenuStyle={{ width: "4rem" }}
          style={{ minWidth: "12rem" }}
          body={statusBodyTemplate}
          filter
          filterElement={statusFilterTemplate}
          filterPlaceholder="Search by Status"
        />
        <Column
          field="status"
          header="Type"
          filterMenuStyle={{ width: "4rem" }}
          style={{ minWidth: "12rem" }}
          body={statusBodyTemplate1}
          filter
          filterElement={statusFilterTemplate}
        />

        {marketColumns.map((column, index) => (
          <Column
            key={index}
            field={column.name}
            header={column.name}
            body={column.selector}
          />
        ))}

        <Column
          header="Created At"
          filterField="date"
          dataType="date"
          style={{ minWidth: "10rem" }}
          body={dateBodyTemplate}
          filter
          filterElement={dateFilterTemplate}
        />

        <Column
          header="View"
          body={(rowData) => (
            <button onClick={() => handleViewClick(rowData)}>
              <FaEye />
            </button>
          )}
        />

        <Column
          header="Edit"
          body={(rowData) => (
            <button onClick={() => handleEditClick(rowData)}>
              <MdEdit />
            </button>
          )}
        />

        <Column
          header="Delete"
          body={(rowData) => (
            <button onClick={() => handleDeleteClick(rowData)}>
              <MdDelete />
            </button>
          )}
        />
      </DataTable>
    </div>
  );
}
