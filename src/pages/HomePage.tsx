import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FeaturedEventBanner } from '@/components/events/FeaturedEventBanner';
import { EventCard } from '@/components/events/EventCard';
import { events, getFeaturedEvents, getEventsByType } from '@/data/mockData';
import { SearchIcon, CalendarDays, MapPin, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Event } from '@/types';

export const HomePage: React.FC = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Load featured events
    setFeaturedEvents(getFeaturedEvents());
    
    // Load upcoming events (sorted by date)
    const sortedEvents = [...events].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    setUpcomingEvents(sortedEvents.slice(0, 6));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero section with search */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Discover Events That <br className="hidden sm:block" /> Make Life Memorable
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-purple-100">
            From tech conferences to music festivals, find the perfect events to match your interests.
          </p>
          
          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="flex">
              <Input
                type="text"
                placeholder="Search for events, topics, or locations..."
                className="w-full h-12 pl-12 rounded-l-lg text-gray-900 border-0"
              />
              <Button className="h-12 rounded-l-none bg-purple-800 hover:bg-purple-900">
                Search
              </Button>
            </div>
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Popular searches */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-purple-200">Popular:</span>
            <Link to="/events/hackathon" className="text-sm text-white hover:text-purple-200">Hackathons</Link>
            <span className="text-purple-300">•</span>
            <Link to="/events/concert" className="text-sm text-white hover:text-purple-200">Concerts</Link>
            <span className="text-purple-300">•</span>
            <Link to="/events/conference" className="text-sm text-white hover:text-purple-200">Tech Conferences</Link>
            <span className="text-purple-300">•</span>
            <Link to="/events/workshop" className="text-sm text-white hover:text-purple-200">Workshops</Link>
          </div>
        </div>
      </section>

      {/* Featured event banner */}
      {featuredEvents.length > 0 && (
        <section className="py-12 container mx-auto px-4 sm:px-6 -mt-16">
          <FeaturedEventBanner event={featuredEvents[0]} />
        </section>
      )}

      {/* Event categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Browse Events by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { type: 'hackathon', label: 'Hackathons', icon: <TrendingUp className="h-8 w-8 mb-2" /> },
              { type: 'conference', label: 'Conferences', icon: <CalendarDays className="h-8 w-8 mb-2" /> },
              { type: 'concert', label: 'Concerts', icon: <SearchIcon className="h-8 w-8 mb-2" /> },
              { type: 'meetup', label: 'Meetups', icon: <MapPin className="h-8 w-8 mb-2" /> },
              { type: 'party', label: 'Parties', icon: <CalendarDays className="h-8 w-8 mb-2" /> },
              { type: 'workshop', label: 'Workshops', icon: <TrendingUp className="h-8 w-8 mb-2" /> },
            ].map((category) => (
              <Link
                key={category.type}
                to={`/events?type=${category.type}`}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center">
                  {category.icon}
                  <h3 className="font-medium">{category.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link
              to="/events"
              className="text-purple-600 font-medium hover:text-purple-800 transition-colors"
            >
              View all events
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link to="/events">Explore All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA for event creators */}
      <section className="py-16 bg-purple-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Create Your Own Event</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Have an idea for an event? Start planning and hosting your own events on our platform.
              From hackathons to workshops, reach your audience and manage everything in one place.
            </p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};