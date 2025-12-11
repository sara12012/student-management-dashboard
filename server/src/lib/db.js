import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri === "memory") {
    memoryServer = await MongoMemoryServer.create();
    const memUri = memoryServer.getUri();
    await mongoose.connect(memUri);
    return;
  }
  await mongoose.connect(uri);
}

export async function stopMemoryServer() {
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = undefined;
  }
}
