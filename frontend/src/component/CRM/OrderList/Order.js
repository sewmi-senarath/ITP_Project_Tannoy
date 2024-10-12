import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Order(props) {
  const {
    _id,
    productName,
    location,
    deliveryType,
    reciptNo,
    orderDescription,
    unitPrice,
    quantity,
    orderTotal,
    paymentType,
    Date: orderDate, // Renamed 'Date' to 'orderDate' for clarity
  } = props.order;


    // Format the date to display only the date part (YYYY-MM-DD)
    const formattedDate = new Date(orderDate).toLocaleDateString("en-CA");

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/order/${_id}`)
      .then((res) => res.data)
      .then(() => {
        props.onDelete(_id); // Call the parent function to update the state
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <table className="w-auto mx-auto m-1">
        <tr className=" bg-blue-100 hover:bg-blue-200">
          <td className="p-2 w-48 font-medium text-center text-slate-700 border-hidden">
            {productName}
          </td>
          <td className=" w-48 text-nowrap font-medium text-center text-slate-700 border-hidden">
            {formattedDate}
          </td>
          <td className=" w-48 text-nowrap font-medium text-center text-slate-700 border-hidden">
            {location}
          </td>
          <td className=" w-48 text-nowrap font-medium text-center text-slate-700 border-hidden">
            {deliveryType}
          </td>
          <td className="w-48 text-nowrap font-medium text-center text-slate-700 border-hidden">
            {reciptNo}
          </td>
          <td className="w-48 text-nowrap font-medium text-center text-slate-700  border-hidden">
            {orderDescription}
          </td>

          <td className=" w-48 text-nowrap font-medium text-center text-slate-700 border-hidden">
            {unitPrice}
          </td>
          <td className="  w-32 text-nowrap font-medium text-center text-slate-700 border-hidden">
            {quantity}
          </td>
          <td className="  w-48 text-nowrap font-medium text-center text-slate-700 border-hidden">
            {orderTotal}
          </td>
          <td className=" w-48 text-nowrap font-medium text-center text-slate-700 border-hidden">
            {paymentType}
          </td>
          <td className="p-1 w-32 font-medium text-center border-hidden ">
            <div className="flex pt-4">
            
            <Link to={`/updateOrder/${_id}`} className="no-underline text-black">
              <button className="p-1 bg-green-700 rounded-lg hover:bg-none w-16">Update</button>
            </Link>
            <button
              className="p-1 ml-1 bg-red-600 hover:bg-red-500 rounded-lg w-16"
              onClick={deleteHandler}
            >
              Remove
            </button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Order;

