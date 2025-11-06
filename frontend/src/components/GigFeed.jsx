// components/GigFeed.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import ReviewSection from "./ReviewSection";

export default function GigFeed() {
  const [gigs, setGigs] = useState([]);
  const [reviewMap, setReviewMap] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    minBudget: "",
    maxBudget: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchGigs = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/gigs", { params: filters });
      setGigs(data);
    } catch {
      alert("Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleReviewUpdate = (gigId, reviews) => {
    setReviewMap((prev) => ({ ...prev, [gigId]: reviews }));
  };

  return (
    <div className="min-h-screen text-white">

      {/* ✅✅ SEARCH + FILTER UI RESTORED */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchGigs();
        }}
        className="flex flex-wrap gap-3 mb-6"
      >
        <input
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
          placeholder="Search gigs..."
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-1/3"
        />

        <input
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
          placeholder="Location"
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-1/5"
        />

        <input
          type="number"
          value={filters.minBudget}
          onChange={(e) =>
            setFilters({ ...filters, minBudget: e.target.value })
          }
          placeholder="Min"
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-20"
        />

        <input
          type="number"
          value={filters.maxBudget}
          onChange={(e) =>
            setFilters({ ...filters, maxBudget: e.target.value })
          }
          placeholder="Max"
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-20"
        />

        <button className="px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-600">
          Filter
        </button>
      </form>

      {loading ? (
        <p>Loading gigs...</p>
      ) : gigs.length === 0 ? (
        <p>No gigs found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {gigs.map((gig) => {
            const reviews = reviewMap[gig._id] || [];
            const count = reviews.length;

            const avgRating =
              count > 0
                ? (
                    reviews.reduce((a, r) => a + r.rating, 0) / count
                  ).toFixed(1)
                : null;

            return (
              <div
                key={gig._id}
                className="bg-[#0f172a] p-6 rounded-2xl border border-gray-700 shadow-xl"
              >
                <h3 className="text-lg font-bold text-cyan-300">{gig.title}</h3>

                <p className="text-gray-300 mt-2">{gig.description}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-gray-200">
                    💰 <b>{gig.budget}</b> · 📍 {gig.location}
                  </div>

                  <div className="text-yellow-400 font-semibold">
                    {count > 0 ? (
                      <>
                        ⭐ {avgRating} ({count})
                      </>
                    ) : (
                      "No reviews"
                    )}
                  </div>
                </div>

                <a
                  href={`/pay/${gig._id}`}
                  className="text-emerald-400 underline mt-3 inline-block"
                >
                  Pay for this gig
                </a>

                <ReviewSection
                  gigId={gig._id}
                  onReviewAdded={(reviews) =>
                    handleReviewUpdate(gig._id, reviews)
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

