import Review from "../models/Review.js";
import Gig from "../models/Gig.js";

// ➕ Add new review
export const addReview = async (req, res) => {
  try {
    const { gigId, rating, comment } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    const alreadyReviewed = await Review.findOne({
      gig: gigId,
      reviewer: req.user._id,
    });
    if (alreadyReviewed)
      return res.status(400).json({ message: "You already reviewed this gig" });

    const review = await Review.create({
      gig: gigId,
      reviewer: req.user._id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📋 Get all reviews for a gig
export const getGigReviews = async (req, res) => {
  try {
    const { gigId } = req.params;
    const reviews = await Review.find({ gig: gigId })
      .populate("reviewer", "name email")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
