import React, { useState } from 'react';
import { 
  Plane, Users, Hotel, Car, ArrowRight, Sparkles, 
  TrendingUp, Clock, MapPin, Calendar, DollarSign,
  Star, Shield, Zap, Award
} from 'lucide-react';

export type BookingService = 'flights' | 'groups' | 'hotels' | 'cabs';

interface BookingHubProps {
  onServiceSelect: (service: BookingService) => void;
}

const BookingHub: React.FC<BookingHubProps> = ({ onServiceSelect }) => {
  const [selectedService, setSelectedService] = useState<BookingService>('flights');

  const services = [
    {
      id: 'flights' as BookingService,
      title: 'Flight Booking',
      description: 'Book domestic and international flights with AI-powered recommendations',
      icon: Plane,
      color: 'primary',
      features: ['AI Price Predictions', 'Smart Timing', 'Multi-city Options', 'Instant Booking'],
      popular: true,
      discount: 'Up to ₹5,000 off'
    },
    {
      id: 'groups' as BookingService,
      title: 'Group Booking',
      description: 'Special rates and services for group travel (10-100+ people)',
      icon: Users,
      color: 'secondary',
      features: ['Dedicated Coordinator', 'Bulk Discounts', 'Flexible Payment', 'Group Rates'],
      popular: false,
      discount: 'Save up to 30%'
    },
    {
      id: 'hotels' as BookingService,
      title: 'Hotel Booking',
      description: 'Find and book accommodations from budget to luxury',
      icon: Hotel,
      color: 'success',
      features: ['Live Availability', 'Best Price Guarantee', 'Instant Confirmation', 'Free Cancellation'],
      popular: true,
      discount: 'Up to 40% off'
    },
    {
      id: 'cabs' as BookingService,
      title: 'Cab Booking',
      description: 'Airport transfers and local transportation services',
      icon: Car,
      color: 'warning',
      features: ['Multiple Vehicle Types', 'Hourly Rental', 'Professional Drivers', 'Live Tracking'],
      popular: false,
      discount: 'Flat ₹200 off'
    }
  ];

  const quickBookingStats = [
    { label: 'Bookings Today', value: '12,847', icon: TrendingUp, color: 'primary' },
    { label: 'Active Deals', value: '156', icon: Sparkles, color: 'secondary' },
    { label: 'Cities Served', value: '500+', icon: MapPin, color: 'success' },
    { label: 'Avg. Savings', value: '₹4,250', icon: DollarSign, color: 'warning' }
  ];

  const featuredDeals = [
    {
      title: 'Mumbai to Dubai',
      subtitle: 'Round trip from ₹18,999',
      image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Limited Time'
    },
    {
      title: 'Delhi to London',
      subtitle: 'Starting ₹45,999',
      image: 'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Popular'
    },
    {
      title: 'Bangalore to Singapore',
      subtitle: 'From ₹22,999',
      image: 'https://images.pexels.com/photos/1785493/pexels-photo-1785493.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Best Value'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-h2 text-primary mb-6">Complete Travel Solutions</h1>
        <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto">
          Book flights, hotels, cabs, and group travel all in one place with AI-powered recommendations and best price guarantees
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {quickBookingStats.map((stat, index) => (
          <div key={index} className="card-elevated p-6 text-center">
            <div className={`bg-${stat.color}-100 rounded-2xl p-4 w-fit mx-auto mb-4`}>
              <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
            </div>
            <h3 className="text-h4 text-primary font-bold mb-2">{stat.value}</h3>
            <p className="text-body2 text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Service Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className={`card-elevated p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedService === service.id ? 'ring-4 ring-primary-200 shadow-elevation-3' : ''
            }`}
            onClick={() => setSelectedService(service.id)}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`bg-${service.color}-100 rounded-2xl p-4`}>
                  <service.icon className={`h-10 w-10 text-${service.color}-600`} />
                </div>
                <div>
                  <h3 className="text-h4 text-primary font-bold">{service.title}</h3>
                  <p className="text-body1 text-secondary mt-2">{service.description}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                {service.popular && (
                  <span className="bg-error-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                    Popular
                  </span>
                )}
                <span className={`bg-${service.color}-500 text-white px-3 py-1 rounded-full text-body2 font-bold`}>
                  {service.discount}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 bg-${service.color}-500 rounded-full`}></div>
                  <span className="text-body2 text-secondary">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onServiceSelect(service.id);
              }}
              className={`w-full btn-contained bg-${service.color}-500 hover:bg-${service.color}-600 text-white shadow-elevation-2 hover:shadow-elevation-3`}
            >
              <span>Book {service.title.split(' ')[0]} Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Featured Deals */}
      <div className="card-elevated p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-h3 text-primary mb-2">Featured Travel Deals</h2>
            <p className="text-body1 text-secondary">Limited time offers you don't want to miss</p>
          </div>
          <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50">
            View All Deals
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDeals.map((deal, index) => (
            <div key={index} className="card overflow-hidden hover:shadow-elevation-2 transition-all duration-300">
              <div className="relative h-48">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                  {deal.badge}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-h5 font-bold mb-1">{deal.title}</h4>
                  <p className="text-body1">{deal.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Booking Assistant */}
      <div className="card-elevated p-10 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-3">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-h3 text-primary">AI Booking Assistant</h3>
            </div>
            <p className="text-h4 font-normal text-secondary mb-8">
              Let our AI help you find the best deals, optimal timing, and perfect travel combinations for your trip.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-success-500" />
                <span className="text-body1 text-primary">Smart price prediction & alerts</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-warning-500" />
                <span className="text-body1 text-primary">Optimal booking timing recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-error-500" />
                <span className="text-body1 text-primary">Instant rebooking for better deals</span>
              </div>
            </div>
          </div>
          <div className="card bg-white p-8 shadow-elevation-2">
            <h4 className="text-h5 text-primary mb-6">Try AI Recommendations</h4>
            <div className="space-y-4">
              <div className="floating-label">
                <input
                  type="text"
                  className="input-box"
                  placeholder=" "
                  id="ai-destination"
                />
                <label htmlFor="ai-destination">Where do you want to go?</label>
              </div>
              <div className="floating-label">
                <input
                  type="text"
                  className="input-box"
                  placeholder=" "
                  id="ai-dates"
                />
                <label htmlFor="ai-dates">When are you planning to travel?</label>
              </div>
              <button className="w-full btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                <Sparkles className="h-5 w-5" />
                <span>Get AI Recommendations</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
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
    </div>
  );
};

export default BookingHub;