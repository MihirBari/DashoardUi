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
    paid_status:"yes",
    remarks:"",
    clearance_status:"yes",
    payment_mode:"UPI",
    reciept:""
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

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/expense/showOneExpense/${id}`);
        const sellerData = response.data;
        const formattedDate = new Date(sellerData.date).toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
    
        if (sellerData) {
          setInputs({
            name: sellerData.name || '',
            date: formattedDate,
            amount: sellerData.amount || '',
            paid_by: sellerData.paid_by || '',
            remarks: sellerData.remarks || '',
            paid_status: sellerData.paid_status || 'yes',
            clearance_status: sellerData.clearance_status || 'yes',
            payment_mode: sellerData.payment_mode || 'UPI'
          });
        } else {
          console.error("Seller data is undefined");
          setError("Seller data is undefined");
          toast.error("Failed to fetch seller details");
        }
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
          Edit Expense
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>{renderInput("name", "Name", "Enter Seller Name")} </div>
              <div> {renderInput("date", "Date", "Enter Date", "date")}</div>
              <div>{renderInput("amount", "Amount", "Enter Amount")}</div>
              <div>{renderInput("paid_by", "Paid By", "Enter Paid By")}</div>
              <div> {renderInput("remarks", "Remark", "Enter Remark")}</div>
              <div> {renderSelect("paid_status", "Paid status", [
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "pending", label: "Pending" }
                  ])}</div>
                     <div> {renderSelect("clearance_status", "Clearance Status", [
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  ])}</div>
                     <div> {renderSelect("payment_mode", "Payment Mode", [
                  { value: "UPI", label: "UPI" },
                  { value: "Cash", label: "Cash" },
                  { value: "net banking", label: "net banking" },
                  { value: "Mobile banking", label: "Mobile banking" },
                  { value: "By company employee", label: "By company employee" },
                  { value: "credit card", label: "credit card" },
                  { value: "debit card", label: "debit card" },
                  { value: "bank transfer", label: "bank transfer" },
                  { value: "others", label: "others" },
                  ])}</div>
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
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleSubmit}
                className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Update
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
};

export default EditExpense;
