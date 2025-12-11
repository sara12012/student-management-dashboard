import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import { connectDB, stopMemoryServer } from "./lib/db.js";

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = http.createServer(app);

async function start() {
  await connectDB();
  server.listen(port, () => {});
}

process.on("SIGINT", async () => {
  await stopMemoryServer();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await stopMemoryServer();
  process.exit(0);
});

start();
