import { useEffect, useState } from "react";
import API from "../services/api";

export default function ReviewSection({ gigId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load reviews (GET /reviews/:gigId)
  const fetchReviews = async () => {
    try {
      const { data } = await API.get(`/reviews/${gigId}`);
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [gigId]);

  // ✅ Submit review (POST /reviews)
  const handleReview = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await API.post("/reviews", {
        gigId,
        rating: Number(rating),
        comment,
      });

      setComment("");
      fetchReviews();
      alert("Review submitted!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 mt-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-3">Reviews</h3>

      {/* ✅ Review list */}
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        reviews.map((rev) => (
          <div key={rev._id} className="border-b py-2">
            <p className="font-semibold">
              ⭐ {rev.rating} — {rev.reviewer?.name || "Anonymous"}
            </p>
            <p className="text-gray-700">{rev.comment}</p>
          </div>
        ))
      )}

      {/* ✅ Add review form */}
      <form onSubmit={handleReview} className="mt-4 space-y-3">
        <select
          className="border p-2 rounded"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        <textarea
          className="border p-2 w-full rounded"
          placeholder="Write a review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

