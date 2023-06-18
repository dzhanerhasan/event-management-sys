import React, { useState } from "react";
import "../styles/Chat.css";

const ChatIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    className="chat-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 22.07V4a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H7l-4 4z"></path>
    <path d="M16 6h-8m8 4h-8m4 4H7"></path>
  </svg>
);

const CloseIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="close-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    onClick={onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const BackIcon = ({ onClick }) => (
  <svg onClick={onClick} className="back-icon" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M20 12H4M10 18l-6-6 6-6" />
  </svg>
);

const Chat = ({ username, friends }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newChat, setNewChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = ["Friend1", "Friend2", "Friend3"];

  const handleClickFriend = (friend) => {
    setSelectedChat(friend);
  };

  const renderChats = () => {
    const list = newChat ? friends : chats;
    return list
      .filter((chat) => chat.includes(searchTerm))
      .map((chat) => (
        <div key={chat} onClick={() => handleClickFriend(chat)}>
          {chat}
        </div>
      ));
  };

  return (
    <>
      {!open && <ChatIcon onClick={() => setOpen(!open)} />}
      {open && (
        <div className={`chat-container`}>
          <div className="chat-header">
            {selectedChat ? (
              <>
                <BackIcon onClick={() => setSelectedChat(null)} />
                <CloseIcon onClick={() => setOpen(!open)} />
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                />
                <button onClick={() => setNewChat(!newChat)}>
                  {newChat ? "View Chats" : "New Chat"}
                </button>
                <CloseIcon onClick={() => setOpen(!open)} />
              </>
            )}
          </div>
          {selectedChat ? (
            <div className="chat-window">
              <p>Chat with {selectedChat}</p>
            </div>
          ) : (
            <div className="chat-list">{renderChats()}</div>
          )}
        </div>
      )}
    </>
  );
};

export default Chat;
