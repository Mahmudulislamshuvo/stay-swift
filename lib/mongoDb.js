import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB connection successful");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

//  1 - import mongoose from "mongoose";                                                                                                                                                      │
// │  2 -                                                                                                                                                                                       │
// │  3 - const cached = {};                                                                                                                                                                    │
// │  4 -                                                                                                                                                                                       │
// │  5 - export async function dbConnect() {                                                                                                                                                   │
// │  6 -   if (cached.connection) {                                                                                                                                                            │
// │  7 -     return cached.connection;                                                                                                                                                         │
// │  8 -   }                                                                                                                                                                                   │
// │  9 -                                                                                                                                                                                       │
// │ 10 -   if (!cached.promise) {                                                                                                                                                              │▄▄▄▄│ 11 -     const opts = {                                                                                                                                                                    │ 3)
// │ 12 -       bufferCommands: false,                                                                                                                                                          │
// │ 13 -     };                                                                                                                                                                                │
// │ 14 -                                                                                                                                                                                       │
// │ 15 -     cached.promise = mongoose                                                                                                                                                         │
// │ 16 -       .connect(process.env.MONGODB_URI, opts)                                                                                                                                         │
// │ 17 -       .then((mongoose) => {                                                                                                                                                           │
// │ 18 -         console.log("MongoDB connection successful");                                                                                                                                 │
// │ 19 -         return mongoose;                                                                                                                                                              │
// │ 20 -       });                                                                                                                                                                             │
// │ 21 -   }                                                                                                                                                                                   │
// │ 22 -                                                                                                                                                                                       │
// │ 23 -   try {                                                                                                                                                                               │
// │ 24 -     const connection = await mongoose.connect(process.env.MONGODB_URI);                                                                                                               │
// │ 25 -     console.log("mogodb Connection succesful");                                                                                                                                       │
// │ 26 -     return connection;                                                                                                                                                                │
// │ 27 -   } catch (error) {                                                                                                                                                                   │
// │ 28 -     console.error("MongoDB connection error:", error);                                                                                                                                │
// │ 29 -   }                                                                                                                                                                                   │
// │ 30 - }
