import { useState } from "react";
import API from "../services/api";

export default function GigForm() {
  const [form, setForm] = useState({ title: "", description: "", budget: "", location: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/gigs", form);
      alert("Gig posted!");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating gig");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Create a Gig</h2>

        <input
          placeholder="Title"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="number"
          placeholder="Budget"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
        />

        <input
          placeholder="Location"
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Post Gig
        </button>
      </form>
    </div>
  );
}
