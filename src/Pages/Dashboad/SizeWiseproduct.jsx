import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config.js";
import { Link } from "react-router-dom";
import Sizefilter from "./Sizefilter.jsx";

const SizeWiseproduct = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [filterValue, setFilterValue] = useState("s"); // Initial filter value

  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/api/dashboard/size`;

    axios
      .get(apiUrl, { params: { sizes: filterValue } })
      .then((response) => {
        const data = response.data;

       // console.log("Response data:", data); // Log the response data

        if (data && data.length > 0 && data[0].size !== undefined) {
          setTotalProducts(data[0].size); // Update to access 'size' key
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
        <h2 className="text-xl font-bold mb-4">Total Products (SizeWise)</h2>
        <Sizefilter onFilterChange={handleFilterChange} />
        <Link to="/Customer">
          <div className="mb-2">{totalProducts} Products</div>
        </Link>
      </div>
    </div>
  );
};

export default SizeWiseproduct;
