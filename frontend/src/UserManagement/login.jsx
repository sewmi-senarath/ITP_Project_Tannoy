import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import loginimg from "../component/CRM/CRMLogin/img/login.png";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const containsAtSymbol = (email) => email.includes("@");

  const handleLogin = async () => {
    if (!email.trim()) {
      enqueueSnackbar("Please enter your email", { variant: "error" });
      return;
    }
    if (!containsAtSymbol(email)) {
      enqueueSnackbar("Email must contain an '@' symbol", { variant: "error" });
      return;
    }
    if (!isValidEmail(email)) {
      enqueueSnackbar("Please enter a valid email address", { variant: "error" });
      return;
    }
    if (!password.trim()) {
      enqueueSnackbar("Please enter your password", { variant: "error" });
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, username, _id: userId } = response.data;

        if (!userId) {
          console.error("userId is missing from the response.");
        }

        localStorage.setItem('user', JSON.stringify({ username, token, userId }));
        enqueueSnackbar("Login Successful", { variant: "success" });

        if (email === "inventorymanage@gmail.com") {
          navigate("/productDashboard");
        }
        else if (email === "employeemanager@gmail.com") {
          navigate("/employee-dashboard");
        } 

        else if (email === "inquirymanager@gmail.com") {
          navigate("/");
        } 
        else if (email === "technicalmanagr@gmail.com") {
          navigate("/technicalHome");
        } 
        else if (email === "deliverymanager@gmal.com") {
          navigate("/deliveryHome");
        } 
        else if (email === "financemanager@gmal.com") {
          navigate("/InvestorsDashboard");
        } 
        else if (email === "productmanager@gmal.com") {
          navigate("/recycle-product-dashbord");
        } 
        else {
          navigate("/crmHome");
        }

        window.location.reload();
      } else {
        enqueueSnackbar("Invalid email or password", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Login failed. Please check your credentials.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-row mt-10 w-2/3 p-1 rounded-lg">
        <form
          className="border-2 w-3/5 p-5 rounded-lg shadow-lg bg-blue-200"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <h2 className="font-bold text-5xl text-slate-700 text-center mt-14">
            Login
          </h2>
          <hr className="border-2 border-slate-500 mx-6 mb-5" />

          <div className="flex flex-col mb-8">
            <label className="font-medium font-sans text-2xl text-slate-800 ml-5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-96 h-10 border ml-5 rounded-lg border-slate-400 mt-2 p-2"
              required
            />
          </div>

          <div className="flex flex-col mb-8">
            <label className="font-medium font-sans text-2xl text-slate-800 ml-5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-96 h-10 border ml-5 rounded-lg mt-2 border-slate-400 p-2"
              required
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-96 bg-blue-600 font-semibold p-2 ml-7 rounded-lg hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="ml-7 mt-3 text-black">
            Don't have an account?
            <a href="/Register" className="text-blue-700 font-semibold ml-2 hover:text-blue-800">
              Sign Up Here
            </a>
          </p>
        </form>

        <div>
          <img src={loginimg} alt="login" className="w-3/4 mt-8 ml-2" />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;