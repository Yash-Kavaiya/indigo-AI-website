import React, { useState } from 'react';
import { Import as Passport, MapPin, Calendar, ArrowRight, User, Star, Shield, CheckCircle, Phone, Mail, Globe, Users, FileText, Calendar as CalendarIcon, Flag, Briefcase, CreditCard, Clock, AlertCircle, Plane } from 'lucide-react';

const VisaBooking: React.FC = () => {
  const [visaType, setVisaType] = useState<'tourist' | 'business' | 'student' | 'work'>('tourist');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    destination: '',
    entryDate: '',
    exitDate: '',
    passportNumber: '',
    passportExpiry: '',
    email: '',
    phone: '',
    processingType: 'standard'
  });

  const popularDestinations = [
    { 
      country: 'United States', 
      processingTime: '3-4 weeks', 
      fee: '₹14,500', 
      successRate: '85%',
      flag: '🇺🇸',
      requirements: ['Valid Passport', 'Financial Documents', 'Travel Itinerary', 'Interview']
    },
    { 
      country: 'United Kingdom', 
      processingTime: '3 weeks', 
      fee: '₹10,800', 
      successRate: '88%',
      flag: '🇬🇧',
      requirements: ['Valid Passport', 'Bank Statements', 'Accommodation Proof', 'Travel Insurance']
    },
    { 
      country: 'Schengen Countries', 
      processingTime: '2-3 weeks', 
      fee: '₹8,500', 
      successRate: '90%',
      flag: '🇪🇺',
      requirements: ['Passport', 'Photos', 'Insurance', 'Flight Reservation', 'Hotel Booking']
    },
    { 
      country: 'UAE', 
      processingTime: '3-5 days', 
      fee: '₹6,500', 
      successRate: '95%',
      flag: '🇦🇪',
      requirements: ['Passport Copy', 'Photos', 'Return Ticket', 'Hotel Booking']
    },
    { 
      country: 'Singapore', 
      processingTime: '3-5 days', 
      fee: '₹4,200', 
      successRate: '96%',
      flag: '🇸🇬',
      requirements: ['Valid Passport', 'Return Ticket', 'Hotel Booking', 'Financial Proof']
    },
    { 
      country: 'Thailand', 
      processingTime: '2-3 days', 
      fee: '₹2,500', 
      successRate: '98%',
      flag: '🇹🇭',
      requirements: ['Passport Copy', 'Photos', 'Ticket Confirmation', 'Hotel Booking']
    }
  ];

  const visaServices = [
    {
      title: 'Standard Processing',
      description: 'Regular processing timeline with standard support',
      price: '₹2,500',
      processingTime: 'As per embassy timelines',
      features: ['Document checklist', 'Basic application review', 'Email support'],
      recommended: false
    },
    {
      title: 'Express Processing',
      description: 'Expedited visa processing with priority handling',
      price: '₹5,000',
      processingTime: 'Fast-track processing where available',
      features: ['Document checklist', 'Thorough application review', 'Priority submission', 'Email & phone support'],
      recommended: true
    },
    {
      title: 'Premium Assistance',
      description: 'End-to-end visa support with dedicated specialist',
      price: '₹8,500',
      processingTime: 'Fastest available processing',
      features: ['Document preparation assistance', 'Expert application review', 'Priority submission', '24/7 dedicated support', 'Follow-up with embassy'],
      recommended: false
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-h2 text-primary mb-6">Visa Services</h1>
        <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto">
          Hassle-free visa processing with expert guidance and high success rates for your international travel
        </p>
      </div>

      {/* Visa Type Selection */}
      <div className="card-elevated p-8">
        <div className="flex justify-center mb-8">
          <div className="card p-2 bg-surface-tertiary border-2 border-gray-200">
            <div className="flex rounded-xl overflow-hidden">
              {[
                { id: 'tourist' as const, label: 'Tourist Visa' },
                { id: 'business' as const, label: 'Business Visa' },
                { id: 'student' as const, label: 'Student Visa' },
                { id: 'work' as const, label: 'Work Visa' }
              ].map((type) => (
                <button
                  key={type.id}
                  className={`px-6 py-3 font-semibold transition-all duration-300 ${
                    visaType === type.id
                      ? 'bg-white shadow-elevation-1 text-primary-500 rounded-xl'
                      : 'text-secondary hover:text-primary-500'
                  }`}
                  onClick={() => setVisaType(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visa Request Form */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="floating-label">
              <select
                className="input-box"
                id="destination-country"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
              >
                <option value="">Select Destination Country</option>
                {popularDestinations.map((dest, index) => (
                  <option key={index} value={dest.country}>
                    {dest.flag} {dest.country}
                  </option>
                ))}
                <option value="other">Other Country</option>
              </select>
              <label htmlFor="destination-country">Destination Country*</label>
              <div className="absolute right-4 top-3">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <select
                className="input-box"
                id="nationality"
                value={formData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
              >
                <option value="">Select Your Nationality</option>
                <option value="india">India</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="nationality">Nationality*</label>
              <div className="absolute right-4 top-3">
                <Flag className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="floating-label">
              <input
                type="date"
                className="input-box"
                id="entry-date"
                min={getTodayDate()}
                value={formData.entryDate}
                onChange={(e) => handleInputChange('entryDate', e.target.value)}
              />
              <label htmlFor="entry-date">Planned Entry Date*</label>
              <div className="absolute right-4 top-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <input
                type="date"
                className="input-box"
                id="exit-date"
                min={formData.entryDate || getTodayDate()}
                value={formData.exitDate}
                onChange={(e) => handleInputChange('exitDate', e.target.value)}
              />
              <label htmlFor="exit-date">Planned Exit Date*</label>
              <div className="absolute right-4 top-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="floating-label">
              <input
                type="text"
                className="input-box"
                id="passport-number"
                placeholder=" "
                value={formData.passportNumber}
                onChange={(e) => handleInputChange('passportNumber', e.target.value)}
              />
              <label htmlFor="passport-number">Passport Number*</label>
              <div className="absolute right-4 top-3">
                <Passport className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <input
                type="date"
                className="input-box"
                id="passport-expiry"
                min={getTodayDate()}
                value={formData.passportExpiry}
                onChange={(e) => handleInputChange('passportExpiry', e.target.value)}
              />
              <label htmlFor="passport-expiry">Passport Expiry Date*</label>
              <div className="absolute right-4 top-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="floating-label">
              <input
                type="email"
                className="input-box"
                id="email-address"
                placeholder=" "
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <label htmlFor="email-address">Email Address*</label>
              <div className="absolute right-4 top-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <input
                type="tel"
                className="input-box"
                id="phone-number"
                placeholder=" "
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              <label htmlFor="phone-number">Phone Number*</label>
              <div className="absolute right-4 top-3">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Packages */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary mb-8 text-center">Choose Your Service Package</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visaServices.map((service, index) => (
            <div
              key={index}
              className={`card border-2 overflow-hidden hover:scale-105 transition-all duration-300 ${
                service.recommended ? 'border-primary-500' : 'border-gray-200'
              }`}
            >
              {service.recommended && (
                <div className="bg-primary-500 text-white text-center py-2 text-body2 font-bold">
                  Recommended
                </div>
              )}
              
              <div className="p-6">
                <h4 className="text-h5 text-primary font-bold mb-2">{service.title}</h4>
                <p className="text-body2 text-secondary mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <p className="text-h4 text-primary-600 font-bold">{service.price}</p>
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-body2 font-medium">
                    {service.processingTime}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success-500" />
                      <span className="text-body2 text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  className={`w-full btn-contained ${
                    service.recommended 
                      ? 'bg-primary-500 hover:bg-primary-600' 
                      : 'bg-gray-500 hover:bg-gray-600'
                  } text-white`}
                >
                  <span>Select {service.title}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary mb-8 text-center">Popular Visa Destinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((dest, index) => (
            <div key={index} className="card p-6 hover:shadow-elevation-2 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-5xl">{dest.flag}</div>
                <div>
                  <h4 className="text-h5 text-primary font-bold">{dest.country}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="bg-success-100 text-success-700 px-2 py-1 rounded-full text-xs font-medium">
                      {dest.successRate} Success Rate
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-body2 text-secondary">Processing Time</p>
                  <p className="text-body1 font-semibold text-primary flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{dest.processingTime}</span>
                  </p>
                </div>
                <div>
                  <p className="text-body2 text-secondary">Visa Fee</p>
                  <p className="text-body1 font-semibold text-primary flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span>{dest.fee}</span>
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-body2 text-secondary mb-2">Key Requirements:</p>
                <div className="grid grid-cols-2 gap-2">
                  {dest.requirements.map((req, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-body2 text-secondary">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => {
                  handleInputChange('destination', dest.country);
                }}
                className="w-full btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50"
              >
                <Passport className="h-5 w-5" />
                <span>Apply for Visa</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Process Steps */}
      <div className="card-elevated p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
        <h3 className="text-h3 text-primary mb-12 text-center">How It Works</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-primary-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-h4 font-bold mx-auto mb-6">1</div>
            <div className="bg-white rounded-2xl p-6 shadow-elevation-1">
              <FileText className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h4 className="text-h5 text-primary mb-3">Submit Application</h4>
              <p className="text-body2 text-secondary">Complete your visa application with our easy online form</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-h4 font-bold mx-auto mb-6">2</div>
            <div className="bg-white rounded-2xl p-6 shadow-elevation-1">
              <FileText className="h-12 w-12 text-secondary-500 mx-auto mb-4" />
              <h4 className="text-h5 text-primary mb-3">Document Review</h4>
              <p className="text-body2 text-secondary">Our experts review your documents to ensure completeness</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-h4 font-bold mx-auto mb-6">3</div>
            <div className="bg-white rounded-2xl p-6 shadow-elevation-1">
              <Briefcase className="h-12 w-12 text-warning-500 mx-auto mb-4" />
              <h4 className="text-h5 text-primary mb-3">Embassy Submission</h4>
              <p className="text-body2 text-secondary">We handle your application submission to the embassy</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-h4 font-bold mx-auto mb-6">4</div>
            <div className="bg-white rounded-2xl p-6 shadow-elevation-1">
              <Passport className="h-12 w-12 text-success-500 mx-auto mb-4" />
              <h4 className="text-h5 text-primary mb-3">Visa Collection</h4>
              <p className="text-body2 text-secondary">Receive your visa and get ready for your journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary mb-8 text-center">Customer Success Stories</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Rahul Sharma",
              destination: "United States",
              comment: "Incredible service! Got my US visa with minimal hassle. The document checklist and application review were incredibly helpful.",
              image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
            },
            {
              name: "Priya Patel",
              destination: "Schengen Countries",
              comment: "The premium assistance was worth every penny. My application was complex but their experts guided me through every step.",
              image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100"
            },
            {
              name: "Vijay Singh",
              destination: "Australia",
              comment: "Second time using their visa services and always impressed. Fast, efficient, and excellent communication throughout.",
              image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100"
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
                  <p className="text-body2 text-secondary">Visa for {testimonial.destination}</p>
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

      {/* CTA */}
      <div className="text-center">
        <button className="btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-8 shadow-elevation-2 hover:shadow-elevation-3 text-h6">
          <Passport className="h-6 w-6" />
          <span>Start Your Visa Application Now</span>
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default VisaBooking;