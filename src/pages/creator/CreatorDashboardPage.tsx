import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EventCard } from '@/components/events/EventCard';
import { getEventById } from '@/data/mockData';
import { 
  Calendar, 
  DollarSign, 
  UserCheck, 
  BarChart, 
  TrendingUp, 
  TicketIcon,
  Users,
  PlusCircle
} from 'lucide-react';

export const CreatorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for creator dashboard
  const creatorStats = {
    totalEvents: 8,
    activeEvents: 3,
    totalAttendees: 1250,
    totalRevenue: 24680,
    conversionRate: 4.2,
    revenueGrowth: 18.5,
  };
  
  // Mock event IDs for creator events
  const creatorEventIds = ['1', '3', '6'];
  
  // Get events created by the creator
  const creatorEvents = creatorEventIds
    .map(id => getEventById(id))
    .filter(event => event !== undefined);

  if (!user) {
    return null;
  }

  return (
    <div>
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Creator Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {user.name}! Manage your events and track performance.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/creator/create-event">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Events"
          value={creatorStats.totalEvents.toString()}
          icon={<Calendar />}
          description="All time"
        />
        <StatsCard
          title="Active Events"
          value={creatorStats.activeEvents.toString()}
          icon={<TicketIcon />}
          description="Currently live"
        />
        <StatsCard
          title="Total Attendees"
          value={creatorStats.totalAttendees.toString()}
          icon={<Users />}
          description="Across all events"
          trend={{
            value: 12.5,
            isPositive: true,
          }}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${creatorStats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign />}
          description="Gross sales"
          trend={{
            value: creatorStats.revenueGrowth,
            isPositive: true,
          }}
        />
      </div>

      {/* Performance overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue breakdown</CardDescription>
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
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Conversion Rate</span>
                <span className="font-medium">{creatorStats.conversionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${creatorStats.conversionRate * 10}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                <span className="text-xs text-emerald-500 mr-1">
                  ↑ 1.2%
                </span>
                from last month
              </p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Attendee Satisfaction</span>
                <span className="font-medium">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: '96%' }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <UserCheck className="h-3 w-3 mr-1 text-emerald-500" />
                Based on 240 reviews
              </p>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                  <p className="text-xs text-muted-foreground">Avg. Ticket Price</p>
                  <p className="font-medium">$85</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                  <p className="text-xs text-muted-foreground">Avg. Attendance</p>
                  <p className="font-medium">156</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent events */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Events</h2>
          <Link to="/creator/events" className="text-sm text-purple-600 hover:text-purple-800">
            View all events
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creatorEvents.map(event => (
            event && <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};