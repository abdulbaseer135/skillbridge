import mongoose from 'mongoose'

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  },
  { timestamps: true },
)

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema)
