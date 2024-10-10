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
import TechnicalHome from './component/technical/technicalHome';
import Addmachine from "./component/technical/addmachine";
//juthmini
//import "./App.css";
import MachinePage from "./component/technical/page/MachinePage";
import DisplayParselList from "./component/delivery/displayParselList";
import AddParselRequest from "./component/delivery/addDeliveryRequest";
import UpdateParselReq from "./component/delivery/updateParselReq";
import AddNewOrder from "./component/CRM/AddOrder/AddNewOrder";
import OrderDtails from "./component/CRM/OrderDtails/OrderDtails";
import UpdateOrder from "./component/CRM/UpdateOrder/UpdateOrder";
import CrmHome from "./component/CRM/CRMHome/CrmHome";
import CrmReport from "./component/CRM/CrmReport/CRMReport";
import EmployeeSalaryReport from "./component/employee/EmployeeSalaryReport";
import ProductDashboard from "./component/Inventory/ProductDashboard";
import AddProduct from "./component/Inventory/AddProduct";
import AddSupplier from "./component/Inventory/AddSupplier";
import StockDashboard from "./component/Inventory/StockDashboard";
import AddStock from "./component/Inventory/AddStock";
import SupplierDashboard from "./component/Inventory/SupplierDashboard";
import StockReport from "./component/Inventory/StockReport";
import CRMRegister from "./component/CRM/CRMRegister/Register";
import CRMLogin from "./component/CRM/CRMLogin/Login";
//Gangani
import RecycleProductsDashboard from "./component/recycledProducts/RecycleProductsDashboard";
import RecyclingProductsTable from "./component/recycledProducts/RecyclingProductsTable";
import RecycledProducts from "./component/recycledProducts/RecycledProducts";
import AddRecycleProduct from "./component/recycledProducts/AddRecycleProducts";
import RecycleReportGeneration from "./component/recycledProducts/RecycleReportGeneration";
import Products from "./component/recycledProducts/Products";
import AddPoduct from "./component/recycledProducts/AddProducts";

//Ruvindi
import InvestorsDashboard from "./component/FinanceInvestor/investorsdashboard";
import Addinvestor from "./component/FinanceInvestor/addInvestor";
import UpdateInvestorProfile from "./component/FinanceInvestor/updateInvestorprofile";

import Mylogin from './UserManagement/login';
import RegisterForm from './UserManagement/register';

function App() {
  return (
    
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/" element={<Mylogin />} />

          <Route path="/home" element={<Home />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/technicalHome" element={<TechnicalHome />} />
          <Route path="/addmachine" element={<Addmachine />} />
          <Route path="/machine" element={< MachinePage/>} />
          
          <Route path="/add-employee/:employeeId" element={<AddEmployee />} />
          
          <Route path="/deliveryHome" element={<DeliveryHome />} /> 
          <Route path="/parsel-list" element={<DisplayParselList />} />
         
          <Route path="/parsel-list/:id" element={<UpdateParselReq />} />
          <Route path="/Add-parsel" element={<AddParselRequest />} />

          <Route path="/mark-attendance" element={<MarkAttendance />} />  
          <Route path="/displayattendance" element={<DisplayAttendance />} />
          {/* Dilmi  */}
          <Route path="/addorder" element={<AddNewOrder />} />
          <Route path="/orderDetails" element={<OrderDtails />} />
          <Route path="/updateOrder/:Oid" element={<UpdateOrder />} /> 
          <Route path="/crmHome" element={<CrmHome />} />
          <Route path="/crmReport" element={<CrmReport />} />
          <Route path="/CRMRegi" element={<CRMRegister />} />
          <Route path="/CRMLogin" element={<CRMLogin />} />
          {/* Dilmi */}
          <Route path="/employeesalaryReport" element={<EmployeeSalaryReport/>} />
          <Route path="/productDashboard" element={<ProductDashboard/>} />
          <Route path="/Addproduct" element={<AddProduct/>} />
          <Route path="/Addproduct/:productId" element={<AddProduct />} />
          <Route path="/Addsupplier" element={<AddSupplier/>} />
          <Route path="/AddSupplier/:supplierId" element={<AddSupplier />} />
          <Route path="/stockDashboard" element={<StockDashboard/>} />
          <Route path="/addStock" element={<AddStock/>} />
          <Route path="/addStock/:itemId" element={<AddStock />} />
          <Route path="/supplierDashboard" element={<SupplierDashboard/>} />
          <Route path="/StockReport/:supplierId" element={<StockReport />} />
          <Route path="/recycle-product-dashbord" element={<RecycleProductsDashboard/>} /> {/* Gangani */}
          <Route path="/recycling-products" element={<RecyclingProductsTable/>} /> {/* Gangani */}
          <Route path="/recycled-products" element={<RecycledProducts/>} /> {/* Gangani */}
          <Route path="/add-recycle-product" element={<AddRecycleProduct/>} /> {/* Gangani */}
          <Route path="/recycle-product-report" element={<RecycleReportGeneration/>} /> {/* Gangani */}
          <Route path="/products" element={<Products/>} /> {/* Gangani */}
          <Route path="/add-product" element={<AddPoduct/>} /> {/* Gangani */}
          <Route path="/InvestorsDashboard" element={<InvestorsDashboard/>} /> {/* Ruvindi */}
          <Route path="/investor" element={<UpdateInvestorProfile/>} /> {/* Ruvindi */}
          <Route path="/add-investor" element={<Addinvestor/>} /> {/* Ruvindi */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
