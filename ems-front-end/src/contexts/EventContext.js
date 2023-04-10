import { createContext, useState } from "react";
import dummy from "./dummyData";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(dummy);

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
      value={{ events, participateInEvent, cancelParticipation }}
    >
      {children}
    </EventContext.Provider>
  );
};
