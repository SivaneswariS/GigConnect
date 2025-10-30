import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 💰 Simulated payment endpoint
router.post("/pay", protect, async (req, res) => {
  try {
    const { gigId, amount } = req.body;

    // pretend payment succeeded
    const transactionId = `TXN-${Date.now()}`;
    res.json({
      success: true,
      message: "Payment successful!",
      gigId,
      amount,
      transactionId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
