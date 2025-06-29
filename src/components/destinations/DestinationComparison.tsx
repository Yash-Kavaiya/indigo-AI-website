import React, { useState } from 'react';
import { 
  X, Plus, Star, DollarSign, Calendar, Clock, Plane, 
  MapPin, Users, Camera, ArrowRight, CheckCircle,
  AlertCircle, Shield, Wifi, Car, Utensils, Award
} from 'lucide-react';
import { Destination } from '../../pages/DestinationsPage';

interface DestinationComparisonProps {
  destinations: Destination[];
  onAddDestination: () => void;
  onRemoveDestination: (id: string) => void;
}

const DestinationComparison: React.FC<DestinationComparisonProps> = ({
  destinations,
  onAddDestination,
  onRemoveDestination
}) => {
  const [compareCategory, setCompareCategory] = useState<'overview' | 'costs' | 'activities' | 'logistics'>('overview');

  const categories = [
    { id: 'overview' as const, label: 'Overview', icon: MapPin },
    { id: 'costs' as const, label: 'Costs', icon: DollarSign },
    { id: 'activities' as const, label: 'Activities', icon: Camera },
    { id: 'logistics' as const, label: 'Logistics', icon: Plane }
  ];

  const getWinner = (destinations: Destination[], criteria: (dest: Destination) => number) => {
    if (destinations.length === 0) return null;
    return destinations.reduce((best, current) => 
      criteria(current) > criteria(best) ? current : best
    );
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-success-600';
    if (rating >= 4.0) return 'text-warning-600';
    if (rating >= 3.5) return 'text-primary-600';
    return 'text-secondary-600';
  };

  const getBudgetLevel = (price: number) => {
    if (price <= 100000) return { level: 'Budget', color: 'success' };
    if (price <= 200000) return { level: 'Moderate', color: 'warning' };
    if (price <= 350000) return { level: 'Premium', color: 'primary' };
    return { level: 'Luxury', color: 'secondary' };
  };

  const renderOverviewComparison = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {/* Rating Comparison */}
        <div className="card p-6">
          <h4 className="text-h6 text-primary mb-4 flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Rating Comparison</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {destinations.map((dest) => {
              const isWinner = getWinner(destinations, d => d.rating)?.id === dest.id;
              return (
                <div key={dest.id} className={`p-4 rounded-xl ${isWinner ? 'bg-success-50 border-2 border-success-200' : 'bg-gray-50'}`}>
                  <h5 className="font-semibold text-primary mb-2">{dest.name}</h5>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(dest.rating) ? 'text-warning-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`font-bold ${getRatingColor(dest.rating)}`}>{dest.rating}</span>
                    {isWinner && <Award className="h-4 w-4 text-success-500" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Match Score Comparison */}
        <div className="card p-6">
          <h4 className="text-h6 text-primary mb-4 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>AI Match Score</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {destinations.map((dest) => {
              const isWinner = getWinner(destinations, d => d.matchScore)?.id === dest.id;
              return (
                <div key={dest.id} className={`p-4 rounded-xl ${isWinner ? 'bg-primary-50 border-2 border-primary-200' : 'bg-gray-50'}`}>
                  <h5 className="font-semibold text-primary mb-2">{dest.name}</h5>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          dest.matchScore >= 90 ? 'bg-success-500' :
                          dest.matchScore >= 80 ? 'bg-warning-500' :
                          'bg-primary-500'
                        }`}
                        style={{ width: `${dest.matchScore}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-primary">{dest.matchScore}%</span>
                    {isWinner && <Award className="h-4 w-4 text-primary-500" />}
                  </div>
                  <p className="text-body2 text-secondary mt-2">{dest.aiReason}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCostComparison = () => (
    <div className="space-y-6">
      {/* Total Cost Comparison */}
      <div className="card p-6">
        <h4 className="text-h6 text-primary mb-4 flex items-center space-x-2">
          <DollarSign className="h-5 w-5" />
          <span>Total Trip Cost</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {destinations.map((dest) => {
            const budgetInfo = getBudgetLevel(dest.price.mid);
            const isWinner = getWinner(destinations, d => -d.price.mid)?.id === dest.id; // Lowest price wins
            return (
              <div key={dest.id} className={`p-4 rounded-xl ${isWinner ? 'bg-success-50 border-2 border-success-200' : 'bg-gray-50'}`}>
                <h5 className="font-semibold text-primary mb-2">{dest.name}</h5>
                <div className="space-y-2">
                  <div>
                    <p className="text-h5 font-bold text-success-600">₹{dest.price.mid.toLocaleString()}</p>
                    <p className="text-body2 text-secondary">per person</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${budgetInfo.color}-100 text-${budgetInfo.color}-700 w-fit`}>
                    {budgetInfo.level}
                  </div>
                  {isWinner && (
                    <div className="flex items-center space-x-1 text-success-600">
                      <Award className="h-4 w-4" />
                      <span className="text-body2 font-medium">Best Value</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flight Cost Comparison */}
      <div className="card p-6">
        <h4 className="text-h6 text-primary mb-4 flex items-center space-x-2">
          <Plane className="h-5 w-5" />
          <span>Flight Costs</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {destinations.map((dest) => {
            const isWinner = getWinner(destinations, d => -d.flightPrice)?.id === dest.id;
            return (
              <div key={dest.id} className={`p-4 rounded-xl ${isWinner ? 'bg-success-50 border-2 border-success-200' : 'bg-gray-50'}`}>
                <h5 className="font-semibold text-primary mb-2">{dest.name}</h5>
                <div className="space-y-2">
                  <p className="text-h6 font-bold text-primary">₹{dest.flightPrice.toLocaleString()}</p>
                  <p className="text-body2 text-secondary">round trip</p>
                  {isWinner && (
                    <div className="flex items-center space-x-1 text-success-600">
                      <Award className="h-4 w-4" />
                      <span className="text-body2 font-medium">Cheapest Flights</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="card p-6">
        <h4 className="text-h6 text-primary mb-4">Detailed Cost Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 text-body1 font-semibold text-primary">Destination</th>
                <th className="text-center p-3 text-body1 font-semibold text-primary">Budget</th>
                <th className="text-center p-3 text-body1 font-semibold text-primary">Mid-Range</th>
                <th className="text-center p-3 text-body1 font-semibold text-primary">Luxury</th>
                <th className="text-center p-3 text-body1 font-semibold text-primary">Flight</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest) => (
                <tr key={dest.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <img src={dest.image} alt={dest.name} className="w-8 h-8 object-cover rounded-lg" />
                      <span className="font-medium text-primary">{dest.name}</span>
                    </div>
                  </td>
                  <td className="text-center p-3 text-success-600 font-semibold">₹{dest.price.budget.toLocaleString()}</td>
                  <td className="text-center p-3 text-warning-600 font-semibold">₹{dest.price.mid.toLocaleString()}</td>
                  <td className="text-center p-3 text-primary-600 font-semibold">₹{dest.price.luxury.toLocaleString()}</td>
                  <td className="text-center p-3 text-secondary-600 font-semibold">₹{dest.flightPrice.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderActivitiesComparison = () => (
    <div className="space-y-6">
      {/* Activities Overview */}
      <div className="card p-6">
        <h4 className="text-h6 text-primary mb-4 flex items-center space-x-2">
          <Camera className="h-5 w-5" />
          <span>Available Activities</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <div key={dest.id} className="card p-4">
              <h5 className="font-semibold text-primary mb-3">{dest.name}</h5>
              <div className="flex flex-wrap gap-1">
                {dest.activities.map((activity, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {activity.replace('_', ' ')}
                  </span>
                ))}
              </div>
              <p className="text-body2 text-secondary mt-2">
                {dest.activities.length} activities available
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Comparison */}
      <div className="card p-6">
        <h4 className="text-h6 text-primary mb-4">Top Attractions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-gray-50 rounded-xl p-4">
              <h5 className="font-semibold text-primary mb-3">{dest.name}</h5>
              <div className="space-y-2">
                {dest.highlights.slice(0, 4).map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success-500" />
                    <span className="text-body2 text-secondary">{highlight}</span>
                  </div>
                ))}
                {dest.highlights.length > 4 && (
                  <p className="text-body2 text-primary font-medium">
                    +{dest.highlights.length - 4} more attractions
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLogisticsComparison = () => (
    <div className="space-y-6">
      {/* Travel Requirements */}
      <div className="card p-6">
        <h4 className="text-h6 text-primary mb-4 flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Travel Requirements</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 text-body1 font-semibold text-primary">Destination</th>
                <th className="text-center p-3 text-body1 font-semibold text-primary">Visa Required</th>
                <th className="text-center p-3 text-body1 font-semibold text-primary">Currency</th>
                <th className="text-center p-3 text-body1 font-semibold text-primary">Time Zone</th>
                <th className="text-center p-3 text-body1 font-semibold text-primary">Language</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest) => (
                <tr key={dest.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <img src={dest.image} alt={dest.name} className="w-8 h-8 object-cover rounded-lg" />
                      <span className="font-medium text-primary">{dest.name}</span>
                    </div>
                  </td>
                  <td className="text-center p-3">
                    {dest.visaRequired ? (
                      <div className="flex items-center justify-center space-x-2 text-warning-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-body2">Required</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 text-success-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-body2">Not Required</span>
                      </div>
                    )}
                  </td>
                  <td className="text-center p-3 text-secondary">{dest.currency}</td>
                  <td className="text-center p-3 text-secondary">{dest.timeZone}</td>
                  <td className="text-center p-3 text-secondary">{dest.language.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Best Time to Visit */}
      <div className="card p-6">
        <h4 className="text-h6 text-primary mb-4 flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Best Time to Visit</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-gray-50 rounded-xl p-4">
              <h5 className="font-semibold text-primary mb-3">{dest.name}</h5>
              <div className="flex flex-wrap gap-2">
                {dest.bestTime.map((season, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-body2 font-medium capitalize"
                  >
                    {season}
                  </span>
                ))}
              </div>
              <p className="text-body2 text-secondary mt-2">Recommended duration: {dest.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h3 text-primary font-bold">Destination Comparison</h2>
          {destinations.length < 4 && (
            <button
              onClick={onAddDestination}
              className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
            >
              <Plus className="h-5 w-5" />
              <span>Add Destination</span>
            </button>
          )}
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {destinations.map((dest) => (
            <div key={dest.id} className="card p-4 relative">
              <button
                onClick={() => onRemoveDestination(dest.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-error-600 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
              
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-24 object-cover rounded-xl mb-3"
              />
              <h3 className="text-h6 text-primary font-bold mb-1">{dest.name}</h3>
              <p className="text-body2 text-secondary">{dest.country}</p>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-warning-500 fill-current" />
                  <span className="text-body2 font-semibold">{dest.rating}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  dest.matchScore >= 90 ? 'bg-success-100 text-success-700' :
                  dest.matchScore >= 80 ? 'bg-warning-100 text-warning-700' :
                  'bg-primary-100 text-primary-700'
                }`}>
                  {dest.matchScore}%
                </div>
              </div>
            </div>
          ))}
          
          {destinations.length < 4 && (
            <button
              onClick={onAddDestination}
              className="card p-4 border-2 border-dashed border-gray-300 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 flex flex-col items-center justify-center text-gray-500 hover:text-primary-500"
            >
              <Plus className="h-12 w-12 mb-2" />
              <span className="text-body1 font-medium">Add Destination</span>
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center">
          <div className="card p-2 bg-surface-tertiary border-2 border-gray-200">
            <div className="flex rounded-xl overflow-hidden">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-6 py-3 font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    compareCategory === category.id
                      ? 'bg-white shadow-elevation-1 text-primary-500 rounded-xl'
                      : 'text-secondary hover:text-primary-500'
                  }`}
                  onClick={() => setCompareCategory(category.id)}
                >
                  <category.icon className="h-5 w-5" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Content */}
      <div className="card-elevated p-6">
        {compareCategory === 'overview' && renderOverviewComparison()}
        {compareCategory === 'costs' && renderCostComparison()}
        {compareCategory === 'activities' && renderActivitiesComparison()}
        {compareCategory === 'logistics' && renderLogisticsComparison()}
      </div>

      {/* Action Panel */}
      <div className="card-elevated p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
        <div className="text-center">
          <h3 className="text-h4 text-primary mb-4">Ready to Book?</h3>
          <p className="text-body1 text-secondary mb-6">
            Compare the destinations and choose the perfect one for your next adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
              <Plane className="h-5 w-5" />
              <span>Find Flights</span>
            </button>
            <button className="btn-outlined border-secondary-500 text-secondary-500 hover:bg-secondary-50">
              <ArrowRight className="h-5 w-5" />
              <span>Create Itinerary</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationComparison;