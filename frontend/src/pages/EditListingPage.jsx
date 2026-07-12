import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ListingForm from '../components/listings/ListingForm.jsx'
import apiClient from '../services/apiClient.js'
import Loader from '../components/common/Loader.jsx'

const EditListingPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListing = async () => {
      const response = await apiClient.get(`/listings/${id}`)
      setListing(response.data.data)
      setLoading(false)
    }
    fetchListing()
  }, [id])

  const handleUpdate = async (data) => {
    const payload = {
      ...data,
      latitude: parseFloat(data.latitude) || listing.location.coordinates[1],
      longitude: parseFloat(data.longitude) || listing.location.coordinates[0],
      radiusKm: Number(data.radiusKm),
    }
    await apiClient.patch(`/listings/${id}`, payload)
    navigate('/listings/me')
  }

  if (loading) return <Loader />
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Edit listing</h1>
      <ListingForm defaultValues={{
        type: listing.type,
        title: listing.title,
        category: listing.category,
        description: listing.description,
        availability: listing.availability,
        city: listing.location.city,
        neighborhood: listing.location.neighborhood,
        latitude: listing.location.coordinates[1],
        longitude: listing.location.coordinates[0],
        radiusKm: listing.radiusKm,
      }} onSubmit={handleUpdate} />
    </main>
  )
}

export default EditListingPage
