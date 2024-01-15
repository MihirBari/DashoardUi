import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./orders.css"
import DataTable from 'react-data-table-component';
import API_BASE_URL from "../../config";
import { MdDelete, MdEdit  } from "react-icons/md";
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TableOrder = () => {
  const [users, setUsers] = useState([]);
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

  const handleDeleteClick = (row) => {
    console.log('Row:', row);
  
    const sizeProperties = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl', 'xxxxxxl'];
  
    const validSize = sizeProperties.find((size) => row[size] !== null && row[size] !== undefined);
  
    const requestData = {
      order_id: row.order_id,
      product_id: row.product_id,
      size: validSize,
    };
  
    axios({
      method: 'delete',
      url: `${API_BASE_URL}/api/order/delete`,
      data: requestData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Delete successful. Deleted order_id:', response.data.order_id);
         window.location.reload();
        toast.success('Deleted Successfully');
      })
      .catch((error) => {
        console.error('Error deleting:', error);
        toast.error('Error deleting order');
      });
  };

    const columns = [
        {
            name: 'Sr. No',
            selector: (_, index) => index + 1,
            sortable: false,
        },
        {
            name: 'Name',
            selector: (row) => row.creditor_name,
            sortable: true,
        }, {
          name: 'Order id',
          selector: (row) => row.order_id,
          sortable: true,
      },
        {
            name: 'Product Id',
            selector: (row) => row.product_id,
            sortable: true,
            width: '130px',
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
          name: 'Sold By',
          selector: (row) => row.paid_by,
          sortable: true,
          width: '150px',
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
            name: 'Amount Creadited',
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
                <MdEdit onClick={() => handleEditClick(row.order_id)}>Edit</MdEdit>

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
        
        />
      </div>
    );
};


export default TableOrder;