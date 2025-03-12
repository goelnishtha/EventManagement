import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Modal, Form } from "react-bootstrap";
import "./ViewMyEvents.css";

const ViewMyEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState({
    eventTime: "",
    eventDuration: "",
    eventVenue: "",
    eventDate: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = sessionStorage.getItem("Token");
      const userId = sessionStorage.getItem("UserId");

      if (!token || !userId) {
        setError("Unauthorized! Please log in.");
        return;
      }

      console.log("Fetching events for UserId:", userId);
      console.log("Token:", token);

      const response = await axios.post(
        "http://localhost:8080/getUserEvents",
        { userId },
        { headers: { Authorization: token } }
      );

      console.log("API Response:", response.data);

      if (response.data) {
        setUpcomingEvents(response.data.UpcomingEvents || []);
        setPastEvents(response.data.PastEvents || []);
      } else {
        setError("No event data received!");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle opening modal for update
  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setUpdatedEvent({
      eventTime: event.eventTime,
      eventDuration: event.eventDuration,
      eventVenue: event.eventVenue,
      eventDate: event.eventDate,
    });
    setShowModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
  };



  // Handle event cancellation
const handleCancelEvent = async (eventId) => {
    try {
      const token = sessionStorage.getItem("Token");
  
      const response = await axios.post(
        "http://localhost:8080/deleteEvent",
        { eventId },
        { headers: { Authorization: token } }
      );
  
      console.log("Cancel Response:", response.data);
  
      if (response.data.Status === "Success") {
        alert("Event cancelled successfully!");
        fetchEvents(); // Refresh event list
      } else {
        alert("Failed to cancel event!");
      }
    } catch (error) {
      console.error("Error cancelling event:", error);
      alert("Error cancelling event!");
    }
  };
  


  // Handle updating the event
  const handleUpdateEvent = async () => {
    try {
      const token = sessionStorage.getItem("Token");

      const response = await axios.post(
        "http://localhost:8080/updateEvent",
        { eventId: selectedEvent.eventId, ...updatedEvent },
        { headers: { Authorization: token } }
      );

      console.log("Update Response:", response.data);

      if (response.data.status === "Updated Successfully") {
        alert("Event updated successfully!");
        fetchEvents(); // Refresh events
        setShowModal(false);
      } else {
        alert("Failed to update event!");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Error updating event!");
    }
  };

  return (
    <Container>
      <h2 className="mt-4 text-center">📅 My Events</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : (
        <>
          {/* Upcoming Events */}
          <h3 className="mt-4">🚀 Upcoming Events</h3>
          <Row>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
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
                      <Button variant="primary" onClick={() => handleUpdate(event)}>
                        ✏ Update
                      </Button>
                      <Button variant="danger" onClick={() => handleCancelEvent(event.eventId)}>
  ❌ Cancel
</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">No upcoming events. Plan something exciting! 🎉</p>
            )}
          </Row>

          {/* Past Events */}
          <h3 className="mt-4">⏳ Past Events</h3>
          <Row>
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
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
              <p className="text-center text-muted">No past events found.</p>
            )}
          </Row>

          {/* Update Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Update Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
              <Form.Group className="mb-3">
  <Form.Label>📅 Event Date</Form.Label>
  <Form.Control
  type="date"
  name="eventDate"
  value={updatedEvent.eventDate}
  onChange={handleInputChange}
  min={new Date().toISOString().split("T")[0]} // Prevents past dates
/>

</Form.Group>

                
                <Form.Group className="mb-3">
                  <Form.Label>⏰ Event Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="eventTime"
                    value={updatedEvent.eventTime}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>⏳ Duration (in hours)</Form.Label>
                  <Form.Control
  type="number"
  name="eventDuration"
  value={updatedEvent.eventDuration}
  onChange={handleInputChange}
  min="1" // Prevents invalid duration
/>
                </Form.Group>
                <Form.Group className="mb-3">
  <Form.Label>📍 Venue</Form.Label>
  <Form.Select
    name="eventVenue"
    value={updatedEvent.eventVenue}
    onChange={handleInputChange}
  >
    <option value="">Select a Venue</option>
    <option value="Grand Hall">Grand Hall</option>
    <option value="Sunset Garden">Sunset Garden</option>
    <option value="Royal Banquet">Royal Banquet</option>
    <option value="Crystal Ballroom">Crystal Ballroom</option>
    <option value="Ocean View Terrace">Ocean View Terrace</option>
    <option value="Skyline Rooftop">Skyline Rooftop</option>
    <option value="Meadow Pavilion">Meadow Pavilion</option>
    <option value="Lakeside Deck">Lakeside Deck</option>
    <option value="Vintage Courtyard">Vintage Courtyard</option>
    <option value="The Grand Atrium">The Grand Atrium</option>
  </Form.Select>
</Form.Group>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                ❌ Close
              </Button>
              <Button variant="primary" onClick={handleUpdateEvent}>
                ✅ Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default ViewMyEvents;
