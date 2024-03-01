import React, { useState } from "react";
import Modal from "react-modal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import API_BASE_URL from "../../config";
import axios from "axios";

const ExportTable = ({ data, marketColumns, isOpen, onRequestClose }) => {
  const [fileName, setFileName] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleDownload = (type) => {
    if (type === "csv") {
      downloadCSV();
    } else if (type === "pdf") {
      downloadPDF();
    }
  };

  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," + encodeURIComponent(generateCSV());
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onRequestClose();
  };

  const generateCSV = () => {
    if (!data || data.length === 0) {
      return "";
    }

    const headers = [
      ...Object.keys(data[0]),
      ...selectedColumns.map((col) => col.name),
    ].join(",");

    const csvRows = data.map((row) => {
      const rowData = Object.values(row);
      const columnData = selectedColumns.map((col) => col.selector(row));
      return [...rowData, ...columnData]
        .map((value) =>
          value !== null && value !== undefined ? value.toString() : ""
        )
        .join(",");
    });

    return [headers, ...csvRows].join("\n");
  };

  const fetchProductImage = async (productId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/order/OrderImage`,
        {
          product_id: productId,
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

  const downloadPDF = async () => {
    const doc = new jsPDF();
    const sizesToDisplay = [
      "s",
      "m",
      "l",
      "xl",
      "xxl",
      "xxxl",
      "xxxxl",
      "xxxxxl",
      "xxxxxxl",
    ];
  
    try {
      for (let index = 0; index < data.length; index++) {
        const product = data[index];
  
        if (index > 0) {
          doc.addPage();
        }
  
        console.log("Current product:", product);
  
        doc.setFontSize(16);
        doc.text(`Product: ${product.product_name}`, 10, 10);
  
        doc.setFontSize(12);
        let yPos = 30; // Adjusted yPos for proper spacing
  
        try {
          const publicId = await fetchProductImage(product.product_id);
          console.log("PublicId:", publicId); // Ensure publicId is received properly
  
          if (publicId) {
            const imageUrl = `https://res.cloudinary.com/dgcxd0kkk/image/upload/${publicId}`;
            console.log("ImageUrl:", imageUrl);
  
            try {
              const imgData = await getImageData(imageUrl);
              console.log("Image Data:", imgData);
  
              if (imgData) {
                doc.addImage(imgData, "JPEG", 10, yPos, 50, 50);
                yPos += 60; // Adjusted yPos after adding image
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
  
        doc.text(`Description: ${product.Description || ""}`, 10, yPos);
        yPos += 10;
  
        doc.text(`Product ID: ${product.product_id || ""}`, 10, yPos);
        yPos += 10;
  
        doc.text(`Type: ${product.product_type || ""}`, 10, yPos);
        yPos += 10;
  
        doc.text(`Stock: ${product.Stock || ""}`, 10, yPos);
        yPos += 10;
  
        doc.text(`Status: ${product.status || ""}`, 10, yPos);
        yPos += 10;
  
        sizesToDisplay.forEach((sizeLabel) => {
          if (product[sizeLabel] !== undefined && product[sizeLabel] !== 0) {
            doc.text(`${sizeLabel}: ${product[sizeLabel] || ""}`, 10, yPos);
            yPos += 10;
          }
        });
  
        selectedColumns.forEach(async (col) => {
          if (col.name === "marketData" && col.selector) {
            const marketData = col.selector(product);
            if (Array.isArray(marketData)) {
              marketData.forEach((marketItem) => {
                if (
                  marketItem.percent !== undefined &&
                  !isNaN(marketItem.percent)
                ) {
                  yPos += 10;
                  doc.text(
                    `${marketItem.place}: ₹ ${(
                      product.Final_cost +
                      (product.Final_cost * marketItem.percent) / 100
                    ).toFixed(2)}`,
                    10,
                    yPos
                  );
                }
              });
            }
          } else {
            const columnValue = col.selector(product);
            yPos += 10;
            doc.text(
              `${col.name}: ${columnValue !== undefined ? columnValue : ""}`,
              10,
              yPos
            );
          }
        });
      }
  
      // Save the PDF after all images are loaded
      doc.save(`${fileName}.pdf`);
      onRequestClose();
    } catch (error) {
      console.error("Error in downloadPDF:", error);
    }
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
  

  const handleColumnToggle = (column) => {
    if (selectedColumns.some((col) => col.name === column.name)) {
      setSelectedColumns(
        selectedColumns.filter((col) => col.name !== column.name)
      );
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        overlay: {
          zIndex: 9999,
        },
      }}
    >
      <h2>Export Options</h2>
      <label>
        File Name :
        <input
          type="text"
          style={{
            border: "1px solid #000",
            padding: "5px",
            borderRadius: "5px",
          }}
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </label>
      <div>
        <h3>Select Columns:</h3>
        {marketColumns.map((col) => (
          <label key={col.name}>
            <input
              type="checkbox"
              checked={selectedColumns.some(
                (selectedCol) => selectedCol.name === col.name
              )}
              onChange={() => handleColumnToggle(col)}
            />
            {col.name}
          </label>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        style={{ marginLeft: "10px" }}
        onClick={() => handleDownload("csv")}
      >
        Download CSV
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        style={{ margin: "20px" }}
        onClick={() => handleDownload("pdf")}
      >
        Download PDF
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onRequestClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default ExportTable;
