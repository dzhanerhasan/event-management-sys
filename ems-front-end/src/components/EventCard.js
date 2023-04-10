import React from "react";
import { Link } from "react-router-dom";
import "../styles/EventCard.css";
import { FaUsers } from "react-icons/fa";

const EventCard = ({ event, index, delay }) => {
  const { title, date, time, location, description, participants } = event;

  return (
    <div
      className="col-lg-4 col-md-6 mb-4"
      style={{ animationDelay: `${delay}s` }}
    >
      <Link to={`/event-details/${index}`} className="event-card-link">
        <div className="card h-100 event-card">
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <strong>Date:</strong> {date}
            </p>
            <p className="card-text">
              <strong>Time:</strong> {time}
            </p>
            <p className="card-text">
              <strong>Location:</strong> {location}
            </p>
            <p className="card-text">
              <strong>Participants:</strong> {participants?.length || 0}{" "}
              <FaUsers />
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
