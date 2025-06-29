export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  stops: number;
  aiScore: number;
  features: string[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  price: number;
  aiReason: string;
  highlights: string[];
  bestTime: string;
}

export interface TravelPreference {
  budget: 'economy' | 'premium' | 'luxury';
  travelStyle: 'business' | 'leisure' | 'adventure' | 'family';
  preferredAirlines: string[];
  seatPreference: 'window' | 'aisle' | 'any';
  mealPreference: 'standard' | 'vegetarian' | 'vegan' | 'kosher';
}

export interface ItineraryItem {
  id: string;
  type: 'flight' | 'hotel' | 'activity' | 'restaurant';
  title: string;
  description: string;
  time: string;
  duration: string;
  price: number;
  aiGenerated: boolean;
}

export interface AIInsight {
  type: 'price' | 'weather' | 'events' | 'recommendation';
  title: string;
  description: string;
  action?: string;
  confidence: number;
}