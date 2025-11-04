// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserFromToken } from "../utils/token";

export default function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const u = getUserFromToken(token);
    setUser(u);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold tracking-tight text-cyan-400">
          GigConnect
        </Link>

        <nav className="flex items-center gap-3 ml-6">
          <Link className="px-3 py-2 rounded-md hover:bg-gray-800" to="/gigs">Gigs</Link>
          <Link className="px-3 py-2 rounded-md hover:bg-gray-800" to="/chats">Chats</Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/" className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-md">Login</Link>
              <Link to="/register" className="px-3 py-2 border border-gray-700 rounded-md">Register</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="px-3 py-2 hover:bg-gray-800 rounded-md">Profile</Link>
              <Link to="/post-gig" className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-md">Post Gig</Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
