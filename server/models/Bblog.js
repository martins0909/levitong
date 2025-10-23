import mongoose from "mongoose";

const BblogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    category: { type: String, default: "tutorial", trim: true },
  },
  { timestamps: true }
);

const Bblog = mongoose.model("Bblog", BblogSchema);

export default Bblog;
