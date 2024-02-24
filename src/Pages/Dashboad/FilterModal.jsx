import React, { useState } from "react";
import Modal from "react-modal";

const FilterModal = ({
  isOpen,
  onClose,
  onApplyFilters,
  users,
  resetFilters,
}) => {
  const [dateFilterType, setDateFilterType] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const applyFilters = (filters) => {
    if (!filters) {
      console.error('Filters are not defined');
      return;
    }
  
    const { dateFilterType, selectedDate, startDate, endDate } = filters;
  
    const formattedFilters = {
      dateFilterType,
      selectedDate: dateFilterType !== "between" ? new Date(selectedDate).toISOString().split("T")[0] : null,
      startDate: dateFilterType === "between" ? new Date(startDate).toISOString().split("T")[0] : null,
      endDate: dateFilterType === "between" ? new Date(endDate).toISOString().split("T")[0] : null,
    };
    // Send filters to the parent component
    onApplyFilters(formattedFilters);
  };
  

  const handleResetFilters = () => {
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
          width: "50%",
          height: "50%",
          margin: "auto",
        },
      }}
    >
      <div className="filter-modal">
        <select
          value={dateFilterType}
          onChange={(e) => setDateFilterType(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ml-2"
        >
          <option value="">Select Date Filter</option>
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
            applyFilters({
              dateFilterType,
              selectedDate,
              startDate,
              endDate,
            });
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
