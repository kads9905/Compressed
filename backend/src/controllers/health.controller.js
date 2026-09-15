const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "MediaForge API is running",
  });
};

export { healthCheck };