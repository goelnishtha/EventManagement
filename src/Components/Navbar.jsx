// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
// import "./Navbar.css";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   // Fetch user ID from session storage
//   useEffect(() => {
//     const storedUserId = sessionStorage.getItem("userId");
//     console.log("Fetched userId:", storedUserId);
//     if (storedUserId) {
//       setUserId(storedUserId);
//     }
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     sessionStorage.removeItem("userId");
//     setUserId(null);
//     navigate("/login");
//   };

//   // Close navbar when clicking outside (Fixed)
//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (!e.target.closest(".sidebar") && !e.target.closest(".hamburger")) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       setTimeout(() => document.addEventListener("click", handleOutsideClick), 0);
//     } else {
//       document.removeEventListener("click", handleOutsideClick);
//     }

//     return () => document.removeEventListener("click", handleOutsideClick);
//   }, [isOpen]);

//   return (
//     <>
//       {/* Hamburger Icon (Fixed) */}
//       <div className="hamburger" onClick={(e) => {
//         e.stopPropagation(); // Prevents immediate closing
//         setIsOpen(!isOpen);
//       }}>
//         {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
//       </div>

//       {/* User ID Display */}
//       {userId && (
//         <div className="user-info">
//           <FaUserCircle size={24} />
//           <span style={{ color: "#ff7e5f", fontWeight: "bold" }}>{userId}</span>
//         </div>
//       )}

//       {/* Logo in the Top-Right Corner */}
//       <div className="logo-container">
//         <img src={logo} alt="Magic Moments Logo" className="logo" />
//       </div>

//       {/* Sidebar Navigation */}
//       <nav className={`sidebar ${isOpen ? "open" : ""}`}>
//         <ul className="nav-links">
//           <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
//           <li><Link to="/myevents" onClick={() => setIsOpen(false)}>My Events</Link></li>
//           <li><Link to="/allevents" onClick={() => setIsOpen(false)}>All Events</Link></li>
//           <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>

//           {userId !== null ? (
//   <>
//     <li className="user-icon">
//       <span style={{ color: "#ff7e5f", fontWeight: "bold" }}>User ID: {userId}</span>
//     </li>
//     <li>
//       <button onClick={handleLogout} className="logout-btn">Logout</button>
//     </li>
//   </>
// ) : (
//   <li><Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up / Login</Link></li>
// )}

//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const name = sessionStorage.getItem("Username");
  const userid = sessionStorage.getItem("UserId");

  console.log("Stored Username:", name);
  console.log("Stored UserId:", userid);


  // Close navbar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".sidebar") && !e.target.closest(".hamburger")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  const handleLogout = () => {
    sessionStorage.removeItem("Username");
    sessionStorage.removeItem("UserId");
    navigate("/"); // Redirect to login page
    window.location.reload(); // Force reloading to clear state
  };
  

  return (
    <>
      {/* Hamburger Icon */}
      <div
        className="hamburger"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* User Info */}
      {userid && (
        <div className="user-info">
          <FaUserCircle size={24} />
          <span style={{ color: "#ff7e5f", fontWeight: "bold" }}>
            {name ? `Hi, ${name}` : `User ID: ${userid}`}
          </span>
        </div>
      )}

      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Magic Moments Logo" className="logo" />
      </div>

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <Link to="/home" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/viewmyevents" onClick={() => setIsOpen(false)}>
              My Events
            </Link>
          </li>
          <li>
            <Link to="/viewallevents" onClick={() => setIsOpen(false)}>
              All Events
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>

          {userid !== null ? (
            <>
              <li className="user-icon">
                <span style={{ color: "#ff7e5f", fontWeight: "bold" }}>
                  
                </span>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                Sign Up / Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

