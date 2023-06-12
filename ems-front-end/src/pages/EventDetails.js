import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaArrowLeft,
  FaTrashAlt,
  FaRegCheckCircle,
} from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import ParticipantModal from "../components/ParticipantModal";
import Comments from "../components/Comments";
import "../styles/EventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setComments(response.data.comments);
      });

    axios
      .get(`http://localhost:8000/api/auth/current-user/`)
      .then((response) => {
        setCurrentUser(response.data);
      });
  }, [eventId]);

  const toggleParticipantsModal = () => {
    setModalVisible((prevModalVisible) => !prevModalVisible);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/events/${eventId}`)
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error("Failed to delete event: ", error);
      });
  };

  const handleParticipation = () => {
    axios
      .post(`http://localhost:8000/api/events/${eventId}/participate/`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Failed to participate in event: ", error);
      });
  };

  const handleCancellation = () => {
    axios
      .post(`http://localhost:8000/api/events/${eventId}/cancel/`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Failed to cancel participation: ", error);
      });
  };

  if (!event || !currentUser) {
    return <p>Loading...</p>;
  }

  const { title, date, time, description, image_url, attendees, created_by } =
    event;

  const isCreator = created_by.username === currentUser.username;
  const isParticipant =
    attendees.find((user) => user.username === currentUser.username) !==
    undefined;

  return (
    <div className="event-details">
      <div className="event-details-wrapper">
        <FaArrowLeft className="back-arrow fade-up" onClick={navigateBack} />

        <div className="event-details-container container d-flex justify-content-center align-items-center vh-100 fade-up">
          <div className="d-flex flex-row justify-content-center align-items-stretch">
            <div className="event-details-card card mr-3">
              <img className="card-img-top" src={image_url} alt={title} />
              <div className="card-body text-center">
                <h2 className="card-title">{title}</h2>
                <p className="text-muted">
                  {moment(date).format("MMMM Do, YYYY")} -{" "}
                  {moment(time, "HH:mm").format("hh:mm A")}
                </p>
                <p className="card-text">{description}</p>
                {isCreator ? (
                  <button
                    className="btn btn-danger mt-3"
                    onClick={handleDelete}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                ) : isParticipant ? (
                  <button
                    className="btn btn-danger mt-3"
                    onClick={handleCancellation}
                  >
                    Cancel <FaRegCheckCircle />
                  </button>
                ) : (
                  <button
                    className="btn btn-success mt-3"
                    onClick={handleParticipation}
                  >
                    Participate <FaRegCheckCircle />
                  </button>
                )}
              </div>
            </div>
            <Comments
              eventId={eventId}
              comments={comments}
              setComments={setComments}
              currentUser={currentUser}
              createdBy={event.created_by}
            />
          </div>
        </div>

        <div
          className="event-details-participant-count fade-up"
          onClick={toggleParticipantsModal}
        >
          {attendees.length} <FaUsers />
        </div>

        <ParticipantModal
          showModal={modalVisible}
          toggleModal={toggleParticipantsModal}
          participants={attendees}
        />
      </div>
    </div>
  );
};

export default EventDetails;
