import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import EmployeeDashboard from "./component/employee/EmployeeDashboard";
import AddEmployee from "./component/employee/AddEmployee";
import EditProfile from "./component/CRM/Editprofile/EditProfile";
import Home from "./component/home/home";
import DeliveryHome from "./component/delivery/deliveryHome"; 
import DisplayParselList from "./component/delivery/displayParselList";
import AddParselRequest from "./component/delivery/addDeliveryRequest";

//juthmini
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeDashboard />} />
          <Route path="/employee-dashboard" element={<AddEmployee />} />
          <Route path="/edit-profile-crm" element={<EditProfile />} />
          <Route path="/" element={<Home />} />
          <Route path="/deliveryHome" element={<DeliveryHome />} /> 
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/add-employee/:employeeId" element={<AddEmployee />} />
          <Route path="/parsel-list" element={<DisplayParselList />} /> 
          <Route path="/Add-parsel" element={<AddParselRequest />} /> 
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
