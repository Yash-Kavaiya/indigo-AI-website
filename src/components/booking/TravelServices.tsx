import React, { useState } from 'react';
import { Plane, Users, Hotel, Car, ArrowRight, Sparkles, TrendingUp, Clock, MapPin, Calendar, DollarSign, Star, Shield, FileText, Globe, Award, HelpCircle, Import as Passport, Umbrella, Briefcase, Landmark, CreditCard } from 'lucide-react';

export type BookingService = 'flights' | 'groups' | 'hotels' | 'cabs' | 'visa' | 'insurance' | 'packages';

interface TravelServicesProps {
  onServiceSelect: (service: BookingService) => void;
}

const TravelServices: React.FC<TravelServicesProps> = ({ onServiceSelect }) => {
  const [selectedService, setSelectedService] = useState<BookingService | null>(null);

  const services = [
    {
      id: 'flights' as BookingService,
      title: 'Flight Booking',
      description: 'Domestic & International flights at best prices',
      icon: Plane,
      color: 'primary',
      features: ['AI Price Predictions', 'Smart Timing', 'Multi-city Options', 'Instant Booking'],
      popular: true,
      discount: 'Up to ₹5,000 off'
    },
    {
      id: 'hotels' as BookingService,
      title: 'Hotel Booking',
      description: 'Find the perfect stay from budget to luxury',
      icon: Hotel,
      color: 'success',
      features: ['Live Availability', 'Best Price Guarantee', 'Instant Confirmation', 'Free Cancellation'],
      popular: true,
      discount: 'Up to 40% off'
    },
    {
      id: 'cabs' as BookingService,
      title: 'Cab Booking',
      description: 'Airport transfers and city travel',
      icon: Car,
      color: 'warning',
      features: ['Multiple Vehicle Types', 'Hourly Rental', 'Professional Drivers', 'Live Tracking'],
      popular: false,
      discount: 'Flat ₹200 off'
    },
    {
      id: 'packages' as BookingService,
      title: 'Holiday Packages',
      description: 'Complete travel packages with flights & hotels',
      icon: Briefcase,
      color: 'secondary',
      features: ['Flights + Hotels', 'Guided Tours', 'Meals & Activities', 'Exclusive Deals'],
      popular: true,
      discount: 'Save up to 25%'
    },
    {
      id: 'groups' as BookingService,
      title: 'Group Booking',
      description: 'Special rates for 10+ travelers',
      icon: Users,
      color: 'secondary',
      features: ['Dedicated Coordinator', 'Bulk Discounts', 'Flexible Payment', 'Group Rates'],
      popular: false,
      discount: 'Save up to 30%'
    },
    {
      id: 'visa' as BookingService,
      title: 'Visa Services',
      description: 'Hassle-free visa assistance for international travel',
      icon: Passport,
      color: 'error',
      features: ['Document Guidance', 'Application Processing', 'Express Services', 'Visa Updates'],
      popular: false,
      discount: '20% off processing fee'
    },
    {
      id: 'insurance' as BookingService,
      title: 'Travel Insurance',
      description: 'Comprehensive coverage for worry-free travel',
      icon: Umbrella,
      color: 'primary',
      features: ['Medical Protection', 'Trip Cancellation', 'Lost Baggage', '24/7 Assistance'],
      popular: false,
      discount: 'Plans from ₹599'
    }
  ];

  const quickBookingStats = [
    { label: 'Bookings Today', value: '12,847', icon: TrendingUp, color: 'primary' },
    { label: 'Active Deals', value: '156', icon: Sparkles, color: 'secondary' },
    { label: 'Cities Served', value: '500+', icon: MapPin, color: 'success' },
    { label: 'Avg. Savings', value: '₹4,250', icon: DollarSign, color: 'warning' }
  ];

  const featuredDestinations = [
    {
      title: 'Bali Paradise',
      subtitle: 'Flight + Hotel from ₹45,999',
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Best Seller',
      discount: '30% OFF'
    },
    {
      title: 'Dubai Extravaganza',
      subtitle: 'All-inclusive from ₹65,999',
      image: 'https://images.pexels.com/photos/1167021/pexels-photo-1167021.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Luxury',
      discount: '25% OFF'
    },
    {
      title: 'Thailand Adventure',
      subtitle: 'Complete Package ₹38,999',
      image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Family Friendly',
      discount: '20% OFF'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-h2 text-primary mb-6">Complete Travel Solutions</h1>
        <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto">
          Book flights, hotels, packages, and more all in one place with AI-powered recommendations and best price guarantees
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
        {services.slice(0, 4).map((service) => (
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

      {/* Additional Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.slice(4).map((service) => (
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
                  <h3 className="text-h5 text-primary font-bold">{service.title}</h3>
                  <p className="text-body2 text-secondary mt-2">{service.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {service.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 bg-${service.color}-500 rounded-full`}></div>
                  <span className="text-body2 text-secondary">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className={`bg-${service.color}-500 text-white px-3 py-1 rounded-full text-body2 font-bold`}>
                {service.discount}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onServiceSelect(service.id);
                }}
                className={`btn-contained bg-${service.color}-500 hover:bg-${service.color}-600 text-white shadow-elevation-2 hover:shadow-elevation-3`}
              >
                <span>Book Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Packages */}
      <div className="card-elevated p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-h3 text-primary mb-2">Featured Holiday Packages</h2>
            <p className="text-body1 text-secondary">Limited time offers you don't want to miss</p>
          </div>
          <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50">
            View All Packages
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDestinations.map((deal, index) => (
            <div key={index} className="card overflow-hidden hover:shadow-elevation-2 transition-all duration-300 group">
              <div className="relative h-48">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                  {deal.badge}
                </div>
                <div className="absolute top-4 right-4 bg-error-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                  {deal.discount}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-h5 font-bold mb-1">{deal.title}</h4>
                  <p className="text-body1">{deal.subtitle}</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-warning-500 fill-current" />
                      ))}
                    </div>
                    <span className="text-body2 text-secondary">(150+ reviews)</span>
                  </div>
                  <button 
                    onClick={() => onServiceSelect('packages')}
                    className="btn-text text-primary-500 hover:text-primary-600 font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="card-elevated p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-3">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-h3 text-primary">Why Book With Us</h3>
            </div>
            <p className="text-h4 font-normal text-secondary mb-8">
              From hassle-free bookings to 24/7 support, we make travel planning simple and secure
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-success-500 mt-1" />
                <div>
                  <h4 className="text-h6 text-primary mb-1">Secure Booking</h4>
                  <p className="text-body1 text-secondary">SSL-encrypted transactions and secure payment gateways</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Award className="h-6 w-6 text-warning-500 mt-1" />
                <div>
                  <h4 className="text-h6 text-primary mb-1">Best Price Guarantee</h4>
                  <p className="text-body1 text-secondary">Find it cheaper elsewhere? We'll match the price</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Globe className="h-6 w-6 text-primary-500 mt-1" />
                <div>
                  <h4 className="text-h6 text-primary mb-1">Global Support</h4>
                  <p className="text-body1 text-secondary">24/7 customer service in multiple languages</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-white p-8 shadow-elevation-2">
            <h4 className="text-h5 text-primary mb-6">Exclusive Member Benefits</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-body1 text-primary font-medium">Earn BluChip points on every booking</p>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1">
                    <div className="bg-primary-500 h-1.5 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-secondary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-body1 text-primary font-medium">Special discounts with partner credit cards</p>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1">
                    <div className="bg-secondary-500 h-1.5 rounded-full w-3/5"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                  <Landmark className="h-4 w-4 text-success-600" />
                </div>
                <div className="flex-1">
                  <p className="text-body1 text-primary font-medium">Exclusive airport lounge access</p>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1">
                    <div className="bg-success-500 h-1.5 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button 
                  onClick={() => onServiceSelect('flights')}
                  className="w-full btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                >
                  <span>Join BluChip Program Free</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Grid */}
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

export default TravelServices;