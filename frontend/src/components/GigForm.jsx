// components/GigForm.jsx
import { useState } from "react";
import API from "../services/api";

export default function GigForm() {
  const [form, setForm] = useState({ title: "", description: "", budget: "", location: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/gigs", form);
      alert("Gig posted!");
      setForm({ title: "", description: "", budget: "", location: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error creating gig");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-xl text-cyan-300 font-bold mb-4">Create a Gig</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
        <input type="number" placeholder="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
        <button className="w-full bg-emerald-500 py-2 rounded">Post Gig</button>
      </form>
    </div>
  );
}

