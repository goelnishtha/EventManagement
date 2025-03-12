import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";  // Import axios
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookingForm.css";
import weddingImage from "../assets/wedding.jpg";
import birthdayImage from "../assets/Birthday.jpg";
import anniversaryImage from "../assets/Anniversry.jpg";
import corporateImage from "../assets/Corporate.jpg";
import concertsImage from "../assets/Concert.jpg";
import partyImage from "../assets/Private-parties.jpg";
import sportsImage from "../assets/Sports.jpg";
import exhibitionImage from "../assets/Exhibitions.jpg";
import religiousImage from "../assets/Religious.jpg";

const eventImages = {
  wedding: weddingImage,
  birthday: birthdayImage,
  anniversary: anniversaryImage,
  "corporate-events": corporateImage,
  concerts: concertsImage,
  "private-parties": partyImage,
  "sports-events": sportsImage,
  exhibitions: exhibitionImage,
  "religious-events": religiousImage,
};

const BookingForm = () => {
  const { eventType } = useParams();
  const [formData, setFormData] = useState({
    eventName: eventType.replace("-", " "),
    eventDuration: "",
    eventTime: "",
    eventDate: "",
    eventVenue: "",
    status: "Scheduled", // Default status
    userId: sessionStorage.getItem("UserId"), // Fetch userId from sessionStorage
  });

  const [error, setError] = useState(""); // Define error state

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Event Data:", formData);

    try {
      const token = sessionStorage.getItem("Token");
      if (!token) {
        setError("Authorization token missing. Please log in.");
        return;
      }

      const response = await axios.post("http://localhost:8080/createEvent", formData, {
        headers: { Authorization: token, "Content-Type": "application/json" },
      });

      if (response.data.status === "Success") {
        alert("Booking Successful!");
      } else {
        alert("Something went wrong: " + response.data.message);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.Error || "Error processing request");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="container booking-container">
      <h1 className="text-center mt-4">Book Your {formData.eventName}</h1>
      <div className="image-container text-center">
        <img
          src={eventImages[eventType] || weddingImage}
          alt={eventType}
          className="event-image"
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>} {/* Display error */}

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="mb-3">
          <label className="form-label">Event Duration (in hours)</label>
          <input
            type="number"
            name="eventDuration"
            className="form-control"
            placeholder="Enter duration in hours"
            min="1"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Event Time</label>
          <input
            type="time"
            name="eventTime"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Event Date</label>
          <input
            type="date"
            name="eventDate"
            className="form-control"
            min={new Date().toISOString().split("T")[0]} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Venue</label>
          <select
            name="eventVenue"
            className="form-control"
            onChange={handleChange}
            required
          >
            <option value="">Select a Venue</option>
            <option value="Grand Palace Hall">Grand Palace Hall</option>
            <option value="Royal Garden Resort">Royal Garden Resort</option>
            <option value="Sunset Beach Resort">Sunset Beach Resort</option>
            <option value="Elite Banquet Hall">Elite Banquet Hall</option>
            <option value="Stadium Arena">Stadium Arena</option>
            <option value="City Convention Center">City Convention Center</option>
            <option value="Luxury Yacht">Luxury Yacht</option>
            <option value="Skyview Rooftop">Skyview Rooftop</option>
            <option value="Opera House">Opera House</option>
            <option value="Sports Complex">Sports Complex</option>
            <option value="Greenwood Exhibition Hall">Greenwood Exhibition Hall</option>
            <option value="Sacred Temple Grounds">Sacred Temple Grounds</option>
            <option value="Corporate Tower Conference Room">Corporate Tower Conference Room</option>
            <option value="Downtown Concert Pavilion">Downtown Concert Pavilion</option>
            <option value="Private Estate Garden">Private Estate Garden</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
