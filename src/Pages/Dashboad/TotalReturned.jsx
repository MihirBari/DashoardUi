import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config.js';
import DateFilter from './DateFilter.jsx'; // Update the path accordingly
import { Link } from 'react-router-dom';

const TotalReturned = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [filterValue, setFilterValue] = useState(1); // Default to Daily

  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/api/dashboard/TotalReturned`;

    axios
      .get(apiUrl, {
        params: { days: filterValue },
      })
      .then((response) => {
        const data = response.data;

        if (data && data.length > 0 && data[0].ti !== undefined) {
          setTotalSales(data[0].ti);
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
        <h2 className="text-xl font-bold mb-4"> Total Returned</h2>
        <DateFilter onFilterChange={handleFilterChange} />
        <Link to ='/Customer'>
        <div className="mb-2">
         {totalSales} Products
        </div>
        </Link>
      </div>
    </div>
  );
};

export default TotalReturned;