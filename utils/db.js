import mongoose from "mongoose";


export const connectDb = async (params) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
      console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}