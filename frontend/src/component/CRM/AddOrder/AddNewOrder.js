import React from "react";
import { useState } from "react";
import Header from "../CrmHeader/crmHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddNewOrder() {
  const history = useNavigate();
  
  const productPrices = {
    "Holders": 150,
    "Junction Boxes": 450,
    "Sunk Boxes": 850,
    "Double Holder": 250,
    "Round Block": 540,
    "Ceiling rose": 250,
  };

  const [input, setInput] = useState({
    productName: "",
    productCategory: "",
    location: "",
    deliveryType: "",
    reciptNo: "",
    orderDescription: "",
    unitPrice: "",
    quantity: "",
    orderTotal: "",
    paymentType: "",
  });

  const [errors, setErrors] = useState({
    unitPrice: "",
    quantity: "",
    productCategory: "",
    location: "",
    reciptNo: "",
    orderDescription: "",
  });

  const validateStringField = (name, value) => {
    const regex = /^[a-zA-Z0-9\s]*$/; // Allows only letters, numbers, and spaces
    if (!regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a valid string (no special characters)",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
      return true;
    }
  };

  const validateNumberField = (name, value) => {
    const regex = /^[0-9]*$/; // Allows only positive integers
    if (!regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a valid positive integer",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "productCategory" ||
      name === "location" ||
      name === "reciptNo" ||
      name === "orderDescription"
    ) {
      if (!validateStringField(name, value)) return;
    }

    if (name === "quantity") {
      if (!validateNumberField(name, value)) return;
    }

    // Update input state
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Set unit price automatically based on product name
    if (name === "productName") {
      const unitPrice = productPrices[value] || "";
      setInput((prevState) => ({
        ...prevState,
        unitPrice: unitPrice.toString(),
      }));
    }

    // Auto-calculate orderTotal when quantity and unitPrice are provided
    if (name === "quantity" || name === "unitPrice") {
      const unitPrice =
        name === "unitPrice" ? parseFloat(value) : parseFloat(input.unitPrice);
      const quantity =
        name === "quantity" ? parseFloat(value) : parseFloat(input.quantity);

      if (!isNaN(unitPrice) && !isNaN(quantity)) {
        const total = (unitPrice * quantity).toFixed(2);
        setInput((prevState) => ({
          ...prevState,
          orderTotal: total,
        }));
      } else {
        setInput((prevState) => ({
          ...prevState,
          orderTotal: "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    sendRequest().then(() => history("/orderDetails"));
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/order", {
        productName: String(input.productName),
        productCategory: String(input.productCategory),
        location: String(input.location),
        deliveryType: String(input.deliveryType),
        reciptNo: String(input.reciptNo),
        orderDescription: String(input.orderDescription),
        unitPrice: Number(input.unitPrice),
        quantity: Number(input.quantity),
        orderTotal: Number(input.orderTotal),
        paymentType: String(input.paymentType),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Header />
      <div className="my-5 ">
        <h1 className="text-4xl font-semibold text-gray-800 text-center">Add New Order</h1>
        <hr className="border-gray-300 my-6" />
      </div>
      <div className="max-w-5xl mx-auto p-6 bg-sky-100 shadow-lg rounded-lg mb-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Product Name</label>
              <select
                name="productName"
                onChange={handleChange}
                value={input.productName}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select the Product</option>
                <option>Holders</option>
                <option>Junction Boxes</option>
                <option>Sunk Boxes</option>
                <option>Double Holder</option>
                <option>Round Block</option>
                <option>Ceiling rose</option>
              </select>
            </div>

            {/* Product Category */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Product Category</label>
              <input
                type="text"
                onChange={handleChange}
                value={input.productCategory}
                name="productCategory"
                placeholder="Product Category"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.productCategory && <p className="text-red-600 text-sm mt-1">{errors.productCategory}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Location</label>
              <input
                type="text"
                onChange={handleChange}
                value={input.location}
                name="location"
                placeholder="Enter Location"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Delivery Type */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Delivery Type</label>
              <select
                name="deliveryType"
                onChange={handleChange}
                value={input.deliveryType}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select the delivery type</option>
                <option>Standard Delivery</option>
                <option>Express Delivery</option>
                <option>Scheduled Delivery</option>
                <option>Same-Day Delivery</option>
                <option>Next-Day Delivery</option>
              </select>
            </div>

            {/* Receipt No */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Receipt No</label>
              <input
                type="text"
                onChange={handleChange}
                value={input.reciptNo}
                name="reciptNo"
                placeholder="Receipt No"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.reciptNo && <p className="text-red-600 text-sm mt-1">{errors.reciptNo}</p>}
            </div>

            {/* Payment Type */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Payment Type</label>
              <select
                name="paymentType"
                onChange={handleChange}
                value={input.paymentType}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select the payment type</option>
                <option>Credit/Debit Card</option>
                <option>Bank Transfer</option>
                <option>Cash on Delivery (COD)</option>
                <option>Mobile Payment</option>
                <option>Purchase Order</option>
              </select>
            </div>
          </div>

          {/* Second Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Description */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Order Description</label>
              <textarea
                name="orderDescription"
                onChange={handleChange}
                value={input.orderDescription}
                placeholder="Description"
                className="mt-1 block w-full h-32 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.orderDescription && <p className="text-red-600 text-sm mt-1">{errors.orderDescription}</p>}
            </div>

            {/* Unit Price */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Unit Price</label>
              <input
                type="text"
                onChange={handleChange}
                value={input.unitPrice}
                name="unitPrice"
                placeholder="Unit Price"
                readOnly
                className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Quantity</label>
              <input
                type="text"
                onChange={handleChange}
                value={input.quantity}
                name="quantity"
                placeholder="Quantity"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>}
            </div>

            {/* Order Total */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Order Total</label>
              <input
                type="text"
                value={input.orderTotal}
                readOnly
                name="orderTotal"
                className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm sm:text-sm"
                placeholder="Order Total"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewOrder;
