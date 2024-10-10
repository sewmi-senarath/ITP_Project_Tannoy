import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get employeeId from the URL
import axios from "axios";
//import '../../styles/employee.css'; // your CSS is here

const AddEmployee = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams(); // Get the employee ID from the URL

  const [formData, setFormData] = useState({
    //empId: "",
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
  const [emailError, setEmailError] = useState("");

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

    // Check if the field is for photo upload
    if (name === "photo" && files && files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => setFormData((prev) => ({ ...prev, [name]: reader.result }));
      return;
    }

    // Validate Name (allow only letters)
    if (name === "name") {
      const lettersOnlyRegex = /^[a-zA-Z\s]*$/; // Allows only letters and spaces
      if (lettersOnlyRegex.test(value)) {
        setFormData((prev) => ({ ...prev, name: value })); // Set value if it's valid
      }
      return;
    }

    // Validate Contact Number (allow up to 10 digits, first digit must be 0)
    if (name === "contactNumber") {
      // Allow only digits and ensure first digit is 0
      if (/^\d*$/.test(value) && (value.length === 0 || value[0] === "0")) {
        // Allow user to type up to 10 digits
        if (value.length <= 10) {
          setFormData((prev) => ({ ...prev, contactNumber: value }));
        }
      }
      return;
    }

    // Validate email
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address."); // Set error message
      } else {
        setEmailError(""); // Clear error if email is valid
      }
    }

    // Generic handler for other form fields
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Check if email is valid before submitting
    if (emailError) {
      setErrorMessage("Please fix the errors in the form before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (employeeId) {
        await axios.put(`http://localhost:5000/api/employees/${employeeId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/employees", formData);
      }
      navigate("/employee-dashboard");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);  // Display the server error message
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">{employeeId ? "Edit Employee" : "Add Employee"}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee ID
          <div>
            <label htmlFor="empId" className="block text-sm font-medium text-gray-700">
              Employee ID:
            </label>
            <input
              type="text"
              id="empId"
              name="empId"
              placeholder="Enter Employee ID"
              value={formData.empId}
              onChange={handleInputChange}
              required
              maxLength={6}
              pattern="[a-zA-Z0-9]*"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div> */}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Photo */}
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
              Photo (Optional):
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleInputChange}
              className="mt-1 block w-full"
            />
            {formData.photo && (
              <div className="mt-4">
                <img
                  src={formData.photo}
                  alt="Employee"
                  className="h-24 w-24 object-cover rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number:
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              placeholder="Enter contact number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
              maxLength={10}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
          </div>

          {/* Position */}
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position/Job Title:
            </label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Position</option>
              <option value="Delivery">Delivery Team</option>
              <option value="Technical">Technician</option>
              <option value="Finance">Finance Team</option>
              <option value="Inquiry">Inquiry Team</option>
              <option value="Developer">Developer</option>
              <option value="Operator">Machine Operator</option>
              <option value="Tester">Tester</option>
              <option value="Cleaning">Plastic Cleaner</option>
              <option value="HR">HR team</option>
              <option value="Sales">Sales Team</option>
              <option value="Trainee">Trainee</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Helper">Helper</option>
            </select>
          </div>

         {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department:
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Department</option>
              <option value="Production Department">Production Department</option>
              <option value="HR Department">HR Department</option>
              <option value="Finance Department">Finance Department</option>
              <option value="Marketing Department">Marketing Department</option>
              <option value="Sales Department">Sales Department</option>
              <option value="Customer Department">Customer Management</option>
              <option value="Technical Department">Technical Department</option>
            </select>
          </div>


          {/* Employment Type */}
          <div>
            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">
              Employment Type:
            </label>
            <select
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isSubmitting ? "Submitting..." : employeeId ? "Update Employee" : "Add Employee"}
          </button>

          {/* Error Message */}
          {errorMessage && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
