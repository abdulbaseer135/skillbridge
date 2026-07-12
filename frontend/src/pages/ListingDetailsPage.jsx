import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../services/apiClient.js'
import Loader from '../components/common/Loader.jsx'

const ListingDetailsPage = () => {
  const { id } = useParams()
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

  if (loading) return <Loader />
  if (!listing) return <p className="p-8 text-center text-slate-500">Listing not found</p>

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{listing.title}</h1>
            <p className="mt-2 text-sm text-slate-500">{listing.type} • {listing.category}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{listing.status}</span>
        </div>
        <p className="text-slate-700">{listing.description}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Location</p>
            <p className="mt-2 text-slate-900">{listing.location.city}, {listing.location.neighborhood}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Availability</p>
            <p className="mt-2 text-slate-900">{listing.availability || 'Flexible'}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ListingDetailsPage
