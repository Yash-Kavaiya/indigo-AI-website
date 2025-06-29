import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Check, Calendar, Clock, User, Briefcase, CreditCard, 
  Plane, Printer, Download, AlertTriangle, ChevronRight, CheckSquare,
  Shield, Coffee, Wifi, PlusCircle, MinusCircle, X
} from 'lucide-react';

const WebCheckInPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [bookingReference, setBookingReference] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingFound, setBookingFound] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState('');
  const [selectedPassengerIndex, setSelectedPassengerIndex] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const [boardingPassGenerated, setBoardingPassGenerated] = useState(false);
  
  // Mock flight data
  const flightData = {
    flightNumber: 'AI 308',
    origin: 'Delhi (DEL)',
    destination: 'Mumbai (BOM)',
    departureDate: '2025-01-15',
    departureTime: '10:45',
    arrivalTime: '13:00',
    terminal: 'T3',
    gate: 'B12',
    status: 'On-time',
    boardingTime: '10:00',
    aircraft: 'Airbus A320neo'
  };
  
  // Mock passenger data
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      firstName: 'Rahul',
      lastName: 'Sharma',
      gender: 'Male',
      seatNumber: '',
      checkedIn: false,
      passportNumber: 'J8234567',
      nationality: 'Indian',
      dob: '1988-05-12',
      mealPreference: 'Regular',
      baggage: {
        cabin: {
          allowed: 7,
          purchased: 0,
        },
        checked: {
          allowed: 15,
          purchased: 0,
        }
      }
    },
    {
      id: 2,
      firstName: 'Priya',
      lastName: 'Sharma',
      gender: 'Female',
      seatNumber: '',
      checkedIn: false,
      passportNumber: 'K1234567',
      nationality: 'Indian',
      dob: '1990-08-23',
      mealPreference: 'Vegetarian',
      baggage: {
        cabin: {
          allowed: 7,
          purchased: 0,
        },
        checked: {
          allowed: 15,
          purchased: 0,
        }
      }
    }
  ]);

  // Mock seat layout
  const seatMap = {
    rows: 30,
    seatsPerRow: 6,
    occupiedSeats: ['2A', '3C', '4B', '5F', '7D', '8E', '10A', '12F', '15B', '16C', '17A', '18D', '19F', '22B', '23E'],
    premiumSeats: ['1A', '1B', '1C', '1D', '1E', '1F', '2B', '2C', '2D', '2E', '2F', '3A', '3B', '3D', '3E', '3F'],
    extraLegroom: ['10A', '10B', '10C', '10D', '10E', '10F', '20A', '20B', '20C', '20D', '20E', '20F']
  };

  // Mock baggage prices
  const baggagePrices = {
    cabin: 1500,  // Price per kg for cabin baggage
    checked: 800  // Price per kg for checked baggage
  };

  // Time restriction information
  const checkInWindow = {
    start: 48, // hours before departure
    end: 2     // hours before departure
  };

  const currentPassenger = passengers[selectedPassengerIndex];
  
  const validateBookingReference = (reference) => {
    // Basic validation: 6 alphanumeric characters
    return /^[A-Z0-9]{6}$/.test(reference);
  };

  const validateLastName = (name) => {
    // Basic validation: at least 2 characters, only letters
    return /^[A-Za-z]{2,}$/.test(name);
  };

  const handleSearch = () => {
    if (!validateBookingReference(bookingReference) || !validateLastName(lastName)) {
      alert('Please enter a valid booking reference (6 characters) and last name');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsLoading(false);
      setBookingFound(true);
      setStep(2);
    }, 1500);
  };

  const getSeatPrice = (seatNumber) => {
    if (seatMap.premiumSeats.includes(seatNumber)) {
      return 1500;
    } else if (seatMap.extraLegroom.includes(seatNumber)) {
      return 800;
    }
    return 0;
  };

  const isSeatOccupied = (seatNumber) => {
    // Check if seat is in occupied list or already assigned to a passenger
    return seatMap.occupiedSeats.includes(seatNumber) || 
           passengers.some(p => p.seatNumber === seatNumber && p.id !== currentPassenger.id);
  };

  const isSeatSelected = (seatNumber) => {
    return currentPassenger.seatNumber === seatNumber;
  };

  const isSeatPremium = (seatNumber) => {
    return seatMap.premiumSeats.includes(seatNumber);
  };

  const isSeatExtraLegroom = (seatNumber) => {
    return seatMap.extraLegroom.includes(seatNumber);
  };

  const selectSeat = (seatNumber) => {
    if (isSeatOccupied(seatNumber)) return;
    
    setPassengers(passengers.map((passenger, index) => 
      index === selectedPassengerIndex 
        ? { ...passenger, seatNumber } 
        : passenger
    ));
  };

  const handleBaggageChange = (type, action) => {
    setPassengers(passengers.map((passenger, index) => {
      if (index !== selectedPassengerIndex) return passenger;
      
      const newBaggage = { ...passenger.baggage };
      if (action === 'add') {
        newBaggage[type].purchased += 5; // Add in 5kg increments
      } else if (action === 'remove' && newBaggage[type].purchased >= 5) {
        newBaggage[type].purchased -= 5; // Remove in 5kg increments
      }
      
      return { ...passenger, baggage: newBaggage };
    }));
  };

  const validatePassengerInfo = () => {
    // Perform validation checks here
    const allCheckedIn = passengers.every(p => p.seatNumber);
    if (!allCheckedIn) {
      alert('Please select seats for all passengers');
      return false;
    }
    
    setIsValidated(true);
    setStep(4);
    return true;
  };

  const generateBoardingPass = () => {
    // In a real application, this would call an API to generate boarding passes
    setBoardingPassGenerated(true);
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
    for (let row = 1; row <= seatMap.rows; row++) {
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
        const isSelected = isSeatSelected(seatNumber);
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
            onClick={() => !isOccupied && selectSeat(seatNumber)}
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
      if (row === 10 || row === 20) {
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
      <div className="overflow-y-auto max-h-[600px] p-4">
        {rows}
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

  const renderPassengerSelectionTabs = () => {
    return (
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {passengers.map((passenger, index) => (
          <button
            key={passenger.id}
            onClick={() => setSelectedPassengerIndex(index)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap transition-all duration-200 ${
              selectedPassengerIndex === index
                ? 'bg-primary-500 text-white shadow-md'
                : passenger.seatNumber
                  ? 'bg-success-100 text-success-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <User className="h-4 w-4" />
            <span>{passenger.firstName} {passenger.lastName}</span>
            {passenger.seatNumber && (
              <span className="ml-2 bg-white text-primary-700 px-2 py-0.5 rounded text-xs">
                {passenger.seatNumber}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  };

  const renderBaggageOptions = () => {
    const currentBaggage = currentPassenger.baggage;
    
    return (
      <div className="space-y-6">
        <div className="card bg-gray-50 p-6">
          <h4 className="text-h5 text-primary mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Cabin Baggage
          </h4>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-body2 text-secondary mb-1">Included Allowance:</p>
              <p className="text-body1 font-semibold text-primary">
                {currentBaggage.cabin.allowed} kg
              </p>
            </div>
            <div>
              <p className="text-body2 text-secondary mb-1">Extra Purchased:</p>
              <p className="text-body1 font-semibold text-primary">
                {currentBaggage.cabin.purchased} kg
              </p>
            </div>
            <div>
              <p className="text-body2 text-secondary mb-1">Total:</p>
              <p className="text-body1 font-semibold text-success-600">
                {currentBaggage.cabin.allowed + currentBaggage.cabin.purchased} kg
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body2 text-secondary">Price per 5kg:</p>
              <p className="text-body1 font-semibold text-primary">₹{baggagePrices.cabin}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleBaggageChange('cabin', 'remove')}
                disabled={currentBaggage.cabin.purchased === 0}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MinusCircle className="h-5 w-5 text-gray-600" />
              </button>
              <span className="font-semibold">{currentBaggage.cabin.purchased} kg</span>
              <button
                onClick={() => handleBaggageChange('cabin', 'add')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <PlusCircle className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="card bg-gray-50 p-6">
          <h4 className="text-h5 text-primary mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Checked Baggage
          </h4>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-body2 text-secondary mb-1">Included Allowance:</p>
              <p className="text-body1 font-semibold text-primary">
                {currentBaggage.checked.allowed} kg
              </p>
            </div>
            <div>
              <p className="text-body2 text-secondary mb-1">Extra Purchased:</p>
              <p className="text-body1 font-semibold text-primary">
                {currentBaggage.checked.purchased} kg
              </p>
            </div>
            <div>
              <p className="text-body2 text-secondary mb-1">Total:</p>
              <p className="text-body1 font-semibold text-success-600">
                {currentBaggage.checked.allowed + currentBaggage.checked.purchased} kg
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body2 text-secondary">Price per 5kg:</p>
              <p className="text-body1 font-semibold text-primary">₹{baggagePrices.checked}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleBaggageChange('checked', 'remove')}
                disabled={currentBaggage.checked.purchased === 0}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MinusCircle className="h-5 w-5 text-gray-600" />
              </button>
              <span className="font-semibold">{currentBaggage.checked.purchased} kg</span>
              <button
                onClick={() => handleBaggageChange('checked', 'add')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <PlusCircle className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBoardingPass = (passenger) => {
    return (
      <div className="card-elevated p-0 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <Plane className="h-8 w-8" />
              <h3 className="text-h4 font-bold">Boarding Pass</h3>
            </div>
            <div className="text-right">
              <p className="text-body2">Flight</p>
              <p className="text-h5 font-bold">{flightData.flightNumber}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-body2">Passenger</p>
              <p className="text-h5 font-bold">{passenger.firstName} {passenger.lastName}</p>
            </div>
            <div className="text-right">
              <p className="text-body2">Seat</p>
              <p className="text-h5 font-bold">{passenger.seatNumber}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-body2 text-gray-500">From</p>
              <p className="text-body1 font-semibold">{flightData.origin}</p>
            </div>
            <div>
              <p className="text-body2 text-gray-500">To</p>
              <p className="text-body1 font-semibold">{flightData.destination}</p>
            </div>
            <div>
              <p className="text-body2 text-gray-500">Date</p>
              <p className="text-body1 font-semibold">{flightData.departureDate}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-body2 text-gray-500">Departure</p>
              <p className="text-body1 font-semibold">{flightData.departureTime}</p>
            </div>
            <div>
              <p className="text-body2 text-gray-500">Terminal</p>
              <p className="text-body1 font-semibold">{flightData.terminal}</p>
            </div>
            <div>
              <p className="text-body2 text-gray-500">Gate</p>
              <p className="text-body1 font-semibold">{flightData.gate}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-body2 text-gray-500">Boarding</p>
              <p className="text-body1 font-semibold">{flightData.boardingTime}</p>
            </div>
            <div>
              <p className="text-body2 text-gray-500">Class</p>
              <p className="text-body1 font-semibold">Economy</p>
            </div>
            <div>
              <p className="text-body2 text-gray-500">Baggage</p>
              <p className="text-body1 font-semibold">
                {passenger.baggage.cabin.allowed + passenger.baggage.cabin.purchased}kg + {passenger.baggage.checked.allowed + passenger.baggage.checked.purchased}kg
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button className="flex-1 btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50">
              <Printer className="h-5 w-5" />
              <span>Print</span>
            </button>
            <button className="flex-1 btn-contained bg-primary-500 hover:bg-primary-600 text-white">
              <Download className="h-5 w-5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderProgressBar = () => {
    const steps = [
      { number: 1, label: 'Retrieve Booking' },
      { number: 2, label: 'Select Seats' },
      { number: 3, label: 'Baggage Options' },
      { number: 4, label: 'Verify Details' },
      { number: 5, label: 'Boarding Pass' }
    ];
    
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step > s.number 
                  ? 'bg-success-500 text-white' 
                  : step === s.number
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s.number ? <Check className="h-5 w-5" /> : s.number}
              </div>
              <span className={`text-xs text-center ${
                step === s.number ? 'text-primary-500 font-medium' : 'text-gray-500'
              }`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`hidden md:block absolute h-1 w-[calc((100%-10rem)/4)] ${
                  step > s.number + 1 ? 'bg-success-500' : 'bg-gray-200'
                }`} style={{ left: `calc(${i * 25}% + 5rem)` }}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTimeRestrictionNotice = () => {
    return (
      <div className="card bg-warning-50 border border-warning-200 p-4 mb-8">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-warning-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-h6 text-warning-700 mb-1">Check-In Time Window</h4>
            <p className="text-body2 text-warning-600">
              Web check-in is available from {checkInWindow.start} hours to {checkInWindow.end} hours before your scheduled departure.
              After this time, please proceed directly to the airport check-in counter.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const calculateTotal = () => {
    let total = 0;
    
    // Add seat prices
    passengers.forEach(passenger => {
      if (passenger.seatNumber) {
        total += getSeatPrice(passenger.seatNumber);
      }
      
      // Add baggage prices
      total += (passenger.baggage.cabin.purchased / 5) * baggagePrices.cabin;
      total += (passenger.baggage.checked.purchased / 5) * baggagePrices.checked;
    });
    
    return total;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
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
                disabled={isLoading}
                className="w-full btn-contained bg-primary-500 hover:bg-primary-600 text-white py-4"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Retrieving booking...</span>
                  </>
                ) : (
                  <>
                    <span>Retrieve Booking</span>
                    <ChevronRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-8 bg-primary-50 rounded-xl p-6 border border-primary-200">
              <h3 className="text-h5 text-primary flex items-center mb-4">
                <Check className="h-5 w-5 mr-2" />
                Check-in Tips
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="bg-primary-500 rounded-full p-1 text-white mr-3 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="text-body2 text-secondary">Have your booking reference (PNR) ready, it's on your ticket or confirmation email</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-500 rounded-full p-1 text-white mr-3 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="text-body2 text-secondary">Ensure your last name is entered exactly as it appears on your booking</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-500 rounded-full p-1 text-white mr-3 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="text-body2 text-secondary">Check-in opens 48 hours and closes 2 hours before scheduled departure</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-500 rounded-full p-1 text-white mr-3 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="text-body2 text-secondary">For international flights, ensure your passport and visa details are up to date</p>
                </li>
              </ul>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-8">
            <div className="card-elevated p-8">
              <h2 className="text-h3 text-primary mb-6">Select Seats</h2>
              
              {/* Flight Info */}
              <div className="card p-6 bg-gray-50 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Plane className="h-6 w-6 text-primary-500" />
                    <h3 className="text-h4 text-primary">{flightData.flightNumber}</h3>
                  </div>
                  <div className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium">
                    {flightData.status}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-body2 text-gray-500">From</p>
                    <p className="text-h5 font-semibold">{flightData.origin}</p>
                    <p className="text-body2 text-gray-500">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {flightData.departureTime}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="h-0.5 w-24 lg:w-48 bg-gray-300"></div>
                    <Plane className="h-5 w-5 text-gray-400 my-2" />
                    <p className="text-body2 text-gray-500">{flightData.aircraft}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-body2 text-gray-500">To</p>
                    <p className="text-h5 font-semibold">{flightData.destination}</p>
                    <p className="text-body2 text-gray-500">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {flightData.arrivalTime}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="bg-gray-200 rounded-full px-3 py-1">
                    <Calendar className="h-3.5 w-3.5 inline mr-1" />
                    <span>{flightData.departureDate}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full px-3 py-1">
                    <Plane className="h-3.5 w-3.5 inline mr-1" />
                    <span>Terminal {flightData.terminal}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full px-3 py-1">
                    <CheckSquare className="h-3.5 w-3.5 inline mr-1" />
                    <span>Gate {flightData.gate}</span>
                  </div>
                  <div className="bg-primary-100 text-primary-700 rounded-full px-3 py-1">
                    <Clock className="h-3.5 w-3.5 inline mr-1" />
                    <span>Boarding {flightData.boardingTime}</span>
                  </div>
                </div>
              </div>
              
              {/* Passenger Selection */}
              <h3 className="text-h5 text-primary mb-4">Select Seats for Passengers</h3>
              {renderPassengerSelectionTabs()}
              
              {/* Seat Map Legend */}
              {renderSeatLegend()}
              
              {/* Seat Map */}
              {renderSeatMap()}
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!passengers.every(p => p.seatNumber)}
                  className="btn-contained bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Baggage Options
                </button>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-8">
            <div className="card-elevated p-8">
              <h2 className="text-h3 text-primary mb-6">Baggage Options</h2>
              
              {/* Passenger Selection */}
              <h3 className="text-h5 text-primary mb-4">Select Baggage for Passengers</h3>
              {renderPassengerSelectionTabs()}
              
              {/* Baggage Options */}
              {renderBaggageOptions()}
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Continue to Review
                </button>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-8">
            <div className="card-elevated p-8">
              <h2 className="text-h3 text-primary mb-6">Review & Confirm</h2>
              
              {/* Flight Info */}
              <div className="card p-6 bg-gray-50 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Plane className="h-6 w-6 text-primary-500" />
                    <h3 className="text-h4 text-primary">{flightData.flightNumber}</h3>
                  </div>
                  <div className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium">
                    {flightData.status}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-body2 text-gray-500">From</p>
                    <p className="text-h5 font-semibold">{flightData.origin}</p>
                    <p className="text-body2 text-gray-500">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {flightData.departureTime}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="h-0.5 w-24 lg:w-48 bg-gray-300"></div>
                    <Plane className="h-5 w-5 text-gray-400 my-2" />
                    <p className="text-body2 text-gray-500">{flightData.aircraft}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-body2 text-gray-500">To</p>
                    <p className="text-h5 font-semibold">{flightData.destination}</p>
                    <p className="text-body2 text-gray-500">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {flightData.arrivalTime}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="bg-gray-200 rounded-full px-3 py-1">
                    <Calendar className="h-3.5 w-3.5 inline mr-1" />
                    <span>{flightData.departureDate}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full px-3 py-1">
                    <Plane className="h-3.5 w-3.5 inline mr-1" />
                    <span>Terminal {flightData.terminal}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full px-3 py-1">
                    <CheckSquare className="h-3.5 w-3.5 inline mr-1" />
                    <span>Gate {flightData.gate}</span>
                  </div>
                  <div className="bg-primary-100 text-primary-700 rounded-full px-3 py-1">
                    <Clock className="h-3.5 w-3.5 inline mr-1" />
                    <span>Boarding {flightData.boardingTime}</span>
                  </div>
                </div>
              </div>
              
              {/* Passenger Summary */}
              <h3 className="text-h5 text-primary mb-4">Passenger Details</h3>
              <div className="space-y-4 mb-8">
                {passengers.map((passenger, index) => (
                  <div key={passenger.id} className="card p-4 bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-h6 text-primary">{passenger.firstName} {passenger.lastName}</p>
                          <p className="text-body2 text-gray-500">
                            {passenger.gender} • {passenger.nationality}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-body2 text-gray-500">Seat</p>
                        <p className="text-h6 text-primary font-bold">{passenger.seatNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                        <Briefcase className="h-3.5 w-3.5 inline mr-1" />
                        <span>Cabin: {passenger.baggage.cabin.allowed + passenger.baggage.cabin.purchased} kg</span>
                      </div>
                      <div className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                        <Briefcase className="h-3.5 w-3.5 inline mr-1" />
                        <span>Checked: {passenger.baggage.checked.allowed + passenger.baggage.checked.purchased} kg</span>
                      </div>
                      <div className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                        <Coffee className="h-3.5 w-3.5 inline mr-1" />
                        <span>Meal: {passenger.mealPreference}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Payment Summary */}
              <h3 className="text-h5 text-primary mb-4">Charges Summary</h3>
              <div className="card p-6 bg-gray-50 mb-8">
                <div className="space-y-3">
                  {passengers.map((passenger) => (
                    <React.Fragment key={passenger.id}>
                      {getSeatPrice(passenger.seatNumber) > 0 && (
                        <div className="flex justify-between">
                          <span className="text-body2 text-gray-600">
                            Seat {passenger.seatNumber} ({isSeatPremium(passenger.seatNumber) ? 'Premium' : 'Extra Legroom'})
                          </span>
                          <span className="text-body2 font-semibold">₹{getSeatPrice(passenger.seatNumber)}</span>
                        </div>
                      )}
                      
                      {passenger.baggage.cabin.purchased > 0 && (
                        <div className="flex justify-between">
                          <span className="text-body2 text-gray-600">
                            Extra Cabin Baggage ({passenger.baggage.cabin.purchased} kg)
                          </span>
                          <span className="text-body2 font-semibold">
                            ₹{(passenger.baggage.cabin.purchased / 5) * baggagePrices.cabin}
                          </span>
                        </div>
                      )}
                      
                      {passenger.baggage.checked.purchased > 0 && (
                        <div className="flex justify-between">
                          <span className="text-body2 text-gray-600">
                            Extra Checked Baggage ({passenger.baggage.checked.purchased} kg)
                          </span>
                          <span className="text-body2 font-semibold">
                            ₹{(passenger.baggage.checked.purchased / 5) * baggagePrices.checked}
                          </span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                  
                  {calculateTotal() > 0 ? (
                    <>
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>₹{calculateTotal()}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mt-4">
                        <button className="btn-contained bg-success-500 hover:bg-success-600 text-white">
                          <CreditCard className="h-5 w-5" />
                          <span>Proceed to Payment</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="bg-success-100 text-success-700 p-3 rounded-lg text-center">
                      <Check className="h-5 w-5 inline mr-2" />
                      No additional charges
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => { validatePassengerInfo(); setStep(5); }}
                  className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Complete Check-In
                </button>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-8">
            <div className="card-elevated p-8">
              <div className="text-center mb-8">
                <div className="bg-success-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-success-600" />
                </div>
                <h2 className="text-h3 text-primary mb-2">Check-In Successful!</h2>
                <p className="text-body1 text-secondary">
                  Your boarding passes are ready. Save them to your device or print them for your journey.
                </p>
              </div>
              
              {!boardingPassGenerated ? (
                <div className="text-center">
                  <button
                    onClick={generateBoardingPass}
                    className="btn-contained bg-primary-500 hover:bg-primary-600 text-white px-8 py-3"
                  >
                    <Plane className="h-5 w-5" />
                    <span>Generate Boarding Passes</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {passengers.map((passenger) => (
                    renderBoardingPass(passenger)
                  ))}
                  
                  <div className="card bg-primary-50 border border-primary-200 p-6">
                    <h3 className="text-h5 text-primary mb-4">Important Information</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-primary-500 mr-3 mt-0.5" />
                        <p className="text-body2 text-secondary">Please arrive at the airport at least 2 hours before your flight departure time</p>
                      </li>
                      <li className="flex items-start">
                        <CheckSquare className="h-5 w-5 text-primary-500 mr-3 mt-0.5" />
                        <p className="text-body2 text-secondary">Keep your boarding pass and a valid photo ID ready for security checks</p>
                      </li>
                      <li className="flex items-start">
                        <Briefcase className="h-5 w-5 text-primary-500 mr-3 mt-0.5" />
                        <p className="text-body2 text-secondary">Ensure your baggage complies with the size and weight restrictions</p>
                      </li>
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 text-primary-500 mr-3 mt-0.5" />
                        <p className="text-body2 text-secondary">Review security regulations for prohibited items before packing</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={() => window.location.reload()}
                      className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50"
                    >
                      Start New Check-In
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button className="bg-white p-2 rounded-full shadow-md">
              <ArrowLeft className="h-6 w-6 text-primary-500" />
            </button>
            <h1 className="text-h2 text-primary">Web Check-In</h1>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="text-body2 text-gray-600">
              Check-in window: 48h to 2h before departure
            </span>
          </div>
        </div>

        {/* Time Restriction Notice (Mobile) */}
        <div className="md:hidden mb-6">
          {renderTimeRestrictionNotice()}
        </div>
        
        {/* Progress Bar */}
        <div className="relative mb-12">
          {renderProgressBar()}
        </div>

        {/* Time Restriction Notice (Desktop) */}
        <div className="hidden md:block mb-8">
          {renderTimeRestrictionNotice()}
        </div>
        
        {/* Main Content */}
        {renderStep()}
        
        {/* Additional Information */}
        {step === 1 && (
          <div className="mt-8 card-elevated p-8">
            <h3 className="text-h4 text-primary mb-6">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-h6 text-primary mb-3">What do I need for web check-in?</h4>
                <p className="text-body2 text-secondary">
                  You'll need your booking reference (PNR) and the last name of any passenger on the booking.
                  The booking reference is a 6-character code found on your e-ticket or booking confirmation email.
                </p>
              </div>
              
              <div>
                <h4 className="text-h6 text-primary mb-3">When can I check-in online?</h4>
                <p className="text-body2 text-secondary">
                  Web check-in opens 48 hours before your scheduled departure and closes 2 hours prior to departure.
                  After this window, you'll need to check in at the airport.
                </p>
              </div>
              
              <div>
                <h4 className="text-h6 text-primary mb-3">Can I change my seat after check-in?</h4>
                <p className="text-body2 text-secondary">
                  Yes, you can modify your seat selection up until 2 hours before your flight by retrieving your booking
                  again through the web check-in process, subject to seat availability.
                </p>
              </div>
              
              <div>
                <h4 className="text-h6 text-primary mb-3">What if I need special assistance?</h4>
                <p className="text-body2 text-secondary">
                  If you require special assistance, we recommend completing web check-in and then contacting our
                  customer service at least 48 hours before your flight to arrange for your specific needs.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebCheckInPage;