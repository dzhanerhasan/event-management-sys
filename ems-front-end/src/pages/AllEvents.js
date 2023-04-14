import "../styles/AllEvents.css";

import React, { useContext, useState } from "react";
import { EventContext } from "../contexts/EventContext";
import moment from "moment";

import NavigationButton from "../components/NavigationButton";
import EventCard from "../components/EventCard";
import useAnimation from "../hooks/useAnimation";

const AllEvents = () => {
  const { events } = useContext(EventContext);

  const sortedEvents = events
    .filter((event) => moment(event.date + " " + event.time).isSameOrAfter())
    .sort((a, b) =>
      moment(a.date + " " + a.time).isBefore(b.date + " " + b.time) ? 1 : -1
    );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < Math.ceil(sortedEvents.length / itemsPerPage)
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
        <div className={`row slide-${currentPage}`} ref={rowRef}>
          {currentEvents.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              index={index}
              delay={(indexOfFirstEvent + index) * 0.1}
            />
          ))}
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
            currentPage === Math.ceil(sortedEvents.length / itemsPerPage)
          }
        />
      </div>
    </div>
  );
};

export default AllEvents;
