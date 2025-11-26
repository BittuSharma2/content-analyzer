import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.use("/", uploadRoutes);
app.use("/", analyzeRoutes);

// Health check
app.get("/", (_, res) => res.send("Backend running ✔"));

// Error Handler (must be last)
app.use(errorHandler);

export default app;
