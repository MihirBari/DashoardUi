import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import API_BASE_URL from "../../config";

const FilterModal = ({
  isOpen,
  onClose,
  onApplyFilters,
  resetFilters
}) => {
  const [productName, setProductName] = useState("");
  const [amountCredited, setAmountCredited] = useState("");
  const [returned, setReturned] = useState("");
  const [orderId, setOrderId] = useState("");
  const [soldBy, setSoldBy] = useState("");
  const [soldBys, setSoldBys] = useState([]);
  const [city, setCity] = useState("");
  const [citys, setCitys] = useState([]);
  const [size, setSize] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [costPriceMin, setCostPriceMin] = useState("");
  const [costPriceMax, setCostPriceMax] = useState("");
  const [dateFilterType, setDateFilterType] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderIds, setOrderIds] = useState([]);
  const [shouldApplyFilters, setShouldApplyFilters] = useState(false);

  useEffect(() => {
    const fetchorderIds = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/order/orderID`);
        setOrderIds(response.data);
      } catch (error) {
        console.error("Error fetching product types:", error.message);
      }
    };
    fetchorderIds();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/order/city`);
        setCitys(response.data);
      } catch (error) {
        console.error("Error fetching product types:", error.message);
      }
    };
    fetchCity();
  }, []);

  useEffect(() => {
    const fetchSoldBy = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/order/paidBy`);
        setSoldBys(response.data);
      } catch (error) {
        console.error("Error fetching product types:", error.message);
      }
    };
    fetchSoldBy();
  }, []);


  const applyFilters = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/order/viewOrder`, {
        params: {
          productName,
          orderId,
          soldBy,
          amountCredited,
          returned,
          city,
          size,
          deliveryStatus,
          costPriceMin,
          costPriceMax,
          dateFilterType,
          selectedDate: dateFilterType !== "between" ? selectedDate : null,
          startDate: dateFilterType === "between" ? startDate : null,
          endDate: dateFilterType === "between" ? endDate : null,
        },
      });
      console.log("Server Response:", response.data); // Log the response
      onApplyFilters(response.data.products, response.data.total[0]);
      localStorage.setItem('OrderFilters', JSON.stringify({
        productName,
        amountCredited,
        returned,
        orderId,
        soldBy,
        city,
        size,
        deliveryStatus,
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
    const storedFilters = localStorage.getItem('OrderFilters');
    if (storedFilters) {
      const {
        productName: storedproductName,
        amountCredited: storedamountCredited,
        returned: storedreturned,
        orderId: storedorderId,
        soldBy: storedsoldBy,
        city: storedcity,
        size: storedsize,
        deliveryStatus: storedeliveryStatus,
        costPriceMin: storedCostPriceMin,
        costPriceMax: storedCostPriceMax,
        dateFilterType: storedDateFilterType,
        selectedDate: storedSelectedDate,
        startDate: storedStartDate,
        endDate: storedEndDate,
      } = JSON.parse(storedFilters);
  
      // Set filter values to state
      setProductName(storedproductName);
      setAmountCredited(storedamountCredited);
      setReturned(storedreturned);
      setSoldBy(storedsoldBy);
      setOrderId(storedorderId);
      setCity(storedcity);
      setDeliveryStatus(storedeliveryStatus);
      setSize(storedsize);
      setCostPriceMin(storedCostPriceMin);
      setCostPriceMax(storedCostPriceMax);
      setDateFilterType(storedDateFilterType);
      setSelectedDate(storedSelectedDate);
      setStartDate(storedStartDate);
      setEndDate(storedEndDate);

  
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
    setProductName("");
    setAmountCredited("");
    setReturned("");
    setOrderId("");
    setSoldBy("");
    setCity("");
    setSize([]);
    setDeliveryStatus("");
    setCostPriceMin("");
    setCostPriceMax("");
    setDateFilterType("");
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setStartDate(null);
    setEndDate(null);
    resetFilters(); // Reset filters to their initial state
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

        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        />

        <select
          value={orderId}
          onChange={(e) => setOrderId(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        multiple
        >
          <option value="">Select Product ID</option>
          {orderIds &&
           orderIds.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
            ))}
        </select>

        <select
          value={soldBy}
          onChange={(e) => setSoldBy(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        multiple
        >
          <option value="">Select Sold By</option>
          {soldBys &&
           soldBys.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
               ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        multiple
        >
          <option value="">Select City</option>
          {citys &&
           citys.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
            ))}
        </select>

        <select
          value={amountCredited}
          onChange={(e) => setAmountCredited(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        >
          <option value="">Select Amount Credited</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="yes Returned">Yes Returned</option>
          <option value="no Returned">No Returned</option>
        </select>

        <select
          value={returned}
          onChange={(e) => setReturned(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        >
          <option value="">Returned</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select
          value={deliveryStatus}
          onChange={(e) => setDeliveryStatus(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
       multiple
       >
          <option value="">Delivery</option>
          <option value="In process">In process</option>
          <option value="In transit">In transit</option>
          <option value="Completed">Completed</option>
          <option value="Returned">Returned</option>
        </select>

        <select
          value={size}
          onChange={(e) => setSize(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        multiple
        >
          <option value="">Select Size</option>
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