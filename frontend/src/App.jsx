// src/App.jsx
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import
import socket from "./services/socket";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import GigForm from "./components/GigForm";
import GigFeed from "./components/GigFeed";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";
import PaymentPage from "./components/PaymentPage";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProtected from "./admin/AdminProtected";


// ✅ ProtectedRoute (redirects to login if no token)
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in first!");
    return <Navigate to="/" replace />;
  }
  return children;
}

// ✅ Navbar with dynamic links + logout
function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#007bff",
        display: "flex",
        gap: "15px",
        alignItems: "center",
      }}
    >
      {!isLoggedIn ? (
        <>
          <Link to="/" style={{ color: "#fff" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "#fff" }}>
            Register
          </Link>
        </>
      ) : (
        <>
          <Link to="/profile" style={{ color: "#fff" }}>
            Profile
          </Link>
          <Link to="/post-gig" style={{ color: "#fff" }}>
            Post Gig
          </Link>
          <Link to="/gigs" style={{ color: "#fff" }}>
            Browse Gigs
          </Link>
          <Link to="/chats" style={{ color: "#fff" }}>
            💬 Chats
          </Link>

          <button
            onClick={handleLogout}
            style={{
              marginLeft: "auto",
              background: "red",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const token = localStorage.getItem("token");
  const currentUserId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    console.log("Attempting socket connection...");

    socket.on("connect", () => {
      console.log("✅ Connected to Socket.IO server!");
      console.log("Socket ID:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected from Socket.IO:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("🚨 Connection error:", err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />


        {/* ✅ Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-gig"
          element={
            <ProtectedRoute>
              <GigForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gigs"
          element={
            <ProtectedRoute>
              <GigFeed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <ChatList currentUserId={currentUserId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:receiverId"
          element={
            <ProtectedRoute>
              <Chat currentUserId={currentUserId} />
            </ProtectedRoute>
          }
        />
        <Route path="/pay/:gigId" element={<PaymentPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />

<Route
  path="/admin/dashboard"
  element={
    <AdminProtected>
      <AdminDashboard />
    </AdminProtected>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;



