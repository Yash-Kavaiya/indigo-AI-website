import React, { useState, useRef, useEffect } from 'react';
import { 
  Award, Star, Gift, CreditCard, Users, ArrowRight, 
  Plane, CheckCircle, TrendingUp, Clock, Globe, 
  Sparkles, Play, ChevronLeft, ChevronRight, 
  Phone, Mail, MessageCircle, Download
} from 'lucide-react';
import { LoyaltySection } from '../../pages/LoyaltyProgramPage';

interface LoyaltyHomepageProps {
  onNavigate: (section: LoyaltySection) => void;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  category: string;
  image: string;
  featured: boolean;
}

const LoyaltyHomepage: React.FC<LoyaltyHomepageProps> = ({ onNavigate }) => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const offers: Offer[] = [
    {
      id: '1',
      title: 'Double Points Weekend',
      description: 'Earn 2x BluChip points on all bookings',
      discount: '100% Bonus',
      validUntil: '2025-01-31',
      category: 'Limited Time',
      image: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: '2',
      title: 'Credit Card Launch',
      description: 'Join the new IndiGo BluChip Credit Card',
      discount: '₹5,000 Bonus',
      validUntil: '2025-02-28',
      category: 'New Launch',
      image: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: '3',
      title: 'Hotel Partner Deals',
      description: 'Save up to 40% on partner hotel bookings',
      discount: '40% Off',
      validUntil: '2025-03-15',
      category: 'Hotels',
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: '4',
      title: 'Festive Flying',
      description: 'Special rates for festival season travel',
      discount: '25% Off',
      validUntil: '2025-01-15',
      category: 'Seasonal',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    }
  ];

  const programHighlights = [
    {
      icon: Star,
      title: 'Tier Benefits',
      description: '4 membership tiers with exclusive privileges',
      value: '4 Tiers',
      color: 'primary'
    },
    {
      icon: Plane,
      title: 'Flight Benefits',
      description: 'Priority check-in, boarding, and seat selection',
      value: 'Premium',
      color: 'secondary'
    },
    {
      icon: Gift,
      title: 'Earning Rate',
      description: 'Earn 1 BluChip point for every ₹5 spent',
      value: '1:5 Ratio',
      color: 'success'
    },
    {
      icon: Globe,
      title: 'Global Partners',
      description: 'Earn and redeem with 500+ partners worldwide',
      value: '500+',
      color: 'warning'
    }
  ];

  const quickActions = [
    {
      title: 'Join BluChip',
      description: 'Register in 3 easy steps',
      icon: Award,
      action: () => onNavigate('registration'),
      color: 'primary'
    },
    {
      title: 'Check Benefits',
      description: 'Explore tier privileges',
      icon: Star,
      action: () => onNavigate('benefits'),
      color: 'secondary'
    },
    {
      title: 'Manage Points',
      description: 'Earn and redeem points',
      icon: Gift,
      action: () => onNavigate('points'),
      color: 'success'
    },
    {
      title: 'View Offers',
      description: 'Exclusive member deals',
      icon: TrendingUp,
      action: () => onNavigate('offers'),
      color: 'warning'
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentOfferIndex((prev) => 
          prev === offers.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, offers.length]);

  const nextOffer = () => {
    setCurrentOfferIndex((prev) => 
      prev === offers.length - 1 ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
  };

  const prevOffer = () => {
    setCurrentOfferIndex((prev) => 
      prev === 0 ? offers.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const currentOffer = offers[currentOfferIndex];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="card-elevated p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white">
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }}></div>
              </div>
              
              <div className="relative p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
                      <Award className="h-6 w-6" />
                      <span className="text-body1 font-semibold">IndiGo BluChip Program</span>
                    </div>
                    
                    <h1 className="text-h1 mb-6 leading-tight">
                      Fly More,
                      <br />
                      <span className="text-secondary-400">Earn More</span>
                    </h1>
                    
                    <p className="text-h4 font-normal text-primary-100 mb-8 leading-relaxed">
                      Join India's fastest-growing loyalty program and unlock exclusive benefits, 
                      priority services, and amazing rewards on every journey.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => onNavigate('registration')}
                        className="btn-contained bg-secondary-500 hover:bg-secondary-600 text-white shadow-elevation-2 hover:shadow-elevation-3 transform hover:scale-105 transition-all duration-300"
                      >
                        <Award className="h-5 w-5" />
                        <span>Join BluChip Free</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                      
                      <button className="btn-outlined border-white text-white hover:bg-white/10">
                        <Play className="h-5 w-5" />
                        <span>Watch Benefits Video</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="card bg-white/10 backdrop-blur-sm border border-white/20 p-8">
                      <div className="text-center mb-6">
                        <div className="bg-white/20 rounded-3xl p-6 w-fit mx-auto mb-6">
                          <Award className="h-16 w-16" />
                        </div>
                        <h3 className="text-h4 font-bold mb-2">Member Benefits</h3>
                        <p className="text-primary-200">What you get with BluChip</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <CheckCircle className="h-6 w-6 text-secondary-400" />
                          <span className="text-body1">Priority check-in & boarding</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <CheckCircle className="h-6 w-6 text-secondary-400" />
                          <span className="text-body1">Complimentary seat selection</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <CheckCircle className="h-6 w-6 text-secondary-400" />
                          <span className="text-body1">Extra baggage allowance</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <CheckCircle className="h-6 w-6 text-secondary-400" />
                          <span className="text-body1">Exclusive offers & discounts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Offers Carousel */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-h2 text-primary mb-6">Latest Offers & Promotions</h2>
          <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
            Don't miss out on these exclusive deals available only to BluChip members
          </p>
        </div>

        <div className="relative">
          <div className="card-elevated overflow-hidden" ref={carouselRef}>
            <div className="relative h-96 lg:h-80">
              <img
                src={currentOffer.image}
                alt={currentOffer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
              
              {/* Offer Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full max-w-2xl p-8 lg:p-12">
                  <div className="inline-flex items-center space-x-2 bg-secondary-500 text-white px-4 py-2 rounded-full mb-6">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-body2 font-semibold">{currentOffer.category}</span>
                  </div>
                  
                  <h3 className="text-h3 text-white mb-4">{currentOffer.title}</h3>
                  <p className="text-h4 font-normal text-gray-200 mb-6">{currentOffer.description}</p>
                  
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
                      <span className="text-h5 font-bold text-white">{currentOffer.discount}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="h-5 w-5" />
                      <span className="text-body1">Valid until {currentOffer.validUntil}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onNavigate('offers')}
                    className="btn-contained bg-secondary-500 hover:bg-secondary-600 text-white shadow-elevation-2"
                  >
                    <span>View All Offers</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={prevOffer}
                className="btn-contained bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-3"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={nextOffer}
                className="btn-contained bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-3"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-3">
                {offers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentOfferIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentOfferIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights Infographic */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-h2 text-primary mb-6">Program Highlights</h2>
          <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
            Discover what makes IndiGo BluChip the most rewarding loyalty program in India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programHighlights.map((highlight, index) => (
            <div
              key={index}
              className="card-elevated p-8 text-center hover:scale-105 transition-all duration-300 group"
            >
              <div className={`bg-${highlight.color}-100 rounded-3xl p-6 w-fit mx-auto mb-6 group-hover:bg-${highlight.color}-200 transition-colors duration-300`}>
                <highlight.icon className={`h-12 w-12 text-${highlight.color}-600`} />
              </div>
              
              <div className={`bg-${highlight.color}-500 text-white rounded-2xl px-4 py-2 inline-block mb-4`}>
                <span className="text-h6 font-bold">{highlight.value}</span>
              </div>
              
              <h3 className="text-h5 text-primary mb-3">{highlight.title}</h3>
              <p className="text-body1 text-secondary">{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-h2 text-primary mb-6">Quick Actions</h2>
          <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
            Get started with BluChip in just a few clicks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="card-elevated p-8 text-left hover:scale-105 transition-all duration-300 group focus-ring"
            >
              <div className={`bg-${action.color}-100 rounded-2xl p-4 w-fit mb-6 group-hover:bg-${action.color}-200 transition-colors duration-300`}>
                <action.icon className={`h-8 w-8 text-${action.color}-600`} />
              </div>
              
              <h3 className="text-h5 text-primary mb-3 group-hover:text-primary-600">{action.title}</h3>
              <p className="text-body1 text-secondary mb-6">{action.description}</p>
              
              <div className="flex items-center text-primary-500 group-hover:text-primary-600">
                <span className="text-body2 font-semibold mr-2">Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section className="card-elevated p-10 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
        <div className="text-center mb-12">
          <h2 className="text-h2 text-primary mb-6">Need Help Getting Started?</h2>
          <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
            Our support team is here to help you every step of the way
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 text-center hover:shadow-elevation-2 transition-all duration-300">
            <div className="bg-primary-100 rounded-3xl p-6 w-fit mx-auto mb-6">
              <Phone className="h-10 w-10 text-primary-600" />
            </div>
            <h3 className="text-h5 text-primary mb-3">Call Support</h3>
            <p className="text-body1 text-secondary mb-4">Speak with our BluChip experts</p>
            <p className="text-h6 text-primary font-semibold">1800-123-4567</p>
          </div>
          
          <div className="card p-8 text-center hover:shadow-elevation-2 transition-all duration-300">
            <div className="bg-secondary-100 rounded-3xl p-6 w-fit mx-auto mb-6">
              <MessageCircle className="h-10 w-10 text-secondary-600" />
            </div>
            <h3 className="text-h5 text-primary mb-3">Live Chat</h3>
            <p className="text-body1 text-secondary mb-4">Get instant help online</p>
            <button className="btn-contained bg-secondary-500 hover:bg-secondary-600 text-white">
              Start Chat
            </button>
          </div>
          
          <div className="card p-8 text-center hover:shadow-elevation-2 transition-all duration-300">
            <div className="bg-success-100 rounded-3xl p-6 w-fit mx-auto mb-6">
              <Download className="h-10 w-10 text-success-600" />
            </div>
            <h3 className="text-h5 text-primary mb-3">Mobile App</h3>
            <p className="text-body1 text-secondary mb-4">Manage your account on the go</p>
            <button className="btn-contained bg-success-500 hover:bg-success-600 text-white">
              Download App
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoyaltyHomepage;