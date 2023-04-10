import React from "react";
import "../styles/ParticipantModal.css";

const ParticipantModal = ({
  showModal,
  toggleModal,
  participants,
  participating,
  toggleParticipation,
}) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="participant-modal-backdrop" onClick={toggleModal}>
      <div
        className="participant-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Participants</h3>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
        <button className="btn btn-primary" onClick={toggleParticipation}>
          {participating ? "Cancel" : "Participate"}
        </button>
        <button className="btn btn-secondary" onClick={toggleModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ParticipantModal;
