import React, { useState } from 'react';
import { 
  Award, Star, Crown, Diamond, CheckCircle, ArrowRight, 
  Plane, Luggage, Clock, Car, Hotel, Gift, Shield, 
  TrendingUp, Users, Phone, Sparkles
} from 'lucide-react';

interface Tier {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  qualification: {
    points: number;
    flights: number;
    validity: string;
  };
  benefits: {
    category: string;
    items: string[];
  }[];
  perks: string[];
}

const LoyaltyBenefits: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('base');
  const [comparisonView, setComparisonView] = useState(false);

  const tiers: Tier[] = [
    {
      id: 'base',
      name: 'Base',
      icon: Award,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-300',
      qualification: {
        points: 0,
        flights: 0,
        validity: 'Lifetime'
      },
      benefits: [
        {
          category: 'Booking',
          items: ['Standard booking', 'Basic customer support', 'Email notifications']
        },
        {
          category: 'Travel',
          items: ['Standard check-in', 'Regular boarding', 'Basic baggage allowance']
        }
      ],
      perks: ['Welcome bonus of 500 points', 'Birthday special offer', 'Basic tier benefits']
    },
    {
      id: 'silver',
      name: 'Silver',
      icon: Star,
      color: 'text-gray-500',
      bgColor: 'bg-gray-200',
      borderColor: 'border-gray-400',
      qualification: {
        points: 2500,
        flights: 4,
        validity: '12 months'
      },
      benefits: [
        {
          category: 'Booking',
          items: ['Priority booking', 'Dedicated support line', 'SMS + Email alerts']
        },
        {
          category: 'Travel',
          items: ['Priority check-in', 'Fast-track security', '5kg extra baggage']
        },
        {
          category: 'Rewards',
          items: ['10% bonus points', 'Seat selection discount', 'Partner offers']
        }
      ],
      perks: ['10% bonus on all earnings', 'Free seat selection', 'Priority customer service']
    },
    {
      id: 'gold',
      name: 'Gold',
      icon: Crown,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
      borderColor: 'border-warning-400',
      qualification: {
        points: 7500,
        flights: 12,
        validity: '12 months'
      },
      benefits: [
        {
          category: 'Booking',
          items: ['Premium booking window', 'VIP support', 'Multi-channel alerts']
        },
        {
          category: 'Travel',
          items: ['Express check-in', 'Priority boarding', '10kg extra baggage', 'Lounge access']
        },
        {
          category: 'Rewards',
          items: ['25% bonus points', 'Free upgrades', 'Hotel discounts']
        },
        {
          category: 'Exclusive',
          items: ['Gold member events', 'Birthday gifts', 'Travel insurance']
        }
      ],
      perks: ['25% bonus on all earnings', 'Free lounge access', 'Complimentary upgrades when available']
    },
    {
      id: 'platinum',
      name: 'Platinum',
      icon: Diamond,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
      borderColor: 'border-primary-400',
      qualification: {
        points: 15000,
        flights: 24,
        validity: '12 months'
      },
      benefits: [
        {
          category: 'Booking',
          items: ['Exclusive booking access', 'Personal concierge', 'Real-time updates']
        },
        {
          category: 'Travel',
          items: ['Dedicated check-in', 'First to board', '15kg extra baggage', 'Premium lounge']
        },
        {
          category: 'Rewards',
          items: ['50% bonus points', 'Guaranteed upgrades', 'Elite partner benefits']
        },
        {
          category: 'Exclusive',
          items: ['Platinum events', 'Annual gifts', 'Comprehensive insurance', 'Personal travel advisor']
        }
      ],
      perks: ['50% bonus on all earnings', 'Guaranteed seat upgrades', 'Personal travel concierge']
    }
  ];

  const benefitCategories = [
    {
      name: 'Check-in & Boarding',
      icon: Clock,
      items: [
        { base: 'Standard check-in', silver: 'Priority check-in', gold: 'Express check-in', platinum: 'Dedicated check-in' },
        { base: 'Regular boarding', silver: 'Fast-track security', gold: 'Priority boarding', platinum: 'First to board' },
        { base: 'Basic queue', silver: 'Priority queue', gold: 'Express lane', platinum: 'VIP lane' }
      ]
    },
    {
      name: 'Baggage & Seat',
      icon: Luggage,
      items: [
        { base: 'Standard baggage', silver: '+5kg baggage', gold: '+10kg baggage', platinum: '+15kg baggage' },
        { base: 'Standard seats', silver: 'Free selection', gold: 'Premium seats', platinum: 'Best available' },
        { base: 'No priority', silver: 'Some priority', gold: 'High priority', platinum: 'Guaranteed priority' }
      ]
    },
    {
      name: 'Lounge & Services',
      icon: Hotel,
      items: [
        { base: 'No access', silver: 'No access', gold: 'Lounge access', platinum: 'Premium lounge' },
        { base: 'Basic support', silver: 'Priority support', gold: 'VIP support', platinum: 'Personal concierge' },
        { base: 'Standard service', silver: 'Enhanced service', gold: 'Premium service', platinum: 'White-glove service' }
      ]
    },
    {
      name: 'Rewards & Bonuses',
      icon: Gift,
      items: [
        { base: '1x points', silver: '1.1x points', gold: '1.25x points', platinum: '1.5x points' },
        { base: 'No bonus', silver: '10% bonus', gold: '25% bonus', platinum: '50% bonus' },
        { base: 'Basic offers', silver: 'Member offers', gold: 'Exclusive offers', platinum: 'Elite offers' }
      ]
    }
  ];

  const selectedTierData = tiers.find(tier => tier.id === selectedTier) || tiers[0];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-h2 text-primary mb-6">Membership Tiers & Benefits</h1>
        <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto mb-8">
          Discover the exclusive privileges and rewards that come with each BluChip membership tier
        </p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setComparisonView(false)}
            className={`btn-contained ${!comparisonView ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            Tier Details
          </button>
          <button
            onClick={() => setComparisonView(true)}
            className={`btn-contained ${comparisonView ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            Compare All Tiers
          </button>
        </div>
      </div>

      {!comparisonView ? (
        <>
          {/* Tier Selection */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`card p-6 text-center transition-all duration-300 hover:scale-105 ${
                  selectedTier === tier.id
                    ? `${tier.borderColor} border-2 shadow-elevation-3`
                    : 'border border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`${tier.bgColor} rounded-2xl p-4 w-fit mx-auto mb-4`}>
                  <tier.icon className={`h-8 w-8 ${tier.color}`} />
                </div>
                <h3 className={`text-h5 font-bold mb-2 ${tier.color}`}>{tier.name}</h3>
                <p className="text-body2 text-secondary mb-4">
                  {tier.qualification.points > 0 
                    ? `${tier.qualification.points.toLocaleString()} points`
                    : 'Entry level'
                  }
                </p>
                {selectedTier === tier.id && (
                  <div className="flex items-center justify-center text-primary-500">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="text-body2 font-semibold">Selected</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Tier Details */}
          <div className="card-elevated p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Tier Overview */}
              <div className="lg:col-span-1">
                <div className={`${selectedTierData.bgColor} rounded-3xl p-8 text-center mb-8`}>
                  <selectedTierData.icon className={`h-16 w-16 ${selectedTierData.color} mx-auto mb-6`} />
                  <h2 className={`text-h3 font-bold mb-4 ${selectedTierData.color}`}>
                    {selectedTierData.name} Tier
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="card bg-white p-4">
                      <h4 className="text-h6 text-primary mb-2">Qualification</h4>
                      <div className="space-y-2 text-body2 text-secondary">
                        <p>{selectedTierData.qualification.points.toLocaleString()} BluChip points</p>
                        <p>{selectedTierData.qualification.flights} flights per year</p>
                        <p>Valid for {selectedTierData.qualification.validity}</p>
                      </div>
                    </div>
                    
                    <div className="card bg-white p-4">
                      <h4 className="text-h6 text-primary mb-2">Key Perks</h4>
                      <div className="space-y-2">
                        {selectedTierData.perks.map((perk, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Sparkles className="h-4 w-4 text-secondary-500 mt-1 flex-shrink-0" />
                            <span className="text-body2 text-secondary">{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Details */}
              <div className="lg:col-span-2">
                <h3 className="text-h4 text-primary mb-8">Complete Benefits Package</h3>
                
                <div className="space-y-8">
                  {selectedTierData.benefits.map((benefitGroup, index) => (
                    <div key={index} className="card p-6">
                      <h4 className="text-h5 text-primary mb-6 flex items-center space-x-3">
                        {benefitGroup.category === 'Booking' && <Phone className="h-6 w-6 text-primary-500" />}
                        {benefitGroup.category === 'Travel' && <Plane className="h-6 w-6 text-primary-500" />}
                        {benefitGroup.category === 'Rewards' && <Gift className="h-6 w-6 text-primary-500" />}
                        {benefitGroup.category === 'Exclusive' && <Crown className="h-6 w-6 text-primary-500" />}
                        <span>{benefitGroup.category} Benefits</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {benefitGroup.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-success-500 mt-1 flex-shrink-0" />
                            <span className="text-body1 text-secondary">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Comparison View */
        <div className="space-y-8">
          {/* Tier Headers */}
          <div className="card-elevated overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 text-h6 text-primary min-w-48">Benefit Category</th>
                  {tiers.map((tier) => (
                    <th key={tier.id} className="text-center p-6 min-w-48">
                      <div className={`${tier.bgColor} rounded-2xl p-4 mx-auto w-fit mb-4`}>
                        <tier.icon className={`h-8 w-8 ${tier.color} mx-auto`} />
                      </div>
                      <h3 className={`text-h5 font-bold ${tier.color}`}>{tier.name}</h3>
                      <p className="text-body2 text-secondary mt-2">
                        {tier.qualification.points > 0 
                          ? `${tier.qualification.points.toLocaleString()} pts`
                          : 'Entry level'
                        }
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {benefitCategories.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className="border-b border-gray-100 bg-surface-secondary">
                      <td className="p-6">
                        <div className="flex items-center space-x-3">
                          <category.icon className="h-6 w-6 text-primary-500" />
                          <span className="text-h6 text-primary font-semibold">{category.name}</span>
                        </div>
                      </td>
                      <td colSpan={4} className="p-6"></td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-6">
                          <span className="text-body1 text-secondary">Benefit {itemIndex + 1}</span>
                        </td>
                        <td className="p-6 text-center">
                          <span className="text-body2 text-gray-600">{item.base}</span>
                        </td>
                        <td className="p-6 text-center">
                          <span className="text-body2 text-gray-600">{item.silver}</span>
                        </td>
                        <td className="p-6 text-center">
                          <span className="text-body2 text-warning-600 font-medium">{item.gold}</span>
                        </td>
                        <td className="p-6 text-center">
                          <span className="text-body2 text-primary-600 font-semibold">{item.platinum}</span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Upgrade CTA */}
          <div className="card-elevated p-10 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 text-center">
            <h3 className="text-h3 text-primary mb-6">Ready to Upgrade Your Experience?</h3>
            <p className="text-h4 font-normal text-secondary mb-8 max-w-2xl mx-auto">
              Join BluChip today and start earning points towards your next tier upgrade
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white shadow-elevation-2">
                <Award className="h-5 w-5" />
                <span>Join BluChip Program</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="btn-outlined border-secondary-500 text-secondary-500 hover:bg-secondary-50">
                <TrendingUp className="h-5 w-5" />
                <span>Calculate My Tier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyBenefits;