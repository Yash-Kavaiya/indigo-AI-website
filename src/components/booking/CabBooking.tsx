import React, { useState } from 'react';
import { 
  Car, MapPin, Calendar, Clock, ArrowRight, User, 
  Star, Shield, CheckCircle, Phone, Navigation,
  Fuel, Users, Luggage, Zap
} from 'lucide-react';

const CabBooking: React.FC = () => {
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip' | 'hourly'>('oneway');
  const [bookingData, setBookingData] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    returnDate: '',
    returnTime: '',
    hours: 4,
    passengers: 1
  });

  const vehicleTypes = [
    {
      id: 'hatchback',
      name: 'Hatchback',
      capacity: '4 seats',
      luggage: '2 bags',
      pricePerKm: 12,
      hourlyRate: 150,
      features: ['AC', 'Music System'],
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=300',
      popular: false,
      fuelType: 'Petrol'
    },
    {
      id: 'sedan',
      name: 'Sedan',
      capacity: '4 seats',
      luggage: '3 bags',
      pricePerKm: 15,
      hourlyRate: 200,
      features: ['AC', 'Music System', 'Extra Legroom'],
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=300',
      popular: true,
      fuelType: 'Petrol'
    },
    {
      id: 'suv',
      name: 'SUV',
      capacity: '6-7 seats',
      luggage: '4-5 bags',
      pricePerKm: 20,
      hourlyRate: 300,
      features: ['AC', 'Music System', 'Extra Space', 'Premium Comfort'],
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=300',
      popular: false,
      fuelType: 'Diesel'
    },
    {
      id: 'luxury',
      name: 'Luxury',
      capacity: '4 seats',
      luggage: '3 bags',
      pricePerKm: 35,
      hourlyRate: 500,
      features: ['Premium AC', 'Leather Seats', 'Wi-Fi', 'Refreshments'],
      image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=300',
      popular: false,
      fuelType: 'Petrol'
    },
    {
      id: 'tempo',
      name: 'Tempo Traveller',
      capacity: '12-15 seats',
      luggage: '8-10 bags',
      pricePerKm: 25,
      hourlyRate: 400,
      features: ['AC', 'Push Back Seats', 'Extra Luggage Space'],
      image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=300',
      popular: false,
      fuelType: 'Diesel'
    },
    {
      id: 'bus',
      name: 'Mini Bus',
      capacity: '20-25 seats',
      luggage: '15+ bags',
      pricePerKm: 30,
      hourlyRate: 600,
      features: ['AC', 'Comfortable Seating', 'Large Luggage Space'],
      image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=300',
      popular: false,
      fuelType: 'Diesel'
    }
  ];

  const popularRoutes = [
    { from: 'Delhi Airport', to: 'Connaught Place', distance: '16 km', price: 240, duration: '45 min' },
    { from: 'Mumbai Airport', to: 'Bandra', distance: '12 km', price: 180, duration: '35 min' },
    { from: 'Bangalore Airport', to: 'Whitefield', distance: '45 km', price: 675, duration: '90 min' },
    { from: 'Chennai Airport', to: 'T. Nagar', distance: '20 km', price: 300, duration: '60 min' }
  ];

  const services = [
    {
      title: 'Airport Transfer',
      description: 'Reliable pickup and drop services to/from airports',
      icon: Navigation,
      features: ['Flight tracking', 'Meet & greet', 'Wait time included']
    },
    {
      title: 'Local Sightseeing',
      description: 'Explore the city with our hourly rental packages',
      icon: MapPin,
      features: ['Flexible timing', 'Multiple stops', 'Local driver guidance']
    },
    {
      title: 'Outstation Travel',
      description: 'Comfortable intercity travel with experienced drivers',
      icon: Car,
      features: ['Round trip options', 'Overnight stays', 'Toll included']
    }
  ];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const calculatePrice = (vehicle: typeof vehicleTypes[0], distance: number = 25) => {
    if (tripType === 'hourly') {
      return vehicle.hourlyRate * bookingData.hours;
    }
    return vehicle.pricePerKm * distance;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-h2 text-primary mb-6">Cab Booking</h1>
        <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto">
          Book reliable cabs for airport transfers, local travel, and outstation trips with professional drivers
        </p>
      </div>

      {/* Trip Type Selection */}
      <div className="card-elevated p-8">
        <div className="flex justify-center mb-8">
          <div className="card p-2 bg-surface-tertiary border-2 border-gray-200">
            <div className="flex rounded-xl overflow-hidden">
              {[
                { id: 'oneway' as const, label: 'One Way' },
                { id: 'roundtrip' as const, label: 'Round Trip' },
                { id: 'hourly' as const, label: 'Hourly Rental' }
              ].map((type) => (
                <button
                  key={type.id}
                  className={`px-8 py-3 font-semibold transition-all duration-300 ${
                    tripType === type.id
                      ? 'bg-white shadow-elevation-1 text-primary-500 rounded-xl'
                      : 'text-secondary hover:text-primary-500'
                  }`}
                  onClick={() => setTripType(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="floating-label">
              <input
                type="text"
                className="input-box"
                placeholder=" "
                id="pickup-location"
                value={bookingData.pickup}
                onChange={(e) => setBookingData({...bookingData, pickup: e.target.value})}
              />
              <label htmlFor="pickup-location">Pickup Location</label>
              <div className="absolute right-4 top-3">
                <MapPin className="h-5 w-5 text-success-500" />
              </div>
            </div>
            
            {tripType !== 'hourly' && (
              <div className="floating-label">
                <input
                  type="text"
                  className="input-box"
                  placeholder=" "
                  id="destination"
                  value={bookingData.destination}
                  onChange={(e) => setBookingData({...bookingData, destination: e.target.value})}
                />
                <label htmlFor="destination">Destination</label>
                <div className="absolute right-4 top-3">
                  <MapPin className="h-5 w-5 text-error-500" />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="floating-label">
              <input
                type="date"
                className="input-box"
                id="pickup-date"
                min={getTodayDate()}
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
              />
              <label htmlFor="pickup-date">Pickup Date</label>
              <div className="absolute right-4 top-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <input
                type="time"
                className="input-box"
                id="pickup-time"
                value={bookingData.time}
                onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
              />
              <label htmlFor="pickup-time">Pickup Time</label>
              <div className="absolute right-4 top-3">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {tripType === 'roundtrip' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="floating-label">
                <input
                  type="date"
                  className="input-box"
                  id="return-date"
                  min={bookingData.date || getTodayDate()}
                  value={bookingData.returnDate}
                  onChange={(e) => setBookingData({...bookingData, returnDate: e.target.value})}
                />
                <label htmlFor="return-date">Return Date</label>
                <div className="absolute right-4 top-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="floating-label">
                <input
                  type="time"
                  className="input-box"
                  id="return-time"
                  value={bookingData.returnTime}
                  onChange={(e) => setBookingData({...bookingData, returnTime: e.target.value})}
                />
                <label htmlFor="return-time">Return Time</label>
                <div className="absolute right-4 top-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          {tripType === 'hourly' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="floating-label">
                <select
                  className="input-box"
                  id="rental-hours"
                  value={bookingData.hours}
                  onChange={(e) => setBookingData({...bookingData, hours: parseInt(e.target.value)})}
                >
                  {[2,4,6,8,10,12].map(hours => (
                    <option key={hours} value={hours}>{hours} Hours</option>
                  ))}
                </select>
                <label htmlFor="rental-hours">Rental Duration</label>
              </div>
              
              <div className="floating-label">
                <select
                  className="input-box"
                  id="passengers"
                  value={bookingData.passengers}
                  onChange={(e) => setBookingData({...bookingData, passengers: parseInt(e.target.value)})}
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
                <label htmlFor="passengers">Number of Passengers</label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vehicle Selection */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary mb-8 text-center">Choose Your Vehicle</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicleTypes.map((vehicle) => (
            <div
              key={vehicle.id}
              className="card overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-elevation-2"
            >
              {vehicle.popular && (
                <div className="bg-success-500 text-white text-center py-2 text-body2 font-bold">
                  Most Popular
                </div>
              )}
              
              <div className="relative">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <Fuel className="h-3 w-3 text-gray-600" />
                    <span className="text-caption text-gray-600">{vehicle.fuelType}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-h5 text-primary font-bold mb-2">{vehicle.name}</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-body2 text-secondary">{vehicle.capacity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Luggage className="h-4 w-4 text-gray-500" />
                    <span className="text-body2 text-secondary">{vehicle.luggage}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {vehicle.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-h5 text-primary font-bold">
                        ₹{tripType === 'hourly' ? vehicle.hourlyRate : vehicle.pricePerKm}
                      </p>
                      <p className="text-body2 text-secondary">
                        per {tripType === 'hourly' ? 'hour' : 'km'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-h6 text-success-600 font-bold">
                        ₹{calculatePrice(vehicle).toLocaleString()}
                      </p>
                      <p className="text-body2 text-secondary">
                        {tripType === 'hourly' ? `${bookingData.hours} hours` : 'estimated'}
                      </p>
                    </div>
                  </div>
                  
                  <button className="w-full btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                    <span>Select {vehicle.name}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary text-center mb-8">Our Services</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="card p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-primary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                <service.icon className="h-10 w-10 text-primary-600" />
              </div>
              <h4 className="text-h5 text-primary mb-3">{service.title}</h4>
              <p className="text-body1 text-secondary mb-4">{service.description}</p>
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success-500" />
                    <span className="text-body2 text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Routes */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary mb-8 text-center">Popular Routes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularRoutes.map((route, index) => (
            <button
              key={index}
              onClick={() => setBookingData({
                ...bookingData,
                pickup: route.from,
                destination: route.to
              })}
              className="card p-6 text-left hover:shadow-elevation-2 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-h6 text-primary font-bold">{route.from}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className="text-h6 text-primary font-bold">{route.to}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-body2 text-secondary">Distance</p>
                  <p className="text-body1 font-semibold text-primary">{route.distance}</p>
                </div>
                <div>
                  <p className="text-body2 text-secondary">Duration</p>
                  <p className="text-body1 font-semibold text-primary">{route.duration}</p>
                </div>
                <div>
                  <p className="text-body2 text-secondary">From</p>
                  <p className="text-h6 text-success-600 font-bold">₹{route.price}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Shield, title: 'Verified Drivers', desc: 'Background checked professional drivers', color: 'success' },
          { icon: Phone, title: 'Live Tracking', desc: 'Real-time GPS tracking for safety', color: 'primary' },
          { icon: Star, title: 'Rated Service', desc: '4.8+ average customer rating', color: 'warning' },
          { icon: Zap, title: 'Quick Booking', desc: 'Book in under 60 seconds', color: 'secondary' }
        ].map((feature, index) => (
          <div key={index} className="card p-6 text-center hover:shadow-elevation-1 transition-all duration-300">
            <div className={`bg-${feature.color}-100 rounded-2xl p-4 w-fit mx-auto mb-4`}>
              <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
            </div>
            <h4 className="text-h6 text-primary mb-2">{feature.title}</h4>
            <p className="text-body2 text-secondary">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CabBooking;