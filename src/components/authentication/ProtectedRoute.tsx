import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: Array<'user' | 'creator' | 'admin'>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user.role === 'creator') {
      return <Navigate to="/creator" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children || <Outlet />;
};