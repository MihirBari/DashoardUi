import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const ProductDetails = ({ product, marketData }) => {
  const {
    product_name,
    product_id,
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
    other_cost,
    Final_cost,
  } = product;

  const [imageSrcList, setImageSrcList] = useState([]);

  useEffect(() => {
    console.log("Product Images:", product_image);

    if (Array.isArray(product_image)) {
      const images = product_image.map((imagePath) => {
        return imagePath;
      });

      console.log("Image Src List:", images);
      setImageSrcList(images);
    } else {
      console.error("Product images are not in the expected format:", product_image);
    }
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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col justify-center items-center mt-2">
      <div className="flex flex-col md:flex-row justify-center items-center mt-8">
        <div className="max-w-md w-full md:w-1/2  p-4 rounded-lg ">
          <Slider {...settings}>
            {imageSrcList.map((src, index) => (
              <div key={index}>
                <img
                  style={{ width: "50%", height: "50%" }}
                  src={src}
                  alt={`Product ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="max-w-md w-full md:w-1/2  p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Name : <span>{product_name} </span></h2>
          {/* <p className="text-gray-800 font-semibold mb-2">Description : {Description}</p> */}
          <p className="text-gray-800 font-semibold mb-2">product ID : {product_id}</p>
          <p className="text-gray-800 font-semibold mb-2">product Price : ₹ {product_price}</p>
          <p className="text-gray-800 font-semibold mb-2">Total price : ₹ {Final_cost}</p>
          <p className="text-gray-800 font-semibold mb-2">Type : {product_type}</p>
          <p className="text-gray-800 font-semibold mb-2">Stocks : {Stock}</p>

          {marketData &&
            Array.isArray(marketData) &&
            marketData.map((marketItem) => (
              <div key={marketItem.place}>
                {/* <p className="text-gray-800 font-semibold mb-2">{marketItem.place}: {marketItem.place}</p> */}
                {typeof marketItem.percent === 'number' && (
                  <p className="text-gray-800 font-semibold mb-2">
                    {marketItem.place}: ₹ {(Final_cost + (Final_cost * marketItem.percent) / 100).toFixed(2)}
                  </p>
                )}

              </div>
            ))}

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
      </div>

      <div className="flex gap-6">
        <Link to="/Product">
          <button className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Back
          </button>
        </Link>
        <Link to={`/addCustomers?productId=${product_id}`}>
          <button className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
