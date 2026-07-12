import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(500).optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  matchingRadiusKm: z.number().min(1).optional(),
})
