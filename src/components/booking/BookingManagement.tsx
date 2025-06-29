import React, { useState } from 'react';
import TravelServices, { BookingService } from './TravelServices';
import FlightBooking from './FlightBooking';
import GroupBooking from './GroupBooking';
import HotelBooking from './HotelBooking';
import CabBooking from './CabBooking';
import VisaBooking from './VisaBooking';
import InsuranceBooking from './InsuranceBooking';
import PackagesBooking from './PackagesBooking';
import { ArrowLeft, Home } from 'lucide-react';

const BookingManagement: React.FC = () => {
  const [activeService, setActiveService] = useState<BookingService | null>(null);

  const getServiceTitle = (service: BookingService) => {
    switch (service) {
      case 'flights': return 'Flight Booking';
      case 'groups': return 'Group Booking';
      case 'hotels': return 'Hotel Booking';
      case 'cabs': return 'Cab Booking';
      case 'visa': return 'Visa Services';
      case 'insurance': return 'Travel Insurance';
      case 'packages': return 'Holiday Packages';
      default: return 'Booking';
    }
  };

  const renderContent = () => {
    switch (activeService) {
      case 'flights':
        return <FlightBooking />;
      case 'groups':
        return <GroupBooking />;
      case 'hotels':
        return <HotelBooking />;
      case 'cabs':
        return <CabBooking />;
      case 'visa':
        return <VisaBooking />;
      case 'insurance':
        return <InsuranceBooking />;
      case 'packages':
        return <PackagesBooking />;
      default:
        return <TravelServices onServiceSelect={setActiveService} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      {activeService && (
        <div className="bg-white shadow-elevation-1 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setActiveService(null)}
                  className="btn-text text-secondary hover:text-primary hover:bg-gray-100 p-2"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <div>
                  <h1 className="text-h5 font-bold text-primary">{getServiceTitle(activeService)}</h1>
                  <p className="text-body2 text-secondary">Complete your booking in a few simple steps</p>
                </div>
              </div>
              
              <button
                onClick={() => setActiveService(null)}
                className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50"
              >
                <Home className="h-5 w-5" />
                <span>All Services</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default BookingManagement;