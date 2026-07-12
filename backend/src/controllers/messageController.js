import Message from '../models/Message.js'
import Conversation from '../models/Conversation.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { z } from 'zod'

const messageSchema = z.object({
  content: z.string().min(1),
})

export const getMessages = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.id)
  if (!conversation || !conversation.participants.some((id) => id.toString() === req.user._id.toString())) {
    return res.status(404).json({ success: false, error: 'Conversation not found' })
  }
  const messages = await Message.find({ conversation: req.params.id }).populate('sender', 'name avatar')
  res.json({ success: true, data: messages })
})

export const createMessage = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.id)
  if (!conversation || !conversation.participants.some((id) => id.toString() === req.user._id.toString())) {
    return res.status(404).json({ success: false, error: 'Conversation not found' })
  }
  const { content } = messageSchema.parse(req.body)
  const message = await Message.create({ conversation: req.params.id, sender: req.user._id, content, readBy: [req.user._id] })
  res.status(201).json({ success: true, data: message })
})
