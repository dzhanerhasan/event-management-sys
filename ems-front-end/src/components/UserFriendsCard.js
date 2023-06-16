import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserFriendsCard = () => {
  const friends = useSelector((state) => state.user.friends);

  return (
    <div className="col-md-5 m-3 card custom-card rounded">
      <div className="card-body">
        <h5 className="card-title">Friends</h5>
        <ul className="list-group">
          {friends &&
            friends.map((friend) => (
              <li key={friend} className="list-group-item">
                <Link to={`/user-profile/${friend}`}>{friend}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserFriendsCard;
