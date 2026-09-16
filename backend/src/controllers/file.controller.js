import fs from "fs";
import path from "path";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteFile } from "../utils/deleteFiles.js";

const downloadFile = asyncHandler(async (req, res) => {
  const { filename } = req.params;

  const filePath = path.join("uploads", "processed", filename);

  if (!fs.existsSync(filePath)) {
    throw new ApiError(404, "Compressed file not found");
  }

  return res.download(filePath);
});


const deleteMedia = asyncHandler(async (req, res) => {
  const { original, processed } = req.params;

  deleteFile(path.join("uploads", "originals", original));
  deleteFile(path.join("uploads", "processed", processed));

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Files deleted successfully"));
});


export { downloadFile, deleteMedia };