import React from "react";
import { Link } from "react-router-dom";
import "../styles/EventCard.css";

const EventCard = ({ event, index }) => {
  const { title, date, location, description } = event;

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 event-card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <strong>Date:</strong> {date}
          </p>
          <p className="card-text">
            <strong>Location:</strong> {location}
          </p>
        </div>
        <div className="card-footer">
          <Link to={`/event-details/${index}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
