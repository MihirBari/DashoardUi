import React from "react";
import { useNavigate } from "react-router-dom";
import TableProduct from "./tableProduct";

const Main = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/addProd");
  };

  return (
    <div className="flex flex-col h-screen p-7">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-center">Products Not Needed</h1>
      </div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        
        <TableProduct />
      </div>
    </div>
  );
};

export default Main;
