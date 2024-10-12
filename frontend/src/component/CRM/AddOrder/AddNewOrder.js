import React, { useEffect, useState } from "react";
import Header from "../CrmHeader/crmHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Function to generate a random unit price between a given range
const generateRandomUnitPrice = () => {
  return (Math.random() * (100 - 10) + 10).toFixed(2); // Random price between $10 and $100
};

function AddNewOrder() {
  const history = useNavigate();

  const [products, setProducts] = useState([]); // Store products
  const [input, setInput] = useState({
    productName: "",
    productCategory: "",
    location: "",
    deliveryType: "",
    reciptNo: "",
    orderDescription: "",
    unitPrice: "", // Ensure this is initialized as an empty string
    quantity: "",
    orderTotal: "",
    paymentType: "",
    
  });

  // New state to store the formatted order date
  const [orderDate, setOrderDate] = useState("");

  const [availableQuantity, setAvailableQuantity] = useState(0); // Track available quantity
  const [errors, setErrors] = useState({
    unitPrice: "",
    quantity: "",
    productCategory: "",
    location: "",
    reciptNo: "",
    orderDescription: "",
  });

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/Products");
        const productsWithPrices = data.Products.map((product) => ({
          ...product,
          unitPrice: generateRandomUnitPrice(), // Assign a random unit price
        }));
        setProducts(productsWithPrices); // Store products with random prices
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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

    // Validation for string fields
    if (
      name === "productCategory" ||
      name === "location" ||
      name === "reciptNo" ||
      name === "orderDescription"
    ) {
      if (!validateStringField(name, value)) return;
    }

    // Update input state
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Handle product selection and update unit price and available quantity
    if (name === "productName") {
      const selectedProduct = products.find((product) => product.productName === value);
      if (selectedProduct) {
        setInput((prevState) => ({
          ...prevState,
          unitPrice: selectedProduct.unitPrice, // Set the unit price
        }));
        setAvailableQuantity(selectedProduct.quantity); // Update available quantity
      } else {
        // If product not found, reset unitPrice and available quantity
        setInput((prevState) => ({
          ...prevState,
          unitPrice: "",
        }));
        setAvailableQuantity(0); // Reset to 0 if product not found
      }
    }

    // Validate quantity in real-time
    if (name === "quantity") {
      if (!validateNumberField(name, value)) return;

      // Check if entered quantity exceeds available quantity
      const quantity = parseInt(value, 10);
      if (quantity > availableQuantity) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          quantity: `Cannot order more than ${availableQuantity} units of this product.`,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          quantity: "", // Clear error if valid
        }));
      }

      // Auto-calculate orderTotal
      const unitPrice = parseFloat(input.unitPrice);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If validation is successful, send the request
    await sendRequest();
     // Get current date in YYYY-MM-DD format
     const currentDate = new Date().toISOString().split("T")[0];
     setOrderDate(currentDate); // Highlighted change: store the formatted date
 
     // If validation is successful, send the request
     await sendRequest(currentDate); // Pass the date to the sendRequest function
     history("/orderDetails");
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
      <div className="my-5">
        <h1 className="text-4xl font-semibold text-gray-800 text-center">Add New Order</h1>
        <hr className="border-gray-300 my-6" />
      </div>
        <form onSubmit={handleSubmit} className="w-2/5 bg-sky-100">
          {/* First Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Product Name</label>
              <select
                name="productName"
                onChange={handleChange}
                value={input.productName}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>Select the Product</option>
                {products.map((product) => (
                  <option key={product._id} value={product.productName}>
                    {product.productName}
                  </option>
                ))}
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
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>Select the delivery type</option>
                <option>Standard Delivery</option>
                <option>Express Delivery</option>
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
                placeholder="Enter Receipt No."
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>Select the payment type</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>PayPal</option>
                <option>Cash on Delivery</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Quantity</label>
              <input
                type="text"
                onChange={handleChange}
                value={input.quantity}
                name="quantity"
                placeholder="Enter Quantity"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>}
            </div>

            {/* Unit Price */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Unit Price</label>
              <input
                type="text"
                readOnly
                value={input.unitPrice}
                required
                name="unitPrice"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>

            {/* Total */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Order Total</label>
              <input
                type="text"
                readOnly
                value={input.orderTotal}
                name="orderTotal"
                
                className="mt-1 block w-max border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>

            {/* Order Description */}
            <div className="md:col-span-2">
              <label className="block text-lg font-medium text-gray-700">Order Description</label>
              <textarea
                onChange={handleChange}
                value={input.orderDescription}
                name="orderDescription"
                placeholder="Order Description"
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.orderDescription && <p className="text-red-600 text-sm mt-1">{errors.orderDescription}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 h-12 py-auto text-white font-bold text-1xl"
            >
              Add Order
            </button>
          </div>
        </form>
      </div>
  );
}

export default AddNewOrder;
