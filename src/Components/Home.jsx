import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import weddingImage from "../assets/wedding.jpg";
import birthdayImage from "../assets/Birthday.jpg";
import anniversaryImage from "../assets/Anniversry.jpg";
import corporateImage from "../assets/Corporate.jpg";
import concertsImage from "../assets/Concert.jpg";
import partyImage from "../assets/Private-parties.jpg";
import sportsImage from "../assets/Sports.jpg";
import exhibitionImage from "../assets/Exhibitions.jpg";
import religiousImage from "../assets/Religious.jpg";

const events = [
  { name: "Wedding", image: weddingImage, link: "/booking/wedding" },
  { name: "Birthday", image: birthdayImage, link: "/booking/birthday" },
  { name: "Anniversary", image: anniversaryImage, link: "/booking/anniversary" },
  { name: "Corporate Events", image: corporateImage, link: "/booking/corporate-events" },
  { name: "Concerts", image: concertsImage, link: "/booking/concerts" },
  { name: "Private Parties", image: partyImage, link: "/booking/private-parties" },
  { name: "Sports Events", image: sportsImage, link: "/booking/sports-events" },
  { name: "Exhibitions", image: exhibitionImage, link: "/booking/exhibitions" },
  { name: "Religious Events", image: religiousImage, link: "/booking/religious-events" },
];

const Home = () => {
  return (
    <div className="container home-container">
      <h1 className="home-title text-center mt-4">Welcome to Magic Moments</h1>
      <div className="row">
        {events.map((event, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card event-card h-100">
              <img src={event.image} className="card-img-top event-image" alt={`${event.name} Event`} />
              <div className="card-body text-center">
                <h5 className="card-title">{event.name}</h5>
                <Link to={event.link} className="btn btn-primary">Book {event.name}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
