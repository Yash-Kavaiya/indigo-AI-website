import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, Plane, Car, Hotel, 
  Camera, Utensils, Star, ArrowRight, Download,
  Share2, Edit, Plus, Trash2, CheckCircle,
  Sun, Moon, Coffee, Sunset, Mountain, Waves
} from 'lucide-react';

interface ItineraryDay {
  day: number;
  date: string;
  activities: ItineraryActivity[];
  meals: ItineraryMeal[];
  accommodation: ItineraryAccommodation;
  transportation: ItineraryTransportation[];
  budget: number;
}

interface ItineraryActivity {
  id: string;
  name: string;
  description: string;
  time: string;
  duration: string;
  location: string;
  cost: number;
  type: 'sightseeing' | 'adventure' | 'culture' | 'relaxation' | 'shopping';
  rating: number;
  images: string[];
  tips: string[];
}

interface ItineraryMeal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  restaurant: string;
  cuisine: string;
  time: string;
  cost: number;
  rating: number;
  location: string;
}

interface ItineraryAccommodation {
  id: string;
  name: string;
  type: string;
  rating: number;
  cost: number;
  amenities: string[];
  location: string;
  image: string;
}

interface ItineraryTransportation {
  id: string;
  type: 'flight' | 'taxi' | 'train' | 'bus' | 'walk' | 'metro';
  from: string;
  to: string;
  time: string;
  duration: string;
  cost: number;
}

interface TravelItineraryGeneratorProps {
  destination: {
    name: string;
    country: string;
    duration: string;
    budget: number;
  };
  preferences: {
    travelStyle: string[];
    interests: string[];
    activities: string[];
  };
}

