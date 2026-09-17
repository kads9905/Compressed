import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { 
    compressImageController,
    compressVideoController
} from "../controllers/compression.controller.js";

const router = Router();

router.post("/image", compressImageController);

router.post("/video", compressVideoController);

export default router;