import "../styles/AllEvents.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

import NavigationButton from "../components/NavigationButton";
import EventCard from "../components/EventCard";
import useAnimation from "../hooks/useAnimation";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios.get("http://localhost:8000/api/events/").then((response) => {
      setEvents(response.data);
    });
  }, []);

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < Math.ceil(events.length / itemsPerPage)
        ? prevPage + 1
        : prevPage
    );
  };

  const rowRef = useAnimation(
    currentPage % 2 === 0 ? "slideInFromRight" : "slideInFromLeft",
    currentPage
  );

  return (
    <div className="container-md my-5 all-event-container">
      <div>
        <h2 className="text-center mb-4">All Events</h2>
        <div className="events-wrapper">
          <div className={`row slide-${currentPage}`} ref={rowRef}>
            {currentEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                delay={(indexOfFirstEvent + index) * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center ">
        <NavigationButton
          direction="prev"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        />
        <NavigationButton
          direction="next"
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(events.length / itemsPerPage) ||
            events.length < 7
          }
        />
      </div>
    </div>
  );
};

export default AllEvents;
