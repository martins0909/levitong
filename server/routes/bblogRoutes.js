import express from "express";
import {
  createBlog,
  getBlogs,
  deleteBlog,
  getSingleBlog,
} from "../controllers/BblogController.js";

const router = express.Router();

// ✅ Create a new blog
router.post("/", createBlog);

// ✅ Get all blogs
router.get("/", getBlogs);

// ✅ Get a single blog by ID
router.get("/:id", getSingleBlog);

// ✅ Delete a blog by ID
router.delete("/:id", deleteBlog);

export default router;
