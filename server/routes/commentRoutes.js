import express from "express";
import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/:blogId", getComments);
router.post("/", createComment);
router.delete("/:id", deleteComment);

export default router;
