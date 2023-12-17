import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductDetails = ({ product }) => {
  const {
    product_name,
    Description,
    Stock,
    s,
    m,
    l,
    xl,
    xxl,
    xxxl,
    xxxxl,
    xxxxxl,
    xxxxxxl,
    product_price,
    Cost_price,
    product_type,
    product_image,
  } = product;

  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Assuming that product_image is a base64-encoded string
    const base64Image = `data:image/jpeg;base64,${product_image}`;
    setImageSrc(base64Image);
  }, [product_image]);

  const sizes = [
    { label: "S", quantity: s },
    { label: "M", quantity: m },
    { label: "L", quantity: l },
    { label: "XL", quantity: xl },
    { label: "XXL", quantity: xxl },
    { label: "XXXL", quantity: xxxl },
    { label: "XXXXL", quantity: xxxxl },
    { label: "XXXXXL", quantity: xxxxxl },
    { label: "XXXXXXL", quantity: xxxxxxl },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-md">
        <img style={{ width: '150px', height: '150px', margin: '10px' }} src={imageSrc} alt="" />
        <h2 className="text-xl font-semibold mb-2">Name : {product_name}</h2>
        <p className="text-gray-600 mb-2">Description : {Description}</p>
        <p className="text-gray-800 font-semibold mb-2">product Price : ₹ {product_price}</p>
        <p className="text-gray-800 font-semibold mb-2">Cost price : ₹ {Cost_price}</p>
        <p className="text-gray-600 mb-2">Type : {product_type}</p>
        <p className="text-gray-600 mb-2">Stocks : {Stock}</p>

        <div className="flex items-center">
          <p className="text-gray-600 mr-2">Sizes:</p>
          <div className="flex space-x-2">
            {sizes.map(
              (size) =>
                size.quantity > 0 && (
                  <span
                    key={size.label}
                    className="border border-gray-300 px-2 py-1 rounded-md text-gray-600"
                  >
                    {size.label} ({size.quantity})
                  </span>
                )
            )}
          </div>
        </div>
      </div>

      <Link to="/product">
        <button className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mt-20">
          Back
        </button>
      </Link>
    </div>
  );
};

export default ProductDetails;