import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addReview, getGigReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, addReview);     // POST /api/reviews
router.get("/:gigId", getGigReviews);     // GET  /api/reviews/:gigId

export default router;
