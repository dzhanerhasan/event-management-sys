import { createContext, useState, useEffect } from "react";
import dummy from "./dummyData";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(dummy);

  const addEvent = (eventData) => {
    const newId = Math.max(...events.map((event) => event.id)) + 1;
    const newEvent = { ...eventData, id: newId, attendees: [] };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const participateInEvent = (eventId, userName) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, attendees: [...event.attendees, userName] }
          : event
      )
    );
  };

  const cancelParticipation = (eventId, userName) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              attendees: event.attendees.filter(
                (attendee) => attendee !== userName
              ),
            }
          : event
      )
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        participateInEvent,
        cancelParticipation,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
