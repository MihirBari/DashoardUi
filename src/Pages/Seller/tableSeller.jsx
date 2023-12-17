import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./orders.css"
import DataTable from 'react-data-table-component';
import API_BASE_URL from "../../config";
import { MdEdit, MdDelete  } from "react-icons/md";
import ExportTable from '../ExportTable';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [exportModalIsOpen, setExportModalIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/dealer/showDealer`);
          setUsers(response.data);
          console.log(response.data);
        } catch (err) {
          console.error("Error fetching orders:", err);
        }
      };
  
      fetchOrders();
    }, []);
  
    const handleEditClick = (userId) => {
      navigate(`edit/${userId.id}`);
    };
  
    const handleDeleteClick = (userId) => {
      const idToDelete = userId.id; 
      console.log('Deleting user with ID:', idToDelete);
    
      axios.delete(`${API_BASE_URL}/api/dealer/delete`, { data: { id: idToDelete } })
        .then(response => {
          console.log('Delete successful:', response.data);
          toast.success("Deleted Successfully");
          window.location.reload();
        })
        .catch(error => {
          console.error('Error deleting:', error);
        });
    };
  
    const handleExportClick = () => {
      setExportModalIsOpen(true);
    };

    const columns = [
        {
            name: 'Sr. No',
            selector: (_, index) => index + 1,
            sortable: false,
            width: '80px',
        },
        {
            name: 'Name',
            selector: (row) => row.debitor_name,
            sortable: true,
        },
        {
            name: 'Date',
            selector: (row) => row.debitor_Date,
            sortable: true,
            width: "250px",
        },
        {
            name: 'Amount',
            selector: (row) => row.debitor_Amount,
            sortable: true,
        },
        {
            name: 'Paid By',
            selector: (row) => row.debitor_paid_by,
            sortable: true,
        },
        {
            name: 'Total Product',
            selector: (row) => row.total_product,
            sortable: true,
            width: "140px",
        },
        {
            name: 'Other Cost',
            selector: (row) => row.other_cost,
            sortable: true,
            width: "140px",
        },
        {
          name: "Created at",
          selector: (row) => row.created_at,
          sortable: true,
          width: "250px",
        },
        {
          name: "Updated at",
          selector: (row) => row.updated_at,
          sortable: true,
          width: "250px",
        },
        {
            name: 'Edit',
            cell: (row) => (
                <MdEdit onClick={() => handleEditClick(row)}>Edit</MdEdit>
            ),
            button: true,
        },
        {
            name: 'Delete',
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

    const filteredUsers = users.filter(user =>
      user.debitor_name.toString().includes(searchText) 
    );
  

    return (
      <div className="order">
        <input
          type="text"
          placeholder="Search "
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <DataTable
          className="dataTable"
          columns={modifiedColumns}
          data={filteredUsers}
          fixedHeader
          fixedHeaderScrollHeight="450px"
          striped
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
          subHeader
          subHeaderComponent={
            <div style={{ display: "flex", alignItems: "center" }}>
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
            </div>
          }
        />
      </div>
    );
};


export default Users;