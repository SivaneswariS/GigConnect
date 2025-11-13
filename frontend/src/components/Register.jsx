
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register({ setIsLoggedIn }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Client" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await API.post("/users/register", form);
      localStorage.setItem("token", data.token);
      setIsLoggedIn?.(true);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold text-cyan-300 mb-4 text-center">Create account</h2>
      {error && <p className="text-red-400 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Name" className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" type="email" className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700">
          <option>Client</option>
          <option>Freelancer</option>
        </select>
        <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded">Register</button>
      </form>
    </div>
  );
}
