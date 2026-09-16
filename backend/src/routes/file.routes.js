import { Router } from "express";
import { downloadFile } from "../controllers/file.controller.js";

const router = Router();

router.get("/download/:filename", downloadFile);

export default router;