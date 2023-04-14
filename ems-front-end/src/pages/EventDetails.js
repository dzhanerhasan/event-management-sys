import "../styles/EventDetails.css";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";
import { FaUsers } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import moment from "moment";

import ParticipantModal from "../components/ParticipantModal";

const EventDetails = () => {
  const { eventId } = useParams();
  const { events, participateInEvent, cancelParticipation } =
    useContext(EventContext);
  const [event, setEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const numEventId = Number(eventId);
    const foundEvent = events.find((e) => e.id === numEventId);
    setEvent(foundEvent);
    if (foundEvent) {
      setIsParticipating(foundEvent.attendees.includes("You"));
    }
  }, [eventId, events]);

  const toggleParticipantsModal = () => {
    setModalVisible((prevModalVisible) => !prevModalVisible);
  };

  const handleParticipate = () => {
    setIsParticipating(true);
    participateInEvent(event.id, "You");
  };

  const handleCancel = () => {
    setIsParticipating(false);
    cancelParticipation(event.id, "You");
  };

  const navigateBack = () => {
    navigate(-1);
  };

  if (!event) {
    return <p>Event not found.</p>;
  }

  const { title, date, time, description, imageUrl, attendees } = event;

  return (
    <div className="event-details">
      <div className="event-details-wrapper">
        <FaArrowLeft className="back-arrow" onClick={navigateBack} />
        <div className="event-details-container container d-flex justify-content-center align-items-center vh-100">
          <div className="event-details-card card">
            <img className="card-img-top" src={imageUrl} alt={title} />
            <div className="card-body text-center">
              <h2 className="card-title">{title}</h2>
              <p className="text-muted">
                {moment(date).format("MMMM Do, YYYY")} -{" "}
                {moment(time, "HH:mm").format("hh:mm A")}
              </p>
              <p className="card-text">{description}</p>
              <button
                className={`btn ${
                  isParticipating ? "btn-danger" : "btn-primary"
                } mt-3`}
                onClick={isParticipating ? handleCancel : handleParticipate}
              >
                {isParticipating ? "Cancel" : "Participate"}
              </button>
            </div>
          </div>
        </div>
        <div
          className="event-details-participant-count"
          onClick={toggleParticipantsModal}
        >
          {attendees.length} <FaUsers />
        </div>
        <ParticipantModal
          showModal={modalVisible}
          toggleModal={toggleParticipantsModal}
          participants={attendees}
          participating={isParticipating}
          toggleParticipation={
            isParticipating ? handleCancel : handleParticipate
          }
        />
      </div>
    </div>
  );
};

export default EventDetails;
