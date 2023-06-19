import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import "../styles/Chat.css";
import axios from "axios";

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
  const [recentChats, setRecentChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  let allMessages = [];

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("0641b0bc3301d10c2a9e", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("ems-chat");

    channel.bind("message", (data) => {
      allMessages.push(data);
      setMessages(allMessages);
    });
  }, []);

  const handleChatSelect = (friend) => {
    setSelectedChat(friend);
    setRecentChats((prevChats) => [friend, ...prevChats]);
  };

  const submit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8000/api/chat/messages", {
      username,
      message,
    });

    setMessage("");
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
              {messages?.map((msg, i) => (
                <li key={i}>
                  {msg.username}: {msg.message}
                </li>
              ))}
              <p>Chat with {selectedChat}</p>
              <form onSubmit={submit}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit">Send</button>
              </form>
            </div>
          ) : (
            <div className="chat-list">
              {(newChat ? friends : recentChats).map((friend) => (
                <p key={friend} onClick={() => handleChatSelect(friend)}>
                  {friend}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chat;
