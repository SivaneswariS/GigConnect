import { useEffect, useState } from "react";
import API from "../services/api";

export default function GigFeed() {
  const [gigs, setGigs] = useState([]);
  const [filters, setFilters] = useState({ search: "", location: "", minBudget: "", maxBudget: "" });
  const [loading, setLoading] = useState(true);

  // Fetch gigs with optional filters
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
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGigs();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">Available Gigs</h2>

        {/* Search and Filter */}
        <form onSubmit={handleSearch} className="flex flex-wrap gap-3 justify-center mb-6">
          <input
            type="text"
            placeholder="Search gigs..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="border p-2 rounded-lg w-1/3"
          />
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="border p-2 rounded-lg w-1/4"
          />
          <input
            type="number"
            placeholder="Min Budget"
            value={filters.minBudget}
            onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
            className="border p-2 rounded-lg w-1/6"
          />
          <input
            type="number"
            placeholder="Max Budget"
            value={filters.maxBudget}
            onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
            className="border p-2 rounded-lg w-1/6"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Filter
          </button>
        </form>

        {/* Gig List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading gigs...</p>
        ) : gigs.length === 0 ? (
          <p className="text-center text-gray-500">No gigs found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {gigs.map((gig) => (
              <div key={gig._id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">{gig.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{gig.description}</p>
                <p className="text-gray-700">
                  💰 <b>{gig.budget}</b> | 📍 {gig.location}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Posted by: {gig.client?.name || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
