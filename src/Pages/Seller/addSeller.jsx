import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import API_BASE_URL from "../../config";
import axios from "axios";

const AddSeller = () => {
  const initialInputs = {
    debitor_name: "",
    debitor_Date: "",
    debitor_Amount: "",
    debitor_paid_by:"",
    total_product:"",
    other_cost:"",
    product_type:"",
    paid_status:"",
    remark:"",
    company_paid:'',
    payment_mode:'',
    reciept:""
  };

  const [inputs, setInputs] = useState(initialInputs);
  const [err, setError] = useState(null);
  const [productTypes, setProductTypes] = useState();
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
        `${API_BASE_URL}/api/dealer/upload`,
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
    const requiredFields = ["debitor_name", "debitor_Date", "debitor_Amount", "debitor_paid_by", "total_product", "product_type","other_cost"];

    for (const field of requiredFields) {
      if (!inputs[field]) {
        toast.error(`Please fill in the ${field.replace(/_/g, ' ')} field.`);
        return;
      }
    }

    try {
      // Send data to backend
      await axios.post(`${API_BASE_URL}/api/dealer/addDealer`, inputs);
      setInputs(initialInputs);
      toast.success("User created successfully");
    
     navigate('/Seller')
    } catch (err) {
      console.error(err);
      setError(err.response);
      toast.error("Failed to create user");
    }
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/prod/productType`);
      setProductTypes(response.data);
    } catch (error) {
      console.error("Error fetching product types:", error.message);
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
                  type="number"
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
                  type="number"
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
                  type="number"
                  name="other_cost"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  placeholder="Other cost"
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
                  <select
                    name="product_type"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="" selected disabled>
                      Select or Enter Product Type
                    </option>
                    {productTypes &&
                      productTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                  </select>
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
                htmlFor="remark"
                className="block text-sm font-medium text-gray-700"
              >
               Remark
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="remark"
                  required
                  onChange={handleChange}
                  placeholder="Remark"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              </div>

            
              <div>
                <label
                  htmlFor="company_paid"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company account paid
                </label>
                <div className="mt-1 relative">
                  <select
                    name="company_paid"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value=" " disabled selected>Select Option</option>
                    <option value="yes" >
                      Yes
                    </option>
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

export default AddSeller;
