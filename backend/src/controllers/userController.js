import cloudinary from 'cloudinary'
import streamifier from 'streamifier'
import User from '../models/User.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { z } from 'zod'
import { buildPoint } from '../utils/geoUtils.js'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const profileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(500).optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  matchingRadiusKm: z.number().nonnegative().optional(),
})

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json({ success: true, data: user })
})

export const updateProfile = asyncHandler(async (req, res) => {
  const parsed = profileSchema.parse(req.body)
  const updates = {
    name: parsed.name,
    bio: parsed.bio ?? req.user.bio,
    location: {
      city: parsed.city ?? req.user.location.city,
      neighborhood: parsed.neighborhood ?? req.user.location.neighborhood,
      coordinates: buildPoint(parsed.latitude ?? req.user.location.coordinates[1], parsed.longitude ?? req.user.location.coordinates[0]),
    },
    matchingRadiusKm: parsed.matchingRadiusKm ?? req.user.matchingRadiusKm,
  }
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true })
  res.json({ success: true, data: user })
})

export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'Avatar file required' })
  }

  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder: 'skillbridge/avatars', resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      },
    )
    streamifier.createReadStream(req.file.buffer).pipe(stream)
  })

  const user = await User.findByIdAndUpdate(req.user._id, { avatar: uploadResult.secure_url }, { new: true })
  res.json({ success: true, data: user })
})

export const blockUser = asyncHandler(async (req, res) => {
  const targetId = req.params.userId
  if (req.user.blockedUsers.includes(targetId)) {
    return res.status(400).json({ success: false, error: 'User already blocked' })
  }
  req.user.blockedUsers.push(targetId)
  await req.user.save()
  res.json({ success: true, data: req.user })
})

export const unblockUser = asyncHandler(async (req, res) => {
  const targetId = req.params.userId
  req.user.blockedUsers = req.user.blockedUsers.filter((id) => id.toString() !== targetId)
  await req.user.save()
  res.json({ success: true, data: req.user })
})
