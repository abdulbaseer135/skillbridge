import { Link } from 'react-router-dom'

const DashboardSidebar = () => (
  <aside className="hidden w-72 shrink-0 space-y-3 rounded-3xl border border-slate-200 bg-white p-5 lg:block">
    <div className="font-semibold text-slate-900">Dashboard</div>
    <nav className="space-y-2 text-sm text-slate-600">
      <Link to="/listings/me" className="block rounded-2xl px-3 py-2 hover:bg-slate-50">My listings</Link>
      <Link to="/matches" className="block rounded-2xl px-3 py-2 hover:bg-slate-50">Matches</Link>
      <Link to="/messages" className="block rounded-2xl px-3 py-2 hover:bg-slate-50">Messages</Link>
      <Link to="/report" className="block rounded-2xl px-3 py-2 hover:bg-slate-50">Report</Link>
    </nav>
  </aside>
)

export default DashboardSidebar
