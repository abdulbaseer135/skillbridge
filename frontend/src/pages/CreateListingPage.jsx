import { useNavigate } from 'react-router-dom'
import ListingForm from '../components/listings/ListingForm.jsx'
import apiClient from '../services/apiClient.js'

const CreateListingPage = () => {
  const navigate = useNavigate()

  const handleCreate = async (data) => {
    const payload = {
      ...data,
      latitude: parseFloat(data.latitude) || 0,
      longitude: parseFloat(data.longitude) || 0,
      radiusKm: Number(data.radiusKm),
    }
    await apiClient.post('/listings', payload)
    navigate('/listings/me')
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Create listing</h1>
      <ListingForm onSubmit={handleCreate} />
    </main>
  )
}

export default CreateListingPage