const TravelItineraryGenerator: React.FC<TravelItineraryGeneratorProps> = ({
  destination,
  preferences
}) => {
  const [generatedItinerary, setGeneratedItinerary] = useState<ItineraryDay[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [editMode, setEditMode] = useState(false);

  // Mock data for demonstration
  const mockItinerary: ItineraryDay[] = [
    {
      day: 1,
      date: '2025-03-15',
      activities: [
        {
          id: '1',
          name: 'Arrival & City Center Exploration',
          description: 'Start your journey with a walking tour of the historic city center',
          time: '14:00',
          duration: '3 hours',
          location: 'City Center',
          cost: 0,
          type: 'sightseeing',
          rating: 4.5,
          images: ['https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=400'],
          tips: ['Wear comfortable shoes', 'Bring a camera', 'Stay hydrated']
        },
        {
          id: '2',
          name: 'Sunset Viewpoint Visit',
          description: 'Watch the beautiful sunset from the best viewpoint in the city',
          time: '17:30',
          duration: '1.5 hours',
          location: 'Sunset Hill',
          cost: 500,
          type: 'sightseeing',
          rating: 4.8,
          images: ['https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400'],
          tips: ['Arrive 30 minutes early', 'Bring warm clothes', 'Perfect for photos']
        }
      ],
      meals: [
        {
          id: '1',
          type: 'lunch',
          restaurant: 'Local Heritage Cafe',
          cuisine: 'Traditional',
          time: '13:00',
          cost: 800,
          rating: 4.3,
          location: 'Near Airport'
        },
        {
          id: '2',
          type: 'dinner',
          restaurant: 'Rooftop Garden Restaurant',
          cuisine: 'International',
          time: '19:30',
          cost: 1500,
          rating: 4.7,
          location: 'City Center'
        }
      ],
      accommodation: {
        id: '1',
        name: 'Central Heritage Hotel',
        type: 'Hotel',
        rating: 4.5,
        cost: 3500,
        amenities: ['WiFi', 'AC', 'Breakfast', 'Pool'],
        location: 'City Center',
        image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      transportation: [
        {
          id: '1',
          type: 'flight',
          from: 'Delhi',
          to: destination.name,
          time: '08:00',
          duration: '2h 30m',
          cost: 8500
        },
        {
          id: '2',
          type: 'taxi',
          from: 'Airport',
          to: 'Hotel',
          time: '11:30',
          duration: '45 minutes',
          cost: 600
        }
      ],
      budget: 15400
    },
    {
      day: 2,
      date: '2025-03-16',
      activities: [
        {
          id: '3',
          name: 'Historical Museum Tour',
          description: 'Guided tour of the national museum with ancient artifacts',
          time: '10:00',
          duration: '2.5 hours',
          location: 'Museum District',
          cost: 800,
          type: 'culture',
          rating: 4.6,
          images: ['https://images.pexels.com/photos/1734149/pexels-photo-1734149.jpeg?auto=compress&cs=tinysrgb&w=400'],
          tips: ['Audio guide included', 'Photography allowed', 'Skip the line ticket']
        },
        {
          id: '4',
          name: 'Traditional Market Experience',
          description: 'Explore local markets and shop for authentic souvenirs',
          time: '14:30',
          duration: '2 hours',
          location: 'Old Market',
          cost: 1200,
          type: 'shopping',
          rating: 4.4,
          images: ['https://images.pexels.com/photos/1252814/pexels-photo-1252814.jpeg?auto=compress&cs=tinysrgb&w=400'],
          tips: ['Bargaining is expected', 'Try local snacks', 'Keep valuables safe']
        }
      ],
      meals: [
        {
          id: '3',
          type: 'breakfast',
          restaurant: 'Hotel Breakfast',
          cuisine: 'Continental',
          time: '08:00',
          cost: 0,
          rating: 4.0,
          location: 'Hotel'
        },
        {
          id: '4',
          type: 'lunch',
          restaurant: 'Street Food Corner',
          cuisine: 'Local',
          time: '13:00',
          cost: 400,
          rating: 4.5,
          location: 'Market Area'
        },
        {
          id: '5',
          type: 'dinner',
          restaurant: 'Fine Dining Palace',
          cuisine: 'Fusion',
          time: '20:00',
          cost: 2000,
          rating: 4.8,
          location: 'Downtown'
        }
      ],
      accommodation: {
        id: '1',
        name: 'Central Heritage Hotel',
        type: 'Hotel',
        rating: 4.5,
        cost: 3500,
        amenities: ['WiFi', 'AC', 'Breakfast', 'Pool'],
        location: 'City Center',
        image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      transportation: [
        {
          id: '3',
          type: 'metro',
          from: 'Hotel',
          to: 'Museum',
          time: '09:30',
          duration: '20 minutes',
          cost: 50
        },
        {
          id: '4',
          type: 'walk',
          from: 'Museum',
          to: 'Market',
          time: '14:00',
          duration: '15 minutes',
          cost: 0
        }
      ],
      budget: 7950
    }
  ];

  const generateItinerary = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGeneratedItinerary(mockItinerary);
    setIsGenerating(false);
  };

  const totalBudget = generatedItinerary.reduce((sum, day) => sum + day.budget, 0);
  const selectedDayData = generatedItinerary.find(day => day.day === selectedDay);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sightseeing': return Camera;
      case 'adventure': return Mountain;
      case 'culture': return Star;
      case 'relaxation': return Waves;
      case 'shopping': return ArrowRight;
      default: return MapPin;
    }
  };

  const getTimeIcon = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 12) return Sun;
    if (hour < 17) return Sun;
    if (hour < 20) return Sunset;
    return Moon;
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return Coffee;
      case 'lunch': return Sun;
      case 'dinner': return Moon;
      default: return Utensils;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-elevated p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-h3 text-primary font-bold mb-2">
              AI Travel Itinerary for {destination.name}
            </h2>
            <p className="text-body1 text-secondary">
              Personalized day-by-day travel plan based on your preferences
            </p>
          </div>
          
          {generatedItinerary.length === 0 ? (
            <button
              onClick={generateItinerary}
              disabled={isGenerating}
              className="btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Calendar className="h-5 w-5" />
                  <span>Generate Itinerary</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setEditMode(!editMode)}
                className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50"
              >
                <Edit className="h-5 w-5" />
                <span>{editMode ? 'View Mode' : 'Edit Mode'}</span>
              </button>
              <button className="btn-contained bg-success-500 hover:bg-success-600 text-white">
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
              <button className="btn-outlined border-secondary-500 text-secondary-500 hover:bg-secondary-50">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          )}
        </div>

        {generatedItinerary.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-4 text-center">
              <Calendar className="h-8 w-8 text-primary-500 mx-auto mb-2" />
              <p className="text-h5 font-bold text-primary">{generatedItinerary.length} Days</p>
              <p className="text-body2 text-secondary">Total Duration</p>
            </div>
            <div className="card p-4 text-center">
              <MapPin className="h-8 w-8 text-secondary-500 mx-auto mb-2" />
              <p className="text-h5 font-bold text-primary">
                {generatedItinerary.reduce((sum, day) => sum + day.activities.length, 0)} Activities
              </p>
              <p className="text-body2 text-secondary">Planned Activities</p>
            </div>
            <div className="card p-4 text-center">
              <Hotel className="h-8 w-8 text-success-500 mx-auto mb-2" />
              <p className="text-h5 font-bold text-primary">
                {new Set(generatedItinerary.map(day => day.accommodation.name)).size} Hotels
              </p>
              <p className="text-body2 text-secondary">Accommodations</p>
            </div>
            <div className="card p-4 text-center">
              <Star className="h-8 w-8 text-warning-500 mx-auto mb-2" />
              <p className="text-h5 font-bold text-primary">₹{totalBudget.toLocaleString()}</p>
              <p className="text-body2 text-secondary">Total Budget</p>
            </div>
          </div>
        )}
      </div>

      {isGenerating && (
        <div className="card-elevated p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-6"></div>
          <h3 className="text-h4 text-primary mb-4">Generating Your Perfect Itinerary</h3>
          <p className="text-body1 text-secondary">
            Our AI is analyzing your preferences and creating a personalized travel plan...
          </p>
        </div>
      )}

      {generatedItinerary.length > 0 && (
        <>
          {/* Day Selection */}
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-h4 text-primary font-bold">Daily Itinerary</h3>
              <div className="flex items-center space-x-2">
                {generatedItinerary.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                      selectedDay === day.day
                        ? 'bg-primary-500 text-white shadow-elevation-2'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>
            </div>

            {selectedDayData && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Timeline */}
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    {/* Activities */}
                    {selectedDayData.activities.map((activity, index) => {
                      const ActivityIcon = getActivityIcon(activity.type);
                      const TimeIcon = getTimeIcon(activity.time);
                      return (
                        <div key={activity.id} className="card p-6 relative">
                          {editMode && (
                            <div className="absolute top-4 right-4 flex space-x-2">
                              <button className="text-primary-500 hover:text-primary-600">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-error-500 hover:text-error-600">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                          
                          <div className="flex items-start space-x-4">
                            <div className="bg-primary-100 rounded-2xl p-3">
                              <ActivityIcon className="h-6 w-6 text-primary-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-2">
                                <h4 className="text-h5 text-primary font-bold">{activity.name}</h4>
                                <div className="flex items-center space-x-2 text-secondary">
                                  <TimeIcon className="h-4 w-4" />
                                  <span className="text-body2">{activity.time}</span>
                                  <Clock className="h-4 w-4 ml-2" />
                                  <span className="text-body2">{activity.duration}</span>
                                </div>
                              </div>
                              
                              <p className="text-body1 text-secondary mb-3">{activity.description}</p>
                              
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span className="text-body2 text-secondary">{activity.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Star className="h-4 w-4 text-warning-500 fill-current" />
                                  <span className="text-body2 font-semibold">{activity.rating}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-body2 text-success-600 font-semibold">
                                    ₹{activity.cost.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              
                              {activity.images.length > 0 && (
                                <div className="flex space-x-2 mb-3">
                                  {activity.images.slice(0, 3).map((image, imgIndex) => (
                                    <img
                                      key={imgIndex}
                                      src={image}
                                      alt={activity.name}
                                      className="w-16 h-16 object-cover rounded-xl"
                                    />
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex flex-wrap gap-2">
                                {activity.tips.map((tip, tipIndex) => (
                                  <span
                                    key={tipIndex}
                                    className="bg-warning-100 text-warning-700 px-2 py-1 rounded-full text-caption"
                                  >
                                    💡 {tip}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Meals */}
                    {selectedDayData.meals.map((meal) => {
                      const MealIcon = getMealIcon(meal.type);
                      return (
                        <div key={meal.id} className="card p-4 bg-orange-50 border border-orange-200">
                          <div className="flex items-center space-x-4">
                            <div className="bg-orange-100 rounded-xl p-2">
                              <MealIcon className="h-5 w-5 text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-h6 text-primary font-bold capitalize">{meal.type}</h5>
                              <p className="text-body1 text-secondary">{meal.restaurant} • {meal.cuisine}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-body2 text-secondary">{meal.time}</p>
                              <p className="text-body1 font-semibold text-success-600">₹{meal.cost}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {editMode && (
                      <button className="w-full card p-6 border-2 border-dashed border-primary-300 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 flex items-center justify-center text-primary-500">
                        <Plus className="h-6 w-6 mr-2" />
                        <span className="text-h6 font-semibold">Add Activity</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Day Summary */}
                <div className="space-y-6">
                  {/* Accommodation */}
                  <div className="card p-6">
                    <h4 className="text-h6 text-primary font-bold mb-4 flex items-center space-x-2">
                      <Hotel className="h-5 w-5" />
                      <span>Accommodation</span>
                    </h4>
                    <img
                      src={selectedDayData.accommodation.image}
                      alt={selectedDayData.accommodation.name}
                      className="w-full h-32 object-cover rounded-xl mb-4"
                    />
                    <h5 className="text-h6 text-primary font-bold mb-2">
                      {selectedDayData.accommodation.name}
                    </h5>
                    <div className="flex items-center space-x-2 mb-3">
                      <Star className="h-4 w-4 text-warning-500 fill-current" />
                      <span className="text-body2 font-semibold">{selectedDayData.accommodation.rating}</span>
                      <span className="text-body2 text-secondary">• {selectedDayData.accommodation.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {selectedDayData.accommodation.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <p className="text-h6 text-success-600 font-bold">
                      ₹{selectedDayData.accommodation.cost.toLocaleString()}/night
                    </p>
                  </div>

                  {/* Transportation */}
                  <div className="card p-6">
                    <h4 className="text-h6 text-primary font-bold mb-4 flex items-center space-x-2">
                      <Car className="h-5 w-5" />
                      <span>Transportation</span>
                    </h4>
                    <div className="space-y-3">
                      {selectedDayData.transportation.map((transport) => (
                        <div key={transport.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div>
                            <p className="text-body1 font-semibold text-primary capitalize">
                              {transport.type}
                            </p>
                            <p className="text-body2 text-secondary">
                              {transport.from} → {transport.to}
                            </p>
                            <p className="text-body2 text-secondary">
                              {transport.time} • {transport.duration}
                            </p>
                          </div>
                          <p className="text-body1 font-semibold text-success-600">
                            ₹{transport.cost.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Day Budget */}
                  <div className="card p-6 bg-gradient-to-r from-success-50 to-success-100 border border-success-200">
                    <h4 className="text-h6 text-success-700 font-bold mb-4">Day {selectedDay} Budget</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-body2 text-success-600">Activities:</span>
                        <span className="text-body2 font-semibold text-success-700">
                          ₹{selectedDayData.activities.reduce((sum, a) => sum + a.cost, 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body2 text-success-600">Meals:</span>
                        <span className="text-body2 font-semibold text-success-700">
                          ₹{selectedDayData.meals.reduce((sum, m) => sum + m.cost, 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body2 text-success-600">Accommodation:</span>
                        <span className="text-body2 font-semibold text-success-700">
                          ₹{selectedDayData.accommodation.cost.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body2 text-success-600">Transportation:</span>
                        <span className="text-body2 font-semibold text-success-700">
                          ₹{selectedDayData.transportation.reduce((sum, t) => sum + t.cost, 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t border-success-300 pt-2">
                        <div className="flex justify-between">
                          <span className="text-body1 font-bold text-success-700">Total:</span>
                          <span className="text-h6 font-bold text-success-700">
                            ₹{selectedDayData.budget.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Panel */}
          <div className="card-elevated p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
            <div className="text-center">
              <h3 className="text-h3 text-primary mb-6">Ready to Make This Trip Happen?</h3>
              <p className="text-body1 text-secondary mb-8 max-w-2xl mx-auto">
                Your personalized itinerary is ready! Start booking flights, hotels, and activities to bring your dream trip to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                  <Plane className="h-5 w-5" />
                  <span>Book Flights</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="btn-contained bg-secondary-500 hover:bg-secondary-600 text-white">
                  <Hotel className="h-5 w-5" />
                  <span>Book Hotels</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="btn-outlined border-success-500 text-success-500 hover:bg-success-50">
                  <CheckCircle className="h-5 w-5" />
                  <span>Save Itinerary</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TravelItineraryGenerator;