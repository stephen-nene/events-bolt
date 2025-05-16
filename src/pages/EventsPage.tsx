import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { events as allEvents } from '@/data/mockData';
import { EventCard } from '@/components/events/EventCard';
import { EventTypeFilter } from '@/components/events/EventTypeFilter';
import { Event, EventType } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchIcon, Calendar, X } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get('type') as EventType | null;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<EventType | null>(initialType);
  const [sortOption, setSortOption] = useState<string>('date');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(allEvents);

  // Filter and sort events based on selected filters
  useEffect(() => {
    let result = [...allEvents];
    
    // Filter by event type
    if (selectedType) {
      result = result.filter(event => event.type === selectedType);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        event =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.city.toLowerCase().includes(query) ||
          event.location.state.toLowerCase().includes(query)
      );
    }
    
    // Sort events
    switch (sortOption) {
      case 'date':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        result.sort((a, b) => (b.attendees / b.capacity) - (a.attendees / a.capacity));
        break;
      default:
        break;
    }
    
    setFilteredEvents(result);
  }, [selectedType, searchQuery, sortOption]);

  const handleTypeChange = (type: EventType | null) => {
    setSelectedType(type);
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Events</h1>
          <p className="text-muted-foreground">
            Discover amazing events happening around you
          </p>
        </div>

        {/* Search and filter section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search input */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search events, locations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Date filter - placeholder for future implementation */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Select date range"
                className="pl-10"
                disabled
              />
            </div>
            
            {/* Sort options */}
            <div>
              <Label htmlFor="sort" className="sr-only">Sort by</Label>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Soonest)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Event type filter */}
          <EventTypeFilter selectedType={selectedType} onSelectType={handleTypeChange} />
          
          {/* Active filters */}
          {(selectedType || searchQuery) && (
            <div className="flex items-center mt-4">
              <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
              {selectedType && (
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-3 py-1 rounded-full flex items-center mr-2">
                  <span className="capitalize">{selectedType}</span>
                  <button
                    onClick={() => setSelectedType(null)}
                    className="ml-1.5 hover:text-purple-900 dark:hover:text-purple-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {searchQuery && (
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-3 py-1 rounded-full flex items-center mr-2">
                  <span>"{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1.5 hover:text-purple-900 dark:hover:text-purple-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Event grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};