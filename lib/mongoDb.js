import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("mogodb Connection succesful");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
