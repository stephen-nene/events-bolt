import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './components/layouts/MainLayout';
import { DashboardLayout } from './components/layouts/DashboardLayout';

// Public pages
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// User dashboard pages
import { UserDashboardPage } from './pages/user/UserDashboardPage';
import { UserTicketsPage } from './pages/user/UserTicketsPage';
import { UserProfilePage } from './pages/user/UserProfilePage';

// Creator dashboard pages
import { CreatorDashboardPage } from './pages/creator/CreatorDashboardPage';
import { CreatorEventsPage } from './pages/creator/CreatorEventsPage';
import { CreateEventPage } from './pages/creator/CreateEventPage';
import { CreatorAnalyticsPage } from './pages/creator/CreatorAnalyticsPage';
import { CreatorSettingsPage } from './pages/creator/CreatorSettingsPage';

// Admin dashboard pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminApprovalsPage } from './pages/admin/AdminApprovalsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Protected route wrapper component
import { ProtectedRoute } from './components/authentication/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/booking-success" element={<BookingSuccessPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* User dashboard routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/my-tickets" element={<UserTicketsPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
          </Route>

          {/* Creator dashboard routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['creator', 'admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/creator" element={<CreatorDashboardPage />} />
            <Route path="/creator/events" element={<CreatorEventsPage />} />
            <Route path="/creator/create-event" element={<CreateEventPage />} />
            <Route path="/creator/analytics" element={<CreatorAnalyticsPage />} />
            <Route path="/creator/settings" element={<CreatorSettingsPage />} />
          </Route>

          {/* Admin dashboard routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/events" element={<AdminEventsPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/payments" element={<AdminPaymentsPage />} />
            <Route path="/admin/approvals" element={<AdminApprovalsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;