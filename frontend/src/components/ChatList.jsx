import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./Chat";

function ChatList({ currentUserId }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/users", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Filter out the logged-in user
        setUsers(res.data.filter((u) => u._id !== currentUserId));
      } catch (err) {
        console.error("Error loading users:", err);
      }
    };
    fetchUsers();
  }, [currentUserId]);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", borderRight: "1px solid #ccc" }}>
        <h3>Users</h3>
        {users.map((u) => (
          <div
            key={u._id}
            style={{
              cursor: "pointer",
              background: selectedUser?._id === u._id ? "#ddd" : "transparent",
              padding: "8px",
              borderRadius: "6px",
            }}
            onClick={() => setSelectedUser(u)}
          >
            {u.name}
          </div>
        ))}
      </div>

      {/* Chat window */}
      <div style={{ flex: 1 }}>
        {selectedUser ? (
          <Chat
            currentUserId={currentUserId}
            receiverId={selectedUser._id}
          />
        ) : (
          <p>Select a user to chat with.</p>
        )}
      </div>
    </div>
  );
}

export default ChatList;
