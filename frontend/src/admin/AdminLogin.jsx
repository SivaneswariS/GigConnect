import { useState } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/users/login", form);

      const decoded = jwtDecode(data.token);

      if (decoded.role !== "Admin") {
        return alert("Access denied — You are not an Admin!");
      }

      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-blue-600 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
