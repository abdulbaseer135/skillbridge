import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../services/apiClient.js'
import Loader from '../components/common/Loader.jsx'

const MyListingsPage = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      const response = await apiClient.get('/listings/me')
      setListings(response.data.data)
      setLoading(false)
    }
    fetchListings()
  }, [])

  if (loading) return <Loader />

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold text-slate-900">My listings</h1>
        <Link to="/listings/new" className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-500">Create listing</Link>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {listings.map((listing) => (
          <div key={listing._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{listing.title}</h2>
                <p className="text-sm text-slate-500">{listing.type} • {listing.category}</p>
              </div>
              <Link to={`/listings/${listing._id}/edit`} className="text-sm text-sky-600">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default MyListingsPage
