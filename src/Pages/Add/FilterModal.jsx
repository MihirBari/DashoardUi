import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import API_BASE_URL from "../../config";

const FilterModal = ({
  isOpen,
  onClose,
  onApplyFilters,
  users,
  resetFilters,
}) => {
  const [searchText, setSearchText] = useState("");
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

  const applyFilters = () => {
    const filters = {
      searchText,
      productName,
      productType,
      status,
      costPriceMin,
      costPriceMax,
      dateFilterType,
      selectedDate: dateFilterType !== "between" ? selectedDate : null,
      startDate: dateFilterType === "between" ? startDate : null,
      endDate: dateFilterType === "between" ? endDate : null,
    };

    // Convert date values to "yyyy-MM-dd" format
    if (filters.selectedDate) {
      filters.selectedDate = new Date(selectedDate).toISOString().split("T")[0];
    }
    if (filters.startDate) {
      filters.startDate = new Date(startDate).toISOString().split("T")[0];
    }
    if (filters.endDate) {
      filters.endDate = new Date(endDate).toISOString().split("T")[0];
    }

    onApplyFilters(filters);
  };

  const handleResetFilters = () => {
    setSearchText("");
    setProductName("");
    setProductType("");
    setStatus("");
    setCostPriceMin("");
    setCostPriceMax("");
    setDateFilterType("");
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setStartDate(null);
    setEndDate(null);
    resetFilters();
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
          
          height: '50%', // Set the height here, e.g., 50%
          margin: 'auto', // Center the modal horizontally
        },
      }}
    >
      <div className="filter-modal">
        {/* Filter inputs */}
        {/* <select
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="">Search by Product ID</option>
          {users.map((user) => (
            <option key={user.product_id} value={user.product_id}>
              {user.product_id}
            </option>
          ))}
        </select> */}

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
