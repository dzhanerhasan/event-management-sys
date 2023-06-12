import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserProfile.css";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const [view, setView] = useState("created");
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const url =
      view === "created"
        ? `http://localhost:8000/api/events/my_events/${username}`
        : `http://localhost:8000/api/events/participating/${username}`;

    axios.get(url).then((res) => {
      setEvents(res.data);
    });

    axios
      .get(`http://localhost:8000/api/users/${username}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [view, username]);

  if (!user) {
    return null;
  }

  console.log(user);

  return (
    <div className="container my-5">
      <h1 className="text-center">User Profile</h1>

      <div className="row justify-content-center">
        <div className="col-md-5 m-3 card custom-card rounded">
          <img src={user.photoUrl} alt="User" className="card-img-top" />
        </div>

        <div className="col-md-5 m-3 card custom-card rounded">
          <div className="card-body">
            <h5 className="card-title">{user.username}</h5>
            <p className="card-text">First Name: {user.firstName}</p>
            <p className="card-text">Last Name: {user.lastName}</p>
            <p className="card-text">Age: {user.age}</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-5 m-3 card custom-card rounded">
          <div className="card-body">
            <h5 className="card-title">My Events</h5>
            <div className="btn-group custom-btn-group">
              <button
                className={`btn custom-btn ${
                  view === "created" ? "active" : ""
                }`}
                onClick={() => setView("created")}
              >
                Created Events
              </button>
              <button
                className={`btn custom-btn ${
                  view === "participating" ? "active" : ""
                }`}
                onClick={() => setView("participating")}
              >
                Participating Events
              </button>
            </div>

            <div className="events-card mx-auto">
              {events.map((event) => (
                <div
                  className="card custom-card event-card mb-3"
                  key={event.id}
                >
                  <div
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="text-decoration-none"
                  >
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text">{event.description}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {event.date} {event.time}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Location: {event.location}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-5 m-3 card custom-card rounded">
          <div className="card-body">
            <h5 className="card-title">Friends</h5>
            <p className="card-text">This feature will be implemented soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
