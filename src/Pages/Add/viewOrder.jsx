import React, { useState, useEffect } from 'react';
import SideNavBar from '../Sidebar/Navbar';
import OrderDetail from './orderDetail';
import axios from 'axios';
import API_BASE_URL from '../../config';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API_BASE_URL}/api/order/viewOrder`)
        .then((response) => {
          console.log('API Response:', response);
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
        });
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <SideNavBar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-center">Products</h1>
          </div>

          {products.map((product) => (
            <OrderDetail key={product.product_id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
