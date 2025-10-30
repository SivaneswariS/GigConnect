import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register({ setIsLoggedIn }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Client",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/users/register", form);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        alert("✅ Registered successfully!");
        navigate("/profile"); // redirect immediately
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "3rem auto" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "8px" }}
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "8px" }}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={{ width: "100%", marginBottom: "1rem", padding: "8px" }}
        >
          <option value="Client">Client</option>
          <option value="Freelancer">Freelancer</option>
        </select>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
            width: "100%",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
