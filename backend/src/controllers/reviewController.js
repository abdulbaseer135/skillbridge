import Review from '../models/Review.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { z } from 'zod'

const reviewSchema = z.object({
  listing: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
})

export const createReview = asyncHandler(async (req, res) => {
  const { listing, rating, comment } = reviewSchema.parse(req.body)
  const review = await Review.create({ reviewer: req.user._id, listing, rating, comment })
  res.status(201).json({ success: true, data: review })
})
