import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./orders.css"
import DataTable from 'react-data-table-component';
import API_BASE_URL from "../../config";
import { MdEdit, MdDelete  } from "react-icons/md";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const TableExpense = () => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/expense/showExpense`);
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
    
      axios.delete(`${API_BASE_URL}/api/expense/delete`, { data: { id: idToDelete } })
        .then(response => {
          console.log('Delete successful:', response.data);
          toast.success("Deleted Successfully");
          window.location.reload();
        })
        .catch(error => {
          console.error('Error deleting:', error);
        });
    };
  
    const handleViewClick = (row) => {
      navigate(`${row.id}`);
    };

    const columns = [
        {
            name: 'Sr. No',
            selector: (_, index) => index + 1,
            sortable: false,
            width: '80px',
        },
        {
          name: 'ID',
          selector: (row) => row.id,
          sortable: true,
      },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
          name: 'Date',
          selector: (row) => {
            const date = new Date(row.date);
            return date.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              // hour: '2-digit',
              // minute: '2-digit',
              // second: '2-digit',
              timeZone: 'IST',
            });
          },
          sortable: true,
          width: '250px',
        },
        {
            name: 'Amount',
            selector: (row) => row.amount,
            sortable: true,
        },
        {
            name: 'Paid By',
            selector: (row) => row.paid_by,
            sortable: true,
        },
        {
          name: 'Remark',
          selector: (row) => row.remarks,
          sortable: true,
          width: "140px",
      },
        {
            name: 'Paid Status',
            selector: (row) => row.paid_status,
            sortable: true,
            width: "140px",
        },
        {
          name: 'Clearance Status',
          selector: (row) => row.clearance_status,
          sortable: true,
          width: "140px",
      },
      {
        name: 'Payment Mode',
        selector: (row) => row.payment_mode,
        sortable: true,
        width: "250px",
    },
        {
          name: 'Created at',
          selector: (row) => {
            const date = new Date(row.created_at);
            return date.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              // hour: '2-digit',
              // minute: '2-digit',
              // second: '2-digit',
              timeZone: 'IST',
            });
          },
          sortable: true,
          width: '250px',
        },
        // {
        //   name: 'Updated at',
        //   selector: (row) => {
        //     const date = new Date(row.updated_at);
        //     return date.toLocaleString('en-US', {
        //       year: 'numeric',
        //       month: '2-digit',
        //       day: '2-digit',
        //       hour: '2-digit',
        //       minute: '2-digit',
        //       second: '2-digit',
        //       timeZone: 'IST',
        //     });
        //   },
        //   sortable: true,
        //   width: '250px',
        // },
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

    const filteredUsers = users.filter(user =>
      user.name.toString().includes(searchText) 
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
          
        />
      </div>
    );
};


export default TableExpense;