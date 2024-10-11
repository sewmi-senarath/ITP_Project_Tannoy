import React from "react";
import { Link } from "react-router-dom";


function crmHeader() {
  return (
    <div className=" flex flex-col">
        <div className="flex bg-slate-300 ">
          <div className="mx-auto ml-5 mt-3 ">
            <ul className="flex gap-8 font-bold ">
              <Link to="/crmHome">
                <li className="hover:underline text-2xl gap-6 text-black " >Home</li>
              </Link>
              <Link to="/orderDetails">
                <li className="hover:underline text-2xl text-black">Order</li>
              </Link>
              <Link to="/crmReport">
                <li className="hover:underline text-2xl text-black">Report</li>
              </Link>
              <Link to="/inventoryReport">
                <li className="hover:underline text-2xl text-black">Support Desk</li>
              </Link>
            </ul>
          </div>
       
            <ul className="flex gap-5 font-bold p-1 mr-4">
              <Link to="./sign-in">
                <li className="hover:underline text-2xl"></li>
              </Link>
              <Link to="/">
                <li className="hover:underline text-2xl text-black mt-2">Log Out</li>
              </Link>
            </ul>
         
        </div>
      
    </div>
  );
}
export default crmHeader;
