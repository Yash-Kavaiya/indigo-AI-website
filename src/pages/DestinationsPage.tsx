import React from 'react';
import AdvancedDestinationsPage from '../components/destinations/AdvancedDestinationsPage';

export interface UserPreferences {
  travelStyle: string[];
  budget: string;
  season: string;
  groupSize: string;
  interests: string[];
  accommodationType: string;
  activities: string[];
  duration: string;
  country: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  image: string;
  price: {
    budget: number;
    mid: number;
    luxury: number;
  };
  bestTime: string[];
  rating: number;
  description: string;
  highlights: string[];
  activities: string[];
  travelStyles: string[];
  aiReason: string;
  matchScore: number;
  flightPrice: number;
  duration: string;
  visaRequired: boolean;
  currency: string;
  timeZone: string;
  language: string[];
}

const DestinationsPage: React.FC = () => {
  const handleBack = () => {
    window.history.back();
  };

  return <AdvancedDestinationsPage onBack={handleBack} />;
};

export default DestinationsPage;