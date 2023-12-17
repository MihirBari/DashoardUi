import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const TotalProducts = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/api/dashboard/TotalProducts`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data;
        setTotalProducts(data.totalProducts);
        console.log()

    })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div >
      <div className="bg-gray-200 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Total Products</h2>
        <div className="mb-2">
          {totalProducts} Products
        </div>
      </div>
    </div>
  );
};

export default TotalProducts;