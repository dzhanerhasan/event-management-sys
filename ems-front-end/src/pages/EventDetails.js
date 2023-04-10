import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";
import ParticipantModal from "../components/ParticipantModal";
import { FaUsers } from "react-icons/fa";
import "../styles/EventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const { events } = useContext(EventContext);
  const [event, setEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);

  useEffect(() => {
    const numEventId = Number(eventId);
    const foundEvent = events.find((e) => e.id === numEventId);
    setEvent(foundEvent);
  }, [eventId, events]);

  const toggleParticipantsModal = () => {
    setModalVisible((prevModalVisible) => !prevModalVisible);
  };

  const handleParticipate = () => {
    setIsParticipating(true);
    setEvent((prevEvent) => ({
      ...prevEvent,
      attendees: [...prevEvent.attendees, "You"],
    }));
  };

  const handleCancel = () => {
    setIsParticipating(false);
    setEvent((prevEvent) => ({
      ...prevEvent,
      attendees: prevEvent.attendees.filter((attendee) => attendee !== "You"),
    }));
  };

  if (!event) {
    return <p>Event not found.</p>;
  }

  const { title, date, time, description, imageUrl, attendees } = event;

  return (
    <div className="container-md my-5 event-details">
      <div className="row">
        <div className="col-md-6">
          <img className="event-details-img" src={imageUrl} alt={title} />
        </div>
        <div className="col-md-6">
          <h2 className="event-details-title">{title}</h2>
          <p className="event-details-date-time">
            {date} - {time}
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
        visible={modalVisible}
        onClose={toggleParticipantsModal}
        participants={attendees}
      />
    </div>
  );
};

export default EventDetails;
