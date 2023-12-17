import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../../config";
import axios from "axios";

const AddProd = () => {
  const initialInputs = {
    product_id: "",
    product_name: "",
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
    product_type: "",
    product_image: null,
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

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
        setInputs((prev) => ({
          ...prev,
          product_image: response.data.imagePath,
        }));
        toast.success("Image uploaded successfully");
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure the image is uploaded before proceeding
      if (!inputs.product_image) {
        toast.error("Please upload an image");
        return;
      }

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
        product_image: inputs.product_image,
      };

      console.log(product);

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
      window.location.reload();
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
                  htmlFor="s"
                  className="block text-sm font-medium text-gray-700"
                >
                  S
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
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
                    type="text"
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
                    type="text"
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
                    type="text"
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
                    type="text"
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
                    type="text"
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
                  htmlFor="xxxxl"
                  className="block text-sm font-medium text-gray-700"
                >
                  4xl
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
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
                    type="text"
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
                    type="text"
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
                  Product Price
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
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
                  Cost Price
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
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
              <button
                onClick={handleSubmit}
                className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create
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
    </div>
  );
};

export default AddProd;
