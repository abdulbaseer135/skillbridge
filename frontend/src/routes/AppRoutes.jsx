import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import ExploreListingsPage from '../pages/ExploreListingsPage.jsx'
import ListingDetailsPage from '../pages/ListingDetailsPage.jsx'
import CreateListingPage from '../pages/CreateListingPage.jsx'
import EditListingPage from '../pages/EditListingPage.jsx'
import MatchesPage from '../pages/MatchesPage.jsx'
import MessagesPage from '../pages/MessagesPage.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'
import MyListingsPage from '../pages/MyListingsPage.jsx'
import ReportPage from '../pages/ReportPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx'

const AppRoutes = ({ user }) => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/explore" element={<ExploreListingsPage />} />
    <Route path="/listings/:id" element={<ListingDetailsPage />} />
    <Route path="/listings/new" element={<ProtectedRoute isAuthenticated={!!user}><CreateListingPage /></ProtectedRoute>} />
    <Route path="/listings/:id/edit" element={<ProtectedRoute isAuthenticated={!!user}><EditListingPage /></ProtectedRoute>} />
    <Route path="/matches" element={<ProtectedRoute isAuthenticated={!!user}><MatchesPage /></ProtectedRoute>} />
    <Route path="/messages" element={<ProtectedRoute isAuthenticated={!!user}><MessagesPage /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute isAuthenticated={!!user}><ProfilePage /></ProtectedRoute>} />
    <Route path="/listings/me" element={<ProtectedRoute isAuthenticated={!!user}><MyListingsPage /></ProtectedRoute>} />
    <Route path="/report" element={<ProtectedRoute isAuthenticated={!!user}><ReportPage /></ProtectedRoute>} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)

export default AppRoutes
