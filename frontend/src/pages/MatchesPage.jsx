import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient.js'
import MatchCard from '../components/matches/MatchCard.jsx'
import EmptyState from '../components/common/EmptyState.jsx'

const MatchesPage = () => {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await apiClient.get('/matches')
      setMatches(response.data.data)
    }
    fetchMatches()
  }, [])

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Suggested matches</h1>
      {matches.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {matches.map((match) => (<MatchCard key={`${match.listing._id}-${match.matchedListing._id}`} match={match} />))}
        </div>
      ) : (
        <EmptyState title="No matches yet" message="Create a listing or adjust your profile to find offers and requests nearby." />
      )}
    </main>
  )
}

export default MatchesPage
