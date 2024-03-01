import axios from "axios";
import React, { useEffect, useState } from "react";
import "./orders.css";
import DataTable, { createTheme } from "react-data-table-component";
import API_BASE_URL from "../../config";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiFilter } from "react-icons/ci";
import FilterModal from "./FilterModal";
import ExportTable from "./ExportTable";
import DetailModal from "./DetailModal.jsx";
import { FcViewDetails } from "react-icons/fc";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.jsx";

const TableOrder = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [exportModalIsOpen, setExportModalIsOpen] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [filterModalIsOpens, setFilterModalIsOpens] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredDataForDetailModal, setFilteredDataForDetailModal] =
    useState(null);
  const [orderData, setOrderData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [filters, setFilters] = useState({
    orderId: "",
    soldBy: "",
    amountCredited: "",
    returned: "",
    city: "",
    costPriceMin: "",
    costPriceMax: "",
    dateFilterType: "",
    size: "",
    selectedDate: "",
    startDate: "",
    endDate: "",
    deliveryStatus: "",
  });

  const handleCiFilterClick = () => {
    setFilterModalIsOpen(true);
  };

  const handleCiDetailClick = () => {
    setFilterModalIsOpens(true);
  };

  const handleDeleteConfirmation = (row) => {
    console.log("Row:", row);

    const sizeProperties = [
      "s",
      "m",
      "l",
      "xl",
      "xxl",
      "xxxl",
      "xxxxl",
      "xxxxxl",
      "xxxxxxl",
    ];

    const validSize = sizeProperties.find(
      (size) => row[size] !== null && row[size] !== undefined
    );

    const requestData = {
      order_id: row.order_id,
      product_id: row.product_id,
      size: validSize,
    };

    axios({
      method: "delete",
      url: `${API_BASE_URL}/api/order/delete`,
      data: requestData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(
          "Delete successful. Deleted order_id:",
          response.data.order_id
        );
        window.location.reload();
        toast.success("Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting:", error);
        toast.error("Error deleting order");
      });
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteItemId(null);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteClick = (itemId) => {
    setDeleteItemId(itemId); // Set the itemId to be deleted
    setShowDeleteConfirmation(true); // Show the delete confirmation dialog
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/order/viewOrder`);
        setUsers(response.data.products);
        setOrderData(response.data.total[0]);
        setFilteredDataForDetailModal(response.data.total[0]);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    // Fetch orders without any filters when the component mounts
    fetchOrders();
  }, []); 

  const handleEditClick = (product_id) => {
    console.log("Editing order with ID:", product_id);

    navigate(`edit/${product_id}`);
  };

  const columns = [
    {
      name: "Sr. No",
      selector: (_, index) => index + 1,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.creditor_name,
      sortable: true,
    },
    {
      name: "Order id",
      selector: (row) => row.order_id,
      sortable: true,
    },
    {
      name: "Product Id",
      selector: (row) => row.product_id,
      sortable: true,
      width: "130px",
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Amount Sold(₹)",
      selector: (row) => row.amount_sold,
      sortable: true,
      width: "150px",
    },
    {
      name: "Sold By",
      selector: (row) => row.paid_by,
      sortable: true,
      width: "150px",
    },
    {
      name: "Size",
      selector: (row) => {
        const sizeValues = [
          "s",
          "m",
          "l",
          "xl",
          "xxl",
          "xxxl",
          "xxxxl",
          "xxxxxl",
          "xxxxxxl",
        ];
        const sizes = sizeValues
          .filter((size) => row[size] !== null && row[size] !== undefined)
          .join(", ");
        return sizes;
      },
      sortable: true,
    },
    {
      name: "Amount Credited",
      selector: (row) => row.amount_condition,
      sortable: true,
      width: "150px",
    },
    {
      name: "Returned",
      selector: (row) => row.returned,
      sortable: true,
    },
    {
      name: "Delivery Status",
      selector: (row) => row.delivery_status,
      sortable: true,
      width: "150px",
    },
    {
      name: "Bank Payment",
      selector: (row) => row.bank_payment,
      sortable: true,
      width: "150px",
    },
    {
      name: "Profit Margin",
      selector: (row) => row.bank_payment - row.Final_cost,
      sortable: true,
      width: "150px",
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      width: "150px",
    },
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
      cell: (row) => (
        <MdEdit onClick={() => handleEditClick(row.order_id)}>Edit</MdEdit>
      ),
      button: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <MdDelete onClick={() => handleDeleteClick(row)}>Delete</MdDelete>
      ),
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

  const onApplyFilters = (filteredData, filteredTotalData) => {
    setFilteredUsers(filteredData);
    setFilteredDataForDetailModal(filteredTotalData); // Set filteredTotalData
    setFilterModalIsOpen(false);
  };

  const initialFilters = {
    orderId: "",
    soldBy: "",
    amountCredited: "",
    returned: "",
    city: "",
    costPriceMin: "",
    costPriceMax: "",
    dateFilterType: "",
    size: "",
    selectedDate: "",
    startDate: "",
    endDate: "",
    deliveryStatus: ""
  };

  const handleExportClick = () => {
    setExportModalIsOpen(true);
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
          isOpen={exportModalIsOpen}
          onRequestClose={() => setExportModalIsOpen(false)}
        />
        <CiFilter
          size={40}
          style={{ marginLeft: "25px" }}
          onClick={handleCiFilterClick}
        />
        <FcViewDetails
          size={40}
          style={{ marginLeft: "25px" }}
          onClick={handleCiDetailClick}
        />
      </div>
      <FilterModal
        isOpen={filterModalIsOpen}
        onClose={() => setFilterModalIsOpen(false)}
        onApplyFilters={onApplyFilters}
        filters={filters}
        resetFilters={() => setFilters(initialFilters)}
      />
      <DetailModal
        isOpen={filterModalIsOpens}
        onClose={() => setFilterModalIsOpens(false)}
        orderData={orderData}
        filteredData={filteredDataForDetailModal}
      />
      <DeleteConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        onDelete={() => {
          handleDeleteConfirmation(deleteItemId);
          handleCloseDeleteConfirmation();
        }}
      />
      <DataTable
        className="dataTable"
        columns={modifiedColumns}
        data={filteredUsers}
        //fixedHeader
        customStyles={customStyles} // Pass the updated customStyles object here
        fixedHeaderScrollHeight="800px"
        striped
        theme="solarized"
        pagination
        highlightOnHover
        paginationPerPage={20}
        paginationRowsPerPageOptions={[20, 40, 60]}
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

export default TableOrder;
