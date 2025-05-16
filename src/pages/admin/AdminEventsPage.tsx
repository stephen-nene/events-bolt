import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { events } from '@/data/mockData';
import { Event } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { 
  Calendar, 
  Edit, 
  Trash, 
  Eye, 
  Clock, 
  MapPin, 
  Users, 
  SearchIcon,
  ArrowUpDown,
  AlertCircle,
  MoreVertical,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

export const AdminEventsPage: React.FC = () => {
  const [allEvents, setAllEvents] = useState<Event[]>(events);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortOption, setSortOption] = useState('date-asc');
  const { toast } = useToast();
  
  // Handle search and filtering
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    applyFilters(query, statusFilter, typeFilter);
  };
  
  // Filter events by status
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchQuery, status, typeFilter);
  };
  
  // Filter events by type
  const handleTypeFilterChange = (type: string) => {
    setTypeFilter(type);
    applyFilters(searchQuery, statusFilter, type);
  };
  
  const applyFilters = (query: string, status: string, type: string) => {
    let result = [...allEvents];
    
    // Search filter
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(lowercaseQuery) ||
        event.location.city.toLowerCase().includes(lowercaseQuery) ||
        event.type.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Status filter (we'll use capacity as a mock for status)
    if (status !== 'all') {
      const today = new Date();
      const eventDate = new Date();
      
      if (status === 'upcoming') {
        result = result.filter(event => new Date(event.date) >= today);
      } else if (status === 'past') {
        result = result.filter(event => new Date(event.date) < today);
      } else if (status === 'featured') {
        result = result.filter(event => event.isFeatured);
      }
    }
    
    // Type filter
    if (type !== 'all') {
      result = result.filter(event => event.type === type);
    }
    
    // Apply sorting
    applySorting(result, sortOption);
  };
  
  // Handle sorting
  const handleSortChange = (option: string) => {
    setSortOption(option);
    applySorting(filteredEvents, option);
  };
  
  const applySorting = (eventsToSort: Event[], option: string) => {
    const sortedEvents = [...eventsToSort];
    
    switch (option) {
      case 'date-asc':
        sortedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        sortedEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'title-asc':
        sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        sortedEvents.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'attendees-desc':
        sortedEvents.sort((a, b) => b.attendees - a.attendees);
        break;
      case 'price-desc':
        sortedEvents.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setFilteredEvents(sortedEvents);
  };
  
  // Handle delete event
  const handleDeleteEvent = (eventId: string, eventTitle: string) => {
    // In a real app, this would make an API call to delete the event
    const updatedEvents = allEvents.filter(event => event.id !== eventId);
    setAllEvents(updatedEvents);
    setFilteredEvents(filteredEvents.filter(event => event.id !== eventId));
    
    toast({
      title: "Event deleted",
      description: `"${eventTitle}" has been successfully deleted.`,
      variant: "default",
    });
  };
  
  // Handle feature/unfeature event
  const handleToggleFeature = (eventId: string, isFeatured: boolean) => {
    // Update the events array
    const updatedEvents = allEvents.map(event => {
      if (event.id === eventId) {
        return { ...event, isFeatured: !isFeatured };
      }
      return event;
    });
    
    setAllEvents(updatedEvents);
    
    // Update filtered events
    const updatedFilteredEvents = filteredEvents.map(event => {
      if (event.id === eventId) {
        return { ...event, isFeatured: !isFeatured };
      }
      return event;
    });
    
    setFilteredEvents(updatedFilteredEvents);
    
    toast({
      title: isFeatured ? "Event unfeatured" : "Event featured",
      description: `The event has been ${isFeatured ? 'removed from' : 'added to'} featured events.`,
      variant: "default",
    });
  };

  // Get event status
  const getEventStatus = (event: Event): { status: string; color: string } => {
    const today = new Date();
    const eventDate = new Date(event.date);
    
    if (eventDate < today) {
      return { status: 'Past', color: 'bg-gray-500' };
    } else if (event.attendees >= event.capacity) {
      return { status: 'Sold Out', color: 'bg-amber-500' };
    } else if (eventDate.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return { status: 'Soon', color: 'bg-green-500' };
    } else {
      return { status: 'Upcoming', color: 'bg-emerald-500' };
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Events</h1>
        <p className="text-muted-foreground">
          Manage and monitor all events on the platform
        </p>
      </div>

      {/* Filters and search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search input */}
            <div className="relative">
              <Label htmlFor="search-events" className="sr-only">Search Events</Label>
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="search-events"
                placeholder="Search events..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            
            {/* Status filter */}
            <div>
              <Label htmlFor="status-filter" className="sr-only">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="upcoming">Upcoming Events</SelectItem>
                  <SelectItem value="past">Past Events</SelectItem>
                  <SelectItem value="featured">Featured Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Type filter */}
            <div>
              <Label htmlFor="type-filter" className="sr-only">Filter by Type</Label>
              <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="conference">Conferences</SelectItem>
                  <SelectItem value="hackathon">Hackathons</SelectItem>
                  <SelectItem value="concert">Concerts</SelectItem>
                  <SelectItem value="meetup">Meetups</SelectItem>
                  <SelectItem value="party">Parties</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Sort options */}
            <div>
              <Label htmlFor="sort-options" className="sr-only">Sort Events</Label>
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger id="sort-options">
                  <SelectValue placeholder="Sort events" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-asc">Date (Oldest first)</SelectItem>
                  <SelectItem value="date-desc">Date (Newest first)</SelectItem>
                  <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                  <SelectItem value="attendees-desc">Most Attendees</SelectItem>
                  <SelectItem value="price-desc">Highest Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active filters */}
          <div className="flex items-center flex-wrap gap-2 mt-4">
            {(statusFilter !== 'all' || typeFilter !== 'all' || searchQuery) && (
              <>
                <div className="flex items-center text-sm text-muted-foreground mr-2">
                  <Filter className="h-4 w-4 mr-1" />
                  Active filters:
                </div>
                
                {statusFilter !== 'all' && (
                  <Badge variant="outline" className="flex items-center">
                    Status: {statusFilter}
                    <button 
                      onClick={() => handleStatusFilterChange('all')} 
                      className="ml-1 hover:text-red-500"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                {typeFilter !== 'all' && (
                  <Badge variant="outline" className="flex items-center">
                    Type: {typeFilter}
                    <button 
                      onClick={() => handleTypeFilterChange('all')} 
                      className="ml-1 hover:text-red-500"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                {searchQuery && (
                  <Badge variant="outline" className="flex items-center">
                    Search: "{searchQuery}"
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        applyFilters('', statusFilter, typeFilter);
                      }} 
                      className="ml-1 hover:text-red-500"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setTypeFilter('all');
                    setFilteredEvents(allEvents);
                  }}
                >
                  Clear all
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Events list */}
      {filteredEvents.length > 0 ? (
        <div className="space-y-6">
          {filteredEvents.map(event => {
            const { status, color } = getEventStatus(event);
            const isPast = new Date(event.date) < new Date();
            const attendeePercentage = Math.round((event.attendees / event.capacity) * 100);
            
            return (
              <Card key={event.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Event image */}
                  <div className="md:w-48 lg:w-60">
                    <div className="aspect-video md:h-full relative">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <div className={`text-xs font-medium rounded-full px-2 py-1 text-white ${color}`}>
                          {status}
                        </div>
                      </div>
                      {event.isFeatured && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-purple-600 text-white text-xs font-medium rounded-full px-2 py-1">
                            Featured
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Event details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <Badge variant="outline" className="mr-2 capitalize">
                            {event.type}
                          </Badge>
                          <p className="text-sm text-muted-foreground">ID: {event.id}</p>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-purple-600" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-purple-600" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-purple-600" />
                            <span>{event.location.city}, {event.location.state}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1 text-purple-600" />
                          <span className="text-muted-foreground">Organizer:</span>
                          <span className="font-medium ml-1">{event.organizer.name}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-4 md:text-right">
                        <div className="flex flex-col items-start md:items-end">
                          <p className="text-lg font-bold">
                            {formatPrice(event.price, event.currency)}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <Users className="h-4 w-4 mr-1 md:order-last md:ml-1 md:mr-0" />
                            <span>{event.attendees} / {event.capacity} attendees</span>
                          </div>
                          <div className="w-full max-w-[200px] bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                attendeePercentage > 90 ? 'bg-red-500' : 
                                attendeePercentage > 70 ? 'bg-orange-500' : 
                                'bg-green-500'
                              }`}
                              style={{ width: `${attendeePercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        <Button asChild variant="outline" size="sm">
                          <a href={`/events/${event.id}`} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleFeature(event.id, event.isFeatured)}
                        >
                          {event.isFeatured ? (
                            <>
                              <XCircle className="h-4 w-4 mr-2" />
                              Unfeature
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Feature
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                          onClick={() => handleDeleteEvent(event.id, event.title)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit Event</DropdownMenuItem>
                          <DropdownMenuItem>Contact Organizer</DropdownMenuItem>
                          <DropdownMenuItem>View Attendees</DropdownMenuItem>
                          <DropdownMenuItem>View Transactions</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6">
              No events match your search criteria. Try adjusting your filters.
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setTypeFilter('all');
                setFilteredEvents(allEvents);
              }}
            >
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};