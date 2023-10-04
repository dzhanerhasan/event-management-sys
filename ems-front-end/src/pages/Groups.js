import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Groups = () => {
  const [groupView, setGroupView] = useState("myGroups");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groups, setGroups] = useState([]);

  const currentUser = useSelector((state) => state.user.user.username);
  console.log(currentUser);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/groups/");
        setGroups(response.data);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const displayedGroups =
    groupView === "myGroups"
      ? groups.filter((group) => group.members.includes(currentUser))
      : groups.filter((group) => !group.members.includes(currentUser));

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  const handleCreateGroup = async () => {
    try {
      const newGroup = {
        title: groupTitle,
        description: groupDescription,
        participants: 0,
      };
      const response = await axios.post(
        "http://localhost:8000/api/groups/",
        newGroup
      );
      setGroups([...groups, response.data]);
      setGroupTitle("");
      setGroupDescription("");
      handleModalClose();
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Groups</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleModalOpen}>
          Create Group
        </button>
      </div>
      <div className="d-flex align-items-center mb-3">
        <div className="btn-group me-3" role="group" aria-label="Group views">
          <button
            type="button"
            className={`btn ${
              groupView === "myGroups"
                ? "btn-secondary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setGroupView("myGroups")}
          >
            My Groups
          </button>
          <button
            type="button"
            className={`btn ${
              groupView === "findGroup"
                ? "btn-secondary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setGroupView("findGroup")}
          >
            Find a Group
          </button>
        </div>
        <input
          type="text"
          className="form-control"
          style={{ width: "300px" }}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {groups
        .filter((group) => {
          if (groupView === "myGroups") {
            return group.members.some((member) => member.user === currentUser);
          } else if (groupView === "findGroup") {
            return !group.members.some((member) => member.user === currentUser);
          }
          return true;
        })
        .map((group) => (
          <div
            key={group.id}
            className="d-flex justify-content-between align-items-center bg-light p-3 mb-3 rounded"
          >
            <div>
              <Link
                to={`/group/${group.id}`}
                style={{ textDecoration: "none" }}
              >
                <h4 className="mb-1">{group.title}</h4>
              </Link>
              <p className="mb-0">{group.description}</p>
            </div>
            <div>
              <span>{group.members.length || 0} members</span>
            </div>
          </div>
        ))}

      <div className={`modal ${showModal ? "d-block" : ""}`}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Group</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleModalClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="groupTitle">Group Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="groupTitle"
                    value={groupTitle}
                    onChange={(e) => setGroupTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="groupDescription">Group Description</label>
                  <textarea
                    className="form-control"
                    id="groupDescription"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreateGroup}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal ? <div className="modal-backdrop fade show"></div> : null}
    </div>
  );
};

export default Groups;
