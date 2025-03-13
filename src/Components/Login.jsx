import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", formData);

      if (response.data.Status === "Success") {
        setMessage({ type: "success", text: "Login successful! Redirecting..." });
        console.log(response.data.Token)
        console.log(response.data.UserId)
        sessionStorage.setItem("Token", response.data.Token)
        sessionStorage.setItem("UserId", response.data.UserId)
        sessionStorage.setItem("Username", response.data.Username)

        setTimeout(() => {
          navigate("/home"); // Redirect to Home Page
        }, 1000);
      } else {
        setMessage({ type: "error", text: response.data.UserId });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Login failed" });
    }
  };

  return (
    <div className="login-container">
      <video autoPlay muted loop className="background-video">
        <source src="/event_bg.mp4" type="video/mp4" />
      </video>

      {/* Left side - Login Form */}
      <div className="login-box">
        <h2 className="text-center">Login</h2>

        {message && (
          <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" required onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3">
          New here? <Link to="/signup">Sign up now</Link>
        </p>
      </div>

      <div className="quote-section">
        <h2>“Success is where preparation and opportunity meet.”</h2>
        <p>— Get ready for an amazing event journey!</p>
        <h2>“The best way to predict the future is to create it.”</h2>
        <p>— Join us and shape your dream event!</p>
      </div>
    </div>
  );
};

export default Login;
