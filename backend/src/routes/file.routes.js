import { Router } from "express";
import { downloadFile } from "../controllers/file.controller.js";
import { deleteMedia } from "../controllers/file.controller.js";

const router = Router();

router.get("/download/:filename", downloadFile);

router.delete("/:original/:processed", deleteMedia);

export default router;