import { Event, Booking, Payment } from '@/types';

// Events data
export const events: Event[] = [
  {
    id: '1',
    title: 'TechCrunch Disrupt 2025',
    shortDescription: 'The ultimate tech conference for startups and innovation',
    description: 'TechCrunch Disrupt is the world\'s leading authority in debuting revolutionary startups, introducing game-changing technologies, and discussing what\'s top of mind for the tech industry\'s key innovators. Disrupt gathers the best and brightest entrepreneurs, investors, hackers, and tech fans for on-stage interviews, the Startup Battlefield competition, a 24-hour Hackathon, Startup Alley, Hardware Alley, and After Parties.',
    type: 'conference',
    date: '2025-08-15',
    time: '09:00',
    location: {
      name: 'Moscone Center',
      address: '747 Howard St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
    },
    organizer: {
      id: '101',
      name: 'TechCrunch',
    },
    price: 995,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg',
    capacity: 5000,
    attendees: 3750,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    shortDescription: 'Three days of amazing music from top artists',
    description: 'The Summer Music Festival returns with an incredible lineup featuring top artists from around the world. Enjoy three days of non-stop music across multiple stages, delicious food from local vendors, art installations, and much more. Camp on-site or get a day pass for this unforgettable experience.',
    type: 'concert',
    date: '2025-07-10',
    time: '16:00',
    location: {
      name: 'Golden Gate Park',
      address: '501 Stanyan St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94117',
    },
    organizer: {
      id: '102',
      name: 'Live Nation',
    },
    price: 350,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    capacity: 50000,
    attendees: 42500,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Global AI Hackathon',
    shortDescription: 'Build the future with artificial intelligence',
    description: 'Join hundreds of developers, designers, and AI enthusiasts for a 48-hour hackathon focused on artificial intelligence. Work in teams to build innovative solutions using the latest AI technologies, with mentorship from industry experts. Compete for prizes totaling over $50,000 and opportunities to pitch to venture capitalists.',
    type: 'hackathon',
    date: '2025-06-01',
    time: '10:00',
    location: {
      name: 'Google Campus',
      address: '1600 Amphitheatre Parkway',
      city: 'Mountain View',
      state: 'CA',
      zipCode: '94043',
    },
    organizer: {
      id: '103',
      name: 'Google Developers',
    },
    price: 0,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/7102/notes-macbook-study-conference.jpg',
    capacity: 500,
    attendees: 485,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'New Year\'s Eve Gala',
    shortDescription: 'Ring in the new year with elegance and style',
    description: 'Celebrate the new year in style at our annual New Year\'s Eve Gala. Enjoy a night of gourmet dining, premium open bar, live entertainment, and dancing. At midnight, toast with champagne and watch the spectacular fireworks display over the bay. Black tie attire required.',
    type: 'party',
    date: '2025-12-31',
    time: '20:00',
    location: {
      name: 'The Ritz-Carlton',
      address: '600 Stockton St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94108',
    },
    organizer: {
      id: '104',
      name: 'Elegant Events',
    },
    price: 250,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg',
    capacity: 300,
    attendees: 220,
    isFeatured: false,
  },
  {
    id: '5',
    title: 'Startup Networking Mixer',
    shortDescription: 'Connect with founders, investors, and tech talent',
    description: 'Expand your professional network at our monthly startup mixer. Meet founders, investors, engineers, designers, and other tech professionals in a relaxed environment. Includes complimentary appetizers and one drink ticket. Perfect for finding co-founders, mentors, or your next career opportunity.',
    type: 'meetup',
    date: '2025-05-22',
    time: '18:30',
    location: {
      name: 'WeWork',
      address: '535 Mission St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
    },
    organizer: {
      id: '105',
      name: 'SF Startups',
    },
    price: 15,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg',
    capacity: 100,
    attendees: 87,
    isFeatured: false,
  },
  {
    id: '6',
    title: 'UX Design Workshop',
    shortDescription: 'Master user experience design principles',
    description: 'This intensive one-day workshop will teach you the fundamentals of user experience design. Learn user research methods, wireframing, prototyping, usability testing, and more. Suitable for beginners and those looking to refresh their skills. Laptop required, and all digital resources will be provided.',
    type: 'workshop',
    date: '2025-04-15',
    time: '09:30',
    location: {
      name: 'Design Academy',
      address: '460 Bryant St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
    },
    organizer: {
      id: '106',
      name: 'UX Collective',
    },
    price: 199,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/7256883/pexels-photo-7256883.jpeg',
    capacity: 30,
    attendees: 26,
    isFeatured: false,
  },
  {
    id: '7',
    title: 'Blockchain & Crypto Summit',
    shortDescription: 'Explore the latest in blockchain technology and cryptocurrency',
    description: 'The Blockchain & Crypto Summit brings together industry leaders, developers, investors, and enthusiasts to discuss the latest trends and innovations in blockchain technology and cryptocurrency. Featuring keynote speeches, panel discussions, workshops, and networking opportunities.',
    type: 'conference',
    date: '2025-09-10',
    time: '09:00',
    location: {
      name: 'Marriott Marquis',
      address: '780 Mission St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
    },
    organizer: {
      id: '107',
      name: 'Crypto Council',
    },
    price: 599,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg',
    capacity: 1200,
    attendees: 950,
    isFeatured: true,
  },
  {
    id: '8',
    title: 'Food & Wine Festival',
    shortDescription: 'Taste the finest cuisine and wines from around the world',
    description: 'Indulge in culinary delights at our annual Food & Wine Festival. Sample dishes from top local restaurants, taste wines from renowned vineyards, watch cooking demonstrations from celebrity chefs, and participate in food workshops. A must-attend event for foodies and wine enthusiasts.',
    type: 'party',
    date: '2025-08-22',
    time: '12:00',
    location: {
      name: 'Ferry Building',
      address: '1 Ferry Building',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94111',
    },
    organizer: {
      id: '108',
      name: 'Bay Area Culinary Alliance',
    },
    price: 85,
    currency: 'USD',
    imageUrl: 'https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg',
    capacity: 2000,
    attendees: 1850,
    isFeatured: false,
  },
];

