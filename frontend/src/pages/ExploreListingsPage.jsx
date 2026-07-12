import { useEffect, useState } from 'react'
import ListingFilters from '../components/listings/ListingFilters.jsx'
import ListingGrid from '../components/listings/ListingGrid.jsx'
import apiClient from '../services/apiClient.js'

const ExploreListingsPage = () => {
  const [filters, setFilters] = useState({ keyword: '', category: '', type: '', radiusKm: 20 })
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      const params = new URLSearchParams(filters)
      const response = await apiClient.get(`/listings/search?${params.toString()}`)
      setListings(response.data.data)
    }
    fetchListings()
  }, [filters])

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Explore listings</h1>
      <ListingFilters filters={filters} onChange={handleChange} />
      <div className="mt-6">
        <ListingGrid listings={listings} />
      </div>
    </main>
  )
}

export default ExploreListingsPage
