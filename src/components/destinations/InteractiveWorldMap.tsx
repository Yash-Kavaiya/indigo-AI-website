import React, { useState } from 'react';
import { 
  MapPin, Plane, DollarSign, Star, Clock, Globe,
  Filter, Search, Zap, TrendingUp, Eye, ArrowRight
} from 'lucide-react';

interface MapDestination {
  id: string;
  name: string;
  country: string;
  continent: string;
  coordinates: { lat: number; lng: number };
  price: number;
  rating: number;
  popular: boolean;
  matchScore: number;
  bestTime: string[];
  image: string;
}

interface InteractiveWorldMapProps {
  destinations: MapDestination[];
  onDestinationSelect: (destination: MapDestination) => void;
}

const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({ 
  destinations, 
  onDestinationSelect 
}) => {
  const [selectedDestination, setSelectedDestination] = useState<MapDestination | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<MapDestination | null>(null);
  const [mapFilter, setMapFilter] = useState<'all' | 'popular' | 'budget' | 'luxury'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const continents = [
    { 
      id: 'asia', 
      name: 'Asia', 
      center: { x: 70, y: 45 },
      destinations: destinations.filter(d => d.continent === 'Asia')
    },
    { 
      id: 'europe', 
      name: 'Europe', 
      center: { x: 50, y: 25 },
      destinations: destinations.filter(d => d.continent === 'Europe')
    },
    { 
      id: 'africa', 
      name: 'Africa', 
      center: { x: 52, y: 55 },
      destinations: destinations.filter(d => d.continent === 'Africa')
    },
    { 
      id: 'north_america', 
      name: 'North America', 
      center: { x: 25, y: 30 },
      destinations: destinations.filter(d => d.continent === 'North America')
    },
    { 
      id: 'south_america', 
      name: 'South America', 
      center: { x: 30, y: 70 },
      destinations: destinations.filter(d => d.continent === 'South America')
    },
    { 
      id: 'oceania', 
      name: 'Oceania', 
      center: { x: 85, y: 75 },
      destinations: destinations.filter(d => d.continent === 'Oceania')
    }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    switch (mapFilter) {
      case 'popular':
        matchesFilter = dest.popular;
        break;
      case 'budget':
        matchesFilter = dest.price <= 100000;
        break;
      case 'luxury':
        matchesFilter = dest.price >= 300000;
        break;
    }
    
    return matchesSearch && matchesFilter;
  });

  const getDestinationPosition = (destination: MapDestination) => {
    // Convert lat/lng to percentage position on world map
    const x = ((destination.coordinates.lng + 180) / 360) * 100;
    const y = ((90 - destination.coordinates.lat) / 180) * 100;
    return { x, y };
  };

  const getMarkerColor = (destination: MapDestination) => {
    if (destination.matchScore >= 90) return 'bg-success-500';
    if (destination.matchScore >= 80) return 'bg-warning-500';
    if (destination.matchScore >= 70) return 'bg-primary-500';
    return 'bg-secondary-500';
  };

  const getMarkerSize = (destination: MapDestination) => {
    if (destination.popular) return 'w-4 h-4';
    return 'w-3 h-3';
  };

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="card-elevated p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Globe className="h-6 w-6 text-primary-500" />
            <h3 className="text-h4 text-primary font-bold">Interactive World Map</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-box w-full sm:w-64 pl-10"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            
            <select
              value={mapFilter}
              onChange={(e) => setMapFilter(e.target.value as any)}
              className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <option value="all">All Destinations</option>
              <option value="popular">Popular Spots</option>
              <option value="budget">Budget Friendly</option>
              <option value="luxury">Luxury Travel</option>
            </select>
          </div>
        </div>
      </div>

      {/* World Map */}
      <div className="card-elevated p-8">
        <div className="relative">
          {/* World Map Background */}
          <div 
            className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl relative overflow-hidden"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath fill='%23e5e7eb' d='M150,100 Q200,80 250,100 L300,120 Q350,100 400,120 L450,100 Q500,80 550,100 L600,120 Q650,100 700,120 L750,100 Q800,80 850,100 L900,120 L900,400 Q850,420 800,400 L750,380 Q700,400 650,380 L600,360 Q550,380 500,360 L450,380 Q400,360 350,380 L300,360 Q250,380 200,360 L150,380 Z'/%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Continent Labels */}
            {continents.map((continent) => (
              <div
                key={continent.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: `${continent.center.x}%`, 
                  top: `${continent.center.y}%` 
                }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 border border-gray-200 shadow-elevation-1">
                  <h4 className="text-h6 text-primary font-bold text-center">{continent.name}</h4>
                  <p className="text-body2 text-secondary text-center">
                    {continent.destinations.length} destinations
                  </p>
                </div>
              </div>
            ))}

            {/* Destination Markers */}
            {filteredDestinations.map((destination) => {
              const position = getDestinationPosition(destination);
              return (
                <div
                  key={destination.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                  style={{ 
                    left: `${position.x}%`, 
                    top: `${position.y}%` 
                  }}
                  onMouseEnter={() => setHoveredDestination(destination)}
                  onMouseLeave={() => setHoveredDestination(null)}
                  onClick={() => setSelectedDestination(destination)}
                >
                  <div className={`${getMarkerColor(destination)} ${getMarkerSize(destination)} rounded-full shadow-elevation-2 hover:scale-150 transition-all duration-300 border-2 border-white`}>
                    {destination.popular && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-error-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Hover Tooltip */}
                  {hoveredDestination?.id === destination.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64">
                      <div className="bg-white rounded-2xl shadow-elevation-3 border border-gray-200 p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-12 h-12 object-cover rounded-xl"
                          />
                          <div>
                            <h4 className="text-h6 text-primary font-bold">{destination.name}</h4>
                            <p className="text-body2 text-secondary">{destination.country}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-warning-500 fill-current" />
                            <span className="text-body2 font-semibold">{destination.rating}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-h6 text-success-600 font-bold">
                              ₹{destination.price.toLocaleString()}
                            </p>
                            <p className="text-caption text-secondary">per person</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Connection Lines for Popular Routes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {filteredDestinations.slice(0, 5).map((dest, index) => {
                if (index === filteredDestinations.length - 1) return null;
                const start = getDestinationPosition(dest);
                const end = getDestinationPosition(filteredDestinations[index + 1]);
                return (
                  <line
                    key={`${dest.id}-${filteredDestinations[index + 1].id}`}
                    x1={`${start.x}%`}
                    y1={`${start.y}%`}
                    x2={`${end.x}%`}
                    y2={`${end.y}%`}
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.3"
                  />
                );
              })}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-elevation-2">
            <h4 className="text-h6 text-primary font-bold mb-3">Match Score</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                <span className="text-body2 text-secondary">90%+ Perfect Match</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                <span className="text-body2 text-secondary">80%+ Great Match</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-body2 text-secondary">70%+ Good Match</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
                <span className="text-body2 text-secondary">Below 70%</span>
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-elevation-2">
            <div className="text-center">
              <p className="text-h4 font-bold text-primary">{filteredDestinations.length}</p>
              <p className="text-body2 text-secondary">Destinations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Destination Details */}
      {selectedDestination && (
        <div className="card-elevated p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-20 h-20 object-cover rounded-2xl"
                />
                <div>
                  <h3 className="text-h3 text-primary font-bold">{selectedDestination.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="text-h5 text-secondary">{selectedDestination.country}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-warning-500 fill-current" />
                      <span className="text-body1 font-semibold">{selectedDestination.rating}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-body2 font-bold ${
                      selectedDestination.matchScore >= 90 ? 'bg-success-100 text-success-700' :
                      selectedDestination.matchScore >= 80 ? 'bg-warning-100 text-warning-700' :
                      'bg-primary-100 text-primary-700'
                    }`}>
                      {selectedDestination.matchScore}% Match
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-h6 text-primary mb-3 flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Estimated Cost</span>
                  </h4>
                  <p className="text-h4 font-bold text-success-600">₹{selectedDestination.price.toLocaleString()}</p>
                  <p className="text-body2 text-secondary">per person</p>
                </div>
                <div>
                  <h4 className="text-h6 text-primary mb-3 flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Best Time</span>
                  </h4>
                  <p className="text-body1 text-primary font-semibold capitalize">
                    {selectedDestination.bestTime.join(', ')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => onDestinationSelect(selectedDestination)}
                className="btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
              >
                <Eye className="h-5 w-5" />
                <span>View Details</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50">
                <Plane className="h-5 w-5" />
                <span>Find Flights</span>
              </button>
              <button 
                onClick={() => setSelectedDestination(null)}
                className="btn-text text-gray-600 hover:text-gray-800"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveWorldMap;