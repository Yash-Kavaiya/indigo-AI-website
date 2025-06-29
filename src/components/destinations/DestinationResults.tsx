import React, { useState, useMemo } from 'react';
import { 
  MapPin, Star, ArrowRight, Heart, Plane, Calendar, 
  DollarSign, Clock, Camera, Sparkles, TrendingUp,
  Globe, Users, Shield, CheckCircle, Eye, Share2
} from 'lucide-react';
import { UserPreferences, Destination } from '../../pages/DestinationsPage';

interface DestinationResultsProps {
  preferences: UserPreferences;
}

const DestinationResults: React.FC<DestinationResultsProps> = ({ preferences }) => {
  const [sortBy, setSortBy] = useState<'match' | 'price' | 'rating' | 'popular'>('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedDestinations, setSavedDestinations] = useState<Set<string>>(new Set());

  // Mock destinations database
  const allDestinations: Destination[] = [
    {
      id: '1',
      name: 'Kyoto',
      country: 'Japan',
      continent: 'Asia',
      image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: { budget: 80000, mid: 150000, luxury: 300000 },
      bestTime: ['spring', 'autumn'],
      rating: 4.8,
      description: 'Ancient temples, traditional culture, and stunning cherry blossoms in Japan\'s former capital.',
      highlights: ['Fushimi Inari Shrine', 'Bamboo Forest', 'Golden Pavilion', 'Geisha District'],
      activities: ['sightseeing', 'photography', 'local_experiences', 'festivals'],
      travelStyles: ['culture', 'relaxation', 'romantic'],
      aiReason: 'Perfect match for cultural exploration with romantic temple settings and authentic experiences.',
      matchScore: 95,
      flightPrice: 45000,
      duration: '7-10 days',
      visaRequired: false,
      currency: 'Japanese Yen',
      timeZone: '+9 GMT',
      language: ['Japanese', 'English']
    },
    {
      id: '2',
      name: 'Santorini',
      country: 'Greece',
      continent: 'Europe',
      image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: { budget: 100000, mid: 180000, luxury: 350000 },
      bestTime: ['spring', 'summer', 'autumn'],
      rating: 4.9,
      description: 'Iconic white-washed villages, stunning sunsets, and crystal-clear Aegean waters.',
      highlights: ['Oia Sunset', 'Red Beach', 'Wine Tasting', 'Volcanic Tours'],
      activities: ['sightseeing', 'photography', 'water_sports', 'wellness'],
      travelStyles: ['romantic', 'luxury', 'relaxation'],
      aiReason: 'Ideal romantic destination with breathtaking sunsets and luxury accommodations.',
      matchScore: 92,
      flightPrice: 65000,
      duration: '5-7 days',
      visaRequired: false,
      currency: 'Euro',
      timeZone: '+2 GMT',
      language: ['Greek', 'English']
    },
    {
      id: '3',
      name: 'Bali',
      country: 'Indonesia',
      continent: 'Asia',
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: { budget: 60000, mid: 120000, luxury: 250000 },
      bestTime: ['spring', 'summer', 'autumn'],
      rating: 4.7,
      description: 'Tropical paradise with rice terraces, ancient temples, and wellness retreats.',
      highlights: ['Tegallalang Rice Terraces', 'Uluwatu Temple', 'Mount Batur', 'Ubud Monkey Forest'],
      activities: ['wellness', 'adventure_sports', 'sightseeing', 'local_experiences'],
      travelStyles: ['relaxation', 'adventure', 'budget', 'wellness'],
      aiReason: 'Perfect for wellness seekers with adventure activities and budget-friendly options.',
      matchScore: 89,
      flightPrice: 35000,
      duration: '7-14 days',
      visaRequired: true,
      currency: 'Indonesian Rupiah',
      timeZone: '+8 GMT',
      language: ['Indonesian', 'English']
    },
    {
      id: '4',
      name: 'Swiss Alps',
      country: 'Switzerland',
      continent: 'Europe',
      image: 'https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: { budget: 150000, mid: 280000, luxury: 500000 },
      bestTime: ['summer', 'winter'],
      rating: 4.9,
      description: 'Majestic mountain peaks, pristine lakes, and world-class skiing resorts.',
      highlights: ['Matterhorn', 'Jungfraujoch', 'Lake Geneva', 'Rhine Falls'],
      activities: ['adventure_sports', 'sightseeing', 'photography', 'wellness'],
      travelStyles: ['adventure', 'luxury', 'romantic'],
      aiReason: 'Ultimate adventure destination with luxury mountain resorts and stunning alpine scenery.',
      matchScore: 87,
      flightPrice: 75000,
      duration: '5-10 days',
      visaRequired: true,
      currency: 'Swiss Franc',
      timeZone: '+1 GMT',
      language: ['German', 'French', 'Italian', 'English']
    },
    {
      id: '5',
      name: 'Thailand',
      country: 'Thailand',
      continent: 'Asia',
      image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: { budget: 50000, mid: 100000, luxury: 200000 },
      bestTime: ['autumn', 'winter', 'spring'],
      rating: 4.6,
      description: 'Vibrant culture, delicious street food, pristine beaches, and ancient temples.',
      highlights: ['Grand Palace Bangkok', 'Phi Phi Islands', 'Chiang Mai Temples', 'Floating Markets'],
      activities: ['sightseeing', 'food', 'beaches', 'local_experiences'],
      travelStyles: ['budget', 'culture', 'adventure', 'social'],
      aiReason: 'Excellent value destination combining culture, beaches, and incredible food experiences.',
      matchScore: 91,
      flightPrice: 25000,
      duration: '7-14 days',
      visaRequired: false,
      currency: 'Thai Baht',
      timeZone: '+7 GMT',
      language: ['Thai', 'English']
    },
    {
      id: '6',
      name: 'Paris',
      country: 'France',
      continent: 'Europe',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: { budget: 120000, mid: 220000, luxury: 400000 },
      bestTime: ['spring', 'summer', 'autumn'],
      rating: 4.8,
      description: 'City of lights, iconic landmarks, world-class museums, and romantic atmosphere.',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées'],
      activities: ['sightseeing', 'art', 'food', 'shopping'],
      travelStyles: ['romantic', 'culture', 'luxury', 'art'],
      aiReason: 'Classic romantic destination with unparalleled art, culture, and dining experiences.',
      matchScore: 88,
      flightPrice: 70000,
      duration: '5-7 days',
      visaRequired: true,
      currency: 'Euro',
      timeZone: '+1 GMT',
      language: ['French', 'English']
    },
    {
      id: '7',
      name: 'Kerala',
      country: 'India',
      continent: 'Asia',
      image: 'https://images.pexels.com/photos/3889554/pexels-photo-3889554.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: { budget: 30000, mid: 60000, luxury: 120000 },
      bestTime: ['autumn', 'winter', 'spring'],
      rating: 4.5,
      description: 'God\'s own country with backwaters, hill stations, and Ayurvedic treatments.',
      highlights: ['Backwaters Alleppey', 'Munnar Hills', 'Kochi Fort', 'Thekkady Wildlife'],
      activities: ['wellness', 'nature', 'sightseeing', 'local_experiences'],
      travelStyles: ['relaxation', 'budget', 'culture', 'wellness'],
      aiReason: 'Perfect for wellness tourism with authentic Ayurvedic treatments and serene backwaters.',
      matchScore: 93,
      flightPrice: 8000,
      duration: '7-10 days',
      visaRequired: false,
      currency: 'Indian Rupee',
      timeZone: '+5:30 GMT',
      language: ['Malayalam', 'English', 'Hindi']
    },
    {
      id: '8',
      name: 'Maldives',
      country: 'Maldives',
      continent: 'Asia',
      image: 'https://images.pexels.com/photos/1082644/pexels-photo-1082644.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: { budget: 150000, mid: 300000, luxury: 600000 },
      bestTime: ['autumn', 'winter', 'spring'],
      rating: 4.9,
      description: 'Tropical paradise with overwater villas, crystal-clear lagoons, and pristine beaches.',
      highlights: ['Overwater Bungalows', 'Coral Reefs', 'Water Sports', 'Spa Treatments'],
      activities: ['water_sports', 'wellness', 'photography', 'beaches'],
      travelStyles: ['luxury', 'romantic', 'relaxation'],
      aiReason: 'Ultimate luxury tropical escape with world-class resorts and pristine marine life.',
      matchScore: 86,
      flightPrice: 40000,
      duration: '4-7 days',
      visaRequired: false,
      currency: 'Maldivian Rufiyaa',
      timeZone: '+5 GMT',
      language: ['Dhivehi', 'English']
    }
  ];

  // Calculate match scores based on preferences
  const calculateMatchScore = (destination: Destination): number => {
    let score = 0;
    let factors = 0;

    // Travel style match
    if (preferences.travelStyle) {
      const matchingStyles = destination.travelStyles.filter(style => 
        preferences.travelStyle.includes(style)
      ).length;
      score += (matchingStyles / Math.max(destination.travelStyles.length, preferences.travelStyle.length)) * 30;
      factors += 30;
    }

    // Budget match
    if (preferences.budget) {
      const budgetScore = preferences.budget === 'budget' ? destination.price.budget :
                         preferences.budget === 'moderate' ? destination.price.mid :
                         preferences.budget === 'premium' ? destination.price.mid :
                         destination.price.luxury;
      
      const budgetFit = preferences.budget === 'budget' && destination.price.budget <= 100000 ? 25 :
                       preferences.budget === 'moderate' && destination.price.mid <= 200000 ? 25 :
                       preferences.budget === 'premium' && destination.price.mid <= 300000 ? 25 :
                       preferences.budget === 'luxury' ? 25 : 15;
      score += budgetFit;
      factors += 25;
    }

    // Season match
    if (preferences.season && destination.bestTime.includes(preferences.season)) {
      score += 20;
    }
    factors += 20;

    // Activities match
    if (preferences.activities) {
      const matchingActivities = destination.activities.filter(activity => 
        preferences.activities.includes(activity)
      ).length;
      score += (matchingActivities / Math.max(destination.activities.length, preferences.activities.length)) * 15;
      factors += 15;
    }

    // Country preference
    if (preferences.country === 'any' || destination.country.toLowerCase() === preferences.country) {
      score += 10;
    }
    factors += 10;

    return Math.round((score / factors) * 100);
  };

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    let filtered = allDestinations.map(dest => ({
      ...dest,
      matchScore: calculateMatchScore(dest)
    }));

    // Filter by country
    if (preferences.country && preferences.country !== 'any') {
      filtered = filtered.filter(dest => 
        dest.country.toLowerCase().replace(/\s+/g, '_') === preferences.country
      );
    }

    // Filter by budget
    if (preferences.budget) {
      filtered = filtered.filter(dest => {
        const maxBudget = preferences.budget === 'budget' ? 100000 :
                         preferences.budget === 'moderate' ? 200000 :
                         preferences.budget === 'premium' ? 350000 : 1000000;
        const destPrice = preferences.budget === 'budget' ? dest.price.budget :
                         preferences.budget === 'moderate' ? dest.price.mid :
                         dest.price.luxury;
        return destPrice <= maxBudget;
      });
    }

    // Sort destinations
    switch (sortBy) {
      case 'match':
        filtered.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case 'price':
        filtered.sort((a, b) => a.price.budget - b.price.budget);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.rating * 100 - a.rating * 100);
        break;
    }

    return filtered.slice(0, 12); // Limit to top 12 results
  }, [preferences, sortBy]);

  const toggleSaved = (destinationId: string) => {
    setSavedDestinations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(destinationId)) {
        newSet.delete(destinationId);
      } else {
        newSet.add(destinationId);
      }
      return newSet;
    });
  };

  const getPriceForBudget = (destination: Destination) => {
    switch (preferences.budget) {
      case 'budget': return destination.price.budget;
      case 'moderate': return destination.price.mid;
      case 'premium': return destination.price.mid;
      case 'luxury': return destination.price.luxury;
      default: return destination.price.mid;
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600 bg-success-100';
    if (score >= 80) return 'text-warning-600 bg-warning-100';
    if (score >= 70) return 'text-primary-600 bg-primary-100';
    return 'text-secondary-600 bg-secondary-100';
  };

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="card-elevated p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-h3 text-primary mb-4">
              AI Recommended Destinations
            </h2>
            <p className="text-body1 text-secondary">
              Found {filteredDestinations.length} perfect matches for your preferences
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <option value="match">Best Match</option>
              <option value="price">Price: Low to High</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
            
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card-elevated p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-3">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-h4 text-primary">AI Analysis Results</h3>
            <p className="text-body1 text-secondary">Based on your preferences, here's what we found</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-white p-6">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="h-6 w-6 text-success-500" />
              <h4 className="text-h6 text-primary">Best Match</h4>
            </div>
            <p className="text-h4 font-bold text-success-600 mb-2">
              {filteredDestinations[0]?.matchScore || 0}% Match
            </p>
            <p className="text-body2 text-secondary">
              {filteredDestinations[0]?.name || 'No matches'} - {filteredDestinations[0]?.aiReason}
            </p>
          </div>
          
          <div className="card bg-white p-6">
            <div className="flex items-center space-x-3 mb-3">
              <DollarSign className="h-6 w-6 text-primary-500" />
              <h4 className="text-h6 text-primary">Average Price</h4>
            </div>
            <p className="text-h4 font-bold text-primary-600 mb-2">
              ₹{Math.round(filteredDestinations.reduce((acc, dest) => acc + getPriceForBudget(dest), 0) / Math.max(filteredDestinations.length, 1)).toLocaleString()}
            </p>
            <p className="text-body2 text-secondary">Per person for selected budget range</p>
          </div>
          
          <div className="card bg-white p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Globe className="h-6 w-6 text-secondary-500" />
              <h4 className="text-h6 text-primary">Destinations</h4>
            </div>
            <p className="text-h4 font-bold text-secondary-600 mb-2">
              {new Set(filteredDestinations.map(dest => dest.continent)).size} Continents
            </p>
            <p className="text-body2 text-secondary">
              {new Set(filteredDestinations.map(dest => dest.country)).size} countries to explore
            </p>
          </div>
        </div>
      </div>

      {/* Destinations Grid/List */}
      {filteredDestinations.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className={`card-elevated overflow-hidden hover:scale-105 transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* AI Match Score Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className={`px-3 py-1 rounded-full text-body2 font-bold ${getMatchScoreColor(destination.matchScore)}`}>
                  {destination.matchScore}% Match
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={() => toggleSaved(destination.id)}
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200"
              >
                <Heart className={`h-5 w-5 ${
                  savedDestinations.has(destination.id) ? 'text-error-500 fill-current' : 'text-gray-600'
                }`} />
              </button>

              <div className={`relative ${viewMode === 'list' ? 'w-80 h-56' : 'h-64'}`}>
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-h4 font-bold mb-2">{destination.name}</h3>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-body1">{destination.country}</span>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(destination.rating) ? 'text-warning-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-body2 font-semibold text-primary">{destination.rating}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-h5 font-bold text-success-600">
                      ₹{getPriceForBudget(destination).toLocaleString()}
                    </p>
                    <p className="text-body2 text-secondary">per person</p>
                  </div>
                </div>

                {/* AI Reason */}
                <div className="card bg-primary-50 border border-primary-200 p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-primary-500 mt-1" />
                    <div>
                      <h4 className="text-h6 text-primary-700 mb-1">Why AI Recommends This</h4>
                      <p className="text-body2 text-primary-600">{destination.aiReason}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-body1 text-secondary mb-4 line-clamp-2">{destination.description}</p>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-surface-tertiary text-primary px-2 py-1 rounded-full text-caption border border-gray-200"
                      >
                        {highlight}
                      </span>
                    ))}
                    {destination.highlights.length > 3 && (
                      <span className="bg-surface-tertiary text-primary px-2 py-1 rounded-full text-caption border border-gray-200">
                        +{destination.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Plane className="h-4 w-4 text-gray-500" />
                      <span className="text-body2 text-secondary">Flight</span>
                    </div>
                    <p className="text-body1 font-semibold text-primary">₹{destination.flightPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-body2 text-secondary">Duration</span>
                    </div>
                    <p className="text-body1 font-semibold text-primary">{destination.duration}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                    <Eye className="h-5 w-5" />
                    <span>View Details</span>
                  </button>
                  <button className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 p-3">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="card bg-gray-50 border-2 border-gray-200 p-12 max-w-md mx-auto">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-h4 text-primary mb-4">No destinations found</h3>
            <p className="text-body1 text-secondary mb-6">
              Try adjusting your filters or preferences to see more results.
            </p>
            <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationResults;