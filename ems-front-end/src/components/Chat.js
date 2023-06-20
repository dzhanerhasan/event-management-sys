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

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("0641b0bc3301d10c2a9e", {
      cluster: "eu",
    });

    if (selectedChat) {
      const chatID = [username, selectedChat].sort().join("-");
      const channel = pusher.subscribe(chatID);

      channel.bind("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        pusher.unsubscribe(chatID);
      };
    }
  }, [selectedChat, username]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/chat/recent", {
        params: {
          username: username,
        },
      })
      .then((response) => {
        setRecentChats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const chatID = [username, selectedChat].sort().join("-");
          const response = await axios.get(
            `http://localhost:8000/api/chat/messages?chatId=${chatID}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      };

      console.log(messages);
      fetchMessages();
    }
  }, [selectedChat, username]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };
  const submit = async (e) => {
    e.preventDefault();

    const chatID = [username, selectedChat].sort().join("-");

    await axios.post("http://localhost:8000/api/chat/messages", {
      username,
      recipient: selectedChat,
      message,
      chatID,
    });

    setRecentChats((prevChats) => {
      const newChat = { username: selectedChat, updated_at: new Date() };
      return [
        newChat,
        ...prevChats.filter((chat) => chat.username !== selectedChat),
      ];
    });

    setMessages([...messages, { sender: username, message }]);
    setMessage("");
  };

  return (
    <>
      {!open && <ChatIcon onClick={() => setOpen(true)} />}
      {open && (
        <div className={`chat-container`}>
          <div className="chat-header">
            {selectedChat ? (
              <>
                <BackIcon onClick={() => setSelectedChat(null)} />
                <CloseIcon onClick={() => setOpen(false)} />
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
                <CloseIcon onClick={() => setOpen(false)} />
              </>
            )}
          </div>
          {selectedChat ? (
            <div className="chat-window">
              {messages?.map((msg, i) => (
                <span key={i}>
                  <strong>{msg.sender}</strong>: {msg.message}
                  <br></br>
                </span>
              ))}
              {!messages.length && <p>Start chatting with {selectedChat}</p>}
              <form onSubmit={submit}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="form-control"
                />
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </div>
          ) : (
            <div className="chat-list">
              {(newChat ? friends : recentChats)?.map((chat, index) => (
                <p
                  key={index}
                  onClick={() =>
                    handleChatSelect(newChat ? chat : chat.username)
                  }
                >
                  {newChat ? chat : chat.username}
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
