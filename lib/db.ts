import mongoose from "mongoose";

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connect = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise =
      cached.promise ||
      mongoose
        .connect(process.env.MONGO_URI!, {
          dbName: "learning",
          bufferCommands: false,
        })
        .then((mongoose) => {
          console.log("✅ MongoDB Connected");
          return mongoose;
        })
        .catch((err) => {
          console.log("❌ MongoDB Connection Error:", err);
          throw err;
        });
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
};
