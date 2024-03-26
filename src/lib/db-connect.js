//lib\db-connect.ts
import mongoose from "mongoose";
export default async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    throw new Error("Connection failed!");
  }
}
