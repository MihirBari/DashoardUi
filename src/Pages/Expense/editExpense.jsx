import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../../config";
import axios from "axios";

const EditExpense = () => {
  const initialInputs = {
    name: "",
    date: "",
    amount: "",
    paid_by:"",
    paid_status:"",
    remarks:""
  };

  const { id } = useParams();
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

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/expense/showOneExpense/${id}`);
        const sellerData = response.data[0];

        setInputs({
          name: sellerData.name,
          date: sellerData.date,
          amount: sellerData.amount,
          paid_by: sellerData.paid_by,
          remarks: sellerData.remarks,
          paid_status:sellerData.paid_status
        });
      } catch (err) {
        console.error(err);
        setError(err.response);
        toast.error("Failed to fetch seller details");
      }
    };

    // Fetch data when the component mounts
    fetchSeller();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/expense/editExpense/${id}`, inputs);
      setInputs(initialInputs);
      toast.success("Updated successfully");
      //window.location.reload();
      navigate('/Expense')
    } catch (err) {
      console.error(err);
      toast.error("Failed to update seller");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Edit Seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {renderInput("name", "Name", "Enter Seller Name")}
              {renderInput("date", "Date", "Enter Date", "date")}
              {renderInput("amount", "Amount", "Enter Amount")}
              {renderInput("paid_by", "Paid By", "Enter Paid By")}
              {renderInput("remarks", "Remark", "Enter Remark")}
              {renderInput("paid_status", "Other Cost", "Enter Other Cost")}
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleSubmit}
                className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Update
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

  function renderInput(name, label, placeholder, type = "text") {
    return (
      <div key={name}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1">
          <input
            type={type}
            name={name}
            required
            onChange={handleChange}
            placeholder={placeholder}
            value={inputs[name]}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    );
  }
};

export default EditExpense;
