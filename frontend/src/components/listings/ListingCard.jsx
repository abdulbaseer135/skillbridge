import { Link } from 'react-router-dom'

const ListingCard = ({ listing }) => (
  <Link to={`/listings/${listing._id}`} className="block rounded-3xl border border-slate-200 bg-white p-5 transition hover:shadow-lg">
    <div className="mb-3 flex items-center gap-3">
      <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">{listing.type}</span>
      <span className="text-sm text-slate-500">{listing.category}</span>
    </div>
    <h3 className="text-xl font-semibold text-slate-900">{listing.title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-3">{listing.description}</p>
    <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
      <span>{listing.location.city || 'Remote'}</span>
      <span>{listing.owner?.name || 'Unknown'}</span>
    </div>
  </Link>
)

export default ListingCard
