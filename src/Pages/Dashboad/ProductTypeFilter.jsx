import axios from 'axios';
import React,{useEffect, useState} from 'react';
import API_BASE_URL from '../../config';

const ProductTypeFilter = ({ onFilterChange }) => {
    const [productTypes, setProductTypes] = useState();

  const handleFilterChange = (value) => {
    onFilterChange(value);
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/prod/productType`);
      setProductTypes(response.data);
    } catch (error) {
      console.error("Error fetching product types:", error.message);
    }
  };


  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Select Duration:</label>
      <select
        onChange={(e) => handleFilterChange(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
      >
        <option value="" disabled>Product Type</option>
         {productTypes &&
                      productTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                  </select>
    </div>
  );
};

export default ProductTypeFilter;