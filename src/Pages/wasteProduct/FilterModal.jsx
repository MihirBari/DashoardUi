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
  const [filters, setFilters] = useState(() => {
    try {
      const savedFilters = JSON.parse(localStorage.getItem("filters"));
      if (savedFilters) {
        return savedFilters;
      }
    } catch (error) {
      console.error("Error retrieving filters from local storage:", error);
    }
    return initialFilters;
  });

  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [status, setStatus] = useState("");
  const [costPriceMin, setCostPriceMin] = useState("");
  const [costPriceMax, setCostPriceMax] = useState("");
  const [dateFilterType, setDateFilterType] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
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
    try {
      if (productName || productType.length > 0 || status.length > 0 ||
        costPriceMin || costPriceMax || dateFilterType || selectedDate || startDate || endDate) {
        const filtersToSave = {
          productName,
          productType,
          status,
          costPriceMin,
          costPriceMax,
          dateFilterType,
          selectedDate,
          startDate,
          endDate,
        };
        localStorage.setItem("filters", JSON.stringify(filtersToSave));
      }
    } catch (error) {
      console.error("Error saving filters to local storage:", error);
    }
  }, [productName, productType, status, costPriceMin, costPriceMax, dateFilterType, selectedDate, startDate, endDate]);

  useEffect(() => {
    try {
      const savedFilters = JSON.parse(localStorage.getItem("filters"));
      if (savedFilters) {
        setFilters(savedFilters);
      } else {
        setFilters(initialFilters);
      }
    } catch (error) {
      console.error("Error retrieving filters from local storage:", error);
      setFilters(initialFilters);
    }
  }, []);

  const handleResetFilters = () => {
    setFilters(initialFilters);
    resetFilters();
  };

  useEffect(() => {
    setProductName("");
    setProductType("");
    setStatus("");
    setCostPriceMin("");
    setCostPriceMax("");
    setDateFilterType("");
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setStartDate(null);
    setEndDate(null);
  }, [filters]);

  const applyFilters = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/prod/wasteProduct`, {
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
      onApplyFilters(response.data.products);
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
          height: "40%", 
          margin: "auto",
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
          onChange={(e) =>
            setProductType(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
          multiple
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
          onChange={(e) =>
            setStatus(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
          multiple
        >
          <option value="">Select Status</option>
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
