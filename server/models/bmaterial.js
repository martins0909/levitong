import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    fileUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Material", materialSchema);