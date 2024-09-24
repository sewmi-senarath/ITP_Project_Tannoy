import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportOrderList from "./ReportOrderList";
//02
const IURL = "http://Localhost:5000/order";

const fetchOrder = async () => {
  return await axios.get(IURL).then((res) => res.data);
};

const PrintableOrder = React.forwardRef((props, ref) => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetchOrder().then((data) => setOrder(data.order));
  }, []);

  return (
    <div ref={ref}>
      <h1 className="text-center font-semibold m-5 text-4xl">
        Order Details Report
      </h1>
      <hr className=" border-slate-200 mt-3 n mb-7" />
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
      <div className="mx-auto w-auto m-2">
        {/* Render order details relevent to the report*/}
        {order &&
          order.map((item, i) => (
            <div key={i}>
              <ReportOrderList order={item} />
            </div>
          ))}
      </div>
    </div>
  );
});

export default PrintableOrder;
