import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/pending-friend-requests/", {
        headers,
      })
      .then((res) => setFriendRequests(res.data))
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  const toggleShowRequests = () => {
    setShowRequests(!showRequests);
  };

  const handleResponse = (requestId, action) => {
    axios
      .post(
        `http://localhost:8000/api/users/respond-friend-request/${requestId}/${action}/`,
        {},
        { headers }
      )
      .then((res) => {
        setFriendRequests(
          friendRequests.filter((request) => request.id !== requestId)
        );
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div className="position-relative">
      <span
        onClick={toggleShowRequests}
        style={{ cursor: "pointer", marginRight: "20px" }}
      >
        <FontAwesomeIcon icon={faBell} color="white" size="2x" />
        {friendRequests.length > 0 && (
          <span className="badge bg-danger">{friendRequests.length}</span>
        )}
      </span>
      {showRequests && (
        <div
          className="dropdown-menu show position-absolute"
          style={{ top: "100%", left: "auto", right: "0", width: "350px" }}
        >
          {friendRequests.length === 0 ? (
            <span className="dropdown-item">No new friend requests</span>
          ) : (
            friendRequests.map((request) => (
              <div key={request.id} className="dropdown-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Link
                      to={`/user-profile/${request.sender_username}`}
                      style={{ textDecoration: "none" }}
                    >
                      <span>{request.sender_username}</span>
                    </Link>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleResponse(request.id, "accept")}
                      style={{ marginRight: "20px" }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleResponse(request.id, "reject")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
