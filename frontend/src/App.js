import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import EmployeeDashboard from "./component/employee/EmployeeDashboard";
import AddEmployee from "./component/employee/AddEmployee";
import Home from "./component/home/home";
import DeliveryHome from "./component/delivery/deliveryHome"; 
import RecycleProducts from "./component/recycledProducts/RecycleProducts";

//Gangani
import RecycleProducts from "./component/recycledProducts/RecycleProducts";
import RecyclingProductsTable from "./component/recycledProducts/RecyclingProductsTable";
import RecycledProducts from "./component/recycledProducts/RecycledProducts";

//juthmini
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-dashbord" element={<RecycleProducts/>} />
          <Route path="/deliveryHome" element={<DeliveryHome />} /> 
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/product-dashbord" element={<RecycleProducts/>} /> {/* Gangani */}
          <Route path="/recycling-products" element={<RecyclingProductsTable/>} /> {/* Gangani */}
          <Route path="/recycled-products" element={<RecycledProducts/>} /> {/* Gangani */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
