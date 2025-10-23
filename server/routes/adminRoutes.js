import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllcommments,
  getDashboard
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllcommments);
adminRouter.get("/Blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);

// Only use the controller version for dashboard
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;