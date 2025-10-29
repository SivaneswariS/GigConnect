import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import socket from "./services/socket"; // ✅ Import Socket.IO connection

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import GigForm from "./components/GigForm";
import GigFeed from "./components/GigFeed"; // ✅ Browse Gigs

function App() {
  // ✅ Socket.IO connection test
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to Socket.IO:", socket.id);
    });

    // optional: handle disconnect
    socket.on("disconnect", () => {
      console.log("❌ Disconnected from Socket.IO");
    });

    // cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <nav style={{ padding: "1rem", background: "#007bff" }}>
        <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>Login</Link>
        <Link to="/register" style={{ color: "#fff", marginRight: "15px" }}>Register</Link>
        <Link to="/profile" style={{ color: "#fff", marginRight: "15px" }}>Profile</Link>
        <Link to="/post-gig" style={{ color: "#fff", marginRight: "15px" }}>Post Gig</Link>
        <Link to="/gigs" style={{ color: "#fff" }}>Browse Gigs</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post-gig" element={<GigForm />} />
        <Route path="/gigs" element={<GigFeed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


