import express from "express";
import cors from "cors";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());


// routes
import healthRouter from "./routes/health.routes.js";

app.use("/api/health", healthRouter);

export default app;