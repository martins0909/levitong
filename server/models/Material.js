import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    fileUrl: { type: String, required: true }, // URL to PDF, DOC, or any file
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);

export default Material;
