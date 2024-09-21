// export default AddEmployee;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get employeeId from the URL
import axios from "axios";

const AddEmployee = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams(); // Get the employee ID from the URL

  const [formData, setFormData] = useState({
    empId:"",
    name: "",
    dob: "",
    gender: "Male",
    address: "",
    contactNumber: "",
    email: "",
    position: "",
    department: "",
    employmentType: "Full-Time",
    photo: null, // Store the base64 image here
  });

  const [isLoading, setIsLoading] = useState(true); // To show a loading indicator while fetching data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch employee data by ID if we're editing
  useEffect(() => {
    const fetchEmployee = async () => {
      if (employeeId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/employees/${employeeId}`);
          console.log("Fetched Employee Data:", response.data); // Log fetched data for debugging

          // Ensure date is in the format YYYY-MM-DD
          const formattedDob = response.data.dob ? new Date(response.data.dob).toISOString().substring(0, 10) : "";
          
          setFormData({
            ...response.data,
            dob: formattedDob, // Proper date format for input[type="date"]
          });
          setIsLoading(false); // Stop the loading state
        } catch (error) {
          console.error("Error fetching employee:", error);
          setErrorMessage("Failed to fetch employee data.");
          setIsLoading(false); // Stop the loading state in case of an error
        }
      } else {
        setIsLoading(false); // Not editing, so no need for loading state
      }
    };
    fetchEmployee();
  }, [employeeId]);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "photo" && files && files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => setFormData((prev) => ({ ...prev, [name]: reader.result }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));  // Ensure empId is updated here
    }
  };
  

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    try {
      if (employeeId) {
        await axios.put(`http://localhost:5000/api/employees/${employeeId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/employees", formData);
      }
      navigate("/employee-dashboard");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);  // Display the server error message (e.g., duplicate empId)
      } else {
        setErrorMessage("Failed to save employee.");
      }
      console.error("Error saving employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Show a loading spinner or message while the data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="employee-dashboard">
      <div className="Add-main-content">
        <h1>{employeeId ? "Edit Employee" : "Add Employee"}</h1>
        <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-group">
  <label htmlFor="empId">Employee ID:</label>
  <input
    type="text"
    id="empId"
    name="empId"
    placeholder="Enter Employee ID"
    value={formData.empId}  // Make sure the formData.empId is set correctly
    onChange={handleInputChange}  // This should update the formData state
    required
    disabled={!!employeeId}
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
            <label htmlFor="photo">Photo (Optional):</label>
            <input type="file" id="photo" name="photo" onChange={handleInputChange} />
            {/* Display preview of uploaded photo */}
            {formData.photo && (
              <div>
                <img src={formData.photo} alt="Employee" style={{ width: '100px', height: '100px' }} />
              </div>
            )}
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
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position/Job Title:</label>
            <input
              type="text"
              id="position"
              name="position"
              placeholder="Enter job title"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Enter department"
              value={formData.department}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="employmentType">Employee Type:</label>
            <select
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleInputChange}
              required
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : employeeId ? "Edit Employee" : "Add Employee"}
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
