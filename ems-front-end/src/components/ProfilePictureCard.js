import React from "react";

const ProfilePictureCard = ({ profile }) => {
  return (
    <div className="col-md-5 m-3 card custom-card rounded">
      <img
        src={profile.picture}
        alt="User"
        className="card-img-top fit-image"
      />
    </div>
  );
};

export default ProfilePictureCard;
