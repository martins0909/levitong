import express from "express";
import {
  addBlog,
  addComment,
  getBlogComments,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  togglePublish,
  generateContent,
} from "../controllers/blogController.js";

import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

// ✅ Admin/blog creation route
blogRouter.post("/add", auth, upload.single("image"), addBlog);

// ✅ Public route to fetch all published blogs
blogRouter.get("/all", getAllBlogs);

// ✅ Public route to get comments using query parameter (?blogId=...)
blogRouter.get("/comment", getBlogComments);

// ✅ Route to add comment (frontend must send { blog: id, name, content })
blogRouter.post("/add-comment", addComment);

// ✅ Admin route to delete a blog
blogRouter.post("/delete", auth, deleteBlogById);

// ✅ Admin route to toggle publish status
blogRouter.post("/toggle-publish", auth, togglePublish);

// ✅ This must be last to avoid conflict with static routes like /add
blogRouter.get("/:blogId", getBlogById);

blogRouter.post("/generate", auth, generateContent);

export default blogRouter;
