import multer from "multer";

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message:
        err.code === "LIMIT_FILE_SIZE"
          ? "File exceeds the 500 MB upload limit"
          : err.message,
      errors: [],
      data: null,
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    data: null,
  });
};

export { errorHandler };