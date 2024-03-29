import "../styles/CreateEventPage.css";
import React, { useState } from "react";
import EventInputField from "../components/EventInputField";

const CreateEventForm = ({ onSubmit, userGroups }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [validation, setValidation] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    const isDateValid = date >= currentDate;

    if (title && description && date && time && location && isDateValid) {
      const defaultImageUrl =
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80";

      const eventData = {
        title,
        description,
        date,
        time,
        location,
        image_url: imageUrl || defaultImageUrl,
      };

      if (!isPublic) {
        eventData.group = selectedGroup;
      }

      console.log(eventData);

      await onSubmit(eventData);

      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setLocation("");
      setImageUrl("");
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
    } else {
      setValidation({
        title: !title,
        description: !description,
        date: !date || !isDateValid,
        time: !time,
        location: !location,
      });
    }
  };

  return (
    <div>
      {successMessage && (
        <div
          className={`alert alert-success fade show`}
          role="alert"
          onAnimationEnd={() => setSuccessMessage(false)}
          style={{ animation: "fade-in-out 3s" }}
        >
          Event created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-event-form">
        <EventInputField
          type="text"
          id="title"
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setValidation({ ...validation, title: false });
          }}
          invalidFeedback="Please enter a title."
          validation={validation.title}
        />

        <EventInputField
          type="textarea"
          id="description"
          label="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setValidation({ ...validation, description: false });
          }}
          invalidFeedback="Please enter a description."
          validation={validation.description}
        />

        <EventInputField
          type="date"
          id="date"
          label="Date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setValidation({ ...validation, date: false });
          }}
          invalidFeedback="Please enter a valid date."
          validation={validation.date}
        />

        <EventInputField
          type="time"
          id="time"
          label="Time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
            setValidation({ ...validation, time: false });
          }}
          invalidFeedback="Please enter a time."
          validation={validation.time}
        />

        <EventInputField
          type="text"
          id="location"
          label="Location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setValidation({ ...validation, location: false });
          }}
          invalidFeedback="Please enter a location."
          validation={validation.location}
        />

        <EventInputField
          type="url"
          id="imageUrl"
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <div className="form-group mt-4 mb-4">
          <input
            type="checkbox"
            id="publicCheckbox"
            checked={isPublic}
            onChange={() => setIsPublic((prevState) => !prevState)}
          />
          <label htmlFor="publicCheckbox" className="ml-2">
            Public
          </label>
        </div>

        {!isPublic && (
          <div className="form-group mt-4 mb-4">
            <label htmlFor="groupSelect">Select Group:</label>
            <select
              className="form-control"
              id="groupSelect"
              value={selectedGroup}
              onChange={(e) => {
                setSelectedGroup(e.target.value);
              }}
            >
              {userGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.title}
                </option>
              ))}
            </select>
          </div>
        )}

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
