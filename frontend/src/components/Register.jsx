import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Client" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/users/register", form);
      localStorage.setItem("token", data.token);
      alert("Registered successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option>Client</option>
        <option>Freelancer</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
