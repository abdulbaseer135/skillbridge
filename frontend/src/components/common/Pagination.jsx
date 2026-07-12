const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  return (
    <div className="mt-6 flex justify-center gap-2">
      <button className="rounded-xl border px-3 py-2 text-sm" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <span className="inline-flex items-center rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
        Page {page} of {totalPages}
      </span>
      <button className="rounded-xl border px-3 py-2 text-sm" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  )
}

export default Pagination
