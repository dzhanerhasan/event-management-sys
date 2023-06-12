import React, { useState } from "react";
import axios from "axios";

const Comments = ({
  eventId,
  comments,
  setComments,
  currentUser,
  createdBy,
}) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    axios
      .post(`http://localhost:8000/api/events/${eventId}/post_comment/`, {
        text: commentText,
      })
      .then((response) => {
        const newComment = {
          ...response.data,
          username: currentUser.username,
        };
        setComments((prevComments) => [...prevComments, newComment]);
        setCommentText("");
      })
      .catch((error) => {
        console.error("Failed to post comment: ", error);
      });
  };

  return (
    <div className="comments-card card">
      <div className="card-header">
        <strong>{createdBy.username}</strong>
      </div>
      <div className="card-body">
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <strong>{comment.user.username}:</strong> {comment.text}
          </div>
        ))}
      </div>
      <div className="card-footer">
        <div className="comment-form">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Comment..."
          />
          <button
            className="btn btn-primary"
            onClick={handleCommentSubmit}
            disabled={!commentText.trim()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
