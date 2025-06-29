import React, { useState } from 'react';
import { 
  Briefcase, MapPin, Calendar, Users, Search, ArrowRight, 
  Star, Heart, Globe, Clock, DollarSign, Check, CreditCard,
  Plane, Hotel, Car, Utensils, Camera, Umbrella, Sun, 
  Shield, Award, CheckCircle, Landmark, Eye
} from 'lucide-react';

const PackagesBooking: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    departureDate: '',
    returnDate: '',
    travelers: '2 Adults',
    packageType: 'all',
    budget: 'all'
  });

  const featuredPackages = [
    {
      id: '1',
      title: 'Bali Paradise Escape',
      location: 'Bali, Indonesia',
      duration: '6 Days / 5 Nights',
      price: 45999,
      originalPrice: 59999,
      rating: 4.8,
      reviews: 324,
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
      includes: ['Return Flights', '5-Star Resort Stay', 'Breakfast & Dinner', 'Airport Transfers', 'Sightseeing Tours'],
      highlights: ['Ubud Cultural Tour', 'Beachfront Resort', 'Balinese Spa Treatment', 'Sunset Dinner Cruise'],
      tags: ['Beach', 'Romantic', 'Luxury'],
      discount: '23% OFF',
      featured: true
    },
    {
      id: '2',
      title: 'Dubai Extravaganza',
      location: 'Dubai, UAE',
      duration: '5 Days / 4 Nights',
      price: 65999,
      originalPrice: 79999,
      rating: 4.7,
      reviews: 256,
      image: 'https://images.pexels.com/photos/1167021/pexels-photo-1167021.jpeg?auto=compress&cs=tinysrgb&w=800',
      includes: ['Return Flights', 'Luxury Hotel Stay', 'Breakfast', 'Desert Safari', 'Burj Khalifa Tickets'],
      highlights: ['Desert Safari', 'Burj Khalifa Visit', 'Dubai Mall Shopping', 'Dhow Cruise Dinner'],
      tags: ['City', 'Luxury', 'Adventure'],
      discount: '17% OFF',
      featured: true
    },
    {
      id: '3',
      title: 'Thailand Adventure',
      location: 'Bangkok & Phuket, Thailand',
      duration: '7 Days / 6 Nights',
      price: 38999,
      originalPrice: 49999,
      rating: 4.6,
      reviews: 178,
      image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
      includes: ['Return Flights', '4-Star Hotel Stays', 'Breakfast', 'Airport Transfers', 'Island Tour'],
      highlights: ['Phi Phi Islands', 'Bangkok City Tour', 'Thai Cooking Class', 'Elephant Sanctuary'],
      tags: ['Beach', 'Adventure', 'Nature'],
      discount: '22% OFF',
      featured: true
    },
    {
      id: '4',
      title: 'Golden Triangle India',
      location: 'Delhi, Agra & Jaipur, India',
      duration: '6 Days / 5 Nights',
      price: 22999,
      originalPrice: 28999,
      rating: 4.5,
      reviews: 210,
      image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800',
      includes: ['All Transfers', '4-Star Hotel Stays', 'Breakfast', 'Guided Tours', 'Monument Entries'],
      highlights: ['Taj Mahal', 'Amber Fort', 'Qutub Minar', 'City Palace'],
      tags: ['Heritage', 'Culture', 'Family'],
      discount: '20% OFF',
      featured: false
    },
    {
      id: '5',
      title: 'Singapore Family Fun',
      location: 'Singapore',
      duration: '5 Days / 4 Nights',
      price: 55999,
      originalPrice: 65999,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=800',
      includes: ['Return Flights', '4-Star Hotel Stay', 'Breakfast', 'Universal Studios', 'Marina Bay Sands'],
      highlights: ['Universal Studios', 'Gardens by the Bay', 'Sentosa Island', 'Night Safari'],
      tags: ['Family', 'Theme Parks', 'Shopping'],
      discount: '15% OFF',
      featured: false
    },
    {
      id: '6',
      title: 'European Dreams',
      location: 'Paris, Switzerland & Venice',
      duration: '10 Days / 9 Nights',
      price: 120000,
      originalPrice: 150000,
      rating: 4.7,
      reviews: 123,
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
      includes: ['Return Flights', 'Hotel Stays', 'Breakfast', 'Eurail Pass', 'Guided Tours'],
      highlights: ['Eiffel Tower', 'Swiss Alps', 'Venetian Gondola Ride', 'Paris Museum Pass'],
      tags: ['Romantic', 'Luxury', 'Multi-Country'],
      discount: '20% OFF',
      featured: false
    }
  ];

  const packageCategories = [
    { id: 'all', name: 'All Packages' },
    { id: 'beach', name: 'Beach Getaways' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'city', name: 'City Breaks' },
    { id: 'family', name: 'Family Friendly' },
    { id: 'honeymoon', name: 'Honeymoon' },
    { id: 'luxury', name: 'Luxury Escapes' }
  ];

  const budgetRanges = [
    { id: 'all', name: 'All Budgets' },
    { id: 'budget', name: 'Budget (Under ₹30,000)' },
    { id: 'standard', name: 'Standard (₹30,000-₹60,000)' },
    { id: 'premium', name: 'Premium (₹60,000-₹100,000)' },
    { id: 'luxury', name: 'Luxury (₹100,000+)' }
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-h2 text-primary mb-6">Holiday Packages</h1>
        <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto">
          Complete travel packages with flights & hotels
        </p>
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
                value={searchParams.destination}
                onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
              />
              <label htmlFor="destination">Destination</label>
              <div className="absolute right-4 top-3">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <input
                type="date"
                className="input-box"
                id="departure-date"
                min={getTodayDate()}
                value={searchParams.departureDate}
                onChange={(e) => setSearchParams({...searchParams, departureDate: e.target.value})}
              />
              <label htmlFor="departure-date">Departure Date</label>
              <div className="absolute right-4 top-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <input
                type="date"
                className="input-box"
                id="return-date"
                min={searchParams.departureDate || getTomorrowDate()}
                value={searchParams.returnDate}
                onChange={(e) => setSearchParams({...searchParams, returnDate: e.target.value})}
              />
              <label htmlFor="return-date">Return Date</label>
              <div className="absolute right-4 top-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="floating-label">
              <select
                className="input-box"
                id="travelers"
                value={searchParams.travelers}
                onChange={(e) => setSearchParams({...searchParams, travelers: e.target.value})}
              >
                <option value="1 Adult">1 Adult</option>
                <option value="2 Adults">2 Adults</option>
                <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
                <option value="3 Adults">3 Adults</option>
                <option value="4 Adults">4 Adults</option>
                <option value="Group (5+ people)">Group (5+ people)</option>
              </select>
              <label htmlFor="travelers">Travelers</label>
              <div className="absolute right-4 top-3">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <select
                className="input-box"
                id="package-type"
                value={searchParams.packageType}
                onChange={(e) => setSearchParams({...searchParams, packageType: e.target.value})}
              >
                {packageCategories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <label htmlFor="package-type">Package Type</label>
            </div>
            
            <div className="floating-label">
              <select
                className="input-box"
                id="budget"
                value={searchParams.budget}
                onChange={(e) => setSearchParams({...searchParams, budget: e.target.value})}
              >
                {budgetRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
              <label htmlFor="budget">Budget Range</label>
              <div className="absolute right-4 top-3">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <button className="w-full btn-contained bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 text-h6 shadow-elevation-2 hover:shadow-elevation-3">
            <Search className="h-6 w-6" />
            <span>Find Perfect Packages</span>
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Featured Packages */}
      <div>
        <h3 className="text-h3 text-primary mb-8 text-center">Featured Holiday Packages</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {featuredPackages.filter(pkg => pkg.featured).map((pkg) => (
            <div
              key={pkg.id}
              className="card-elevated overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-error-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                  {pkg.discount}
                </div>
                
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-body1 font-medium">{pkg.location}</span>
                  </div>
                  <h3 className="text-h5 font-bold">{pkg.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-body2 text-secondary">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(pkg.rating) ? 'text-warning-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-body2 text-primary font-semibold">{pkg.rating}</span>
                    <span className="text-body2 text-gray-500">({pkg.reviews})</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mb-6">
                  <h4 className="text-h6 text-primary mb-3">Package Includes:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pkg.includes.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-success-500" />
                        <span className="text-body2 text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-body2 text-secondary line-through">₹{pkg.originalPrice.toLocaleString()}</p>
                    <p className="text-h5 text-success-600 font-bold">₹{pkg.price.toLocaleString()}</p>
                    <p className="text-body2 text-secondary">per person</p>
                  </div>
                  <div>
                    <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-body2 font-medium">
                      Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex-1 btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                    <span>View Details</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <button className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 p-3">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Packages */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-h3 text-primary">All Holiday Packages</h3>
          <select className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50">
            <option>Sort: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Duration: Shortest First</option>
            <option>Most Popular</option>
          </select>
        </div>

        <div className="space-y-8">
          {featuredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="card-elevated hover:shadow-elevation-3 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                <div className="relative">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-error-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                    {pkg.discount}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-body1 font-medium">{pkg.location}</span>
                    </div>
                    <div className="flex space-x-2">
                      {pkg.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-white/30 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 lg:col-span-2">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                    <div>
                      <h3 className="text-h4 text-primary font-bold mb-2">{pkg.title}</h3>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-body2 text-secondary">{pkg.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(pkg.rating) ? 'text-warning-500 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-body2 text-primary font-semibold">{pkg.rating}</span>
                          <span className="text-body2 text-gray-500">({pkg.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-body2 text-secondary line-through">₹{pkg.originalPrice.toLocaleString()}</p>
                      <p className="text-h4 text-success-600 font-bold">₹{pkg.price.toLocaleString()}</p>
                      <p className="text-body2 text-secondary">per person</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-h6 text-primary mb-3">Package Includes:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                      {pkg.includes.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-success-500" />
                          <span className="text-body2 text-secondary">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="text-h6 text-primary mb-3">Highlights:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {pkg.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          <span className="text-body2 text-secondary">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                      <span>View Package Details</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <button className="btn-outlined border-success-500 text-success-500 hover:bg-success-50">
                      <CreditCard className="h-5 w-5" />
                      <span>Book Now with ₹5,000 Deposit</span>
                    </button>
                    <button className="btn-text text-primary-500 hover:bg-primary-50 sm:ml-auto">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Features */}
      <div className="card-elevated p-10 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
        <div className="text-center mb-12">
          <h2 className="text-h3 text-primary mb-6">Everything Included in Our Packages</h2>
          <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
            Hassle-free travel with all essentials covered, so you can focus on making memories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
            <div className="bg-primary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
              <Plane className="h-10 w-10 text-primary-600" />
            </div>
            <h4 className="text-h5 text-primary mb-3">Return Flights</h4>
            <p className="text-body2 text-secondary">Economy class tickets with checked baggage</p>
          </div>
          
          <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
            <div className="bg-success-100 rounded-2xl p-4 w-fit mx-auto mb-4">
              <Hotel className="h-10 w-10 text-success-600" />
            </div>
            <h4 className="text-h5 text-primary mb-3">Hotel Stays</h4>
            <p className="text-body2 text-secondary">Carefully selected accommodations with breakfast</p>
          </div>
          
          <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
            <div className="bg-warning-100 rounded-2xl p-4 w-fit mx-auto mb-4">
              <Car className="h-10 w-10 text-warning-600" />
            </div>
            <h4 className="text-h5 text-primary mb-3">Transfers</h4>
            <p className="text-body2 text-secondary">Comfortable airport and sightseeing transfers</p>
          </div>
          
          <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
            <div className="bg-error-100 rounded-2xl p-4 w-fit mx-auto mb-4">
              <Camera className="h-10 w-10 text-error-600" />
            </div>
            <h4 className="text-h5 text-primary mb-3">Sightseeing</h4>
            <p className="text-body2 text-secondary">Guided tours to major attractions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
            <div className="bg-secondary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
              <Utensils className="h-10 w-10 text-secondary-600" />
            </div>
            <h4 className="text-h5 text-primary mb-3">Meals</h4>
            <p className="text-body2 text-secondary">Daily breakfast and select meals included</p>
          </div>
          
          <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
            <div className="bg-primary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
              <Users className="h-10 w-10 text-primary-600" />
            </div>
            <h4 className="text-h5 text-primary mb-3">Local Guide</h4>
            <p className="text-body2 text-secondary">Expert local guides for authentic experiences</p>
          </div>
          
          <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
            <div className="bg-success-100 rounded-2xl p-4 w-fit mx-auto mb-4">
              <Shield className="h-10 w-10 text-success-600" />
            </div>
            <h4 className="text-h5 text-primary mb-3">Travel Insurance</h4>
            <p className="text-body2 text-secondary">Basic travel protection included</p>
          </div>
          
          <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
            <div className="bg-warning-100 rounded-2xl p-4 w-fit mx-auto mb-4">
              <Landmark className="h-10 w-10 text-warning-600" />
            </div>
            <h4 className="text-h5 text-primary mb-3">Entry Tickets</h4>
            <p className="text-body2 text-secondary">Entrance fees to attractions in the itinerary</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Shield, title: 'Secure Booking', desc: 'SSL encrypted payments', color: 'success' },
          { icon: Award, title: 'Best Price Guarantee', desc: 'Price match promise', color: 'primary' },
          { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock assistance', color: 'secondary' },
          { icon: Star, title: 'Trusted by Millions', desc: '50M+ happy customers', color: 'warning' }
        ].map((benefit, index) => (
          <div key={index} className="card p-6 text-center hover:shadow-elevation-1 transition-all duration-300">
            <div className={`bg-${benefit.color}-100 rounded-2xl p-4 w-fit mx-auto mb-4`}>
              <benefit.icon className={`h-8 w-8 text-${benefit.color}-600`} />
            </div>
            <h4 className="text-h6 text-primary mb-2">{benefit.title}</h4>
            <p className="text-body2 text-secondary">{benefit.desc}</p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary mb-8 text-center">Happy Travelers</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Rahul & Priya",
              package: "Bali Paradise Escape",
              comment: "Our honeymoon in Bali was absolutely perfect! Every detail was taken care of, from the beautiful beachfront resort to the romantic sunset dinner cruise.",
              image: "https://images.pexels.com/photos/3785338/pexels-photo-3785338.jpeg?auto=compress&cs=tinysrgb&w=100"
            },
            {
              name: "Sharma Family",
              package: "Singapore Family Fun",
              comment: "Best family vacation ever! The kids loved Universal Studios and the hotel was perfect. The itinerary balanced fun activities with enough free time.",
              image: "https://images.pexels.com/photos/4149078/pexels-photo-4149078.jpeg?auto=compress&cs=tinysrgb&w=100"
            },
            {
              name: "Akash Kumar",
              package: "Dubai Extravaganza",
              comment: "World-class luxury at an amazing price. The desert safari was the highlight of the trip. Excellent service and seamless arrangements throughout.",
              image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
            }
          ].map((testimonial, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-body1 font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-body2 text-secondary">{testimonial.package}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-warning-500 fill-current" />
                ))}
              </div>
              <p className="text-body2 text-secondary italic">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Package CTA */}
      <div className="card-elevated p-10 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-h3 font-bold mb-6">Can't Find What You're Looking For?</h3>
            <p className="text-h5 font-normal mb-8 text-white/90">
              Let us create a customized package tailored to your preferences, budget, and travel style
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Honeymoon', 'Family Vacation', 'Adventure', 'Wildlife', 'Beach Holiday', 'Cultural Tour'].map((tag, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-body2 font-medium">{tag}</span>
                </div>
              ))}
            </div>
            <button className="btn-contained bg-white text-primary-600 hover:bg-gray-100">
              <span>Request Custom Package</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h4 className="text-h5 font-bold mb-6">Our Custom Package Process</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h5 className="text-h6 mb-2">Share Your Requirements</h5>
                  <p className="text-body2 text-white/80">Tell us your destinations, dates, preferences, and budget</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h5 className="text-h6 mb-2">Receive Custom Proposal</h5>
                  <p className="text-body2 text-white/80">Our travel experts design your personalized itinerary</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h5 className="text-h6 mb-2">Refine & Confirm</h5>
                  <p className="text-body2 text-white/80">We adjust the details until it's perfect for you</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h5 className="text-h6 mb-2">Travel with Confidence</h5>
                  <p className="text-body2 text-white/80">Enjoy your personalized trip with our full support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesBooking;