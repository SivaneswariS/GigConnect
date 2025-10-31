import User from "../models/User.js";
import Gig from "../models/Gig.js";
import Review from "../models/Review.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getAllGigs = async (req, res) => {
  const gigs = await Gig.find().populate("client", "name email");
  res.json(gigs);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const deleteGig = async (req, res) => {
  await Gig.findByIdAndDelete(req.params.id);
  res.json({ message: "Gig deleted" });
};

export const getStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalGigs = await Gig.countDocuments();
  const totalReviews = await Review.countDocuments();

  res.json({ totalUsers, totalGigs, totalReviews });
};
