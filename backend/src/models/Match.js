import mongoose from 'mongoose'

const MatchSchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    matchedListing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export default mongoose.models.Match || mongoose.model('Match', MatchSchema)
