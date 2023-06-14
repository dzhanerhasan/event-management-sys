import React from "react";
import { Link } from "react-router-dom";

const UserFriendsCard = ({ friends }) => {
  return (
    <div className="col-md-5 m-3 card custom-card rounded">
      <div className="card-body">
        <h5 className="card-title">Friends</h5>
        <ul className="list-group">
          {friends.map((friend) => (
            <li key={friend} className="list-group-item">
              <Link to={`/user/${friend}`}>{friend}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserFriendsCard;
