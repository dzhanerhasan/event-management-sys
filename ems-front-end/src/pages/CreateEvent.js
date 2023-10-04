import "../styles/CreateEventPage.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import CreateEventForm from "../components/CreateEventForm";

const CreateEvent = () => {
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const fetchUserAdminGroups = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/groups/user-admin-groups"
        );
        if (response.status === 200) {
          setUserGroups(response.data);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching the user's admin groups:",
          error
        );
      }
    };

    fetchUserAdminGroups();
  }, []);

  const handleSubmit = async (eventData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/events/",
        eventData
      );

      if (response.status === 200) {
        console.log("Event created successfully");
      } else {
        console.error("An error occurred while creating the event.");
      }
    } catch (error) {
      console.error("An error occurred while creating the event:", error);
    }
  };

  return (
    <div className="container-md my-5">
      <h1 className="text-center create-event-title">Create a New Event</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <CreateEventForm onSubmit={handleSubmit} userGroups={userGroups} />
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
