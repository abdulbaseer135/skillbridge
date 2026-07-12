import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ success: false, error: 'Not authorized' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Token invalid' })
  }
}
