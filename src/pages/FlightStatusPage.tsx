import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Search, Plane, Clock, Calendar, MapPin, 
  RefreshCw, ArrowRight, AlertCircle, Cloud, Sunrise, 
  Sunset, Wind, Thermometer, ChevronDown, Users, LocateFixed, 
  Info, Phone, CalendarClock, CheckSquare
} from 'lucide-react';

const FlightStatusPage: React.FC = () => {
  const [searchType, setSearchType] = useState<'flight' | 'route'>('flight');
  const [flightNumber, setFlightNumber] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(getTodayDate());
  const [isSearching, setIsSearching] = useState(false);
  const [flightData, setFlightData] = useState<any>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshCountdown, setRefreshCountdown] = useState(60);
  const [showDetails, setShowDetails] = useState(false);
  
  const refreshTimerRef = useRef<NodeJS.Timeout>();
  const refreshCountdownRef = useRef<NodeJS.Timeout>();
  
  const popularRoutes = [
    { from: 'DEL', to: 'BOM', name: 'Delhi - Mumbai' },
    { from: 'BOM', to: 'BLR', name: 'Mumbai - Bangalore' },
    { from: 'DEL', to: 'CCU', name: 'Delhi - Kolkata' },
    { from: 'BLR', to: 'HYD', name: 'Bangalore - Hyderabad' },
    { from: 'DEL', to: 'MAA', name: 'Delhi - Chennai' }
  ];
  
  const popularFlights = [
    { number: 'AI 101', route: 'Delhi - London' },
    { number: 'AI 308', route: 'Delhi - Mumbai' },
    { number: 'AI 563', route: 'Mumbai - Bangalore' },
    { number: 'AI 665', route: 'Delhi - Singapore' },
    { number: 'AI 809', route: 'Delhi - Dubai' }
  ];

  // Mock flight data
  const mockFlightData = {
    flightNumber: 'AI 308',
    origin: {
      code: 'DEL',
      city: 'Delhi',
      terminal: 'T3',
      scheduledTime: '10:45',
      actualTime: '11:05',
      status: 'Departed',
      gate: 'B12',
      weather: {
        condition: 'Partly Cloudy',
        temperature: 28,
        windSpeed: '15 km/h',
        humidity: '65%',
        visibility: 'Good'
      }
    },
    destination: {
      code: 'BOM',
      city: 'Mumbai',
      terminal: 'T2',
      scheduledTime: '13:00',
      actualTime: '13:20',
      status: 'Expected',
      gate: 'D4',
      weather: {
        condition: 'Light Rain',
        temperature: 30,
        windSpeed: '12 km/h',
        humidity: '80%',
        visibility: 'Moderate'
      }
    },
    aircraft: {
      type: 'Airbus A320neo',
      registration: 'VT-ITO',
      age: '2 years',
      position: { lat: 21.1458, lng: 74.8125 }, // Current position coordinates
      altitude: '38,000 ft',
      speed: '850 km/h',
      heading: '205°',
      progress: 65 // Percentage of journey completed
    },
    flightStatus: 'In-flight',
    statusDetails: 'Delayed by 20 minutes',
    statusColor: 'warning', // success, warning, error
    departureDate: '2025-01-15',
    arrivalDate: '2025-01-15',
    flightDuration: '2h 15m',
    distance: '1,200 km',
    codeshare: [
      { airline: 'Lufthansa', flightNumber: 'LH 8401' },
      { airline: 'United Airlines', flightNumber: 'UA 9052' }
    ],
    lastUpdated: '2025-01-15 11:10 IST'
  };
  
  useEffect(() => {
    return () => {
      // Clear timers on component unmount
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
      if (refreshCountdownRef.current) {
        clearInterval(refreshCountdownRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    // Reset countdown when flight data changes
    if (flightData && autoRefresh) {
      startRefreshCountdown();
    }
  }, [flightData, autoRefresh]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const startRefreshCountdown = () => {
    // Clear any existing interval
    if (refreshCountdownRef.current) {
      clearInterval(refreshCountdownRef.current);
    }
    
    // Reset countdown
    setRefreshCountdown(60);
    
    // Start new countdown
    refreshCountdownRef.current = setInterval(() => {
      setRefreshCountdown(prev => {
        if (prev <= 1) {
          refreshFlightData();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSearch = () => {
    if (searchType === 'flight' && !flightNumber) {
      alert('Please enter a flight number');
      return;
    }
    
    if (searchType === 'route' && (!origin || !destination)) {
      alert('Please enter both origin and destination');
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsSearching(false);
      setFlightData(mockFlightData);
      
      // Start auto-refresh if enabled
      if (autoRefresh) {
        startRefreshCountdown();
      }
    }, 1500);
  };

  const refreshFlightData = () => {
    setIsSearching(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsSearching(false);
      // In a real app, this would fetch the latest data
      // Here we just update the lastUpdated field and aircraft position
      setFlightData(prev => ({
        ...prev,
        lastUpdated: getCurrentTimestamp(),
        aircraft: {
          ...prev.aircraft,
          position: { 
            lat: prev.aircraft.position.lat + 0.05, 
            lng: prev.aircraft.position.lng + 0.07 
          },
          progress: Math.min(100, prev.aircraft.progress + 3)
        }
      }));
    }, 1000);
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19) + ' IST';
  };

  const handleAutoRefreshToggle = () => {
    const newValue = !autoRefresh;
    setAutoRefresh(newValue);
    
    if (newValue && flightData) {
      startRefreshCountdown();
    } else if (refreshCountdownRef.current) {
      clearInterval(refreshCountdownRef.current);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'success';
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sunrise className="h-6 w-6 text-warning-500" />;
      case 'partly cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-600" />;
      case 'light rain':
      case 'rain':
        return <Cloud className="h-6 w-6 text-gray-600" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  const selectRoute = (fromCode, toCode) => {
    setOrigin(fromCode);
    setDestination(toCode);
  };

  const selectFlight = (flightNum) => {
    setFlightNumber(flightNum);
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
            <h1 className="text-h2 text-primary">Flight Status</h1>
          </div>
          
          {flightData && (
            <div className="flex items-center space-x-2 text-body2 text-gray-600">
              <Clock className="h-5 w-5 text-gray-500" />
              <span>Last updated: {flightData.lastUpdated}</span>
              {autoRefresh && <span className="text-primary-500 ml-2">Refreshing in {refreshCountdown}s</span>}
            </div>
          )}
        </div>

        {/* Search Section */}
        <div className="card-elevated p-8 mb-12">
          <div className="flex justify-center mb-8">
            <div className="card p-2 bg-surface-tertiary border-2 border-gray-200 inline-flex">
              <div className="flex rounded-xl overflow-hidden">
                <button
                  className={`px-6 py-3 font-semibold transition-all duration-300 ${
                    searchType === 'flight'
                      ? 'bg-white shadow-elevation-1 text-primary-500 rounded-xl'
                      : 'text-secondary hover:text-primary-500'
                  }`}
                  onClick={() => setSearchType('flight')}
                >
                  By Flight Number
                </button>
                <button
                  className={`px-6 py-3 font-semibold transition-all duration-300 ${
                    searchType === 'route'
                      ? 'bg-white shadow-elevation-1 text-primary-500 rounded-xl'
                      : 'text-secondary hover:text-primary-500'
                  }`}
                  onClick={() => setSearchType('route')}
                >
                  By Route
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {searchType === 'flight' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="floating-label md:col-span-2">
                  <input
                    type="text"
                    className="input-box"
                    placeholder=" "
                    id="flight-number"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                  />
                  <label htmlFor="flight-number">Flight Number (e.g., AI 308)</label>
                  <div className="absolute right-4 top-3">
                    <Plane className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="floating-label">
                  <input
                    type="date"
                    className="input-box"
                    id="flight-date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <label htmlFor="flight-date">Date</label>
                  <div className="absolute right-4 top-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="floating-label">
                  <input
                    type="text"
                    className="input-box"
                    placeholder=" "
                    id="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                  />
                  <label htmlFor="origin">Origin (e.g., DEL)</label>
                  <div className="absolute right-4 top-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="floating-label">
                  <input
                    type="text"
                    className="input-box"
                    placeholder=" "
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value.toUpperCase())}
                  />
                  <label htmlFor="destination">Destination (e.g., BOM)</label>
                  <div className="absolute right-4 top-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="floating-label">
                  <input
                    type="date"
                    className="input-box"
                    id="route-date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <label htmlFor="route-date">Date</label>
                  <div className="absolute right-4 top-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="auto-refresh"
                  checked={autoRefresh}
                  onChange={handleAutoRefreshToggle}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="auto-refresh" className="text-body2 text-gray-700">
                  Auto-refresh every minute
                </label>
              </div>
              
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Track Flight</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-h5 text-primary">
                {searchType === 'flight' ? 'Popular Flights' : 'Popular Routes'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {searchType === 'flight' 
                ? popularFlights.map((flight, index) => (
                    <button
                      key={index}
                      onClick={() => selectFlight(flight.number)}
                      className="card p-4 hover:shadow-elevation-1 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <Plane className="h-5 w-5 text-primary-500" />
                        <div>
                          <p className="text-h6 text-primary">{flight.number}</p>
                          <p className="text-body2 text-gray-500">{flight.route}</p>
                        </div>
                      </div>
                    </button>
                  ))
                : popularRoutes.map((route, index) => (
                    <button
                      key={index}
                      onClick={() => selectRoute(route.from, route.to)}
                      className="card p-4 hover:shadow-elevation-1 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary-500" />
                        <div>
                          <p className="text-h6 text-primary">{route.from} - {route.to}</p>
                          <p className="text-body2 text-gray-500">{route.name}</p>
                        </div>
                      </div>
                    </button>
                  ))
              }
            </div>
          </div>
        </div>

        {/* Flight Status Results */}
        {flightData && (
          <div className="space-y-8">
            {/* Status Card */}
            <div className="card-elevated p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Plane className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h2 className="text-h3 text-primary">{flightData.flightNumber}</h2>
                      <div className={`bg-${getStatusColor(flightData.statusColor)}-100 text-${getStatusColor(flightData.statusColor)}-700 px-3 py-1 rounded-full text-sm font-medium`}>
                        {flightData.flightStatus}
                      </div>
                    </div>
                    <p className="text-body2 text-gray-500">{flightData.statusDetails}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={refreshFlightData}
                    disabled={isSearching}
                    className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <RefreshCw className={`h-5 w-5 ${isSearching ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50"
                  >
                    <Info className="h-5 w-5" />
                    <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-center flex-1">
                      <p className="text-body2 text-gray-500">{flightData.departureDate}</p>
                      <p className="text-h3 font-bold text-primary">{flightData.origin.scheduledTime}</p>
                      <p className={`text-sm ${flightData.origin.actualTime !== flightData.origin.scheduledTime ? 'text-warning-600 font-medium' : 'text-gray-500'}`}>
                        {flightData.origin.actualTime !== flightData.origin.scheduledTime && 'Actual: '}{flightData.origin.actualTime}
                      </p>
                    </div>
                    <div className="text-center mx-4 mt-2 flex-1">
                      <p className="text-body2 text-gray-500">{flightData.flightDuration}</p>
                      <div className="relative">
                        <div className="h-1 bg-gray-200 rounded-full w-full my-3"></div>
                        <div 
                          className="h-1 bg-primary-500 rounded-full absolute top-0 left-0 my-3"
                          style={{ width: `${flightData.aircraft.progress}%` }}
                        ></div>
                        <div 
                          className="absolute w-4 h-4 bg-primary-500 rounded-full top-0 mt-1"
                          style={{ left: `calc(${flightData.aircraft.progress}% - 8px)` }}
                        >
                          <Plane className="h-3 w-3 text-white absolute left-0.5 top-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-body2 text-gray-500">{flightData.arrivalDate}</p>
                      <p className="text-h3 font-bold text-primary">{flightData.destination.scheduledTime}</p>
                      <p className={`text-sm ${flightData.destination.actualTime !== flightData.destination.scheduledTime ? 'text-warning-600 font-medium' : 'text-gray-500'}`}>
                        {flightData.destination.actualTime !== flightData.destination.scheduledTime && 'Expected: '}{flightData.destination.actualTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="text-center">
                      <p className="text-h5 text-primary font-bold">{flightData.origin.code}</p>
                      <p className="text-body2 text-gray-600">{flightData.origin.city}</p>
                      <p className="text-body2 text-gray-500">Terminal {flightData.origin.terminal}</p>
                      <p className="text-body2 text-gray-500">Gate {flightData.origin.gate}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-h5 text-primary font-bold">{flightData.destination.code}</p>
                      <p className="text-body2 text-gray-600">{flightData.destination.city}</p>
                      <p className="text-body2 text-gray-500">Terminal {flightData.destination.terminal}</p>
                      <p className="text-body2 text-gray-500">Gate {flightData.destination.gate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {showDetails && (
                <div className="space-y-8">
                  {/* Aircraft Details */}
                  <div className="card p-6 bg-gray-50 border border-gray-200">
                    <h3 className="text-h5 text-primary mb-4 flex items-center">
                      <Plane className="h-5 w-5 mr-2" />
                      Aircraft Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-body2 text-gray-500 mb-1">Aircraft Type</p>
                        <p className="text-body1 font-semibold text-primary">{flightData.aircraft.type}</p>
                      </div>
                      <div>
                        <p className="text-body2 text-gray-500 mb-1">Registration</p>
                        <p className="text-body1 font-semibold text-primary">{flightData.aircraft.registration}</p>
                      </div>
                      <div>
                        <p className="text-body2 text-gray-500 mb-1">Aircraft Age</p>
                        <p className="text-body1 font-semibold text-primary">{flightData.aircraft.age}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 my-4"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-body2 text-gray-500 mb-1">Current Altitude</p>
                        <p className="text-body1 font-semibold text-primary">{flightData.aircraft.altitude}</p>
                      </div>
                      <div>
                        <p className="text-body2 text-gray-500 mb-1">Ground Speed</p>
                        <p className="text-body1 font-semibold text-primary">{flightData.aircraft.speed}</p>
                      </div>
                      <div>
                        <p className="text-body2 text-gray-500 mb-1">Heading</p>
                        <p className="text-body1 font-semibold text-primary">{flightData.aircraft.heading}</p>
                      </div>
                      <div>
                        <p className="text-body2 text-gray-500 mb-1">Distance</p>
                        <p className="text-body1 font-semibold text-primary">{flightData.distance}</p>
                      </div>
                    </div>
                  </div>

                  {/* Weather Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="card p-6 bg-gray-50 border border-gray-200">
                      <h3 className="text-h6 text-primary mb-4 flex items-center">
                        <Cloud className="h-5 w-5 mr-2" />
                        {flightData.origin.city} Weather Conditions
                      </h3>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getWeatherIcon(flightData.origin.weather.condition)}
                          <p className="text-body1 font-semibold text-primary">{flightData.origin.weather.condition}</p>
                        </div>
                        <p className="text-h5 text-primary font-bold">{flightData.origin.weather.temperature}°C</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-body2 text-gray-500 mb-1">Wind</p>
                          <p className="text-body2 text-primary">{flightData.origin.weather.windSpeed}</p>
                        </div>
                        <div>
                          <p className="text-body2 text-gray-500 mb-1">Humidity</p>
                          <p className="text-body2 text-primary">{flightData.origin.weather.humidity}</p>
                        </div>
                        <div>
                          <p className="text-body2 text-gray-500 mb-1">Visibility</p>
                          <p className="text-body2 text-primary">{flightData.origin.weather.visibility}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card p-6 bg-gray-50 border border-gray-200">
                      <h3 className="text-h6 text-primary mb-4 flex items-center">
                        <Cloud className="h-5 w-5 mr-2" />
                        {flightData.destination.city} Weather Conditions
                      </h3>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getWeatherIcon(flightData.destination.weather.condition)}
                          <p className="text-body1 font-semibold text-primary">{flightData.destination.weather.condition}</p>
                        </div>
                        <p className="text-h5 text-primary font-bold">{flightData.destination.weather.temperature}°C</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-body2 text-gray-500 mb-1">Wind</p>
                          <p className="text-body2 text-primary">{flightData.destination.weather.windSpeed}</p>
                        </div>
                        <div>
                          <p className="text-body2 text-gray-500 mb-1">Humidity</p>
                          <p className="text-body2 text-primary">{flightData.destination.weather.humidity}</p>
                        </div>
                        <div>
                          <p className="text-body2 text-gray-500 mb-1">Visibility</p>
                          <p className="text-body2 text-primary">{flightData.destination.weather.visibility}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Codeshare Information */}
                  {flightData.codeshare && flightData.codeshare.length > 0 && (
                    <div className="card p-6 bg-gray-50 border border-gray-200">
                      <h3 className="text-h6 text-primary mb-4 flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Codeshare Information
                      </h3>
                      
                      <p className="text-body2 text-gray-600 mb-4">
                        This flight is also marketed by the following airlines:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {flightData.codeshare.map((share, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Plane className="h-5 w-5 text-primary-500" />
                            <div>
                              <p className="text-body1 font-semibold text-primary">{share.airline}</p>
                              <p className="text-body2 text-gray-500">Flight {share.flightNumber}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Flight Map */}
            <div className="card-elevated p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-h4 text-primary flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Flight Route Map
                </h2>
                <div className={`flex items-center space-x-2 text-${getStatusColor(flightData.statusColor)}-600 bg-${getStatusColor(flightData.statusColor)}-100 px-3 py-1 rounded-full`}>
                  <LocateFixed className="h-4 w-4" />
                  <span className="text-sm font-medium">Live Tracking</span>
                </div>
              </div>
              
              {/* This would be replaced with an actual map component in a real application */}
              <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
                {/* Simplified flight path visualization */}
                <div className="w-3/4 h-px bg-gray-300 absolute"></div>
                <div className="w-3/4 h-px bg-primary-500 absolute" style={{ width: `${flightData.aircraft.progress}%` }}></div>
                
                {/* Origin marker */}
                <div className="absolute left-[12.5%] transform -translate-x-1/2">
                  <div className="w-3 h-3 bg-primary-500 rounded-full mb-1"></div>
                  <p className="text-xs font-semibold text-gray-700">{flightData.origin.code}</p>
                </div>
                
                {/* Destination marker */}
                <div className="absolute left-[87.5%] transform -translate-x-1/2">
                  <div className="w-3 h-3 bg-primary-500 rounded-full mb-1"></div>
                  <p className="text-xs font-semibold text-gray-700">{flightData.destination.code}</p>
                </div>
                
                {/* Plane marker */}
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${12.5 + flightData.aircraft.progress * 0.75}%`, top: '50%' }}
                >
                  <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <Plane className="h-5 w-5 text-primary-500" />
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-500 mb-3">Interactive Flight Map</p>
                  <p className="text-sm text-gray-400">(Map visualization simplified for demonstration)</p>
                </div>
              </div>
              
              {/* Flight Progress */}
              <div className="mt-6 bg-gray-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-h6 text-primary">Flight Progress</h3>
                  <p className="text-body2 text-primary font-medium">{flightData.aircraft.progress}% Complete</p>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-primary-600 bg-primary-200">
                        {flightData.origin.code}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-primary-600 bg-primary-200">
                        {flightData.destination.code}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                    <div style={{ width: `${flightData.aircraft.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Distance: {flightData.distance}</span>
                    <span>Duration: {flightData.flightDuration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Flight Information */}
              <div className="card-elevated p-6">
                <h3 className="text-h5 text-primary mb-4">Flight Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-body2 text-gray-600">Flight Number</span>
                    <span className="text-body1 font-semibold">{flightData.flightNumber}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-body2 text-gray-600">Aircraft Type</span>
                    <span className="text-body1">{flightData.aircraft.type}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-body2 text-gray-600">Distance</span>
                    <span className="text-body1">{flightData.distance}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-body2 text-gray-600">Duration</span>
                    <span className="text-body1">{flightData.flightDuration}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-body2 text-gray-600">Status</span>
                    <span className={`text-body1 font-semibold text-${getStatusColor(flightData.statusColor)}-600`}>
                      {flightData.flightStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terminal & Gate Information */}
              <div className="card-elevated p-6">
                <h3 className="text-h5 text-primary mb-4">Terminal & Gate Information</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-h6 text-primary mb-2">{flightData.origin.city} ({flightData.origin.code})</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-body2 text-gray-600">Terminal</span>
                        <span className="text-body1 font-semibold">{flightData.origin.terminal}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-body2 text-gray-600">Gate</span>
                        <span className="text-body1 font-semibold">{flightData.origin.gate}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2">
                        <span className="text-body2 text-gray-600">Status</span>
                        <span className="text-body1 font-semibold">{flightData.origin.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-h6 text-primary mb-2">{flightData.destination.city} ({flightData.destination.code})</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-body2 text-gray-600">Terminal</span>
                        <span className="text-body1 font-semibold">{flightData.destination.terminal}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-body2 text-gray-600">Gate</span>
                        <span className="text-body1 font-semibold">{flightData.destination.gate}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2">
                        <span className="text-body2 text-gray-600">Status</span>
                        <span className="text-body1 font-semibold">{flightData.destination.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="card-elevated p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
              <h3 className="text-h4 text-primary mb-6 text-center">Additional Services</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-white p-6 hover:shadow-elevation-2 transition-all duration-300">
                  <div className="bg-primary-100 rounded-2xl p-4 w-fit mb-6">
                    <Phone className="h-8 w-8 text-primary-600" />
                  </div>
                  <h4 className="text-h5 text-primary mb-3">Flight Notifications</h4>
                  <p className="text-body2 text-secondary mb-4">
                    Get real-time updates on flight status changes directly to your phone
                  </p>
                  <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white w-full">
                    <span>Set Up Alerts</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="card bg-white p-6 hover:shadow-elevation-2 transition-all duration-300">
                  <div className="bg-secondary-100 rounded-2xl p-4 w-fit mb-6">
                    <CalendarClock className="h-8 w-8 text-secondary-600" />
                  </div>
                  <h4 className="text-h5 text-primary mb-3">Flight Changes</h4>
                  <p className="text-body2 text-secondary mb-4">
                    Need to modify your booking? Easily change flight dates or times
                  </p>
                  <button className="btn-contained bg-secondary-500 hover:bg-secondary-600 text-white w-full">
                    <span>Manage Booking</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="card bg-white p-6 hover:shadow-elevation-2 transition-all duration-300">
                  <div className="bg-success-100 rounded-2xl p-4 w-fit mb-6">
                    <CheckSquare className="h-8 w-8 text-success-600" />
                  </div>
                  <h4 className="text-h5 text-primary mb-3">Web Check-In</h4>
                  <p className="text-body2 text-secondary mb-4">
                    Save time at the airport by checking in online and selecting your seats
                  </p>
                  <button className="btn-contained bg-success-500 hover:bg-success-600 text-white w-full">
                    <span>Check In Now</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section (shown when no flight is being tracked) */}
        {!flightData && (
          <div className="card-elevated p-8 bg-gray-50">
            <h3 className="text-h4 text-primary mb-6">How to Track Your Flight</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="bg-primary-500 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  1
                </div>
                <h4 className="text-h6 text-primary mb-3">Enter Flight Details</h4>
                <p className="text-body2 text-gray-600">
                  Search by flight number (e.g., AI 308) or route (origin and destination airports)
                </p>
              </div>
              
              <div>
                <div className="bg-primary-500 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  2
                </div>
                <h4 className="text-h6 text-primary mb-3">Select Date</h4>
                <p className="text-body2 text-gray-600">
                  Choose the departure date of your flight (today's date is selected by default)
                </p>
              </div>
              
              <div>
                <div className="bg-primary-500 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  3
                </div>
                <h4 className="text-h6 text-primary mb-3">Track in Real-Time</h4>
                <p className="text-body2 text-gray-600">
                  View live flight status, aircraft position, and other important details
                </p>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h4 className="text-h5 text-primary mb-4">Flight Status Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-success-100 p-2 rounded-lg">
                    <CheckSquare className="h-5 w-5 text-success-600" />
                  </div>
                  <div>
                    <p className="text-body2 font-medium text-success-700">On Time</p>
                    <p className="text-body2 text-gray-600">Flight is operating as scheduled</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-warning-100 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-warning-600" />
                  </div>
                  <div>
                    <p className="text-body2 font-medium text-warning-700">Delayed</p>
                    <p className="text-body2 text-gray-600">Flight is delayed by a specific time</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-error-100 p-2 rounded-lg">
                    <X className="h-5 w-5 text-error-600" />
                  </div>
                  <div>
                    <p className="text-body2 font-medium text-error-700">Cancelled</p>
                    <p className="text-body2 text-gray-600">Flight has been cancelled</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Plane className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-body2 font-medium text-primary-700">In Flight</p>
                    <p className="text-body2 text-gray-600">Flight is currently in the air</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightStatusPage;