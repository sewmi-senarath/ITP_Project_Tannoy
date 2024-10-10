import React, { useState, useEffect } from 'react';
import '../employee/employee.css'
import Logo from '../../images/logo.jpeg';
import manager from '../../images/manager.jpeg'; // Manager's image
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]); // State to hold employee data
  const [error, setError] = useState(''); // To handle errors
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [filteredEmployees, setFilteredEmployees] = useState([]); // State to hold filtered results
  const navigate = useNavigate();

  // Fetch employee data from the backend API when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees'); // Backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        console.log('Employees fetched:', data); // Check the fetched employees
        setEmployees(data); // Set the employees state with the fetched data
        setFilteredEmployees(data); // Initialize the filtered employees with all data
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Could not fetch employee data');
      }
    };

    fetchEmployees(); // Fetch employees on component mount
  }, []); // Empty dependency array ensures it runs only once

  // UseEffect to filter employees as searchQuery changes (dynamic filtering)
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = employees.filter((employee) =>
        (employee.empId?.toLowerCase() || '').includes(query)
      );
      setFilteredEmployees(filtered); // Update filtered employees with the filtered result
    } else {
      setFilteredEmployees(employees); // If no search query, show all employees
    }
  }, [searchQuery, employees]);
  // Trigger filtering when searchQuery or employees change

  // Function to handle deleting an employee
  const deleteEmployee = async (employeeId) => {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmed) return; // If the user cancels, do nothing

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      // If deletion is successful, update the frontend state
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employeeId));
      setFilteredEmployees((prevFiltered) => prevFiltered.filter((emp) => emp._id !== employeeId)); // Remove from filtered list as well
      alert('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  };

  // Handle the edit button to navigate to AddEmployee with the employee ID
  const handleEdit = (employeeId) => {
    navigate(`/add-employee/${employeeId}`);
  };

  // Helper function to format the date (e.g., Date of Birth)
  const formatDate = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-grow flex-row">
      {/* Sidebar Section */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4">
          <img src={Logo} alt="Tannoy Electricals Logo" className="h-16 mx-auto" />
        </div>
        <ul className="mt-6 space-y-0.01 flex-grow"> {/* Reduced spacing */}
          <li><a href="/mark-attendance" className="block py-1 px-4 bg-green-500 hover:bg-green-600">Mark Attendance</a></li>
          <li><a href="/add-employee" className="block py-1 px-4 bg-green-500 hover:bg-green-600">Add Employee</a></li>
          <li><a href="/employeesalaryReport" className="block py-1 px-4 bg-green-500 hover:bg-green-600">Salary Report</a></li>
        </ul>
  
        <div className="p-2">
          <img src={manager} alt="Manager Photo" className="h-16 w-16 rounded-full mx-auto" />
          <p className="mt-2">Employee Manager</p>
          <p className="text-sm">employeemanager@tannoy.com</p>
        </div>
  
        <ul className="settings mt-auto space-y-80">
          <li><a href="#" className="block py-1 px-4 bg-green-500 hover:bg-green-600">Settings</a></li>
          <li><a href="#" className="block py-1 px-4 bg-green-500 hover:bg-green-600">Log out</a></li>
        </ul>
      </div>
  
      {/* Main Content Section */}
      <div className="flex-grow p-4 flex flex-col">
        <header>
          <input
            type="text"
            placeholder="Search by employee ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </header>
  
        <div className="flex-grow">
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '36px', fontWeight: 'bold' }}>Dashboard</h1>
          <h2 style={{ fontFamily: 'Times New Roman, serif', fontSize: '28px', fontStyle: 'italic' }}><center>Employee Details</center></h2>
  
          {/* Add employee count */}
          <p style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
            Total Employees: {filteredEmployees.length}
          </p>
  
          {/* Display an error message if fetching fails */}
          {error && <p className="error-message">{error}</p>}
  
          {/* Employee Table */}
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Photo</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th>Position/Job Title</th>
                <th>Department</th>
                <th>Employee Type</th>
                <th>Actions</th>
              </tr>
            </thead>
  
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.empId}</td>
                    <td>{employee.name}</td>
                    <td>{formatDate(employee.dob)}</td>
                    <td>{employee.gender}</td>
                    <td>
                      {employee.photo ? (
                        <img
                          src={employee.photo}
                          alt={`${employee.name} Photo`}
                          className="employee-photo"
                        />
                      ) : (
                        <img
                          src="path/to/placeholder.png" // Use a placeholder image if no photo
                          alt="Placeholder"
                          className="employee-photo"
                        />
                      )}
                    </td>
                    <td>{employee.address}</td>
                    <td>{employee.contactNumber}</td>
                    <td>{employee.email}</td>
                    <td>{employee.position}</td>
                    <td>{employee.department}</td>
                    <td>{employee.employmentType}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(employee._id)}>Edit</button> 
                      <button
                        className="delete-btn"
                        onClick={() => deleteEmployee(employee._id)} // Call deleteEmployee on click
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" style={{ textAlign: 'center' }}>
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  
};

export default EmployeeDashboard;

