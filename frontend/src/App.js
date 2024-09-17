import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import EmployeeDashboard from "./component/employee/EmployeeDashboard";
import AddEmployee from "./component/employee/AddEmployee";
import Home from "./component/home/home";
import DeliveryHome from "./component/delivery/deliveryHome"; 

//juthmini
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deliveryHome" element={<DeliveryHome />} /> 
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
