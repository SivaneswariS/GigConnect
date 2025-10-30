import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// 🔧 Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "gigconnect-profiles",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

const upload = multer({ storage });

/* -------------------------------------------------------------------------- */
/* ✅ Route 1: Upload Profile Image & Save in User Profile */
/* -------------------------------------------------------------------------- */
router.post("/profile", protect, upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file?.path || req.file?.secure_url || "";
    const publicId = req.file?.filename || "";

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profileImage = imageUrl;
    user.imagePublicId = publicId;
    await user.save();

    res.json({
      imageUrl,
      message: "✅ Profile image uploaded successfully",
      user,
    });
  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ message: err.message });
  }
});

/* -------------------------------------------------------------------------- */
/* ✅ Route 2: Simple Image Upload (for general use or testing) */
/* -------------------------------------------------------------------------- */
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file?.path || req.file?.secure_url || "";
    res.json({
      imageUrl,
      message: "✅ Image uploaded successfully",
    });
  } catch (err) {
    console.error("❌ General Upload Error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

