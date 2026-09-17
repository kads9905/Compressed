import ffmpeg from "fluent-ffmpeg";
import path from "path";
import { v4 as uuid } from "uuid";

const compressVideo = (inputPath, preset = "balanced") => {
  return new Promise((resolve, reject) => {
    const outputName = `${uuid()}.mp4`;
    const outputPath = path.join("uploads", "processed", outputName);

    let bitrate;

    switch (preset) {
      case "small":
        bitrate = "800k";
        break;
      case "high":
        bitrate = "2500k";
        break;
      default:
        bitrate = "1500k";
    }

    ffmpeg(inputPath)
      .videoBitrate(bitrate)
      .output(outputPath)
      .on("end", () => {
        resolve({
          outputName,
          outputPath,
        });
      })
      .on("error", (err) => {
        reject(err);
      })
      .run();
  });
};

export { compressVideo };