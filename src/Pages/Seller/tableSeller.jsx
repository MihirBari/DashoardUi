import axios from "axios";
import React, { useEffect, useState } from "react";
import "./orders.css";
import DataTable, { createTheme } from "react-data-table-component";
import API_BASE_URL from "../../config";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import ExportTable from "./ExportTable";
import FilterModal from "./FilterModal";
import { CiFilter } from "react-icons/ci";
import DeleteConfirmationDialog from "../Product/DeleteConfirmationDialog";
import DetailModal from "./DetailModal";
import { FcViewDetails } from "react-icons/fc";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [exportModalIsOpen, setExportModalIsOpen] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [filterModalIsOpens, setFilterModalIsOpens] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredDataForDetailModal, setFilteredDataForDetailModal] =
    useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State variable for delete confirmation dialog
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [filters, setFilters] = useState({
    paidStatus: " ",
    paymentmode: " ",
    clearanceStatus: "",
    paidBy: "",
    costPriceMin: "",
    productType: "",
    costPriceMax: "",
    dateFilterType: "",
    selectedDate: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/dealer/showDealer`
        );
        setUsers(response.data.dealers);
        setFilteredUsers(response.data.dealers);
        setFilteredDataForDetailModal(response.data.total[0]) 
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleCiDetailClick = () => {
    setFilterModalIsOpens(true);
  };

  const handleEditClick = (userId) => {
    navigate(`edit/${userId.id}`);
  };

  const handleDeleteConfirmation = (itemId) => {
    axios
      .delete(`${API_BASE_URL}/api/dealer/delete`, { data: { id: itemId } })
      .then((response) => {
        console.log("Delete successful:", response.data);
        toast.success("Deleted Successfully");
        window.location.reload();
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
    setDeleteItemId(row.id);
    setShowDeleteConfirmation(true);
  };

  const handleViewClick = (row) => {
    navigate(`${row.id}`);
  };

  const handleExportClick = () => {
    setExportModalIsOpen(true);
  };

  const columns = [
    {
      name: "Sr. No",
      selector: (_, index) => index + 1,
      sortable: false,
      width: "80px",
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.debitor_name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => {
        const date = new Date(row.debitor_Date);
        return date.toLocaleString("en-Uk", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "IST",
        });
      },
      sortable: true,
      width: "250px",
    },
    {
      name: "Amount",
      selector: (row) => row.debitor_Amount,
      sortable: true,
    },
    {
      name: "Paid By",
      selector: (row) => row.debitor_paid_by,
      sortable: true,
    },
    {
      name: "Paid Status",
      selector: (row) => row.paid_status,
      sortable: true,
      width: "140px",
    },
    {
      name: "Total Product",
      selector: (row) => row.total_product,
      sortable: true,
      width: "140px",
    },
    {
      name: "Product Type",
      selector: (row) => row.product_type,
      sortable: true,
      width: "140px",
    },
    {
      name: "Other Cost",
      selector: (row) => row.other_cost,
      sortable: true,
      width: "140px",
    },
    {
      name: "Remark",
      selector: (row) => row.remark,
      sortable: true,
      width: "140px",
    },
    {
      name: "Company account paid",
      selector: (row) => row.company_paid,
      sortable: true,
      width: "250px",
    },
    {
      name: "Payment Mode",
      selector: (row) => row.payment_mode,
      sortable: true,
      width: "250px",
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
      width: "250px",
    },
    {
      name: "Edit",
      cell: (row) => <MdEdit onClick={() => handleEditClick(row)}>Edit</MdEdit>,
      button: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <MdDelete onClick={() => handleDeleteClick(row)}>Delete</MdDelete>
      ),
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
    paidStatus: "",
    paymentmode: "",
    clearanceStatus: "",
    paidBy: "",
    productType: "",
    costPriceMin: "",
    costPriceMax: "",
    dateFilterType: "",
    selectedDate: "",
    startDate: "",
    endDate: "",
  };

  const handleCiFilterClick = () => {
    setFilterModalIsOpen(true);
  };

  return (
    <div className="order">
      <div className="flex items-center">
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
        >
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
          <FilterModal
            isOpen={filterModalIsOpen}
            onClose={() => setFilterModalIsOpen(false)}
            onApplyFilters={onApplyFilters}
            users={users}
            resetFilters={() => setFilters(initialFilters)}
          />
          <DetailModal
            isOpen={filterModalIsOpens}
            onClose={() => setFilterModalIsOpens(false)}
            filteredData={filteredDataForDetailModal}
          />
          <DeleteConfirmationDialog
            isOpen={showDeleteConfirmation}
            onClose={handleCloseDeleteConfirmation}
            onDelete={() => {
              handleDeleteConfirmation(deleteItemId); // Call the delete confirmation function with the deleteItemId
              handleCloseDeleteConfirmation(); // Close the dialog after deletion
            }}
          />
        </div>
      </div>
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
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
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

export default Users;
