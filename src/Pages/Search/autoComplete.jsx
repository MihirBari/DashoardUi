import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';  // Import the search icon
import API_BASE_URL from '../../config';

const AutoComplete = ({ onSelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/prod/Search`, {
        product_id: query,
        product_name: query,
        Description: query,
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    if (inputValue.trim() !== '') {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <div className="flex flex-col items-center mt-9">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type to search..."
          className="border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-800"
        />
        <span className="absolute right-4 top-2">
          <FaSearch size={20} color="#71717A" />
        </span>
      </div>
      <ul>
        {suggestions.map((product) => (
          <li key={product.product_id} onClick={() => onSelect(product.product_id)}>
            {product.product_name} {product.product_id} {product.Description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
