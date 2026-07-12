export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500
  const message = err.message || 'Server error'

  res.status(status).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  })
}
