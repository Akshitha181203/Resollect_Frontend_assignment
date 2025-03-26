// src/components/UploadDocument/UploadDocument.js
import React from "react";
import "./UploadDocument.css";

const UploadDocument = ({ onClose }) => {
  return (
    <div className="upload-modal">
      <div className="upload-content">
        <h3>Upload Document</h3>
        <label>Document Name:</label>
        <select>
          <option>Select</option>
          <option>Loan Agreement</option>
          <option>ID Proof</option>
        </select>

        <label>Document Type:</label>
        <select>
          <option>Select</option>
          <option>PDF</option>
          <option>Image</option>
        </select>

        <label>Document Remarks:</label>
        <input type="text" placeholder="Type here..." />

        <label>Select File:</label>
        <input type="file" />

        <div className="upload-actions">
          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
