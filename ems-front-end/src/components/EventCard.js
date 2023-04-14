import React from "react";
import { Link } from "react-router-dom";
import "../styles/EventCard.css";
import { FaUsers } from "react-icons/fa";
import moment from "moment";

const EventCard = ({ event, delay }) => {
  const { title, date, time, location, description, attendees } = event;

  return (
    <div
      className="col-lg-4 col-md-6 mb-4"
      style={{ animationDelay: `${delay}s` }}
    >
      <Link to={`/event/${event.id}`} className="event-card-link">
        <div className="card h-100 event-card">
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <strong>Date:</strong> {moment(date).format("MMMM Do, YYYY")}
            </p>
            <p className="card-text">
              <strong>Time:</strong> {moment(time, "HH:mm").format("hh:mm A")}
            </p>
            <p className="card-text">
              <strong>Location:</strong> {location}
            </p>
            <p className="card-text">
              <strong>Participants:</strong> {attendees?.length || 0}
              <FaUsers />
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
