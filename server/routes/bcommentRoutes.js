import express from "express";
import {
  createBcomment,
  getBcomments,
  deleteBcomment,
} from "../controllers/BcommentController.js";

const router = express.Router();

router.get("/:blogId", getBcomments);
router.post("/", createBcomment);
router.delete("/:id", deleteBcomment);

export default router;
