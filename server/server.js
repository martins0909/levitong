import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";

// Routers
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import userRouter from "./routes/userRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import commentRoutes from "./routes/commentRoutes.js"; // ✅ regular comments
import updateRoutes from "./routes/updateRoutes.js";
import bcommentRoutes from "./routes/bcommentRoutes.js"; // ✅ tutorial comments
import bblogRoutes from "./routes/BblogRoutes.js";
import bmaterialRoutes from "./routes/bmaterialRoutes.js";

const app = express();

// Use an async function to handle `await connectDB()`
const startServer = async () => {
  try {
    await connectDB();

    app.use(cors());
    app.use(express.json());

    // ✅ Root route
    app.get("/", (req, res) => {
      res.send("API is working!");
    });

    // ✅ All main routes
    app.use("/api/admin", adminRouter);
    app.use("/api/blog", blogRouter);
    app.use("/api", subscriberRoutes);
    app.use("/api/user", userRouter);
    app.use("/api/materials", materialRoutes);
    app.use("/api/comment", commentRoutes); // regular comments

    // ✅ Tutorial-specific routes
    app.use("/api/updates", updateRoutes);
    app.use("/api/bcomments", bcommentRoutes); // tutorial comments
    app.use("/api/bblogs", bblogRoutes);
    app.use("/api/bmaterials", bmaterialRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB or start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});
