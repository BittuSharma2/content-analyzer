import multer from "multer";
import path from "path";
import config from "../config/config.js";

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, config.UPLOAD_DIR),
  filename: (_, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${unique}-${safeName}`);
  }
});

const upload = multer({ storage });

export default upload;
