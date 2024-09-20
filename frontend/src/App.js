import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import EmployeeDashboard from "./component/employee/EmployeeDashboard";
import AddEmployee from "./component/employee/AddEmployee";
import DisplayAttendance from "./component/employee/DisplayAttendance";
import MarkAttendance from "./component/employee/MarkAttendance";
import Home from "./component/home/home";
import DeliveryHome from "./component/delivery/deliveryHome"; 
import DisplayParselList from "./component/delivery/displayParselList";
import AddParselRequest from "./component/delivery/addDeliveryRequest";
import AddNewOrder from "./component/CRM/AddOrder/AddNewOrder";
import OrderDtails from "./component/CRM/OrderDtails/OrderDtails";
import UpdateOrder from "./component/CRM/UpdateOrder/UpdateOrder";
import CrmHome from "./component/CRM/CRMHome/CrmHome";
import CrmReport from "./component/CRM/CrmReport/CRMReport";
import EmployeeSalaryReport from "./component/employee/EmployeeSalaryReport";
import ProductDashboard from "./component/Inventory/ProductDashboard";
import AddProduct from "./component/Inventory/AddProduct";

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
          <Route path="/add-employee/:employeeId" element={<AddEmployee />} />
          <Route path="/parsel-list" element={<DisplayParselList />} /> 
          <Route path="/Add-parsel" element={<AddParselRequest />} />
          <Route path="/mark-attendance" element={<MarkAttendance />} />  
          <Route path="/displayattendance" element={<DisplayAttendance />} />
          <Route path="/addorder" element={<AddNewOrder />} />
          <Route path="/orderDetails" element={<OrderDtails />} />
          <Route path="/updateOrder/:Oid" element={<UpdateOrder />} /> 
          <Route path="/crmHome" element={<CrmHome />} />
          <Route path="/crmReport" element={<CrmReport />} />
          <Route path="/employeesalaryReport" element={<EmployeeSalaryReport/>} />
          <Route path="/productDashboard" element={<ProductDashboard/>} />
          <Route path="/Addproduct" element={<AddProduct/>} />
          <Route path="/Addproduct/:productId" element={<AddProduct />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
