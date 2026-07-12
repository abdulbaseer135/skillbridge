import { Link } from 'react-router-dom'

const Navbar = ({ user }) => (
  <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
      <Link to="/" className="text-xl font-semibold text-slate-900">SkillBridge</Link>
      <nav className="flex items-center gap-4 text-sm text-slate-600">
        <Link to="/explore">Explore</Link>
        <Link to="/matches">Matches</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/profile">Profile</Link>
        {user ? <Link to="/listings/me">My Listings</Link> : <Link to="/login">Login</Link>}
      </nav>
    </div>
  </header>
)

export default Navbar
