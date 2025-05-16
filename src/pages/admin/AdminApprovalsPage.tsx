import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { formatDate } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { Event } from '@/types';
import { events } from '@/data/mockData';

// Mock pending approval events
const mockPendingEvents: Event[] = [
  {
    id: 'pend1',
    title: 'Web3 Innovation Summit',
    shortDescription: 'The premier conference for web3 and blockchain innovators',
    description: 'Join industry leaders and innovators for a two-day summit exploring the future of web3, blockchain technology, and decentralized applications. Network with founders, developers, and investors at the forefront of the web3 revolution, and gain insights from expert speakers and hands-on workshops.',
    type: 'conference',
    date: '2025-11-10',
    time: '09:00',
    location: {
      name: 'Tech Convention Center',
      address: '123 Innovation Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
    },
    organizer: {
      id: '201',
      name: 'Blockchain Alliance',
    },
    price: 499,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/5474295/pexels-photo-5474295.jpeg',
    capacity: 800,
    attendees: 0,
    isFeatured: false,
  },
  {
    id: 'pend2',
    title: 'Sustainable Fashion Showcase',
    shortDescription: 'A celebration of eco-friendly and ethical fashion',
    description: 'The Sustainable Fashion Showcase brings together designers, brands, and thought leaders committed to environmental and social responsibility in the fashion industry. Explore exhibitions, runway shows, panel discussions, and workshops focused on sustainable materials, ethical production, and circular fashion models.',
    type: 'meetup',
    date: '2025-09-20',
    time: '11:00',
    location: {
      name: 'Design District Gallery',
      address: '456 Eco Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90048',
    },
    organizer: {
      id: '202',
      name: 'Conscious Style Collective',
    },
    price: 75,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg',
    capacity: 350,
    attendees: 0,
    isFeatured: false,
  },
  {
    id: 'pend3',
    title: 'Wellness & Mindfulness Retreat',
    shortDescription: 'A weekend of relaxation, reflection, and rejuvenation',
    description: 'Escape the demands of modern life with our immersive wellness retreat. This weekend getaway offers a carefully curated program of meditation sessions, yoga classes, mindfulness workshops, nutritional guidance, and holistic healing practices. Recharge in a tranquil natural setting and learn sustainable techniques for maintaining balance in your daily life.',
    type: 'workshop',
    date: '2025-10-15',
    time: '14:00',
    location: {
      name: 'Harmony Retreat Center',
      address: '789 Serenity Lane',
      city: 'Santa Barbara',
      state: 'CA',
      zipCode: '93101',
    },
    organizer: {
      id: '203',
      name: 'Mindful Living Co.',
    },
    price: 350,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg',
    capacity: 50,
    attendees: 0,
    isFeatured: false,
  },
  {
    id: 'pend4',
    title: 'Indie Game Developers Expo',
    shortDescription: 'Showcasing the best in independent game development',
    description: 'The Indie Game Developers Expo celebrates creativity and innovation in independent game development. Play unreleased games, meet the creators behind cutting-edge indie titles, attend development workshops, and network with industry professionals. Perfect for game developers, enthusiasts, and industry recruiters looking for new talent.',
    type: 'hackathon',
    date: '2025-08-05',
    time: '10:00',
    location: {
      name: 'Game Hub Center',
      address: '100 Developer Way',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98104',
    },
    organizer: {
      id: '204',
      name: 'Independent Game Alliance',
    },
    price: 45,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/159393/gamepad-video-game-controller-game-controller-controller-159393.jpeg',
    capacity: 1000,
    attendees: 0,
    isFeatured: false,
  },
];

