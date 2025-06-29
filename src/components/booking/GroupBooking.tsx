import React, { useState } from 'react';
import { 
  Users, Calendar, MapPin, Phone, Mail, ArrowRight, 
  Star, CheckCircle, Shield, Award, Globe, Clock,
  CreditCard, FileText, Heart, Building, GraduationCap
} from 'lucide-react';

const GroupBooking: React.FC = () => {
  const [groupData, setGroupData] = useState({
    groupType: '',
    groupSize: '',
    from: '',
    to: '',
    departure: '',
    return: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    company: '',
    specialRequests: ''
  });

  const [step, setStep] = useState(1);

  const groupTypes = [
    {
      id: 'corporate',
      name: 'Corporate Travel',
      icon: Building,
      description: 'Business meetings, conferences, team outings',
      features: ['Flexible booking', 'Corporate rates', 'Invoice billing', 'Travel manager support'],
      discount: 'Up to 25% off',
      popular: true
    },
    {
      id: 'wedding',
      name: 'Wedding Groups',
      icon: Heart,
      description: 'Wedding parties, destination weddings',
      features: ['Group coordination', 'Special rates', 'Flexible payments', 'Dedicated coordinator'],
      discount: 'Up to 30% off',
      popular: true
    },
    {
      id: 'family',
      name: 'Family Reunions',
      icon: Users,
      description: 'Large family gatherings, reunions',
      features: ['Family-friendly rates', 'Flexible dates', 'Group discounts', 'Easy management'],
      discount: 'Up to 20% off',
      popular: false
    },
    {
      id: 'education',
      name: 'Educational Tours',
      icon: GraduationCap,
      description: 'School trips, university groups, study tours',
      features: ['Student discounts', 'Safety measures', 'Educational support', 'Group supervision'],
      discount: 'Up to 35% off',
      popular: false
    },
    {
      id: 'leisure',
      name: 'Leisure Groups',
      icon: Star,
      description: 'Friends trips, hobby groups, clubs',
      features: ['Flexible booking', 'Group activities', 'Special rates', 'Easy coordination'],
      discount: 'Up to 15% off',
      popular: false
    },
    {
      id: 'sports',
      name: 'Sports Teams',
      icon: Award,
      description: 'Sports teams, tournaments, events',
      features: ['Equipment handling', 'Team rates', 'Flexible schedules', 'Special assistance'],
      discount: 'Up to 25% off',
      popular: false
    }
  ];

  const groupSizes = [
    { value: '10-20', label: '10-20 passengers', discount: '10%' },
    { value: '21-50', label: '21-50 passengers', discount: '15%' },
    { value: '51-100', label: '51-100 passengers', discount: '20%' },
    { value: '100+', label: '100+ passengers', discount: '25%' }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Dedicated Coordinator',
      description: 'Personal group travel expert assigned to your booking'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment',
      description: 'Multiple payment options and installment plans available'
    },
    {
      icon: CheckCircle,
      title: 'Group Rates',
      description: 'Exclusive discounts for group bookings starting from 10 passengers'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for your group travel needs'
    }
  ];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const nextStep = () => {
    setStep(Math.min(step + 1, 3));
  };

  const prevStep = () => {
    setStep(Math.max(step - 1, 1));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-h2 text-primary mb-6">Group Travel Booking</h1>
        <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto">
          Special rates and personalized service for groups of 10 or more passengers. Get dedicated support and exclusive discounts.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                step >= stepNumber
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step > stepNumber ? <CheckCircle className="h-6 w-6" /> : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 rounded-full transition-all duration-300 ${
                  step > stepNumber ? 'bg-primary-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="card-elevated p-8">
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-h3 text-primary mb-4">Choose Your Group Type</h2>
              <p className="text-body1 text-secondary">Select the type that best describes your group to get tailored rates and services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setGroupData({...groupData, groupType: type.id})}
                  className={`card p-6 text-left transition-all duration-300 hover:scale-105 ${
                    groupData.groupType === type.id
                      ? 'ring-4 ring-primary-200 shadow-elevation-3'
                      : 'hover:shadow-elevation-2'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary-100 rounded-2xl p-3">
                      <type.icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="text-right">
                      {type.popular && (
                        <span className="bg-error-500 text-white px-2 py-1 rounded-full text-xs font-bold mb-2 block">
                          Popular
                        </span>
                      )}
                      <span className="bg-success-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {type.discount}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-h5 text-primary mb-2">{type.name}</h3>
                  <p className="text-body2 text-secondary mb-4">{type.description}</p>
                  
                  <div className="space-y-2">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-body2 text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center">
              <h3 className="text-h4 text-primary mb-6">Select Group Size</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {groupSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setGroupData({...groupData, groupSize: size.value})}
                    className={`card p-6 text-center transition-all duration-300 hover:scale-105 ${
                      groupData.groupSize === size.value
                        ? 'ring-4 ring-secondary-200 shadow-elevation-3 bg-secondary-50'
                        : 'hover:shadow-elevation-2'
                    }`}
                  >
                    <h4 className="text-h6 text-primary mb-2">{size.label}</h4>
                    <span className="bg-success-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                      Save {size.discount}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-h3 text-primary mb-4">Travel Details</h2>
              <p className="text-body1 text-secondary">Provide your travel preferences and dates</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="floating-label">
                <input
                  type="text"
                  className="input-box"
                  placeholder=" "
                  id="group-from"
                  value={groupData.from}
                  onChange={(e) => setGroupData({...groupData, from: e.target.value})}
                />
                <label htmlFor="group-from">Departure City</label>
                <div className="absolute right-4 top-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="floating-label">
                <input
                  type="text"
                  className="input-box"
                  placeholder=" "
                  id="group-to"
                  value={groupData.to}
                  onChange={(e) => setGroupData({...groupData, to: e.target.value})}
                />
                <label htmlFor="group-to">Destination City</label>
                <div className="absolute right-4 top-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="floating-label">
                <input
                  type="date"
                  className="input-box"
                  id="group-departure"
                  min={getTodayDate()}
                  value={groupData.departure}
                  onChange={(e) => setGroupData({...groupData, departure: e.target.value})}
                />
                <label htmlFor="group-departure">Departure Date</label>
                <div className="absolute right-4 top-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="floating-label">
                <input
                  type="date"
                  className="input-box"
                  id="group-return"
                  min={groupData.departure || getTodayDate()}
                  value={groupData.return}
                  onChange={(e) => setGroupData({...groupData, return: e.target.value})}
                />
                <label htmlFor="group-return">Return Date (Optional)</label>
                <div className="absolute right-4 top-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="floating-label">
              <textarea
                className="input-box h-32 resize-none"
                placeholder=" "
                id="special-requests"
                value={groupData.specialRequests}
                onChange={(e) => setGroupData({...groupData, specialRequests: e.target.value})}
              />
              <label htmlFor="special-requests">Special Requests or Requirements</label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-h3 text-primary mb-4">Contact Information</h2>
              <p className="text-body1 text-secondary">We'll assign a dedicated coordinator to assist with your group booking</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="floating-label">
                <input
                  type="text"
                  className="input-box"
                  placeholder=" "
                  id="contact-name"
                  value={groupData.contactName}
                  onChange={(e) => setGroupData({...groupData, contactName: e.target.value})}
                />
                <label htmlFor="contact-name">Contact Person Name</label>
              </div>
              
              <div className="floating-label">
                <input
                  type="text"
                  className="input-box"
                  placeholder=" "
                  id="company-name"
                  value={groupData.company}
                  onChange={(e) => setGroupData({...groupData, company: e.target.value})}
                />
                <label htmlFor="company-name">Company/Organization (Optional)</label>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="floating-label">
                <input
                  type="email"
                  className="input-box"
                  placeholder=" "
                  id="contact-email"
                  value={groupData.contactEmail}
                  onChange={(e) => setGroupData({...groupData, contactEmail: e.target.value})}
                />
                <label htmlFor="contact-email">Email Address</label>
                <div className="absolute right-4 top-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="floating-label">
                <input
                  type="tel"
                  className="input-box"
                  placeholder=" "
                  id="contact-phone"
                  value={groupData.contactPhone}
                  onChange={(e) => setGroupData({...groupData, contactPhone: e.target.value})}
                />
                <label htmlFor="contact-phone">Phone Number</label>
                <div className="absolute right-4 top-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="card bg-success-50 border-2 border-success-200 p-6">
              <h4 className="text-h5 text-success-700 mb-4">What Happens Next?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-success-500 rounded-2xl p-3 w-fit mx-auto mb-3">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h5 className="text-h6 text-success-700 mb-2">Quick Response</h5>
                  <p className="text-body2 text-success-600">We'll contact you within 2 hours</p>
                </div>
                <div className="text-center">
                  <div className="bg-success-500 rounded-2xl p-3 w-fit mx-auto mb-3">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h5 className="text-h6 text-success-700 mb-2">Custom Quote</h5>
                  <p className="text-body2 text-success-600">Personalized pricing and options</p>
                </div>
                <div className="text-center">
                  <div className="bg-success-500 rounded-2xl p-3 w-fit mx-auto mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h5 className="text-h6 text-success-700 mb-2">Dedicated Support</h5>
                  <p className="text-body2 text-success-600">Your personal group coordinator</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {step < 3 ? (
            <button
              onClick={nextStep}
              disabled={
                (step === 1 && (!groupData.groupType || !groupData.groupSize)) ||
                (step === 2 && (!groupData.from || !groupData.to || !groupData.departure))
              }
              className="btn-contained bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50"
            >
              <span>Next</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <button className="btn-contained bg-success-500 hover:bg-success-600 text-white">
              <span>Submit Group Request</span>
              <CheckCircle className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary text-center mb-8">Why Choose Our Group Booking Service?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                <benefit.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-h6 text-primary mb-2">{benefit.title}</h4>
              <p className="text-body2 text-secondary">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupBooking;