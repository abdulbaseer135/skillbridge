import mongoose from 'mongoose'

const LocationSchema = new mongoose.Schema({
  city: { type: String, default: '' },
  neighborhood: { type: String, default: '' },
  coordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
})

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: LocationSchema, default: () => ({}) },
    matchingRadiusKm: { type: Number, default: 10 },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true },
)

UserSchema.index({ 'location.coordinates': '2dsphere' })

export default mongoose.models.User || mongoose.model('User', UserSchema)
