import React from "react";
import { useNavigate } from "react-router-dom";

const UserEventsCard = ({ events, view, setView }) => {
  const navigate = useNavigate();

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
