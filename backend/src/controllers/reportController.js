import Report from '../models/Report.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { z } from 'zod'

const reportSchema = z.object({
  targetUser: z.string().optional(),
  targetListing: z.string().optional(),
  reason: z.string().min(5),
  details: z.string().optional(),
})

export const createReport = asyncHandler(async (req, res) => {
  const { targetUser, targetListing, reason, details } = reportSchema.parse(req.body)
  const report = await Report.create({ reporter: req.user._id, targetUser, targetListing, reason, details })
  res.status(201).json({ success: true, data: report })
})
