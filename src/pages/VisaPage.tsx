import React from 'react';
import { ArrowLeft } from 'lucide-react';
import VisaBooking from '../components/booking/VisaBooking';

const VisaPage: React.FC = () => {
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
                    <path d="M10 7.5H17M7 3V21M4 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V16.2C20 17.8802 20 18.7202 19.673 19.362C19.3854 19.9265 18.9265 20.3854 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V7.8C4 6.11984 4 5.27976 4.32698 4.63803C4.6146 4.07354 5.07354 3.6146 5.63803 3.32698C6.27976 3 7.11984 3 8.8 3H12M17 16.5C17 17.3284 16.3284 18 15.5 18C14.6716 18 14 17.3284 14 16.5C14 15.6716 14.6716 15 15.5 15C16.3284 15 17 15.6716 17 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-h4 font-bold">Visa Services</h1>
                  <p className="text-primary-200 text-body2">Hassle-free visa assistance for international travel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VisaBooking />
      </div>
    </div>
  );
};

export default VisaPage;