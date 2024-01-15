import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../../config";
import axios from "axios";

const AddOrderID = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productIdFromLink = queryParams.get("productId");

  const initialInputs = {
    creditor_name: "",
    product_id: productIdFromLink, // Set default value to productIdFromLink
    amount_sold: "",
    size: "",
    paid_by: "",
    amount_condition: "yes",
    returned: "No",
  };

  const [inputs, setInputs] = useState(initialInputs);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Product ID from link:", productIdFromLink);

    if (productIdFromLink) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        product_id: productIdFromLink,
      }));
    }
  }, [productIdFromLink]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/prod/productId`)
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching product_ids:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setInputs((prev) => {
      if (name === "size") {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "creditor_name",
      "product_id",
      "amount_sold",
      "size",
      "amount_condition",
      "returned",
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
      toast.error("Failed to create order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add Order
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
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
                <div className="mt-1">
                  <span className="inline-block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    {productIdFromLink}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                <label className="block text-sm font-medium text-gray-700">
                  Amount Credited
                </label>
                <div className="mt-1 relative">
                  <select
                    name="amount_condition"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="yes Returned">Yes Returned</option>
                    <option value="no Returned">No Returned</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                <label className="block text-sm font-medium text-gray-700">
                  Sizes
                </label>
                <div className="mt-1 relative flex items-center">
                  <select
                    name="size"
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
    </div>
  );
};

export default AddOrderID;
