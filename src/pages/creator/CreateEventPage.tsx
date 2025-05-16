import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Clock, Image, Info, MapPin, DollarSign, Check } from 'lucide-react';

export const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('basics');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [capacity, setCapacity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  // Navigation between tabs
  const goToNextTab = () => {
    if (activeTab === 'basics') setActiveTab('location');
    else if (activeTab === 'location') setActiveTab('details');
    else if (activeTab === 'details') setActiveTab('preview');
  };
  
  const goToPreviousTab = () => {
    if (activeTab === 'preview') setActiveTab('details');
    else if (activeTab === 'details') setActiveTab('location');
    else if (activeTab === 'location') setActiveTab('basics');
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would make an API call to create the event
    setTimeout(() => {
      toast({
        title: "Event Created",
        description: "Your event has been created successfully and is pending approval.",
        variant: "default",
      });
      
      setIsSubmitting(false);
      navigate('/creator/events');
    }, 1500);
  };
  
  // Handle image preview
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
        <p className="text-muted-foreground">
          Fill in the details to create your new event
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
          <CardDescription>
            Provide information about your event to attract attendees
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            {/* Basics Tab */}
            <TabsContent value="basics">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title for your event"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Event Type <span className="text-red-500">*</span></Label>
                    <Select value={eventType} onValueChange={setEventType} required>
                      <SelectTrigger id="event-type">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="hackathon">Hackathon</SelectItem>
                        <SelectItem value="concert">Concert</SelectItem>
                        <SelectItem value="meetup">Meetup</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="party">Party</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date <span className="text-red-500">*</span></Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="time">Start Time <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="time"
                        type="time"
                        placeholder="Select start time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity <span className="text-red-500">*</span></Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="Maximum number of attendees"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="short-description">Short Description <span className="text-red-500">*</span></Label>
                  <Input
                    id="short-description"
                    placeholder="A brief summary of your event (max 100 characters)"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    maxLength={100}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {shortDescription.length}/100 characters
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about your event"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[150px]"
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="button"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={goToNextTab}
                  >
                    Next: Location
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Location Tab */}
            <TabsContent value="location">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="venue-name">Venue Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="venue-name"
                    placeholder="Enter the name of the venue"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address <span className="text-red-500">*</span></Label>
                  <Input
                    id="address"
                    placeholder="Enter the street address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province <span className="text-red-500">*</span></Label>
                    <Input
                      id="state"
                      placeholder="State/Province"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zip-code">Zip/Postal Code <span className="text-red-500">*</span></Label>
                    <Input
                      id="zip-code"
                      placeholder="Zip/Postal Code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="border h-64 rounded-md bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Map preview would be shown here</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPreviousTab}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={goToNextTab}
                  >
                    Next: Details
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Details Tab */}
            <TabsContent value="details">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="image-url">Event Image URL <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="image-url"
                      placeholder="Paste a URL for your event image"
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  {imageUrl && (
                    <div className="mt-4 rounded-md overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt="Event preview" 
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Ticket Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0 for free events"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="pl-10"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter 0 for free events
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="p-4 rounded-md bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Event Approval Process</h4>
                      <p className="text-sm text-muted-foreground">
                        After submission, your event will be reviewed by our team for approval. 
                        Most events are approved within 24-48 hours.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPreviousTab}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={goToNextTab}
                  >
                    Preview Event
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Preview Tab */}
            <TabsContent value="preview">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-semibold px-2 py-1 rounded-full capitalize mb-2">
                        {eventType || 'Event Type'}
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{title || 'Event Title'}</h2>
                      <p className="text-muted-foreground">
                        {shortDescription || 'Short description of the event'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">
                        {price && Number(price) > 0 ? `${currency} ${Number(price).toFixed(2)}` : 'Free'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-lg overflow-hidden mb-6">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt="Event preview" 
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <p className="text-muted-foreground">Event image preview</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-purple-600 mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{date ? format(date, "PPP") : 'Event date'}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-purple-600 mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{time || 'Event time'}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-purple-600 mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">
                          {venueName ? `${venueName}, ${city}` : 'Event location'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="mb-6" />
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">About This Event</h3>
                    <p className="whitespace-pre-line">
                      {description || 'Detailed description of the event will appear here.'}
                    </p>
                  </div>
                  
                  <Separator className="mb-6" />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Location</h3>
                    <p className="mb-2">{venueName || 'Venue Name'}</p>
                    <p className="text-muted-foreground">
                      {address ? `${address}, ${city}, ${state} ${zipCode}` : 'Full address will appear here'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="text-emerald-500 h-5 w-5 mr-2" />
                    <span className="text-sm text-muted-foreground">This is a preview of how your event will appear to attendees</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPreviousTab}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Event...' : 'Create Event'}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};