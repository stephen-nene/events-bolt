import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EventCard } from '@/components/events/EventCard';
import { getBookingsByUserId, getEventForBooking, getEventById, events } from '@/data/mockData';
import { formatShortDate } from '@/utils/formatDate';
import { Booking, Event } from '@/types';
import { TicketIcon, Calendar, Clock, DollarSign } from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [recommendedEvents, setRecommendedEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (user) {
      // Get user bookings
      const bookings = getBookingsByUserId(user.id);
      setUserBookings(bookings);
      
      // Get events for user bookings
      const userEventIds = bookings.map(booking => booking.eventId);
      const bookedEvents = userEventIds
        .map(id => getEventById(id))
        .filter(event => event !== undefined) as Event[];
      
      // Get upcoming events (events with dates in the future)
      const today = new Date();
      const upcoming = bookedEvents
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      setUpcomingEvents(upcoming);
      
      // Get recommended events (events not booked by user)
      const recommendedEvts = events
        .filter(event => !userEventIds.includes(event.id))
        .sort(() => 0.5 - Math.random()) // Shuffle array
        .slice(0, 3); // Get first 3 events
      
      setRecommendedEvents(recommendedEvts);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here's an overview of your upcoming events and activity.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Upcoming Events"
          value={upcomingEvents.length.toString()}
          icon={<Calendar />}
          description="Events you're attending"
        />
        <StatsCard
          title="Past Events"
          value={(userBookings.length - upcomingEvents.length).toString()}
          icon={<Clock />}
          description="Events you've attended"
        />
        <StatsCard
          title="Total Tickets"
          value={userBookings.reduce((sum, booking) => sum + booking.quantity, 0).toString()}
          icon={<TicketIcon />}
          description="Tickets purchased"
        />
        <StatsCard
          title="Total Spent"
          value={`$${userBookings.reduce((sum, booking) => sum + booking.totalPrice, 0)}`}
          icon={<DollarSign />}
          description="On event tickets"
        />
      </div>

      {/* Upcoming events section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Upcoming Events</h2>
          <Link to="/my-tickets" className="text-sm text-purple-600 hover:text-purple-800">
            View all tickets
          </Link>
        </div>
        
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
              <p className="text-muted-foreground mb-4">
                You haven't booked any upcoming events yet. Explore our event listings to find something you'll love!
              </p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link to="/events">Explore Events</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recommended events section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity Feed</CardTitle>
            <CardDescription>Your recent bookings and interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userBookings.length > 0 ? (
                userBookings.map(booking => {
                  const event = getEventForBooking(booking);
                  if (!event) return null;
                  
                  return (
                    <div key={booking.id} className="flex items-center p-3 border rounded-md">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <TicketIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">
                          You booked {booking.quantity} ticket{booking.quantity > 1 ? 's' : ''} for{' '}
                          <Link to={`/events/${event.id}`} className="text-purple-600 hover:text-purple-800">
                            {event.title}
                          </Link>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.createdAt).toLocaleDateString()} • {formatShortDate(event.date)}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No recent activity to show</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};