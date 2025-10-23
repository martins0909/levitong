import Material from "../models/Material.js";

// ✅ Create a new material
export const createMaterial = async (req, res) => {
  try {
    const { title, description, fileUrl } = req.body;

    // If file is uploaded (via multer)
    let finalFileUrl = fileUrl || "";
    if (req.file) {
      finalFileUrl = `/uploads/${req.file.filename}`;
    }

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const material = new Material({
      title,
      description,
      fileUrl: finalFileUrl,
    });

    await material.save();
    res.status(201).json({ success: true, material });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get all materials
export const getMaterials = async (req, res) => {
  try {
    const bmaterials = await Material.find().sort({ createdAt: -1 });
    // ⚠️ Return `bmaterials` instead of `materials` — matches frontend `data.bmaterials`
    res.json({ success: true, bmaterials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete material
export const deleteMaterial = async (req, res) => {
  try {
    const deleted = await Material.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Material not found" });
    }
    res.json({ success: true, message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
