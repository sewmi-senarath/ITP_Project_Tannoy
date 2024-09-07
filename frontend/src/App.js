import React from "react";
// ape pages wala files tika import kara ganna
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EmployeeDashboard from "./components/EmployeeDashboard";
import AddEmployee from "./components/AddEmployee";
import Home from "./components/Home/Home";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeDashboard />} />
          <Route path="/employee-dashboard" element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
