import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getBookingsByUserId, getEventForBooking } from '@/data/mockData';
import { formatDate } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { Booking, Event } from '@/types';
import { Calendar, Clock, Download, Share2 } from 'lucide-react';

interface TicketEvent extends Booking {
  event: Event;
  isPast: boolean;
}

export const UserTicketsPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<TicketEvent[]>([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    if (user) {
      // Get user bookings
      const bookings = getBookingsByUserId(user.id);
      
      // Merge booking and event data
      const ticketsWithEvents = bookings.map(booking => {
        const event = getEventForBooking(booking);
        if (!event) return null;
        
        const today = new Date();
        const eventDate = new Date(event.date);
        const isPast = eventDate < today;
        
        return {
          ...booking,
          event,
          isPast,
        };
      }).filter(ticket => ticket !== null) as TicketEvent[];
      
      setTickets(ticketsWithEvents);
    }
  }, [user]);

  const upcomingTickets = tickets.filter(ticket => !ticket.isPast);
  const pastTickets = tickets.filter(ticket => ticket.isPast);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
        <p className="text-muted-foreground">
          Manage and view all your event tickets in one place.
        </p>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">
            Upcoming Events ({upcomingTickets.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past Events ({pastTickets.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} isPast={false} />
              ))}
            </div>
          ) : (
            <NoTicketsPlaceholder type="upcoming" />
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastTickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} isPast={true} />
              ))}
            </div>
          ) : (
            <NoTicketsPlaceholder type="past" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TicketCardProps {
  ticket: TicketEvent;
  isPast: boolean;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, isPast }) => {
  const { event, quantity, id: ticketId, totalPrice } = ticket;
  
  return (
    <Card>
      <div className="aspect-[3/1] relative rounded-t-lg overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-4 text-white">
          <p className="text-xs">Booking ID: {ticketId}</p>
        </div>
      </div>
      
      <CardHeader className="pt-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{event.title}</CardTitle>
          <Badge variant={isPast ? "outline" : "default"}>
            {isPast ? "Past" : "Upcoming"}
          </Badge>
        </div>
        <CardDescription>
          {quantity} {quantity > 1 ? 'tickets' : 'ticket'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Date</p>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium">{formatDate(event.date)}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Time</p>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium">{event.time}</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Ticket price</p>
            <p className="font-medium">{formatPrice(totalPrice, event.currency)}</p>
          </div>
          <Link to={`/events/${event.id}`}>
            <Button variant="outline" size="sm">View Event</Button>
          </Link>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="flex w-full justify-between">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Ticket
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

interface NoTicketsPlaceholderProps {
  type: 'upcoming' | 'past';
}

const NoTicketsPlaceholder: React.FC<NoTicketsPlaceholderProps> = ({ type }) => {
  return (
    <Card>
      <CardContent className="py-8 text-center">
        <div className="flex justify-center mb-4">
          <Calendar className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">
          No {type} tickets found
        </h3>
        <p className="text-muted-foreground mb-4">
          {type === 'upcoming'
            ? "You don't have any upcoming event tickets. Book your next experience now!"
            : "You haven't attended any events yet. Start exploring events to attend!"}
        </p>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link to="/events">Explore Events</Link>
        </Button>
      </CardContent>
    </Card>
  );
};