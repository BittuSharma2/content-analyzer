import path from "path";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.resolve();
const UPLOAD_DIR = path.join(__dirname, "uploads");

await fs.mkdir(UPLOAD_DIR, { recursive: true });

export default {
  PORT: process.env.PORT || 5000,
  UPLOAD_DIR
};
