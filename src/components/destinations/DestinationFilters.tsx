import React from 'react';
import { 
  Filter, DollarSign, Globe, Calendar, Users, 
  Star, MapPin, Plane, RefreshCw
} from 'lucide-react';
import { UserPreferences } from '../../pages/DestinationsPage';

interface DestinationFiltersProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

const DestinationFilters: React.FC<DestinationFiltersProps> = ({ 
  preferences, 
  onPreferencesChange 
}) => {
  const countries = [
    { id: 'any', name: 'Any Country', flag: '🌍' },
    { id: 'india', name: 'India', flag: '🇮🇳' },
    { id: 'thailand', name: 'Thailand', flag: '🇹🇭' },
    { id: 'japan', name: 'Japan', flag: '🇯🇵' },
    { id: 'france', name: 'France', flag: '🇫🇷' },
    { id: 'italy', name: 'Italy', flag: '🇮🇹' },
    { id: 'spain', name: 'Spain', flag: '🇪🇸' },
    { id: 'greece', name: 'Greece', flag: '🇬🇷' },
    { id: 'turkey', name: 'Turkey', flag: '🇹🇷' },
    { id: 'egypt', name: 'Egypt', flag: '🇪🇬' },
    { id: 'uae', name: 'UAE', flag: '🇦🇪' },
    { id: 'singapore', name: 'Singapore', flag: '🇸🇬' },
    { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾' },
    { id: 'indonesia', name: 'Indonesia', flag: '🇮🇩' },
    { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳' },
    { id: 'nepal', name: 'Nepal', flag: '🇳🇵' },
    { id: 'bhutan', name: 'Bhutan', flag: '🇧🇹' },
    { id: 'sri_lanka', name: 'Sri Lanka', flag: '🇱🇰' },
    { id: 'maldives', name: 'Maldives', flag: '🇲🇻' },
    { id: 'australia', name: 'Australia', flag: '🇦🇺' },
    { id: 'new_zealand', name: 'New Zealand', flag: '🇳🇿' },
    { id: 'usa', name: 'United States', flag: '🇺🇸' },
    { id: 'canada', name: 'Canada', flag: '🇨🇦' },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { id: 'germany', name: 'Germany', flag: '🇩🇪' },
    { id: 'switzerland', name: 'Switzerland', flag: '🇨🇭' },
    { id: 'austria', name: 'Austria', flag: '🇦🇹' },
    { id: 'norway', name: 'Norway', flag: '🇳🇴' },
    { id: 'sweden', name: 'Sweden', flag: '🇸🇪' },
    { id: 'denmark', name: 'Denmark', flag: '🇩🇰' }
  ];

  const budgetRanges = [
    { id: 'budget', name: 'Budget', range: '₹50K - ₹1.5L', icon: '💵' },
    { id: 'moderate', name: 'Moderate', range: '₹1.5L - ₹3L', icon: '💳' },
    { id: 'premium', name: 'Premium', range: '₹3L - ₹5L', icon: '💎' },
    { id: 'luxury', name: 'Luxury', range: '₹5L+', icon: '👑' }
  ];

  const seasons = [
    { id: 'spring', name: 'Spring', months: 'Mar-May', icon: '🌸' },
    { id: 'summer', name: 'Summer', months: 'Jun-Aug', icon: '☀️' },
    { id: 'autumn', name: 'Autumn', months: 'Sep-Nov', icon: '🍂' },
    { id: 'winter', name: 'Winter', months: 'Dec-Feb', icon: '❄️' },
    { id: 'flexible', name: 'Flexible', months: 'Anytime', icon: '🌍' }
  ];

  const durations = [
    { id: 'weekend', name: 'Weekend', days: '2-3 days', icon: '📅' },
    { id: 'short', name: 'Short Trip', days: '4-7 days', icon: '📆' },
    { id: 'medium', name: 'Standard', days: '1-2 weeks', icon: '🗓️' },
    { id: 'long', name: 'Extended', days: '3+ weeks', icon: '📋' }
  ];

  const updatePreference = (key: keyof UserPreferences, value: any) => {
    onPreferencesChange({
      ...preferences,
      [key]: value
    });
  };

  const resetFilters = () => {
    onPreferencesChange({
      ...preferences,
      country: 'any',
      budget: preferences.budget, // Keep original budget
      season: preferences.season, // Keep original season
      duration: preferences.duration // Keep original duration
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Filter className="h-6 w-6 text-primary-500" />
            <h3 className="text-h5 text-primary font-bold">Refine Your Search</h3>
          </div>
          <button
            onClick={resetFilters}
            className="btn-text text-secondary hover:text-primary"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Country Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="h-5 w-5 text-primary-500" />
            <h4 className="text-h6 text-primary font-semibold">Country Preference</h4>
          </div>
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
            {countries.map((country) => (
              <label key={country.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <input
                  type="radio"
                  name="country"
                  value={country.id}
                  checked={preferences.country === country.id}
                  onChange={(e) => updatePreference('country', e.target.value)}
                  className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-xl">{country.flag}</span>
                <span className="text-body1 text-primary">{country.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="h-5 w-5 text-primary-500" />
            <h4 className="text-h6 text-primary font-semibold">Budget Range</h4>
          </div>
          <div className="space-y-2">
            {budgetRanges.map((budget) => (
              <label key={budget.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <input
                  type="radio"
                  name="budget"
                  value={budget.id}
                  checked={preferences.budget === budget.id}
                  onChange={(e) => updatePreference('budget', e.target.value)}
                  className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-xl">{budget.icon}</span>
                <div>
                  <p className="text-body1 text-primary font-medium">{budget.name}</p>
                  <p className="text-body2 text-secondary">{budget.range}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Season Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-5 w-5 text-primary-500" />
            <h4 className="text-h6 text-primary font-semibold">Travel Season</h4>
          </div>
          <div className="space-y-2">
            {seasons.map((season) => (
              <label key={season.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <input
                  type="radio"
                  name="season"
                  value={season.id}
                  checked={preferences.season === season.id}
                  onChange={(e) => updatePreference('season', e.target.value)}
                  className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-xl">{season.icon}</span>
                <div>
                  <p className="text-body1 text-primary font-medium">{season.name}</p>
                  <p className="text-body2 text-secondary">{season.months}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-primary-500" />
            <h4 className="text-h6 text-primary font-semibold">Trip Duration</h4>
          </div>
          <div className="space-y-2">
            {durations.map((duration) => (
              <label key={duration.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <input
                  type="radio"
                  name="duration"
                  value={duration.id}
                  checked={preferences.duration === duration.id}
                  onChange={(e) => updatePreference('duration', e.target.value)}
                  className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-xl">{duration.icon}</span>
                <div>
                  <p className="text-body1 text-primary font-medium">{duration.name}</p>
                  <p className="text-body2 text-secondary">{duration.days}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
        <h4 className="text-h6 text-primary mb-4 text-center">Active Filters</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-body2 text-secondary">Country:</span>
            <span className="text-body2 font-semibold text-primary capitalize">
              {countries.find(c => c.id === preferences.country)?.name || 'Any'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body2 text-secondary">Budget:</span>
            <span className="text-body2 font-semibold text-primary capitalize">
              {budgetRanges.find(b => b.id === preferences.budget)?.name || preferences.budget}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body2 text-secondary">Season:</span>
            <span className="text-body2 font-semibold text-primary capitalize">
              {seasons.find(s => s.id === preferences.season)?.name || preferences.season}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body2 text-secondary">Duration:</span>
            <span className="text-body2 font-semibold text-primary capitalize">
              {durations.find(d => d.id === preferences.duration)?.name || preferences.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationFilters;