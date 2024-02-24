import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./orders.css"
import DataTable, { createTheme } from 'react-data-table-component';
import API_BASE_URL from "../../config";
import { MdEdit, MdDelete  } from "react-icons/md";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TableMarket = () => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/market/showMarket`);
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
    
      axios.delete(`${API_BASE_URL}/api/market/deleteMarket`, { data: { id: idToDelete } })
        .then(response => {
          console.log('Delete successful:', response.data);
          toast.success("Deleted Successfully");
          window.location.reload();
        })
        .catch(error => {
          console.error('Error deleting:', error);
        });
    };
  
    const columns = [
        {
            name: 'Sr. No',
            selector: (_, index) => index + 1,
            sortable: false,
            width: '80px',
        },
        {
            name: 'id',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Place',
            selector: (row) => row.place,
            sortable: true,
        },
        {
            name: 'Percent %',
            selector: (row) => row.percent,
            sortable: true,
        },
        {
          name: 'Created at',
          selector: (row) => {
            const date = new Date(row.created_at);
            return date.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZone: 'IST',
            });
          },
          sortable: true,
          width: '250px',
        },
        {
          name: 'Updated at',
          selector: (row) => {
            const date = new Date(row.update_at);
            return date.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZone: 'IST',
            });
          },
          sortable: true,
          width: '250px',
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
      user.id.toString().includes(searchText) 
    );
  

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


export default TableMarket;