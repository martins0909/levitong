import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: String,
    content: { type: String, required: true },
    category: { type: String, default: "tutorial" },
    author: String,
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);