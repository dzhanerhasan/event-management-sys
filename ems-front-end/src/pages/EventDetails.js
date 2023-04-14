import "../styles/EventDetails.css";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";
import { FaUsers } from "react-icons/fa";

import moment from "moment";

import ParticipantModal from "../components/ParticipantModal";

const EventDetails = () => {
  const { eventId } = useParams();
  const { events, participateInEvent, cancelParticipation } =
    useContext(EventContext);
  const [event, setEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);

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

  if (!event) {
    return <p>Event not found.</p>;
  }

  const { title, date, time, description, imageUrl, attendees } = event;

  return (
    <div className="container-md my-5 event-details">
      <div className="row">
        <div className="col-md-6 col-lg-6">
          <img
            className="event-details-img img-fluid"
            src={imageUrl}
            alt={title}
          />
        </div>
        <div className="col-md-6 col-lg-6">
          <h2 className="event-details-title">{title}</h2>
          <p className="event-details-date-time">
            {moment(date).format("MMMM Do, YYYY")} -{" "}
            {moment(time, "HH:mm").format("hh:mm A")}
          </p>
          <p className="event-details-description">{description}</p>
          <button
            className={`btn btn-${isParticipating ? "danger" : "primary"} mt-3`}
            onClick={isParticipating ? handleCancel : handleParticipate}
          >
            {isParticipating ? "Cancel" : "Participate"}
          </button>
          <div
            className="event-details-participant-count float-end"
            onClick={toggleParticipantsModal}
          >
            {attendees.length} <FaUsers />
          </div>
        </div>
      </div>
      <ParticipantModal
        showModal={modalVisible}
        toggleModal={toggleParticipantsModal}
        participants={attendees}
        participating={isParticipating}
        toggleParticipation={isParticipating ? handleCancel : handleParticipate}
      />
    </div>
  );
};

export default EventDetails;
