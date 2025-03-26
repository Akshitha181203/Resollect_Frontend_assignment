import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Portfolio from "./components/Portfolio/Portfolio";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Portfolio />
      <Sidebar />
      <div className="content">
        <h2>Welcome to Dashboard</h2>
      </div>
    </div>
  );
};

export default App;