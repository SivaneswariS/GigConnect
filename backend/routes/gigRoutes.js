import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createGig,
  getAllGigs,
  updateGig,
  deleteGig,
} from "../controllers/gigController.js";

const router = express.Router();

// ✅ Public route — anyone can view gigs (with search + filter)
router.route("/").get(getAllGigs);

// ✅ Protected route — only logged-in users can post, update, or delete
router.route("/").post(protect, createGig);
router.route("/:id").put(protect, updateGig).delete(protect, deleteGig);

export default router;
