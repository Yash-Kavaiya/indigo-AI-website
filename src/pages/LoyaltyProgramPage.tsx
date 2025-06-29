import React, { useState } from 'react';
import { 
  Home, UserPlus, Award, Coins, Gift, CreditCard, 
  Users, HelpCircle, ArrowLeft, Menu, X, Star
} from 'lucide-react';
import LoyaltyHomepage from '../components/loyalty/LoyaltyHomepage';
import LoyaltyRegistration from '../components/loyalty/LoyaltyRegistration';
import LoyaltyBenefits from '../components/loyalty/LoyaltyBenefits';
import LoyaltyPoints from '../components/loyalty/LoyaltyPoints';
import LoyaltyOffers from '../components/loyalty/LoyaltyOffers';

export type LoyaltySection = 
  | 'homepage' 
  | 'registration' 
  | 'benefits' 
  | 'points' 
  | 'offers' 
  | 'creditcards' 
  | 'partners' 
  | 'faq' 
  | 'terms';

interface NavItem {
  id: LoyaltySection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const LoyaltyProgramPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<LoyaltySection>('homepage');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems: NavItem[] = [
    {
      id: 'homepage',
      label: 'BluChip Home',
      icon: Home,
      description: 'Program overview and highlights'
    },
    {
      id: 'registration',
      label: 'Join BluChip',
      icon: UserPlus,
      description: 'Register for the program'
    },
    {
      id: 'benefits',
      label: 'Membership Tiers',
      icon: Award,
      description: 'Tier benefits and privileges'
    },
    {
      id: 'points',
      label: 'Points Management',
      icon: Coins,
      description: 'Earn and redeem points'
    },
    {
      id: 'offers',
      label: 'Exclusive Offers',
      icon: Gift,
      description: 'Special deals and promotions'
    },
    {
      id: 'creditcards',
      label: 'Credit Cards',
      icon: CreditCard,
      description: 'Co-branded card benefits'
    },
    {
      id: 'partners',
      label: 'Partners',
      icon: Users,
      description: 'Partner discounts and benefits'
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: HelpCircle,
      description: 'Frequently asked questions'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'homepage':
        return <LoyaltyHomepage onNavigate={setActiveSection} />;
      case 'registration':
        return <LoyaltyRegistration />;
      case 'benefits':
        return <LoyaltyBenefits />;
      case 'points':
        return <LoyaltyPoints />;
      case 'offers':
        return <LoyaltyOffers />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="card bg-primary-50 border-2 border-primary-200 p-12 max-w-md mx-auto">
                <Star className="h-16 w-16 text-primary-500 mx-auto mb-6" />
                <h3 className="text-h4 text-primary mb-4">Coming Soon</h3>
                <p className="text-body1 text-secondary">
                  This section is under development. Please check back soon for updates.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  const activeItem = navigationItems.find(item => item.id === activeSection);

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white shadow-elevation-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="btn-text text-white hover:bg-white/20 p-2"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-2xl p-3">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-h4 font-bold">IndiGo BluChip</h1>
                  <p className="text-primary-200 text-body2">Loyalty Rewards Program</p>
                </div>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden btn-text text-white hover:bg-white/20 p-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Navigation Info */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="text-right">
                <p className="text-body1 font-semibold">{activeItem?.label}</p>
                <p className="text-primary-200 text-body2">{activeItem?.description}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                {activeItem?.icon && <activeItem.icon className="h-6 w-6" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className={`lg:w-80 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="card-elevated p-6 sticky top-8">
              <h2 className="text-h5 text-primary mb-6 flex items-center space-x-3">
                <Award className="h-6 w-6 text-primary-500" />
                <span>Program Sections</span>
              </h2>
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left card p-4 transition-all duration-200 hover:shadow-elevation-1 focus-ring ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-elevation-2'
                        : 'hover:bg-surface-secondary'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`rounded-xl p-2 ${
                        activeSection === item.id
                          ? 'bg-white/20'
                          : 'bg-primary-100'
                      }`}>
                        <item.icon className={`h-5 w-5 ${
                          activeSection === item.id
                            ? 'text-white'
                            : 'text-primary-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-h6 font-semibold ${
                          activeSection === item.id
                            ? 'text-white'
                            : 'text-primary'
                        }`}>
                          {item.label}
                        </h3>
                        <p className={`text-body2 ${
                          activeSection === item.id
                            ? 'text-primary-200'
                            : 'text-secondary'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgramPage;