import React, { useState } from "react";
import { Link } from "react-router-dom";

const Groups = () => {
  const [groupView, setGroupView] = useState("myGroups");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groups, setGroups] = useState([
    { title: "Group 1", description: "This is Group 1", participants: 10 },
    { title: "Group 2", description: "This is Group 2", participants: 20 },
    { title: "Group 3", description: "This is Group 3", participants: 30 },
  ]);

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);
  const handleCreateGroup = () => {
    setGroups([
      ...groups,
      { title: groupTitle, description: groupDescription, participants: 0 },
    ]);
    setGroupTitle("");
    setGroupDescription("");
    handleModalClose();
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
      {groups.map((group, index) => (
        <div
          key={index}
          className="d-flex justify-content-between align-items-center bg-light p-3 mb-3 rounded"
        >
          <div>
            <Link to={`/group/${index}`} style={{ textDecoration: "none" }}>
              <h4 className="mb-1">{group.title}</h4>
            </Link>
            <p className="mb-0">{group.description}</p>
          </div>
          <div>
            <span>{group.participants} participants</span>
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