export const AdminApprovalsPage: React.FC = () => {
  const [pendingEvents, setPendingEvents] = useState<Event[]>(mockPendingEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [approvalNote, setApprovalNote] = useState('');
  const [rejectNote, setRejectNote] = useState('');
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  
  const { toast } = useToast();
  
  const handleApproveEvent = () => {
    if (!selectedEvent) return;
    
    // Remove from pending events
    setPendingEvents(pendingEvents.filter(event => event.id !== selectedEvent.id));
    
    // Close dialog
    setIsApproveDialogOpen(false);
    
    // Show toast notification
    toast({
      title: "Event approved",
      description: `"${selectedEvent.title}" has been approved and is now live.`,
      variant: "default",
    });
    
    // Reset selected event and note
    setSelectedEvent(null);
    setApprovalNote('');
  };
  
  const handleRejectEvent = () => {
    if (!selectedEvent) return;
    
    // Remove from pending events
    setPendingEvents(pendingEvents.filter(event => event.id !== selectedEvent.id));
    
    // Close dialog
    setIsRejectDialogOpen(false);
    
    // Show toast notification
    toast({
      title: "Event rejected",
      description: `"${selectedEvent.title}" has been rejected.`,
      variant: "destructive",
    });
    
    // Reset selected event and note
    setSelectedEvent(null);
    setRejectNote('');
  };
  
  const openApproveDialog = (event: Event) => {
    setSelectedEvent(event);
    setIsApproveDialogOpen(true);
  };
  
  const openRejectDialog = (event: Event) => {
    setSelectedEvent(event);
    setIsRejectDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Event Approvals</h1>
        <p className="text-muted-foreground">
          Review and manage events pending approval
        </p>
      </div>

      {/* Stats card */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Approvals</p>
                <p className="text-3xl font-bold">{pendingEvents.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approved Today</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rejected Today</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending approvals */}
      <Card>
        <CardHeader>
          <CardTitle>Events Pending Approval</CardTitle>
          <CardDescription>
            Review and approve or reject event submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingEvents.length > 0 ? (
            <div className="space-y-6">
              {pendingEvents.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg overflow-hidden transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Event image */}
                    <div className="md:w-48 lg:w-64">
                      <div className="aspect-video md:h-full relative">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Event details */}
                    <div className="flex-1 p-6">
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <Badge variant="outline" className="capitalize mr-2">
                            {event.type}
                          </Badge>
                          <Badge variant="secondary">
                            Pending Review
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                        <p className="text-muted-foreground mb-3">{event.shortDescription}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground mb-1">Date</span>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-purple-600" />
                              <span className="text-sm">{formatDate(event.date)}</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground mb-1">Time</span>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-purple-600" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground mb-1">Price</span>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1 text-purple-600" />
                              <span className="text-sm font-bold">{formatPrice(event.price, event.currency)}</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground mb-1">Capacity</span>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-purple-600" />
                              <span className="text-sm">{event.capacity} attendees</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm mb-4">
                          <MapPin className="h-4 w-4 mr-1 text-purple-600" />
                          <span className="text-muted-foreground mr-1">Location:</span>
                          <span>{event.location.name}, {event.location.city}, {event.location.state}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1 text-purple-600" />
                          <span className="text-muted-foreground mr-1">Organizer:</span>
                          <span className="font-medium">{event.organizer.name}</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex justify-between items-center">
                        <a 
                          href="#"
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                          onClick={(e) => {
                            e.preventDefault();
                            // In a real application, this would open a detailed view
                          }}
                        >
                          View full details <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                        
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                            onClick={() => openRejectDialog(event)}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => openApproveDialog(event)}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">All caught up!</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                There are no events pending approval at this time. Any new submissions will appear here.
              </p>
              <Button variant="outline" asChild>
                <a href="/admin/events">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Events
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Event</DialogTitle>
            <DialogDescription>
              This event will be made live and visible to all users.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
              <p className="font-medium">{selectedEvent?.title}</p>
              <p className="text-sm text-muted-foreground">{selectedEvent?.organizer.name}</p>
            </div>
            <div>
              <label htmlFor="approval-note" className="text-sm font-medium">
                Add note (optional)
              </label>
              <Textarea
                id="approval-note"
                placeholder="Add any notes for internal reference"
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700" 
              onClick={handleApproveEvent}
            >
              Approve Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Event</DialogTitle>
            <DialogDescription>
              This event will be rejected and the organizer will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
              <p className="font-medium">{selectedEvent?.title}</p>
              <p className="text-sm text-muted-foreground">{selectedEvent?.organizer.name}</p>
            </div>
            <div>
              <label htmlFor="reject-reason" className="text-sm font-medium">
                Reason for rejection <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="reject-reason"
                placeholder="Provide a reason for rejecting this event"
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                className="mt-1"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                This will be sent to the event organizer.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleRejectEvent}
              disabled={!rejectNote.trim()}
            >
              Reject Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};