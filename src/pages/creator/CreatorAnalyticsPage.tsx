import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { BarChartIcon, LineChart, Download, Users, DollarSign, TicketIcon, Calendar } from 'lucide-react';

export const CreatorAnalyticsPage: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track performance metrics for your events
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" size="sm">Last 7 days</Button>
            <Button variant="outline" size="sm">Last 30 days</Button>
            <Button variant="outline" size="sm">Last 90 days</Button>
            <Button variant="outline" size="sm">All time</Button>
          </div>
        </div>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Revenue"
              value="$24,680"
              icon={<DollarSign />}
              description="All time"
              trend={{
                value: 18.5,
                isPositive: true,
              }}
            />
            <StatsCard
              title="Total Attendees"
              value="1,250"
              icon={<Users />}
              description="Across all events"
              trend={{
                value: 12.5,
                isPositive: true,
              }}
            />
            <StatsCard
              title="Avg. Ticket Price"
              value="$85"
              icon={<TicketIcon />}
              description="Per event"
              trend={{
                value: 5.2,
                isPositive: true,
              }}
            />
            <StatsCard
              title="Upcoming Events"
              value="3"
              icon={<Calendar />}
              description="Next 90 days"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue across all events</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
                  <LineChart className="h-16 w-16 text-muted-foreground" />
                  <p className="text-muted-foreground ml-4">Revenue chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top Performing Events</CardTitle>
                <CardDescription>By revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-6">
                  {[
                    { name: 'TechCrunch Disrupt 2025', revenue: '$8,940', attendees: 320, color: 'bg-purple-600' },
                    { name: 'Summer Music Festival', revenue: '$7,350', attendees: 210, color: 'bg-teal-500' },
                    { name: 'Blockchain & Crypto Summit', revenue: '$4,590', attendees: 170, color: 'bg-amber-500' },
                  ].map((event, index) => (
                    <li key={index} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-muted-foreground">{event.revenue} • {event.attendees} attendees</p>
                        </div>
                        <span className="text-sm font-medium">#{index + 1}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${event.color}`}
                          style={{ width: `${100 - index * 20}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendee Demographics</CardTitle>
                <CardDescription>Age and location breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
                  <BarChartIcon className="h-16 w-16 text-muted-foreground" />
                  <p className="text-muted-foreground ml-4">Demographics chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your attendees come from</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
                  <BarChartIcon className="h-16 w-16 text-muted-foreground" />
                  <p className="text-muted-foreground ml-4">Traffic sources chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Sales Tab */}
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Detailed sales breakdown for all events</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex justify-center items-center h-full">
                <p className="text-muted-foreground">Sales data would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Attendees Tab */}
        <TabsContent value="attendees">
          <Card>
            <CardHeader>
              <CardTitle>Attendee Analytics</CardTitle>
              <CardDescription>Detailed attendee data for all events</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex justify-center items-center h-full">
                <p className="text-muted-foreground">Attendee data would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Event Performance</CardTitle>
              <CardDescription>Detailed performance metrics for each event</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex justify-center items-center h-full">
                <p className="text-muted-foreground">Event performance data would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Marketing Insights</CardTitle>
          <CardDescription>
            Recommendations to help increase event visibility and attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium mb-1">Promote on Social Media</h4>
              <p className="text-sm text-muted-foreground">
                Your events get 40% more visibility when shared on social media platforms. 
                Consider creating a social media campaign for your upcoming events.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium mb-1">Early Bird Discounts</h4>
              <p className="text-sm text-muted-foreground">
                Events with early bird discounts see a 25% increase in early ticket sales. 
                Consider offering tiered pricing for your next event.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium mb-1">Email Campaigns</h4>
              <p className="text-sm text-muted-foreground">
                Regular email updates to your past attendees have a 15% conversion rate. 
                Create an email list to notify people about your upcoming events.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};