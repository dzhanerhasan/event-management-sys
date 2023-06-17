import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

const UserFriendsCard = ({ profile }) => {
  const currentUser = useSelector((state) => state.user?.user?.username);
  const [currentProfile, setCurrentProfile] = useState(profile);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    setCurrentProfile(profile);
  }, [profile]);

  const removeFriendAndUpdateProfile = (friend) => {
    axios
      .post(
        `http://localhost:8000/api/users/delete-friend/${friend}/`,
        {},
        { headers }
      )
      .then(() => {
        setCurrentProfile((prevProfile) => ({
          ...prevProfile,
          friends: prevProfile.friends.filter((f) => f !== friend),
        }));
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div className="col-md-5 m-3 card custom-card rounded">
      <div className="card-body">
        <h5 className="card-title">Friends</h5>
        <ul className="list-group">
          {currentProfile.friends &&
            currentProfile.friends.map((friend) => (
              <li key={friend} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/user-profile/${friend}`}>{friend}</Link>
                  {currentUser === currentProfile.user.username && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFriendAndUpdateProfile(friend)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserFriendsCard;
