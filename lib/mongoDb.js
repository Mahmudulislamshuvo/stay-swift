import mongoose from "mongoose";

const cached = {};

export async function dbConnect() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connection successful");
        return mongoose;
      });
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("mogodb Connection succesful");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
