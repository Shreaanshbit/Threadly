export function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || "Server error";
  res.status(status).json({ success: false, message });
}