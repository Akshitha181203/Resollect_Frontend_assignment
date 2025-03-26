import React, { useState } from "react";
import "./Portfolio.css";
import UploadDocument from "../UploadDocument/UploadDocument";

const filtersList = [
  "All", "Pre Sarfaesi", "NPA", "13(2) Responses", "Symbolic Possession",
  "DM Order", "Physical Possessions", "Auctions"
];

const initialLoans = [
  {
    id: "L28U3247",
    type: "Home Loan",
    borrower: "Vedika Sachar",
    address: "83 Yogi Ganj, Kadapa-058270",
    coName: "Divit Vora",
    coAddress: "24/543, Acharya Path, Ongole",
    dpd: 91,
    amount: "₹ 1934068",
    region: "West",
    status: "Updated",
  },
  {
    id: "L28U3243",
    type: "Car Loan",
    borrower: "Hrishita Agrawal",
    address: "86/622 Deo Path, Berhampore",
    coName: "Mahika Tak",
    coAddress: "58 Tella Road, Sultan Pur",
    dpd: 100,
    amount: "₹ 1842143",
    region: "North",
    status: "Missing",
  },
];

const Portfolio = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(["All"]);
  const [loans, setLoans] = useState(initialLoans);
  const [selectedLoanIds, setSelectedLoanIds] = useState([]);

  const toggleFilter = (filter) => {
    if (filter === "All") {
      setSelectedFilters(["All"]);
    } else {
      const updated = selectedFilters.includes(filter)
        ? selectedFilters.filter((f) => f !== filter)
        : [...selectedFilters.filter((f) => f !== "All"), filter];
      setSelectedFilters(updated.length > 0 ? updated : ["All"]);
    }
  };

  const toggleLoan = (id) => {
    setSelectedLoanIds((prev) =>
      prev.includes(id) ? prev.filter((loanId) => loanId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (checked) => {
    if (checked) {
      setSelectedLoanIds(loans.map((loan) => loan.id));
    } else {
      setSelectedLoanIds([]);
    }
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h2>Portfolio</h2>
        <button className="upload-btn" onClick={() => setShowUpload(true)}>
          Upload Document
        </button>
      </div>

      {/* Filters */}
      <div className="portfolio-filters">
        {filtersList.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${selectedFilters.includes(filter) ? "active" : ""}`}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search and Buttons */}
      <div className="search-controls">
        <input className="search-loan" placeholder="Search Loan Number" />
        <div className="right-buttons">
          <button className="btn-outline">Select Columns ▼</button>
          <button className="btn-outline">More Filters</button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="portfolio-action-bar">
        <button
          className={`action-btn ${selectedLoanIds.length > 0 ? "enabled" : "disabled"}`}
          disabled={selectedLoanIds.length === 0}
        >
          Generate Pre Sarfaesi Notice
        </button>

        <button
          className={`action-btn ${selectedLoanIds.length > 0 ? "enabled" : "disabled"}`}
          disabled={selectedLoanIds.length === 0}
        >
          Declare NPA ({selectedLoanIds.length})
        </button>

        <span className="loan-count-right">
          {selectedLoanIds.length} loans selected
        </span>
      </div>

      {showUpload && <UploadDocument onClose={() => setShowUpload(false)} />}

      {/* Table */}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedLoanIds.length === loans.length}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
            </th>
            <th>Loan No.</th>
            <th>Loan Type</th>
            <th>Borrower</th>
            <th>Borrower Address</th>
            <th>Co Borrower 1 Name</th>
            <th>Co Borrower 1 Address</th>
            <th>Current DPD</th>
            <th>Sanction Amount</th>
            <th>Region</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedLoanIds.includes(loan.id)}
                  onChange={() => toggleLoan(loan.id)}
                />
              </td>
              <td className="loan-link">{loan.id}</td>
              <td>{loan.type}</td>
              <td>{loan.borrower}</td>
              <td>{loan.address}</td>
              <td>{loan.coName}</td>
              <td>{loan.coAddress}</td>
              <td>{loan.dpd}</td>
              <td>{loan.amount}</td>
              <td>{loan.region}</td>
              <td>{loan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
