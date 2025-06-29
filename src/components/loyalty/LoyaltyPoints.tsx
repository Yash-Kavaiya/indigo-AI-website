import React, { useState } from 'react';
import { 
  Coins, TrendingUp, Gift, ArrowRight, Calendar, 
  Star, Plane, Hotel, Car, ShoppingBag, Clock, 
  Target, CheckCircle, AlertCircle, Download,
  CreditCard, Smartphone, Globe, Users
} from 'lucide-react';

interface PointsActivity {
  id: string;
  type: 'earned' | 'redeemed' | 'expired' | 'bonus';
  description: string;
  points: number;
  date: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface RedemptionOption {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  value: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  availability: 'available' | 'limited' | 'coming-soon';
  discount?: string;
}

const LoyaltyPoints: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'earn' | 'redeem' | 'activity'>('earn');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const currentPoints = 12750;
  const pointsToNextTier = 2250;
  const currentTier = 'Gold';
  const nextTier = 'Platinum';

  const pointsActivity: PointsActivity[] = [
    {
      id: '1',
      type: 'earned',
      description: 'Flight booking DEL-BOM',
      points: 450,
      date: '2025-01-10',
      category: 'flights',
      icon: Plane
    },
    {
      id: '2',
      type: 'redeemed',
      description: 'Seat upgrade to premium',
      points: -800,
      date: '2025-01-08',
      category: 'upgrades',
      icon: Star
    },
    {
      id: '3',
      type: 'bonus',
      description: 'Double points weekend bonus',
      points: 300,
      date: '2025-01-05',
      category: 'bonus',
      icon: Gift
    },
    {
      id: '4',
      type: 'earned',
      description: 'Hotel booking - Partner reward',
      points: 200,
      date: '2025-01-03',
      category: 'hotels',
      icon: Hotel
    },
    {
      id: '5',
      type: 'expired',
      description: 'Points expired after 24 months',
      points: -150,
      date: '2025-01-01',
      category: 'expired',
      icon: Clock
    }
  ];

  const redemptionOptions: RedemptionOption[] = [
    {
      id: '1',
      title: 'Free Domestic Flight',
      description: 'Redeem for any domestic route',
      pointsRequired: 8000,
      value: '₹4,500',
      category: 'flights',
      icon: Plane,
      image: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=800',
      availability: 'available'
    },
    {
      id: '2',
      title: 'Seat Upgrade',
      description: 'Economy to premium economy',
      pointsRequired: 1500,
      value: '₹2,000',
      category: 'upgrades',
      icon: Star,
      image: 'https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=800',
      availability: 'available'
    },
    {
      id: '3',
      title: 'Extra Baggage',
      description: '15kg additional baggage allowance',
      pointsRequired: 500,
      value: '₹1,200',
      category: 'baggage',
      icon: ShoppingBag,
      image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800',
      availability: 'available'
    },
    {
      id: '4',
      title: 'Hotel Discount Voucher',
      description: '₹2,000 off on partner hotels',
      pointsRequired: 2000,
      value: '₹2,000',
      category: 'hotels',
      icon: Hotel,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
      availability: 'available',
      discount: '40% off'
    },
    {
      id: '5',
      title: 'Car Rental Credit',
      description: 'Free day car rental with partners',
      pointsRequired: 3000,
      value: '₹2,500',
      category: 'cars',
      icon: Car,
      image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
      availability: 'limited'
    },
    {
      id: '6',
      title: 'International Flight',
      description: 'Domestic to international upgrade',
      pointsRequired: 25000,
      value: '₹15,000',
      category: 'flights',
      icon: Globe,
      image: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
      availability: 'coming-soon'
    }
  ];

  const earningOpportunities = [
    {
      category: 'Flights',
      icon: Plane,
      rate: '1 point per ₹5 spent',
      bonus: 'Double points on international flights',
      color: 'primary'
    },
    {
      category: 'Hotels',
      icon: Hotel,
      rate: '2 points per ₹10 spent',
      bonus: '500 bonus points per booking',
      color: 'secondary'
    },
    {
      category: 'Car Rentals',
      icon: Car,
      rate: '1 point per ₹8 spent',
      bonus: 'Weekend bonus: 1.5x points',
      color: 'success'
    },
    {
      category: 'Credit Card',
      icon: CreditCard,
      rate: '2 points per ₹100 spent',
      bonus: 'No spending limits',
      color: 'warning'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: redemptionOptions.length },
    { id: 'flights', name: 'Flights', count: redemptionOptions.filter(o => o.category === 'flights').length },
    { id: 'upgrades', name: 'Upgrades', count: redemptionOptions.filter(o => o.category === 'upgrades').length },
    { id: 'hotels', name: 'Hotels', count: redemptionOptions.filter(o => o.category === 'hotels').length },
    { id: 'cars', name: 'Car Rentals', count: redemptionOptions.filter(o => o.category === 'cars').length },
    { id: 'baggage', name: 'Baggage', count: redemptionOptions.filter(o => o.category === 'baggage').length }
  ];

