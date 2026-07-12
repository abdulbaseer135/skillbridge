import Conversation from '../models/Conversation.js'
import { asyncHandler } from '../middleware/asyncHandler.js'

export const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({ participants: req.user._id }).populate('participants', 'name avatar')
  res.json({ success: true, data: conversations })
})

export const createConversation = asyncHandler(async (req, res) => {
  const { participantIds, listingId } = req.body
  const conversation = await Conversation.create({ participants: [req.user._id, ...participantIds], listing: listingId })
  res.status(201).json({ success: true, data: conversation })
})
