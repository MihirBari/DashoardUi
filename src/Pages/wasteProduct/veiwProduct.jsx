import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideNavBar from '../Sidebar/Navbar';
import ProductDetails from './ProductDetails';
import axios from 'axios';
import API_BASE_URL from '../../config';

const ViewProduct = () => {
  const { product_Id } = useParams();
  const [product, setProduct] = useState(null);
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, marketResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/prod/Product/${product_Id}`),
          axios.get(`${API_BASE_URL}/api/market/showMarket`),
        ]);

        setProduct(productResponse.data);
        setMarketData(marketResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [product_Id]);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <SideNavBar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-center">Products</h1>
          </div>

          {product && marketData && (
            <ProductDetails product={product} marketData={marketData} />
          )}
        </div>
      </div>
    </>
  );
};

export default ViewProduct;