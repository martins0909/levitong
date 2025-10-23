// routes/user.js
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * @route   POST /api/user
 * @desc    Register a new user (Signup)
 */
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, state, city, password } = req.body;

    // ✅ check if user already exists (by email OR phone)
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Email or phone already registered" });
    }

    // ✅ No manual hashing — schema handles it
    const user = new User({
      fullName,
      email,
      phone,
      state,
      city,
      password,
    });

    await user.save();

    const { password: pw, ...userInfo } = user.toObject();
    res.status(201).json({ success: true, user: userInfo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route   POST /api/user/signin
 * @desc    Login user (email or phone)
 */
router.post("/signin", async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // ✅ allow login with email OR phone
    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // ✅ compare raw password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: pw, ...userInfo } = user.toObject();
    res.json({ success: true, token, user: userInfo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/user
 * @desc    Get all users (exclude password)
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/user/:id
 * @desc    Get single user
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   PUT /api/user/:id
 * @desc    Update user (fullName, email, phone, state, city, password)
 */
router.put("/:id", async (req, res) => {
  try {
    const { password, ...updates } = req.body;

    if (password) {
      // ✅ schema handles hashing on save
      updates.password = password;
    }

    let user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    Object.assign(user, updates);
    await user.save();

    const { password: pw, ...userInfo } = user.toObject();
    res.json({ success: true, user: userInfo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route   DELETE /api/user/:id
 * @desc    Delete a user
 */
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
