import React, { useState } from 'react';
import { 
  Gift, Star, Clock, ArrowRight, Search, Filter, 
  Sparkles, TrendingUp, Heart, Globe, Percent,
  Calendar, MapPin, Users, CreditCard, Smartphone,
  Tag, Bell, Download, Share2, BookmarkPlus
} from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  category: string;
  tier: string[];
  image: string;
  featured: boolean;
  terms: string[];
  code?: string;
  minSpend?: string;
  maxDiscount?: string;
  usage: 'unlimited' | 'once' | 'limited';
  usageCount?: number;
  savedBy: number;
}

const LoyaltyOffers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const offers: Offer[] = [
    {
      id: '1',
      title: 'Double Points Weekend',
      description: 'Earn 2x BluChip points on all domestic and international bookings',
      discount: '100% Bonus Points',
      validUntil: '2025-01-31',
      category: 'flights',
      tier: ['base', 'silver', 'gold', 'platinum'],
      image: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      terms: ['Valid on all routes', 'Cannot be combined with other offers', 'Points credited within 48 hours'],
      code: 'DOUBLE2025',
      usage: 'unlimited',
      savedBy: 1250
    },
    {
      id: '2',
      title: 'Flash Sale: International Routes',
      description: 'Up to 40% off on international flights. Limited time offer!',
      discount: '40% Off',
      validUntil: '2025-01-20',
      category: 'flights',
      tier: ['silver', 'gold', 'platinum'],
      image: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      terms: ['Minimum booking value ₹25,000', 'Valid for travel until March 2025', 'Subject to seat availability'],
      code: 'FLASH40',
      minSpend: '₹25,000',
      maxDiscount: '₹15,000',
      usage: 'limited',
      usageCount: 150,
      savedBy: 890
    },
    {
      id: '3',
      title: 'Hotel Partner Exclusive',
      description: 'Stay at premium hotels and earn bonus points + instant discounts',
      discount: '30% Off + 500 Bonus Points',
      validUntil: '2025-02-28',
      category: 'hotels',
      tier: ['gold', 'platinum'],
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      terms: ['Valid at 500+ partner hotels', 'Minimum 2 nights stay', 'Advance booking required'],
      code: 'HOTEL30',
      minSpend: '₹8,000',
      usage: 'unlimited',
      savedBy: 670
    },
    {
      id: '4',
      title: 'Credit Card Welcome Bonus',
      description: 'Apply for IndiGo BluChip Credit Card and get instant benefits',
      discount: '₹5,000 Welcome Voucher',
      validUntil: '2025-03-31',
      category: 'credit-card',
      tier: ['base', 'silver', 'gold', 'platinum'],
      image: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      terms: ['Subject to credit approval', 'Annual fee waived for first year', 'Instant approval for existing members'],
      usage: 'once',
      savedBy: 2340
    },
    {
      id: '5',
      title: 'Family Travel Package',
      description: 'Book for 4+ passengers and save big on group bookings',
      discount: '25% Off Group Booking',
      validUntil: '2025-02-15',
      category: 'flights',
      tier: ['base', 'silver', 'gold', 'platinum'],
      image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      terms: ['Minimum 4 passengers', 'Same route and dates', 'Children above 2 years count as passengers'],
      code: 'FAMILY25',
      minSpend: '₹20,000',
      maxDiscount: '₹10,000',
      usage: 'unlimited',
      savedBy: 450
    },
    {
      id: '6',
      title: 'Car Rental Combo',
      description: 'Book flight + car rental together for exclusive savings',
      discount: '₹3,000 Off Combo',
      validUntil: '2025-02-10',
      category: 'cars',
      tier: ['silver', 'gold', 'platinum'],
      image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      terms: ['Valid with partner car rental companies', 'Minimum 3 days rental', 'Same destination as flight'],
      code: 'CARCOMBO',
      usage: 'unlimited',
      savedBy: 320
    }
  ];

  const categories = [
    { id: 'all', name: 'All Offers', icon: Gift, count: offers.length },
    { id: 'flights', name: 'Flights', icon: Globe, count: offers.filter(o => o.category === 'flights').length },
    { id: 'hotels', name: 'Hotels', icon: MapPin, count: offers.filter(o => o.category === 'hotels').length },
    { id: 'cars', name: 'Car Rentals', icon: Users, count: offers.filter(o => o.category === 'cars').length },
    { id: 'credit-card', name: 'Credit Cards', icon: CreditCard, count: offers.filter(o => o.category === 'credit-card').length }
  ];

  const tiers = [
    { id: 'all', name: 'All Tiers' },
    { id: 'base', name: 'Base' },
    { id: 'silver', name: 'Silver' },
    { id: 'gold', name: 'Gold' },
    { id: 'platinum', name: 'Platinum' }
  ];

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
    const matchesTier = selectedTier === 'all' || offer.tier.includes(selectedTier);
    
    return matchesSearch && matchesCategory && matchesTier;
  });

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'expiry':
        return new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime();
      case 'popular':
        return b.savedBy - a.savedBy;
      default:
        return 0;
    }
  });

  const getDaysRemaining = (validUntil: string) => {
    const today = new Date();
    const expiry = new Date(validUntil);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTierBadge = (tierList: string[]) => {
    if (tierList.length === 4) return <span className="bg-success-100 text-success-700 px-2 py-1 rounded-full text-xs font-medium">All Tiers</span>;
    if (tierList.includes('platinum')) return <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">Premium</span>;
    if (tierList.includes('gold')) return <span className="bg-warning-100 text-warning-700 px-2 py-1 rounded-full text-xs font-medium">Gold+</span>;
    return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">Entry Level</span>;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-h2 text-primary mb-6">Exclusive Member Offers</h1>
        <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
          Discover amazing deals and exclusive promotions available only to BluChip members
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card-elevated p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="floating-label">
              <input
                type="text"
                className="input-box"
                placeholder=" "
                id="search-offers"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="search-offers">Search offers...</label>
              <div className="absolute right-4 top-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="floating-label">
            <select
              className="input-box"
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <label htmlFor="category-filter">Category</label>
          </div>
          
          <div className="floating-label">
            <select
              className="input-box"
              id="tier-filter"
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
            >
              {tiers.map(tier => (
                <option key={tier.id} value={tier.id}>
                  {tier.name}
                </option>
              ))}
            </select>
            <label htmlFor="tier-filter">Membership Tier</label>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-body2 text-secondary">Sort by:</span>
            <select
              className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured First</option>
              <option value="expiry">Expiring Soon</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-body2 text-secondary">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <div className="space-y-1 w-4 h-4">
                <div className="bg-current h-1 rounded-sm"></div>
                <div className="bg-current h-1 rounded-sm"></div>
                <div className="bg-current h-1 rounded-sm"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Offers Banner */}
      <div className="card-elevated p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-secondary-500 via-secondary-600 to-warning-500 text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="h-8 w-8" />
                <h2 className="text-h3 font-bold">Flash Deals</h2>
              </div>
              <p className="text-h4 font-normal text-secondary-100 mb-6">
                Limited time offers ending soon - don't miss out!
              </p>
              <button className="btn-contained bg-white text-secondary-600 hover:bg-gray-100">
                <Clock className="h-5 w-5" />
                <span>View Expiring Soon</span>
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 text-center">
                <h3 className="text-h5 font-bold mb-2">Ending in</h3>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="bg-white/30 rounded-2xl px-3 py-2 mb-1">
                      <span className="text-h4 font-bold">05</span>
                    </div>
                    <span className="text-body2">Days</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/30 rounded-2xl px-3 py-2 mb-1">
                      <span className="text-h4 font-bold">14</span>
                    </div>
                    <span className="text-body2">Hours</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/30 rounded-2xl px-3 py-2 mb-1">
                      <span className="text-h4 font-bold">32</span>
                    </div>
                    <span className="text-body2">Mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
        {sortedOffers.map((offer) => (
          <div
            key={offer.id}
            className={`card-elevated overflow-hidden hover:scale-105 transition-all duration-300 ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            {offer.featured && (
              <div className="absolute top-4 left-4 z-10 bg-secondary-500 text-white px-3 py-1 rounded-full text-body2 font-bold flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>Featured</span>
              </div>
            )}
            
            <div className={`relative ${viewMode === 'list' ? 'w-80 h-48' : 'h-48'}`}>
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <div className="absolute top-4 right-4 space-y-2">
                {getTierBadge(offer.tier)}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-1">
                  <span className="text-body2 font-bold text-primary">{offer.discount}</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-body2">
                    {getDaysRemaining(offer.validUntil)} days left
                  </span>
                </div>
              </div>
            </div>
            
            <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-h5 text-primary font-bold">{offer.title}</h3>
                <button className="text-gray-400 hover:text-primary-500 transition-colors duration-200">
                  <BookmarkPlus className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-body1 text-secondary mb-4 line-clamp-2">{offer.description}</p>
              
              {offer.code && (
                <div className="card bg-gray-50 border border-gray-200 p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-primary-500" />
                      <span className="text-body2 text-secondary">Promo Code:</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-body1 font-bold text-primary">{offer.code}</span>
                      <button className="text-primary-500 hover:text-primary-600">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-3 mb-6">
                {offer.minSpend && (
                  <div className="flex items-center justify-between text-body2">
                    <span className="text-secondary">Minimum Spend:</span>
                    <span className="text-primary font-semibold">{offer.minSpend}</span>
                  </div>
                )}
                {offer.maxDiscount && (
                  <div className="flex items-center justify-between text-body2">
                    <span className="text-secondary">Max Discount:</span>
                    <span className="text-primary font-semibold">{offer.maxDiscount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-body2">
                  <span className="text-secondary">Valid Until:</span>
                  <span className="text-primary font-semibold">{offer.validUntil}</span>
                </div>
                <div className="flex items-center justify-between text-body2">
                  <span className="text-secondary">Saved by:</span>
                  <span className="text-success-600 font-semibold">{offer.savedBy.toLocaleString()} members</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                  <span>Use Offer</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 p-3">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {sortedOffers.length === 0 && (
        <div className="text-center py-16">
          <div className="card bg-gray-50 border-2 border-gray-200 p-12 max-w-md mx-auto">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-h4 text-primary mb-4">No offers found</h3>
            <p className="text-body1 text-secondary mb-6">
              Try adjusting your search criteria or browse all available offers.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedTier('all');
              }}
              className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="card-elevated p-10 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 text-center">
        <h3 className="text-h3 text-primary mb-6">Never Miss an Offer</h3>
        <p className="text-h4 font-normal text-secondary mb-8 max-w-2xl mx-auto">
          Get notified about exclusive deals, flash sales, and member-only promotions
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="flex-1 floating-label">
            <input
              type="email"
              className="input-box"
              placeholder=" "
              id="newsletter-email"
            />
            <label htmlFor="newsletter-email">Your email address</label>
          </div>
          <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
            <Bell className="h-5 w-5" />
            <span>Subscribe</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyOffers;