const EmptyState = ({ title, message }) => (
  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
    <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-sm text-slate-600">{message}</p>
  </div>
)

export default EmptyState
