// src/App.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import socket from "./services/socket";

// User Components
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import GigForm from "./components/GigForm";
import GigFeed from "./components/GigFeed";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";
import PaymentPage from "./components/PaymentPage";

// Admin Components
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminGigs from "./admin/AdminGigs";
import AdminProtected from "./admin/AdminProtected";

// ✅ Protected Route for normal users
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;
  return children;
}

// ✅ Normal Navbar (hidden on admin pages)
function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const isAdminPage = window.location.pathname.startsWith("/admin");

  // ✅ Hide navbar entirely for admin
  if (isAdminPage) return null;

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
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const token = localStorage.getItem("token");
  const currentUserId = token ? jwtDecode(token).id : null;

  // ✅ Socket Connection Logs
  useEffect(() => {
    console.log("Attempting socket connection...");

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("🚨 Socket Error:", err.message);
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
        {/* ✅ Public Routes */}
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* ✅ User Routes */}
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

        {/* ✅ Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ✅ Admin Layout Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminLayout />
            </AdminProtected>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="gigs" element={<AdminGigs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


