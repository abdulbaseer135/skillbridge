import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = registerSchema.parse(req.body)

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ success: false, error: 'Email already registered' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hashedPassword })
  const token = generateToken(user._id)

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .status(201)
    .json({ success: true, data: { id: user._id, name: user.name, email: user.email } })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body)
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' })
  }

  const token = generateToken(user._id)
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .json({ success: true, data: { id: user._id, name: user.name, email: user.email } })
})

export const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) }).json({ success: true })
})

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json({ success: true, data: user })
})