// Bookings data
export const bookings: Booking[] = [
  {
    id: 'b1',
    eventId: '2',
    userId: '1',
    quantity: 2,
    totalPrice: 700,
    status: 'confirmed',
    paymentId: 'p1',
    createdAt: '2025-05-15T10:30:00Z',
  },
  {
    id: 'b2',
    eventId: '3',
    userId: '1',
    quantity: 1,
    totalPrice: 0,
    status: 'confirmed',
    paymentId: 'p2',
    createdAt: '2025-05-20T14:45:00Z',
  },
  {
    id: 'b3',
    eventId: '1',
    userId: '2',
    quantity: 3,
    totalPrice: 2985,
    status: 'confirmed',
    paymentId: 'p3',
    createdAt: '2025-06-01T09:15:00Z',
  },
];

// Payments data
export const payments: Payment[] = [
  {
    id: 'p1',
    bookingId: 'b1',
    userId: '1',
    amount: 700,
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'credit_card',
    createdAt: '2025-05-15T10:35:00Z',
  },
  {
    id: 'p2',
    bookingId: 'b2',
    userId: '1',
    amount: 0,
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'credit_card',
    createdAt: '2025-05-20T14:50:00Z',
  },
  {
    id: 'p3',
    bookingId: 'b3',
    userId: '2',
    amount: 2985,
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'paypal',
    createdAt: '2025-06-01T09:20:00Z',
  },
];

// Function to get events by type
export const getEventsByType = (type: string): Event[] => {
  return events.filter(event => event.type === type);
};

// Function to get featured events
export const getFeaturedEvents = (): Event[] => {
  return events.filter(event => event.isFeatured);
};

// Function to get event by ID
export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};

// Function to get bookings by user ID
export const getBookingsByUserId = (userId: string): Booking[] => {
  return bookings.filter(booking => booking.userId === userId);
};

// Function to get event details for a booking
export const getEventForBooking = (booking: Booking): Event | undefined => {
  return events.find(event => event.id === booking.eventId);
};

// Function to get payment by booking ID
export const getPaymentByBookingId = (bookingId: string): Payment | undefined => {
  return payments.find(payment => payment.bookingId === bookingId);
};