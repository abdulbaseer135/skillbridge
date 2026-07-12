export const buildPoint = (lat, lng) => ({
  type: 'Point',
  coordinates: [lng || 0, lat || 0],
})

export const withinRadius = (coordinates, radiusKm) => ({
  $geoWithin: {
    $centerSphere: [coordinates, (radiusKm || 10) / 6378.1],
  },
})
