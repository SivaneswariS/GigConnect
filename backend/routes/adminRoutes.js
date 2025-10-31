import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import adminAuth from "../middleware/adminAuth.js";

import {
  getAllUsers,
  getAllGigs,
  getStats,
  deleteUser,
  deleteGig,
} from "../controllers/adminController.js";

const router = express.Router();

// ✅ Protect admin routes
router.use(protect, adminAuth);


// ✅ Admin endpoints
router.get("/users", getAllUsers);
router.get("/gigs", getAllGigs);
router.get("/stats", getStats);

router.delete("/delete-user/:id", deleteUser);
router.delete("/delete-gig/:id", deleteGig);

export default router;
