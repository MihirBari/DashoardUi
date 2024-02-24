import React, { useEffect, useState } from "react";
import DataTable , { createTheme } from "react-data-table-component";
import API_BASE_URL from "../../config";
import axios from "axios";

const HistorTable = () => {
  const [users, setUsers] = useState([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/inventory/history`);
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
      name: " New Update",
      selector: (row) => row.Total_items, 
      sortable: true,
      width: "150px",
    },
    {
      name: 'Size',
      selector: (row) => {
        const sizeValues = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl', 'xxxxxxl'];
        
        const sizes = sizeValues
          .filter(size => row[size] !== 0 && row[size] !== undefined)
          .join(', ');
  
        return sizes;
      },
      sortable: true,
    },
    {
      name: 'Created at',
      selector: (row) => {
        const date = new Date(row.created_at);
        return date.toLocaleString('en-Uk', {
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
    }
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
    user.product_id.toString().includes(searchText) 
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

export default HistorTable;