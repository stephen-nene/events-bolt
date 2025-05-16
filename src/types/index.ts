// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'creator' | 'admin';
  avatar?: string;
}

// Event related types
export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  type: EventType;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  organizer: {
    id: string;
    name: string;
  };
  price: number;
  currency: string;
  imageUrl: string;
  capacity: number;
  attendees: number;
  isFeatured: boolean;
}

export type EventType = 'hackathon' | 'party' | 'concert' | 'meetup' | 'conference' | 'workshop';

// Booking related types
export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentId: string;
  createdAt: string;
}

// Payment related types
export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  createdAt: string;
}