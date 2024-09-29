import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../CrmHeader/crmHeader";

function UpdateOrder() {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState({});
  const history = useNavigate();
  const orderId = useParams().Oid;

  // Unit prices for products
  const productPrices = {
    Holders: 150,
    "Junction Boxes": 450,
    "Sunk Boxes": 850,
    "Double Holder": 250,
    "Round Block": 540,
    "Ceiling rose": 250,
  };

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/order/${orderId}`)
        .then((res) => res.data)
        .then((data) => setInput(data.order));
    };
    fetchHandler();
  }, [orderId]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/order/${orderId}`, {
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for strings: allow letters, numbers, and spaces only
    const isStringField = ["location", "reciptNo", "orderDescription", "productCategory"].includes(name);
    if (isStringField && /[^a-zA-Z0-9\s]/.test(value)) {
      return; // Prevent invalid input
    }

    // Validation for numeric fields: only allow positive integers
    if (["quantity"].includes(name) && !/^\d*$/.test(value)) {
      return; // Prevent non-numeric input
    }

    setInput((prevState) => {
      const updatedInput = {
        ...prevState,
        [name]: value,
      };

      // Automatically fill unit price based on selected product
      if (name === "productName" && productPrices[value]) {
        updatedInput.unitPrice = productPrices[value];
      }

      // Auto-calculate orderTotal if unitPrice and quantity are provided
      if (name === "unitPrice" || name === "quantity") {
        const unitPrice = parseFloat(updatedInput.unitPrice) || 0;
        const quantity = parseFloat(updatedInput.quantity) || 0;
        updatedInput.orderTotal = (unitPrice * quantity).toFixed(2);
      }

      return updatedInput;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/orderDetails"));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className=" mx-auto py-10">
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-10">
          Update Order
        </h1>
        <hr className="border-t-2 border-gray-200 mb-8" />
        <div className="bg-sky-100 shadow-xl rounded-lg p-8 mx-auto w-full md:w-4/5 lg:w-3/5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Product Name
                  </label>
                  <select
                    name="productName"
                    onChange={handleChange}
                    value={input.productName}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled selected>
                      Select the Product
                    </option>
                    {Object.keys(productPrices).map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Product Category
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={input.productCategory}
                    name="productCategory"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Product Category"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={input.location}
                    name="location"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Location"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Delivery Type
                  </label>
                  <select
                    name="deliveryType"
                    onChange={handleChange}
                    value={input.deliveryType}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled selected>
                      Select the delivery type
                    </option>
                    <option>Standard Delivery</option>
                    <option>Express Delivery</option>
                    <option>Scheduled Delivery</option>
                    <option>Same-Day Delivery</option>
                    <option>Next-Day Delivery</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Recipt No
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={input.reciptNo}
                    name="reciptNo"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tracking ID"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Payment Type
                  </label>
                  <select
                    name="paymentType"
                    onChange={handleChange}
                    value={input.paymentType}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled selected>
                      Select the payment type
                    </option>
                    <option>Credit/Debit Card</option>
                    <option>Bank Transfer</option>
                    <option>Cash on Delivery (COD)</option>
                    <option>Mobile Payment (e.g., PayPal, Apple Pay)</option>
                    <option>Purchase Order (PO)</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Order Description
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={input.orderDescription}
                    name="orderDescription"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Description"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Unit Price
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={input.unitPrice}
                    name="unitPrice"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Unit Price"
                    readOnly
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={input.quantity}
                    name="quantity"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Quantity"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Order Total
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={input.orderTotal}
                    name="orderTotal"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Auto-calculated...."
                    readOnly
                  />
                </div>

                {/* Place Order Button */}
                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
                  >
                    Update Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateOrder;
