const MatchCard = ({ match }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <span className="font-semibold text-slate-900">{match.listing.title}</span>
      <span className="text-sm text-slate-500">{match.matchedListing.type} in {match.matchedListing.category}</span>
    </div>
    <p className="text-sm text-slate-600">{match.matchedListing.description}</p>
  </div>
)

export default MatchCard
