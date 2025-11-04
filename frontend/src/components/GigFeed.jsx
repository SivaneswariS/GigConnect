// components/GigFeed.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import ReviewSection from "./ReviewSection";

export default function GigFeed() {
  const [gigs, setGigs] = useState([]);
  const [filters, setFilters] = useState({ search: "", location: "", minBudget: "", maxBudget: "" });
  const [loading, setLoading] = useState(true);

  const fetchGigs = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/gigs", { params: filters });
      setGigs(data);
    } catch (err) {
      alert("Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <form onSubmit={(e) => { e.preventDefault(); fetchGigs(); }} className="flex gap-3">
          <input value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search gigs..." className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-1/3" />
          <input value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            placeholder="Location" className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-1/5" />
          <input type="number" value={filters.minBudget} onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
            placeholder="Min" className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-1/8" />
          <input type="number" value={filters.maxBudget} onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
            placeholder="Max" className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-1/8" />
          <button className="px-4 py-2 bg-cyan-500 rounded">Filter</button>
        </form>
      </div>

      {loading ? (
        <p>Loading gigs...</p>
      ) : gigs.length === 0 ? (
        <p>No gigs found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {gigs.map((gig) => {
            const avgRating = gig.reviews?.length ? (gig.reviews.reduce((a, r) => a + r.rating, 0) / gig.reviews.length).toFixed(1) : null;
            return (
              <div key={gig._id} className="bg-gray-850 p-6 rounded-2xl border border-gray-800 shadow-md">
                <h3 className="text-lg font-bold text-cyan-300">{gig.title}</h3>
                <p className="text-gray-300 mt-2">{gig.description}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-gray-200">💰 <b>{gig.budget}</b> · 📍 {gig.location}</div>
                  <div className="text-yellow-400">{avgRating ? `⭐ ${avgRating}` : "No reviews"}</div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <a href={`/pay/${gig._id}`} className="text-emerald-400 underline">Pay for this gig</a>
                </div>

                <div className="mt-4">
                  <ReviewSection gigId={gig._id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

