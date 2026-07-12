import { ZodError } from 'zod'
import env from '../config/env.js'

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: 'Invalid request data',
      details: err.errors.map((issue) => ({ path: issue.path, message: issue.message })),
    })
  }

  const status = err.statusCode || 500
  const message = err.message || 'Server error'

  res.status(status).json({
    success: false,
    error: message,
    stack: env.NODE_ENV === 'production' ? undefined : err.stack,
  })
}
