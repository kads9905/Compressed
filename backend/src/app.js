import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());


// routes
import healthRouter from "./routes/health.routes.js";

app.use("/api/health", healthRouter);

import uploadRouter from "./routes/upload.routes.js";

app.use("/api/files", uploadRouter);


// global error middleware
app.use(errorHandler);


export default app;