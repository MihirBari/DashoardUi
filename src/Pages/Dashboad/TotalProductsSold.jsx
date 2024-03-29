import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config.js";
import { Link } from "react-router-dom";
import DateFilter from "./DateFilter.jsx";

const TotalProductsSold = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [filterValue, setFilterValue] = useState(1);

  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/api/dashboard/TotalProductsSold`;

    axios
      .get(apiUrl, { params: { days: filterValue } })
      .then((response) => {
        const data = response.data;

        if (data && data.length > 0 && data[0].Total_items !== undefined) {
          setTotalProducts(data[0].Total_items);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [filterValue]);

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  return (
    <div>
      <div className="bg-gray-200 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Total Products Sold</h2>
        <DateFilter onFilterChange={handleFilterChange} />
        <Link to="/Customer">
          <div className="mb-2">{totalProducts} Products</div>
        </Link>
      </div>
    </div>
  );
};

export default TotalProductsSold;
