import fs from "fs";
import path from "path";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const downloadFile = asyncHandler(async (req, res) => {
  const { filename } = req.params;

  const filePath = path.join("uploads", "processed", filename);

  if (!fs.existsSync(filePath)) {
    throw new ApiError(404, "Compressed file not found");
  }

  return res.download(filePath);
});

export { downloadFile };