import React from 'react';
import { ArrowLeft } from 'lucide-react';
import FlightBooking from '../components/booking/FlightBooking';

const FlightsPage: React.FC = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white shadow-elevation-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleBack}
                className="btn-text text-white hover:bg-white/20 p-2"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-2xl p-3">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 11L4 9L22 2L20 13L17 14M4 11L9.5 13M4 11L17 14M4 11L13.5 15M17 14L19 19L15.5 21L13.5 15M13.5 15L9.5 16.5M9.5 13L9.5 16.5M9.5 16.5L8 21.5L2 19.5L5.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-h4 font-bold">Flight Booking</h1>
                  <p className="text-primary-200 text-body2">Domestic & International flights at best prices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FlightBooking />
      </div>
    </div>
  );
};

export default FlightsPage;