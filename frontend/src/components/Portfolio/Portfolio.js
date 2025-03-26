// src/components/Portfolio/Portfolio.js
import React, { useState } from "react";
import "./Portfolio.css";
import UploadDocument from "../UploadDocument/UploadDocument";

const Portfolio = () => {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="portfolio-container">
      <h2>Portfolio</h2>

      <button className="upload-btn" onClick={() => setShowUpload(true)}>
        Upload Document
      </button>

      {showUpload && <UploadDocument onClose={() => setShowUpload(false)} />}

      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Loan No.</th>
            <th>Loan Type</th>
            <th>Borrower</th>
            <th>Address</th>
            <th>Sanction Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>L28U3247</td>
            <td>Home Loan</td>
            <td>Vedika Sachar</td>
            <td>83 Yogi Ganj, Kadapa</td>
            <td>₹ 19,34,068</td>
          </tr>
          <tr>
            <td>L28U3243</td>
            <td>Car Loan</td>
            <td>Hrishita Agrawal</td>
            <td>86/622 Deo Path, Burhanpur</td>
            <td>₹ 18,42,143</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
