// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
// import "./Signup.css";
// import "./Login"

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     userPhNo: "",
//     userEmail: "",
//     password: "",
//   });

//   const [message, setMessage] = useState(null);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/register", formData);
//       setMessage({ type: "success", text: response.data });
//     } catch (error) {
//       setMessage({ type: "error", text: error.response?.data || "Registration failed" });
//     }
//   };

//   return (
//     <div className="signup-container">

//       {/* Right side - Signup Form */}
//       <div className="signup-box">
//         <h2 className="text-center">Sign Up</h2>

//         {message && (
//           <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
//             {message.text}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Username</label>
//             <input type="text" className="form-control" name="username" required onChange={handleChange} />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Phone Number</label>
//             <input type="text" className="form-control" name="userPhNo" required pattern="^\d{10}$" onChange={handleChange} />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input type="email" className="form-control" name="userEmail" required onChange={handleChange} />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input type="password" className="form-control" name="password" required minLength="6" onChange={handleChange} />
//           </div>

//           <button type="submit" className="btn btn-primary w-100">Sign Up</button>
//         </form>

//         <p className="mt-3 text-center">
//           Already a user? <Link to="/Login">Log in here</Link>
//         </p>
//       </div>
//         {/* Left side - Quotes Section */}
//             <div className="quote-section">
//         <h2>“Great events happen when great people come together.”</h2>
//         <p>— Let's create unforgettable memories!</p>
//         <h2>“Every event is a story, make yours memorable.”</h2>
//         <p>— Your event, your way!</p>
//       </div>

//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Signup.css";
import "./Login";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    userPhNo: "",
    userEmail: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate phone number (Indian 10-digit)
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian number starts with 6-9 and has 10 digits
    return phoneRegex.test(phone);
  };

  // Validate email (@gmail.com or .in)
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|.*\.in)$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!validatePhoneNumber(formData.userPhNo)) {
      validationErrors.userPhNo = "Invalid phone number. Must be a 10-digit Indian number.";
    }

    if (!validateEmail(formData.userEmail)) {
      validationErrors.userEmail = "Invalid email. Must be @gmail.com or end with .in";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await axios.post("http://localhost:8080/register", formData);
      setMessage({ type: "success", text: response.data });

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data || "Registration failed" });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="text-center">Sign Up</h2>

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
            <label className="form-label">Phone Number</label>
            <input 
              type="text" 
              className="form-control" 
              name="userPhNo" 
              required 
              onChange={handleChange} 
            />
            {errors.userPhNo && <small className="text-danger">{errors.userPhNo}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              name="userEmail" 
              required 
              onChange={handleChange} 
            />
            {errors.userEmail && <small className="text-danger">{errors.userEmail}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" required minLength="6" onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>

        <p className="mt-3 text-center">
          Already a user? <Link to="/">Log in here</Link>
        </p>
      </div>

      <div className="quote-section">
        <h2>“Great events happen when great people come together.”</h2>
        <p>— Let's create unforgettable memories!</p>
        <h2>“Every event is a story, make yours memorable.”</h2>
        <p>— Your event, your way!</p>
      </div>
    </div>
  );
};

export default Signup;

