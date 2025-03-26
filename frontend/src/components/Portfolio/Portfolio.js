import React, { useState } from "react";
import "./Portfolio.css";
import UploadDocument from "../UploadDocument/UploadDocument";
import loanData from "../../Data/loanData.js";

const filtersList = [
  "All",
  "Pre Sarfaesi",
  "NPA",
  "13(2) Responses",
  "Symbolic Possession",
  "DM Order",
  "Physical Possessions",
  "Auctions",
];

const Portfolio = () => {
  const [loans] = useState(loanData);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(["All"]);
  const [selectedLoanIds, setSelectedLoanIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔍 Filtered loans based on search
  const filteredLoans = loans.filter((loan) =>
    loan.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLoans = filteredLoans.slice(indexOfFirstItem, indexOfLastItem);

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
    const visibleIds = currentLoans.map((loan) => loan.id);
    if (checked) {
      setSelectedLoanIds((prev) => [...new Set([...prev, ...visibleIds])]);
    } else {
      setSelectedLoanIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    }
  };

  const isPageFullySelected = currentLoans.every((loan) =>
    selectedLoanIds.includes(loan.id)
  );

  return (
    <div className="portfolio-container">
      {/* Header */}
      <div className="portfolio-header">
        <h2>Portfolio</h2>
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

      {/* Search & Buttons Row */}
      <div className="search-controls">
        <input
          className="search-loan"
          placeholder="Search Loan Number"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset to page 1 on search
          }}
        />
        <div className="right-buttons">
          <button className="btn-outline">Select Columns ▼</button>
          <button className="btn-outline-morefilter" onClick={() => setShowUpload(true)}>
            More Filters
          </button>
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
        <span className="loan-count-right">{selectedLoanIds.length} loans selected</span>
      </div>

      {/* Upload Modal */}
      {showUpload && <UploadDocument onClose={() => setShowUpload(false)} />}

      {/* Table */}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isPageFullySelected}
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
          {currentLoans.map((loan) => (
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

      {/* Pagination Footer */}
      <div className="portfolio-footer">
        <span>
          Showing {indexOfFirstItem + 1}–
          {Math.min(indexOfLastItem, filteredLoans.length)} of {filteredLoans.length} results
        </span>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {pages.map((num) => (
            <button
              key={num}
              className={`pagination-btn ${currentPage === num ? "active-page" : ""}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
