import mongoose from 'mongoose'

const ListingSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['offer', 'request'], required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    description: { type: String, required: true, trim: true },
    availability: { type: String, default: '' },
    location: {
      city: { type: String, default: '' },
      neighborhood: { type: String, default: '' },
      coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] },
      },
    },
    radiusKm: { type: Number, default: 10 },
    status: { type: String, enum: ['active', 'closed'], default: 'active' },
  },
  { timestamps: true },
)

ListingSchema.index({ 'location.coordinates': '2dsphere' })

export default mongoose.models.Listing || mongoose.model('Listing', ListingSchema)
