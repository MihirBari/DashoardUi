import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import API_BASE_URL from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ProdTable = () => {
  const [users, setUsers] = useState([]);

  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/prod/inventory`);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
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



  const handleViewClick = (row) => {
    navigate(`${row.product_id}`);
  };

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
      name: "Product Price",
      selector: (row) => row.product_price, 
      sortable: true,
      width: "150px",
    },
    {
      name: "Total Price",
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
      name: "Created by",
      selector: (row) => row.Created_by,
      sortable: true,
      width: '150px',
    },
    {
      name: "Updated by",
      selector: (row) => row.Updated_by,
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
      />
    </div>
  );
};

export default ProdTable;