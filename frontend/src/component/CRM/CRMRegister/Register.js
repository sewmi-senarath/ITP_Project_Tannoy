import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Header from "../AdminNav/AdminNav";
import signupimg from "./img/signup.png";
import axios from "axios";

function Register() {
  const history = useNavigate();
  const [user, setUser] = useState({
    fname: "",
    sname: "",
    email: "",
    password: "",
  });

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then(() => {
        alert("User Registered Successfully");
        history("/CRMLogin");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // API request to register the user
  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/CRMRegister", {
        fname: String(user.fname),
        sname: String(user.sname),
        email: String(user.email),
        password: String(user.password),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      {/* <Header /> */}
      <h2 className="font-bold text-5xl text-slate-700 text-center mt-14">
      Customer Register
      </h2>
      <hr className="border-2 border-slate-500 mt-5" />
      <div className="flex flex-row w-2/3 p-1 ml-96 rounded-lg">
        <form
          className="border-2 w-3/5 p-5 rounded-lg shadow-lg my-10 h-3/3 bg-blue-200"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col mb-8 w-max p-2">
            <div className="flex flex-row mx-auto p-2 gap-5">
              <div className="w-1/2">
                <label className="font-medium font-sans text-2xl text-slate-800 ">
                  First Name
                </label>
                <br />
                <input
                  type="text"
                  value={user.fname}
                  onChange={handleInputChange}
                  name="fname"
                  placeholder="First Name"
                  className="h-10 border rounded-lg border-slate-400 mt-2 
                  placeholder-shown: font-sans placeholder-slate-500 p-2"
                  required
                ></input>
              </div>
              <div className=" ">
                <label className="font-medium font-sans text-2xl text-slate-800 ">
                  Second Name
                </label>
                <br />
                <input
                  type="text"
                  value={user.sname}
                  onChange={handleInputChange}
                  name="sname"
                  placeholder="Second Name"
                  className="w-48 h-10 border  rounded-lg border-slate-400 mt-2 
                  placeholder-shown: font-sans placeholder-slate-500 p-2"
                  required
                ></input>
              </div>
            </div>
            <div className="mt-3 w-max mx-auto">
              <label className="font-medium font-sans text-2xl text-slate-800 ml-5">
                Email
              </label>
              <br />
              <input
                type="email"
                value={user.email}
                onChange={handleInputChange}
                name="email"
                placeholder="example@gmail.com"
                className="w-96 h-10 border ml-5 rounded-lg border-slate-400 
                  placeholder-shown: font-sans placeholder-slate-500 p-2"
                required
              ></input>
            </div>
            <div className="mt-3 w-max mx-auto">
              <label className="font-medium font-sans text-2xl text-slate-800 ml-5">
                Password
              </label>
              <br />
              <input
                type="password"
                value={user.password}
                onChange={handleInputChange}
                name="password"
                placeholder="password"
                className="w-96 h-10 border ml-5 rounded-lg mt-2 border-slate-400 
                  placeholder-shown: font-sans placeholder-slate-500 p-2"
                required
              ></input>
            </div>
          </div>

        <div className="mx-auto">
          <button className="w-72 bg-blue-700 font-semibold p-2  rounded-lg hover:bg-blue-600 ">
            Sign Up
          </button>
          </div>
          <div className="mx-auto">
          <p className=" mt-3 text-black">
            Already have an account?
            <Link to="/CRMLogin">
              <span className="text-blue-800 font-semibold ml-2 hover:text-blue-700">
                Login Here
              </span>
            </Link>
          </p>
          </div>
        </form>

        <div>
          <img src={signupimg} alt="signup" className="w-3/4 mt-14 ml-2" />
        </div>
      </div>
    </div>
  );
}

export default Register;
