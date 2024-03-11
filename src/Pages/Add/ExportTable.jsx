import React, { useState } from "react";
import Modal from "react-modal";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ExportTable = ({ data, marketColumns, isOpen, onRequestClose }) => {
  const [fileName, setFileName] = useState("");

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

    const headers = Object.keys(data[0] || {}).join(",");
    const csvRows = data.map((row) =>
      Object.values(row)
        .map((value) => (value !== null && value !== undefined ? value.toString() : ""))
        .join(",")
    );
    return [headers, ...csvRows].join("\n");
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();
  
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
  
     
        doc.text(`Order ID: ${product.order_id || ""}`, 10, yPos);
        yPos += 10;
  
        doc.text(`Product ID: ${product.product_id || ""}`, 10, yPos);
        yPos += 10;
  
        doc.text(`Amount Sold: ${product.amount_sold || ""}`, 10, yPos);
        yPos += 10;
  
        doc.text(`Sold By: ${product.paid_by || ""}`, 10, yPos);
        yPos += 10;
  
        doc.text(`Amount Condition: ${product.amount_condition || ""}`, 10, yPos);
        yPos += 10;

        doc.text(`Returned: ${product.returned || ""}`, 10, yPos);
        yPos += 10;

        doc.text(`Bank Payment: ${product.bank_payment || ""}`, 10, yPos);
        yPos += 10;
  
        doc.text(`City: ${product.city || ""}`, 10, yPos);
        yPos += 10;

        doc.text(`Size: ${product.Total_items || ""}`, 10, yPos);
        yPos += 10;

        doc.text(`Delivery Status: ${product.delivery_status || ""}`, 10, yPos);
        yPos += 10;

        doc.text(`Bank Payment: ${product.bank_payment || ""}`, 10, yPos);
        yPos += 10;

        doc.text(`Profit Margin: ${product.Final_cost - product.bank_payment || ""}`, 10, yPos);
        yPos += 10;
  
      }
  
      // Save the PDF after all images are loaded
      doc.save(`${fileName}.pdf`);
      onRequestClose();
    } catch (error) {
      console.error("Error in downloadPDF:", error);
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
