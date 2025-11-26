import path from "path";
import { extractFromPDF } from "../utils/pdfExtractor.js";
import { runOCR } from "../utils/ocr.js";

export async function uploadFile(req, res, next) {
  try {
    if (!req.file) {
      throw { statusCode: 400, message: "No file uploaded" };
    }

    const filePath = req.file.path;
    const mime = req.file.mimetype;
    const ext = path.extname(req.file.originalname).toLowerCase();

    let text = "";

    if (mime === "application/pdf" || ext === ".pdf") {
      text = await extractFromPDF(filePath);
    } else if (mime.startsWith("image/")) {
      text = await runOCR(filePath);
    } else {
      try {
        text = await extractFromPDF(filePath);
      } catch {
        text = await runOCR(filePath);
      }
    }

    res.json({ success: true, text });

  } catch (err) {
    next(err);
  }
}
