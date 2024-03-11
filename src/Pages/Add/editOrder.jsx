import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../../config";
import axios from "axios";

const EditOrder = () => {
  const initialInputs = {
    creditor_name: "",
    amount_sold: "",
    product_id:"",
    size: "",
    amount_condition: "yes",
    returned: "No",
    paid_by: "",
    bank_payment:"",
    city:"",
    delivery_status:""
  };

  const { order_id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(initialInputs);
  const [err, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/order/viewOneOrder/${order_id}`);
        const orderData = response.data[0];
        console.log("Fetched Order Data:", orderData);
  
        setInputs({
          creditor_name: orderData.creditor_name,
          product_id: orderData.product_id,
          amount_sold: orderData.amount_sold,
          size: orderData.Total_items, // Correct property name
          amount_condition: orderData.amount_condition || "yes",
          returned: orderData.returned || "No",
          paid_by: orderData.paid_by,
          bank_payment: orderData.bank_payment,
          city:orderData.city,
          delivery_status:orderData.delivery_status,
        });
        
      } catch (err) {
        console.error(err);
        setError(err.response);
        toast.error("Failed to fetch order details");
      }
    };
  
    fetchOrder();
  }, [order_id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/order/updateOrder/${order_id}`, inputs);
      setInputs(initialInputs);
      console.log(initialInputs)
      console.log("order_id:", order_id);
      navigate("/Customer");
      toast.success("Order updated successfully");
    } catch (err) {
      console.error(err);
      setError(err.response);
      toast.error("Failed to update order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Edit Order
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                {renderInput("creditor_name", "Name", "Enter Customer Name")}
              </div>
              <div>
                {renderInput("product_id", "Product Id", "")}
              </div>
              <div>
                {renderInput("amount_sold", "Amount Sold", "Enter Amount Sold")}
              </div>
              <div>
                {renderInput("paid_by", "Sold By", "Sold By")}
              </div>
              <div>
                {renderSelect("amount_condition", "Amount Credited", [
                  { value: "no", label: "No" },
                  { value: "yes", label: "Yes" },
                  { value: "Yes Returned", label: "Yes Returned" },
                  { value: "No Returned", label: "No Returned" },
                ])}
              </div>
              <div>
                {renderSelect("returned", "Returned", [

                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ])}
              </div>
              <div>
                {renderInput("bank_payment", "Bank Payment", "Bank Payment")}
              </div>
              <div>
                {renderInput("city", "City", "City")}
              </div>
              <div>
                {renderSelect("delivery_status", "Delivery Status", [

                  { value: "In process", label: "In process" },
                  { value: "In transit", label: "No" },
                  { value: "Completed", label: "Completed" },
                  { value: "Returned", label: "Returned" },
                ])}
              </div>
              <div>
                {renderInputs("size", "Size","size",)}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Link to="/Customer">
                {renderButton("Edit")}
              </Link>
              <Link to="/Customer">
                {renderButton("Back")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  function renderInput(name, label, placeholder) {
    return (
      <>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1">
          <input
            type="name"
            name={name}
            required
            onChange={handleChange}
            placeholder={placeholder}
            value={inputs[name]}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </>
    );
  }

  function renderInputs(name, label, placeholder) {
    return (
      <>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1">
          <input
            type="name"
            name={name}
            required
            onChange={handleChange}
            placeholder={placeholder}
            readOnly
            value={inputs[name]}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </>
    );
  }

  function renderSelect(name, label, options) {
    return (
      <>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1 relative">
          <select
            name={name}
            required
            onChange={handleChange}
            value={inputs[name]}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" label="Select an option" disabled/>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }

  function renderButton(label) {
    return (
      <button
        onClick={label === "Edit" ? handleSubmit : undefined}
        className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {label}
      </button>
    );
  }
};

export default EditOrder;
