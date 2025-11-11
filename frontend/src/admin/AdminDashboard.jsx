import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p className="text-black">Loading...</p>;

  return (
    <div className="text-black">
      <h2 className="text-2xl font-bold mb-4">📊 Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">

        {/* ✅ USERS CARD */}
        <Link
          to="/admin/users"
          className="p-4 bg-blue-100 text-black rounded shadow hover:bg-blue-200 cursor-pointer transition"
        >
          <p className="text-xl font-semibold">Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </Link>

        {/* ✅ GIGS CARD */}
        <Link
          to="/admin/gigs"
          className="p-4 bg-green-100 text-black rounded shadow hover:bg-green-200 cursor-pointer transition"
        >
          <p className="text-xl font-semibold">Gigs</p>
          <p className="text-2xl font-bold">{stats.totalGigs}</p>
        </Link>

        {/* ✅ REVIEWS CARD */}
        <Link
          to="/admin/reviews"
          className="p-4 bg-yellow-100 text-black rounded shadow hover:bg-yellow-200 cursor-pointer transition"
        >
          <p className="text-xl font-semibold">Reviews</p>
          <p className="text-2xl font-bold">{stats.totalReviews}</p>
        </Link>

      </div>
    </div>
  );
}
