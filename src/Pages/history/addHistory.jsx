import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../../config";
import axios from "axios";

const AddHistory = () => {
  const initialInputs = {
    product_id: "",
    product_name: "",
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
    xxl: 0,
    xxxl: 0,
    xxxxl: 0,
    xxxxxl: 0,
    xxxxxxl: 0,
  };
  const [inputs, setInputs] = useState(initialInputs);
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setInputs((prev) => {
      const newInputs = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };


      return newInputs;
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["product_id", "product_name"];

    for (const field of requiredFields) {
      if (!inputs[field]) {
        toast.error(`Please fill in the ${field.replace(/_/g, ' ')} field.`);
        return;
      }
    }

    try {
      const detail = {
        product_id: inputs.product_id,
        product_name: inputs.product_name,
        s: inputs.s,
        m: inputs.m,
        l: inputs.l,
        xl: inputs.xl,
        xxl: inputs.xxl,
        xxxl: inputs.xxxl,
        xxxxl: inputs.xxxxl,
        xxxxxl: inputs.xxxxxl,
        xxxxxxl: inputs.xxxxxxl,
      };

      await axios.post(
        `${API_BASE_URL}/api/prod/addHistory`,
        { data: [detail] },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setInputs(initialInputs);
      navigate("/History");
      toast.success("successful");
    } catch (err) {
      console.error(err);
      setError(err.response);
      toast.error("Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          History 
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="product_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product id
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="product_id"
                    required
                    onChange={handleChange}
                    placeholder="Product id"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="product_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="product_name"
                    required
                    onChange={handleChange}
                    placeholder="Product name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="s"
                  className="block text-sm font-medium text-gray-700"
                >
                  S
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="s"
                    required
                    onChange={handleChange}
                    placeholder="Enter for size s"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="m"
                  className="block text-sm font-medium text-gray-700"
                >
                  M
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="m"
                    required
                    onChange={handleChange}
                    placeholder="Enter Description"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="l"
                  className="block text-sm font-medium text-gray-700"
                >
                  L
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="l"
                    required
                    onChange={handleChange}
                    placeholder="Enter for size L"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="xl"
                  className="block text-sm font-medium text-gray-700"
                >
                  XL
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="xl"
                    required
                    onChange={handleChange}
                    placeholder="Enter for size xl"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="xxl"
                  className="block text-sm font-medium text-gray-700"
                >
                  2xl
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="xxl"
                    required
                    onChange={handleChange}
                    placeholder="Enter for size 2xl"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="xxxl"
                  className="block text-sm font-medium text-gray-700"
                >
                  3xl
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="xxxl"
                    required
                    onChange={handleChange}
                    placeholder="Enter 3xl"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700"
                >
                  4xl
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="xxxxl"
                    required
                    onChange={handleChange}
                    placeholder="Enter 4xl"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="xxxxxl"
                  className="block text-sm font-medium text-gray-700"
                >
                  5xl
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="xxxxxl"
                    required
                    onChange={handleChange}
                    placeholder="Enter 5xl"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="xxxxxxl"
                  className="block text-sm font-medium text-gray-700"
                >
                  6xl
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="xxxxxxl"
                    required
                    onChange={handleChange}
                    placeholder="Enter 6xl"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
</div>
             
            {/* Add more fields in a similar manner */}
            <div className="flex justify-between items-center mt-4">
              <Link to="/History" >
              <button
                onClick={handleSubmit}
                className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create
              </button>
              </Link>
              <Link to="/History">
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

export default AddHistory;
