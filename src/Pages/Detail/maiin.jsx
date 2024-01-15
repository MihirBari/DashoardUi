import React from "react";
import DetailsTable from "./detailsTable";

const Main = () => {



  return (
    <div className="flex flex-col h-screen p-7">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-center">Details</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <DetailsTable />
      </div>
    </div>
  );
};

export default Main;
