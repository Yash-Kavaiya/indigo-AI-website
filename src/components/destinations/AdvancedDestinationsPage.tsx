import React, { useState } from 'react';
import { 
  ArrowLeft, Brain, Sparkles, Filter, Globe, 
  DollarSign, Calendar, Users, Heart, ArrowRight, 
  Star, Clock, Plane, Camera, Map, Eye, Share2,
  RotateCcw, Bell, Shuffle, Target, Route, MapPin
} from 'lucide-react';
import { UserPreferences, Destination } from '../../pages/DestinationsPage';
import AIDestinationQuestionnaire from './AIDestinationQuestionnaire';
import DestinationFilters from './DestinationFilters';
import DestinationResults from './DestinationResults';
import VirtualTourModal from './VirtualTourModal';
import InteractiveWorldMap from './InteractiveWorldMap';
import DestinationComparison from './DestinationComparison';
import TravelItineraryGenerator from './TravelItineraryGenerator';
import PriceAlerts from './PriceAlerts';
import LocalEventsCalendar from './LocalEventsCalendar';

type PageView = 'questionnaire' | 'results' | 'map' | 'comparison' | 'itinerary' | 'alerts' | 'events';

interface AdvancedDestinationsPageProps {
  onBack: () => void;
}

const AdvancedDestinationsPage: React.FC<AdvancedDestinationsPageProps> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<PageView>('questionnaire');
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [comparisonDestinations, setComparisonDestinations] = useState<Destination[]>([]);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  // Mock destinations for map and comparison
  const mockDestinations = [
    {
      id: '1',
      name: 'Kyoto',
      country: 'Japan',
      continent: 'Asia',
      coordinates: { lat: 35.0116, lng: 135.7681 },
      price: 150000,
      rating: 4.8,
      popular: true,
      matchScore: 95,
      bestTime: ['spring', 'autumn'],
      image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      name: 'Santorini',
      country: 'Greece',
      continent: 'Europe',
      coordinates: { lat: 36.3932, lng: 25.4615 },
      price: 180000,
      rating: 4.9,
      popular: true,
      matchScore: 92,
      bestTime: ['spring', 'summer'],
      image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const handleQuestionnaireComplete = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setCurrentView('results');
  };

  const resetQuestionnaire = () => {
    setCurrentView('questionnaire');
    setUserPreferences(null);
    setShowFilters(false);
    setSelectedDestination(null);
    setComparisonDestinations([]);
  };

  const handleDestinationSelect = (destination: any) => {
    setSelectedDestination(destination);
    setCurrentView('itinerary');
  };

  const addToComparison = (destination: Destination) => {
    if (comparisonDestinations.length < 4 && !comparisonDestinations.find(d => d.id === destination.id)) {
      setComparisonDestinations([...comparisonDestinations, destination]);
    }
  };

  const removeFromComparison = (destinationId: string) => {
    setComparisonDestinations(comparisonDestinations.filter(d => d.id !== destinationId));
  };

  const navigationItems = [
    { id: 'questionnaire' as const, label: 'AI Questionnaire', icon: Brain, description: 'Get personalized recommendations' },
    { id: 'results' as const, label: 'Search Results', icon: Sparkles, description: 'Browse AI-curated destinations' },
    { id: 'map' as const, label: 'World Map', icon: Globe, description: 'Explore destinations visually' },
    { id: 'comparison' as const, label: 'Compare', icon: Target, description: 'Side-by-side comparison' },
    { id: 'itinerary' as const, label: 'Itinerary', icon: Route, description: 'AI-generated travel plans' },
    { id: 'alerts' as const, label: 'Price Alerts', icon: Bell, description: 'Track price changes' },
    { id: 'events' as const, label: 'Local Events', icon: Calendar, description: 'Discover local experiences' }
  ];

  const stats = [
    { label: 'Destinations', value: '500+', icon: Globe, color: 'primary' },
    { label: 'Countries', value: '150+', icon: MapPin, color: 'secondary' },
    { label: 'AI Recommendations', value: '1M+', icon: Brain, color: 'success' },
    { label: 'Happy Travelers', value: '50K+', icon: Heart, color: 'warning' }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'questionnaire':
        return <AIDestinationQuestionnaire onComplete={handleQuestionnaireComplete} />;
      case 'results':
        return userPreferences ? <DestinationResults preferences={userPreferences} /> : null;
      case 'map':
        return <InteractiveWorldMap destinations={mockDestinations} onDestinationSelect={handleDestinationSelect} />;
      case 'comparison':
        return (
          <DestinationComparison
            destinations={comparisonDestinations}
            onAddDestination={() => setCurrentView('results')}
            onRemoveDestination={removeFromComparison}
          />
        );
      case 'itinerary':
        return selectedDestination ? (
          <TravelItineraryGenerator
            destination={{
              name: selectedDestination.name,
              country: selectedDestination.country,
              duration: selectedDestination.duration || '7 days',
              budget: selectedDestination.price?.mid || 150000
            }}
            preferences={userPreferences || {
              travelStyle: [],
              interests: [],
              activities: [],
              budget: 'moderate',
              season: 'spring',
              groupSize: 'couple',
              accommodationType: 'boutique',
              duration: 'medium',
              country: 'any'
            }}
          />
        ) : (
          <div className="text-center py-16">
            <div className="card bg-gray-50 border-2 border-gray-200 p-12 max-w-md mx-auto">
              <Route className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-h4 text-primary mb-4">Select a Destination</h3>
              <p className="text-body1 text-secondary mb-6">
                Choose a destination from the search results to generate a personalized itinerary.
              </p>
              <button
                onClick={() => setCurrentView('results')}
                className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
              >
                Browse Destinations
              </button>
            </div>
          </div>
        );
      case 'alerts':
        return <PriceAlerts destination={selectedDestination} />;
      case 'events':
        return selectedDestination ? (
          <LocalEventsCalendar destination={{ name: selectedDestination.name, country: selectedDestination.country }} />
        ) : (
          <div className="text-center py-16">
            <div className="card bg-gray-50 border-2 border-gray-200 p-12 max-w-md mx-auto">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-h4 text-primary mb-4">Select a Destination</h3>
              <p className="text-body1 text-secondary mb-6">
                Choose a destination to discover local events and experiences.
              </p>
              <button
                onClick={() => setCurrentView('results')}
                className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
              >
                Browse Destinations
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white shadow-elevation-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="btn-text text-white hover:bg-white/20 p-2"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-2xl p-3">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-h4 font-bold">AI Destination Discovery</h1>
                  <p className="text-primary-200 text-body2">Complete travel planning platform powered by AI</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {currentView !== 'questionnaire' && (
                <>
                  {currentView === 'results' && (
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="btn-outlined border-white text-white hover:bg-white/10"
                    >
                      <Filter className="h-5 w-5" />
                      <span>Filters</span>
                    </button>
                  )}
                  <button
                    onClick={resetQuestionnaire}
                    className="btn-contained bg-white text-primary-600 hover:bg-gray-100"
                  >
                    <Brain className="h-5 w-5" />
                    <span>New Search</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 overflow-x-auto py-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                disabled={item.id !== 'questionnaire' && !userPreferences && item.id !== 'map' && item.id !== 'alerts'}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  currentView === item.id
                    ? 'bg-primary-500 text-white shadow-elevation-2'
                    : 'text-secondary hover:text-primary hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <div className="text-left">
                  <div>{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`bg-${stat.color}-100 rounded-2xl p-3`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div>
                  <p className="text-h5 font-bold text-primary">{stat.value}</p>
                  <p className="text-body2 text-secondary">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'results' && userPreferences ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="lg:col-span-1">
                <DestinationFilters
                  preferences={userPreferences}
                  onPreferencesChange={setUserPreferences}
                />
              </div>
            )}
            
            {/* Results */}
            <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
              <DestinationResults preferences={userPreferences} />
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </div>

      {/* Virtual Tour Modal */}
      {showVirtualTour && selectedDestination && (
        <VirtualTourModal
          destination={{
            name: selectedDestination.name,
            country: selectedDestination.country,
            images: [
              {
                url: selectedDestination.image,
                title: `${selectedDestination.name} Overview`,
                description: `Beautiful panoramic view of ${selectedDestination.name}`,
                type: '360'
              },
              {
                url: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800',
                title: 'Street View',
                description: 'Walk through the historic streets',
                type: 'photo'
              },
              {
                url: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800',
                title: 'Sunset Experience',
                description: 'Experience the magical sunset',
                type: 'video'
              }
            ]
          }}
          isOpen={showVirtualTour}
          onClose={() => setShowVirtualTour(false)}
        />
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-40">
        {selectedDestination && (
          <button
            onClick={() => setShowVirtualTour(true)}
            className="btn-contained bg-secondary-500 hover:bg-secondary-600 text-white p-4 rounded-full shadow-elevation-3 hover:shadow-elevation-4"
            title="Virtual Tour"
          >
            <RotateCcw className="h-6 w-6" />
          </button>
        )}
        
        {comparisonDestinations.length > 0 && (
          <button
            onClick={() => setCurrentView('comparison')}
            className="btn-contained bg-warning-500 hover:bg-warning-600 text-white p-4 rounded-full shadow-elevation-3 hover:shadow-elevation-4 relative"
            title="Compare Destinations"
          >
            <Target className="h-6 w-6" />
            <div className="absolute -top-2 -right-2 bg-error-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {comparisonDestinations.length}
            </div>
          </button>
        )}
        
        <button
          onClick={() => setCurrentView('map')}
          className="btn-contained bg-success-500 hover:bg-success-600 text-white p-4 rounded-full shadow-elevation-3 hover:shadow-elevation-4"
          title="World Map"
        >
          <Globe className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default AdvancedDestinationsPage;