import React from "react";
import TotalProducts from "./TotalProducts";
import TotalProductsSold from "./TotalProductsSold";

import TotalAmountCollected from "./TotalAmountCollected";
import TotalReturned from "./TotalReturned";
import TotalAmountInvested from "./TotalAmountInvested";
import Profit from "./profit";
import { Link } from "react-router-dom";
import SizeWiseproduct from "./SizeWiseproduct.jsx";
import TotalExpense from "./TotalExpense.jsx";
import TotalBankSettlement from "./TotalBankSettlement.jsx";
import ProductType from "./ProductType.jsx";

const Main = () => {
 

  return (
    <div className="flex flex-col items-center justify-center h-screen p-7">
    <div className="mb-4">
      <h1 className="text-2xl font-semibold text-center">Dashboard</h1>
    </div>

    <div className="flex flex-wrap justify-center gap-4 scrollable">
        <div className="w-full md:w-1/6 mb-3">
          <Link to="/Product">
            <TotalProducts />
          </Link>
        </div>
        <div className="w-full md:w-1/6 mb-3">
          <TotalProductsSold />
        </div>
        {/* <div className="w-full md:w-1/4 mb-3">
          <TotalProductsLeft />
        </div> */}
        <div className="w-full md:w-1/6 mb-3">
          <TotalAmountCollected />
        </div>
        <div className="w-full md:w-1/6 mb-3">
          <TotalReturned />
        </div>
        <div className="w-full md:w-1/6 mb-3">
          <TotalAmountInvested />
        </div>
        <div className="w-full md:w-1/6 mb-3">
          <Profit />
        </div>
        <div className="w-full md:w-1/6 mb-3">
          <SizeWiseproduct />
        </div>
        <div className="w-full md:w-1/6 mb-3">
          <TotalExpense />
        </div>
        <div className="w-full md:w-1/6 mb-3">
          <TotalBankSettlement />
        </div>
        <div className="w-full md:w-1/6 mb-3">
          <ProductType />
        </div>
      </div>
    </div>
  );
};

export default Main;
