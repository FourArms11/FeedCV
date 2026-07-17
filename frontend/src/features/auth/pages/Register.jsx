import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.scss";
import { useAuth } from "../hooks/useAuth.jsx";


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const {loading,handleRegister} = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    navigate("/login");
  }

  return (
    <div className="register">
      <div className="register__card">
        <h1 className="register__title">Register</h1>

        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register__field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register__field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register__submit">
            Register
          </button>
        </form>

        <p className="register__footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register