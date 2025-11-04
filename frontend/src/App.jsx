// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "./services/socket";
import { getUserFromToken } from "./utils/token";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import GigForm from "./components/GigForm";
import GigFeed from "./components/GigFeed";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";
import PaymentPage from "./components/PaymentPage";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminGigs from "./admin/AdminGigs";
import AdminProtected from "./admin/AdminProtected";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket connected", socket.id);
    });
    socket.on("disconnect", (r) => console.log("❌ Socket disconnected", r));
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const token = localStorage.getItem("token");
  const userObj = getUserFromToken(token);
  const currentUserId = userObj?.id || null;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar setIsLoggedIn={setIsLoggedIn} />
        <main className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />

            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/post-gig" element={<ProtectedRoute><GigForm /></ProtectedRoute>} />
            <Route path="/gigs" element={<ProtectedRoute><GigFeed /></ProtectedRoute>} />
            <Route path="/chats" element={<ProtectedRoute><ChatList currentUserId={currentUserId} /></ProtectedRoute>} />
            <Route path="/chat/:receiverId" element={<ProtectedRoute><Chat currentUserId={currentUserId} /></ProtectedRoute>} />
            <Route path="/pay/:gigId" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminProtected><AdminLayout /></AdminProtected>}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="gigs" element={<AdminGigs />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
