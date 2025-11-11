import { useState } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/users/login", form);
      const decoded = jwtDecode(data.token);

      if (decoded.role !== "Admin") {
        alert("Unauthorized — You are not an Admin");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0b1220]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Admin Login
        </h2>

        <input
          type="email"
          required
          className="border p-3 w-full mb-4 rounded-lg text-black placeholder-gray-600 focus:border-blue-500 outline-none"
          placeholder="Admin Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          required
          className="border p-3 w-full mb-4 rounded-lg text-black placeholder-gray-600 focus:border-blue-500 outline-none"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}


