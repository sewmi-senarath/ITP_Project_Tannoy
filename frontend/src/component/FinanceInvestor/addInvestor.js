import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf"; // jsPDF for generating PDFs
import "jspdf-autotable"; // Import jsPDF autoTable plugin

function AddInvestor() {
  const navigate = useNavigate();
  const { investorId } = useParams(); // Get investorId from URL parameters
  const [inputs, setInputs] = useState({
    investorId: "", // Unique identifier for investor
    name: "", // Name of the investor
    dob: "", // Date of birth
    maidenname: "", // Investor's maiden name
    nic: "", // NIC number
    accountnum: "", // Bank account number
    bankname: "", // Bank name
    invtdate: "", // Investment date
    email: "", // Email address
    amt: "", // Investment amount
    percentage: "", // Investment percentage
    accname:''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch investor data by ID if we're editing
  useEffect(() => {
    const fetchInvestor = async () => {
      if (investorId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/FinanceInvestor/${investorId}`);
          console.log("Fetched Investor Data:", response.data);

          // Format dates for input
          const formattedDob = response.data.dob ? new Date(response.data.dob).toISOString().substring(0, 10) : "";
          const formattedInvtDate = response.data.invtdate ? new Date(response.data.invtdate).toISOString().substring(0, 10) : "";

          setInputs({
            ...response.data,
            dob: formattedDob,
            invtdate: formattedInvtDate,
          });
        } catch (error) {
          console.error("Error fetching investor:", error);
          setErrorMessage("Failed to fetch investor data.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchInvestor();
  }, [investorId]);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(inputs);

    if (inputs.accountnum.length !== 12 || isNaN(inputs.accountnum)) {
      setErrorMessage("Account number must be exactly 12 digits.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (investorId) {
        await axios.put(`http://localhost:5000/api/investors/${investorId}`, {
          ...inputs,
          dob: new Date(inputs.dob),
          invtdate: new Date(inputs.invtdate),
          amt: Number(inputs.amt),
          percentage: Number(inputs.percentage),
        });
      } else {
        await axios.post("http://localhost:5000/FinanceInvestor", {
          ...inputs,
          dob: new Date(inputs.dob),
          invtdate: new Date(inputs.invtdate),
          amt: Number(inputs.amt),
          percentage: Number(inputs.percentage),
        });
      }
      navigate("/InvestorsDashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to save investor.");
      console.error("Error saving investor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  // Show a loading spinner or message while the data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="investor-dashboard">
      <div className="Add-main-content">
        <h1>{investorId ? "Edit Investor" : "Add Investor"}</h1>
        <form className="investor-form" onSubmit={handleSubmit}>
          {Object.entries(inputs).map(([key, value]) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type={key === "dob" || key === "invtdate" ? "date" : key === "email" ? "email" : "text"}
                id={key}
                name={key}
                placeholder={`Enter ${key}`}
                value={value}
                onChange={handleInputChange}
                required={key !== "maidenname"} // Make maidenname optional
                disabled={key === "investorId" && !!investorId} // Disable investorId input if editing
              />
            </div>
          ))}
          
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : investorId ? "Edit Investor" : "Add Investor"}
            
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Back button */}
          <button type="button" className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInvestor;
