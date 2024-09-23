import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {
  const history = useNavigate()
  const [user, setParsel] = useState({
    name: "",
    email: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParsel((prevParsel) => ({ ...prevParsel, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const response = await sendRequest();
      if(response.status === "ok"){
        alert("Login Success");
        history("/deliveryHome");
      }else{
        alert("Login Error");
      }
    }catch(err){
      alert("error" + err.message);
    }
  }

  const sendRequest = async () => {
    return   await axios
      .post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
      })
      .then((res) => res.data)
  }

  return (
    <div>
      <div className="container">
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
