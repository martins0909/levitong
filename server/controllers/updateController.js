import Update from "../models/Update.js";

export const createUpdate = async (req, res) => {
  try {
    const update = new Update(req.body);
    await update.save();
    res.status(201).json({ success: true, update });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUpdates = async (req, res) => {
  try {
    const updates = await Update.find().sort({ createdAt: -1 });
    res.json({ success: true, updates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUpdate = async (req, res) => {
  try {
    await Update.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Update deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};