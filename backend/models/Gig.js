import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    location: { type: String, required: true },
    skills: [{ type: String }], // ✅ Added for filtering by skills
    category: { type: String }, // ✅ Added for category-based search
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Gig", gigSchema);

