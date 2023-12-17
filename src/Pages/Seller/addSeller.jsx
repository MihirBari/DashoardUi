import React, { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import API_BASE_URL from "../../config";
import axios from "axios";

const AddUser = () => {
  const initialInputs = {
    debitor_name: "",
    debitor_Date: "",
    debitor_Amount: "",
    debitor_paid_by:"",
    total_product:"",
    other_cost:""
  };

  const [inputs, setInputs] = useState(initialInputs);
  const [err, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend
      const response = await axios.post(`${API_BASE_URL}/api/dealer/addDealer`, inputs);
      setInputs(initialInputs);
      toast.success("User created successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError(err.response);
      toast.error("Failed to create user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add Seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="debitor_name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="debitor_name"
                  required
                  onChange={handleChange}
                  placeholder="Enter Seller Name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="debitor_Date"
                className="block text-sm font-medium text-gray-700"
              >
               Date
              </label>
              <div className="mt-1">
                <input
                  type="Date"
                  name="debitor_Date"
                  required
                  onChange={handleChange}
                  placeholder="Enter your E-mail"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="debitor_Amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="debitor_Amount"
                  required
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="debitor_paid_by"
                className="block text-sm font-medium text-gray-700"
              >
                Paid By
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="debitor_paid_by"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  placeholder="Paid By"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="total_product"
                className="block text-sm font-medium text-gray-700"
              >
                Total Product
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="total_product"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  placeholder="Total Product"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="other_cost"
                className="block text-sm font-medium text-gray-700"
              >
               Other Cost
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="other_cost"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  placeholder="Other cost"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleSubmit}
                className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create
              </button>
              <Link to="/Seller">
                <button className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