// import React, { useState, useEffect } from 'react';
// import Logo from '../../images/logo.jpeg';
// import manager from '../../images/manager.jpeg'; // Manager's image
// import { useNavigate } from 'react-router-dom';

// const EmployeeDashboard = () => {
//   const [employees, setEmployees] = useState([]);
//   const [error, setError] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/employees');
//         if (!response.ok) {
//           throw new Error('Failed to fetch employees');
//         }
//         const data = await response.json();
//         setEmployees(data);
//         setFilteredEmployees(data);
//       } catch (error) {
//         setError('Could not fetch employee data');
//       }
//     };
//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       const filtered = employees.filter((employee) =>
//         (employee.empId?.toLowerCase() || '').includes(query)
//       );
//       setFilteredEmployees(filtered);
//     } else {
//       setFilteredEmployees(employees);
//     }
//   }, [searchQuery, employees]);

//   const deleteEmployee = async (employeeId) => {
//     const confirmed = window.confirm('Are you sure you want to delete this employee?');
//     if (!confirmed) return;

//     try {
//       const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete employee');
//       }

//       setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employeeId));
//       setFilteredEmployees((prevFiltered) => prevFiltered.filter((emp) => emp._id !== employeeId));
//       alert('Employee deleted successfully');
//     } catch (error) {
//       alert('Failed to delete employee');
//     }
//   };

//   const handleEdit = (employeeId) => {
//     navigate(`/add-employee/${employeeId}`);
//   };

//   const formatDate = (dob) => {
//     const date = new Date(dob);
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar Section */}
//       <div className="w-1/4 bg-gray-800 text-white flex flex-col items-center p-6">
//         <div className="mb-8">
//           <img src={Logo} alt="Tannoy Electricals Logo" className="w-32 h-32 object-cover" />
//         </div>
//         <ul className="space-y-4 text-lg">
//           <li><a href="/mark-attendance" className="hover:text-yellow-400">Mark Attendance</a></li>
//           <li><a href="/add-employee" className="hover:text-yellow-400">Add Employee</a></li>
//           <li><a href="/employeesalaryReport" className="hover:text-yellow-400">Salary Report</a></li>
//         </ul>
//         <div className="mt-auto flex flex-col items-center">
//           <img src={manager} alt="Manager Photo" className="rounded-full w-24 h-24" />
//           <p className="mt-2">Employee Manager</p>
//           <p className="text-sm">employeemanager@tannoy.com</p>
//         </div>
//         <ul className="space-y-4 text-lg mt-4">
//           <li><a href="#" className="hover:text-yellow-400">Settings</a></li>
//           <li><a href="#" className="hover:text-yellow-400">Log out</a></li>
//         </ul>
//       </div>

//       {/* Main Content Section */}
//       <div className="w-3/4 bg-gray-100 p-8">
//         <header>
//           <input
//             type="text"
//             placeholder="Search by employee ID"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
//             className="mb-4 p-2 border border-gray-300 rounded-lg"
//           />
//         </header>

//         <div>
//           <h1 className="font-bold text-3xl">Dashboard</h1>
//           <h2 className="text-xl italic text-center">Employee Details</h2>
//           <p className="text-lg font-semibold">Total Employees: {filteredEmployees.length}</p>
//         </div>

//         {/* Error Message */}
//         {error && <p className="error-message text-red-500">{error}</p>}

//         {/* Employee Table */}
//         <div className="overflow-x-auto mb-10">
//           <table className="min-w-full text-center bg-white border border-gray-300">
//             <thead>
//               <tr>
//                 {/* Table headers */}
//                 <th>Employee ID</th>
//                 <th>Name</th>
//                 <th>Date of Birth</th>
//                 <th>Gender</th>
//                 <th>Photo</th>
//                 <th>Address</th>
//                 <th>Contact Number</th>
//                 <th>Email Address</th>
//                 <th>Position/Job Title</th>
//                 <th>Department</th>
//                 <th>Employee Type</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEmployees.length > 0 ? (
//                 filteredEmployees.map((employee) => (
//                   <tr key={employee._id} className="border-t">
//                     <td>{employee.empId}</td>
//                     <td>{employee.name}</td>
//                     <td>{formatDate(employee.dob)}</td>
//                     <td>{employee.gender}</td>
//                     <td>
//                       {employee.photo ? (
//                         <img
//                           src={employee.photo}
//                           alt={`${employee.name} Photo`}
//                           className="w-10 h-10 rounded-full"
//                         />
//                       ) : (
//                         <img
//                           src="path/to/placeholder.png"
//                           alt="Placeholder"
//                           className="w-10 h-10 rounded-full"
//                         />
//                       )}
//                     </td>
//                     <td>{employee.address}</td>
//                     <td>{employee.contactNumber}</td>
//                     <td>{employee.email}</td>
//                     <td>{employee.position}</td>
//                     <td>{employee.department}</td>
//                     <td>{employee.employmentType}</td>
//                     <td>
//                       <button
//                         className="text-blue-500 hover:text-blue-700"
//                         onClick={() => handleEdit(employee._id)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="text-red-500 hover:text-red-700 ml-2"
//                         onClick={() => deleteEmployee(employee._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="12" className="text-center py-4">
//                     No employees found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;

