import { Flight, Destination, ItineraryItem, AIInsight } from '../types';

export const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'Delta',
    flightNumber: 'DL 1234',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '08:30',
      date: '2025-03-15'
    },
    arrival: {
      airport: 'LAX',
      city: 'Los Angeles',
      time: '11:45',
      date: '2025-03-15'
    },
    duration: '6h 15m',
    price: 489,
    stops: 0,
    aiScore: 9.2,
    features: ['Wi-Fi', 'Entertainment', 'Extra Legroom']
  },
  {
    id: '2',
    airline: 'American',
    flightNumber: 'AA 5678',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '14:20',
      date: '2025-03-15'
    },
    arrival: {
      airport: 'LAX',
      city: 'Los Angeles',
      time: '17:55',
      date: '2025-03-15'
    },
    duration: '6h 35m',
    price: 425,
    stops: 0,
    aiScore: 8.7,
    features: ['Wi-Fi', 'Power Outlets', 'Snacks']
  }
];

export const aiDestinations: Destination[] = [
  {
    id: '1',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 1299,
    aiReason: 'Perfect for your interest in technology and culture',
    highlights: ['Cherry Blossoms', 'Tech Innovation', 'Culinary Scene'],
    bestTime: 'March - May'
  },
  {
    id: '2',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 899,
    aiReason: 'Ideal romantic getaway based on your travel history',
    highlights: ['Sunset Views', 'Wine Tasting', 'Architecture'],
    bestTime: 'April - October'
  },
  {
    id: '3',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 1099,
    aiReason: 'Matches your wellness and adventure preferences',
    highlights: ['Wellness Retreats', 'Rice Terraces', 'Beaches'],
    bestTime: 'April - September'
  }
];

export const mockItinerary: ItineraryItem[] = [
  {
    id: '1',
    type: 'flight',
    title: 'Flight to Tokyo',
    description: 'Delta DL 1234 - Non-stop flight',
    time: '08:30',
    duration: '14h 30m',
    price: 1299,
    aiGenerated: true
  },
  {
    id: '2',
    type: 'hotel',
    title: 'Park Hyatt Tokyo',
    description: 'Luxury hotel in Shinjuku',
    time: '15:00',
    duration: '3 nights',
    price: 450,
    aiGenerated: true
  },
  {
    id: '3',
    type: 'activity',
    title: 'Tokyo Food Tour',
    description: 'Guided culinary experience',
    time: '18:00',
    duration: '4 hours',
    price: 89,
    aiGenerated: true
  }
];

export const aiInsights: AIInsight[] = [
  {
    type: 'price',
    title: 'Price Drop Alert',
    description: 'Flights to Tokyo have dropped 15% in the last 48 hours',
    action: 'Book Now',
    confidence: 92
  },
  {
    type: 'weather',
    title: 'Weather Update',
    description: 'Perfect weather expected for your travel dates',
    confidence: 88
  },
  {
    type: 'events',
    title: 'Local Event',
    description: 'Cherry Blossom Festival coincides with your visit',
    confidence: 95
  }
];