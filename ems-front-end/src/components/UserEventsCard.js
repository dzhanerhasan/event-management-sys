import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserEventsCard = ({ username }) => {
  const [view, setView] = useState("created");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url =
      view === "created"
        ? `http://localhost:8000/api/events/my_events/${username}`
        : `http://localhost:8000/api/events/participating/${username}`;

    axios.get(url).then((res) => {
      setEvents(res.data);
    });
  }, [view, username]);

  useEffect(() => {
    setView("created");
  }, [username]);

  return (
    <div className="col-md-5 m-3 card custom-card rounded">
      <div className="card-body">
        <h5 className="card-title">My Events</h5>
        <div className="btn-group custom-btn-group">
          <button
            className={`btn custom-btn ${view === "created" ? "active" : ""}`}
            onClick={() => setView("created")}
          >
            Created Events
          </button>
          <button
            className={`btn custom-btn ${
              view === "participating" ? "active" : ""
            }`}
            onClick={() => setView("participating")}
          >
            Participating Events
          </button>
        </div>

        <div className="events-card mx-auto">
          {events.map((event) => (
            <div className="card custom-card event-card mb-3" key={event.id}>
              <div
                onClick={() => navigate(`/event/${event.id}`)}
                className="text-decoration-none"
              >
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserEventsCard;
