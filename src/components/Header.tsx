import React, { useState, useEffect, useRef } from 'react';
import { 
  Plane, Menu, X, User, Bell, Award, Car, Hotel, Users, 
  MapPin, Info, Briefcase, Newspaper, FileText, MessageSquare, 
  ChevronDown, ChevronRight, Search, Globe, Star, CreditCard, 
  Calendar, PhoneCall, Heart, ShieldCheck, HelpCircle, Import as Passport,
  Umbrella
} from 'lucide-react';

interface HeaderProps {
  onNavigateToLoyalty?: () => void;
  onNavigateToBooking?: () => void;
  onNavigateToDestinations?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToCareers?: () => void;
  onNavigateToPress?: () => void;
  onNavigateToBlog?: () => void;
  onNavigateToContact?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigateToLoyalty, 
  onNavigateToBooking, 
  onNavigateToDestinations,
  onNavigateToAbout,
  onNavigateToCareers,
  onNavigateToPress,
  onNavigateToBlog,
  onNavigateToContact
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Navigation structure
  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      href: '#',
      action: () => {/* Default home action */}
    },
    {
      id: 'bookTravel',
      label: 'Book Travel',
      submenu: [
        {
          id: 'flights',
          label: 'Flights',
          icon: Plane,
          description: 'Domestic & International flights at best prices',
          action: onNavigateToBooking
        },
        {
          id: 'hotels',
          label: 'Hotels',
          icon: Hotel,
          description: 'Find the perfect stay from budget to luxury',
          action: () => {/* Hotel booking specific action */}
        },
        {
          id: 'cabs',
          label: 'Cabs & Transport',
          icon: Car,
          description: 'Airport transfers and city travel',
          action: () => {/* Cab booking specific action */}
        },
        {
          id: 'packages',
          label: 'Holiday Packages',
          icon: Heart,
          description: 'Complete travel packages with flights & hotels',
          action: () => {/* Packages specific action */}
        },
        {
          id: 'visa',
          label: 'Visa Services',
          icon: Passport,
          description: 'Hassle-free visa assistance for international travel',
          action: () => {/* Visa services specific action */}
        },
        {
          id: 'insurance',
          label: 'Travel Insurance',
          icon: Umbrella,
          description: 'Comprehensive coverage for worry-free travel',
          action: () => {/* Insurance specific action */}
        },
        {
          id: 'groups',
          label: 'Group Bookings',
          icon: Users,
          description: 'Special rates for 10+ travelers',
          action: () => {/* Group booking specific action */}
        }
      ]
    },
    {
      id: 'destinations',
      label: 'Destinations',
      icon: MapPin,
      action: onNavigateToDestinations
    },
    {
      id: 'services',
      label: 'Services',
      submenu: [
        {
          id: 'loyalty',
          label: 'BluChip Rewards',
          icon: Award,
          description: 'Earn & redeem points on every journey',
          action: onNavigateToLoyalty
        },
        {
          id: 'checkIn',
          label: 'Web Check-In',
          icon: Calendar,
          description: 'Skip the line with easy online check-in',
          action: () => {/* Check-in specific action */}
        },
        {
          id: 'flightStatus',
          label: 'Flight Status',
          icon: Plane,
          description: 'Real-time updates on all IndiGo flights',
          action: () => {/* Flight status specific action */}
        },
        {
          id: 'manage',
          label: 'Manage Booking',
          icon: FileText,
          description: 'Change, upgrade or cancel your booking',
          action: () => {/* Manage booking specific action */}
        }
      ]
    },
    {
      id: 'company',
      label: 'Company',
      submenu: [
        {
          id: 'about',
          label: 'About Us',
          icon: Info,
          description: 'Our story, mission and values',
          action: onNavigateToAbout
        },
        {
          id: 'careers',
          label: 'Careers',
          icon: Briefcase,
          description: 'Join our growing team',
          action: onNavigateToCareers
        },
        {
          id: 'press',
          label: 'Press & Media',
          icon: Newspaper,
          description: 'Latest news and resources',
          action: onNavigateToPress
        },
        {
          id: 'blog',
          label: 'Blog',
          icon: FileText,
          description: 'Insights, stories and travel tips',
          action: onNavigateToBlog
        },
        {
          id: 'contact',
          label: 'Contact',
          icon: MessageSquare,
          description: 'Get in touch with our team',
          action: onNavigateToContact
        }
      ]
    },
    {
      id: 'help',
      label: 'Help',
      submenu: [
        {
          id: 'support',
          label: 'Customer Support',
          icon: PhoneCall,
          description: '24/7 assistance for all your needs',
          action: onNavigateToContact
        },
        {
          id: 'faq',
          label: 'FAQs',
          icon: HelpCircle,
          description: 'Answers to common questions',
          action: () => {/* FAQ specific action */}
        },
        {
          id: 'baggage',
          label: 'Baggage Information',
          icon: Briefcase,
          description: 'Rules, allowances and services',
          action: () => {/* Baggage info specific action */}
        },
        {
          id: 'policies',
          label: 'Travel Policies',
          icon: ShieldCheck,
          description: 'Guidelines and regulations',
          action: () => {/* Policies specific action */}
        }
      ]
    }
  ];

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, menuId: string) => {
    if (e.key === 'Escape') {
      setActiveSubmenu(null);
      setIsSearchOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
    }
  };

  const toggleSubmenu = (menuId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky 
          ? 'bg-white shadow-elevation-2' 
          : 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-xl shadow-elevation-1">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-h5 font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              IndiGo
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
            {navigationItems.map(item => (
              <div key={item.id} className="relative group">
                {item.submenu ? (
                  <>
                    <button 
                      aria-expanded={activeSubmenu === item.id}
                      aria-controls={`${item.id}-dropdown`}
                      className={`text-body1 hover:text-primary transition-colors duration-200 font-medium focus-ring rounded-lg px-4 py-3 flex items-center space-x-2 ${
                        activeSubmenu === item.id ? 'text-primary bg-gray-50' : 'text-secondary'
                      }`}
                      onClick={(e) => toggleSubmenu(item.id, e)}
                      onKeyDown={(e) => handleKeyDown(e, item.id)}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      <span>{item.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                        activeSubmenu === item.id ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div 
                      id={`${item.id}-dropdown`}
                      className={`absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-elevation-3 border border-gray-200 transition-all duration-300 ${
                        activeSubmenu === item.id
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible translate-y-2 pointer-events-none'
                      }`}
                      style={{ width: item.id === 'bookTravel' || item.id === 'services' ? '520px' : '320px' }}
                    >
                      <div className="p-6">
                        <div className={`${
                          item.id === 'bookTravel' || item.id === 'services' ? 'grid grid-cols-2 gap-3' : 'space-y-2'
                        }`}>
                          {item.submenu.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={() => {
                                if (subItem.action) subItem.action();
                                setActiveSubmenu(null);
                              }}
                              className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-start space-x-3"
                              aria-label={subItem.label}
                            >
                              <div className={`bg-${getIconColor(subItem.id)}-100 rounded-xl p-2 mt-1`}>
                                <subItem.icon className={`h-5 w-5 text-${getIconColor(subItem.id)}-600`} />
                              </div>
                              <div>
                                <p className="text-body1 font-medium text-primary">{subItem.label}</p>
                                {subItem.description && (
                                  <p className="text-body2 text-secondary">{subItem.description}</p>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <button 
                    onClick={item.action}
                    className="text-body1 text-secondary hover:text-primary transition-colors duration-200 font-medium focus-ring rounded-lg px-4 py-3 flex items-center space-x-2"
                    aria-label={item.label}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Right-side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button/Form */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="absolute right-0 top-0 w-72 bg-white rounded-lg shadow-elevation-2 border border-gray-200 p-2 z-20">
                  <div className="flex items-center">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search flights, destinations..."
                      className="input-box py-2 flex-grow"
                      aria-label="Search"
                    />
                    <button 
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      aria-label="Close search"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 rounded-xl text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200 focus-ring"
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <button 
              className="relative p-2.5 rounded-xl text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200 focus-ring"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {hasNotifications && (
                <div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full animate-pulse"
                  aria-label="New notifications"
                ></div>
              )}
            </button>

            <button 
              className="btn-contained bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-elevation-1 hover:shadow-elevation-2 ripple"
              aria-label="Sign In"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 xl:hidden">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 rounded-xl text-secondary hover:text-primary hover:bg-gray-100 transition-colors duration-200 focus-ring"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
            >
              <Search className="h-5 w-5" />
            </button>
            
            <button
              className="p-2.5 rounded-xl text-secondary hover:text-primary hover:bg-gray-100 transition-colors duration-200 focus-ring"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="py-3 pb-6 xl:hidden">
            <div className="floating-label">
              <input
                ref={searchInputRef}
                type="text"
                className="input-box"
                placeholder=" "
                id="mobile-search"
              />
              <label htmlFor="mobile-search">Search flights, destinations...</label>
              <div className="absolute right-4 top-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="xl:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-elevation-2 py-4 animate-slide-up max-h-[80vh] overflow-y-auto"
          >
            <nav className="flex flex-col space-y-1 px-4" aria-label="Mobile Navigation">
              {navigationItems.map(item => (
                <div key={item.id}>
                  {item.submenu ? (
                    <div className="mb-2">
                      <button 
                        onClick={() => toggleSubmenu(item.id)}
                        className="w-full text-left text-body1 text-primary font-semibold py-3 px-3 rounded-lg hover:bg-gray-50 flex items-center justify-between"
                        aria-expanded={activeSubmenu === item.id}
                        aria-controls={`mobile-${item.id}-menu`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          activeSubmenu === item.id ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {activeSubmenu === item.id && (
                        <div 
                          id={`mobile-${item.id}-menu`}
                          className="pl-4 space-y-1 pt-1 pb-2"
                        >
                          {item.submenu.map(subItem => (
                            <button
                              key={subItem.id}
                              onClick={() => {
                                if (subItem.action) subItem.action();
                                setIsMenuOpen(false);
                                setActiveSubmenu(null);
                              }}
                              className="w-full text-left text-body1 text-secondary hover:text-primary transition-colors duration-200 font-medium py-3 px-3 rounded-lg hover:bg-gray-50 flex items-center space-x-3"
                              aria-label={subItem.label}
                            >
                              <subItem.icon className="h-5 w-5" />
                              <span>{subItem.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (item.action) item.action();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left text-body1 text-secondary hover:text-primary transition-colors duration-200 font-medium py-3 px-3 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                      aria-label={item.label}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      <span>{item.label}</span>
                    </button>
                  )}
                </div>
              ))}
              
              {/* Mobile User Actions */}
              <div className="pt-4 border-t border-gray-100 mt-2 space-y-3">
                <button className="w-full btn-contained bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Helper function to determine icon colors based on ID
function getIconColor(id: string): string {
  const colorMap: {[key: string]: string} = {
    flights: 'primary',
    hotels: 'success',
    cabs: 'warning',
    packages: 'error',
    groups: 'secondary',
    visa: 'error',
    insurance: 'primary',
    aiFeatures: 'primary',
    loyalty: 'warning',
    checkIn: 'success',
    flightStatus: 'secondary',
    manage: 'primary',
    about: 'primary',
    careers: 'secondary',
    press: 'success',
    blog: 'warning',
    contact: 'error',
    support: 'success',
    faq: 'primary',
    baggage: 'secondary',
    policies: 'warning'
  };
  
  return colorMap[id] || 'primary';
}

export default Header;