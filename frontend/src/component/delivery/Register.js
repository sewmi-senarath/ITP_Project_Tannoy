import React, { useState } from 'react'
import Sidebar from './deliveryHeader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Register() {

  const history = useNavigate();
  const [user, setParsel] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setParsel((prevParsel) => ({...prevParsel, [name]:value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendRequest()
    .then(() => {
      alert("Registered")
      history("/deliveryHome")
    })
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/register",{
        name: String(user.name),
        email: String(user.email),
        password: String(user.password),
      })
      .then((res) => res.data);

  };


  return (
    <div className="container">
      <Sidebar></Sidebar>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Enter Your Name"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Enter Your Email"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder="Enter Your Password"
              required
            />
          </label>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
