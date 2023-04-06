import React, { useContext } from "react";
import EventCard from "../components/EventCard";
import { EventContext } from "../contexts/EventContext";
import "../styles/AllEvents.css";

const AllEvents = () => {
  const { events } = useContext(EventContext);

  return (
    <div className="container-md my-5">
      <h1 className="text-center mb-4">All Events</h1>
      <div className="row">
        {events.map((event, index) => (
          <EventCard key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
