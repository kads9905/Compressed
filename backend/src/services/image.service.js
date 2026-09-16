import sharp from "sharp";
import path from "path";
import { v4 as uuid } from "uuid";

const compressImage = async (inputPath, quality = 80, format = "webp") => {
  const outputName = `${uuid()}.${format}`;
  const outputPath = path.join("uploads", "processed", outputName);

  let transformer = sharp(inputPath);

  switch (format) {
    case "jpeg":
      await transformer.jpeg({ quality }).toFile(outputPath);
      break;

    case "png":
      await transformer.png({ quality }).toFile(outputPath);
      break;

    default:
      await transformer.webp({ quality }).toFile(outputPath);
  }

  return {
    outputPath,
    outputName,
  };
};

export { compressImage };