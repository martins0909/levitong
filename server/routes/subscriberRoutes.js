import express from 'express';
import Subscriber from '../models/Subscriber.js';

const router = express.Router();

// Add new subscriber
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: 'Email is required' });
    }

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: 'Email already subscribed' });
    }

    await Subscriber.create({ email });
    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Get all subscribers (admin use)
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ success: true, subscribers });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

export default router;
