import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Order(props) {
  const {
    _id,
    productName,
    productCategory,
    location,
    deliveryType,
    reciptNo,
    orderDescription,
    unitPrice,
    quantity,
    orderTotal,
    paymentType,
  } = props.order;

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
        <tr className="p-3 bg-blue-100 hover:bg-blue-200">
          <td className="p-2 w-48 font-medium text-center text-slate-700 border-hidden">
            {productName}
          </td>
          <td className=" w-48 text-nowrap font-medium text-center text-slate-700 border-hidden">
            {productCategory}
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
          <td className=" w-56 font-medium text-center border-hidden">
            <Link to={`/updateOrder/${_id}`}>
              <button className="p-1 ml-1 bg-green-700 rounded-lg">Update</button>
            </Link>
            <button
              className="p-1 bg-red-600 hover:bg-red-70 m-1 rounded-lg"
              onClick={deleteHandler}
            >
              Remove
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Order;

