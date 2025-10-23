import Bcomment from "../models/Bcomment.js";

// --- Create a new comment ---
export const createBcomment = async (req, res) => {
  try {
    const { blogId, text } = req.body; // ✅ only these two now

    if (!blogId || !text) {
      return res.status(400).json({ success: false, message: "Missing blogId or text" });
    }

    const comment = new Bcomment({ blogId, text });
    await comment.save();

    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- Get comments (by blogId or all) ---
export const getBcomments = async (req, res) => {
  try {
    const blogId = req.params.blogId || req.query.blogId;

    const comments = blogId
      ? await Bcomment.find({ blogId }).sort({ createdAt: 1 })
      : await Bcomment.find().sort({ createdAt: 1 });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch comments" });
  }
};

// --- Delete a comment ---
export const deleteBcomment = async (req, res) => {
  try {
    await Bcomment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
