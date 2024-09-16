import React from "react"
// ape pages wala files tika import kara ganna
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./component/header/header"
import Footer from "./component/footer/footer"
import EmployeeDashboard from "./component/employee/EmployeeDashboard"
import AddEmployee from "./component/employee/AddEmployee"
import Home from "./component/home/home";
//juthmini
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
