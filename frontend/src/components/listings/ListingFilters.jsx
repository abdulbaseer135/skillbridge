const ListingFilters = ({ filters, onChange }) => {
  return (
    <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
      <label className="block text-sm font-medium text-slate-700">
        Keyword
        <input name="keyword" value={filters.keyword} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm" />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Category
        <input name="category" value={filters.category} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm" />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Type
        <select name="type" value={filters.type} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm">
          <option value="">All</option>
          <option value="offer">Offer</option>
          <option value="request">Request</option>
        </select>
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Radius (km)
        <input name="radiusKm" type="number" value={filters.radiusKm} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm" />
      </label>
    </div>
  )
}

export default ListingFilters
