import React, { useState } from 'react';
import { 
  Calendar, Music, Users, Camera, Star, MapPin, 
  Clock, Ticket, ArrowRight, Filter, Search,
  ChevronLeft, ChevronRight, Heart, Share2,
  Sun, Moon, Coffee, Utensils, Car, Plane
} from 'lucide-react';

interface LocalEvent {
  id: string;
  title: string;
  description: string;
  category: 'festival' | 'concert' | 'cultural' | 'food' | 'sports' | 'art' | 'nightlife' | 'religious';
  date: string;
  time: string;
  location: string;
  venue: string;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  rating: number;
  attendees: number;
  image: string;
  tags: string[];
  duration: string;
  organizer: string;
  ticketLink?: string;
  featured: boolean;
  weatherDependent: boolean;
}

interface LocalEventsCalendarProps {
  destination: {
    name: string;
    country: string;
  };
}

const LocalEventsCalendar: React.FC<LocalEventsCalendarProps> = ({ destination }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar, color: 'gray' },
    { id: 'festival', name: 'Festivals', icon: Music, color: 'primary' },
    { id: 'cultural', name: 'Cultural', icon: Star, color: 'secondary' },
    { id: 'food', name: 'Food & Drink', icon: Utensils, color: 'warning' },
    { id: 'art', name: 'Arts', icon: Camera, color: 'success' },
    { id: 'sports', name: 'Sports', icon: Users, color: 'error' },
    { id: 'nightlife', name: 'Nightlife', icon: Moon, color: 'primary' },
    { id: 'religious', name: 'Religious', icon: Sun, color: 'warning' }
  ];

  // Mock events data
  const events: LocalEvent[] = [
    {
      id: '1',
      title: 'Cherry Blossom Festival',
      description: 'Annual cherry blossom viewing festival with traditional performances, food stalls, and cultural activities.',
      category: 'festival',
      date: '2025-03-20',
      time: '10:00',
      location: 'Ueno Park',
      venue: 'Ueno Park Central Area',
      price: { min: 0, max: 2000, currency: 'JPY' },
      rating: 4.8,
      attendees: 50000,
      image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['outdoor', 'family-friendly', 'photography', 'traditional'],
      duration: '8 hours',
      organizer: 'Tokyo Metropolitan Government',
      featured: true,
      weatherDependent: true
    },
    {
      id: '2',
      title: 'Tokyo International Film Festival',
      description: 'Prestigious film festival showcasing international and Japanese cinema with premieres and special screenings.',
      category: 'art',
      date: '2025-03-22',
      time: '18:00',
      location: 'Roppongi Hills',
      venue: 'Tokyo Midtown',
      price: { min: 1500, max: 8000, currency: 'JPY' },
      rating: 4.6,
      attendees: 15000,
      image: 'https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['cinema', 'indoor', 'cultural', 'international'],
      duration: '4 hours',
      organizer: 'Tokyo International Film Festival Committee',
      ticketLink: 'https://example.com/tickets',
      featured: false,
      weatherDependent: false
    },
    {
      id: '3',
      title: 'Ramen Festival Tokyo',
      description: 'Celebration of Tokyo\'s best ramen with over 50 vendors, cooking demonstrations, and tasting sessions.',
      category: 'food',
      date: '2025-03-25',
      time: '11:00',
      location: 'Shibuya',
      venue: 'Yoyogi Park Event Space',
      price: { min: 500, max: 3000, currency: 'JPY' },
      rating: 4.5,
      attendees: 25000,
      image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['food', 'outdoor', 'tasting', 'local'],
      duration: '6 hours',
      organizer: 'Tokyo Food Association',
      featured: true,
      weatherDependent: true
    },
    {
      id: '4',
      title: 'Traditional Tea Ceremony Workshop',
      description: 'Learn the art of Japanese tea ceremony in an authentic setting with master tea practitioners.',
      category: 'cultural',
      date: '2025-03-18',
      time: '14:00',
      location: 'Asakusa',
      venue: 'Sensoji Temple Cultural Center',
      price: { min: 3000, max: 5000, currency: 'JPY' },
      rating: 4.9,
      attendees: 200,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['traditional', 'workshop', 'indoor', 'small-group'],
      duration: '2 hours',
      organizer: 'Asakusa Cultural Foundation',
      featured: false,
      weatherDependent: false
    },
    {
      id: '5',
      title: 'Tokyo Marathon',
      description: 'World-class marathon race through Tokyo\'s iconic landmarks with 38,000 participants from around the globe.',
      category: 'sports',
      date: '2025-03-01',
      time: '09:00',
      location: 'Tokyo Metropolitan Area',
      venue: 'Various Streets',
      price: { min: 0, max: 15000, currency: 'JPY' },
      rating: 4.7,
      attendees: 200000,
      image: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['sports', 'marathon', 'outdoor', 'international'],
      duration: '6 hours',
      organizer: 'Tokyo Marathon Foundation',
      featured: true,
      weatherDependent: true
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date, day: number) => {
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatPrice = (event: LocalEvent) => {
    if (event.price.min === 0 && event.price.max === 0) return 'Free';
    if (event.price.min === event.price.max) return `¥${event.price.min.toLocaleString()}`;
    return `¥${event.price.min.toLocaleString()} - ¥${event.price.max.toLocaleString()}`;
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-elevated p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-h3 text-primary font-bold mb-2">
              Local Events in {destination.name}
            </h2>
            <p className="text-body1 text-secondary">
              Discover festivals, cultural events, and local experiences during your visit
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'calendar' ? 'bg-white shadow-sm text-primary' : 'text-gray-600'
                }`}
              >
                Calendar
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

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-box w-full pl-10"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`btn-contained transition-all duration-200 ${
                  selectedCategory === category.id
                    ? `bg-${category.color}-500 text-white`
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="text-center">
            <p className="text-h4 font-bold text-primary">{filteredEvents.length}</p>
            <p className="text-body2 text-secondary">Events Found</p>
          </div>
          <div className="text-center">
            <p className="text-h4 font-bold text-primary">{filteredEvents.filter(e => e.featured).length}</p>
            <p className="text-body2 text-secondary">Featured Events</p>
          </div>
          <div className="text-center">
            <p className="text-h4 font-bold text-primary">{filteredEvents.filter(e => e.price.min === 0).length}</p>
            <p className="text-body2 text-secondary">Free Events</p>
          </div>
          <div className="text-center">
            <p className="text-h4 font-bold text-primary">
              {new Set(filteredEvents.map(e => e.category)).size}
            </p>
            <p className="text-body2 text-secondary">Categories</p>
          </div>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        /* Calendar View */
        <div className="card-elevated p-8">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-h3 text-primary font-bold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 p-3"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 p-3"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {dayNames.map((day) => (
              <div key={day} className="text-center p-3 font-semibold text-secondary text-body2">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {getDaysInMonth(currentDate).map((day, index) => {
              if (day === null) {
                return <div key={index} className="p-2"></div>;
              }
              
              const dayEvents = getEventsForDate(currentDate, day);
              const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
              
              return (
                <div
                  key={day}
                  className={`min-h-24 p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 ${
                    isToday ? 'bg-primary-50 border-primary-200' : ''
                  }`}
                >
                  <div className={`text-body2 font-semibold mb-2 ${
                    isToday ? 'text-primary-600' : 'text-primary'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => {
                      const categoryInfo = getCategoryInfo(event.category);
                      return (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded bg-${categoryInfo.color}-100 text-${categoryInfo.color}-700 cursor-pointer hover:bg-${categoryInfo.color}-200 transition-colors duration-200`}
                          title={event.title}
                        >
                          <div className="truncate font-medium">{event.title}</div>
                          <div className="truncate opacity-75">{event.time}</div>
                        </div>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="space-y-6">
          {filteredEvents.map((event) => {
            const categoryInfo = getCategoryInfo(event.category);
            return (
              <div key={event.id} className="card-elevated overflow-hidden hover:scale-105 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {event.featured && (
                      <div className="absolute top-4 left-4 bg-error-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                        Featured
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200">
                        <Heart className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200">
                        <Share2 className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className={`inline-flex items-center space-x-2 bg-${categoryInfo.color}-500 rounded-full px-3 py-1 mb-2`}>
                        <categoryInfo.icon className="h-4 w-4" />
                        <span className="text-body2 font-medium capitalize">{event.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-h4 text-primary font-bold mb-2">{event.title}</h3>
                        <p className="text-body1 text-secondary mb-4 line-clamp-2">{event.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="h-4 w-4 text-warning-500 fill-current" />
                          <span className="text-body1 font-semibold">{event.rating}</span>
                        </div>
                        <p className="text-body2 text-secondary">{event.attendees.toLocaleString()} attending</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <span className="text-body1 text-primary font-medium">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-gray-500" />
                          <span className="text-body1 text-secondary">{event.time} • {event.duration}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <span className="text-body1 text-secondary">{event.venue}, {event.location}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Ticket className="h-5 w-5 text-gray-500" />
                          <span className="text-body1 font-semibold text-success-600">
                            {formatPrice(event)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-gray-500" />
                          <span className="text-body1 text-secondary">By {event.organizer}</span>
                        </div>
                        {event.weatherDependent && (
                          <div className="flex items-center space-x-3">
                            <Sun className="h-5 w-5 text-warning-500" />
                            <span className="text-body2 text-warning-600">Weather dependent</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-body2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {event.ticketLink ? (
                        <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                          <Ticket className="h-5 w-5" />
                          <span>Get Tickets</span>
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      ) : (
                        <button className="btn-contained bg-success-500 hover:bg-success-600 text-white">
                          <span>Free Entry</span>
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      )}
                      <button className="btn-outlined border-secondary-500 text-secondary-500 hover:bg-secondary-50">
                        <MapPin className="h-5 w-5" />
                        <span>View Location</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No Events Found */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <div className="card bg-gray-50 border-2 border-gray-200 p-12 max-w-md mx-auto">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-h4 text-primary mb-4">No Events Found</h3>
            <p className="text-body1 text-secondary mb-6">
              Try adjusting your search criteria or browse different categories to find events.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalEventsCalendar;