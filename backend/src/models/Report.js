import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema(
  {
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetListing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
    reason: { type: String, required: true, trim: true },
    details: { type: String, trim: true },
  },
  { timestamps: true },
)

export default mongoose.models.Report || mongoose.model('Report', ReportSchema)
