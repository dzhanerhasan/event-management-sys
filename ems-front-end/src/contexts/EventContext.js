import { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([
    {
      title: "Art Exhibition",
      date: "2023-05-12",
      location: "Art Gallery, New York",
      description:
        "Join us for an exclusive art exhibition featuring contemporary artists from around the world.",
    },
    {
      title: "Charity Marathon",
      date: "2023-06-20",
      location: "Central Park, New York",
      description:
        "Participate in our annual charity marathon and help raise funds for local nonprofits.",
    },
    {
      title: "Food Festival",
      date: "2023-07-15",
      location: "Waterfront Park, San Francisco",
      description:
        "Taste a variety of delicious dishes from local vendors at our annual food festival.",
    },
    {
      title: "Startup Conference",
      date: "2023-08-23",
      location: "Tech Center, San Francisco",
      description:
        "Join entrepreneurs, investors, and startups at our annual conference to discuss the latest trends and opportunities in the tech industry.",
    },
    {
      title: "Jazz Concert",
      date: "2023-09-12",
      location: "Concert Hall, Chicago",
      description:
        "Don't miss an unforgettable evening of jazz music performed by world-class musicians.",
    },
    {
      title: "Literary Festival",
      date: "2023-10-05",
      location: "City Library, Chicago",
      description:
        "Celebrate literature and engage in thought-provoking discussions with renowned authors at our annual literary festival.",
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
