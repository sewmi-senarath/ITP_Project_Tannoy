import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../CrmHeader/crmHeader";

function UpdateOrder() {
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]); // Store product data
  const history = useNavigate();
  const orderId = useParams().Oid;

  // Fetch the product list from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Products");
        setProducts(response.data.Products); // Store fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch the order details
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/order/${orderId}`);
        setInput(response.data.order);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchHandler();
  }, [orderId]);

  // Send update request to the server
  const sendRequest = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/order/${orderId}`, {
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
      });
      history("/orderDetails");
    } catch (error) {
      console.error("Error updating order:", error);
      setErrors({ ...errors, submit: "Failed to update the order." });
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the input state
    setInput((prevState) => {
      const updatedInput = { ...prevState, [name]: value };

      // Calculate order total when quantity changes
      if (name === "quantity") {
        const quantity = Number(value);
        if (!isNaN(quantity) && quantity >= 0) {
          updatedInput.quantity = quantity; // Update quantity
          updatedInput.orderTotal = (updatedInput.unitPrice * quantity).toFixed(2); // Calculate order total
        } else {
          updatedInput.orderTotal = "0.00"; // Reset order total if quantity is invalid
        }
      }

      return updatedInput;
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for any errors before sending the request
    if (!errors.quantity) {
      sendRequest();
    }
  };

  return (
    <div>
      <Header />
      <div className="mx-auto">
  <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
    Update Order
  </h1>
  <hr className="border-t-2 border-gray-300 mb-10" />
    <form className="w-2/5 bg-blue-100" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={input.productName || ""}
              className="opacity-50 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2  bg-gray-100"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Product Category
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={input.productCategory || ""}
              name="productCategory"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Product Category"
            />
            {errors.productCategory && (
              <p className="text-red-500 text-sm mt-1">{errors.productCategory}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={input.location || ""}
              name="location"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Delivery Type
            </label>
            <select
              name="deliveryType"
              onChange={handleChange}
              value={input.deliveryType || ""}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Select the delivery type
              </option>
              <option>Standard Delivery</option>
              <option>Express Delivery</option>
              <option>Scheduled Delivery</option>
              <option>Same-Day Delivery</option>
              <option>Next-Day Delivery</option>
            </select>
            {errors.deliveryType && (
              <p className="text-red-500 text-sm mt-1">{errors.deliveryType}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Receipt No
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={input.reciptNo || ""}
              name="reciptNo"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Receipt No"
            />
            {errors.reciptNo && (
              <p className="text-red-500 text-sm mt-1">{errors.reciptNo}</p>
            )}
          </div>

        </div>

        {/* Right Column */}
        <div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Unit Price
            </label>
            <input
              type="text"
              value={input.unitPrice || ""}
              name="unitPrice"
              className=" opacity-50 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2  bg-gray-100"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={input.quantity || ""}
              name="quantity"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Quantity"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Order Total
            </label>
            <input
              type="text"
              value={input.orderTotal || ""}
              name="orderTotal"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Payment Type
            </label>
            <select
              name="paymentType"
              onChange={handleChange}
              value={input.paymentType || ""}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Select Payment Type
              </option>
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Bank Transfer</option>
              <option>Cash on Delivery</option>
            </select>
            {errors.paymentType && (
              <p className="text-red-500 text-sm mt-1">{errors.paymentType}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Order Description
            </label>
            <textarea
              onChange={handleChange}
              value={input.orderDescription || ""}
              name="orderDescription"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Order Description"
            ></textarea>
            {errors.orderDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.orderDescription}</p>
            )}
          </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Order"}
        </button>
        {errors.submit && (
          <p className="text-red-500 text-center mt-3">{errors.submit}</p>
        )}
      </div>
    </form>
  </div>
</div>
  );
}

export default UpdateOrder;
