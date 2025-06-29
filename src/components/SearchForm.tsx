import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, User, Sparkles, Bot, ArrowRight, DollarSign, Globe } from 'lucide-react';

const SearchForm: React.FC = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '1 Adult',
    currency: 'INR'
  });

  const [aiMode, setAiMode] = useState(false);
  const [travelDescription, setTravelDescription] = useState('');
  const [flexibleDates, setFlexibleDates] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [focusReturnDate, setFocusReturnDate] = useState(false);
  
  const returnDateInputRef = useRef<HTMLInputElement>(null);

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' }
  ];

  const budgetRanges = {
    'INR': [
      { value: '25000-75000', label: '₹25,000 - ₹75,000 per person' },
      { value: '75000-150000', label: '₹75,000 - ₹1,50,000 per person' },
      { value: '150000-300000', label: '₹1,50,000 - ₹3,00,000 per person' },
      { value: '300000+', label: '₹3,00,000+ per person' }
    ],
    'USD': [
      { value: '300-900', label: '$300 - $900 per person' },
      { value: '900-1800', label: '$900 - $1,800 per person' },
      { value: '1800-3600', label: '$1,800 - $3,600 per person' },
      { value: '3600+', label: '$3,600+ per person' }
    ],
    'EUR': [
      { value: '250-750', label: '€250 - €750 per person' },
      { value: '750-1500', label: '€750 - €1,500 per person' },
      { value: '1500-3000', label: '€1,500 - €3,000 per person' },
      { value: '3000+', label: '€3,000+ per person' }
    ]
  };

  const getCurrentBudgetRanges = () => {
    return budgetRanges[searchData.currency as keyof typeof budgetRanges] || budgetRanges['USD'];
  };

  const getCurrentCurrencySymbol = () => {
    const currency = currencies.find(c => c.code === searchData.currency);
    return currency ? currency.symbol : '₹';
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get tomorrow's date in YYYY-MM-DD format
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  useEffect(() => {
    // Focus return date input when departure date is selected
    if (focusReturnDate && returnDateInputRef.current) {
      returnDateInputRef.current.focus();
      setFocusReturnDate(false);
    }
  }, [focusReturnDate]);

  const handleDepartureDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData({...searchData, departure: e.target.value});
    setFocusReturnDate(true);
  };

  return (
    <section id="search" className="py-24 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200 shadow-elevation-1 mb-8">
            <Bot className="h-6 w-6 text-primary-500" />
            <span className="text-body1 font-semibold text-primary">AI-Powered Search</span>
          </div>
          <h2 className="text-h2 text-primary mb-6">
            Intelligent Flight Search
          </h2>
          <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
            Let our AI find the perfect flights based on your preferences, budget, and travel patterns
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Currency Selector */}
          <div className="flex justify-center mb-8">
            <div className="card p-2 bg-white border-2 border-primary-100">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-secondary">
                  <Globe className="h-5 w-5" />
                  <span className="text-body2 font-medium">Currency:</span>
                </div>
                <select
                  value={searchData.currency}
                  onChange={(e) => setSearchData({...searchData, currency: e.target.value})}
                  className="input-box w-48 py-2 bg-white border-0 focus:ring-2 focus:ring-primary-200"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* AI Mode Toggle */}
          <div className="flex justify-center mb-12">
            <div className="card p-2 bg-surface-tertiary border-2 border-gray-200">
              <div className="flex rounded-xl overflow-hidden">
                <button
                  className={`px-8 py-4 font-semibold transition-all duration-300 flex items-center space-x-3 ${
                    !aiMode 
                      ? 'bg-white shadow-elevation-1 text-primary-500 rounded-xl' 
                      : 'text-secondary hover:text-primary-500'
                  }`}
                  onClick={() => setAiMode(false)}
                >
                  <Search className="h-5 w-5" />
                  <span>Standard Search</span>
                </button>
                <button
                  className={`px-8 py-4 font-semibold transition-all duration-300 flex items-center space-x-3 ${
                    aiMode 
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-elevation-2 rounded-xl' 
                      : 'text-secondary hover:text-primary-500'
                  }`}
                  onClick={() => setAiMode(true)}
                >
                  <Bot className="h-5 w-5" />
                  <span>AI-Powered</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <div className="card-elevated p-8 lg:p-10">
            {aiMode ? (
              // AI Search Mode
              <div className="space-y-8">
                <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 p-8 border-2 border-primary-200">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-3">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-h5 text-primary">Tell me about your ideal trip</h3>
                      <p className="text-body2 text-secondary mt-1">Describe your perfect travel experience</p>
                    </div>
                  </div>
                  <div className="floating-label">
                    <textarea
                      className="input-box h-40 resize-none"
                      placeholder=" "
                      id="travel-description"
                      value={travelDescription}
                      onChange={(e) => setTravelDescription(e.target.value)}
                    />
                    <label htmlFor="travel-description">
                      I want to visit a warm destination in March for a romantic getaway. I prefer direct flights and luxury accommodations. Budget is around {getCurrentCurrencySymbol()}3000 per person...
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="floating-label">
                    <input
                      type="text"
                      className="input-box"
                      placeholder=" "
                      id="flexible-dates"
                      value={flexibleDates}
                      onChange={(e) => setFlexibleDates(e.target.value)}
                    />
                    <label htmlFor="flexible-dates">Travel Dates (Flexible)</label>
                    <div className="absolute right-4 top-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="floating-label">
                    <select 
                      className="input-box" 
                      id="budget-range"
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                    >
                      <option value="">Select budget range</option>
                      {getCurrentBudgetRanges().map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="budget-range">Budget Range</label>
                  </div>
                </div>

                <button className="w-full btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-5 text-h6 shadow-elevation-3 hover:shadow-elevation-4 ripple transform hover:scale-[1.02] transition-all duration-300">
                  <Sparkles className="h-6 w-6" />
                  <span>Let AI Plan My Trip</span>
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            ) : (
              // Standard Search Mode
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="floating-label">
                    <input
                      type="text"
                      className="input-box"
                      placeholder=" "
                      id="from-location"
                      value={searchData.from}
                      onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                    />
                    <label htmlFor="from-location">From</label>
                    <div className="absolute right-4 top-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="floating-label">
                    <input
                      type="text"
                      className="input-box"
                      placeholder=" "
                      id="to-location"
                      value={searchData.to}
                      onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                    />
                    <label htmlFor="to-location">To</label>
                    <div className="absolute right-4 top-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="floating-label">
                    <input
                      type="date"
                      className="input-box"
                      id="departure-date"
                      min={getTodayDate()}
                      value={searchData.departure}
                      onChange={handleDepartureDateChange}
                    />
                    <label htmlFor="departure-date">Departure Date</label>
                    <div className="absolute right-4 top-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="floating-label">
                    <input
                      type="date"
                      className="input-box"
                      id="return-date"
                      min={searchData.departure || getTomorrowDate()}
                      value={searchData.return}
                      onChange={(e) => setSearchData({...searchData, return: e.target.value})}
                      ref={returnDateInputRef}
                    />
                    <label htmlFor="return-date">Return Date</label>
                    <div className="absolute right-4 top-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="floating-label">
                    <select
                      className="input-box"
                      id="passengers"
                      value={searchData.passengers}
                      onChange={(e) => setSearchData({...searchData, passengers: e.target.value})}
                    >
                      <option value="1 Adult">1 Adult</option>
                      <option value="2 Adults">2 Adults</option>
                      <option value="3 Adults">3 Adults</option>
                      <option value="4 Adults">4 Adults</option>
                      <option value="1 Adult, 1 Child">1 Adult, 1 Child</option>
                      <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                      <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
                      <option value="3 Adults, 1 Child">3 Adults, 1 Child</option>
                      <option value="Family (2 Adults, 3+ Children)">Family (2 Adults, 3+ Children)</option>
                    </select>
                    <label htmlFor="passengers">Passengers</label>
                    <div className="absolute right-4 top-3">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <button className="w-full btn-contained bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-5 text-h6 shadow-elevation-2 hover:shadow-elevation-3 ripple transform hover:scale-[1.02] transition-all duration-300">
                  <Search className="h-6 w-6" />
                  <span>Search Flights</span>
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>

          {/* AI Insights */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card bg-primary-50 border-2 border-primary-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary-500 rounded-xl p-2">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="text-h6 text-primary-700 font-semibold">AI Insight</span>
              </div>
              <p className="text-body2 text-primary-600">
                Flights to your destination are 23% cheaper if you travel on Tuesday. Save up to {getCurrentCurrencySymbol()}5,000 per ticket!
              </p>
            </div>
            
            <div className="card bg-secondary-50 border-2 border-secondary-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-secondary-500 rounded-xl p-2">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-h6 text-secondary-700 font-semibold">Smart Suggestion</span>
              </div>
              <p className="text-body2 text-secondary-600">
                Consider flying to nearby airports to save up to {getCurrentCurrencySymbol()}8,000 per ticket with minimal travel time.
              </p>
            </div>
            
            <div className="card bg-warning-50 border-2 border-warning-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-warning-500 rounded-xl p-2">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-h6 text-warning-700 font-semibold">Best Time</span>
              </div>
              <p className="text-body2 text-warning-600">
                Book now - prices expected to increase by 15% next week. Current deals expire in 3 days.
              </p>
            </div>
          </div>

          {/* Currency Exchange Info */}
          <div className="mt-8 card bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-600 rounded-xl p-2">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-h6 text-primary font-semibold">Currency Information</h4>
                  <p className="text-body2 text-secondary">
                    All prices displayed in {searchData.currency}. Real-time exchange rates applied.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-body2 font-semibold text-primary">Selected: {getCurrentCurrencySymbol()} {searchData.currency}</p>
                <p className="text-caption text-secondary">Live rates updated every minute</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;