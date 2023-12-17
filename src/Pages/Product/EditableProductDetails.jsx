import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EditableProductDetails = ({ product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleInputChange = (e) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;

    setEditedProduct({ ...editedProduct, [e.target.name]: value });
  };

  const handleSaveClick = () => {
    // Convert relevant fields to numbers
    const formattedData = {
      data: [
        {
          ...editedProduct,
          s: Number(editedProduct.s),
          m: Number(editedProduct.m),
          l: Number(editedProduct.l),
          xl: Number(editedProduct.xl),
          xxl: Number(editedProduct.xxl),
          xxxl: Number(editedProduct.xxxl),
          xxxxl: Number(editedProduct.xxxxl),
          xxxxxl: Number(editedProduct.xxxxxl),
          xxxxxxl: Number(editedProduct.xxxxxxl),
          Cost_price: Number(editedProduct.Cost_price),
          product_price: Number(editedProduct.product_price),
        },
      ],
    };

    onSave(formattedData);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name:</label>
              <input
                type="text"
                name="product_name"
                value={editedProduct.product_name}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Description:</label>
              <input
                type="text"
                name="Description"
                value={editedProduct.Description}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">S:</label>
              <input
                type="number"
                name="s"
                value={editedProduct.s}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">M:</label>
              <input
                type="number"
                name="m"
                value={editedProduct.m}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">L:</label>
              <input
                type="number"
                name="l"
                value={editedProduct.l}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">XL:</label>
              <input
                type="number"
                name="xl"
                value={editedProduct.xl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">2XL:</label>
              <input
                type="number"
                name="xxl"
                value={editedProduct.xxl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">3XL:</label>
              <input
                type="number"
                name="xxxl"
                value={editedProduct.xxxl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">4XL:</label>
              <input
                type="number"
                name="xxxxl"
                value={editedProduct.xxxxl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">5XL:</label>
              <input
                type="number"
                name="xxxxxl"
                value={editedProduct.xxxxxl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">6XL:</label>
              <input
                type="number"
                name="xxxxxxl"
                value={editedProduct.xxxxxxl}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Price:</label>
              <input
                type="text"
                name="product_price"
                value={editedProduct.product_price}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost Price:</label>
              <input
                type="text"
                name="Cost_price"
                value={editedProduct.Cost_price}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Type:</label>
              <input
                type="text"
                name="product_type"
                value={editedProduct.product_type}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
          </div>
  
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleSaveClick}
              className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Save
            </button>
            <Link to="/product">
              <button className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditableProductDetails;
