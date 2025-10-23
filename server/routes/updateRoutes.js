import express from "express";
import { createUpdate, getUpdates } from "../controllers/UpdateController.js";
import Update from "../models/Update.js"; // ✅ Make sure this model exists

const router = express.Router();

// ✅ Create new student update
router.post("/", createUpdate);

// ✅ Get all student updates
router.get("/", getUpdates);

// ✅ Delete a student update (POST for frontend consistency)
router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Update ID is required" });
    }

    const deletedUpdate = await Update.findByIdAndDelete(id);

    if (!deletedUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Update not found" });
    }

    res.json({ success: true, message: "Update deleted successfully" });
  } catch (error) {
    console.error("Delete update error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
