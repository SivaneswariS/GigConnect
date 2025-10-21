import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createGig, getAllGigs, updateGig, deleteGig } from "../controllers/gigController.js";

const router = express.Router();

router.route("/")
  .get(getAllGigs)
  .post(protect, createGig);

router.route("/:id")
  .put(protect, updateGig)
  .delete(protect, deleteGig);

export default router;
