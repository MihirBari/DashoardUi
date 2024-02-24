import React from 'react';

const Sizefilter = ({ onFilterChange }) => {
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
        <option value="s">S</option>
        <option value="m">M</option>
        <option value="l">L</option>
        <option value="xl">Xl</option>
        <option value="xxl">XXl</option>
        <option value="xxxl">XXXl</option>
        <option value="xxxxl">XXXXl</option>
        <option value="xxxxxl">XXXXXl</option>
        <option value="xxxxxxl">XXXXXXl</option>
      </select>
    </div>
  );
};

export default Sizefilter;