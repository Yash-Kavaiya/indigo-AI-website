import React, { useState } from 'react';
import { 
  ArrowLeft, Luggage, Search, ShoppingBag, AlertTriangle, Check, 
  Info, Package, ArrowRight, CreditCard, Plane, Shield, Clock,
  Briefcase, FileText, ChevronDown, ChevronUp, Truck, Music, Umbrella, 
  Scissors, Gift, Zap, RotateCcw, Scale
} from 'lucide-react';

const BaggageInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'carryon' | 'checked' | 'special' | 'prohibited' | 'tracking'>('carryon');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['dimensions']));
  
  const handleBack = () => {
    window.history.back();
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  // Baggage allowance data
  const cabinBaggageAllowance = {
    economy: {
      domestic: '7 kg',
      international: '7 kg',
      dimensions: '55 × 35 × 25 cm',
      items: '1 bag + 1 personal item'
    },
    business: {
      domestic: '10 kg',
      international: '10 kg',
      dimensions: '55 × 40 × 25 cm',
      items: '1 bag + 1 personal item + 1 laptop bag'
    }
  };

  const checkedBaggageAllowance = {
    economy: {
      domestic: '15 kg',
      asiaME: '25 kg', // Asia & Middle East
      europeAmericas: '30 kg', // Europe & Americas
      dimensions: '158 cm (L + W + H)',
      maxWeight: '32 kg per piece'
    },
    business: {
      domestic: '25 kg',
      asiaME: '35 kg', // Asia & Middle East
      europeAmericas: '40 kg', // Europe & Americas
      dimensions: '158 cm (L + W + H)',
      maxWeight: '32 kg per piece'
    }
  };

  // Excess baggage rates
  const excessBaggageRates = {
    domestic: {
      preBooking: '₹750 per kg',
      airport: '₹1,000 per kg'
    },
    shortHaul: {
      preBooking: '₹1,500 per kg',
      airport: '₹2,000 per kg'
    },
    longHaul: {
      preBooking: '₹2,000 per kg',
      airport: '₹2,500 per kg'
    }
  };

  // Special items handling
  const specialItems = [
    {
      id: 'sports',
      title: 'Sports Equipment',
      icon: Briefcase,
      content: 'Sports equipment such as golf bags, surf boards, skis, fishing equipment, and bicycles requires special handling. Fees range from ₹2,500 to ₹5,000 per item depending on size and weight. All items must be properly packed in protective cases.',
      allowance: 'Up to 23kg per item'
    },
    {
      id: 'musical',
      title: 'Musical Instruments',
      icon: Music,
      content: 'Small musical instruments (violins, flutes) can be carried as cabin baggage if they fit under the seat. Larger instruments (guitars, cellos) require a separate seat purchase or must be checked in with special handling fees of ₹2,000 to ₹4,000 depending on size.',
      allowance: 'Varies by instrument size'
    },
    {
      id: 'electronics',
      title: 'Electronic Equipment',
      icon: Zap,
      content: 'Professional electronic equipment (cameras, filming equipment, etc.) can be carried as cabin baggage if within size limits. Lithium batteries must be removed and carried in cabin baggage. Additional fees may apply for oversize professional equipment.',
      allowance: 'Within standard cabin baggage limits'
    },
    {
      id: 'medical',
      title: 'Medical Equipment',
      icon: Umbrella,
      content: 'Essential medical equipment is permitted free of charge in addition to your standard baggage allowance. This includes wheelchairs, CPAP machines, and portable oxygen concentrators. Please inform us at least 48 hours before your flight.',
      allowance: 'Free of charge, not counted toward allowance'
    },
    {
      id: 'fragile',
      title: 'Fragile Items',
      icon: Package,
      content: 'Items marked as fragile receive special handling. These must be properly packed in rigid containers with appropriate padding. A handling fee of ₹1,000 applies. The airline assumes limited liability for damage to fragile items.',
      allowance: 'Counts toward checked baggage allowance'
    }
  ];

  // Prohibited items
  const prohibitedItems = [
    { 
      category: 'Dangerous Goods', 
      items: [
        'Flammable liquids and solids', 
        'Compressed gases and aerosols', 
        'Toxic or infectious substances', 
        'Radioactive materials', 
        'Corrosives', 
        'Oxidizers and organic peroxides',
        'Explosives and fireworks',
        'Firearms and ammunition (without proper authorization)'
      ],
      icon: AlertTriangle 
    },
    { 
      category: 'Sharp Objects', 
      items: [
        'Knives (with blades longer than 6 cm)',
        'Scissors with pointed blades',
        'Razor blades (not in cartridge)',
        'Martial arts equipment with sharp edges',
        'Axes and hatchets',
        'Ice picks',
        'Meat cleavers'
      ],
      icon: Scissors
    },
    { 
      category: 'Restricted Liquids', 
      items: [
        'Liquids in containers larger than 100ml in cabin baggage',
        'Alcoholic beverages over 70% ABV',
        'Mercury thermometers or barometers',
        'Bleach and chlorine products',
        'Liquid-based lighters'
      ],
      icon: ShoppingBag
    },
    { 
      category: 'Other Prohibited Items', 
      items: [
        'Illegal narcotics and drugs',
        'Poisonous materials',
        'Live animals (without proper authorization)',
        'Perishable items (without proper packaging)',
        'Items with strong odors',
        'Counterfeit goods or illegal merchandise'
      ],
      icon: Gift
    }
  ];

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white shadow-elevation-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleBack}
                className="btn-text text-white hover:bg-white/20 p-2"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-2xl p-3">
                  <Luggage className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-h4 font-bold">Baggage Information</h1>
                  <p className="text-primary-200 text-body2">Everything you need to know about your baggage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Search Bar */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search baggage information..."
              className="input-box w-full pl-14 py-4 text-lg"
              aria-label="Search baggage information"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-10 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {[
              { id: 'carryon', label: 'Carry-on Baggage', icon: ShoppingBag },
              { id: 'checked', label: 'Checked Baggage', icon: Luggage },
              { id: 'special', label: 'Special Items', icon: Package },
              { id: 'prohibited', label: 'Prohibited Items', icon: AlertTriangle },
              { id: 'tracking', label: 'Baggage Tracking', icon: RotateCcw }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-lg flex items-center space-x-2 whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Baggage Allowance Summary */}
        <div className="card-elevated p-8 mb-10">
          <h2 className="text-h3 text-primary mb-6 text-center">Baggage Allowance Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Cabin Class</th>
                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Route Type</th>
                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Cabin Baggage</th>
                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Checked Baggage</th>
                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Maximum Dimensions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-medium" rowSpan={2}>Economy Class</td>
                  <td className="p-4">Domestic</td>
                  <td className="p-4">{cabinBaggageAllowance.economy.domestic}</td>
                  <td className="p-4">{checkedBaggageAllowance.economy.domestic}</td>
                  <td className="p-4" rowSpan={2}>Cabin: {cabinBaggageAllowance.economy.dimensions}<br />Checked: {checkedBaggageAllowance.economy.dimensions}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4">International</td>
                  <td className="p-4">{cabinBaggageAllowance.economy.international}</td>
                  <td className="p-4">Asia/ME: {checkedBaggageAllowance.economy.asiaME}<br />Europe/Americas: {checkedBaggageAllowance.economy.europeAmericas}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-medium" rowSpan={2}>Business Class</td>
                  <td className="p-4">Domestic</td>
                  <td className="p-4">{cabinBaggageAllowance.business.domestic}</td>
                  <td className="p-4">{checkedBaggageAllowance.business.domestic}</td>
                  <td className="p-4" rowSpan={2}>Cabin: {cabinBaggageAllowance.business.dimensions}<br />Checked: {checkedBaggageAllowance.business.dimensions}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4">International</td>
                  <td className="p-4">{cabinBaggageAllowance.business.international}</td>
                  <td className="p-4">Asia/ME: {checkedBaggageAllowance.business.asiaME}<br />Europe/Americas: {checkedBaggageAllowance.business.europeAmericas}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <Info className="h-4 w-4 inline-block mr-1" /> Allowances may vary for specific routes, fare types, or codeshare flights. Please refer to your booking confirmation for the exact baggage allowance.
          </p>
        </div>

        {/* Main Content Sections */}
        {activeTab === 'carryon' && (
          <div className="space-y-8">
            <div className="card p-8">
              <button 
                className="flex items-start justify-between w-full text-left"
                onClick={() => toggleSection('dimensions')}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 rounded-full p-3 mt-1">
                    <ShoppingBag className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-h4 text-primary mb-2">Carry-On Baggage Dimensions</h3>
                    <p className="text-body1 text-secondary">Size and weight restrictions for cabin baggage</p>
                  </div>
                </div>
                {expandedSections.has('dimensions') ? (
                  <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                )}
              </button>
              
              {expandedSections.has('dimensions') && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-h5 text-primary mb-4">Size Restrictions</h4>
                      <p className="text-body1 text-secondary mb-4">
                        Your carry-on bag must not exceed the following dimensions:
                      </p>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-center">
                          <div className="relative">
                            {/* Simple visualization of a suitcase with dimensions */}
                            <div className="w-48 h-64 border-4 border-primary-500 rounded-lg relative mx-auto">
                              {/* Height label */}
                              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 -rotate-90">
                                <span className="text-sm font-medium">55 cm</span>
                              </div>
                              {/* Width label */}
                              <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2">
                                <span className="text-sm font-medium">35 cm</span>
                              </div>
                              {/* Depth label */}
                              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 rotate-90">
                                <span className="text-sm font-medium">25 cm</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-10">
                          <p className="text-h5 font-medium text-primary">55 × 35 × 25 cm</p>
                          <p className="text-body2 text-secondary">(Height × Width × Depth)</p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <p className="text-body2 text-secondary">
                          <Info className="h-4 w-4 inline mr-1 text-primary-500" />
                          These dimensions include wheels, handles, side pockets, and other protruding parts.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-h5 text-primary mb-4">Weight & Quantity Limits</h4>
                      <div className="card p-6 bg-gray-50 mb-6">
                        <h5 className="text-h6 text-primary mb-3">Economy Class</h5>
                        <ul className="space-y-3">
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-body1">One carry-on bag up to 7 kg</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-body1">One personal item (purse, laptop bag, etc.)</span>
                          </li>
                          <li className="flex items-center">
                            <Info className="h-5 w-5 text-warning-500 mr-3 flex-shrink-0" />
                            <span className="text-body1">Personal item must fit under the seat</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="card p-6 bg-gray-50">
                        <h5 className="text-h6 text-primary mb-3">Business Class</h5>
                        <ul className="space-y-3">
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-body1">One carry-on bag up to 10 kg</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-body1">One personal item (purse, laptop bag, etc.)</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-body1">One additional laptop bag</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="card p-8">
              <button 
                className="flex items-start justify-between w-full text-left"
                onClick={() => toggleSection('carryon-restrictions')}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-warning-100 rounded-full p-3 mt-1">
                    <AlertTriangle className="h-6 w-6 text-warning-600" />
                  </div>
                  <div>
                    <h3 className="text-h4 text-primary mb-2">Carry-On Restrictions</h3>
                    <p className="text-body1 text-secondary">Important rules for cabin baggage</p>
                  </div>
                </div>
                {expandedSections.has('carryon-restrictions') ? (
                  <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                )}
              </button>
              
              {expandedSections.has('carryon-restrictions') && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-h5 text-primary mb-4">Liquids Rule</h4>
                      <div className="card p-6 bg-gray-50">
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-body1 font-medium text-primary mb-1">100ml Container Limit</p>
                              <p className="text-body2 text-secondary">All liquids, aerosols, gels, creams, and pastes must be in containers of 100ml (3.4 oz) or less.</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-body1 font-medium text-primary mb-1">Clear Plastic Bag Required</p>
                              <p className="text-body2 text-secondary">These containers must be placed in a single, transparent, resealable plastic bag with a capacity not exceeding 1 liter.</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-body1 font-medium text-primary mb-1">Security Screening</p>
                              <p className="text-body2 text-secondary">The plastic bag must be presented separately at security screening.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-h5 text-primary mb-4">Exemptions & Special Cases</h4>
                      <div className="card p-6 bg-gray-50">
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-body1 font-medium text-primary mb-1">Medications</p>
                              <p className="text-body2 text-secondary">Essential liquid medications are exempt from volume restrictions but require documentation.</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-body1 font-medium text-primary mb-1">Baby Food</p>
                              <p className="text-body2 text-secondary">Baby food, milk, and formula are exempt when traveling with an infant.</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-body1 font-medium text-primary mb-1">Duty-Free Items</p>
                              <p className="text-body2 text-secondary">Duty-free liquids purchased at the airport are permitted if sealed in a security tamper-evident bag with proof of purchase.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="card p-8">
              <button 
                className="flex items-start justify-between w-full text-left"
                onClick={() => toggleSection('carryon-tips')}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-success-100 rounded-full p-3 mt-1">
                    <Check className="h-6 w-6 text-success-600" />
                  </div>
                  <div>
                    <h3 className="text-h4 text-primary mb-2">Carry-On Packing Tips</h3>
                    <p className="text-body1 text-secondary">How to maximize your cabin baggage allowance</p>
                  </div>
                </div>
                {expandedSections.has('carryon-tips') ? (
                  <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                )}
              </button>
              
              {expandedSections.has('carryon-tips') && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-h5 text-primary mb-4">Smart Packing Strategies</h4>
                      <div className="card p-6 bg-gray-50">
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-body2 text-secondary">Use packing cubes to organize and compress clothing.</p>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-body2 text-secondary">Roll clothes instead of folding to save space and reduce wrinkles.</p>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-body2 text-secondary">Wear your heaviest items during travel (jacket, boots) to save baggage weight.</p>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-body2 text-secondary">Choose multi-purpose clothing items that can be mixed and matched.</p>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-body2 text-secondary">Pack solid toiletries (shampoo bars, solid perfume) to avoid liquid restrictions.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-h5 text-primary mb-4">Essential Carry-On Items</h4>
                      <div className="card p-6 bg-gray-50">
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-body2 text-secondary">Important documents: Passport, ID, booking confirmation, and travel insurance.</p>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-body2 text-secondary">Medications and prescriptions in original packaging.</p>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-body2 text-secondary">Valuables: Electronics, jewelry, and other high-value items.</p>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-body2 text-secondary">Change of clothes and basic toiletries in case of checked baggage delay.</p>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-body2 text-secondary">Power bank and chargers for electronic devices.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'checked' && (
          <div className="space-y-8">
            <div className="card p-8">
              <button 
                className="flex items-start justify-between w-full text-left"
                onClick={() => toggleSection('weight-dimensions')}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 rounded-full p-3 mt-1">
                    <Scale className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-h4 text-primary mb-2">Weight & Dimensions</h3>
                    <p className="text-body1 text-secondary">Standard checked baggage allowance details</p>
                  </div>
                </div>
                {expandedSections.has('weight-dimensions') ? (
                  <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                )}
              </button>
              
              {expandedSections.has('weight-dimensions') && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-h5 text-primary mb-4">Standard Allowance by Route</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                          <thead>
                            <tr>
                              <th className="p-3 bg-gray-50 text-left text-primary font-semibold">Route Type</th>
                              <th className="p-3 bg-gray-50 text-left text-primary font-semibold">Economy Class</th>
                              <th className="p-3 bg-gray-50 text-left text-primary font-semibold">Business Class</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-100">
                              <td className="p-3 font-medium">Domestic</td>
                              <td className="p-3">{checkedBaggageAllowance.economy.domestic}</td>
                              <td className="p-3">{checkedBaggageAllowance.business.domestic}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="p-3 font-medium">Asia & Middle East</td>
                              <td className="p-3">{checkedBaggageAllowance.economy.asiaME}</td>
                              <td className="p-3">{checkedBaggageAllowance.business.asiaME}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="p-3 font-medium">Europe & Americas</td>
                              <td className="p-3">{checkedBaggageAllowance.economy.europeAmericas}</td>
                              <td className="p-3">{checkedBaggageAllowance.business.europeAmericas}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-h5 text-primary mb-4">Size and Weight Limits</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card p-6 bg-gray-50">
                          <h5 className="text-h6 text-primary mb-3">Maximum Dimensions</h5>
                          <p className="text-body1 mb-4">
                            Sum of length + width + height must not exceed <span className="font-semibold">158 cm</span>.
                          </p>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            {/* Simple visualization of a suitcase */}
                            <div className="flex justify-center">
                              <div className="relative">
                                <div className="w-48 h-64 border-4 border-primary-300 rounded-lg relative mx-auto">
                                  {/* Labels */}
                                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 -rotate-90">
                                    <span className="text-sm font-medium">Height</span>
                                  </div>
                                  <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2">
                                    <span className="text-sm font-medium">Width</span>
                                  </div>
                                  <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 rotate-90">
                                    <span className="text-sm font-medium">Depth</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-center mt-8 text-sm text-gray-600">
                              (Height + Width + Depth) ≤ 158 cm
                            </p>
                          </div>
                        </div>
                        
                        <div className="card p-6 bg-gray-50">
                          <h5 className="text-h6 text-primary mb-3">Maximum Weight Per Piece</h5>
                          <ul className="space-y-4">
                            <li className="flex items-center">
                              <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                              <span className="text-body1">Standard limit: <span className="font-semibold">32 kg (70 lbs)</span> per piece</span>
                            </li>
                            <li className="flex items-center">
                              <Info className="h-5 w-5 text-warning-500 mr-3 flex-shrink-0" />
                              <span className="text-body1">Bags over 32 kg cannot be accepted as checked baggage</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                              <span className="text-body1">Heavy items should be packed in smaller bags</span>
                            </li>
                            <li className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-body1">For health and safety reasons, we cannot accept individual items weighing more than 32 kg</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="card p-8">
              <button 
                className="flex items-start justify-between w-full text-left"
                onClick={() => toggleSection('excess-baggage')}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-warning-100 rounded-full p-3 mt-1">
                    <CreditCard className="h-6 w-6 text-warning-600" />
                  </div>
                  <div>
                    <h3 className="text-h4 text-primary mb-2">Excess Baggage Charges</h3>
                    <p className="text-body1 text-secondary">Fees for baggage exceeding your allowance</p>
                  </div>
                </div>
                {expandedSections.has('excess-baggage') ? (
                  <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                )}
              </button>
              
              {expandedSections.has('excess-baggage') && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-h5 text-primary mb-4">Excess Baggage Rates</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                          <thead>
                            <tr>
                              <th className="p-3 bg-gray-50 text-left text-primary font-semibold">Route</th>
                              <th className="p-3 bg-gray-50 text-left text-primary font-semibold">Pre-booking Online</th>
                              <th className="p-3 bg-gray-50 text-left text-primary font-semibold">Airport Rate</th>
                              <th className="p-3 bg-gray-50 text-left text-primary font-semibold">Savings</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-100">
                              <td className="p-3 font-medium">Domestic</td>
                              <td className="p-3">{excessBaggageRates.domestic.preBooking}</td>
                              <td className="p-3">{excessBaggageRates.domestic.airport}</td>
                              <td className="p-3 text-success-600">25%</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="p-3 font-medium">Short-haul International<br /><span className="font-normal text-sm">(Asia, Middle East)</span></td>
                              <td className="p-3">{excessBaggageRates.shortHaul.preBooking}</td>
                              <td className="p-3">{excessBaggageRates.shortHaul.airport}</td>
                              <td className="p-3 text-success-600">25%</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="p-3 font-medium">Long-haul International<br /><span className="font-normal text-sm">(Europe, Americas)</span></td>
                              <td className="p-3">{excessBaggageRates.longHaul.preBooking}</td>
                              <td className="p-3">{excessBaggageRates.longHaul.airport}</td>
                              <td className="p-3 text-success-600">20%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                        <Info className="h-4 w-4 inline-block mr-1" /> Pre-booking excess baggage online can save you up to 25% compared to airport rates.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-h5 text-primary mb-4">How to Purchase Extra Baggage</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card p-6 bg-gray-50 text-center">
                          <div className="bg-primary-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-primary-600" />
                          </div>
                          <h5 className="text-h6 text-primary mb-2">Online</h5>
                          <p className="text-body2 text-secondary mb-3">
                            Pre-purchase through "Manage Booking" up to 4 hours before departure.
                          </p>
                          <span className="inline-block bg-success-100 text-success-700 px-3 py-1 rounded-full text-xs font-medium">
                            Best Value
                          </span>
                        </div>
                        
                        <div className="card p-6 bg-gray-50 text-center">
                          <div className="bg-secondary-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <Phone className="h-6 w-6 text-secondary-600" />
                          </div>
                          <h5 className="text-h6 text-primary mb-2">Call Center</h5>
                          <p className="text-body2 text-secondary">
                            Call our customer service to add extra baggage to your booking.
                          </p>
                        </div>
                        
                        <div className="card p-6 bg-gray-50 text-center">
                          <div className="bg-warning-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-warning-600" />
                          </div>
                          <h5 className="text-h6 text-primary mb-2">Airport Counter</h5>
                          <p className="text-body2 text-secondary">
                            Purchase at check-in counter (higher rates apply).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="card p-8">
              <button 
                className="flex items-start justify-between w-full text-left"
                onClick={() => toggleSection('special-handling')}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-success-100 rounded-full p-3 mt-1">
                    <Luggage className="h-6 w-6 text-success-600" />
                  </div>
                  <div>
                    <h3 className="text-h4 text-primary mb-2">Special Handling & Packing</h3>
                    <p className="text-body1 text-secondary">Requirements for safely packing checked baggage</p>
                  </div>
                </div>
                {expandedSections.has('special-handling') ? (
                  <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                )}
              </button>
              
              {expandedSections.has('special-handling') && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-h5 text-primary mb-4">Packing Guidelines</h4>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-body1 font-medium text-primary mb-1">Use Sturdy Luggage</p>
                            <p className="text-body2 text-secondary">Choose durable suitcases with secure locks and reinforced corners.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-body1 font-medium text-primary mb-1">Protect Fragile Items</p>
                            <p className="text-body2 text-secondary">Wrap fragile items in clothing or bubble wrap and place in the center of your luggage.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-body1 font-medium text-primary mb-1">Pack Valuables in Carry-on</p>
                            <p className="text-body2 text-secondary">Keep valuables, medications, and important documents in your carry-on baggage.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-body1 font-medium text-primary mb-1">Use Luggage Tags</p>
                            <p className="text-body2 text-secondary">Attach visible luggage tags with your contact information both inside and outside your baggage.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-h5 text-primary mb-4">Restricted Packing Items</h4>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-body1 font-medium text-primary mb-1">No Lithium Batteries</p>
                            <p className="text-body2 text-secondary">Spare lithium batteries are not permitted in checked baggage and must be carried in cabin baggage.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-body1 font-medium text-primary mb-1">No E-Cigarettes</p>
                            <p className="text-body2 text-secondary">Electronic cigarettes and portable power banks must be carried in cabin baggage only.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-body1 font-medium text-primary mb-1">No Dangerous Goods</p>
                            <p className="text-body2 text-secondary">Flammable items, compressed gases, and other hazardous materials are prohibited.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-body1 font-medium text-primary mb-1">Liquids Limitation</p>
                            <p className="text-body2 text-secondary">Seal liquid containers properly and pack in plastic bags to prevent leakage.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-warning-50 border border-warning-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-6 w-6 text-warning-600 mt-0.5" />
                      <div>
                        <h5 className="text-h6 text-warning-700 mb-2">Important Notice</h5>
                        <p className="text-body2 text-warning-600 mb-2">
                          The airline reserves the right to open and inspect any checked baggage for security reasons. For security and safety reasons, unattended baggage will be removed and may be destroyed.
                        </p>
                        <p className="text-body2 text-warning-600">
                          Please ensure your baggage does not contain any prohibited items. Undeclared or concealed dangerous goods are a violation of aviation regulations and may result in penalties.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'special' && (
          <div className="space-y-8">
            {specialItems.map(item => (
              <div className="card p-8" key={item.id}>
                <button 
                  className="flex items-start justify-between w-full text-left"
                  onClick={() => toggleSection(item.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 rounded-full p-3 mt-1">
                      <item.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-h4 text-primary mb-2">{item.title}</h3>
                      <p className="text-body1 text-secondary">Allowance: {item.allowance}</p>
                    </div>
                  </div>
                  {expandedSections.has(item.id) ? (
                    <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                  )}
                </button>
                
                {expandedSections.has(item.id) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-body1 text-secondary mb-6 leading-relaxed">
                      {item.content}
                    </p>
                    
                    <div className="flex">
                      <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50">
                        <FileText className="h-5 w-5" />
                        <span>Detailed Policy</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
              <h3 className="text-h4 text-primary mb-6">Pre-book Special Items</h3>
              <p className="text-body1 text-secondary mb-6">
                Pre-booking special items ensures smooth handling and often provides cost savings compared to airport rates. Please book special items at least 24 hours before your flight departure.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button className="card bg-white p-6 text-left hover:shadow-elevation-2 transition-all duration-300">
                  <div className="bg-primary-100 rounded-xl p-3 w-fit mb-4">
                    <CreditCard className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="text-h6 text-primary mb-2">Online Booking</h4>
                  <p className="text-body2 text-secondary mb-4">Add to your booking through Manage Booking section</p>
                  <div className="flex items-center text-primary-500">
                    <span className="text-sm font-medium">Book now</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </button>
                
                <button className="card bg-white p-6 text-left hover:shadow-elevation-2 transition-all duration-300">
                  <div className="bg-secondary-100 rounded-xl p-3 w-fit mb-4">
                    <Phone className="h-6 w-6 text-secondary-600" />
                  </div>
                  <h4 className="text-h6 text-primary mb-2">Call Center</h4>
                  <p className="text-body2 text-secondary mb-4">Contact our 24/7 customer service team</p>
                  <div className="flex items-center text-secondary-500">
                    <span className="text-sm font-medium">+91 9910 383 838</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </button>
                
                <button className="card bg-white p-6 text-left hover:shadow-elevation-2 transition-all duration-300">
                  <div className="bg-success-100 rounded-xl p-3 w-fit mb-4">
                    <MessageSquare className="h-6 w-6 text-success-600" />
                  </div>
                  <h4 className="text-h6 text-primary mb-2">Live Chat</h4>
                  <p className="text-body2 text-secondary mb-4">Chat with our support team for assistance</p>
                  <div className="flex items-center text-success-500">
                    <span className="text-sm font-medium">Start chat</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'prohibited' && (
          <div className="space-y-8">
            <div className="card p-8 bg-error-50 border border-error-200">
              <div className="flex items-start space-x-4">
                <div className="bg-error-100 p-3 rounded-full mt-1">
                  <AlertTriangle className="h-6 w-6 text-error-600" />
                </div>
                <div>
                  <h3 className="text-h4 text-error-700 mb-3">Safety & Security Notice</h3>
                  <p className="text-body1 text-error-600">
                    For the safety of all passengers and crew, certain items are prohibited or restricted on aircraft. 
                    Carrying prohibited items may result in delays, confiscation of the items, or denied boarding. 
                    Some violations may also lead to legal penalties.
                  </p>
                </div>
              </div>
            </div>

            {prohibitedItems.map((category, index) => (
              <div className="card p-8" key={index}>
                <div className="flex items-start space-x-4">
                  <div className="bg-warning-100 rounded-full p-3 mt-1">
                    <category.icon className="h-6 w-6 text-warning-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-h4 text-primary mb-4">{category.category}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.items.map((item, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-warning-500 mt-0.5 flex-shrink-0" />
                          <p className="text-body1 text-secondary">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="card p-8 bg-gray-50">
              <h3 className="text-h4 text-primary mb-6 text-center">Special Exceptions & Permissions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-h5 text-primary mb-4">Items Allowed with Restrictions</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-body1 font-medium text-primary mb-1">Medications</p>
                        <p className="text-body2 text-secondary">Prescription medications in original packaging with prescription or doctor's note.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-body1 font-medium text-primary mb-1">Medical Devices</p>
                        <p className="text-body2 text-secondary">Necessary medical devices like nebulizers, CPAP machines with prior approval.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-body1 font-medium text-primary mb-1">Baby Food & Formula</p>
                        <p className="text-body2 text-secondary">Reasonable quantities for journey duration when traveling with an infant.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-h5 text-primary mb-4">How to Request Special Permission</h4>
                  <div className="card p-6 bg-white">
                    <p className="text-body1 text-secondary mb-4">
                      For items that require special permission or have exemptions, please follow these steps:
                    </p>
                    <ol className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center text-primary-600 font-bold mr-3 mt-0.5">
                          1
                        </div>
                        <p className="text-body2 text-secondary">Contact our Special Handling department at least 48 hours before your flight</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center text-primary-600 font-bold mr-3 mt-0.5">
                          2
                        </div>
                        <p className="text-body2 text-secondary">Provide documentation supporting your request (medical certificates, etc.)</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center text-primary-600 font-bold mr-3 mt-0.5">
                          3
                        </div>
                        <p className="text-body2 text-secondary">Obtain written approval to present at security and check-in</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center text-primary-600 font-bold mr-3 mt-0.5">
                          4
                        </div>
                        <p className="text-body2 text-secondary">Arrive early at the airport for additional screening if required</p>
                      </li>
                    </ol>
                    <div className="mt-4">
                      <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50">
                        <Phone className="h-5 w-5" />
                        <span>Contact Special Handling</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'tracking' && (
          <div className="space-y-8">
            <div className="card p-8">
              <h3 className="text-h4 text-primary mb-6">Baggage Tracking System</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-h5 text-primary mb-4">How to Track Your Baggage</h4>
                  <div className="card p-6 bg-gray-50 mb-6">
                    <p className="text-body1 text-secondary mb-4">
                      Our digital baggage tracking system allows you to monitor your checked baggage throughout your journey:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center text-primary-600 font-bold mr-3 mt-0.5">
                          1
                        </div>
                        <p className="text-body1 text-secondary">Locate your Baggage Tag Number on your baggage receipt</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center text-primary-600 font-bold mr-3 mt-0.5">
                          2
                        </div>
                        <p className="text-body1 text-secondary">Enter the number in our mobile app or website's "Track Baggage" section</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center text-primary-600 font-bold mr-3 mt-0.5">
                          3
                        </div>
                        <p className="text-body1 text-secondary">Receive real-time updates on your baggage status and location</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center text-primary-600 font-bold mr-3 mt-0.5">
                          4
                        </div>
                        <p className="text-body1 text-secondary">Get notifications when your baggage is loaded, in transit, and ready for collection</p>
                      </li>
                    </ul>
                  </div>

                  <h4 className="text-h5 text-primary mb-4">Baggage Tracking Tool</h4>
                  <div className="card p-6 bg-gray-50">
                    <div className="flex flex-col space-y-4">
                      <div className="floating-label">
                        <input
                          type="text"
                          className="input-box"
                          placeholder=" "
                          id="baggage-tag"
                        />
                        <label htmlFor="baggage-tag">Baggage Tag Number (10 digits)</label>
                      </div>
                      
                      <div className="floating-label">
                        <input
                          type="text"
                          className="input-box"
                          placeholder=" "
                          id="last-name"
                        />
                        <label htmlFor="last-name">Last Name</label>
                      </div>
                      
                      <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                        <Search className="h-5 w-5" />
                        <span>Track Baggage</span>
                      </button>
                      
                      <p className="text-sm text-gray-500 text-center mt-2">
                        <Info className="h-4 w-4 inline-block mr-1" /> You can also track your baggage through our mobile app for real-time updates.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-h5 text-primary mb-4">Lost or Delayed Baggage</h4>
                  <div className="card p-6 bg-gray-50">
                    <p className="text-body1 text-secondary mb-4">
                      If your baggage is delayed, damaged, or missing, please follow these steps:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-body1 font-medium text-primary mb-1">Report Immediately</p>
                          <p className="text-body2 text-secondary">Contact our baggage service desk at the arrival airport before leaving the terminal area.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <FileText className="h-5 w-5 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-body1 font-medium text-primary mb-1">File a Property Irregularity Report (PIR)</p>
                          <p className="text-body2 text-secondary">Our staff will assist you in filing a report and provide a reference number for tracking.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Package className="h-5 w-5 text-secondary-500 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-body1 font-medium text-primary mb-1">Provide Details</p>
                          <p className="text-body2 text-secondary">Share accurate description of your baggage, including size, color, and any distinguishing features.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-body1 font-medium text-primary mb-1">Stay Informed</p>
                          <p className="text-body2 text-secondary">Track the status of your claim using the reference number provided.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-6 bg-warning-50 border border-warning-200 mt-6">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-6 w-6 text-warning-600 mt-0.5" />
                      <div>
                        <h5 className="text-h6 text-warning-700 mb-2">Time Limitations</h5>
                        <p className="text-body2 text-warning-600 mb-2">
                          Please note the following time limitations for baggage claims:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="w-5 text-warning-700 mr-2">•</span>
                            <span className="text-body2 text-warning-600">Delayed Baggage: Report within 21 days of receiving your baggage</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-5 text-warning-700 mr-2">•</span>
                            <span className="text-body2 text-warning-600">Damaged Baggage: Report immediately at the airport and file a claim within 7 days</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-5 text-warning-700 mr-2">•</span>
                            <span className="text-body2 text-warning-600">Lost Baggage: A bag is considered lost if not found within 21 days</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white flex-1">
                      <FileText className="h-5 w-5" />
                      <span>File a Baggage Claim</span>
                    </button>
                    <button className="btn-outlined border-secondary-500 text-secondary-500 hover:bg-secondary-50 flex-1">
                      <Search className="h-5 w-5" />
                      <span>Check Claim Status</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
              <h3 className="text-h4 text-primary mb-6 text-center">Baggage Protection Services</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-elevation-1">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 rounded-xl p-3 mt-1">
                        <Shield className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="text-h5 text-primary mb-3">Baggage Insurance</h4>
                        <p className="text-body1 text-secondary mb-4">
                          Protect your baggage against loss, damage, or theft with our comprehensive baggage insurance.
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-body2 text-secondary">Coverage up to ₹50,000</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-body2 text-secondary">Fast claims processing</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-body2 text-secondary">24/7 assistance</span>
                          </li>
                        </ul>
                        <div className="mt-6">
                          <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white w-full">
                            <span>Add Insurance - ₹599</span>
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-elevation-1">
                    <div className="flex items-start space-x-4">
                      <div className="bg-secondary-100 rounded-xl p-3 mt-1">
                        <Truck className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div>
                        <h4 className="text-h5 text-primary mb-3">Baggage Delivery Service</h4>
                        <p className="text-body1 text-secondary mb-4">
                          Skip the baggage claim wait. Have your checked baggage delivered directly to your hotel or home.
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-body2 text-secondary">Door-to-door delivery service</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-body2 text-secondary">Real-time tracking</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-body2 text-secondary">Available in major cities</span>
                          </li>
                        </ul>
                        <div className="mt-6">
                          <button className="btn-contained bg-secondary-500 hover:bg-secondary-600 text-white w-full">
                            <span>Book Delivery - ₹999</span>
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual Guide */}
        <div className="mt-12">
          <h2 className="text-h3 text-primary mb-8 text-center">Baggage Size Visual Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6 bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200">
              <h3 className="text-h5 text-primary mb-6 text-center">Carry-On Size</h3>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Simplified carry-on suitcase visualization */}
                  <div className="w-40 h-56 bg-white border-4 border-primary-500 rounded-lg relative mx-auto shadow-lg">
                    <div className="absolute -right-10 top-1/2 transform -translate-y-1/2">
                      <div className="flex flex-col items-center">
                        <div className="h-40 w-1 border-l-2 border-dashed border-primary-500"></div>
                        <span className="text-sm font-medium mt-2 text-primary-700">55 cm</span>
                      </div>
                    </div>
                    <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2">
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-1 border-t-2 border-dashed border-primary-500"></div>
                        <span className="text-sm font-medium mt-2 text-primary-700">35 cm</span>
                      </div>
                    </div>
                    <div className="w-6 h-10 bg-primary-300 rounded-r-md absolute top-4 left-[-6px]"></div>
                    <div className="w-full h-1 bg-primary-300 absolute top-[30%]"></div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-body1 font-semibold text-primary">55 × 35 × 25 cm</p>
                <p className="text-body2 text-secondary">(Height × Width × Depth)</p>
                <div className="mt-4 inline-block bg-primary-100 px-4 py-2 rounded-full">
                  <p className="text-sm text-primary-700 font-medium">Max Weight: 7-10 kg (by cabin class)</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6 bg-gradient-to-r from-secondary-50 to-secondary-100 border border-secondary-200">
              <h3 className="text-h5 text-primary mb-6 text-center">Checked Baggage Size</h3>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Simplified checked baggage visualization */}
                  <div className="w-48 h-64 bg-white border-4 border-secondary-500 rounded-lg relative mx-auto shadow-lg">
                    <div className="absolute -right-10 top-1/2 transform -translate-y-1/2">
                      <div className="flex flex-col items-center">
                        <div className="h-56 w-1 border-l-2 border-dashed border-secondary-500"></div>
                        <span className="text-sm font-medium mt-2 text-secondary-700">Max height</span>
                      </div>
                    </div>
                    <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2">
                      <div className="flex flex-col items-center">
                        <div className="w-40 h-1 border-t-2 border-dashed border-secondary-500"></div>
                        <span className="text-sm font-medium mt-2 text-secondary-700">Max width</span>
                      </div>
                    </div>
                    <div className="w-8 h-12 bg-secondary-300 rounded-r-md absolute top-4 left-[-8px]"></div>
                    <div className="w-full h-1 bg-secondary-300 absolute top-[25%]"></div>
                    <div className="w-full h-1 bg-secondary-300 absolute top-[50%]"></div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-body1 font-semibold text-primary">Total dimensions ≤ 158 cm</p>
                <p className="text-body2 text-secondary">(Length + Width + Height)</p>
                <div className="mt-4 inline-block bg-secondary-100 px-4 py-2 rounded-full">
                  <p className="text-sm text-secondary-700 font-medium">Max Weight: 15-40 kg (by route and class)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 mb-8">
          <h2 className="text-h4 text-primary mb-8 text-center">Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: Plane, title: "Book Extra Baggage", link: "#", color: "primary" },
              { icon: Shield, title: "Baggage Insurance", link: "#", color: "success" },
              { icon: Clock, title: "Baggage Delivery", link: "#", color: "secondary" },
              { icon: RotateCcw, title: "Track Your Baggage", link: "#", color: "warning" },
            ].map((item, index) => (
              <a 
                key={index}
                href={item.link}
                className="card p-5 hover:shadow-elevation-2 transition-all duration-200 flex flex-col items-center text-center"
              >
                <div className={`bg-${item.color}-100 rounded-full p-3 mb-3`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <span className="text-body1 font-medium text-primary">{item.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Assistance Box */}
        <div className="card-elevated p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 mt-12">
          <div className="text-center mb-8">
            <h2 className="text-h3 text-primary mb-4">Need More Help?</h2>
            <p className="text-h5 font-normal text-secondary max-w-xl mx-auto">
              Our baggage specialists are ready to assist you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Baggage Helpline</h3>
              <p className="text-body1 text-secondary mb-4">24/7 baggage assistance</p>
              <a 
                href="tel:+918800123456" 
                className="text-h6 text-primary-500 hover:text-primary-600 transition-colors block"
              >
                +91 8800 123 456
              </a>
            </div>
            
            <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-secondary-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Email Support</h3>
              <p className="text-body1 text-secondary mb-4">Response within 24 hours</p>
              <a 
                href="mailto:baggage@indigo.com" 
                className="text-h6 text-secondary-500 hover:text-secondary-600 transition-colors block"
              >
                baggage@indigo.com
              </a>
            </div>
            
            <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-success-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Lost & Found</h3>
              <p className="text-body1 text-secondary mb-4">For missing baggage inquiries</p>
              <button className="btn-contained bg-success-500 hover:bg-success-600 text-white">
                Contact Lost & Found
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaggageInfoPage;