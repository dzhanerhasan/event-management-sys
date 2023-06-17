import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserProfile.css";
import { useParams } from "react-router-dom";
import ProfilePictureCard from "../components/ProfilePictureCard";
import UserInfoCard from "../components/UserInfoCard";
import UserEventsCard from "../components/UserEventsCard";
import UserFriendsCard from "../components/UserFriendsCard";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/profile/${username}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
  }, [username]);

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
        <UserEventsCard username={username} />
        <UserFriendsCard profile={profile} />
      </div>
    </div>
  );
};

export default UserProfile;
