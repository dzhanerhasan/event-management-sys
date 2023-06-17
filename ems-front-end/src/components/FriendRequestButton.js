import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const FriendRequestButton = ({ username }) => {
  const currentUser = useSelector((state) => state.user?.user?.username);

  const [requestStatus, setRequestStatus] = useState(null);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const checkRequestStatus = () => {
    axios
      .get(`http://localhost:8000/api/users/profile/${username}/`, {
        headers,
      })
      .then((response) => {
        if (
          response.data.friends &&
          response.data.friends.includes(currentUser)
        ) {
          setRequestStatus("friends");
        } else if (response.data.friend_request_status === "Pending") {
          setRequestStatus("pending");
        } else {
          setRequestStatus(null);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    checkRequestStatus();
  }, [username]);

  const sendFriendRequest = () => {
    axios
      .post(
        `http://localhost:8000/api/users/send-friend-request/${username}/`,
        {},
        { headers }
      )
      .then(() => {
        checkRequestStatus();
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const cancelFriendRequest = () => {
    axios
      .post(
        `http://localhost:8000/api/users/cancel-friend-request/${username}/`,
        {},
        { headers }
      )
      .then(() => {
        checkRequestStatus();
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <>
      {requestStatus === null && (
        <button className="btn btn-primary" onClick={sendFriendRequest}>
          Send Friend Request
        </button>
      )}
      {requestStatus === "pending" && (
        <button className="btn btn-secondary" onClick={cancelFriendRequest}>
          Remove Friend Request
        </button>
      )}
    </>
  );
};

export default FriendRequestButton;
