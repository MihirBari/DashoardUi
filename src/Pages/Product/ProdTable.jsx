import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
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
    axios.delete(`${API_BASE_URL}/api/prod/delete`, { data: { productId } })
      .then(response => {
        console.log('Delete successful:', response.data);
        window.location.reload();
        toast.success("Deleted Successfully");
      })
      .catch(error => {
        console.error('Error deleting:', error);
      });
  };

  const handleViewClick = (row) => {
    navigate(`${row.product_id}`);
  };

  const renderHeader = () => {
    return (
        <div className="flex justify-content-end">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText  placeholder="Keyword Search" />
            </span>
        </div>
    );
};

const header = renderHeader();


  const filteredUsers = users.filter(user =>
    user.product_id.toString().includes(searchText) ||
    user.product_name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.product_type.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="order overflow-x-auto">
      <input
        type="text"
        placeholder="Search "
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <DataTable
        value={filteredUsers}
        paginator
        rows={10}
        header={header}
        rowsPerPageOptions={[10, 20, 30]}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column field="product_id" header="Product id" style={{ width: '20%' }} sortable />
        <Column field="product_name" header="Product Name" style={{ width: '20%' }} sortable />
        <Column field="product_price" header="Selling Price" style={{ width: '20%' }} sortable />
        <Column field="Final_cost" header="Cost Price" style={{ width: '20%' }} sortable />
        <Column field="product_type" header="Type" style={{ width: '20%' }} sortable />
        <Column field="Stock" header="Stock" style={{ width: '20%' }} sortable />
        <Column field="Created_by" header="Created by" style={{ width: '20%' }} sortable />
        <Column field="Updated_by" header="Updated by" style={{ width: '20%' }} sortable />
        <Column
          field="created_at"
          header="Created at" style={{ width: '20%' }}
          body={(rowData) => {
            const date = new Date(rowData.created_at);
            return date.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZone: 'IST',
            });
          }}
          sortable
        />
        <Column
          field="updated_at"
          header="Updated at" style={{ width: '20%' }}
          body={(rowData) => {
            const date = new Date(rowData.updated_at);
            return date.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZone: 'IST',
            });
          }}
          sortable
        />
        <Column
          body={(rowData) => <MdEdit onClick={() => handleEditClick(rowData)} />}
          header="Edit"
          style={{ textAlign: 'center' }}
        />
        <Column
          body={(rowData) => <MdDelete onClick={() => handleDeleteClick(rowData)} />}
          header="Delete"
          style={{ textAlign: 'center' }}
        />
        <Column
          body={(rowData) => <FaEye onClick={() => handleViewClick(rowData)} />}
          header="View"
          style={{ textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
};

export default ProdTable;
