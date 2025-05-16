import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPin, Users, Clock } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  // Define badge color based on event type
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

  // Helper to format price display
  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return 'Free';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  // Create percentage of capacity filled
  const capacityPercentage = Math.round((event.attendees / event.capacity) * 100);
  
  return (
    <Card 
      className={`group overflow-hidden transition-all duration-300 hover:shadow-lg ${
        featured ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
    >
      <Link to={`/events/${event.id}`} className="block">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={getBadgeVariant(event.type)} className="capitalize">
              {event.type}
            </Badge>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-5">
        <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-3">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{event.time}</span>
          </div>
        </div>
        
        <Link to={`/events/${event.id}`} className="block">
          <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-purple-600">
            {event.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {event.shortDescription}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{event.location.city}, {event.location.state}</span>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Capacity
            </span>
            <span className="font-medium">{capacityPercentage}% Full</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${capacityPercentage > 90 ? 'bg-red-500' : capacityPercentage > 70 ? 'bg-orange-500' : 'bg-green-500'}`}
              style={{ width: `${capacityPercentage}%` }}
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-4 border-t flex justify-between items-center">
        <div className="font-bold text-lg">
          {formatPrice(event.price, event.currency)}
        </div>
        <Link 
          to={`/events/${event.id}`}
          className="text-purple-600 font-medium text-sm hover:text-purple-800 transition-colors"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};