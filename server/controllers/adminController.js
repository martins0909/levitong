import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import comment from '../models/comment.js';
import User from "../models/User.js";

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Invalid credentials" }); // fixed res.js to res.json
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all blogs
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs }); // fixed "comments" to "blogs"
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all comments
export const getAllcommments = async (req, res) => {
  try {
    const comments = await comment.find({}).populate("blog").sort({ createdAt: -1 }); // fixed typo: creatAt -> createdAt
    res.json({ success: true, comments }); // missing response
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get dashboard summary
export const getDashboard = async (req, res) => {
  try {
    const blogs = await Blog.countDocuments();
    const comments = await comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });
    const subscribers = 0; // Set this if you have a subscribers collection

    // Fetch recent blogs
    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);

    const dashboardData = {
      blogs,
      comments,
      drafts,
      subscribers,
      recentBlogs,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete a comment by ID
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" }); // fixed typo: messsage -> message
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Approve a comment by ID
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await comment.findByIdAndUpdate(id, { isApproved: true }); // fixed findByIdAndUpDelete to findByIdAndUpdate
    res.json({ success: true, message: "Comment approved successfully" }); // fixed typo and logic
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
