import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Check, MapPin, Clock, Ticket } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

interface BookingSuccessState {
  eventTitle: string;
  quantity: number;
  totalPrice: number;
  bookingId: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  paymentId?: string;
}

export const BookingSuccessPage: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state as BookingSuccessState;
  
  // Redirect if no booking data is available
  if (!bookingData) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your tickets for {bookingData.eventTitle} have been booked successfully.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 pb-6 border-b">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">{bookingData.eventTitle}</h2>
              <p className="text-sm text-muted-foreground">
                Booking ID: {bookingData.bookingId}
              </p>
            </div>
            <div className="flex items-center">
              <Ticket className="h-5 w-5 mr-2 text-purple-600" />
              <span className="font-medium">{bookingData.quantity} {bookingData.quantity > 1 ? 'Tickets' : 'Ticket'}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600 mb-2" />
              <p className="font-medium">{formatDate(bookingData.eventDate)}</p>
              <p className="text-sm text-muted-foreground">Date</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600 mb-2" />
              <p className="font-medium">{bookingData.eventTime}</p>
              <p className="text-sm text-muted-foreground">Time</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <MapPin className="h-5 w-5 text-purple-600 mb-2" />
              <p className="font-medium">{bookingData.eventLocation}</p>
              <p className="text-sm text-muted-foreground">Location</p>
            </div>
          </div>
          
          <div className="text-left mb-6">
            <h3 className="font-semibold mb-2">Important Information</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• A confirmation email has been sent to your registered email address.</li>
              <li>• Please bring your ID and booking reference to the event.</li>
              <li>• You can view and manage your tickets from your dashboard.</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <Link to="/my-tickets">View My Tickets</Link>
            </Button>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              asChild
            >
              <Link to="/events">Explore More Events</Link>
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Need help? <Link to="/contact" className="text-purple-600 hover:text-purple-800">Contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};