import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import { ApiError } from "../utils/ApiError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/originals");
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/quicktime",
    "video/webm",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Unsupported file type"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 100 MB
  },
});