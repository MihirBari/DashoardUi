import React, { useEffect, useState } from 'react';
import "./orders.css"
import DataTable from 'react-data-table-component';
import { MdEdit, MdDelete  } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import API_BASE_URL from "../../config";
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate()
     
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/user/userData`);
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        fetchUsers();
    }, []);

    const handleEditClick = (userId) => {
        navigate(`edit/${userId.id}`)
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

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
        );
        setFilteredUsers(filteredData);
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
              const date = new Date(row.updated_at);
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

    return (
        <div className='order'>
            <input
                type="text"
                placeholder="Search "
                onChange={handleSearch}
                className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <DataTable
                className='dataTable'
                columns={columns}
                data={filteredUsers}
                fixedHeader
                fixedHeaderScrollHeight='450px'
                striped
                pagination
            />
        </div>
    );
};

export default Users;