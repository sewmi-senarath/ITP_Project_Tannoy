import React from "react";
// ape pages wala files tika import kara ganna
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import EmployeeDashboard from "./component/employee/EmployeeDashboard";
import AddEmployee from "./component/employee/AddEmployee";
//import Home from "./component/Home/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EmployeeDashboard from "./components/EmployeeDashboard";
import AddEmployee from "./components/AddEmployee";
import Home from "./components/Home/Home";
import EditProfile from "./component/CRM/Editprofile/EditProfile";

import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeDashboard />} />
          <Route path="/employee-dashboard" element={<AddEmployee />} />
          <Route path="/crmHome" element={<home/>} />
          <Route path="/crmhome" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
