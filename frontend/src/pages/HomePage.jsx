import { Link } from 'react-router-dom'

const HomePage = () => (
  <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
    <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
      <div className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">SkillBridge</p>
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">Local skill exchange for neighbors who teach and learn.</h1>
        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">Create a profile, publish offers or requests, discover nearby matches, and chat in real time to arrange a swap.</p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/explore" className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">Browse listings</Link>
          <Link to="/login" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Sign in</Link>
        </div>
      </div>
    </section>
  </main>
)

export default HomePage
