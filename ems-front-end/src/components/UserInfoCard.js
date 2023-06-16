import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FriendRequestButton from "./FriendRequestButton";
import "../styles/UserInfoCard.css";

const UserInfoCard = ({ profile }) => {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(profile.user.first_name);
  const [lastName, setLastName] = useState(profile.user.last_name);
  const [email, setEmail] = useState(profile.user.email);
  const { username } = useParams();
  const currentUser = useSelector((state) => state.user.user.username);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8000/api/users/profile/${username}/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      })
      .then((res) => {
        setEditMode(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className="col-md-5 m-3 card custom-card rounded position-relative">
      <div className="card-body">
        <h5 className="card-title">{profile.user.username}</h5>
        {editMode ? (
          <div className="edit-info">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mb-2"
            />
            <div className="edit-buttons float-right">
              <button className="btn btn-primary mr-2" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="card-text">First Name: {firstName}</p>
            <p className="card-text">Last Name: {lastName}</p>
            <p className="card-text">Email: {email}</p>
          </>
        )}
      </div>
      {!editMode && (
        <div className="user-buttons position-absolute bottom-0 end-0 p-3">
          {username === currentUser && (
            <>
              <button className="btn btn-primary mr-2" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn btn-secondary">Settings</button>
            </>
          )}
          {username !== currentUser && (
            <FriendRequestButton username={profile.user.username} />
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfoCard;
