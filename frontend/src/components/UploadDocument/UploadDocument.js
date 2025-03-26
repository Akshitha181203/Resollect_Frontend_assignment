import React from "react";
import "./UploadDocument.css";
import { FaTimes } from "react-icons/fa";

const UploadDocument = ({ onClose }) => {
  return (
    <div className="upload-modal-backdrop">
      <div className="upload-drawer">
        <div className="upload-header">
          <h3>Upload Document</h3>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <div className="upload-form">
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
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="submit-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
