import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadFile } from "../controllers/upload.controller.js";

const router = Router();

router.post(
    "/upload", 
    upload.single("media"), 
    uploadFile
);

export default router;