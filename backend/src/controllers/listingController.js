import Listing from '../models/Listing.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { z } from 'zod'
import { buildPoint, withinRadius } from '../utils/geoUtils.js'

const listingSchema = z.object({
  type: z.enum(['offer', 'request']),
  title: z.string().min(3),
  category: z.string().min(2),
  tags: z.array(z.string()).optional(),
  description: z.string().min(10),
  availability: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  radiusKm: z.number().nonnegative().optional(),
})

export const createListing = asyncHandler(async (req, res) => {
  const parsed = listingSchema.parse(req.body)
  const listing = await Listing.create({
    owner: req.user._id,
    type: parsed.type,
    title: parsed.title,
    category: parsed.category,
    tags: parsed.tags || [],
    description: parsed.description,
    availability: parsed.availability || '',
    location: {
      city: parsed.city || '',
      neighborhood: parsed.neighborhood || '',
      coordinates: buildPoint(parsed.latitude, parsed.longitude),
    },
    radiusKm: parsed.radiusKm || 10,
  })
  res.status(201).json({ success: true, data: listing })
})

export const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ status: 'active' }).populate('owner', 'name avatar location')
  res.json({ success: true, data: listings })
})

export const getListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate('owner', 'name avatar location')
  if (!listing) {
    return res.status(404).json({ success: false, error: 'Listing not found' })
  }
  res.json({ success: true, data: listing })
})

export const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id)
  if (!listing) return res.status(404).json({ success: false, error: 'Listing not found' })
  if (listing.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, error: 'Forbidden' })
  }

  const updates = listingSchema.partial().parse(req.body)
  if (updates.latitude || updates.longitude) {
    updates.location = listing.location
    updates.location.coordinates = buildPoint(updates.latitude ?? listing.location.coordinates[1], updates.longitude ?? listing.location.coordinates[0])
  }
  const updated = await Listing.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true })
  res.json({ success: true, data: updated })
})

export const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id)
  if (!listing) return res.status(404).json({ success: false, error: 'Listing not found' })
  if (listing.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, error: 'Forbidden' })
  }
  await listing.remove()
  res.json({ success: true, data: {} })
})

export const getMyListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ owner: req.user._id }).sort({ createdAt: -1 })
  res.json({ success: true, data: listings })
})

export const searchListings = asyncHandler(async (req, res) => {
  const { keyword, category, type, city, latitude, longitude, radiusKm } = req.query
  const filters = { status: 'active' }
  if (keyword) {
    filters.$or = [{ title: new RegExp(keyword, 'i') }, { description: new RegExp(keyword, 'i') }, { tags: new RegExp(keyword, 'i') }]
  }
  if (category) filters.category = category
  if (type) filters.type = type
  if (city) filters['location.city'] = city

  if (latitude && longitude && radiusKm) {
    filters['location.coordinates'] = {
      $geoWithin: {
        $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], parseFloat(radiusKm) / 6378.1],
      },
    }
  }

  const listings = await Listing.find(filters).populate('owner', 'name avatar location')
  res.json({ success: true, data: listings })
})
