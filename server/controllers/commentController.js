// filepath: server/controllers/commentController.js
import Comment from "../models/comment.js"; // Make sure the file is named comment.js (all lowercase)

export const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { blogId } = req.query;
    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};