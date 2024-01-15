import React, { useEffect, useState } from "react";
import DataTable , { createTheme } from "react-data-table-component";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import API_BASE_URL from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ProdTable = () => {
  const [users, setUsers] = useState([]);
  const [market, setMarket] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = axios.get(`${API_BASE_URL}/api/prod/inventory`);
        const marketResponse = axios.get(`${API_BASE_URL}/api/market/showMarket`);
  
        const [orders, marketData] = await Promise.all([ordersResponse, marketResponse]);
  
        setUsers(orders.data);
        setMarket(marketData.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    fetchData();
  }, []);

  const handleEditClick = (row) => {
    navigate(`edit/${row.product_id}`);
  };

  const handleDeleteClick = (row) => {
    const productId = row.product_id;
    console.log(row.product_id)
    axios.delete(`${API_BASE_URL}/api/prod/delete`, { data: { productId } })
      .then(response => {
        console.log('Delete successful:', response.data);
        window.location.reload()
        toast.success("Deleted Successfully")
      })
      .catch(error => {
        console.error('Error deleting:', error);
      });
  };

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

  const handleViewClick = (row) => {
    navigate(`${row.product_id}`);
  };

  const generateMarketColumns = (marketData, usersData) => {
    return marketData.map((marketItem) => ({
      name: marketItem.place,
      selector: (row) => {
        const costPrice = row.Final_cost; 
        const percent = marketItem.percent;
        const newPrice = costPrice + (costPrice * percent) / 100;
        return newPrice.toFixed(2); 
      },
      sortable: true,
    }));
  };
  
  // Assuming that users is the array containing user data
  const marketColumns = generateMarketColumns(market, users);
  

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
      name: "Selling Price",
      selector: (row) => row.product_price, 
      sortable: true,
      width: "150px",
    },
    {
      name: "Cost Price",
      selector: (row) => row.Final_cost, 
      sortable: true,
      width: "150px",
    },
    {
      name: "Type",
      selector: (row) => row.product_type,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.Stock,
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => row.status,
      sortable: true,
    },
    // {
    //   name: "Created by",
    //   selector: (row) => row.Created_by,
    //   sortable: true,
    //   width: '150px',
    // },
    // {
    //   name: "Updated by",
    //   selector: (row) => row.Updated_by,
    //   sortable: true,
    //   width: '150px',
    // },
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
      // width: '250px',
    },
    ...marketColumns,
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
      name: "Edit",
      cell: (row) => <MdEdit onClick={() => handleEditClick(row)} />,
      button: true,
    },
    {
      name: "Delete",
      cell: (row) => <MdDelete onClick={() => handleDeleteClick(row)} />,
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
    user.product_id.toString().includes(searchText) ||
    user.product_name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.product_type.toLowerCase().includes(searchText.toLowerCase())
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
        fixedHeaderScrollHeight="800px"
        striped
        theme="solarized"
        pagination
       
        paginationPerPage={25}
        paginationRowsPerPageOptions={[25, 50, 100]}
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

export default ProdTable;