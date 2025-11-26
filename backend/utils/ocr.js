import { createWorker } from "tesseract.js";

export async function runOCR(filePath) {
  const worker = await createWorker("eng");

  try {
    const { data } = await worker.recognize(filePath);
    return data.text;
  } finally {
    await worker.terminate();
  }
}
