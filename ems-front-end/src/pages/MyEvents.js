import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MyEvents.css";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const [view, setView] = useState("created");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const url =
      view === "created"
        ? "http://localhost:8000/api/events/my_events"
        : "http://localhost:8000/api/events/participating";

    axios.get(url).then((res) => {
      setEvents(res.data);
    });
  }, [view]);

  return (
    <div className="container my-5">
      <h1 className="text-center">My Events</h1>
      <div className="d-flex justify-content-center my-4">
        <div className="btn-group custom-btn-group">
          <button
            className={`btn ${view === "created" ? "active" : ""}`}
            onClick={() => setView("created")}
          >
            Created Events
          </button>
          <button
            className={`btn ${view === "participating" ? "active" : ""}`}
            onClick={() => setView("participating")}
          >
            Participating Events
          </button>
        </div>
      </div>
      <div className="events-card mx-auto">
        {events.map((event) => (
          <div className="card event-card mb-3" key={event.id}>
            <Link to={`/event/${event.id}`} className="text-decoration-none">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {event.date} {event.time}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Location: {event.location}
                  </small>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
