// src/components/Chat.jsx
import { useState, useEffect } from "react";
import socket from "../services/socket";
import axios from "axios";

function Chat({ currentUserId, receiverId }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  // ✅ 1️⃣ Join socket room when component mounts
  useEffect(() => {
    if (currentUserId) {
      console.log("Joining room:", currentUserId);
      socket.emit("join", currentUserId);
    }

    // ✅ Listen for real-time messages
    socket.on("receiveMessage", (msg) => {
      console.log("📩 Received message:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    // ✅ Clean up listeners on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUserId]);

  // ✅ 2️⃣ Fetch previous messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/chat/${receiverId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (receiverId) fetchMessages();
  }, [receiverId]);

  // ✅ 3️⃣ Send message (Socket + DB)
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const message = { senderId: currentUserId, receiverId, content };

    // Send through socket for real-time delivery
    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, message]);
    setContent("");

    // Also persist in DB
    try {
      await axios.post(
        "http://localhost:5050/api/chat",
        { receiverId, content },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.error("Error saving message:", err);
    }
  };

  // ✅ 4️⃣ UI
  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", width: "400px" }}>
      <h3>💬 Chat with {receiverId}</h3>

      <div
        style={{
          border: "1px solid #ddd",
          height: "250px",
          overflowY: "auto",
          marginBottom: "1rem",
          padding: "0.5rem",
          background: "#fafafa",
        }}
      >
        {messages.map((msg, idx) => {
          const sender =
            msg.sender?._id || msg.senderId || msg.sender; // handle both DB and live message formats
          return (
            <div
              key={idx}
              style={{
                textAlign: sender === currentUserId ? "right" : "left",
              }}
            >
              <p
                style={{
                  background: sender === currentUserId ? "#007bff" : "#eee",
                  color: sender === currentUserId ? "#fff" : "#000",
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "15px",
                  margin: "4px 0",
                }}
              >
                {msg.content}
              </p>
            </div>
          );
        })}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "75%", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
