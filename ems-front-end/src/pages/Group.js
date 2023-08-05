import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

const Group = () => {
  const grpId = useParams();
  console.log(grpId);
  const dummyGroups = [
    {
      id: "1",
      title: "Group 1",
      description: "This is Group 1",
      members: ["User1", "User2"],
      events: [
        {
          id: "e1",
          title: "Event 1",
          description: "This is Event 1",
          date: "2023-06-25",
          time: "10:00 AM",
          location: "Location 1",
          attendees: ["User1", "User2"],
        },
        {
          id: "e2",
          title: "Event 2",
          description: "This is Event 2",
          date: "2023-06-26",
          time: "11:00 AM",
          location: "Location 2",
          attendees: ["User3", "User4"],
        },
        {
          id: "e2",
          title: "Event 2",
          description: "This is Event 2",
          date: "2023-06-26",
          time: "11:00 AM",
          location: "Location 2",
          attendees: ["User3", "User4"],
        },
      ],
    },
    {
      id: "2",
      title: "Group 2",
      description: "This is Group 2",
      members: ["User3", "User4"],
      events: [],
    },
  ];

  const group = dummyGroups.find((getGrp) => getGrp.id === grpId.groupId);
  console.log(group);
  const [showMembersModal, setShowMembersModal] = useState(false);

  const handleMembersModalClose = () => setShowMembersModal(false);
  const handleMembersModalOpen = () => setShowMembersModal(true);

  if (!group) {
    return <h2>Group not found</h2>;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4 d-flex align-items-center justify-content-center">
        {group.title}
        <FaUsers
          className="ml-2"
          size={20}
          onClick={handleMembersModalOpen}
          style={{ cursor: "pointer" }}
        />
      </h1>
      <p className="text-center">{group.description}</p>
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-primary mx-2">Edit Group</button>
        <button className="btn btn-danger mx-2">Delete Group</button>
        <button className="btn btn-warning mx-2">Assign Roles</button>
      </div>
      <div style={{ maxHeight: "600px", overflow: "auto" }}>
        {group.events.map((event, index) => (
          <Link
            to={`/event/${event.id}`}
            className="event-card-link"
            style={{ textDecoration: "none" }}
          >
            <div
              className="card h-100 event-card row g-0"
              style={{ maxHeight: "300px", borderRadius: "15px" }}
            >
              <div className="col-md-4">
                <img
                  className="img-fluid h-100"
                  src="https://images.squarespace-cdn.com/content/v1/56d082a760b5e95c074d11a0/8ce30633-23f2-4dc9-b301-c251cbf26d02/Mercedes+Benz+Oscar+Party?format=1000w"
                  alt="Event"
                  style={{ borderRadius: "15px 0 0 15px" }}
                />
              </div>
              <div className="card-body col-md-8">
                <h4 className="card-title">{event.title}</h4>
                <p className="card-text">{event.description}</p>
                <p className="card-text">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="card-text">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="card-text">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="card-text">
                  <strong>Participants:</strong> {event.attendees?.length || 0}{" "}
                  <FaUsers />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={`modal ${showMembersModal ? "d-block" : ""}`}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Members - {group.members.length}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleMembersModalClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {group.members.map((member, index) => (
                <p key={index}>{member}</p>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleMembersModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
