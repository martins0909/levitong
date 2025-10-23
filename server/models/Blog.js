import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subTitle: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Capitalize the model name for proper ref usage and convention
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
