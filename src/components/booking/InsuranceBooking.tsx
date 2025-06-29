import React, { useState } from 'react';
import { 
  Umbrella, Shield, Calendar, User, MapPin, 
  ArrowRight, CheckCircle, Clock, AlertCircle, 
  Heart, Briefcase, Phone, Star, CreditCard, 
  Plane, CalendarCheck, FileText, Plus
} from 'lucide-react';

const InsuranceBooking: React.FC = () => {
  const [tripType, setTripType] = useState<'single' | 'multi' | 'annual'>('single');
  const [formData, setFormData] = useState({
    destination: '',
    departureDate: '',
    returnDate: '',
    travelers: 1,
    travelersAge: ['30'],
    coverageLevel: 'standard'
  });
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const insurancePlans = [
    {
      id: 'silver',
      name: 'Silver Plan',
      description: 'Basic coverage for essential travel protection',
      singlePrice: 599,
      multiPrice: 899,
      annualPrice: 3499,
      coverage: {
        medical: '₹5,00,000',
        tripCancellation: '₹50,000',
        baggage: '₹25,000',
        delay: '₹5,000'
      },
      features: [
        'Emergency medical expenses',
        'Trip cancellation/curtailment',
        'Baggage loss',
        'Flight delay compensation',
        '24/7 travel assistance'
      ],
      recommended: false
    },
    {
      id: 'gold',
      name: 'Gold Plan',
      description: 'Comprehensive coverage for worry-free travel',
      singlePrice: 999,
      multiPrice: 1499,
      annualPrice: 5999,
      coverage: {
        medical: '₹10,00,000',
        tripCancellation: '₹1,00,000',
        baggage: '₹50,000',
        delay: '₹10,000'
      },
      features: [
        'Emergency medical expenses',
        'Trip cancellation/curtailment',
        'Baggage loss & delay',
        'Flight delay compensation',
        '24/7 travel assistance',
        'Adventure sports coverage',
        'Personal liability coverage',
        'Emergency dental treatment'
      ],
      recommended: true
    },
    {
      id: 'platinum',
      name: 'Platinum Plan',
      description: 'Premium protection with maximum benefits',
      singlePrice: 1799,
      multiPrice: 2599,
      annualPrice: 9999,
      coverage: {
        medical: '₹25,00,000',
        tripCancellation: '₹2,50,000',
        baggage: '₹1,00,000',
        delay: '₹20,000'
      },
      features: [
        'Emergency medical expenses',
        'Trip cancellation/curtailment',
        'Baggage loss & delay',
        'Flight delay compensation',
        '24/7 travel assistance',
        'Adventure sports coverage',
        'Personal liability coverage',
        'Emergency dental treatment',
        'Hospital cash allowance',
        'Hijack coverage',
        'Home burglary insurance',
        'Premium concierge services'
      ],
      recommended: false
    }
  ];

  const popularDestinations = [
    { name: 'United States', icon: '🇺🇸', required: true },
    { name: 'Schengen Countries', icon: '🇪🇺', required: true },
    { name: 'United Kingdom', icon: '🇬🇧', required: true },
    { name: 'Canada', icon: '🇨🇦', required: true },
    { name: 'Australia', icon: '🇦🇺', required: true },
    { name: 'Singapore', icon: '🇸🇬', recommended: true },
    { name: 'Thailand', icon: '🇹🇭', recommended: true },
    { name: 'UAE', icon: '🇦🇪', recommended: true }
  ];

  const keyBenefits = [
    {
      icon: Heart,
      title: 'Medical Coverage',
      description: 'Emergency medical expenses, hospitalization, and evacuation',
      color: 'error'
    },
    {
      icon: Briefcase,
      title: 'Baggage Protection',
      description: 'Coverage for lost, stolen or damaged baggage',
      color: 'primary'
    },
    {
      icon: Plane,
      title: 'Trip Cancellation',
      description: 'Reimbursement for non-refundable trip costs',
      color: 'success'
    },
    {
      icon: Clock,
      title: 'Delay Compensation',
      description: 'Allowance for flight delays and missed connections',
      color: 'warning'
    },
    {
      icon: Phone,
      title: '24/7 Assistance',
      description: 'Round-the-clock emergency support worldwide',
      color: 'secondary'
    },
    {
      icon: Shield,
      title: 'Personal Liability',
      description: 'Protection against third-party damages and injury claims',
      color: 'error'
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleTravelerAgeChange = (index: number, value: string) => {
    const newAges = [...formData.travelersAge];
    newAges[index] = value;
    handleInputChange('travelersAge', newAges);
  };

  const handleTravelersChange = (value: number) => {
    const currentAges = formData.travelersAge;
    const newAges = Array(value).fill('30');
    
    // Preserve existing ages when increasing number of travelers
    for (let i = 0; i < Math.min(currentAges.length, value); i++) {
      newAges[i] = currentAges[i];
    }
    
    setFormData({
      ...formData,
      travelers: value,
      travelersAge: newAges
    });
  };

  const getPlanPrice = (plan: typeof insurancePlans[0]) => {
    if (tripType === 'single') return plan.singlePrice * formData.travelers;
    if (tripType === 'multi') return plan.multiPrice * formData.travelers;
    return plan.annualPrice;
  };

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
        <h1 className="text-h2 text-primary mb-6">Travel Insurance</h1>
        <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto">
          Comprehensive coverage for worry-free travel
        </p>
      </div>

      {/* Trip Type Selection */}
      <div className="card-elevated p-8">
        <div className="flex justify-center mb-8">
          <div className="card p-2 bg-surface-tertiary border-2 border-gray-200">
            <div className="flex rounded-xl overflow-hidden">
              {[
                { id: 'single' as const, label: 'Single Trip' },
                { id: 'multi' as const, label: 'Multi Trip' },
                { id: 'annual' as const, label: 'Annual Plan' }
              ].map((type) => (
                <button
                  key={type.id}
                  className={`px-8 py-3 font-semibold transition-all duration-300 ${
                    tripType === type.id
                      ? 'bg-white shadow-elevation-1 text-primary-500 rounded-xl'
                      : 'text-secondary hover:text-primary-500'
                  }`}
                  onClick={() => setTripType(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Insurance Form */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="floating-label">
              <select
                className="input-box"
                id="destination"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
              >
                <option value="">Select Destination</option>
                <option value="worldwide">Worldwide</option>
                <option value="worldwide-excl-usa">Worldwide (excluding USA & Canada)</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="australia-nz">Australia & New Zealand</option>
                <option value="middle-east">Middle East</option>
                <option value="domestic">Domestic (Within India)</option>
              </select>
              <label htmlFor="destination">Travel Destination*</label>
              <div className="absolute right-4 top-3">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <select
                className="input-box"
                id="travelers"
                value={formData.travelers}
                onChange={(e) => handleTravelersChange(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} Traveler{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              <label htmlFor="travelers">Number of Travelers*</label>
              <div className="absolute right-4 top-3">
                <User className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="floating-label">
              <input
                type="date"
                className="input-box"
                id="departure-date"
                min={getTodayDate()}
                value={formData.departureDate}
                onChange={(e) => handleInputChange('departureDate', e.target.value)}
              />
              <label htmlFor="departure-date">Departure Date*</label>
              <div className="absolute right-4 top-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {tripType !== 'annual' && (
              <div className="floating-label">
                <input
                  type="date"
                  className="input-box"
                  id="return-date"
                  min={formData.departureDate || getTomorrowDate()}
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                />
                <label htmlFor="return-date">Return Date*</label>
                <div className="absolute right-4 top-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}
          </div>

          {/* Traveler Age Inputs */}
          <div>
            <h4 className="text-h6 text-primary mb-4">Traveler Age{formData.travelers > 1 ? 's' : ''}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {formData.travelersAge.map((age, index) => (
                <div key={index} className="floating-label">
                  <input
                    type="number"
                    className="input-box"
                    id={`traveler-age-${index}`}
                    min="1"
                    max="99"
                    placeholder=" "
                    value={age}
                    onChange={(e) => handleTravelerAgeChange(index, e.target.value)}
                  />
                  <label htmlFor={`traveler-age-${index}`}>Traveler {index + 1} Age*</label>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage Level */}
          <div>
            <h4 className="text-h6 text-primary mb-4">Coverage Level</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['standard', 'premium', 'ultimate'].map((level) => (
                <label key={level} className="card p-6 cursor-pointer hover:shadow-elevation-1 transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="coverage-level"
                      value={level}
                      checked={formData.coverageLevel === level}
                      onChange={() => handleInputChange('coverageLevel', level)}
                      className="mt-1 w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                    />
                    <div>
                      <p className="text-h6 text-primary capitalize">{level}</p>
                      <p className="text-body2 text-secondary">
                        {level === 'standard' && 'Basic protection for budget travelers'}
                        {level === 'premium' && 'Enhanced coverage for most travelers'}
                        {level === 'ultimate' && 'Comprehensive coverage for maximum protection'}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <button className="w-full btn-contained bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 text-h6">
            <Shield className="h-6 w-6" />
            <span>View Insurance Plans</span>
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Insurance Plans */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary mb-8 text-center">Choose Your Insurance Plan</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {insurancePlans.map((plan) => (
            <div
              key={plan.id}
              className={`card-elevated overflow-hidden hover:scale-105 transition-all duration-300 ${
                plan.recommended ? 'border-2 border-primary-500' : ''
              } ${selectedPlan === plan.id ? 'ring-4 ring-primary-300' : ''}`}
            >
              {plan.recommended && (
                <div className="bg-primary-500 text-white text-center py-2 text-body2 font-bold">
                  Recommended for most travelers
                </div>
              )}
              
              <div className="p-8">
                <h4 className="text-h4 text-primary font-bold mb-2">{plan.name}</h4>
                <p className="text-body1 text-secondary mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <p className="text-h3 text-primary-600 font-bold">
                    ₹{getPlanPrice(plan).toLocaleString()}
                  </p>
                  <p className="text-body2 text-secondary">
                    {tripType === 'annual' ? 'per year' : formData.travelers > 1 ? `for ${formData.travelers} travelers` : 'per person'}
                  </p>
                </div>
                
                <div className="mb-8">
                  <h5 className="text-h6 text-primary mb-3">Coverage Details</h5>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-body2 text-secondary">Medical Expenses</span>
                      <span className="text-body1 font-semibold text-primary">{plan.coverage.medical}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body2 text-secondary">Trip Cancellation</span>
                      <span className="text-body1 font-semibold text-primary">{plan.coverage.tripCancellation}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body2 text-secondary">Baggage Loss</span>
                      <span className="text-body1 font-semibold text-primary">{plan.coverage.baggage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body2 text-secondary">Travel Delay</span>
                      <span className="text-body1 font-semibold text-primary">{plan.coverage.delay}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h5 className="text-h6 text-primary mb-3">Key Features</h5>
                  <div className="space-y-2">
                    {plan.features.slice(0, 5).map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-success-500 mt-1" />
                        <span className="text-body2 text-secondary">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 5 && (
                      <div className="flex items-center space-x-2">
                        <Plus className="h-4 w-4 text-primary-500" />
                        <span className="text-body2 text-primary-500 font-medium">
                          {plan.features.length - 5} more benefits
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full btn-contained ${
                    selectedPlan === plan.id
                      ? 'bg-success-500 hover:bg-success-600'
                      : 'bg-primary-500 hover:bg-primary-600'
                  } text-white`}
                >
                  {selectedPlan === plan.id ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Selected</span>
                    </>
                  ) : (
                    <>
                      <span>Select Plan</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Travel Insurance */}
      <div className="card-elevated p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
        <div className="text-center mb-12">
          <h3 className="text-h3 text-primary mb-4">Why Travel Insurance Is Essential</h3>
          <p className="text-h5 font-normal text-secondary max-w-3xl mx-auto">
            Protect your trip investment and enjoy peace of mind wherever you go
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {keyBenefits.map((benefit, index) => (
            <div key={index} className="card bg-white p-6 hover:shadow-elevation-2 transition-all duration-300">
              <div className={`bg-${benefit.color}-100 rounded-2xl p-4 w-fit mb-6`}>
                <benefit.icon className={`h-8 w-8 text-${benefit.color}-600`} />
              </div>
              <h4 className="text-h5 text-primary mb-3">{benefit.title}</h4>
              <p className="text-body1 text-secondary">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Destinations That Require Insurance */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary mb-8 text-center">Destinations & Insurance Requirements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h4 className="text-h5 text-primary mb-6 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-error-500" />
              <span>Insurance Required</span>
            </h4>
            <div className="card bg-error-50 border border-error-200 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularDestinations.filter(d => d.required).map((dest, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-2xl">{dest.icon}</div>
                    <span className="text-body1 text-primary">{dest.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-body2 text-error-600 mt-4">
                <AlertCircle className="h-4 w-4 inline mr-2" />
                These countries require travel insurance for visa approval
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-h5 text-primary mb-6 flex items-center space-x-3">
              <Shield className="h-5 w-5 text-success-500" />
              <span>Insurance Recommended</span>
            </h4>
            <div className="card bg-success-50 border border-success-200 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularDestinations.filter(d => d.recommended).map((dest, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-2xl">{dest.icon}</div>
                    <span className="text-body1 text-primary">{dest.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-body2 text-success-600 mt-4">
                <Shield className="h-4 w-4 inline mr-2" />
                Insurance is highly recommended for peace of mind
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Claims Process */}
      <div className="card-elevated p-8">
        <h3 className="text-h3 text-primary mb-8 text-center">Easy Claims Process</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="card p-6 text-center">
            <div className="bg-primary-100 rounded-2xl p-4 w-fit mx-auto mb-6">
              <FileText className="h-10 w-10 text-primary-600" />
            </div>
            <h4 className="text-h5 text-primary mb-3">Submit Claim</h4>
            <p className="text-body2 text-secondary mb-4">Submit your claim online with required documents and details</p>
            <div className="text-body2 text-primary-600 font-medium">
              <Clock className="h-4 w-4 inline mr-1" />
              Takes only 10-15 minutes
            </div>
          </div>
          
          <div className="card p-6 text-center">
            <div className="bg-secondary-100 rounded-2xl p-4 w-fit mx-auto mb-6">
              <CalendarCheck className="h-10 w-10 text-secondary-600" />
            </div>
            <h4 className="text-h5 text-primary mb-3">Track Status</h4>
            <p className="text-body2 text-secondary mb-4">Track your claim status online through our portal or mobile app</p>
            <div className="text-body2 text-secondary-600 font-medium">
              <Clock className="h-4 w-4 inline mr-1" />
              Real-time updates
            </div>
          </div>
          
          <div className="card p-6 text-center">
            <div className="bg-success-100 rounded-2xl p-4 w-fit mx-auto mb-6">
              <CreditCard className="h-10 w-10 text-success-600" />
            </div>
            <h4 className="text-h5 text-primary mb-3">Receive Payment</h4>
            <p className="text-body2 text-secondary mb-4">Get your approved claim amount directly in your bank account</p>
            <div className="text-body2 text-success-600 font-medium">
              <Clock className="h-4 w-4 inline mr-1" />
              Within 7 business days
            </div>
          </div>
        </div>
        
        <div className="bg-primary-50 rounded-2xl p-8 border border-primary-200">
          <div className="flex items-start space-x-4">
            <Phone className="h-6 w-6 text-primary-600 mt-1" />
            <div>
              <h4 className="text-h5 text-primary mb-3">24/7 Claims Assistance</h4>
              <p className="text-body1 text-secondary mb-4">
                Our dedicated claims team is available round-the-clock to help you with your insurance claims, no matter where you are in the world.
              </p>
              <div className="bg-white rounded-xl px-4 py-3 inline-block">
                <p className="text-h6 text-primary-600">International Toll-Free: +1-800-123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button 
          className="btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-8 shadow-elevation-2 hover:shadow-elevation-3 text-h6"
          disabled={!selectedPlan}
        >
          <Shield className="h-6 w-6" />
          <span>Purchase Selected Insurance Plan</span>
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default InsuranceBooking;