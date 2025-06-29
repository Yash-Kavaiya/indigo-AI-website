import React, { useState } from 'react';
import { 
  Hotel, MapPin, Calendar, User, Star, ArrowRight, 
  Wifi, Car, Coffee, Waves, Dumbbell, Utensils,
  Shield, CheckCircle, Filter, Search, Heart
} from 'lucide-react';

const HotelBooking: React.FC = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkin: '',
    checkout: '',
    rooms: 1,
    adults: 2,
    children: 0
  });

  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    amenities: [] as string[]
  });

  const hotelCategories = [
    { id: 'budget', name: 'Budget Hotels', priceRange: '₹1,000 - ₹3,000', features: ['Free WiFi', 'AC Rooms', 'Basic Amenities'] },
    { id: 'premium', name: 'Premium Hotels', priceRange: '₹3,000 - ₹8,000', features: ['Room Service', 'Gym', 'Restaurant', 'Concierge'] },
    { id: 'luxury', name: 'Luxury Hotels', priceRange: '₹8,000+', features: ['Spa', 'Fine Dining', 'Butler Service', 'Premium Locations'] }
  ];

  const popularAmenities = [
    { id: 'wifi', name: 'Free WiFi', icon: Wifi },
    { id: 'parking', name: 'Free Parking', icon: Car },
    { id: 'breakfast', name: 'Breakfast Included', icon: Coffee },
    { id: 'pool', name: 'Swimming Pool', icon: Waves },
    { id: 'gym', name: 'Fitness Center', icon: Dumbbell },
    { id: 'restaurant', name: 'Restaurant', icon: Utensils }
  ];

  const featuredHotels = [
    {
      id: 1,
      name: 'The Grand Palace',
      location: 'New Delhi',
      rating: 4.8,
      price: 12500,
      originalPrice: 15000,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['wifi', 'parking', 'breakfast', 'pool', 'gym', 'restaurant'],
      category: 'luxury',
      discount: 17,
      reviews: 1250
    },
    {
      id: 2,
      name: 'Marina Bay Resort',
      location: 'Mumbai',
      rating: 4.6,
      price: 8500,
      originalPrice: 10000,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['wifi', 'pool', 'restaurant', 'gym'],
      category: 'premium',
      discount: 15,
      reviews: 890
    },
    {
      id: 3,
      name: 'City Center Hotel',
      location: 'Bangalore',
      rating: 4.2,
      price: 3500,
      originalPrice: 4200,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['wifi', 'parking', 'breakfast'],
      category: 'premium',
      discount: 17,
      reviews: 650
    },
    {
      id: 4,
      name: 'Budget Inn Express',
      location: 'Chennai',
      rating: 4.0,
      price: 2200,
      originalPrice: 2800,
      image: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['wifi', 'parking'],
      category: 'budget',
      discount: 21,
      reviews: 420
    },
    {
      id: 5,
      name: 'Royal Heritage Hotel',
      location: 'Jaipur',
      rating: 4.9,
      price: 18000,
      originalPrice: 22000,
      image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['wifi', 'parking', 'breakfast', 'pool', 'gym', 'restaurant'],
      category: 'luxury',
      discount: 18,
      reviews: 980
    },
    {
      id: 6,
      name: 'Comfort Stay',
      location: 'Pune',
      rating: 4.1,
      price: 2800,
      originalPrice: 3500,
      image: 'https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['wifi', 'breakfast'],
      category: 'budget',
      discount: 20,
      reviews: 310
    }
  ];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const toggleAmenity = (amenityId: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const getAmenityIcon = (amenityId: string) => {
    const amenity = popularAmenities.find(a => a.id === amenityId);
    return amenity ? amenity.icon : Hotel;
  };

  const filteredHotels = featuredHotels.filter(hotel => {
    const categoryMatch = filters.category === 'all' || hotel.category === filters.category;
    const amenityMatch = filters.amenities.length === 0 || 
      filters.amenities.every(amenity => hotel.amenities.includes(amenity));
    
    let priceMatch = true;
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      priceMatch = hotel.price >= min && (max ? hotel.price <= max : true);
    }
    
    return categoryMatch && amenityMatch && priceMatch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-h2 text-primary mb-6">Hotel Booking</h1>
        <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
          Find and book the perfect accommodation from budget-friendly stays to luxury resorts
        </p>
      </div>

      {/* Hotel Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {hotelCategories.map((category) => (
          <div key={category.id} className="card-elevated p-6 hover:scale-105 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="bg-primary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                <Hotel className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">{category.name}</h3>
              <p className="text-h6 text-secondary font-semibold">{category.priceRange}</p>
            </div>
            <div className="space-y-2">
              {category.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success-500" />
                  <span className="text-body2 text-secondary">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Search Form */}
      <div className="card-elevated p-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="floating-label">
              <input
                type="text"
                className="input-box"
                placeholder=" "
                id="destination"
                value={searchData.destination}
                onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
              />
              <label htmlFor="destination">Destination City</label>
              <div className="absolute right-4 top-3">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <input
                type="date"
                className="input-box"
                id="checkin"
                min={getTodayDate()}
                value={searchData.checkin}
                onChange={(e) => setSearchData({...searchData, checkin: e.target.value})}
              />
              <label htmlFor="checkin">Check-in Date</label>
              <div className="absolute right-4 top-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <input
                type="date"
                className="input-box"
                id="checkout"
                min={searchData.checkin || getTomorrowDate()}
                value={searchData.checkout}
                onChange={(e) => setSearchData({...searchData, checkout: e.target.value})}
              />
              <label htmlFor="checkout">Check-out Date</label>
              <div className="absolute right-4 top-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="floating-label">
              <select
                className="input-box"
                id="rooms"
                value={searchData.rooms}
                onChange={(e) => setSearchData({...searchData, rooms: parseInt(e.target.value)})}
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                ))}
              </select>
              <label htmlFor="rooms">Rooms</label>
            </div>
            
            <div className="floating-label">
              <select
                className="input-box"
                id="adults"
                value={searchData.adults}
                onChange={(e) => setSearchData({...searchData, adults: parseInt(e.target.value)})}
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                ))}
              </select>
              <label htmlFor="adults">Adults</label>
            </div>
            
            <div className="floating-label">
              <select
                className="input-box"
                id="children"
                value={searchData.children}
                onChange={(e) => setSearchData({...searchData, children: parseInt(e.target.value)})}
              >
                {[0,1,2,3,4].map(num => (
                  <option key={num} value={num}>{num} Children</option>
                ))}
              </select>
              <label htmlFor="children">Children</label>
            </div>
          </div>

          <button className="w-full btn-contained bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-5 text-h6 shadow-elevation-2 hover:shadow-elevation-3">
            <Search className="h-6 w-6" />
            <span>Search Hotels</span>
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card-elevated p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Filter className="h-6 w-6 text-primary-500" />
          <h3 className="text-h5 text-primary">Filter Hotels</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="text-h6 text-primary mb-4">Category</h4>
            <div className="space-y-2">
              {[
                { id: 'all', name: 'All Categories' },
                { id: 'budget', name: 'Budget' },
                { id: 'premium', name: 'Premium' },
                { id: 'luxury', name: 'Luxury' }
              ].map((category) => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={filters.category === category.id}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="text-body1 text-primary">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-h6 text-primary mb-4">Price Range</h4>
            <div className="space-y-2">
              {[
                { id: 'all', name: 'All Prices' },
                { id: '0-3000', name: 'Under ₹3,000' },
                { id: '3000-8000', name: '₹3,000 - ₹8,000' },
                { id: '8000-999999', name: 'Above ₹8,000' }
              ].map((range) => (
                <label key={range.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.id}
                    checked={filters.priceRange === range.id}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="text-body1 text-primary">{range.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-h6 text-primary mb-4">Amenities</h4>
            <div className="space-y-2">
              {popularAmenities.map((amenity) => (
                <label key={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity.id)}
                    onChange={() => toggleAmenity(amenity.id)}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <amenity.icon className="h-4 w-4 text-gray-500" />
                  <span className="text-body1 text-primary">{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-h4 text-primary">Available Hotels ({filteredHotels.length})</h3>
          <select className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50">
            <option>Sort by: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="card-elevated overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-error-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                  {hotel.discount}% OFF
                </div>
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-h5 text-primary font-bold mb-1">{hotel.name}</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-body2 text-secondary">{hotel.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(hotel.rating) ? 'text-warning-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-body2 text-primary font-semibold">{hotel.rating}</span>
                      <span className="text-body2 text-gray-500">({hotel.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 4).map((amenityId) => {
                    const AmenityIcon = getAmenityIcon(amenityId);
                    const amenity = popularAmenities.find(a => a.id === amenityId);
                    return (
                      <div key={amenityId} className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1">
                        <AmenityIcon className="h-3 w-3 text-gray-600" />
                        <span className="text-caption text-gray-600">{amenity?.name}</span>
                      </div>
                    );
                  })}
                  {hotel.amenities.length > 4 && (
                    <div className="bg-gray-100 rounded-full px-3 py-1">
                      <span className="text-caption text-gray-600">+{hotel.amenities.length - 4} more</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-h4 text-success-600 font-bold">₹{hotel.price.toLocaleString()}</span>
                      <span className="text-body2 text-gray-500 line-through">₹{hotel.originalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-body2 text-secondary">per night</p>
                  </div>
                  <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                    <span>Book Now</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary text-center mb-8">Why Book Hotels With Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Best Price Guarantee', desc: 'Find it cheaper? We\'ll match the price', color: 'success' },
            { icon: CheckCircle, title: 'Free Cancellation', desc: 'Cancel up to 24 hours before check-in', color: 'primary' },
            { icon: Star, title: 'Verified Reviews', desc: 'Real reviews from verified guests', color: 'warning' },
            { icon: User, title: '24/7 Support', desc: 'Round-the-clock customer assistance', color: 'secondary' }
          ].map((benefit, index) => (
            <div key={index} className="text-center">
              <div className={`bg-${benefit.color}-100 rounded-2xl p-4 w-fit mx-auto mb-4`}>
                <benefit.icon className={`h-8 w-8 text-${benefit.color}-600`} />
              </div>
              <h4 className="text-h6 text-primary mb-2">{benefit.title}</h4>
              <p className="text-body2 text-secondary">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;