import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEventById } from '@/data/mockData';
import { Event } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { PaymentForm } from '@/components/bookings/PaymentForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/utils/formatPrice';
import { formatDate } from '@/utils/formatDate';

export const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingId, setBookingId] = useState<string | null>(null);
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      toast({
        title: 'Authentication required',
        description: 'Please login to complete your booking',
        variant: 'destructive',
      });
      return;
    }
    
    if (id) {
      // Fetch event details
      const fetchedEvent = getEventById(id);
      if (fetchedEvent) {
        setEvent(fetchedEvent);
        
        // Create a temporary booking ID
        setBookingId(`booking_${Math.random().toString(36).substring(2, 10)}`);
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
  }, [id, isAuthenticated, navigate, toast]);

  const handlePaymentSuccess = (paymentId: string) => {
    navigate('/booking-success', { 
      state: { 
        eventTitle: event?.title,
        quantity,
        totalPrice: event ? event.price * quantity : 0,
        bookingId,
        eventDate: event?.date,
        eventTime: event?.time,
        eventLocation: event?.location.name,
        paymentId,
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-28 pb-16 flex justify-center">
        <p>Loading checkout...</p>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  // Calculate total price
  const totalPrice = event.price * quantity;

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your booking for {event.title}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Event summary */}
          <div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="flex mb-4">
                <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {formatDate(event.date)} • {event.time}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.location.name}, {event.location.city}
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Ticket Price x {quantity}</span>
                  <span>{formatPrice(event.price, event.currency)} x {quantity}</span>
                </div>
                
                <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice, event.currency)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions about your booking, please contact our support team.
              </p>
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
          
          {/* Right column - Payment form */}
          <div>
            {event.price > 0 ? (
              <PaymentForm
                amount={totalPrice}
                currency={event.currency}
                eventTitle={event.title}
                onSuccess={handlePaymentSuccess}
              />
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Registration</h2>
                <p className="mb-6">
                  This is a free event. Click the button below to complete your registration.
                </p>
                <Button 
                  onClick={() => handlePaymentSuccess('free_event')}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Complete Registration
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};