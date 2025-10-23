import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog", // Model names are case-sensitive and should match the one used in your Blog model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Capitalized model name for convention
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
