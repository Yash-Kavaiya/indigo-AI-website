import React, { useState } from 'react';
import { 
  Brain, ArrowRight, ArrowLeft, MapPin, DollarSign, 
  Calendar, Users, Heart, Star, Camera, Compass,
  CheckCircle, Sparkles, Globe, Clock
} from 'lucide-react';
import { UserPreferences } from '../../pages/DestinationsPage';

interface AIDestinationQuestionnaireProps {
  onComplete: (preferences: UserPreferences) => void;
}

const AIDestinationQuestionnaire: React.FC<AIDestinationQuestionnaireProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({
    travelStyle: [],
    interests: [],
    activities: []
  });

  const totalSteps = 8;

  const questions = [
    {
      id: 'travelStyle',
      title: 'What\'s your travel style?',
      subtitle: 'Select all that apply to you',
      icon: Compass,
      type: 'multiple',
      options: [
        { id: 'adventure', label: 'Adventure Seeker', desc: 'Thrilling activities and exploration', icon: '🏔️' },
        { id: 'relaxation', label: 'Relaxation', desc: 'Peaceful and restorative experiences', icon: '🧘' },
        { id: 'culture', label: 'Cultural Explorer', desc: 'Museums, history, and local traditions', icon: '🏛️' },
        { id: 'luxury', label: 'Luxury Traveler', desc: 'Premium experiences and comfort', icon: '✨' },
        { id: 'budget', label: 'Budget Conscious', desc: 'Value for money experiences', icon: '💰' },
        { id: 'social', label: 'Social Butterfly', desc: 'Meeting people and nightlife', icon: '🎉' },
        { id: 'romantic', label: 'Romantic Getaway', desc: 'Intimate and romantic settings', icon: '💕' },
        { id: 'family', label: 'Family Fun', desc: 'Kid-friendly activities and attractions', icon: '👨‍👩‍👧‍👦' }
      ]
    },
    {
      id: 'budget',
      title: 'What\'s your travel budget?',
      subtitle: 'Per person for the entire trip',
      icon: DollarSign,
      type: 'single',
      options: [
        { id: 'budget', label: 'Budget Traveler', desc: '₹50,000 - ₹1,50,000', icon: '💵' },
        { id: 'moderate', label: 'Moderate Spender', desc: '₹1,50,000 - ₹3,00,000', icon: '💳' },
        { id: 'premium', label: 'Premium Experience', desc: '₹3,00,000 - ₹5,00,000', icon: '💎' },
        { id: 'luxury', label: 'Luxury Travel', desc: '₹5,00,000+', icon: '👑' }
      ]
    },
    {
      id: 'season',
      title: 'When do you prefer to travel?',
      subtitle: 'Choose your ideal travel season',
      icon: Calendar,
      type: 'single',
      options: [
        { id: 'spring', label: 'Spring', desc: 'March - May, pleasant weather', icon: '🌸' },
        { id: 'summer', label: 'Summer', desc: 'June - August, warm weather', icon: '☀️' },
        { id: 'autumn', label: 'Autumn', desc: 'September - November, cool weather', icon: '🍂' },
        { id: 'winter', label: 'Winter', desc: 'December - February, cold weather', icon: '❄️' },
        { id: 'flexible', label: 'Flexible', desc: 'Any time of the year', icon: '🌍' }
      ]
    },
    {
      id: 'groupSize',
      title: 'Who are you traveling with?',
      subtitle: 'This helps us recommend suitable destinations',
      icon: Users,
      type: 'single',
      options: [
        { id: 'solo', label: 'Solo Travel', desc: 'Just me, myself and I', icon: '🧳' },
        { id: 'couple', label: 'Couple', desc: 'Romantic trip for two', icon: '💏' },
        { id: 'family', label: 'Family', desc: 'With kids and family members', icon: '👨‍👩‍👧‍👦' },
        { id: 'friends', label: 'Friends Group', desc: 'Fun trip with friends', icon: '👫' },
        { id: 'large_group', label: 'Large Group', desc: '8+ people traveling together', icon: '👥' }
      ]
    },
    {
      id: 'interests',
      title: 'What interests you most?',
      subtitle: 'Select your top interests',
      icon: Heart,
      type: 'multiple',
      options: [
        { id: 'food', label: 'Culinary Experiences', desc: 'Local cuisine and food tours', icon: '🍽️' },
        { id: 'history', label: 'History & Heritage', desc: 'Historical sites and museums', icon: '🏛️' },
        { id: 'nature', label: 'Nature & Wildlife', desc: 'National parks and safaris', icon: '🦋' },
        { id: 'art', label: 'Arts & Culture', desc: 'Galleries, theaters, and festivals', icon: '🎨' },
        { id: 'beaches', label: 'Beaches & Islands', desc: 'Coastal destinations and water activities', icon: '🏖️' },
        { id: 'mountains', label: 'Mountains & Hiking', desc: 'Scenic peaks and trekking', icon: '⛰️' },
        { id: 'nightlife', label: 'Nightlife & Entertainment', desc: 'Bars, clubs, and shows', icon: '🌃' },
        { id: 'shopping', label: 'Shopping', desc: 'Markets, malls, and local crafts', icon: '🛍️' }
      ]
    },
    {
      id: 'accommodationType',
      title: 'Where do you prefer to stay?',
      subtitle: 'Choose your ideal accommodation style',
      icon: Star,
      type: 'single',
      options: [
        { id: 'budget_hotel', label: 'Budget Hotels', desc: 'Clean and comfortable basics', icon: '🏨' },
        { id: 'boutique', label: 'Boutique Hotels', desc: 'Unique character and charm', icon: '🏩' },
        { id: 'luxury_resort', label: 'Luxury Resorts', desc: 'Premium amenities and service', icon: '🏖️' },
        { id: 'local_stay', label: 'Local Experiences', desc: 'Homestays and guesthouses', icon: '🏠' },
        { id: 'unique', label: 'Unique Stays', desc: 'Treehouses, castles, igloos', icon: '🏰' }
      ]
    },
    {
      id: 'activities',
      title: 'What activities excite you?',
      subtitle: 'Select your preferred activities',
      icon: Camera,
      type: 'multiple',
      options: [
        { id: 'sightseeing', label: 'Sightseeing', desc: 'Iconic landmarks and attractions', icon: '📸' },
        { id: 'adventure_sports', label: 'Adventure Sports', desc: 'Diving, skiing, paragliding', icon: '🪂' },
        { id: 'wellness', label: 'Wellness & Spa', desc: 'Relaxation and rejuvenation', icon: '🧘‍♀️' },
        { id: 'festivals', label: 'Festivals & Events', desc: 'Local celebrations and events', icon: '🎭' },
        { id: 'water_sports', label: 'Water Sports', desc: 'Swimming, surfing, sailing', icon: '🏄‍♂️' },
        { id: 'city_exploration', label: 'City Exploration', desc: 'Urban adventures and walking tours', icon: '🚶‍♂️' },
        { id: 'photography', label: 'Photography', desc: 'Scenic spots and photo opportunities', icon: '📷' },
        { id: 'local_experiences', label: 'Local Experiences', desc: 'Authentic cultural immersion', icon: '🎪' }
      ]
    },
    {
      id: 'duration',
      title: 'How long is your trip?',
      subtitle: 'Select your preferred trip duration',
      icon: Clock,
      type: 'single',
      options: [
        { id: 'weekend', label: 'Weekend Getaway', desc: '2-3 days', icon: '📅' },
        { id: 'short', label: 'Short Trip', desc: '4-7 days', icon: '📆' },
        { id: 'medium', label: 'Standard Vacation', desc: '1-2 weeks', icon: '🗓️' },
        { id: 'long', label: 'Extended Travel', desc: '3+ weeks', icon: '📋' }
      ]
    }
  ];

  const currentQuestion = questions[currentStep - 1];

  const handleOptionSelect = (optionId: string) => {
    const question = currentQuestion;
    
    if (question.type === 'single') {
      setPreferences(prev => ({
        ...prev,
        [question.id]: optionId
      }));
    } else {
      setPreferences(prev => {
        const currentArray = (prev[question.id as keyof UserPreferences] as string[]) || [];
        const newArray = currentArray.includes(optionId)
          ? currentArray.filter(id => id !== optionId)
          : [...currentArray, optionId];
        
        return {
          ...prev,
          [question.id]: newArray
        };
      });
    }
  };

  const isOptionSelected = (optionId: string) => {
    const value = preferences[currentQuestion.id as keyof UserPreferences];
    if (Array.isArray(value)) {
      return value.includes(optionId);
    }
    return value === optionId;
  };

  const canProceed = () => {
    const value = preferences[currentQuestion.id as keyof UserPreferences];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return !!value;
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Add country preference as 'any' if not specified
      const finalPreferences: UserPreferences = {
        ...preferences,
        country: 'any'
      } as UserPreferences;
      onComplete(finalPreferences);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="card-elevated p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-3 rounded-full border border-primary-200 mb-6">
            <Brain className="h-6 w-6 text-primary-500" />
            <span className="text-body1 font-semibold text-primary">AI Travel Questionnaire</span>
          </div>
          <h1 className="text-h2 text-primary mb-4">
            Let's Find Your Perfect Destination
          </h1>
          <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
            Answer a few questions and our AI will recommend personalized destinations that match your travel style
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-body2 text-secondary">Question {currentStep} of {totalSteps}</span>
            <span className="text-body2 text-secondary">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-12">
          <div className="bg-primary-100 rounded-3xl p-6 w-fit mx-auto mb-6">
            <currentQuestion.icon className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="text-h3 text-primary mb-4">{currentQuestion.title}</h2>
          <p className="text-body1 text-secondary">{currentQuestion.subtitle}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`card p-6 text-left transition-all duration-300 hover:scale-105 ${
                isOptionSelected(option.id)
                  ? 'ring-4 ring-primary-200 shadow-elevation-3 bg-primary-50'
                  : 'hover:shadow-elevation-2'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{option.icon}</div>
                {isOptionSelected(option.id) && (
                  <CheckCircle className="h-6 w-6 text-primary-500" />
                )}
              </div>
              <h3 className="text-h6 text-primary mb-2 font-semibold">{option.label}</h3>
              <p className="text-body2 text-secondary">{option.desc}</p>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i + 1 <= currentStep ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-elevation-2 hover:shadow-elevation-3"
          >
            <span>{currentStep === totalSteps ? 'Get Recommendations' : 'Next'}</span>
            {currentStep === totalSteps ? (
              <Sparkles className="h-5 w-5" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="card-elevated p-8 bg-gradient-to-r from-secondary-50 to-primary-50 border border-secondary-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-h3 text-primary mb-6">How Our AI Works</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-500 rounded-2xl p-2 mt-1">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-h6 text-primary mb-1">Smart Analysis</h4>
                  <p className="text-body2 text-secondary">Analyzes your preferences against 500+ destinations</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-secondary-500 rounded-2xl p-2 mt-1">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-h6 text-primary mb-1">Global Database</h4>
                  <p className="text-body2 text-secondary">Real-time data on weather, events, and pricing</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-success-500 rounded-2xl p-2 mt-1">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-h6 text-primary mb-1">Personalized Results</h4>
                  <p className="text-body2 text-secondary">Tailored recommendations with match scores</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-white p-8 shadow-elevation-2">
            <h4 className="text-h5 text-primary mb-6 text-center">Your Current Preferences</h4>
            <div className="space-y-3">
              {Object.entries(preferences).map(([key, value]) => {
                if (!value || (Array.isArray(value) && value.length === 0)) return null;
                return (
                  <div key={key} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success-500" />
                    <span className="text-body2 text-primary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}: {
                        Array.isArray(value) ? value.length + ' selected' : 
                        questions.find(q => q.id === key)?.options.find(o => o.id === value)?.label || value
                      }
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDestinationQuestionnaire;