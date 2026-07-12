const Input = ({ label, error, className = '', ...props }) => {
  return (
    <label className={`block text-left text-sm font-medium text-slate-700 ${className}`}>
      {label && <span className="mb-1 block">{label}</span>}
      <input className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100" {...props} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  )
}

export default Input
