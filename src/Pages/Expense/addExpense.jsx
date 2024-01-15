import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import API_BASE_URL from "../../config";
import axios from "axios";

const AddEpense = () => {
  const initialInputs = {
    name: "",
    date: "",
    amount: "",
    paid_by:"",
    paid_status:"",
    remarks:"",
    clearance_status:"",
    payment_mode:"",
    reciept:""
  };

  const [inputs, setInputs] = useState(initialInputs);
  const [err, setError] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
    }

    try {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/expense/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const imagePaths = response.data.imagePaths;

        setInputs((prev) => ({
          ...prev,
          reciept: imagePaths,
        }));

        toast.success("Images uploaded successfully");
      } else {
        console.error("Failed to upload images");
        toast.error("Failed to upload images");
      }
    } catch (error) {
      console.error("Error uploading images:", error.message);
      toast.error("Error uploading images");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["name", "date", "amount", "paid_by", "paid_status", "remarks"];

    for (const field of requiredFields) {
      if (!inputs[field]) {
        toast.error(`Please fill in the ${field.replace(/_/g, ' ')} field.`);
        return;
      }
    }

    try {
      // Send data to backend
      await axios.post(`${API_BASE_URL}/api/expense/addExpense`, inputs);
      setInputs(initialInputs);
      toast.success("Expense created successfully");
     // window.location.reload();
     navigate('/Expense')
    } catch (err) {
      console.error(err);
      setError(err.response);
      toast.error("Failed to create Expense");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add Expense
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="name"
                  required
                  onChange={handleChange}
                  placeholder="Enter  Name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
               Date
              </label>
              <div className="mt-1">
                <input
                  type="Date"
                  name="date"
                  required
                  onChange={handleChange}
                  placeholder="Enter your E-mail"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  name="amount"
                  required
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="paid_by"
                className="block text-sm font-medium text-gray-700"
              >
                Paid By
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="paid_by"
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
                  htmlFor="paid_status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Paid Status
                </label>
                <div className="mt-1 relative">
                  <select
                    name="paid_status"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value=" " disabled selected>Select Option</option>
                    <option value="yes" >
                      Yes
                    </option>
                    <option value="no">No</option>
                    <option value="pending" >
                      Pending
                    </option>
                  </select>
                </div>
              </div>

              <div>
              <label
                htmlFor="remarks"
                className="block text-sm font-medium text-gray-700"
              >
               Remarks
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="remarks"
                  required
                  onChange={handleChange}
                  placeholder="Remarks"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
            </div>

            <div>
                <label
                  htmlFor="clearance_status"
                  className="block text-sm font-medium text-gray-700"
                >
                Clearance Status
                </label>
                <div className="mt-1 relative">
                  <select
                    name="clearance_status"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value=" " disabled selected>Select Option</option>
                    <option value="yes" >Yes </option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              
            <div>
                <label
                  htmlFor="payment_mode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Payment Mode
                </label>
                <div className="mt-1 relative">
                  <select
                    name="payment_mode"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  > 
                  <option value=" " disabled selected>Select Option</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash"  >
                    Cash
                    </option>
                    <option value="net banking" >
                    net banking
                    </option>
                    <option value="Mobile banking">Mobile banking</option>
                    <option value="By company employee">By company employee</option>
                    <option value="credit card">credit card</option>
                    <option value="debit card">Debit card</option>
                    <option value="bank transfer">bank transfer</option>
                    <option value="others">others</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="reciept"
                  className="block text-sm font-medium text-gray-700"
                >
                  Receipt
                </label>
                <div className="mt-1 relative">
                  <input
                    type="file"
                    name="reciept"
                    onChange={(e) => handleImageChange(e)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              <Link to="/Expense">
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

export default AddEpense;
