import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";  
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";  
import Footer from "./Components/Footer";
import BookingForm from "./Components/BookingForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ViewMyEvents from "./Components/ViewMyEvents";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewAllEvents from "./Components/ALLEvents";



function App() {
  const [userId, setUserId] = useState(sessionStorage.getItem("UserId"));

  return (
    <Router>
      <Navbar userId={userId} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Login setUserId={setUserId} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/booking/:eventType" element={<BookingForm />} />
          <Route path="/viewmyevents" element={<ViewMyEvents />} />
          <Route path="/viewallevents" element={<ViewAllEvents />} />

        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
