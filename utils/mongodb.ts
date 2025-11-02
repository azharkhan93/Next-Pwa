import "./loadEnv";
import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env");
}

const MONGODB_URI = process.env.DATABASE_URL;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
    return mongoose;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};


