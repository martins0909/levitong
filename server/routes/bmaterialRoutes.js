import express from "express";
import Material from "../models/Material.js";

const router = express.Router();

// ✅ Upload new teaching material
router.post("/", async (req, res) => {
  try {
    const { title, description, fileUrl } = req.body;

    if (!title || !fileUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Title and file URL are required" });
    }

    const material = await Material.create({ title, description, fileUrl });
    res.status(201).json({ success: true, material });
  } catch (error) {
    console.error("Upload material error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all materials
router.get("/", async (req, res) => {
  try {
    const bmaterials = await Material.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, bmaterials });
  } catch (error) {
    console.error("Fetch materials error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Delete a material
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMaterial = await Material.findByIdAndDelete(id);

    if (!deletedMaterial) {
      return res
        .status(404)
        .json({ success: false, message: "Material not found" });
    }

    res.json({ success: true, message: "Material deleted successfully" });
  } catch (error) {
    console.error("Delete material error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting material" });
  }
});

export default router;
