import Gig from "../models/Gig.js";

// ✅ Create a new gig (Client only)
export const createGig = async (req, res) => {
  try {
    if (req.user.role !== "Client") {
      return res.status(403).json({ message: "Only clients can post gigs" });
    }

    const { title, description, budget, location } = req.body;

    const gig = await Gig.create({
      title,
      description,
      budget,
      location,
      client: req.user._id,
    });

    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all gigs
export const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().populate("client", "name email");
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a gig (only owner)
export const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Gig.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a gig
export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await gig.deleteOne();
    res.json({ message: "Gig deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
