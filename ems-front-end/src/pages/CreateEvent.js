import React, { useContext } from "react";
import CreateEventForm from "../components/CreateEventForm";
import { EventContext } from "../contexts/EventContext";
import "../styles/CreateEventPage.css";

const CreateEvent = () => {
  const { addEvent } = useContext(EventContext);

  const handleSubmit = (eventData) => {
    addEvent(eventData);
  };

  return (
    <div className="container-md my-5">
      <h1 className="text-center create-event-title">Create a New Event</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <CreateEventForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
