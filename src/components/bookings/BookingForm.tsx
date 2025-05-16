import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/utils/formatPrice';

interface BookingFormProps {
  event: Event;
}

export const BookingForm: React.FC<BookingFormProps> = ({ event }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Calculate total price
  const totalPrice = event.price * quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please login or create an account to book tickets',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Create mock booking
      const bookingId = Math.random().toString(36).substring(7);
      
      toast({
        title: 'Booking successful!',
        description: `You've successfully booked ${quantity} ticket${quantity > 1 ? 's' : ''} for ${event.title}`,
        variant: 'default',
      });
      
      setIsLoading(false);
      navigate('/booking-success', { 
        state: { 
          eventTitle: event.title,
          quantity,
          totalPrice,
          bookingId,
          eventDate: event.date,
          eventTime: event.time,
          eventLocation: event.location.name,
        } 
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity">Number of Tickets</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={handleQuantityChange}
                className="mt-1"
              />
            </div>
            
            <div className="py-4">
              <div className="flex justify-between pb-2 text-sm">
                <span className="text-muted-foreground">Price per ticket</span>
                <span>{formatPrice(event.price, event.currency)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>{formatPrice(totalPrice, event.currency)}</span>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : `${event.price === 0 ? 'Register Now' : 'Proceed to Payment'}`}
        </Button>
      </CardFooter>
    </Card>
  );
};