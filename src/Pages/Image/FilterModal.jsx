import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import API_BASE_URL from "../../config";

const FilterModal = ({
  isOpen,
  onClose,
  onApplyFilters,
  resetFilters,
  filters: initialFilters,
}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [status, setStatus] = useState("");
  const [costPriceMin, setCostPriceMin] = useState("");
  const [costPriceMax, setCostPriceMax] = useState("");
  const [dateFilterType, setDateFilterType] = useState("");
  const [productTypes, setProductTypes] = useState([]); // Initialize as empty array
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Today's date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
    console.log("Filters saved to local storage:", filters);
  }, [filters]);
  
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    if (savedFilters) {
      setFilters(savedFilters);
      console.log("Filters retrieved from local storage:", savedFilters);
    }
  }, []);

  const handleResetFilters = () => {
    setFilters(initialFilters);
    resetFilters(); // Reset filters in the parent component
  };
  
  useEffect(() => {
    // This useEffect will run after the state has been updated
    setProductName(""); // Reset productName when resetting filters
    setProductType(""); // Reset productType
    setStatus(""); // Reset status
    setCostPriceMin(""); // Reset costPriceMin
    setCostPriceMax(""); // Reset costPriceMax
    setDateFilterType(""); // Reset dateFilterType
    setSelectedDate(new Date().toISOString().split("T")[0]); // Reset selectedDate
    setStartDate(null); // Reset startDate
    setEndDate(null); // Reset endDate
  }, [filters]); // Run this effect whenever the filters state changes

  const applyFilters = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/prod/sendImage`, {
        params: {
          productName,
          productType,
          status,
          costPriceMin,
          costPriceMax,
          dateFilterType,
          selectedDate: dateFilterType !== "between" ? selectedDate : null,
          startDate: dateFilterType === "between" ? startDate : null,
          endDate: dateFilterType === "between" ? endDate : null,
        },
      });
      onApplyFilters(response.data);
    } catch (error) {
      console.error("Error applying filters:", error.message);
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          zIndex: 9999,
        },
        content: {
          
          height: '40%', // Set the height here, e.g., 50%
          margin: 'auto', // Center the modal horizontally
        },
      }}
    >
      <div className="filter-modal">
        
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        />

        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        >
          <option value="">Select Product Type</option>
          {productTypes &&
           productTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
            ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="Close">Close</option>
          <option value="upcoming">upcoming</option>
          <option value="Draft">Draft</option>
        </select>

        <input
          type="number"
          placeholder="Min Cost Price"
          value={costPriceMin}
          onChange={(e) => setCostPriceMin(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        />

        <input
          type="number"
          placeholder="Max Cost Price"
          value={costPriceMax}
          onChange={(e) => setCostPriceMax(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        />

        <select
          value={dateFilterType}
          onChange={(e) => setDateFilterType(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        >
          <option value="">Select Date Filter</option>
          <option value="equal">Equal to</option>
          <option value="before">Before</option>
          <option value="after">After</option>
          <option value="between">Between</option>
        </select>

        {dateFilterType &&
          (dateFilterType === "equal" ||
            dateFilterType === "before" ||
            dateFilterType === "after") && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
            />
          )}

        {dateFilterType === "between" && (
          <div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
            />
          </div>
        )}

        {/* Apply and Cancel buttons */}
        <button
          onClick={() => {
            applyFilters();
            onClose();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          style={{ marginLeft: "10px" }}
        >
          Apply Filters
        </button>

        <button
          onClick={handleResetFilters}
          className="bg-red-500 text-white px-4 py-2 rounded"
          style={{ marginLeft: "10px" }}
        >
          Clear Filters
        </button>

        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
        
      </div>
    </Modal>
  );
};

export default FilterModal;
