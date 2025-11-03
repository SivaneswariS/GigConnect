import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📊 Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-200 rounded">Users: {stats.totalUsers}</div>
        <div className="p-4 bg-green-200 rounded">Gigs: {stats.totalGigs}</div>
        <div className="p-4 bg-yellow-200 rounded">
          Reviews: {stats.totalReviews}
        </div>
      </div>
    </div>
  );
}
