import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./orders.css"
import DataTable from 'react-data-table-component';
import API_BASE_URL from "../../config";
import { MdDelete, MdEdit  } from "react-icons/md";
import ExportTable from '../ExportTable';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TableOrder = () => {
  const [users, setUsers] = useState([]);
  const [exportModalIsOpen, setExportModalIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
      const fetchOrders = async () => {
          try {
              const response = await axios.get(`${API_BASE_URL}/api/order/viewOrder`);
              setUsers(response.data);
              console.log(response.data);
          } catch (err) {
              console.error('Error fetching orders:', err);
          }
      };
  
      fetchOrders();
  }, []);
  


  const handleEditClick = (product_id) => {

      console.log('Editing order with ID:', product_id);
    
      navigate(`edit/${product_id}`);
  };

    const handleDeleteClick = (product_id) => {
      const idToDelete = product_id; 
      console.log('Deleting order with ID:', idToDelete);
    
      axios.delete(`${API_BASE_URL}/api/order/delete`, { data: { productId: idToDelete } })
        .then(response => {
          console.log('Delete successful:', response.data);
          window.location.reload();
          toast.success("Deleted Successfully");
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
            selector: (row) => row.creditor_name,
            sortable: true,
        },
        {
            name: 'Product id',
            selector: (row) => row.product_id,
            sortable: true,
        }, 
        {
            name: 'Product Name',
            selector: (row) => row.product_name,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Amount Sold(₹)',
            selector: (row) => row.amount_sold,
            sortable: true,
            width: '150px',
        },
        {
            name: 'TotaL Items',
            selector: (row) => row.Total_items,
            sortable: true,
        },
        {
          name: 'Size',
          selector: (row) => {
            const sizeValues = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl', 'xxxxxxl'];
            
            const sizes = sizeValues
              .filter(size => row[size] !== null && row[size] !== undefined)
              .join(', ');
      
            return sizes;
          },
          sortable: true,
        },
        {
            name: 'Amount Condition',
            selector: (row) => row.amount_condition, 
            sortable: true,
            width: '150px',
        },
        {
            name: 'Returned',
            selector: (row) => row.returned,
            sortable: true,
        },
        {
          name: 'Created',
          selector: (row) => row.created_at,
          sortable: true,
      },
      {
        name: 'Updated',
        selector: (row) => row.update_at,
        sortable: true,
    },
        {
            name: 'Edit',
            cell: (row) => (
                <MdEdit onClick={() => handleEditClick(row.product_id)}>Edit</MdEdit>

            ),
            button: true,
        },
        // {
        //     name: 'Delete',
        //     cell: (row) => (
        //         <MdDelete onClick={() => handleDeleteClick(row)}>Delete</MdDelete>
        //     ),
        //     button: true,
        // },
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
      user.product_id.toString().includes(searchText) ||
      user.creditor_name.toLowerCase().includes(searchText.toLowerCase()) 
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
              {/* <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleExportClick}
              >
                Export
              </button> */}
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


export default TableOrder;