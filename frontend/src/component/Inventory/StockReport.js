import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';  // <-- Add this import
import '../../styles/StockReport.css';


const StockReport = () => {
  const { supplierId } = useParams(); // Get supplier ID from URL
  const [supplier, setSupplier] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch supplier details based on the ID
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/suppliers/${supplierId}`);
        setSupplier(response.data);
      } catch (error) {
        console.error('Error fetching supplier:', error);
      }
    };
    fetchSupplier();
  }, [supplierId]);

  // Calculate total bill
  useEffect(() => {
    if (supplier && quantity > 0) {
      const price = parseFloat(supplier.ItemPrice);
      const discount = parseFloat(supplier.Discount);
      const discountedPrice = price - (price * discount / 100);
      setTotal(quantity * discountedPrice); // Calculate total after discount
    }
  }, [supplier, quantity]);

  // Function to generate PDF
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text(`Supplier Report for ${supplier.SupplierName}`, 10, 10);
    doc.text(`Supplier Code: ${supplier.supCode}`, 10, 20);
    doc.text(`Contact Info: ${supplier.ContactInfo}`, 10, 30);
    doc.text(`Delivery Item: ${supplier.DeliveryItem}`, 10, 40);
    doc.text(`Quantity: ${quantity}`, 10, 50);
    doc.text(`Total Bill: Rs.${total.toFixed(2)}`, 10, 60);

    doc.save(`Supplier_Report_${supplier.SupplierName}.pdf`);
  };

  // Function to generate shareable message
  const generateShareableMessage = () => {
    return `Supplier Report:
    - Supplier Code: ${supplier.supCode}
    - Delivery Item: ${supplier.DeliveryItem}
    - Quantity: ${quantity}
    - Total Bill: ₹${total.toFixed(2)}`;
  };

  // Function to share via WhatsApp
  const shareOnWhatsApp = () => {
    const message = generateShareableMessage();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Function to share on Facebook
  const shareOnFacebook = () => {
    const message = generateShareableMessage();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Function to share on Twitter
  const shareOnTwitter = () => {
    const message = generateShareableMessage();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!supplier) return <p>Loading...</p>;

  return (
    <div className="report-container">
      <h1>Generate Report for {supplier.SupplierName}</h1>

      <div>
        <label>Supplier Code:</label>
        <input type="text" value={supplier.supCode} readOnly />
      </div>
      <div>
        <label>Delivery Item:</label>
        <input type="text" value={supplier.DeliveryItem} readOnly />
      </div>
      <div>
        <label>Contact Info:</label>
        <input type="text" value={supplier.ContactInfo} readOnly />
      </div>
      <div>
        <label>Item Price (Per Unit):</label>
        <input type="text" value={supplier.ItemPrice} readOnly />
      </div>
      <div>
        <label>Discount:</label>
        <input type="text" value={`${supplier.Discount}%`} readOnly />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </div>
      <div>
        <label>Total Bill:</label>
        <input type="text" value={`Rs.${total.toFixed(2)}`} readOnly />
      </div>

      {/* Generate PDF Button */}
      <button onClick={generatePdf} className="pdf-button">
        Download PDF
      </button>

      {/* Social Media Share Buttons */}
      <div className="social-media-buttons">
        <button onClick={shareOnWhatsApp} className="whatsapp-button">
          Share on WhatsApp
        </button>
        <button onClick={shareOnFacebook} className="facebook-button">
          Share on Facebook
        </button>
        <button onClick={shareOnTwitter} className="twitter-button">
          Share on Twitter
        </button>
      </div>
    </div>
  );
};

export default StockReport;
