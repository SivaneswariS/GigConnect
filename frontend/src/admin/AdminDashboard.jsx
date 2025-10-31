import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    const { data } = await API.get("/admin/stats");
    setStats(data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded">Users: {stats.totalUsers}</div>
        <div className="p-4 bg-green-100 rounded">Gigs: {stats.totalGigs}</div>
        <div className="p-4 bg-yellow-100 rounded">Reviews: {stats.totalReviews}</div>
      </div>
    </div>
  );
}
