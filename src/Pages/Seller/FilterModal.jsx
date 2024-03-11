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
  const [paidStatus, setPaidStatus] = useState("");
  const [paymentmode, setPaymentmode] = useState("");
  const [clearanceStatus, setClearanceStatus] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [paidBys, setPaidBys] = useState([]);
  const [costPriceMin, setCostPriceMin] = useState("");
  const [costPriceMax, setCostPriceMax] = useState("");
  const [dateFilterType, setDateFilterType] = useState("");
  const [productTypes, setProductTypes] = useState([]); 
  const [productType, setProductType] = useState([]); 
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Today's date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [shouldApplyFilters, setShouldApplyFilters] = useState(false);

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
    const fetchPaidBy = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/dealer/paidBy`);
        setPaidBys(response.data);
      } catch (error) {
        console.error("Error fetching product types:", error.message);
      }
    };

    fetchPaidBy();
  }, []);


  const applyFilters = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/dealer/showDealer`, {
        params: {
          paidStatus,
          paidBy,
          paymentmode,
          clearanceStatus,
          productTypes,
          costPriceMin,
          costPriceMax,
          dateFilterType,
          selectedDate: dateFilterType !== "between" ? selectedDate : null,
          startDate: dateFilterType === "between" ? startDate : null,
          endDate: dateFilterType === "between" ? endDate : null,
        }
      });
      onApplyFilters(response.data.dealers, response.data.total[0]); 
      localStorage.setItem('SellerFilters', JSON.stringify({
        paidStatus,
        paidBy,
        paymentmode,
        clearanceStatus,
        productType,
        costPriceMin,
        costPriceMax,
        dateFilterType,
        selectedDate,
        startDate,
        endDate,
      }));
    } catch (error) {
      console.error("Error applying filters:", error.message);
    }
  };
  
  useEffect(() => {
    // Retrieve filter values from localStorage
    const storedFilters = localStorage.getItem('SellerFilters');
    if (storedFilters) {
      const {
        paidStatus: storedPaidStatus,
        paidBy: storedPaidBy,
        paymentmode: storedPaymentmode,
        clearanceStatus: storedClearanceStatus,
        costPriceMin: storedCostPriceMin,
        costPriceMax: storedCostPriceMax,
        dateFilterType: storedDateFilterType,
        selectedDate: storedSelectedDate,
        startDate: storedStartDate,
        endDate: storedEndDate,
        productType:storedproductType
      } = JSON.parse(storedFilters);
  
      // Set filter values to state
      setPaidStatus(storedPaidStatus);
      setPaidBy(storedPaidBy);
      setPaymentmode(storedPaymentmode);
      setClearanceStatus(storedClearanceStatus);
      setCostPriceMin(storedCostPriceMin);
      setCostPriceMax(storedCostPriceMax);
      setDateFilterType(storedDateFilterType);
      setSelectedDate(storedSelectedDate);
      setStartDate(storedStartDate);
      setEndDate(storedEndDate);
      setProductType(storedproductType)
  
      // Apply retrieved filters
      setShouldApplyFilters(true);
    }
  }, []);

  useEffect(() => {
    // Apply filters when the flag is set to true
    if (shouldApplyFilters) {
      applyFilters();
      // Reset the flag to false after applying filters
      setShouldApplyFilters(false);
    }
  }, [shouldApplyFilters]);
  

  const handleResetFilters = () => {
    setPaidStatus("");
    setPaymentmode("");
    setClearanceStatus("");
    setProductType("");
    setCostPriceMin("");
    setCostPriceMax("");
    setPaidBy("");
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
  
      <select
          value={paidStatus}
          onChange={(e) => setPaidStatus(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        >
          <option value="">Select Paid Status</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select
          value={paymentmode}
          onChange={(e) => setPaymentmode(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
          multiple
        >
          <option value="">Select Payment Mode</option>
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

        <select
          value={clearanceStatus}
          onChange={(e) => setClearanceStatus(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        >
          <option value="">Select Company Payment Status</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select
          value={paidBy}
          onChange={(e) =>
            setPaidBy(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
          multiple
        >
          <option value="">Select Paid By</option>
          {paidBys &&
            paidBys.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
        </select>

        <select
          value={productType}
          onChange={(e) => setProductType(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )}
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
