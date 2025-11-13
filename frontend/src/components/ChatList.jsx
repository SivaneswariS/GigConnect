
import { useEffect, useState } from "react";
import API from "../services/api";
import Chat from "./Chat";

export default function ChatList({ currentUserId }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await API.get("/users");
        setUsers(data.filter(u => u._id !== currentUserId));
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [currentUserId]);

  return (
    <div className="flex gap-6">
      <aside className="w-64 bg-gray-900 p-4 rounded border border-gray-800">
        <h4 className="text-cyan-300 font-bold mb-3">Users</h4>
        <div className="space-y-2">
          {users.map(u => (
            <button key={u._id} onClick={() => setSelectedUser(u)} className={`w-full text-left p-2 rounded ${selectedUser?._id === u._id ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              {u.name}
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1">
        {selectedUser ? <Chat currentUserId={currentUserId} receiverId={selectedUser._id} /> : <p>Select a user</p>}
      </div>
    </div>
  );
}

