exports.errorHandler = (err, req, res, next) => {
  if (!err.status) {
    console.error(err.stack);
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Error",
  });
};

exports.notFound = (req, res, next) =>
  res.status(404).json({ message: "Not Found" });
