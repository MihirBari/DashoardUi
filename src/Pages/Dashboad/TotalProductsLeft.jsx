import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const TotalProductsLeft = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/api/dashboard/TotalProductsLeft`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data;

        if (data && data.length > 0 && data[0].Stock !== undefined) {
          setTotalProducts(data[0].Stock); // Assuming the field name is Stock
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Log the value of totalProducts only if it's defined
  if (totalProducts !== undefined) {
    console.log('totalProducts:', totalProducts);
  }

  return (
    <div >
      <div className="bg-gray-200 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Total Products Left</h2>
        <div className="mb-2">
          {totalProducts} Products
        </div>
      </div>
    </div>
  );
};

export default TotalProductsLeft;