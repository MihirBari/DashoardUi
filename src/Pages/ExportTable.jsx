import React, { useState } from "react";
import Modal from "react-modal";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ExportTable = ({ data, isOpen, onRequestClose }) => {
  const [fileName, setFileName] = useState("");

  const handleDownload = (type) => {
    if (type === "csv") {
      downloadCSV();
    } else if (type === "pdf") {
      downloadPDF();
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

  const downloadPDF = () => {
    // PDF download logic
    const doc = new jsPDF();
    doc.autoTable({ head: [Object.keys(data[0])], body: data.map(row => Object.values(row)) });
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