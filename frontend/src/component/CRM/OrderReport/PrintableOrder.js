import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportOrderList from "./ReportOrderList";
import reportimg from "../img/logo.jpeg";
//02
const IURL = "http://Localhost:5000/order";

const fetchOrder = async () => {
  return await axios.get(IURL).then((res) => res.data);
};

const PrintableOrder = React.forwardRef((props, ref) => {
  const [order, setOrder] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    fetchOrder().then((data) => setOrder(data.order));

    //get current date and time
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    setCurrentDateTime(`${formattedDate} ${formattedTime}`);
  }, []);

  return (
    <div ref={ref} className="p-6 bg-white rounded-lg shadow-lg static">
      <div className="flex justify-between items-center mb-4">
        <img src={reportimg} alt="report" className="w-32 h-auto ml-10" />
        <div className="text-right">
          {/* Display current date and time */}
          <p className="text-lg font-semibold text-gray-700">{currentDateTime}</p>
        </div>
      </div>
      <h1 className="text-center font-semibold text-4xl text-gray-800 mb-4">
        Order Details Report
      </h1>
      <hr className="border-gray-300 mb-4" />
      <div className="mt-3">
        <table className=" mx-auto w-auto m-1 p-2 ">
          <tr className="bg-green-300 m-2 border-b-2 border-green-300">
            {/* <th className="p-1 w-80 px-14 ">Product ID</th> */}
            <td className=" border-hidden p-1 w-56 text-center font-medium">Product</td>
            <td className=" border-hidden p-1 w-48 text-center font-medium"> Category</td>
            <td className=" border-hidden p-1 w-48 text-center font-medium ">Location</td>
            <td className=" border-hidden p-1 w-36 text-center font-medium">Delivery Type</td>
            <td className=" border-hidden p-1 w-48 text-center font-medium">Recipt No</td>
            <td className=" border-hidden p-1 w-48 text-center font-medium"> Description</td>
            <td className=" border-hidden p-1 w-48 text-center font-medium ">Unit Price</td>
            <td className=" border-hidden p-1 w-48 text-center font-medium ">Quantity</td>
            <td className=" border-hidden p-1 w-48 text-center font-medium ">Order Total</td>
            <td className=" border-hidden p-1 w-48 text-center font-medium ">PaymentType</td>
          </tr>
        </table>
      </div>
      <div className="mx-auto w-auto m-2 ">
        {/* Render order details relevent to the report*/}
        {order &&
          order.map((item, i) => (
            <div key={i}>
              <ReportOrderList order={item} />
            </div>
          ))}
      </div>
      <div className="absolute bottom-0 right-6 mt-10">
        <h1 className="font-medium  text-slate-800 text-2xl">Signature</h1>
        <h1>........................</h1>
      </div>
    </div>
  );
});

export default PrintableOrder;