  const filteredRedemptions = selectedCategory === 'all' 
    ? redemptionOptions 
    : redemptionOptions.filter(option => option.category === selectedCategory);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'earned': return 'text-success-500';
      case 'redeemed': return 'text-primary-500';
      case 'bonus': return 'text-secondary-500';
      case 'expired': return 'text-error-500';
      default: return 'text-gray-500';
    }
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-body2 font-medium">Available</span>;
      case 'limited':
        return <span className="bg-warning-100 text-warning-700 px-3 py-1 rounded-full text-body2 font-medium">Limited Stock</span>;
      case 'coming-soon':
        return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-body2 font-medium">Coming Soon</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-12">
      {/* Header with Points Balance */}
      <div className="card-elevated p-10 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="bg-white/20 rounded-3xl p-6 w-fit mx-auto lg:mx-0 mb-6">
              <Coins className="h-12 w-12" />
            </div>
            <h1 className="text-h2 font-bold mb-4">Points Management</h1>
            <p className="text-h4 font-normal text-primary-100">
              Earn, redeem, and track your BluChip points
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h2 className="text-h6 text-primary-200 mb-2">Current Balance</h2>
              <p className="text-h1 font-bold mb-4">{currentPoints.toLocaleString()}</p>
              <div className="bg-white/20 rounded-2xl px-6 py-3">
                <span className="text-body1 font-semibold">BluChip Points</span>
              </div>
            </div>
          </div>
          
          <div className="text-center lg:text-right">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-h6 text-primary-200 mb-4">Progress to {nextTier}</h3>
              <div className="mb-4">
                <div className="bg-white/20 rounded-full h-4 mb-2">
                  <div 
                    className="bg-secondary-400 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${((currentPoints % 15000) / 15000) * 100}%` }}
                  ></div>
                </div>
                <p className="text-body2 text-primary-200">
                  {pointsToNextTier.toLocaleString()} points to go
                </p>
              </div>
              <div className="flex items-center justify-center lg:justify-end space-x-2">
                <Target className="h-5 w-5 text-secondary-400" />
                <span className="text-body1 font-semibold text-secondary-400">{currentTier} Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex justify-center">
        <div className="card p-2 bg-surface-tertiary border-2 border-gray-200">
          <div className="flex rounded-xl overflow-hidden">
            {[
              { id: 'earn' as const, label: 'Earn Points', icon: TrendingUp },
              { id: 'redeem' as const, label: 'Redeem Points', icon: Gift },
              { id: 'activity' as const, label: 'Points Activity', icon: Clock }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-8 py-4 font-semibold transition-all duration-300 flex items-center space-x-3 ${
                  activeTab === tab.id
                    ? 'bg-white shadow-elevation-1 text-primary-500 rounded-xl'
                    : 'text-secondary hover:text-primary-500'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'earn' && (
        <div className="space-y-12">
          {/* Earning Structure */}
          <div>
            <h2 className="text-h3 text-primary mb-8 text-center">How to Earn BluChip Points</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {earningOpportunities.map((opportunity, index) => (
                <div key={index} className="card-elevated p-8 text-center hover:scale-105 transition-all duration-300">
                  <div className={`bg-${opportunity.color}-100 rounded-3xl p-6 w-fit mx-auto mb-6`}>
                    <opportunity.icon className={`h-12 w-12 text-${opportunity.color}-600`} />
                  </div>
                  <h3 className="text-h5 text-primary mb-3">{opportunity.category}</h3>
                  <p className="text-body1 text-secondary mb-4">{opportunity.rate}</p>
                  <div className={`bg-${opportunity.color}-50 border border-${opportunity.color}-200 rounded-2xl p-4`}>
                    <p className={`text-body2 text-${opportunity.color}-700 font-medium`}>
                      {opportunity.bonus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Points Calculator */}
          <div className="card-elevated p-10">
            <h3 className="text-h3 text-primary mb-8 text-center">Points Calculator</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="floating-label">
                    <input
                      type="number"
                      className="input-box"
                      placeholder=" "
                      id="spending-amount"
                      defaultValue="5000"
                    />
                    <label htmlFor="spending-amount">Spending Amount (₹)</label>
                  </div>
                  
                  <div className="floating-label">
                    <select className="input-box" id="spending-category">
                      <option value="flights">Flights (1 point per ₹5)</option>
                      <option value="hotels">Hotels (2 points per ₹10)</option>
                      <option value="cars">Car Rentals (1 point per ₹8)</option>
                      <option value="credit-card">Credit Card (2 points per ₹100)</option>
                    </select>
                    <label htmlFor="spending-category">Category</label>
                  </div>
                  
                  <button className="w-full btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                    <Target className="h-5 w-5" />
                    <span>Calculate Points</span>
                  </button>
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-success-50 to-success-100 border-2 border-success-200 p-8 text-center">
                <h4 className="text-h4 text-success-700 mb-4">Estimated Earnings</h4>
                <p className="text-h1 text-success-600 font-bold mb-4">1,000</p>
                <p className="text-body1 text-success-600 mb-6">BluChip Points</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-body2">
                    <span className="text-success-600">Base Points:</span>
                    <span className="text-success-700 font-semibold">1,000</span>
                  </div>
                  <div className="flex justify-between text-body2">
                    <span className="text-success-600">Tier Bonus (25%):</span>
                    <span className="text-success-700 font-semibold">+250</span>
                  </div>
                  <div className="border-t border-success-300 pt-3">
                    <div className="flex justify-between text-body1 font-bold">
                      <span className="text-success-700">Total:</span>
                      <span className="text-success-700">1,250 points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'redeem' && (
        <div className="space-y-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`btn-contained transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <span>{category.name}</span>
                <span className="bg-black/20 rounded-full px-2 py-1 text-xs font-bold">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Redemption Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRedemptions.map((option) => (
              <div
                key={option.id}
                className={`card-elevated overflow-hidden hover:scale-105 transition-all duration-300 ${
                  currentPoints >= option.pointsRequired ? '' : 'opacity-75'
                }`}
              >
                <div className="relative h-48">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    {getAvailabilityBadge(option.availability)}
                  </div>
                  {option.discount && (
                    <div className="absolute top-4 right-4 bg-error-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                      {option.discount}
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <option.icon className="h-5 w-5 text-primary-500" />
                      <span className="text-body2 font-bold text-primary">
                        {option.pointsRequired.toLocaleString()} pts
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-h5 text-primary mb-2">{option.title}</h3>
                  <p className="text-body1 text-secondary mb-4">{option.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-body2 text-secondary">Equivalent Value</p>
                      <p className="text-h6 text-primary font-bold">{option.value}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-body2 text-secondary">Points Required</p>
                      <p className="text-h6 text-primary font-bold">
                        {option.pointsRequired.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    disabled={currentPoints < option.pointsRequired || option.availability === 'coming-soon'}
                    className={`w-full btn-contained transition-all duration-200 ${
                      currentPoints >= option.pointsRequired && option.availability !== 'coming-soon'
                        ? 'bg-primary-500 hover:bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {currentPoints >= option.pointsRequired ? (
                      option.availability === 'coming-soon' ? (
                        <>
                          <Clock className="h-5 w-5" />
                          <span>Coming Soon</span>
                        </>
                      ) : (
                        <>
                          <span>Redeem Now</span>
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5" />
                        <span>Insufficient Points</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="space-y-8">
          {/* Activity Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card-elevated p-6 text-center">
              <div className="bg-success-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Points Earned</h3>
              <p className="text-h4 text-success-600 font-bold">+2,150</p>
              <p className="text-body2 text-secondary">This month</p>
            </div>
            
            <div className="card-elevated p-6 text-center">
              <div className="bg-primary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                <Gift className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Points Redeemed</h3>
              <p className="text-h4 text-primary-600 font-bold">-800</p>
              <p className="text-body2 text-secondary">This month</p>
            </div>
            
            <div className="card-elevated p-6 text-center">
              <div className="bg-secondary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                <Star className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Bonus Points</h3>
              <p className="text-h4 text-secondary-600 font-bold">+300</p>
              <p className="text-body2 text-secondary">This month</p>
            </div>
            
            <div className="card-elevated p-6 text-center">
              <div className="bg-error-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                <Clock className="h-8 w-8 text-error-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Expiring Soon</h3>
              <p className="text-h4 text-error-600 font-bold">1,250</p>
              <p className="text-body2 text-secondary">Next 30 days</p>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="card-elevated p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-h4 text-primary">Recent Activity</h3>
              <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50">
                <Download className="h-5 w-5" />
                <span>Download Statement</span>
              </button>
            </div>
            
            <div className="space-y-6">
              {pointsActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-6 p-6 card hover:shadow-elevation-1 transition-all duration-200">
                  <div className={`rounded-2xl p-3 ${
                    activity.type === 'earned' ? 'bg-success-100' :
                    activity.type === 'redeemed' ? 'bg-primary-100' :
                    activity.type === 'bonus' ? 'bg-secondary-100' :
                    'bg-error-100'
                  }`}>
                    <activity.icon className={`h-6 w-6 ${getActivityIcon(activity.type)}`} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-h6 text-primary mb-1">{activity.description}</h4>
                    <p className="text-body2 text-secondary capitalize">{activity.category} • {activity.date}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-h6 font-bold ${
                      activity.points > 0 ? 'text-success-600' : 'text-error-600'
                    }`}>
                      {activity.points > 0 ? '+' : ''}{activity.points.toLocaleString()}
                    </p>
                    <p className="text-body2 text-secondary">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyPoints;