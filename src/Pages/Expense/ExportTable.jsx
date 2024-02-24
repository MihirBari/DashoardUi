import React, { useState } from "react";
import Modal from "react-modal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import API_BASE_URL from "../../config";

const ExportTable = ({ data, isOpen, onRequestClose }) => {
  const [fileName, setFileName] = useState("");

  const handleDownload = (type) => {
    if (type === "csv") {
      downloadCSV();
    } else if (type === "pdf") {
      downloadPDF();
    }
  };

  const fetchProductImage = async (productId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/expense/recieptImage`,
        {
          id: productId, // Send the productId to the backend
        }
      );
      const publicId = response.data[0].publicId; // Accessing publicId from the first element of the array
      console.log("Public ID:", publicId);
      return publicId; // Return the publicId
    } catch (error) {
      console.error("Error fetching product image:", error);
      return null; // Return null or handle the error appropriately
    }
  };

  const downloadCSV = () => {
    // CSV download logic (same as before)
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(generateCSV());
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onRequestClose();
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();
  
    for (const product of data) {
      if (doc.internal.getNumberOfPages() > 0) {
        doc.addPage();
      }
  
      doc.setFontSize(16);
      doc.text(`Name: ${product.name}`, 10, 10);
  
      doc.setFontSize(12);
      let yPos = 40; // Set initial yPos value higher
  
      try {
        const publicId = await fetchProductImage(product.id);
        console.log("PublicId:", publicId); // Ensure publicId is received properly
  
        if (publicId) {
          const imageUrl = `https://res.cloudinary.com/dgcxd0kkk/image/upload/${publicId}`;
          console.log("ImageUrl:", imageUrl);
  
          try {
            const imgData = await getImageData(imageUrl);
            console.log("Image Data:", imgData);
  
            if (imgData) {
              doc.addImage(imgData, "JPEG", 10, yPos, 50, 50);
              yPos += 60; // Increment yPos by image height and some padding
            } else {
              console.error("Empty image data received");
            }
          } catch (error) {
            console.error("Error loading image data:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching publicId:", error);
      }
  
      doc.text(`Date: ${product.date || ''}`, 10, yPos);
      yPos += 10; // Increment yPos for the next element
  
      doc.text(`Amount: ${product.amount || ''}`, 10, yPos);
      yPos += 10; // Increment yPos for the next element
  
      doc.text(`Paid By: ₹ ${product.paid_by || ''}`, 10, yPos);
      yPos += 10; // Increment yPos for the next element
  
      doc.text(`Remark: ₹ ${product.remarks || ''}`, 10, yPos);
      yPos += 10; // Increment yPos for the next element
  
      doc.text(`Paid Status: ${product.paid_status || ''}`, 10, yPos);
      yPos += 10; // Increment yPos for the next element
  
      doc.text(`Clearance status: ${product.clearance_status || ''}`, 10, yPos);
      yPos += 10; // Increment yPos for the next element
  
      doc.text(`Payment Mode: ${product.payment_mode || ''}`, 10, yPos);
      yPos += 10; // Increment yPos for the next element
    }
  
    doc.save(`${fileName}.pdf`);
    onRequestClose();
};


  const generateCSV = () => {
    if (!data || data.length === 0) {
      return "";
    }

    const headers = Object.keys(data[0] || {}).join(",");
    const csvRows = data.map((row) =>
      Object.values(row)
        .map((value) => (value !== null && value !== undefined ? value.toString() : ""))
        .join(",")
    );

    return [headers, ...csvRows].join("\n");
  };

  const getImageData = async (imageUrl) => {
    try {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Allow loading cross-origin images
  
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      return new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imageData = canvas.toDataURL("image/jpeg");
          console.log("ImageData:", imageData); // Log image data
          resolve(imageData);
        };
        img.onerror = (error) => {
          console.error("Error loading image:", error); // Log any errors during image loading
          reject(error);
        };
        img.src = imageUrl;
      });
    } catch (error) {
      console.error("Error in getImageData:", error);
      return null;
    }
  };
  

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}
    style={{
      overlay: {
        zIndex: 9999,
      },
    }}
    >
      <h2>Export Options</h2>
      <label>
        File Name:
        <input type="text" style={{ border: "1px solid #000", padding: "5px", borderRadius: "5px" }} value={fileName} onChange={(e) => setFileName(e.target.value)} />
      </label>
      <button  className="bg-blue-500 text-white px-4 py-2 rounded" style={{marginLeft:"10px"}}  onClick={() => handleDownload("csv")}>Download CSV</button>
      <button  className="bg-blue-500 text-white px-4 py-2 rounded" style={{margin:"20px"}} onClick={() => handleDownload("pdf")}>Download PDF</button>
      <button  className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ExportTable;