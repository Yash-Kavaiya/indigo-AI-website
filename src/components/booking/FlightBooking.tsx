import React, { useState } from 'react';
import { 
  Plane, Calendar, User, ArrowRight, MapPin, Clock, 
  Sparkles, TrendingUp, Star, AlertCircle, ArrowLeftRight,
  Zap, Shield, CheckCircle, Globe, DollarSign
} from 'lucide-react';

const FlightBooking: React.FC = () => {
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip' | 'multicity'>('roundtrip');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: { adults: 1, children: 0, infants: 0 },
    class: 'economy'
  });
  const [showAIInsights, setShowAIInsights] = useState(true);

  const popularRoutes = [
    { from: 'Delhi', to: 'Mumbai', price: '₹4,299', duration: '2h 15m' },
    { from: 'Mumbai', to: 'Bangalore', price: '₹5,199', duration: '1h 30m' },
    { from: 'Delhi', to: 'Kolkata', price: '₹6,799', duration: '2h 5m' },
    { from: 'Chennai', to: 'Delhi', price: '₹7,499', duration: '2h 45m' }
  ];

  const aiInsights = [
    {
      type: 'price',
      title: 'Best Time to Book',
      message: 'Prices are 23% lower on Tuesday departures. Save ₹1,500 by flying Tuesday!',
      confidence: 92,
      icon: TrendingUp,
      color: 'success'
    },
    {
      type: 'timing',
      title: 'Smart Timing Alert',
      message: 'Booking 3 weeks ahead saves up to ₹3,000. Current prices expected to rise 15%.',
      confidence: 88,
      icon: Clock,
      color: 'warning'
    },
    {
      type: 'route',
      title: 'Alternative Routes',
      message: 'Flying via Hyderabad saves ₹2,200 with only 45 minutes extra travel time.',
      confidence: 85,
      icon: MapPin,
      color: 'primary'
    }
  ];

  const cabinClasses = [
    { 
      id: 'economy', 
      name: 'Economy', 
      features: ['Standard seat', 'Meal included', 'Carry-on bag'],
      popular: true 
    },
    { 
      id: 'premium-economy', 
      name: 'Premium Economy', 
      features: ['Extra legroom', 'Premium meal', 'Priority boarding'],
      popular: false 
    },
    { 
      id: 'business', 
      name: 'Business', 
      features: ['Lie-flat seats', 'Gourmet dining', 'Lounge access'],
      popular: false 
    }
  ];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const totalPassengers = searchData.passengers.adults + searchData.passengers.children + searchData.passengers.infants;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-h2 text-primary mb-6">Flight Booking</h1>
        <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
          Find and book the best flights with our AI-powered search and price prediction technology
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
                { id: 'multicity' as const, label: 'Multi City' }
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

        {/* Search Form */}
        <div className="space-y-8">
          {/* Route Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="floating-label">
              <input
                type="text"
                className="input-box"
                placeholder=" "
                id="from-city"
                value={searchData.from}
                onChange={(e) => setSearchData({...searchData, from: e.target.value})}
              />
              <label htmlFor="from-city">From</label>
              <div className="absolute right-4 top-3">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <div className="floating-label">
                <input
                  type="text"
                  className="input-box"
                  placeholder=" "
                  id="to-city"
                  value={searchData.to}
                  onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                />
                <label htmlFor="to-city">To</label>
                <div className="absolute right-4 top-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white border-2 border-primary-200 rounded-full p-2 hover:bg-primary-50 transition-colors duration-200">
                <ArrowLeftRight className="h-5 w-5 text-primary-500" />
              </button>
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="floating-label">
              <input
                type="date"
                className="input-box"
                id="departure-date"
                min={getTodayDate()}
                value={searchData.departure}
                onChange={(e) => setSearchData({...searchData, departure: e.target.value})}
              />
              <label htmlFor="departure-date">Departure Date</label>
              <div className="absolute right-4 top-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {tripType === 'roundtrip' && (
              <div className="floating-label">
                <input
                  type="date"
                  className="input-box"
                  id="return-date"
                  min={searchData.departure || getTomorrowDate()}
                  value={searchData.return}
                  onChange={(e) => setSearchData({...searchData, return: e.target.value})}
                />
                <label htmlFor="return-date">Return Date</label>
                <div className="absolute right-4 top-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}
          </div>

          {/* Passengers and Class */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card border-2 border-gray-200 p-6">
              <h4 className="text-h6 text-primary mb-4 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Passengers</span>
              </h4>
              <div className="space-y-4">
                {[
                  { key: 'adults' as const, label: 'Adults', sublabel: '12+ years' },
                  { key: 'children' as const, label: 'Children', sublabel: '2-12 years' },
                  { key: 'infants' as const, label: 'Infants', sublabel: 'Under 2 years' }
                ].map((type) => (
                  <div key={type.key} className="flex items-center justify-between">
                    <div>
                      <p className="text-body1 text-primary font-medium">{type.label}</p>
                      <p className="text-body2 text-secondary">{type.sublabel}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSearchData({
                          ...searchData,
                          passengers: {
                            ...searchData.passengers,
                            [type.key]: Math.max(0, searchData.passengers[type.key] - 1)
                          }
                        })}
                        disabled={type.key === 'adults' && searchData.passengers[type.key] <= 1}
                        className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 w-10 h-10 rounded-full flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-body1 font-semibold">
                        {searchData.passengers[type.key]}
                      </span>
                      <button
                        onClick={() => setSearchData({
                          ...searchData,
                          passengers: {
                            ...searchData.passengers,
                            [type.key]: searchData.passengers[type.key] + 1
                          }
                        })}
                        disabled={totalPassengers >= 9}
                        className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 w-10 h-10 rounded-full flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card border-2 border-gray-200 p-6">
              <h4 className="text-h6 text-primary mb-4 flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Travel Class</span>
              </h4>
              <div className="space-y-3">
                {cabinClasses.map((cabinClass) => (
                  <label key={cabinClass.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="class"
                      value={cabinClass.id}
                      checked={searchData.class === cabinClass.id}
                      onChange={(e) => setSearchData({...searchData, class: e.target.value})}
                      className="mt-1 w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-body1 font-medium text-primary">{cabinClass.name}</span>
                        {cabinClass.popular && (
                          <span className="bg-success-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cabinClass.features.map((feature, index) => (
                          <span key={index} className="text-body2 text-secondary">
                            {feature}{index < cabinClass.features.length - 1 ? ' • ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full btn-contained bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-5 text-h6 shadow-elevation-2 hover:shadow-elevation-3">
            <Plane className="h-6 w-6" />
            <span>Search Flights</span>
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* AI Insights */}
      {showAIInsights && (
        <div className="card-elevated p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-h4 text-primary flex items-center space-x-3">
              <Sparkles className="h-6 w-6 text-primary-500" />
              <span>AI Travel Insights</span>
            </h3>
            <button
              onClick={() => setShowAIInsights(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {aiInsights.map((insight, index) => (
              <div key={index} className={`card border-2 border-${insight.color}-200 bg-${insight.color}-50 p-6`}>
                <div className="flex items-start space-x-4">
                  <div className={`bg-${insight.color}-500 rounded-2xl p-3`}>
                    <insight.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-h6 text-${insight.color}-700 mb-2`}>{insight.title}</h4>
                    <p className={`text-body2 text-${insight.color}-600 mb-3`}>{insight.message}</p>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 bg-${insight.color}-500 rounded-full`}></div>
                      <span className={`text-caption text-${insight.color}-600 font-medium`}>
                        {insight.confidence}% confident
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Routes */}
      <div className="card-elevated p-8">
        <h3 className="text-h4 text-primary mb-6">Popular Routes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => (
            <button
              key={index}
              onClick={() => setSearchData({
                ...searchData,
                from: route.from,
                to: route.to
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
              <div className="space-y-2">
                <p className="text-h5 text-success-600 font-bold">{route.price}</p>
                <p className="text-body2 text-secondary">{route.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Zap, title: 'Instant Booking', desc: 'Book in under 60 seconds', color: 'primary' },
          { icon: Shield, title: 'Secure Payment', desc: 'SSL encrypted & safe', color: 'success' },
          { icon: CheckCircle, title: 'Free Cancellation', desc: 'Cancel up to 24hrs before', color: 'warning' },
          { icon: Globe, title: 'Global Coverage', desc: '500+ destinations worldwide', color: 'secondary' }
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

export default FlightBooking;