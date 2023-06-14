import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserInfoCard = ({ profile }) => {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(profile.user.first_name);
  const [lastName, setLastName] = useState(profile.user.last_name);
  const [email, setEmail] = useState(profile.user.email);
  const { username } = useParams();
  const currentUser = useSelector((state) => state.user.user.username);

  const sendFriendRequest = (username) => {
    axios
      .post(`http://localhost:8000/api/users/send-friend-request/${username}`)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8000/api/users/profile/${username}`, {
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
    <div className="col-md-5 m-3 card custom-card rounded">
      <div className="card-body">
        <h5 className="card-title">{profile.user.username}</h5>
        {editMode ? (
          <div className="edit-info">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <div className="user-buttons float-right">
              {username === currentUser && (
                <button className="btn btn-primary mr-2" onClick={handleEdit}>
                  Edit
                </button>
              )}
              {username === currentUser ? (
                <button className="btn btn-secondary">Settings</button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => sendFriendRequest(profile.user.username)}
                >
                  Send Friend Request
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
