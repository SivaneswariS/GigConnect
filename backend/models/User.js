import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Client", "Freelancer","Admin"],
     default: "Client",
    },
    skills: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    rate: {
      type: Number,
      default: 0,
    },

    //  NEW FIELD for Cloudinary image
    profileImage: {
      type: String, // Cloudinary image URL
      default: "",  // will be filled after upload
    },

    // (Optional) Cloudinary public_id — useful if you plan to delete/replace old images
    imagePublicId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

