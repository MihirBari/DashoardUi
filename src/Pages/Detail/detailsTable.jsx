import React, { useEffect, useState } from "react";
import DataTable , { createTheme } from "react-data-table-component";
import API_BASE_URL from "../../config";
import axios from "axios";

const DetailsTable = () => {
  const [users, setUsers] = useState([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/inventory/details`);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);





  createTheme('solarized', {
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
    },
    background: {
      default: 'rgba(59,139,246,1)',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(59,139,246,1)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'light');


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
      width: "110px",
      
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
      width: "150px",
    },
    {
      name: "S",
      selector: (row) => row.s, 
      sortable: true,
      width: "150px",
    },
    {
      name: "M",
      selector: (row) => row.m, 
      sortable: true,
      width: "150px",
    },
    {
      name: "L",
      selector: (row) => row.l,
      sortable: true,
    },
    {
      name: "XL",
      selector: (row) => row.xl,
      sortable: true,
    },
    {
      name: "2XL",
      selector: (row) => row.xxl,
      sortable: true,
      width: '150px',
    },
    {
      name: "3XL",
      selector: (row) => row.xxxl,
      sortable: true,
      width: '150px',
    },
    {
      name: "4XL",
      selector: (row) => row.xxxxl,
      sortable: true,
      width: '150px',
    },
    {
      name: "5XL",
      selector: (row) => row.xxxxxl,
      sortable: true,
      width: '150px',
    },
    {
      name: "6XL",
      selector: (row) => row.xxxxxxl,
      sortable: true,
      width: '150px',
    },
    {
      name: "Total Items",
      selector: (row) => row.Stock,
      sortable: true,
      width: '150px',
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
    user.product_name.toLowerCase().includes(searchText.toLowerCase()) 
  );

  const customStyles = {
   
    headCells: {
        style: {
          color: "rgb(255 255 255)"
        },
    }
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
        fixedHeader
        customStyles={customStyles} 
        fixedHeaderScrollHeight="450px"
        striped
        theme="solarized"
        pagination
       
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

export default DetailsTable;