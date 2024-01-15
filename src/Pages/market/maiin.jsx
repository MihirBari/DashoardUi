import React from "react";
import { useNavigate } from "react-router-dom";
import TableMarket from "./tableMarket";

const Maiin = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {

    navigate("/addMarket");
  };

  return (
    <>
      <div className="h-screen flex-1 p-7">
        <div>
          <h1 className="text-2xl font-semibold text-center">Market</h1>
        </div>
        <div style={{ float: "right" }}>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "8px 16px",
              cursor: "pointer",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
        <div style={{ marginTop: "70px" }}>
          <TableMarket />
        </div>
      </div>
    </>
  );
};

export default Maiin;
