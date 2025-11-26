import fs from "fs/promises";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export async function extractFromPDF(filePath) {
  const buffer = await fs.readFile(filePath);
  const data = await pdf(buffer);
  return data.text || "";
}
