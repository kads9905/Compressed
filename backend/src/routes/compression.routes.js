import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { compressImageController } from "../controllers/compression.controller.js";

const router = Router();

router.post("/image", compressImageController);

export default router;