import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../../config";
import axios from "axios";
import Select from "react-select"; // Import the Select component
import makeAnimated from "react-select/animated";

const AddOrder = () => {
  const initialInputs = {
    creditor_name: "",
    product_id: "",
    amount_sold: "",
    size: "",
    paid_by: "",
    amount_condition: "yes",
    returned: "No",
    bank_payment: "",
    city: "",
  };

  const [inputs, setInputs] = useState(initialInputs);
  const [err, setError] = useState(null);
  const [productIds, setProductIds] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [productImage, setProductImage] = useState(null);

  const [animatedComponents] = useState(makeAnimated());
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/prod/productId`)
      .then((response) => response.json())
      .then((data) => setProductIds(data))
      .catch((error) => console.error("Error fetching product_ids:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setInputs((prev) => {
      if (name === "Size") {
        return {
          ...prev,
          size: value,
        };
      } else {
        return {
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        };
      }
    });
  };

  const handleProductChange = (selectedOption) => {
    const productId = selectedOption ? selectedOption.value : "";
    setSelectedProductId(productId);
    if (productId) {
      fetchProductImage(productId);
      setInputs((prev) => ({
        ...prev,
        product_id: productId,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "creditor_name",
      "product_id",
      "amount_sold",
      "size",
      "amount_condition",
      "returned",
      "bank_payment",
      "city",
    ];

    for (const field of requiredFields) {
      if (!inputs[field]) {
        toast.error(`Please fill in the ${field.replace(/_/g, " ")} field.`);
        return;
      }
    }

    try {
      await axios.post(`${API_BASE_URL}/api/order/order`, {
        ...inputs,
        size: inputs.size,
      });

      setInputs(initialInputs);
      navigate("/Customer");
      toast.success("Order created successfully");
    } catch (err) {
      console.error(err);
      setError(err.response);
      toast.error("Failed to create order");
    }
  };

  const fetchProductImage = async (productId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/order/OrderImage`,
        {
          product_id: productId,
        }
      );
      const publicId = response.data[0].publicId; // Accessing publicId from the first element of the array
      console.log("Public ID:", publicId);
      setProductImage(publicId);
    } catch (error) {
      console.error("Error fetching product image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add Order
        </h2>
      </div>
      <div className="flex justify-center items-center">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="creditor_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="name"
                      name="creditor_name"
                      required
                      onChange={handleChange}
                      placeholder="Enter Customer Name"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product ID
                  </label>
                  <div className="mt-1 relative">
                    <Select
                      components={animatedComponents}
                      isClearable
                      isSearchable
                      options={productIds.map((productId) => ({
                        value: productId,
                        label: productId,
                      }))}
                      onChange={handleProductChange} // Call handleProductChange on change
                      placeholder="Product ID"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="amount_sold"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amount Sold
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="number"
                      name="amount_sold"
                      required
                      onChange={handleChange}
                      placeholder="Enter Amount Sold"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="amount_condition"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amount Credited
                  </label>
                  <div className="mt-1 relative">
                    <select
                      name="amount_condition"
                      required
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value=" " disabled selected>
                        Select Option
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="yes Returned">Yes Returned</option>
                      <option value="no Returned">No Returned</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="paid_by"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sold By
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
                    htmlFor="bank_payment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bank Payment
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="number"
                      name="bank_payment"
                      required
                      onChange={handleChange}
                      placeholder="Enter Amount "
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="city"
                      required
                      onChange={handleChange}
                      placeholder="City"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="Size"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sizes
                  </label>
                  <div className="mt-1 relative flex items-center">
                    <select
                      name="Size"
                      required
                      onChange={handleChange}
                      className="ml-2 appearance-none block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="" disabled selected>
                        Select an option
                      </option>
                      <option value="s">S</option>
                      <option value="m">M</option>
                      <option value="l">L</option>
                      <option value="xl">XL</option>
                      <option value="xxl">2XL</option>
                      <option value="xxxl">3XL</option>
                      <option value="xxxxl">4XL</option>
                      <option value="xxxxxl">5XL</option>
                      <option value="xxxxxxl">6XL</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Link to="/Customer">
                  <button
                    onClick={handleSubmit}
                    className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Create
                  </button>
                </Link>
                <Link to="/Customer">
                  <button className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Back
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-center items-center">
          {productImage && (
            <img
              style={{ height: "300px", width: "300px" }}
              src={`https://res.cloudinary.com/dgcxd0kkk/image/upload/${productImage}`}
              alt="Product"
              className="max-w-full h-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
