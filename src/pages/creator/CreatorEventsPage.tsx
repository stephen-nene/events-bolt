import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
import { getEventById } from '@/data/mockData';
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
  PlusCircle,
  ArrowUpDown,
  AlertCircle,
  MoreVertical
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

export const CreatorEventsPage: React.FC = () => {
  // Mock event IDs for creator events
  const creatorEventIds = ['1', '2', '3', '4', '5', '6', '7', '8'];
  
  // Get events created by the creator
  const allCreatorEvents = creatorEventIds
    .map(id => getEventById(id))
    .filter(event => event !== undefined) as Event[];
  
  const [events, setEvents] = useState<Event[]>(allCreatorEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('date-asc');
  const { toast } = useToast();
  
  // Handle search and filtering
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query) {
      setEvents(filterEventsByStatus(allCreatorEvents, statusFilter));
      return;
    }
    
    const filteredEvents = allCreatorEvents.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.location.city.toLowerCase().includes(query.toLowerCase()) ||
      event.type.toLowerCase().includes(query.toLowerCase())
    );
    
    setEvents(filterEventsByStatus(filteredEvents, statusFilter));
  };
  
  // Filter events by status
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setEvents(filterEventsByStatus(
      searchQuery ? events : allCreatorEvents,
      status
    ));
  };
  
  const filterEventsByStatus = (eventsToFilter: Event[], status: string) => {
    if (status === 'all') return eventsToFilter;
    
    const today = new Date();
    
    return eventsToFilter.filter(event => {
      const eventDate = new Date(event.date);
      
      if (status === 'upcoming') {
        return eventDate >= today;
      } else if (status === 'past') {
        return eventDate < today;
      } else if (status === 'draft') {
        // For this demo, we'll consider events with capacity === attendees as "draft"
        return event.capacity === event.attendees;
      }
      
      return true;
    });
  };
  
  // Handle sorting
  const handleSortChange = (option: string) => {
    setSortOption(option);
    
    const sortedEvents = [...events];
    
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
      case 'attendees-asc':
        sortedEvents.sort((a, b) => a.attendees - b.attendees);
        break;
      case 'attendees-desc':
        sortedEvents.sort((a, b) => b.attendees - a.attendees);
        break;
      default:
        break;
    }
    
    setEvents(sortedEvents);
  };
  
  // Handle delete event
  const handleDeleteEvent = (eventId: string, eventTitle: string) => {
    // In a real app, this would make an API call to delete the event
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    
    toast({
      title: "Event deleted",
      description: `"${eventTitle}" has been successfully deleted.`,
      variant: "default",
    });
  };

  // Get event status
  const getEventStatus = (event: Event): { status: string; color: string } => {
    const today = new Date();
    const eventDate = new Date(event.date);
    
    if (event.capacity === event.attendees) {
      return { status: 'Draft', color: 'bg-gray-500' };
    } else if (eventDate < today) {
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Events</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your created events
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

      {/* Filters and search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <SelectItem value="draft">Draft Events</SelectItem>
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
                  <SelectItem value="attendees-asc">Attendees (Low to High)</SelectItem>
                  <SelectItem value="attendees-desc">Attendees (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events list */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {events.map(event => {
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
                      <div className="flex">
                        <Button asChild variant="outline" size="sm" className="mr-2">
                          <Link to={`/events/${event.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="mr-2">
                          <Link to={`/creator/events/${event.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
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
                          <DropdownMenuItem>Duplicate Event</DropdownMenuItem>
                          <DropdownMenuItem>Export Attendee List</DropdownMenuItem>
                          <DropdownMenuItem>Send Email to Attendees</DropdownMenuItem>
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
              {searchQuery ? 'No events match your search criteria. Try adjusting your filters.' : 'You haven\'t created any events yet.'}
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link to="/creator/create-event">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Event
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};