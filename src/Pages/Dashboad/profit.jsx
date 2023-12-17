import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config.js';
import DateFilter from './DateFilter.jsx'; // Update the path accordingly

const Profit = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [filterValue, setFilterValue] = useState(1); // Default to Daily

  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/api/dashboard/profit`;

    axios
      .get(apiUrl, {
        params: { days: filterValue },
      })
      .then((response) => {
        const data = response.data;
      
        if (data && data.amt !== undefined) {
          setTotalSales(data.amt);
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [filterValue]);

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  return (
    <div >
      <div className="bg-gray-200 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Total Profit</h2>
        <DateFilter onFilterChange={handleFilterChange} />
        <div className="mb-2">
        ₹ {totalSales}
        </div>
      </div>
    </div>
  );
};

export default Profit;