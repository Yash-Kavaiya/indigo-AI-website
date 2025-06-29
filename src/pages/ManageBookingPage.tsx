import React, { useState } from 'react';
import { 
  ArrowLeft, Search, FileText, Calendar, Plane, User, 
  CreditCard, Coffee, ArrowRight, Plus, Minus, Luggage,
  Shield, Clock, Wifi, AlertCircle, Edit, Trash2, Check,
  ChevronRight, X, MapPin, CalendarClock, Download, Users
} from 'lucide-react';

const ManageBookingPage: React.FC = () => {
  const [bookingReference, setBookingReference] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [bookingFound, setBookingFound] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'modify' | 'seats' | 'services'>('details');
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  
  // Mock booking data
  const bookingData = {
    reference: 'ABC123',
    passengers: [
      { 
        id: 1, 
        firstName: 'Rahul', 
        lastName: 'Sharma', 
        seatNumber: '12A', 
        mealPreference: 'Vegetarian', 
        specialAssistance: 'None' 
      },
      { 
        id: 2, 
        firstName: 'Priya', 
        lastName: 'Sharma', 
        seatNumber: '12B', 
        mealPreference: 'Regular', 
        specialAssistance: 'None' 
      }
    ],
    flights: [
      {
        flightNumber: 'AI 308',
        origin: 'Delhi (DEL)',
        destination: 'Mumbai (BOM)',
        departureDate: '2025-01-15',
        departureTime: '10:45',
        arrivalTime: '13:00',
        cabin: 'Economy',
        status: 'Confirmed'
      },
      {
        flightNumber: 'AI 309',
        origin: 'Mumbai (BOM)',
        destination: 'Delhi (DEL)',
        departureDate: '2025-01-20',
        departureTime: '14:30',
        arrivalTime: '16:45',
        cabin: 'Economy',
        status: 'Confirmed'
      }
    ],
    fare: {
      baseAmount: 12000,
      taxes: 2800,
      fees: 500,
      total: 15300,
      currency: 'INR',
      fareClass: 'Economy Flex',
      refundable: true
    },
    addOns: [
      { type: 'Extra Baggage', details: '10kg', price: 2000 }
    ],
    rules: [
      { 
        type: 'Change', 
        allowance: 'Changes permitted up to 24 hours before departure', 
        fee: 1500 
      },
      { 
        type: 'Cancellation', 
        allowance: 'Cancellation permitted up to 24 hours before departure', 
        fee: 3000 
      },
      { 
        type: 'No-show', 
        allowance: 'No-show will result in loss of fare', 
        fee: 'Non-refundable' 
      }
    ],
    availableServices: [
      { id: 'baggage', name: 'Extra Baggage', price: 800, description: 'Per 5kg', icon: Luggage },
      { id: 'meal', name: 'Premium Meal', price: 450, description: 'Per passenger', icon: Coffee },
      { id: 'lounge', name: 'Lounge Access', price: 1200, description: 'Per passenger', icon: Users },
      { id: 'insurance', name: 'Travel Insurance', price: 599, description: 'Per passenger', icon: Shield },
      { id: 'fasttrack', name: 'Fast Track Security', price: 350, description: 'Per passenger', icon: Clock },
      { id: 'wifi', name: 'In-flight WiFi', price: 499, description: '1GB data', icon: Wifi }
    ],
    purchasedServices: []
  };
  
  const seatMap = {
    rows: 30,
    seatsPerRow: 6,
    occupiedSeats: ['2A', '3C', '4B', '5F', '7D', '8E', '10A', '12F', '15B', '16C', '17A', '18D', '19F', '22B', '23E'],
    premiumSeats: ['1A', '1B', '1C', '1D', '1E', '1F', '2B', '2C', '2D', '2E', '2F', '3A', '3B', '3D', '3E', '3F'],
    extraLegroom: ['10A', '10B', '10C', '10D', '10E', '10F', '20A', '20B', '20C', '20D', '20E', '20F']
  };

  const [selectedServices, setSelectedServices] = useState<{[key: string]: number}>({});
  const [selectedPassengerForSeat, setSelectedPassengerForSeat] = useState(0);
  
  const [newDates, setNewDates] = useState({
    outbound: bookingData.flights[0].departureDate,
    inbound: bookingData.flights[1].departureDate
  });
  
  const validateBookingReference = (reference: string) => {
    // Basic validation: 6 alphanumeric characters
    return /^[A-Z0-9]{6}$/.test(reference);
  };

  const validateLastName = (name: string) => {
    // Basic validation: at least 2 characters, only letters
    return /^[A-Za-z]{2,}$/.test(name);
  };

  const handleSearch = () => {
    if (!validateBookingReference(bookingReference) || !validateLastName(lastName)) {
      alert('Please enter a valid booking reference (6 characters) and last name');
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsSearching(false);
      setBookingFound(true);
    }, 1500);
  };

  const handleSaveChanges = () => {
    alert('Your changes have been saved successfully. A confirmation email will be sent to you shortly.');
  };

  const handleAddService = (serviceId: string) => {
    setSelectedServices({
      ...selectedServices,
      [serviceId]: (selectedServices[serviceId] || 0) + 1
    });
  };

  const handleRemoveService = (serviceId: string) => {
    if (!selectedServices[serviceId] || selectedServices[serviceId] <= 0) return;
    
    setSelectedServices({
      ...selectedServices,
      [serviceId]: selectedServices[serviceId] - 1
    });
  };

  const calculateTotalServiceCost = () => {
    return Object.entries(selectedServices).reduce((total, [serviceId, quantity]) => {
      const service = bookingData.availableServices.find(s => s.id === serviceId);
      return total + (service ? service.price * quantity : 0);
    }, 0);
  };

  const isSeatOccupied = (seatNumber: string) => {
    // Check if seat is in occupied list and not one of the current passenger seats
    return seatMap.occupiedSeats.includes(seatNumber) && 
           !bookingData.passengers.some(p => p.seatNumber === seatNumber);
  };

  const isSeatSelected = (seatNumber: string, passengerIndex: number) => {
    return bookingData.passengers[passengerIndex]?.seatNumber === seatNumber;
  };

  const isSeatPremium = (seatNumber: string) => {
    return seatMap.premiumSeats.includes(seatNumber);
  };

  const isSeatExtraLegroom = (seatNumber: string) => {
    return seatMap.extraLegroom.includes(seatNumber);
  };

  const getSeatPrice = (seatNumber: string) => {
    if (seatMap.premiumSeats.includes(seatNumber)) {
      return 1500;
    } else if (seatMap.extraLegroom.includes(seatNumber)) {
      return 800;
    }
    return 0;
  };

  const renderSeatMap = () => {
    const rows = [];
    const seatLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    // Add header row with seat labels
    rows.push(
      <div key="header" className="flex justify-center mb-4">
        <div className="w-10"></div>
        {seatLabels.map(label => (
          <div key={label} className="w-10 text-center font-semibold">
            {label}
          </div>
        ))}
      </div>
    );
    
    // Generate seat rows
    for (let row = 1; row <= Math.min(10, seatMap.rows); row++) {
      const seats = [];
      
      // Row number
      seats.push(
        <div key={`row-${row}`} className="w-10 flex items-center justify-center font-semibold">
          {row}
        </div>
      );
      
      // Seats in this row
      for (let seatIndex = 0; seatIndex < seatLabels.length; seatIndex++) {
        const seatNumber = `${row}${seatLabels[seatIndex]}`;
        const isOccupied = isSeatOccupied(seatNumber);
        const isSelected = isSeatSelected(seatNumber, selectedPassengerForSeat);
        const isPremium = isSeatPremium(seatNumber);
        const isExtraLegroom = isSeatExtraLegroom(seatNumber);
        
        // Add aisle space after seat C
        if (seatIndex === 3) {
          seats.push(<div key={`aisle-${row}`} className="w-6"></div>);
        }
        
        seats.push(
          <div 
            key={seatNumber} 
            className={`w-10 h-10 m-1 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
              isOccupied 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : isSelected
                  ? 'bg-primary-500 text-white'
                  : isPremium
                    ? 'bg-secondary-100 border-2 border-secondary-500 hover:bg-secondary-200'
                    : isExtraLegroom
                      ? 'bg-success-100 border-2 border-success-500 hover:bg-success-200'
                      : 'bg-white border-2 border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => {
              if (!isOccupied && !isSelected) {
                // This would update the passenger's seat in a real app
                alert(`Seat ${seatNumber} selected for ${bookingData.passengers[selectedPassengerForSeat].firstName}`);
              }
            }}
          >
            {seatNumber}
          </div>
        );
      }
      
      rows.push(
        <div key={row} className="flex justify-center mb-2">
          {seats}
        </div>
      );
      
      // Add extra legroom indicator
      if (row === 10) {
        rows.push(
          <div key={`legroom-${row}`} className="flex justify-center mb-4 mt-2">
            <div className="bg-success-100 text-success-700 px-4 py-1 rounded-lg text-sm">
              Extra Legroom Row
            </div>
          </div>
        );
      }
    }
    
    return (
      <div className="overflow-y-auto p-4 border border-gray-200 rounded-xl bg-gray-50">
        {rows}
        <div className="text-center text-gray-500 mt-4">
          <p>Showing rows 1-10 for demonstration</p>
          <p>Full aircraft has {seatMap.rows} rows</p>
        </div>
      </div>
    );
  };

  const renderSeatLegend = () => {
    return (
      <div className="flex flex-wrap gap-4 justify-center my-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-md"></div>
          <span className="text-body2">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
          <span className="text-body2">Occupied</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-primary-500 rounded-md"></div>
          <span className="text-body2">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-secondary-100 border-2 border-secondary-500 rounded-md"></div>
          <span className="text-body2">Premium (₹1,500)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-success-100 border-2 border-success-500 rounded-md"></div>
          <span className="text-body2">Extra Legroom (₹800)</span>
        </div>
      </div>
    );
  };

  const renderBookingDetails = () => {
    return (
      <div className="space-y-8">
        {/* Booking Summary */}
        <div className="card p-6 bg-gray-50">
          <h3 className="text-h5 text-primary mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Booking Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-body2 text-gray-500">Booking Reference (PNR)</p>
              <p className="text-h6 text-primary font-bold">{bookingData.reference}</p>
            </div>
            <div>
              <p className="text-body2 text-gray-500">Fare Type</p>
              <p className="text-body1">{bookingData.fare.fareClass}</p>
            </div>
            <div>
              <p className="text-body2 text-gray-500">Status</p>
              <p className="text-body1 text-success-600 font-semibold">
                <Check className="h-4 w-4 inline-block mr-1" />
                Confirmed
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-body2 text-gray-500 mb-2">Passengers</p>
            <div className="space-y-3">
              {bookingData.passengers.map((passenger, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="text-body1">{passenger.firstName} {passenger.lastName}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-body2 bg-gray-200 rounded-full px-3 py-1">
                      Seat {passenger.seatNumber}
                    </span>
                    <span className="text-body2 bg-gray-200 rounded-full px-3 py-1">
                      {passenger.mealPreference}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div>
          <h3 className="text-h5 text-primary mb-4">Flight Itinerary</h3>
          <div className="space-y-6">
            {bookingData.flights.map((flight, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Plane className="h-6 w-6 text-primary-500" />
                    <h4 className="text-h5 text-primary">{flight.flightNumber}</h4>
                  </div>
                  <div className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium">
                    {flight.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <p className="text-body2 text-gray-500">From</p>
                    <p className="text-h6 text-primary">{flight.origin}</p>
                    <p className="text-body1">{flight.departureDate} • {flight.departureTime}</p>
                  </div>
                  
                  <div className="hidden md:flex flex-col items-center justify-center">
                    <div className="h-0.5 w-28 bg-gray-300"></div>
                    <Plane className="h-5 w-5 text-gray-400 my-2" />
                    <p className="text-body2 text-gray-500">{flight.cabin} Class</p>
                  </div>
                  
                  <div className="text-md:text-right">
                    <p className="text-body2 text-gray-500">To</p>
                    <p className="text-h6 text-primary">{flight.destination}</p>
                    <p className="text-body1">{flight.departureDate} • {flight.arrivalTime}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <Calendar className="h-3.5 w-3.5 inline mr-1" />
                    <span>{flight.departureDate}</span>
                  </div>
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <User className="h-3.5 w-3.5 inline mr-1" />
                    <span>{bookingData.passengers.length} Passengers</span>
                  </div>
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <Coffee className="h-3.5 w-3.5 inline mr-1" />
                    <span>Meal Included</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fare Summary */}
        <div className="card p-6">
          <h3 className="text-h5 text-primary mb-4 flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Fare Summary
          </h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-body2 text-gray-600">Base Fare</span>
              <span className="text-body1">₹{bookingData.fare.baseAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-body2 text-gray-600">Taxes</span>
              <span className="text-body1">₹{bookingData.fare.taxes.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-body2 text-gray-600">Fees</span>
              <span className="text-body1">₹{bookingData.fare.fees.toLocaleString()}</span>
            </div>
            
            {bookingData.addOns.length > 0 && (
              <>
                {bookingData.addOns.map((addon, index) => (
                  <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-body2 text-gray-600">{addon.type} ({addon.details})</span>
                    <span className="text-body1">₹{addon.price.toLocaleString()}</span>
                  </div>
                ))}
              </>
            )}
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-h6 text-primary">Total Amount</span>
              <span className="text-h5 text-primary font-bold">₹{bookingData.fare.total.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-primary-500 mt-0.5" />
              <div>
                <p className="text-body2 text-primary-600 font-medium">{bookingData.fare.refundable ? 'Refundable Fare' : 'Non-Refundable Fare'}</p>
                <p className="text-body2 text-primary-600">
                  {bookingData.fare.refundable 
                    ? 'This fare is refundable subject to cancellation policy and applicable fees' 
                    : 'This fare is non-refundable as per fare rules'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fare Rules */}
        <div className="card p-6">
          <h3 className="text-h5 text-primary mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Fare Rules & Policies
          </h3>
          
          <div className="space-y-6">
            {bookingData.rules.map((rule, index) => (
              <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                <h4 className="text-h6 text-primary mb-2">{rule.type} Policy</h4>
                <p className="text-body2 text-gray-600 mb-2">{rule.allowance}</p>
                <p className="text-body2 font-semibold">
                  Fee: {typeof rule.fee === 'number' ? `₹${rule.fee.toLocaleString()}` : rule.fee}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
            <Download className="h-5 w-5" />
            <span>Download E-Ticket</span>
          </button>
          <button 
            onClick={() => setActiveTab('modify')}
            className="btn-outlined border-secondary-500 text-secondary-500 hover:bg-secondary-50"
          >
            <CalendarClock className="h-5 w-5" />
            <span>Change Flight</span>
          </button>
          <button 
            onClick={() => setActiveTab('seats')}
            className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50"
          >
            <Edit className="h-5 w-5" />
            <span>Change Seats</span>
          </button>
          <button 
            onClick={() => setShowCancellationModal(true)}
            className="btn-outlined border-error-500 text-error-500 hover:bg-error-50"
          >
            <Trash2 className="h-5 w-5" />
            <span>Cancel Booking</span>
          </button>
        </div>
      </div>
    );
  };

  const renderFlightModification = () => {
    return (
      <div className="space-y-8">
        <h3 className="text-h4 text-primary">Change Flight</h3>
        
        <div className="card p-6">
          <h4 className="text-h5 text-primary mb-4">Select New Travel Dates</h4>
          
          <div className="space-y-6">
            <div>
              <p className="text-body1 font-semibold text-primary mb-2">Outbound Flight</p>
              <p className="text-body2 text-gray-600 mb-3">
                {bookingData.flights[0].flightNumber} • {bookingData.flights[0].origin} to {bookingData.flights[0].destination}
              </p>
              <div className="flex items-center space-x-4">
                <div className="floating-label flex-1">
                  <input
                    type="date"
                    className="input-box"
                    id="outbound-date"
                    min={new Date().toISOString().split('T')[0]}
                    value={newDates.outbound}
                    onChange={(e) => setNewDates({...newDates, outbound: e.target.value})}
                  />
                  <label htmlFor="outbound-date">New Departure Date</label>
                  <div className="absolute right-4 top-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50">
                  <Search className="h-5 w-5" />
                  <span>Find Flights</span>
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-body1 font-semibold text-primary mb-2">Return Flight</p>
              <p className="text-body2 text-gray-600 mb-3">
                {bookingData.flights[1].flightNumber} • {bookingData.flights[1].origin} to {bookingData.flights[1].destination}
              </p>
              <div className="flex items-center space-x-4">
                <div className="floating-label flex-1">
                  <input
                    type="date"
                    className="input-box"
                    id="inbound-date"
                    min={newDates.outbound}
                    value={newDates.inbound}
                    onChange={(e) => setNewDates({...newDates, inbound: e.target.value})}
                  />
                  <label htmlFor="inbound-date">New Departure Date</label>
                  <div className="absolute right-4 top-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50">
                  <Search className="h-5 w-5" />
                  <span>Find Flights</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-6 bg-warning-50 border border-warning-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-warning-500 mt-0.5" />
            <div>
              <h4 className="text-h6 text-warning-700 mb-1">Flight Change Policy</h4>
              <p className="text-body2 text-warning-600 mb-3">
                Changes to your flight are subject to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-5 text-warning-700 mr-2">•</span>
                  <span className="text-body2 text-warning-600">Change fee: ₹1,500 per passenger, per flight</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 text-warning-700 mr-2">•</span>
                  <span className="text-body2 text-warning-600">Any fare difference between your original booking and the new flights</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 text-warning-700 mr-2">•</span>
                  <span className="text-body2 text-warning-600">Changes must be made at least 24 hours before scheduled departure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Available Flights (would normally be populated based on search) */}
        <div className="card p-6">
          <h4 className="text-h5 text-primary mb-4">Available Flights</h4>
          
          <div className="text-center py-8">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-body1 text-secondary mb-2">
              Select new travel dates and search for available flights.
            </p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => setActiveTab('details')}
            className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Back to Details
          </button>
          <button
            onClick={handleSaveChanges}
            disabled={true}
            className="btn-contained bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Save Changes</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderSeatSelection = () => {
    return (
      <div className="space-y-8">
        <h3 className="text-h4 text-primary">Change Seats</h3>
        
        <div className="card p-6">
          <h4 className="text-h5 text-primary mb-4">Select Flight</h4>
          
          <div className="space-y-4">
            {bookingData.flights.map((flight, index) => (
              <button
                key={index}
                onClick={() => {}}
                className="w-full card p-4 hover:bg-gray-50 transition-colors duration-200 flex items-start justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Plane className="h-6 w-6 text-primary-500" />
                  <div className="text-left">
                    <p className="text-h6 text-primary">{flight.flightNumber}</p>
                    <p className="text-body2 text-gray-500">
                      {flight.origin} to {flight.destination}
                    </p>
                    <p className="text-body2 text-gray-500">
                      {flight.departureDate} • {flight.departureTime}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 mt-2" />
              </button>
            ))}
          </div>
        </div>
        
        <div className="card p-6">
          <h4 className="text-h5 text-primary mb-4">Select Passenger</h4>
          
          <div className="flex space-x-4 mb-6">
            {bookingData.passengers.map((passenger, index) => (
              <button
                key={index}
                onClick={() => setSelectedPassengerForSeat(index)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  selectedPassengerForSeat === index
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <User className="h-4 w-4" />
                <div className="text-left">
                  <span>{passenger.firstName} {passenger.lastName}</span>
                  <span className="ml-2 bg-white text-primary-700 px-2 py-0.5 rounded text-xs">
                    {passenger.seatNumber}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          <h4 className="text-h6 text-primary mb-2">Current Seat: {bookingData.passengers[selectedPassengerForSeat]?.seatNumber}</h4>
          <p className="text-body2 text-gray-600 mb-4">
            Select a new seat on the map below to change the assigned seat.
          </p>
          
          {/* Seat Legend */}
          {renderSeatLegend()}
          
          {/* Seat Map */}
          {renderSeatMap()}
          
          <div className="card bg-gray-50 p-4 mt-6">
            <p className="text-body2 text-gray-600">
              <AlertCircle className="h-4 w-4 inline mr-1 text-warning-500" />
              Seat change may incur an additional fee depending on the seat type. Premium seats cost ₹1,500 and
              extra legroom seats cost ₹800.
            </p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => setActiveTab('details')}
            className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Back to Details
          </button>
          <button
            onClick={handleSaveChanges}
            className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
          >
            <span>Save Seat Changes</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderAdditionalServices = () => {
    return (
      <div className="space-y-8">
        <h3 className="text-h4 text-primary">Additional Services</h3>
        
        <div className="card p-6">
          <h4 className="text-h5 text-primary mb-6">Add Services to Your Booking</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookingData.availableServices.map((service) => (
              <div key={service.id} className="card bg-gray-50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 rounded-xl p-3">
                      <service.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h5 className="text-h6 text-primary">{service.name}</h5>
                      <p className="text-body2 text-gray-500">{service.description}</p>
                    </div>
                  </div>
                  <p className="text-h6 text-primary font-bold">₹{service.price}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-body2 text-gray-600">Quantity</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleRemoveService(service.id)}
                      disabled={!selectedServices[service.id]}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="font-medium">{selectedServices[service.id] || 0}</span>
                    <button
                      onClick={() => handleAddService(service.id)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {Object.values(selectedServices).some(quantity => quantity > 0) && (
            <div className="card bg-primary-50 border border-primary-200 p-6 mt-8">
              <h4 className="text-h6 text-primary mb-4">Services Summary</h4>
              <div className="space-y-3">
                {Object.entries(selectedServices).map(([serviceId, quantity]) => {
                  if (quantity <= 0) return null;
                  const service = bookingData.availableServices.find(s => s.id === serviceId);
                  if (!service) return null;
                  
                  return (
                    <div key={serviceId} className="flex justify-between items-center pb-2 border-b border-primary-200">
                      <span className="text-body2 text-primary-600">
                        {service.name} x {quantity}
                      </span>
                      <span className="text-body1 font-semibold text-primary-600">
                        ₹{(service.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-body1 font-semibold text-primary-700">Total</span>
                  <span className="text-h6 font-bold text-primary-700">
                    ₹{calculateTotalServiceCost().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="card p-6 bg-success-50 border border-success-200">
          <h4 className="text-h6 text-success-700 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Travel Insurance
          </h4>
          <p className="text-body2 text-success-600 mb-4">
            Protect your trip with comprehensive travel insurance that covers:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-success-500 mt-0.5" />
              <span className="text-body2 text-success-600">Trip cancellation & interruption</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-success-500 mt-0.5" />
              <span className="text-body2 text-success-600">Medical emergencies & evacuation</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-success-500 mt-0.5" />
              <span className="text-body2 text-success-600">Baggage loss & delay</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-success-500 mt-0.5" />
              <span className="text-body2 text-success-600">Flight delay & cancellation</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-body1 text-success-700 font-medium">Coverage up to ₹5,00,000 per person</p>
            <button className="btn-contained bg-success-500 hover:bg-success-600 text-white">
              <Shield className="h-5 w-5" />
              <span>Add Insurance - ₹599</span>
            </button>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => setActiveTab('details')}
            className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Back to Details
          </button>
          <button
            onClick={handleSaveChanges}
            disabled={Object.values(selectedServices).every(quantity => quantity === 0)}
            className="btn-contained bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Add Selected Services</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderCancellationModal = () => {
    if (!showCancellationModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-elevation-3">
          <div className="text-center mb-6">
            <div className="bg-error-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-error-600" />
            </div>
            <h3 className="text-h4 text-primary mb-2">Confirm Cancellation</h3>
            <p className="text-body2 text-gray-600">
              Are you sure you want to cancel this booking? Cancellation fees may apply.
            </p>
          </div>
          
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-warning-500 mt-0.5" />
              <div>
                <h4 className="text-h6 text-warning-700 mb-1">Cancellation Policy</h4>
                <p className="text-body2 text-warning-600">
                  A cancellation fee of ₹3,000 per passenger will be charged. The remaining amount will be refunded to your original payment method within 7-14 business days.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setShowCancellationModal(false)}
              className="flex-1 btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <X className="h-5 w-5" />
              <span>No, Keep My Booking</span>
            </button>
            <button
              onClick={() => {
                alert('Booking cancellation has been initiated. You will receive a confirmation email shortly.');
                setShowCancellationModal(false);
              }}
              className="flex-1 btn-contained bg-error-500 hover:bg-error-600 text-white"
            >
              <Trash2 className="h-5 w-5" />
              <span>Yes, Cancel Booking</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!bookingFound) {
      return (
        <div className="card-elevated p-8">
          <h2 className="text-h3 text-primary mb-6">Retrieve Your Booking</h2>
          
          <div className="space-y-6">
            <div className="floating-label">
              <input
                type="text"
                className="input-box"
                placeholder=" "
                id="booking-reference"
                value={bookingReference}
                onChange={(e) => setBookingReference(e.target.value.toUpperCase())}
                maxLength={6}
              />
              <label htmlFor="booking-reference">Booking Reference (PNR)</label>
            </div>
            
            <div className="floating-label">
              <input
                type="text"
                className="input-box"
                placeholder=" "
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="last-name">Last Name</label>
            </div>
            
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full btn-contained bg-primary-500 hover:bg-primary-600 text-white py-4"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Retrieving booking...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Retrieve Booking</span>
                </>
              )}
            </button>
          </div>
          
          <div className="mt-8 bg-primary-50 rounded-xl p-6 border border-primary-200">
            <h3 className="text-h5 text-primary flex items-center mb-4">
              <FileText className="h-5 w-5 mr-2" />
              Manage Your Booking
            </h3>
            <p className="text-body2 text-gray-600 mb-4">
              With our booking management system, you can:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-primary-500 rounded-full p-1 text-white mr-3 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <p className="text-body2 text-secondary">View your complete itinerary and booking details</p>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-500 rounded-full p-1 text-white mr-3 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <p className="text-body2 text-secondary">Change your flight dates or times (change fees may apply)</p>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-500 rounded-full p-1 text-white mr-3 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <p className="text-body2 text-secondary">Select or modify your seats and meal preferences</p>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-500 rounded-full p-1 text-white mr-3 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <p className="text-body2 text-secondary">Add extra baggage, travel insurance, and other services</p>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-500 rounded-full p-1 text-white mr-3 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <p className="text-body2 text-secondary">Cancel your booking and request a refund (subject to fare rules)</p>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    // Show tabs for different functionalities
    return (
      <div className="space-y-8">
        <div className="card p-4">
          <div className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === 'details'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <FileText className="h-5 w-5 inline-block mr-2" />
              Booking Details
            </button>
            <button
              onClick={() => setActiveTab('modify')}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === 'modify'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <CalendarClock className="h-5 w-5 inline-block mr-2" />
              Change Flight
            </button>
            <button
              onClick={() => setActiveTab('seats')}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === 'seats'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Edit className="h-5 w-5 inline-block mr-2" />
              Change Seats
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === 'services'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Plus className="h-5 w-5 inline-block mr-2" />
              Additional Services
            </button>
          </div>
        </div>
        
        {activeTab === 'details' && renderBookingDetails()}
        {activeTab === 'modify' && renderFlightModification()}
        {activeTab === 'seats' && renderSeatSelection()}
        {activeTab === 'services' && renderAdditionalServices()}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface-secondary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-12">
          <button className="bg-white p-2 rounded-full shadow-md">
            <ArrowLeft className="h-6 w-6 text-primary-500" />
          </button>
          <h1 className="text-h2 text-primary">Manage Booking</h1>
        </div>
        
        {/* Main Content */}
        {renderContent()}
        
        {/* Cancellation Modal */}
        {renderCancellationModal()}
        
        {/* Additional Information */}
        {!bookingFound && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="bg-primary-100 rounded-xl p-3 w-fit mb-4">
                <Plane className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-h5 text-primary mb-3">Need Help?</h3>
              <p className="text-body2 text-gray-600 mb-4">
                Can't find your booking? Our customer support team is available 24/7 to assist you.
              </p>
              <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50 w-full">
                <Phone className="h-5 w-5" />
                <span>Contact Support</span>
              </button>
            </div>
            
            <div className="card p-6">
              <div className="bg-warning-100 rounded-xl p-3 w-fit mb-4">
                <Clock className="h-6 w-6 text-warning-500" />
              </div>
              <h3 className="text-h5 text-primary mb-3">Flight Status</h3>
              <p className="text-body2 text-gray-600 mb-4">
                Want to check your flight status? Get real-time updates on departures and arrivals.
              </p>
              <button className="btn-outlined border-warning-500 text-warning-500 hover:bg-warning-50 w-full">
                <MapPin className="h-5 w-5" />
                <span>Check Flight Status</span>
              </button>
            </div>
            
            <div className="card p-6">
              <div className="bg-success-100 rounded-xl p-3 w-fit mb-4">
                <CheckSquare className="h-6 w-6 text-success-500" />
              </div>
              <h3 className="text-h5 text-primary mb-3">Web Check-In</h3>
              <p className="text-body2 text-gray-600 mb-4">
                Save time at the airport by checking in online between 48 hours and 2 hours before your flight.
              </p>
              <button className="btn-outlined border-success-500 text-success-500 hover:bg-success-50 w-full">
                <ArrowRight className="h-5 w-5" />
                <span>Go to Web Check-In</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookingPage;