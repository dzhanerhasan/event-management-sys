import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";

const Group = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const handleEditModalOpen = () => setIsEditModalOpen(true);
  const handleEditModalClose = () => setIsEditModalOpen(false);

  const currentUser = useSelector((state) => state.user);
  const isGroupCreator = group?.created_by === currentUser.id;

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        // Fetch the group data
        let response = await fetch(
          `http://localhost:8000/api/groups/${groupId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch group data");
        }
        const groupData = await response.json();
        setGroup(groupData);

        response = await fetch("http://localhost:8000/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events data");
        }
        const allEvents = await response.json();
        const groupEvents = allEvents.filter(
          (event) => event.group && event.group.id.toString() === groupId
        );
        console.log(groupEvents);
        setEvents(groupEvents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const handleEditGroup = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/groups/${groupId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editedTitle || group.title,
            description: editedDescription || group.description,
          }),
        }
      );

      if (response.ok) {
        const updatedGroup = await response.json();
        setGroup(updatedGroup);
        handleEditModalClose();
      } else {
        throw new Error("Failed to update group details");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMembersModalClose = () => setShowMembersModal(false);
  const handleMembersModalOpen = () => setShowMembersModal(true);

  if (loading) {
    return <h2>Loading...</h2>;
  }

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
        {isGroupCreator ? (
          <>
            <button
              onClick={handleEditModalOpen}
              className="btn btn-primary mx-2"
            >
              Edit Group
            </button>
            <button className="btn btn-danger mx-2">Delete Group</button>
            <button className="btn btn-warning mx-2">Assign Roles</button>
          </>
        ) : (
          <button className="btn btn-success mx-2">Join Group</button>
        )}
      </div>

      {isEditModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Group</h5>
                <button
                  onClick={handleEditModalClose}
                  type="button"
                  className="close"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="groupTitle">Group Title</label>
                  <input
                    id="groupTitle"
                    type="text"
                    value={editedTitle || group.title}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Group Title"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="groupDescription">Group Description</label>
                  <textarea
                    id="groupDescription"
                    value={editedDescription || group.description}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Group Description"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditGroup}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxHeight: "600px", overflow: "auto" }}>
        {events.map((event) => (
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
                <p key={index}>
                  {member.user} - {member.role}
                </p>
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
