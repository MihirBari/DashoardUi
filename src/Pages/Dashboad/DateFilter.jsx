import React from 'react';

const DateFilter = ({ onFilterChange }) => {
  const handleFilterChange = (value) => {
    onFilterChange(value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Select Duration:</label>
      <select
        onChange={(e) => handleFilterChange(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
      >
        <option value="1">Daily</option>
        <option value="7">Weekly</option>
        <option value="30">Monthly</option>
        <option value="120">Quarterly</option>
      </select>
    </div>
  );
};

export default DateFilter;