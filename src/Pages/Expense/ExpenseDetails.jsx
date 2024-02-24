import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const ExpenseDetails = ({ product }) => {
  const {
    name,
    id,
    date,
    amount,
    paid_status,
    paid_by,
    remarks,
    clearance_status,
    payment_mode,
    reciept
  } = product;

  const [imageSrcList, setImageSrcList] = useState([]);

  useEffect(() => {
    console.log("Product Images:", reciept);
    
    if (Array.isArray(reciept)) {
      const images = reciept.map((imagePath) => {
        return imagePath; 
      });
  
      console.log("Image Src List:", images);
      setImageSrcList(images);
    } else {
      // Handle the case when product_image is not an array
      console.error("Product images are not in the expected format:", reciept);
    }
  }, [reciept]);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "IST",
  });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const downloadImage = async (url, index) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
  
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Product_${index + 1}`;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-2">
      <div className="flex flex-col md:flex-row justify-center items-center mt-8">
        <div className="max-w-md w-full md:w-1/2  p-4 rounded-lg ">
          <Slider {...settings}>
            {imageSrcList.map((src, index) => (
              <div key={index}>
                <img
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  src={src}
                  alt={`Product ${index + 1}`}
                  onClick={() => downloadImage(src, index)}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="max-w-md w-full md:w-1/2  p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Name : <span>{name} </span></h2>
          <p className="text-gray-800 font-semibold mb-2">Date : {formattedDate}</p>
          <p className="text-gray-800 font-semibold mb-2">
             ID : {id}
          </p>
          <p className="text-gray-800 font-semibold mb-2">
            Amount : ₹ {amount}
          </p>
          <p className="text-gray-800 font-semibold mb-2">
            Paid status : {paid_status}
          </p>
          <p className="text-gray-800 font-semibold mb-2">
            Paid By :  {paid_by}
          </p>
          <p className="text-gray-800 font-semibold mb-2">
           Remark :  {remarks}
          </p>
          <p className="text-gray-800 font-semibold mb-2">Clearance Status : {clearance_status}</p>
          <p className="text-gray-800 font-semibold mb-2">Payment Mode : {payment_mode}</p>
        </div>
      </div>

      <Link to="/Expense">
        <button className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ">
          Back
        </button>
      </Link>
    </div>
  );
};

export default ExpenseDetails;
