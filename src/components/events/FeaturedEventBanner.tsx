import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '@/types';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Clock } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

interface FeaturedEventBannerProps {
  event: Event;
}

export const FeaturedEventBanner: React.FC<FeaturedEventBannerProps> = ({ event }) => {
  return (
    <div className="relative h-[500px] overflow-hidden rounded-xl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
        <div className="max-w-2xl">
          <div className="inline-block bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
            Featured Event
          </div>
          <h2 className="text-4xl font-bold mb-4">{event.title}</h2>
          <p className="text-lg text-gray-200 mb-6 line-clamp-2">
            {event.shortDescription}
          </p>

          <div className="flex flex-wrap gap-4 mb-8 text-sm">
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-purple-400" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-purple-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-purple-400" />
              <span>{event.location.name}, {event.location.city}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              size="lg"
            >
              <Link to={`/events/${event.id}`}>Get Tickets</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white hover:bg-white/10 text-white px-6"
              size="lg"
            >
              <Link to={`/events/${event.id}`}>Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};