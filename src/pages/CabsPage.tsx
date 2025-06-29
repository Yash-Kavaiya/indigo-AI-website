import React from 'react';
import { ArrowLeft } from 'lucide-react';
import CabBooking from '../components/booking/CabBooking';

const CabsPage: React.FC = () => {
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
                    <path d="M16 6L17.5 4.5M16 6V8M16 6H8M17.5 4.5L19 3M17.5 4.5H19.5M2 19H22M4 15V19M20 15V19M7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 15L17 15C17 12.7909 14.9853 11 12.5 11C10.0147 11 7 12.7909 7 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-h4 font-bold">Cab Booking</h1>
                  <p className="text-primary-200 text-body2">Airport transfers and city travel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CabBooking />
      </div>
    </div>
  );
};

export default CabsPage;