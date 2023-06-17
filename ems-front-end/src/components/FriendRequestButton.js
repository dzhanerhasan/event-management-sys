import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const FriendRequestButton = ({ profile, setProfile }) => {
  const currentUser = useSelector((state) => state.user?.user?.username);
  const [requestStatus, setRequestStatus] = useState(null);
  const username = useParams().username;
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const checkRequestStatus = () => {
    if (profile.friends && profile.friends.includes(currentUser)) {
      setRequestStatus("friends");
    } else if (profile.friend_request_status === "Pending") {
      setRequestStatus("pending");
    } else {
      setRequestStatus(null);
    }
  };

  useEffect(() => {
    checkRequestStatus();
  }, [profile]);

  const sendFriendRequest = () => {
    axios
      .post(
        `http://localhost:8000/api/users/send-friend-request/${username}/`,
        {},
        { headers }
      )
      .then((response) => {
        setRequestStatus("pending");
        setProfile(response.data);
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
      .then((response) => {
        setRequestStatus(null);
        setProfile(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  console.log(requestStatus);

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
