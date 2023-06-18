import "../styles/ParticipantModal.css";

import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ParticipantModal = ({ showModal, toggleModal, participants }) => {
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
        <FaTimes className="participant-modal-close" onClick={toggleModal} />
        <ul>
          {participants.map((participant) => (
            <li key={participant}>
              <Link
                to={`/user-profile/${participant.username}`}
                style={{ textDecoration: "none" }}
              >
                {participant.username}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ParticipantModal;
