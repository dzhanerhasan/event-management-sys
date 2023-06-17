import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const UserFriendsCard = ({ friends, username }) => {
  const [currentFriends, setCurrentFriends] = useState([]);

  const currentUser = useSelector((state) => state.user?.user?.username);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    setCurrentFriends(friends);
  }, [friends]);

  const removeFriend = (friend) => {
    axios
      .post(
        `http://localhost:8000/api/users/delete-friend/${friend}/`,
        {},
        { headers }
      )
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div className="col-md-5 m-3 card custom-card rounded">
      <div className="card-body">
        <h5 className="card-title">Friends</h5>
        <ul className="list-group">
          {currentFriends &&
            currentFriends.map((friend) => (
              <li key={friend} className="list-group-item">
                <Link to={`/user-profile/${friend}`}>{friend}</Link>
                {currentUser === username && (
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFriend(friend)}
                  >
                    Remove Friend
                  </button>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserFriendsCard;
