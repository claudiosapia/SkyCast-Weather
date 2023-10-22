import React from "react";

import { Routes, Route, Link } from "react-router-dom";
import { Layout } from "antd";
//components
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <Dashboard />
        </Layout>
      </div>
    </div>
  );
}

export default App;
