import { useState } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await API.post("/users/login", form);
    const decoded = jwtDecode(data.token);

    if (decoded.role !== "Admin") {
      return alert("Unauthorized — Not an Admin");
    }

    localStorage.setItem("token", data.token);
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Admin Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-blue-600 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

