import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserProfile.css";
import { useParams } from "react-router-dom";
import ProfilePictureCard from "../components/ProfilePictureCard";
import UserInfoCard from "../components/UserInfoCard";
import UserEventsCard from "../components/UserEventsCard";
import UserFriendsCard from "../components/UserFriendsCard";

const UserProfile = () => {
  const [view, setView] = useState("created");
  const [events, setEvents] = useState([]);
  const [profile, setProfile] = useState(null);
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
      .get(`http://localhost:8000/api/users/profile/${username}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
  }, [view, username]);

  if (!profile) {
    return null;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center">User Profile</h1>

      <div className="row justify-content-center">
        <ProfilePictureCard profile={profile} />
        <UserInfoCard profile={profile} />
      </div>

      <div className="row justify-content-center">
        <UserEventsCard events={events} view={view} setView={setView} />
        <UserFriendsCard friends={profile.friends} />
      </div>
    </div>
  );
};

export default UserProfile;
