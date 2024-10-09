import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios"; // Import axios for API calls

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email); // Regular expression for email validation
  const containsAtSymbol = (email) => email.includes("@"); // Check if email contains '@'
  const isValidUsername = (username) => username.length >= 3; // Username should be at least 3 characters
  const isValidPassword = (password) => password.length >= 6; // Password should be at least 6 characters

  const handleRegister = async () => {
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Form validation
    if (!trimmedEmail) {
      enqueueSnackbar("Please enter your email", { variant: "error" });
      return;
    }

    if (!containsAtSymbol(trimmedEmail)) {
      enqueueSnackbar("Email must contain an '@' symbol", { variant: "error" });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      enqueueSnackbar("Please enter a valid email address", { variant: "error" });
      return;
    }

    if (!trimmedUsername) {
      enqueueSnackbar("Please enter a username", { variant: "error" });
      return;
    }

    if (!isValidUsername(trimmedUsername)) {
      enqueueSnackbar("Username must be at least 3 characters long", { variant: "error" });
      return;
    }

    if (!trimmedPassword) {
      enqueueSnackbar("Please enter a password", { variant: "error" });
      return;
    }

    if (!isValidPassword(trimmedPassword)) {
      enqueueSnackbar("Password must be at least 6 characters long", { variant: "error" });
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    // Registration logic
    const data = {
      email: trimmedEmail,
      username: trimmedUsername,
      password: trimmedPassword,
    };

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/user/register", data);

      if (response.status === 201) {
        enqueueSnackbar("Registration Successful", { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar("Registration Failed. Please try again.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error during registration. Please try again.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Confirm your password"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full p-3 bg-red-500 text-white font-semibold rounded-md transition duration-200 hover:bg-red-600"
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/" className="text-red-500 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
