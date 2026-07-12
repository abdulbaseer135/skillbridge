import Match from '../models/Match.js'
import Listing from '../models/Listing.js'
import { asyncHandler } from '../middleware/asyncHandler.js'

export const getMatches = asyncHandler(async (req, res) => {
  const userListings = await Listing.find({ owner: req.user._id, status: 'active' })
  const matches = []

  for (const listing of userListings) {
    const matchType = listing.type === 'offer' ? 'request' : 'offer'
    const possibleMatches = await Listing.find({
      type: matchType,
      category: listing.category,
      status: 'active',
      'location.coordinates': {
        $geoWithin: {
          $centerSphere: [listing.location.coordinates.coordinates, listing.radiusKm / 6378.1],
        },
      },
    }).populate('owner', 'name avatar location')

    for (const matchedListing of possibleMatches) {
      matches.push({ listing, matchedListing })
    }
  }

  res.json({ success: true, data: matches })
})

export const completeMatch = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id)
  if (!match) return res.status(404).json({ success: false, error: 'Match not found' })
  if (!match.users.some((id) => id.toString() === req.user._id.toString())) {
    return res.status(403).json({ success: false, error: 'Forbidden' })
  }
  match.completed = true
  await match.save()
  res.json({ success: true, data: match })
})
