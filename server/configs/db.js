import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect directly to your database
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/LEVITONG`);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
