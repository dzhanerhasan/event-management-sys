import { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Birthday Party",
      location: "New York City",
      date: "2023-04-20",
      time: "18:00",
      description: "Join us for a fantastic birthday celebration!",
      attendees: ["John", "Jane", "Michael", "Olivia"],
    },
    {
      id: 2,
      title: "Conference",
      location: "Los Angeles",
      date: "2023-04-25",
      time: "09:00",
      description: "An annual conference on the latest trends in technology.",
      attendees: ["Steve", "Sophia", "Jack", "Emma"],
    },
    {
      id: 3,
      title: "Art Exhibition",
      location: "San Francisco",
      date: "2023-05-01",
      time: "14:00",
      description: "An exhibition showcasing the most talented local artists.",
      attendees: ["Emily", "David", "Lucy", "Liam"],
    },
    {
      id: 4,
      title: "Networking Event",
      location: "Chicago",
      date: "2023-05-10",
      time: "19:00",
      description:
        "A great opportunity to meet new people and expand your network.",
      attendees: ["Ava", "James", "Isabella", "Benjamin"],
    },
    {
      id: 5,
      title: "Live Concert",
      location: "Miami",
      date: "2023-05-15",
      time: "20:00",
      description:
        "A live concert featuring some of the biggest names in music.",
      attendees: ["Mia", "Alexander", "Ella", "Sebastian"],
    },
    {
      id: 6,
      title: "Workshop",
      location: "Boston",
      date: "2023-05-20",
      time: "10:00",
      description:
        "A hands-on workshop to learn new skills and improve your career.",
      attendees: ["Zoe", "Daniel", "Leah", "Matthew"],
    },

    {
      id: 7,
      title: "Workshop",
      location: "Boston",
      date: "2023-05-20",
      time: "10:00",
      description:
        "A hands-on workshop to learn new skills and improve your career.",
      attendees: ["Zoe", "Daniel", "Leah", "Matthew"],
    },

    {
      id: 8,
      title: "Workshop",
      location: "Boston",
      date: "2023-05-20",
      time: "10:00",
      description:
        "A hands-on workshop to learn new skills and improve your career.",
      attendees: ["Zoe", "Daniel", "Leah", "Matthew"],
    },
  ]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
