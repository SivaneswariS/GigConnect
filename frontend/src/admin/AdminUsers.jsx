import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const { data } = await API.get("/admin/users");
    setUsers(data);
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    await API.delete(`/admin/delete-user/${id}`);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="text-black">
      <h2 className="text-xl font-bold mb-4">👥 Users</h2>

      <table className="w-full bg-white shadow rounded border">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b text-black">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">
                <button
                  className="text-red-500 font-semibold"
                  onClick={() => deleteUser(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

