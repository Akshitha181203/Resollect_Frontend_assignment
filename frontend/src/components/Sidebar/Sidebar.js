// src/components/Sidebar/Sidebar.js
import React from "react";
import "./Sidebar.css";
import logo from "../Images/resollect_logo.jpeg";
import { FaHome, FaBriefcase, FaBell, FaFileAlt, FaGavel, FaUpload, FaTools, FaUsers, FaKey } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li><FaHome className="icon" /> Dashboard</li>
        <li><FaBriefcase className="icon" /> Portfolio</li>
        <li><FaBell className="icon" /> Notifications</li>
        <li><FaFileAlt className="icon" /> Notices</li>
        <li><FaGavel className="icon" /> Auction</li>
        <li><FaUpload className="icon" /> Data Upload</li>
        <li><FaTools className="icon" /> Control Panel</li>
        <li><FaUsers className="icon" /> User Management</li>
        <li><FaKey className="icon" /> Permissions</li>
      </ul>
      <div className="powered-by">
        <span>Powered by</span>
        <img src={logo} alt="Resollect" />
      </div>
    </div>
    
  );
};

export default Sidebar;
