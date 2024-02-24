import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import API_BASE_URL from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiFilter } from "react-icons/ci";
import ExportTable from "./ExportTable";
import FilterModal from "./FilterModal";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const TableProduct = () => {
  const [users, setUsers] = useState([]);
  const [market, setMarket] = useState([]);
  const [exportModalIsOpen, setExportModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [status, setStatus] = useState("");
  const [costPriceMin, setCostPriceMin] = useState("");
  const [costPriceMax, setCostPriceMax] = useState("");
  const [dateFilterType, setDateFilterType] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Today's date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State variable for delete confirmation dialog
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      return JSON.parse(savedFilters);
    } else {
      return {
        searchText: "",
        productName: "",
        productType: "",
        status: "",
        costPriceMin: "",
        costPriceMax: "",
        dateFilterType: "",
        selectedDate: new Date().toISOString().split("T")[0],
        startDate: null,
        endDate: null,
      };
    }
  });
  const handleCiFilterClick = () => {
    setFilterModalIsOpen(true);
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
        console.log(ordersResponse);
        setUsers(orders.data);
        setMarket(marketData.data);
        setFilteredUsers(orders.data);
        console.log(orders.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (row) => {
    navigate(`edit/${row.product_id}`);
  };

  const handleDeleteConfirmation = (itemId) => {
    const productId = itemId; // Use the passed itemId
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

  // Function to handle closing the delete confirmation dialog
  const handleCloseDeleteConfirmation = () => {
    setDeleteItemId(null);
    setShowDeleteConfirmation(false);
  };

  // Function to handle delete operation
  const handleDeleteClick = (row) => {
    setDeleteItemId(row.product_id); // Set the itemId to be deleted
    setShowDeleteConfirmation(true); // Show the delete confirmation dialog
  };

  createTheme(
    "solarized",
    {
      text: {
        primary: "#FFFFFF",
        secondary: "#FFFFFF",
      },
      background: {
        default: "rgba(59,139,246,1)",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(59,139,246,1)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "light"
  );

  const handleViewClick = (row) => {
    navigate(`${row.product_id}`);
  };

  const handleExportClick = () => {
    setExportModalIsOpen(true);
  };

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
      width: "150px",
      filterValue:
        marketItem.place && typeof marketItem.place === "string"
          ? marketItem.place.toLowerCase()
          : "",
    }));
  };

  const marketColumns = generateMarketColumns(market, users);

  const columns = [
    {
      name: "Sr. No",
      selector: (_, index) => index + 1,
      sortable: false,
      width: "80px",
    },
    {
      name: "Product id",
      selector: (row) => row.product_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
      width: "150px",
    },
    // {
    //   name: "Selling Price",
    //   selector: (row) => row.product_price,
    //   sortable: true,
    //   width: "150px",
    // },
    {
      name: "Cost Price",
      selector: (row) => row.Final_cost,
      sortable: true,
      width: "150px",
    },
    {
      name: "Type",
      selector: (row) => row.product_type,
      sortable: true,
      width: "150px",
    },
    {
      name: "Stock",
      selector: (row) => row.Stock,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px",
    },
    ...marketColumns,
    {
      name: "Created at",
      selector: (row) => {
        const date = new Date(row.created_at);
        return date.toLocaleString("en-Uk", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "IST",
        });
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Edit",
      cell: (row) => <MdEdit onClick={() => handleEditClick(row)} />,
      button: true,
    },
    {
      name: "Delete",
      cell: (row) => <MdDelete onClick={() => handleDeleteClick(row)} />,
      button: true,
    },
    {
      name: "View",
      cell: (row) => <FaEye onClick={() => handleViewClick(row)} />,
      button: true,
    },
  ];

  const CustomHeader = ({ column }) => (
    <div title={column.name} style={{ whiteSpace: "normal" }}>
      {column.name}
    </div>
  );

  const modifiedColumns = columns.map((col) => ({
    ...col,
    header: <CustomHeader column={col} />,
  }));

  const applyFilters = (filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...filters
    }));
    
    const {
      productName,
      productType,
      status,
      costPriceMin,
      costPriceMax,
      dateFilterType,
      selectedDate,
      startDate,
      endDate,
    } = filters;

    const filteredUsers = users.filter((user) => {

      const productNameMatch =
        !productName ||
        user.product_name.toLowerCase().includes(productName.toLowerCase());
      const productTypeMatch =
        !productType ||
        user.product_type.toLowerCase().includes(productType.toLowerCase());
      const statusMatch =
        !status || user.status.toLowerCase() === status.toLowerCase();
      const costPriceInRange =
        (!costPriceMin || user.Final_cost >= Number(costPriceMin)) &&
        (!costPriceMax || user.Final_cost <= Number(costPriceMax));

      let dateMatch = true;
      const userDate = new Date(user.created_at);

      if (dateFilterType === "equal" && selectedDate) {
        const selectedDateValue = new Date(selectedDate);
        dateMatch =
          userDate.toLocaleDateString("en-GB") ===
          selectedDateValue.toLocaleDateString("en-GB");
      } else if (dateFilterType === "before" && selectedDate) {
        const selectedDateValue = new Date(selectedDate);
        dateMatch = userDate < selectedDateValue;
      } else if (dateFilterType === "after" && selectedDate) {
        const selectedDateValue = new Date(selectedDate);
        dateMatch = userDate > selectedDateValue;
      } else if (dateFilterType === "between" && startDate && endDate) {
        const startDateValue = new Date(startDate);
        const endDateValue = new Date(endDate);
        dateMatch = userDate >= startDateValue && userDate <= endDateValue;
      }

      return (
        productNameMatch &&
        productTypeMatch &&
        statusMatch &&
        costPriceInRange &&
        dateMatch
      );
    });

    setFilteredUsers(filteredUsers);
  };

  const resetFilters = () => {
    setProductName("");
    setProductType("");
    setStatus("");
    setCostPriceMin("");
    setCostPriceMax("");
    setDateFilterType("");
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setStartDate(null);
    setEndDate(null);

    // Do not update the state in localStorage here
  };

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const customStyles = {
    headCells: {
      style: {
        color: "rgb(255 255 255)",
        zIndex: "auto",
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
        },
      },
    },
    header: {
      style: {
        minHeight: "56px",
        fontSize: "25px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
        },
        fontSize: "16px",
      },
    },
  };

  return (
    <div className="order">
      <div className="flex items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleExportClick}
        >
          Export
        </button>
        <ExportTable
          data={filteredUsers}
          marketColumns={marketColumns}
          isOpen={exportModalIsOpen}
          onRequestClose={() => setExportModalIsOpen(false)}
        />
        <CiFilter
          size={40}
          style={{ marginLeft: "25px" }}
          onClick={handleCiFilterClick}
        />
      </div>
      <FilterModal
        isOpen={filterModalIsOpen}
        onClose={() => setFilterModalIsOpen(false)}
        onApplyFilters={applyFilters}
        users={users}
        resetFilters={resetFilters}
      />
      <DeleteConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        onDelete={() => {
          handleDeleteConfirmation(deleteItemId); // Call the delete confirmation function with the deleteItemId
          handleCloseDeleteConfirmation(); // Close the dialog after deletion
        }}
      />

      <DataTable
        className="dataTable"
        columns={modifiedColumns}
        data={filteredUsers}
        customStyles={customStyles}
        fixedHeaderScrollHeight="800px"
        striped
        theme="solarized"
        pagination
        paginationPerPage={25}
        paginationRowsPerPageOptions={[25, 50, 100]}
        paginationComponentOptions={{
          rowsPerPageText: "Rows per page:",
          rangeSeparatorText: "of",
          noRowsPerPage: false,
          selectAllRowsItem: false,
        }}
      />
    </div>
  );
};

export default TableProduct;
