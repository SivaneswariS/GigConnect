// components/ReviewSection.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function ReviewSection({ gigId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const { data } = await API.get(`/reviews/${gigId}`);
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [gigId]);

  const handleReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/reviews", { gigId, rating: Number(rating), comment });
      setComment("");
      fetchReviews();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 bg-gray-850 rounded p-3 border border-gray-800">
      <h4 className="text-cyan-300 font-semibold mb-2">Reviews</h4>
      {reviews.length === 0 ? <p className="text-gray-400">No reviews</p> : reviews.map(r => (
        <div key={r._id} className="border-b border-gray-800 py-2">
          <div className="text-yellow-400">⭐ {r.rating}</div>
          <div className="text-gray-200">{r.comment}</div>
        </div>
      ))}

      <form onSubmit={handleReview} className="mt-3 space-y-2">
        <select value={rating} onChange={(e) => setRating(e.target.value)} className="bg-gray-800 px-3 py-2 rounded border border-gray-700">
          {[1,2,3,4,5].map(i => <option key={i} value={i}>{i} Star{i>1?"s":""}</option>)}
        </select>
        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} required className="w-full bg-gray-800 px-3 py-2 rounded border border-gray-700" placeholder="Write a review..." />
        <button disabled={loading} className="px-4 py-2 bg-cyan-500 rounded">{loading?"Submitting...":"Submit Review"}</button>
      </form>
    </div>
  );
}


