import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, LayoutDashboard, Users, CreditCard, Settings, TicketIcon, PlusCircle, BarChart, ListChecks } from 'lucide-react';

const NavItem = ({
  to,
  icon: Icon,
  label,
  active,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}) => (
  <Link
    to={to}
    className={cn(
      'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
      active
        ? 'bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-50'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    )}
  >
    <Icon className={cn('h-5 w-5', active ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400')} />
    <span>{label}</span>
  </Link>
);

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // User-specific navigation items
  const userNavItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/my-tickets', icon: TicketIcon, label: 'My Tickets' },
    { to: '/profile', icon: Settings, label: 'Account Settings' },
  ];

  // Creator-specific navigation items
  const creatorNavItems = [
    { to: '/creator', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/creator/events', icon: Calendar, label: 'My Events' },
    { to: '/creator/create-event', icon: PlusCircle, label: 'Create Event' },
    { to: '/creator/analytics', icon: BarChart, label: 'Analytics' },
    { to: '/creator/settings', icon: Settings, label: 'Settings' },
  ];

  // Admin-specific navigation items
  const adminNavItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/events', icon: Calendar, label: 'All Events' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
    { to: '/admin/approvals', icon: ListChecks, label: 'Event Approvals' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  // Select navigation items based on user role
  const navItems = user?.role === 'admin'
    ? adminNavItems
    : user?.role === 'creator'
      ? creatorNavItems
      : userNavItems;

  return (
    <div className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 h-screen p-5 hidden md:block">
      <div className="flex items-center mb-8">
        <Calendar className="h-8 w-8 text-purple-600" />
        <span className="ml-2 text-xl font-bold tracking-tight">EventHub</span>
      </div>
      <div className="space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={isActive(item.to)}
          />
        ))}
      </div>
    </div>
  );
};