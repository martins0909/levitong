import express from "express";
import Material from "../models/Material.js";

const router = express.Router();

/**
 * @route   POST /api/materials
 * @desc    Upload new teaching material
 */
router.post("/", async (req, res) => {
  try {
    const { title, description, fileUrl } = req.body;

    if (!title || !fileUrl) {
      return res.status(400).json({ success: false, message: "Title and fileUrl are required" });
    }

    const material = new Material({ title, description, fileUrl });
    await material.save();

    res.status(201).json({ success: true, material });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/materials
 * @desc    Get all materials
 */
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    res.json({ success: true, materials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   PUT /api/materials/:id
 * @desc    Update material
 */
router.put("/:id", async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!material) return res.status(404).json({ success: false, message: "Material not found" });

    res.json({ success: true, material });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   DELETE /api/materials/:id
 * @desc    Delete material
 */
router.delete("/:id", async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ success: false, message: "Material not found" });

    res.json({ success: true, message: "Material deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
