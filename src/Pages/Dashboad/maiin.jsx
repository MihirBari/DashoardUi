import React from "react";
import TotalProducts from "./TotalProducts";
import TotalProductsSold from "./TotalProductsSold";
import TotalProductsLeft from "./TotalProductsLeft";
import TotalAmountCollected from "./TotalAmountCollected";
import TotalReturned from "./TotalReturned";
import TotalAmountInvested from "./TotalAmountInvested";
import Profit from "./profit";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-7">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-center">Dashboard</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <div className="w-full md:w-1/4 mb-3">
          <Link to='/Product'>
          <TotalProducts />
          </Link>
        </div>
        <div className="w-full md:w-1/4 mb-3">
          <TotalProductsSold />  
        </div>
        <div className="w-full md:w-1/4 mb-3">
          <TotalProductsLeft />
        </div>
        <div className="w-full md:w-1/4 mb-3">
          <TotalAmountCollected />
        </div>
        <div className="w-full md:w-1/4 mb-3">
          <TotalReturned />
        </div>
        <div className="w-full md:w-1/4 mb-3">
          <TotalAmountInvested />
        </div>
        <div className="w-full md:w-1/4 mb-3">
          <Profit />
        </div>
      </div>
    </div>
  );
};

export default Main;
