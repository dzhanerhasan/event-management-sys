import React, { useState } from "react";
import "../styles/CreateEventPage.css";

const CreateEventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [validation, setValidation] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    const isDateValid = date >= currentDate;

    if (title && description && date && location) {
      onSubmit({ title, description, date, location });
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
    } else {
      setValidation({
        title: !title,
        description: !description,
        date: !date || !isDateValid,
        location: !location,
      });
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          Event created successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className={`mb-3 ${validation.title ? "has-validation" : ""}`}>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control ${validation.title ? "is-invalid" : ""}`}
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setValidation({ ...validation, title: false });
            }}
          />
          {validation.title && (
            <div className="invalid-feedback">Please enter a title.</div>
          )}
        </div>

        <div
          className={`mb-3 ${validation.description ? "has-validation" : ""}`}
        >
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className={`form-control ${
              validation.description ? "is-invalid" : ""
            }`}
            id="description"
            rows="3"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setValidation({ ...validation, description: false });
            }}
          ></textarea>
          {validation.description && (
            <div className="invalid-feedback">Please enter a description.</div>
          )}
        </div>

        <div className={`mb-3 ${validation.date ? "has-validation" : ""}`}>
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className={`form-control ${validation.date ? "is-invalid" : ""}`}
            id="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setValidation({ ...validation, date: false });
            }}
          />
          {validation.date && (
            <div className="invalid-feedback">Please enter a valid date.</div>
          )}
        </div>

        <div className={`mb-3 ${validation.location ? "has-validation" : ""}`}>
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className={`form-control ${
              validation.location ? "is-invalid" : ""
            }`}
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setValidation({ ...validation, location: false });
            }}
          />
          {validation.date && (
            <div className="invalid-feedback">Please enter a location.</div>
          )}
        </div>
        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "#fcd34d" }}
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
