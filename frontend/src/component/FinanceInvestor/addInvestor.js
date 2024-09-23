// export default AddInvestor;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get investorId from the URL
import axios from "axios";
import '../../styles/AddInvestor.css';



const AddInvestor = () => {
  const navigate = useNavigate();
  const { investorId } = useParams(); // Get the investor ID from the URL

  const [formData, setFormData] = useState({
    investorId: "",
    name: "",
    email: "",
    contactNumber: "",
    investmentAmount: "",
    address: "",
    dob: "",
    gender: "Male",
    companyName: "",
    photo: null, // Store the base64 image here
  });

  const [isLoading, setIsLoading] = useState(true); // To show a loading indicator while fetching data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch investor data by ID if we're editing
  useEffect(() => {
    const fetchInvestor = async () => {
      if (investorId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/investors/${investorId}`);
          console.log("Fetched Investor Data:", response.data);

          // Ensure date is in the format YYYY-MM-DD
          const formattedDob = response.data.dob
            ? new Date(response.data.dob).toISOString().substring(0, 10)
            : "";
          
          setFormData({
            ...response.data,
            dob: formattedDob,
          });
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching investor:", error);
          setErrorMessage("Failed to fetch investor data.");
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
    const { name, value, files } = event.target;
    if (name === "photo" && files && files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => setFormData((prev) => ({ ...prev, [name]: reader.result }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (investorId) {
        await axios.put(`http://localhost:5000/api/investors/${investorId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/investors", formData);
      }
      navigate("/investor-dashboard");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);  // Display the server error message
      } else {
        setErrorMessage("Failed to save investor.");
      }
      console.error("Error saving investor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="investor-dashboard">
      <div className="Add-main-content">
        <h1>{investorId ? "Edit Investor" : "Add Investor"}</h1>
        <form className="investor-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="investorId">Investor ID:</label>
            <input
              type="text"
              id="investorId"
              name="investorId"
              placeholder="Enter Investor ID"
              value={formData.investorId}
              onChange={handleInputChange}
              required
              disabled={!!investorId}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              placeholder="Enter contact number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="investmentAmount">Investment Amount:</label>
            <input
              type="number"
              id="investmentAmount"
              name="investmentAmount"
              placeholder="Enter investment amount"
              value={formData.investmentAmount}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Photo (Optional):</label>
            <input type="file" id="photo" name="photo" onChange={handleInputChange} />
            {formData.photo && (
              <div>
                <img src={formData.photo} alt="Investor" style={{ width: '100px', height: '100px' }} />
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : investorId ? "Edit Investor" : "Add Investor"}
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddInvestor;
