import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  User, 
  ShieldAlert, 
  BarChart, 
  Activity, 
  TicketIcon,
  Bell,
  ArrowRight,
  ChevronRight,
  ListChecks
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for admin dashboard
  const platformStats = {
    totalUsers: 8264,
    totalEvents: 342,
    totalRevenue: 156840,
    pendingApprovals: 7,
    revenueGrowth: 12.4,
    userGrowth: 8.7,
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {user.name}! Here's an overview of the platform performance.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Users"
          value={platformStats.totalUsers.toLocaleString()}
          icon={<Users />}
          description="All platform users"
          trend={{
            value: platformStats.userGrowth,
            isPositive: true,
          }}
        />
        <StatsCard
          title="Total Events"
          value={platformStats.totalEvents.toLocaleString()}
          icon={<Calendar />}
          description="Active and past events"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${platformStats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign />}
          description="Gross platform sales"
          trend={{
            value: platformStats.revenueGrowth,
            isPositive: true,
          }}
        />
        <StatsCard
          title="Pending Approvals"
          value={platformStats.pendingApprovals.toString()}
          icon={<ShieldAlert />}
          description="Events requiring review"
        />
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <ListChecks className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="font-medium mb-1">Pending Approvals</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {platformStats.pendingApprovals} events waiting for your review
                  </p>
                </div>
                <Badge variant={platformStats.pendingApprovals > 0 ? "destructive" : "outline"}>
                  {platformStats.pendingApprovals > 0 ? 'Action Needed' : 'None'}
                </Badge>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/approvals">
                  Review Events
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <Users className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="font-medium mb-1">User Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage users, roles, and permissions
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/users">
                  Manage Users
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <BarChart className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="font-medium mb-1">Revenue Reports</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    View financial reports and analytics
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/payments">
                  View Reports
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Platform performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Revenue</CardTitle>
            <CardDescription>Monthly revenue overview</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
              <BarChart className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground ml-4">Revenue chart would be displayed here</p>
            </div>
          </CardContent>
        </Card>

        {/* Key metrics */}
        <Card>
          <CardHeader>
            <CardTitle>User Acquisition</CardTitle>
            <CardDescription>New user registrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Regular Users</span>
                <span className="text-sm font-medium">6,482</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: '78%' }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Event Creators</span>
                <span className="text-sm font-medium">1,754</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{ width: '21%' }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Admins</span>
                <span className="text-sm font-medium">28</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: '1%' }}
                />
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Growth Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                  <p className="text-xs text-muted-foreground">User Retention</p>
                  <p className="font-medium">92%</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                  <p className="text-xs text-muted-foreground">Conversion Rate</p>
                  <p className="font-medium">3.2%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent events */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Events</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/events">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'TechCrunch Disrupt 2025', date: '2025-08-15', status: 'approved', type: 'conference' },
                { name: 'Summer Music Festival', date: '2025-07-10', status: 'approved', type: 'concert' },
                { name: 'UX Design Workshop', date: '2025-04-15', status: 'pending', type: 'workshop' },
                { name: 'Startup Networking Mixer', date: '2025-05-22', status: 'approved', type: 'meetup' },
              ].map((event, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{event.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} • {event.type}
                      </p>
                    </div>
                  </div>
                  <Badge variant={event.status === 'approved' ? "default" : "outline"}>
                    {event.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* System activity */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>System Activity</CardTitle>
              <Button variant="ghost" size="sm">
                View logs <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'User registered', time: '5 minutes ago', icon: <User /> },
                { action: 'New event submitted for approval', time: '1 hour ago', icon: <Calendar /> },
                { action: 'Payment processed', time: '3 hours ago', icon: <DollarSign /> },
                { action: 'System maintenance scheduled', time: '1 day ago', icon: <Activity /> },
              ].map((activity, index) => (
                <div key={index} className="flex p-3 border rounded-md">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                    {React.cloneElement(activity.icon as React.ReactElement, {
                      className: "h-5 w-5 text-gray-600 dark:text-gray-400"
                    })}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};