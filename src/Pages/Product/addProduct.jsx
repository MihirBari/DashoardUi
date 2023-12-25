import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../../config";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AddProd = () => {
  const initialInputs = {
    product_id: "",
    product_name: "",
    product_type: "",
    Description: "",
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
    xxl: 0,
    xxxl: 0,
    xxxxl: 0,
    xxxxxl: 0,
    xxxxxxl: 0,
    product_price: "",
    Cost_price: "",
    other_cost: "",
    Final_cost: "",
    product_image: null,
  };
  const [inputs, setInputs] = useState(initialInputs);
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setInputs((prev) => {
      const newInputs = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "Cost_price" || name === "other_cost") {
        const costPrice = +newInputs.Cost_price || 0;
        const otherCost = +newInputs.other_cost || 0;
        newInputs.Final_cost = costPrice + otherCost;
      }

      return newInputs;
    });
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
  
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/prod/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        // Assuming the API response contains an array of image paths
        const imagePaths = response.data.imagePaths;
  
        setInputs((prev) => ({
          ...prev,
          // Assuming product_image is an array to store multiple image paths
          product_image: imagePaths,
        }));
  
        toast.success("Images uploaded successfully");
      } else {
        console.error("Failed to upload images");
      }
    } catch (error) {
      console.error("Error uploading images: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["product_id", "product_name", "product_price", "Cost_price", "product_type", "product_image", "Description", "other_cost", "Final_cost"];

    for (const field of requiredFields) {
      if (!inputs[field]) {
        toast.error(`Please fill in the ${field.replace(/_/g, ' ')} field.`);
        return;
      }
    }

    try {
      const product = {
        product_id: inputs.product_id,
        product_name: inputs.product_name,
        Description: inputs.Description,
        s: inputs.s,
        m: inputs.m,
        l: inputs.l,
        xl: inputs.xl,
        xxl: inputs.xxl,
        xxxl: inputs.xxxl,
        xxxxl: inputs.xxxxl,
        xxxxxl: inputs.xxxxxl,
        xxxxxxl: inputs.xxxxxxl,
        product_price: inputs.product_price,
        Cost_price: inputs.Cost_price,
        product_type: inputs.product_type,
        other_cost: inputs.other_cost,
        Final_cost: inputs.Final_cost,
        product_image: inputs.product_image,
        userId: currentUser,
      };

      await axios.post(
        `${API_BASE_URL}/api/prod/addProduct`,
        { data: [product] },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setInputs(initialInputs);
      navigate("/product");
      toast.success("Product added successfully");
    } catch (err) {
      console.error(err);
      setError(err.response);
      toast.error("Failed to add Product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add Product
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
                  htmlFor="product_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Type
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="product_type"
                    required
                    onChange={handleChange}
                    placeholder="Enter  Product Type"
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
              <div>
                <label
                  htmlFor="product_price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Selling Price
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="product_price"
                    required
                    onChange={handleChange}
                    placeholder="Enter Product Price"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="Cost_price"
                  className="block text-sm font-medium text-gray-700"
                >
                Product Cost Price
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="Cost_price"
                    required
                    onChange={handleChange}
                    placeholder="Enter Product Price"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="other_cost"
                  className="block text-sm font-medium text-gray-700"
                >
                Other Cost Price
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="other_cost"
                    required
                    onChange={handleChange}
                    placeholder="Enter Product Price"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="Final_cost"
                  className="block text-sm font-medium text-gray-700"
                >
                  Final cost price
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="Final_cost"
                    value={inputs.Final_cost}
                    readOnly
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="product_image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Images
                </label>
                <div className="mt-1 relative">
                  <input
                    type="file"
                    name="product_image"
                    onChange={(e) => handleImageChange(e)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    multiple
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="Description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1 relative">
                <textarea
                  name="Description"
                  required
                  onChange={handleChange}
                  placeholder="Enter Description"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows="4"
                ></textarea>
              </div>
            </div>
            {/* Add more fields in a similar manner */}
            <div className="flex justify-between items-center mt-4">
              <Link to="/product" >
              <button
                onClick={handleSubmit}
                className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create
              </button>
              </Link>
              <Link to="/product">
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

export default AddProd;
