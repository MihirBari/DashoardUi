import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./orders.css"
import DataTable from 'react-data-table-component';
import API_BASE_URL from "../../config";
import { MdEdit, MdDelete  } from "react-icons/md";
import { toast } from 'react-toastify';

const Users = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/user/userData`);
                setUser(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching orders:', err);
            }
        };

        fetchOrders();
    }, []);

    const handleEditClick = (row) => {
        console.log('Edit clicked for:', row);
    };

    const handleDeleteClick = (userId) => {
        const idToDelete = userId.id; 
        console.log('Deleting user with ID:', idToDelete);
      
        axios.delete(`${API_BASE_URL}/api/user/delete`, { data: { id: idToDelete } })
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
            name: 'name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: 'created at',
            selector: (row) => row.created_at,
            sortable: true,
        },
        {
            name: 'updated at',
            selector: (row) => row.updated_at,
            sortable: true,
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

    return (
        <div className='order'>
            <DataTable
                className='dataTable'
                columns={columns}
                data={user}
                fixedHeader
                fixedHeaderScrollHeight='450px'
                striped
                pagination
            />
        </div>
    );
};


export default Users;