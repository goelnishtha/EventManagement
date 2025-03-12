import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "./ViewAllEvents.css";

const ViewAllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const token = sessionStorage.getItem("Token");
      if (!token) {
        setError("Unauthorized! Please log in.");
        return;
      }

      console.log("Fetching all events...");

      const response = await axios.get("http://localhost:8080/getAllEvents", {
        headers: { Authorization: token },
      });

      console.log("API Response:", response.data);

      if (response.data) {
        setEvents(response.data || []);
      } else {
        setError("No event data received!");
      }
    } catch (error) {
      console.error("Error fetching all events:", error);
      setError("Failed to fetch events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="mt-4 text-center">🌍 All Events</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : (
        <Row>
          {events.length > 0 ? (
            events.map((event) => (
              <Col md={4} key={event.eventId} className="mb-4">
                <Card className="shadow">
                  <Card.Body>
                    <Card.Title>{event.eventName}</Card.Title>
                    <Card.Text>
                      <strong>📅 Date:</strong> {event.eventDate} <br />
                      <strong>⏰ Time:</strong> {event.eventTime} <br />
                      <strong>📍 Venue:</strong> {event.eventVenue} <br />
                      <strong>⏳ Hours:</strong> {event.eventDuration}
                    </Card.Text>
                    
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center text-muted">No events found.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default ViewAllEvents;
