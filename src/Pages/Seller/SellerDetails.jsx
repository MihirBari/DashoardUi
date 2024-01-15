import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const SellerDetails = ({ product }) => {
  const {
    debitor_name,
    id,
    debitor_Date,
    debitor_Amount,
    paid_status,
    debitor_paid_by,
    product_type ,
      total_product ,
      other_cost ,
    remark,
    company_paid,
    payment_mode,
    reciept
  } = product;

  const [imageSrcList, setImageSrcList] = useState([]);

  useEffect(() => {
    console.log("Product Images:", reciept);
    
    if (Array.isArray(reciept)) {
      const images = reciept.map((imagePath) => {
        return imagePath; // Assuming imagePath already contains the "data:image" prefix
      });
  
      console.log("Image Src List:", images);
      setImageSrcList(images);
    } else {
      // Handle the case when product_image is not an array
      console.error("Product images are not in the expected format:", reciept);
    }
  }, [reciept]);


  const formattedDate = new Date(debitor_Date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "IST", // Adjust the timeZone if needed
  });

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
                style={{ width: "100%", height: "100%" }}
                src={src}
                alt={`Product ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="max-w-md w-full md:w-1/2  p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Name : <span>{debitor_name} </span></h2>
        <p className="text-gray-800 font-semibold mb-2">Date : {formattedDate}</p>
        <p className="text-gray-800 font-semibold mb-2">
           ID : {id}
        </p>
        <p className="text-gray-800 font-semibold mb-2">
          Amount : ₹ {debitor_Amount}
        </p>
        <p className="text-gray-800 font-semibold mb-2">Product Type : {product_type}</p>
        <p className="text-gray-800 font-semibold mb-2">Total cost : ₹ {total_product}</p>
        <p className="text-gray-800 font-semibold mb-2">Other Cost : ₹ {other_cost}</p>
        <p className="text-gray-800 font-semibold mb-2">
          Paid status : {paid_status}
        </p>
        <p className="text-gray-800 font-semibold mb-2">
          Paid By :  {debitor_paid_by}
        </p>
        <p className="text-gray-800 font-semibold mb-2">
         Remark :  {remark}
        </p>
        <p className="text-gray-800 font-semibold mb-2">Clearance Status : {company_paid}</p>
        <p className="text-gray-800 font-semibold mb-2">Payment Mode : {payment_mode}</p>
      </div>
    </div>

    <Link to="/Seller">
      <button className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ">
        Back
      </button>
    </Link>
  </div>
  );
};

export default SellerDetails;
