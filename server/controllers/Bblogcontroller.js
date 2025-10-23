import Bblog from "../models/Bblog.js"; 

// ✅ Create new Bblog
export const createBlog = async (req, res) => {
  try {
    const blog = new Bblog(req.body);
    await blog.save();
    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get all Bblogs (with optional category filter)
export const getBlogs = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const bblogs = await Bblog.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, bblogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a single blog by ID
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Bblog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete a Bblog by ID
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Bblog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
