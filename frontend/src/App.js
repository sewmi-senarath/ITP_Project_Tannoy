import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import EmployeeDashboard from "./component/employee/EmployeeDashboard";
import AddEmployee from "./component/employee/AddEmployee";
import Home from "./component/home/home";
import DeliveryHome from "./component/delivery/deliveryHome"; 
import TechnicalHome from './component/technical/technicalHome';
import Addmachine from "./component/technical/addmachine";
//juthmini
import "./App.css";
import MachinePage from "./component/technical/page/MachinePage";

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
          <Route path="/technicalHome" element={<TechnicalHome />} />
          <Route path="/addmachine" element={<Addmachine />} />
          <Route path="/machine" element={< MachinePage/>} />
          
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
