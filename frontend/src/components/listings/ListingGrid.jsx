import ListingCard from './ListingCard.jsx'

const ListingGrid = ({ listings }) => {
  if (!listings?.length) {
    return <p className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">No listings found</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  )
}

export default ListingGrid
