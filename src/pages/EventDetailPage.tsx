import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEventById } from '@/data/mockData';
import { Event } from '@/types';
import { Button } from '@/components/ui/button';
import { BookingForm } from '@/components/bookings/BookingForm';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Share2,
  Star,
  Calendar,
  Info,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { useToast } from '@/hooks/use-toast';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      // Fetch event details
      const fetchedEvent = getEventById(id);
      if (fetchedEvent) {
        setEvent(fetchedEvent);
      } else {
        navigate('/events', { replace: true });
        toast({
          title: 'Event not found',
          description: 'The event you are looking for does not exist',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }
  }, [id, navigate, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-28 pb-16 flex justify-center">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  // Format capacity percentage
  const capacityPercentage = Math.round((event.attendees / event.capacity) * 100);
  
  // Get badge variant based on event type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'hackathon':
        return 'default';
      case 'concert':
        return 'secondary';
      case 'conference':
        return 'outline';
      case 'party':
        return 'destructive';
      case 'meetup':
        return 'default';
      case 'workshop':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Event header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <div>
            <div className="mb-2">
              <Badge variant={getBadgeVariant(event.type)} className="capitalize">
                {event.type}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Event content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Event details */}
          <div className="lg:col-span-2">
            {/* Event image */}
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Event meta info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Date</span>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-purple-600" />
                  <span>{formatDate(event.date)}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Time</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-purple-600" />
                  <span>{event.time}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Price</span>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-purple-600" />
                  <span>{formatPrice(event.price, event.currency)}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Capacity</span>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-purple-600" />
                  <span>{event.attendees} / {event.capacity}</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Event description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About this event</h2>
              <p className="whitespace-pre-line">{event.description}</p>
            </div>

            <Separator className="my-6" />

            {/* Event location */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="mb-2 flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{event.location.name}</p>
                  <p className="text-muted-foreground">
                    {event.location.address}, {event.location.city}, {event.location.state} {event.location.zipCode}
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden h-64 mt-4 bg-gray-200">
                {/* Map placeholder - would be replaced with actual map */}
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-muted-foreground">Map would be displayed here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Booking form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm event={event} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};