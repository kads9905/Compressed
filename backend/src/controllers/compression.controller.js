import fs from "fs";
import path from "path";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { compressImage } from "../services/image.service.js";
import { compressVideo } from "../services/video.service.js";

const compressImageController = asyncHandler(async (req, res) => {
  const { fileId, quality = 80, format = "webp" } = req.body;

  if (!fileId) {
    throw new ApiError(400, "File ID is required");
  }

  const inputPath = path.join("uploads", "originals", fileId);

  if (!fs.existsSync(inputPath)) {
    throw new ApiError(404, "Original file not found");
  }

  const result = await compressImage(inputPath, Number(quality), format);

  const originalSize = fs.statSync(inputPath).size;
  const compressedSize = fs.statSync(result.outputPath).size;

  const savedPercentage = (
    ((originalSize - compressedSize) / originalSize) *
    100
  ).toFixed(1);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        fileId,
        outputName: result.outputName,
        downloadUrl: `/api/files/download/${result.outputName}`,
        originalSize,
        compressedSize,
        savedPercentage,
        format,
      },
      "Image compressed successfully"
    )
  );
});


const compressVideoController = asyncHandler(async (req, res) => {
  const { fileId, preset = "balanced" } = req.body;

  if (!fileId) {
    throw new ApiError(400, "Video file ID is required");
  }

  const inputPath = path.join("uploads", "originals", fileId);

  if (!fs.existsSync(inputPath)) {
    throw new ApiError(404, "Original video not found");
  }

  const result = await compressVideo(inputPath, preset);

  const originalSize = fs.statSync(inputPath).size;
  const compressedSize = fs.statSync(result.outputPath).size;

  const savedPercentage = (
    ((originalSize - compressedSize) / originalSize) *
    100
  ).toFixed(1);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        fileId,
        outputName: result.outputName,
        preset,
        originalSize,
        compressedSize,
        savedPercentage,
        downloadUrl: `/api/files/download/${result.outputName}`,
      },
      "Video compressed successfully"
    )
  );
});


export { compressImageController, compressVideoController };
