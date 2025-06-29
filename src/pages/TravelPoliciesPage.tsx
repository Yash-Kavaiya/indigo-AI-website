import React, { useState } from 'react';
import { 
  ArrowLeft, FileText, AlertTriangle, Clock, CreditCard, 
  Calendar, User, Shield, CheckCircle, X, Check, Info,
  Briefcase, Plane, Dog, CalendarCheck, Lock, PenTool, 
  ChevronDown, ChevronUp, Download, Bell, ArrowRight, CheckSquare,
  Umbrella, Heart, Phone, MessageSquare, Mail
} from 'lucide-react';

const TravelPoliciesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'booking' | 'cancellation' | 'checkin' | 'documentation' | 'assistance' | 'pets' | 'missed'>('booking');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['booking-process']));
  
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
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-h4 font-bold">Travel Policies</h1>
                  <p className="text-primary-200 text-body2">Terms, conditions, and procedures for your journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-6">
              <div className="card p-6 mb-6">
                <h3 className="text-h6 text-primary mb-4">Policy Sections</h3>
                <nav className="space-y-2">
                  {[
                    { id: 'booking', label: 'Booking Policies', icon: Calendar },
                    { id: 'cancellation', label: 'Cancellation & Refunds', icon: X },
                    { id: 'checkin', label: 'Check-in Requirements', icon: CheckSquare },
                    { id: 'documentation', label: 'Travel Documentation', icon: PenTool },
                    { id: 'assistance', label: 'Special Assistance', icon: Heart },
                    { id: 'pets', label: 'Pet Travel', icon: Dog },
                    { id: 'missed', label: 'Missed Flights', icon: Clock }
                  ].map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id as any)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                        activeTab === section.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <section.icon className="h-5 w-5" />
                      <span className="text-body2 font-medium">{section.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="card p-6 bg-primary-50 border border-primary-200">
                <h3 className="text-h6 text-primary mb-4">Need Assistance?</h3>
                <p className="text-body2 text-secondary mb-4">
                  Our customer support team is available 24/7 to help you with any policy-related questions.
                </p>
                <div className="space-y-3">
                  <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white w-full">
                    <Phone className="h-4 w-4" />
                    <span>Call Support</span>
                  </button>
                  <button className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 w-full">
                    <Mail className="h-4 w-4" />
                    <span>Email Us</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Booking Policies */}
            {activeTab === 'booking' && (
              <div className="space-y-6">
                <h2 className="text-h3 text-primary">Booking Policies</h2>

                <div className="card p-8">
                  <button 
                    className="flex items-start justify-between w-full text-left"
                    onClick={() => toggleSection('booking-process')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 rounded-full p-3 mt-1">
                        <Calendar className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Booking Process</h3>
                        <p className="text-body1 text-secondary">How to book and confirm your reservation</p>
                      </div>
                    </div>
                    {expandedSections.has('booking-process') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('booking-process') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Booking Channels</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="card p-4 bg-gray-50">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="bg-primary-100 rounded-lg p-2">
                                  <Globe className="h-5 w-5 text-primary-600" />
                                </div>
                                <h5 className="text-h6 text-primary">Website & App</h5>
                              </div>
                              <p className="text-body2 text-secondary">
                                Book directly through our website or mobile app for the best rates and exclusive offers.
                              </p>
                            </div>
                            <div className="card p-4 bg-gray-50">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="bg-secondary-100 rounded-lg p-2">
                                  <Phone className="h-5 w-5 text-secondary-600" />
                                </div>
                                <h5 className="text-h6 text-primary">Call Center</h5>
                              </div>
                              <p className="text-body2 text-secondary">
                                Contact our 24/7 call center for assistance with complex bookings or special requests.
                              </p>
                            </div>
                            <div className="card p-4 bg-gray-50">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="bg-success-100 rounded-lg p-2">
                                  <Briefcase className="h-5 w-5 text-success-600" />
                                </div>
                                <h5 className="text-h6 text-primary">Travel Agents</h5>
                              </div>
                              <p className="text-body2 text-secondary">
                                Book through authorized travel agents for additional services and package deals.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Booking Confirmation</h4>
                          <p className="text-body1 text-secondary mb-4">
                            Upon successful booking, you will receive:
                          </p>
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-primary mb-1">Booking Confirmation Email</p>
                                <p className="text-body2 text-secondary">Sent immediately after payment with your booking reference (PNR) and itinerary details.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-primary mb-1">E-Ticket</p>
                                <p className="text-body2 text-secondary">Electronic ticket with all flight details, fare information, and passenger names.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-primary mb-1">Payment Receipt</p>
                                <p className="text-body2 text-secondary">Detailed payment receipt for your records.</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-warning-50 border border-warning-200 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-5 w-5 text-warning-500 mt-0.5" />
                            <div>
                              <h5 className="text-h6 text-warning-700 mb-2">Important Notice</h5>
                              <p className="text-body2 text-warning-600">
                                Always verify that the names on the booking match exactly with the travel documents (passports/ID cards) of all passengers. Name corrections may incur fees or require rebooking. Contact us immediately if you notice any discrepancies.
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
                    onClick={() => toggleSection('payment-options')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-secondary-100 rounded-full p-3 mt-1">
                        <CreditCard className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Payment Options & Policies</h3>
                        <p className="text-body1 text-secondary">Accepted payment methods and rules</p>
                      </div>
                    </div>
                    {expandedSections.has('payment-options') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('payment-options') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Accepted Payment Methods</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="card p-4 bg-gray-50">
                              <h5 className="text-h6 text-primary mb-3">Cards & Banking</h5>
                              <ul className="space-y-3">
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">Credit Cards (Visa, MasterCard, Amex, Diners)</span>
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">Debit Cards (with international payment enabled)</span>
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">Net Banking (all major Indian banks)</span>
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">EMI options (3-12 months, select banks)</span>
                                </li>
                              </ul>
                            </div>
                            <div className="card p-4 bg-gray-50">
                              <h5 className="text-h6 text-primary mb-3">Digital Payments</h5>
                              <ul className="space-y-3">
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">UPI (Google Pay, PhonePe, Paytm)</span>
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">Digital Wallets (Amazon Pay, MobiKwik)</span>
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">Reward Points Redemption (select partners)</span>
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">BluChip Points (for partial/full payment)</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Payment Rules & Timelines</h4>
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <Clock className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-primary mb-1">Full Payment Required</p>
                                <p className="text-body2 text-secondary">All bookings require full payment at the time of reservation. We do not offer payment holds except for group bookings of 10+ passengers.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Lock className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-primary mb-1">Secure Transactions</p>
                                <p className="text-body2 text-secondary">All payment information is protected with 256-bit SSL encryption. We are PCI-DSS compliant for secure card processing.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Info className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-primary mb-1">Currency Conversion</p>
                                <p className="text-body2 text-secondary">International payments are processed in the currency displayed at checkout. Your bank may apply conversion rates and fees for non-INR transactions.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-warning-700 mb-1">Convenience Fees</p>
                                <p className="text-body2 text-warning-600">A nominal convenience fee may apply for certain payment methods and will be displayed before payment confirmation.</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="card p-8">
                  <button 
                    className="flex items-start justify-between w-full text-left"
                    onClick={() => toggleSection('fare-rules')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-warning-100 rounded-full p-3 mt-1">
                        <FileText className="h-6 w-6 text-warning-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Fare Rules & Restrictions</h3>
                        <p className="text-body1 text-secondary">Types of fares and their specific conditions</p>
                      </div>
                    </div>
                    {expandedSections.has('fare-rules') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('fare-rules') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Fare Types Comparison</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] border-collapse">
                              <thead>
                                <tr>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold border border-gray-200">Features</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold border border-gray-200">Saver Fare</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold border border-gray-200">Standard Fare</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold border border-gray-200">Flexi Fare</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="p-4 border border-gray-200 font-medium">Cabin Baggage</td>
                                  <td className="p-4 border border-gray-200">7 kg</td>
                                  <td className="p-4 border border-gray-200">7 kg</td>
                                  <td className="p-4 border border-gray-200">7 kg</td>
                                </tr>
                                <tr>
                                  <td className="p-4 border border-gray-200 font-medium">Checked Baggage</td>
                                  <td className="p-4 border border-gray-200">15 kg</td>
                                  <td className="p-4 border border-gray-200">15 kg</td>
                                  <td className="p-4 border border-gray-200">20 kg</td>
                                </tr>
                                <tr>
                                  <td className="p-4 border border-gray-200 font-medium">Seat Selection</td>
                                  <td className="p-4 border border-gray-200">Paid</td>
                                  <td className="p-4 border border-gray-200">Standard Seats Free</td>
                                  <td className="p-4 border border-gray-200">All Seats Free</td>
                                </tr>
                                <tr>
                                  <td className="p-4 border border-gray-200 font-medium">Meal</td>
                                  <td className="p-4 border border-gray-200">Paid</td>
                                  <td className="p-4 border border-gray-200">Paid</td>
                                  <td className="p-4 border border-gray-200">Included</td>
                                </tr>
                                <tr>
                                  <td className="p-4 border border-gray-200 font-medium">Date Change</td>
                                  <td className="p-4 border border-gray-200">₹3,000 + Fare Diff</td>
                                  <td className="p-4 border border-gray-200">₹1,500 + Fare Diff</td>
                                  <td className="p-4 border border-gray-200">Only Fare Diff</td>
                                </tr>
                                <tr>
                                  <td className="p-4 border border-gray-200 font-medium">Cancellation</td>
                                  <td className="p-4 border border-gray-200">Non-Refundable</td>
                                  <td className="p-4 border border-gray-200">₹3,000 Fee</td>
                                  <td className="p-4 border border-gray-200">₹1,500 Fee</td>
                                </tr>
                                <tr>
                                  <td className="p-4 border border-gray-200 font-medium">BluChip Points</td>
                                  <td className="p-4 border border-gray-200">5 pts/₹100</td>
                                  <td className="p-4 border border-gray-200">7 pts/₹100</td>
                                  <td className="p-4 border border-gray-200">10 pts/₹100</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <Info className="h-5 w-5 text-primary-500 mt-0.5" />
                            <div>
                              <h5 className="text-h6 text-primary mb-2">Fare Rules Disclosure</h5>
                              <p className="text-body2 text-primary-600 mb-2">
                                Complete fare rules are provided during the booking process and in your booking confirmation. Key points to note:
                              </p>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <span className="w-5 text-primary-700 mr-2">•</span>
                                  <span className="text-body2 text-primary-600">Fares are subject to availability and may change until ticketed</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-5 text-primary-700 mr-2">•</span>
                                  <span className="text-body2 text-primary-600">Government taxes and airline surcharges are included in the displayed fare</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-5 text-primary-700 mr-2">•</span>
                                  <span className="text-body2 text-primary-600">Special fares (promotional, senior citizen, student) have specific eligibility requirements and may have additional restrictions</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cancellation & Refund Policies */}
            {activeTab === 'cancellation' && (
              <div className="space-y-6">
                <h2 className="text-h3 text-primary">Cancellation & Refund Policies</h2>

                <div className="card p-8">
                  <button 
                    className="flex items-start justify-between w-full text-left"
                    onClick={() => toggleSection('cancellation-policy')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-error-100 rounded-full p-3 mt-1">
                        <X className="h-6 w-6 text-error-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Cancellation Policy</h3>
                        <p className="text-body1 text-secondary">Rules for cancelling your booking</p>
                      </div>
                    </div>
                    {expandedSections.has('cancellation-policy') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('cancellation-policy') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Cancellation Fee Structure</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] border-collapse">
                              <thead>
                                <tr>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold border border-gray-200">Time Before Departure</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold border border-gray-200">Saver Fare</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold border border-gray-200">Standard Fare</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold border border-gray-200">Flexi Fare</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="p-4 border border-gray-200 font-medium">More than 7 days</td>
                                  <td className="p-4 border border-gray-200">Non-Refundable<br /><span className="text-sm text-gray-500">Only taxes refunded</span></td>
                                  <td className="p-4 border border-gray-200">₹3,000 per passenger</td>
                                  <td className="p-4 border border-gray-200">₹1,500 per passenger</td>
                                </tr>
                                <tr>
                                  <td className="p-4 border border-gray-200 font-medium">2-7 days</td>
                                  <td className="p-4 border border-gray-200">Non-Refundable<br /><span className="text-sm text-gray-500">Only taxes refunded</span></td>
                                  <td className="p-4 border border-gray-200">₹3,500 per passenger</td>
                                  <td className="p-4 border border-gray-200">₹2,000 per passenger</td>
                                </tr>
                                <tr>
                                  <td className="p-4 border border-gray-200 font-medium">0-48 hours</td>
                                  <td className="p-4 border border-gray-200">Non-Refundable<br /><span className="text-sm text-gray-500">Only taxes refunded</span></td>
                                  <td className="p-4 border border-gray-200">₹4,500 per passenger</td>
                                  <td className="p-4 border border-gray-200">₹3,000 per passenger</td>
                                </tr>
                                <tr>
                                  <td className="p-4 border border-gray-200 font-medium">No-Show</td>
                                  <td className="p-4 border border-gray-200">Non-Refundable</td>
                                  <td className="p-4 border border-gray-200">Non-Refundable</td>
                                  <td className="p-4 border border-gray-200">₹5,000 per passenger</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <p className="text-sm text-gray-500 mt-4">
                            <Info className="h-4 w-4 inline-block mr-1" /> Cancellation fees are per passenger, per sector. International flights may have different fee structures.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">How to Cancel Your Booking</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="card p-4 bg-gray-50">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="bg-primary-100 rounded-lg p-2">
                                  <Globe className="h-5 w-5 text-primary-600" />
                                </div>
                                <h5 className="text-h6 text-primary">Online</h5>
                              </div>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <div className="bg-primary-200 rounded-full w-5 h-5 flex items-center justify-center text-primary-700 font-bold mr-2 mt-0.5 text-xs">
                                    1
                                  </div>
                                  <p className="text-body2 text-secondary">Go to "Manage Booking" section</p>
                                </li>
                                <li className="flex items-start">
                                  <div className="bg-primary-200 rounded-full w-5 h-5 flex items-center justify-center text-primary-700 font-bold mr-2 mt-0.5 text-xs">
                                    2
                                  </div>
                                  <p className="text-body2 text-secondary">Enter booking reference and last name</p>
                                </li>
                                <li className="flex items-start">
                                  <div className="bg-primary-200 rounded-full w-5 h-5 flex items-center justify-center text-primary-700 font-bold mr-2 mt-0.5 text-xs">
                                    3
                                  </div>
                                  <p className="text-body2 text-secondary">Select "Cancel Booking" option</p>
                                </li>
                              </ul>
                            </div>
                            <div className="card p-4 bg-gray-50">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="bg-secondary-100 rounded-lg p-2">
                                  <Phone className="h-5 w-5 text-secondary-600" />
                                </div>
                                <h5 className="text-h6 text-primary">Call Center</h5>
                              </div>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <div className="bg-secondary-200 rounded-full w-5 h-5 flex items-center justify-center text-secondary-700 font-bold mr-2 mt-0.5 text-xs">
                                    1
                                  </div>
                                  <p className="text-body2 text-secondary">Call our 24/7 support line</p>
                                </li>
                                <li className="flex items-start">
                                  <div className="bg-secondary-200 rounded-full w-5 h-5 flex items-center justify-center text-secondary-700 font-bold mr-2 mt-0.5 text-xs">
                                    2
                                  </div>
                                  <p className="text-body2 text-secondary">Provide booking reference and verification</p>
                                </li>
                                <li className="flex items-start">
                                  <div className="bg-secondary-200 rounded-full w-5 h-5 flex items-center justify-center text-secondary-700 font-bold mr-2 mt-0.5 text-xs">
                                    3
                                  </div>
                                  <p className="text-body2 text-secondary">Request cancellation with agent assistance</p>
                                </li>
                              </ul>
                            </div>
                            <div className="card p-4 bg-gray-50">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="bg-warning-100 rounded-lg p-2">
                                  <Briefcase className="h-5 w-5 text-warning-600" />
                                </div>
                                <h5 className="text-h6 text-primary">Travel Agent</h5>
                              </div>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <div className="bg-warning-200 rounded-full w-5 h-5 flex items-center justify-center text-warning-700 font-bold mr-2 mt-0.5 text-xs">
                                    1
                                  </div>
                                  <p className="text-body2 text-secondary">Contact your booking agent</p>
                                </li>
                                <li className="flex items-start">
                                  <div className="bg-warning-200 rounded-full w-5 h-5 flex items-center justify-center text-warning-700 font-bold mr-2 mt-0.5 text-xs">
                                    2
                                  </div>
                                  <p className="text-body2 text-secondary">Provide booking reference and passport details</p>
                                </li>
                                <li className="flex items-start">
                                  <div className="bg-warning-200 rounded-full w-5 h-5 flex items-center justify-center text-warning-700 font-bold mr-2 mt-0.5 text-xs">
                                    3
                                  </div>
                                  <p className="text-body2 text-secondary">Follow agent's procedures for cancellation</p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-warning-50 border border-warning-200 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-5 w-5 text-warning-500 mt-0.5" />
                            <div>
                              <h5 className="text-h6 text-warning-700 mb-2">Special Circumstances</h5>
                              <p className="text-body2 text-warning-600 mb-3">
                                Cancellation fees may be waived or reduced in the following circumstances (documentation required):
                              </p>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <span className="w-5 text-warning-700 mr-2">•</span>
                                  <span className="text-body2 text-warning-600">Death or serious illness of the passenger or immediate family member</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-5 text-warning-700 mr-2">•</span>
                                  <span className="text-body2 text-warning-600">Natural disasters or severe weather affecting travel areas</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-5 text-warning-700 mr-2">•</span>
                                  <span className="text-body2 text-warning-600">Government-issued travel restrictions or advisories</span>
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
                    onClick={() => toggleSection('refund-process')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-success-100 rounded-full p-3 mt-1">
                        <CreditCard className="h-6 w-6 text-success-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Refund Process & Timelines</h3>
                        <p className="text-body1 text-secondary">How and when you receive your refund</p>
                      </div>
                    </div>
                    {expandedSections.has('refund-process') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('refund-process') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Refund Timelines</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                              <thead>
                                <tr>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Payment Method</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Processing Time</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Notes</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">Credit Cards</td>
                                  <td className="p-4">7-14 business days</td>
                                  <td className="p-4">Processed to the original card used for booking</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">Debit Cards</td>
                                  <td className="p-4">7-14 business days</td>
                                  <td className="p-4">Processing time depends on issuing bank</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">Net Banking</td>
                                  <td className="p-4">5-7 business days</td>
                                  <td className="p-4">Returned to original account</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">UPI / Wallets</td>
                                  <td className="p-4">3-5 business days</td>
                                  <td className="p-4">Same UPI ID or wallet used for payment</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">EMI Payments</td>
                                  <td className="p-4">14-21 business days</td>
                                  <td className="p-4">Processing fee and interest charged are non-refundable</td>
                                </tr>
                                <tr>
                                  <td className="p-4 font-medium">International Cards</td>
                                  <td className="p-4">14-21 business days</td>
                                  <td className="p-4">Subject to international banking processes</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <p className="text-sm text-gray-500 mt-4">
                            <Info className="h-4 w-4 inline-block mr-1" /> The timeline represents when we process the refund. Actual credit to your account depends on your bank or payment provider's processing times.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Refund Calculation</h4>
                          <div className="card p-6 bg-gray-50">
                            <p className="text-body1 text-secondary mb-4">
                              Your refund amount is calculated as follows:
                            </p>
                            <ul className="space-y-4">
                              <li className="flex items-start">
                                <Calculator className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Total Fare Paid</p>
                                  <p className="text-body2 text-secondary">The full amount you paid for your booking</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <MinusCircle className="h-5 w-5 text-error-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Cancellation Fee</p>
                                  <p className="text-body2 text-secondary">Based on fare type and time before departure</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <MinusCircle className="h-5 w-5 text-error-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Non-Refundable Charges</p>
                                  <p className="text-body2 text-secondary">Certain fees and surcharges may be non-refundable</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <Equals className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-body1 font-medium text-success-600 mb-1">Refund Amount</p>
                                  <p className="text-body2 text-secondary">The final amount returned to your payment method</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Tracking Your Refund</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-body1 text-secondary mb-4">
                                You can track the status of your refund in the following ways:
                              </p>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Through the "Manage Booking" section using your booking reference</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Using the "Check Refund Status" tool on our website</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Contacting our customer service with your booking reference</p>
                                </li>
                              </ul>
                            </div>
                            <div className="card p-6 bg-primary-50 border border-primary-200">
                              <div className="flex items-start space-x-3 mb-4">
                                <AlertTriangle className="h-5 w-5 text-primary-500 mt-0.5" />
                                <h5 className="text-h6 text-primary">Refund Status Tracking Tool</h5>
                              </div>
                              <div className="space-y-4">
                                <div className="floating-label">
                                  <input
                                    type="text"
                                    className="input-box"
                                    placeholder=" "
                                    id="refund-booking-ref"
                                  />
                                  <label htmlFor="refund-booking-ref">Booking Reference (PNR)</label>
                                </div>
                                <div className="floating-label">
                                  <input
                                    type="text"
                                    className="input-box"
                                    placeholder=" "
                                    id="refund-last-name"
                                  />
                                  <label htmlFor="refund-last-name">Last Name</label>
                                </div>
                                <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white w-full">
                                  <Search className="h-5 w-5" />
                                  <span>Check Refund Status</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Check-in Requirements */}
            {activeTab === 'checkin' && (
              <div className="space-y-6">
                <h2 className="text-h3 text-primary">Check-in Requirements</h2>

                <div className="card p-8">
                  <button 
                    className="flex items-start justify-between w-full text-left"
                    onClick={() => toggleSection('checkin-options')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 rounded-full p-3 mt-1">
                        <CheckSquare className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Check-in Options</h3>
                        <p className="text-body1 text-secondary">Available methods to check in for your flight</p>
                      </div>
                    </div>
                    {expandedSections.has('checkin-options') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('checkin-options') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card p-6 bg-gray-50">
                          <div className="bg-primary-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <Globe className="h-6 w-6 text-primary-600" />
                          </div>
                          <h4 className="text-h5 text-primary mb-3 text-center">Web Check-in</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-body2 text-gray-500">Available</span>
                              <span className="text-body2 font-medium text-primary">48h - 2h before departure</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-body2 text-gray-500">Process Time</span>
                              <span className="text-body2 font-medium text-primary">2-5 minutes</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-body2 text-gray-500">Benefits</span>
                              <span className="text-body2 font-medium text-success-600">Skip check-in queues</span>
                            </div>
                          </div>
                          <div className="mt-6">
                            <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white w-full">
                              <span>Go to Web Check-in</span>
                              <ArrowRight className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="card p-6 bg-gray-50">
                          <div className="bg-secondary-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <User className="h-6 w-6 text-secondary-600" />
                          </div>
                          <h4 className="text-h5 text-primary mb-3 text-center">Airport Check-in</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-body2 text-gray-500">Counters Open</span>
                              <span className="text-body2 font-medium text-primary">3h - 45min before departure</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-body2 text-gray-500">Process Time</span>
                              <span className="text-body2 font-medium text-warning-600">10-30 minutes</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-body2 text-gray-500">Requirements</span>
                              <span className="text-body2 font-medium text-primary">ID + Booking reference</span>
                            </div>
                          </div>
                          <div className="mt-6">
                            <p className="text-xs text-center text-gray-500 italic">Available at airport terminal</p>
                          </div>
                        </div>
                        
                        <div className="card p-6 bg-gray-50">
                          <div className="bg-success-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <Phone className="h-6 w-6 text-success-600" />
                          </div>
                          <h4 className="text-h5 text-primary mb-3 text-center">Mobile Check-in</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-body2 text-gray-500">Available</span>
                              <span className="text-body2 font-medium text-primary">48h - 2h before departure</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-body2 text-gray-500">Process Time</span>
                              <span className="text-body2 font-medium text-primary">2-3 minutes</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-body2 text-gray-500">Benefits</span>
                              <span className="text-body2 font-medium text-success-600">Mobile boarding pass</span>
                            </div>
                          </div>
                          <div className="mt-6">
                            <button className="btn-outlined border-success-500 text-success-500 hover:bg-success-50 w-full">
                              <span>Download Mobile App</span>
                              <ArrowRight className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="card p-8">
                  <button 
                    className="flex items-start justify-between w-full text-left"
                    onClick={() => toggleSection('checkin-deadlines')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-warning-100 rounded-full p-3 mt-1">
                        <Clock className="h-6 w-6 text-warning-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Check-in & Boarding Deadlines</h3>
                        <p className="text-body1 text-secondary">Important timelines for your journey</p>
                      </div>
                    </div>
                    {expandedSections.has('checkin-deadlines') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('checkin-deadlines') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-h5 text-primary mb-6">Important Timelines</h4>
                          
                          <div className="relative">
                            {/* Timeline */}
                            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200"></div>
                            
                            <div className="space-y-12">
                              {/* Web Check-in Opens */}
                              <div className="relative flex">
                                <div className="bg-primary-500 text-white rounded-full w-12 h-12 flex items-center justify-center z-10">
                                  <span className="font-bold">48h</span>
                                </div>
                                <div className="ml-8 pt-2">
                                  <h5 className="text-h6 text-primary mb-2">Web Check-in Opens</h5>
                                  <p className="text-body2 text-secondary">
                                    Online and mobile check-in becomes available 48 hours before scheduled departure. 
                                    Select your seats and generate boarding passes early to save time at the airport.
                                  </p>
                                </div>
                              </div>
                              
                              {/* Airport Check-in Opens */}
                              <div className="relative flex">
                                <div className="bg-secondary-500 text-white rounded-full w-12 h-12 flex items-center justify-center z-10">
                                  <span className="font-bold">3h</span>
                                </div>
                                <div className="ml-8 pt-2">
                                  <h5 className="text-h6 text-primary mb-2">Airport Check-in Opens</h5>
                                  <p className="text-body2 text-secondary">
                                    Airport check-in counters open 3 hours before domestic flights and 4 hours before international flights.
                                    We recommend arriving early during peak travel seasons.
                                  </p>
                                </div>
                              </div>
                              
                              {/* Baggage Drop Deadline */}
                              <div className="relative flex">
                                <div className="bg-warning-500 text-white rounded-full w-12 h-12 flex items-center justify-center z-10">
                                  <span className="font-bold">1h</span>
                                </div>
                                <div className="ml-8 pt-2">
                                  <h5 className="text-h6 text-primary mb-2">Baggage Drop Deadline</h5>
                                  <p className="text-body2 text-secondary">
                                    All checked baggage must be dropped off no later than 1 hour before domestic 
                                    flights and 1.5 hours before international flights. After this time, baggage may not be accepted.
                                  </p>
                                </div>
                              </div>
                              
                              {/* Check-in Closes */}
                              <div className="relative flex">
                                <div className="bg-error-500 text-white rounded-full w-12 h-12 flex items-center justify-center z-10">
                                  <span className="font-bold">45m</span>
                                </div>
                                <div className="ml-8 pt-2">
                                  <h5 className="text-h6 text-primary mb-2">Check-in Closes</h5>
                                  <p className="text-body2 text-secondary">
                                    Check-in closes 45 minutes before domestic flights and 60 minutes before international flights. 
                                    Web check-in closes 2 hours before departure. After these deadlines, check-in is not possible.
                                  </p>
                                </div>
                              </div>
                              
                              {/* Boarding Gate Deadline */}
                              <div className="relative flex">
                                <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center z-10">
                                  <span className="font-bold">20m</span>
                                </div>
                                <div className="ml-8 pt-2">
                                  <h5 className="text-h6 text-primary mb-2">Boarding Gate Deadline</h5>
                                  <p className="text-body2 text-secondary">
                                    Boarding gates close 20 minutes before departure. Passengers who have not presented 
                                    themselves at the gate by this time may not be allowed to board the aircraft.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-error-50 border border-error-200 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-6 w-6 text-error-600 mt-0.5" />
                            <div>
                              <h5 className="text-h6 text-error-700 mb-2">No-Show Policy</h5>
                              <p className="text-body2 text-error-600 mb-3">
                                Passengers who fail to check in or board their flight on time are considered "no-shows" and are subject to the following policies:
                              </p>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <X className="h-5 w-5 text-error-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-error-600">Your booking may be cancelled without refund</p>
                                </li>
                                <li className="flex items-start">
                                  <X className="h-5 w-5 text-error-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-error-600">Return or connecting flights may also be cancelled automatically</p>
                                </li>
                                <li className="flex items-start">
                                  <X className="h-5 w-5 text-error-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-error-600">Highest cancellation fees apply to no-show bookings</p>
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
                    onClick={() => toggleSection('boarding-passes')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-secondary-100 rounded-full p-3 mt-1">
                        <FileText className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Boarding Pass Requirements</h3>
                        <p className="text-body1 text-secondary">Acceptable formats and regulations</p>
                      </div>
                    </div>
                    {expandedSections.has('boarding-passes') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('boarding-passes') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card p-6 bg-gray-50">
                          <div className="bg-secondary-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <Printer className="h-6 w-6 text-secondary-600" />
                          </div>
                          <h4 className="text-h5 text-primary mb-3 text-center">Printed Boarding Pass</h4>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-body2 text-secondary">Print on A4 paper with clear, readable text</p>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-body2 text-secondary">Ensure barcode is clearly visible and not damaged</p>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-body2 text-secondary">Black and white printing is acceptable</p>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="card p-6 bg-gray-50">
                          <div className="bg-primary-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <Phone className="h-6 w-6 text-primary-600" />
                          </div>
                          <h4 className="text-h5 text-primary mb-3 text-center">Mobile Boarding Pass</h4>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-body2 text-secondary">Download to your mobile device from our app or email</p>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-body2 text-secondary">Ensure screen brightness is high when presenting</p>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-body2 text-secondary">Have sufficient battery charge for your entire journey</p>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="card p-6 bg-gray-50">
                          <div className="bg-warning-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-warning-600" />
                          </div>
                          <h4 className="text-h5 text-primary mb-3 text-center">Important Notes</h4>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-body2 text-secondary">Mobile boarding passes may not be accepted at certain airports</p>
                            </li>
                            <li className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-body2 text-secondary">International flights may require printed boarding passes</p>
                            </li>
                            <li className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-body2 text-secondary">Always carry a valid photo ID matching your boarding pass</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Travel Documentation */}
            {activeTab === 'documentation' && (
              <div className="space-y-6">
                <h2 className="text-h3 text-primary">Travel Documentation</h2>

                <div className="card p-8">
                  <button 
                    className="flex items-start justify-between w-full text-left"
                    onClick={() => toggleSection('required-documents')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 rounded-full p-3 mt-1">
                        <PenTool className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Required Travel Documents</h3>
                        <p className="text-body1 text-secondary">Essential documents for domestic and international travel</p>
                      </div>
                    </div>
                    {expandedSections.has('required-documents') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('required-documents') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-h5 text-primary mb-4">Domestic Travel Documents</h4>
                            <div className="card p-6 bg-gray-50">
                              <p className="text-body1 text-secondary mb-4">
                                For flights within India, passengers must carry:
                              </p>
                              <ul className="space-y-4">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">Boarding Pass</p>
                                    <p className="text-body2 text-secondary">Either printed or mobile format</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">Valid Photo ID</p>
                                    <p className="text-body2 text-secondary">Any government-issued photo identification such as:</p>
                                    <ul className="pl-6 mt-2 space-y-1">
                                      <li className="text-body2 text-secondary list-disc">Aadhaar Card</li>
                                      <li className="text-body2 text-secondary list-disc">Passport</li>
                                      <li className="text-body2 text-secondary list-disc">Driving License</li>
                                      <li className="text-body2 text-secondary list-disc">Voter ID Card</li>
                                      <li className="text-body2 text-secondary list-disc">PAN Card (not accepted at all airports)</li>
                                    </ul>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-h5 text-primary mb-4">International Travel Documents</h4>
                            <div className="card p-6 bg-gray-50">
                              <p className="text-body1 text-secondary mb-4">
                                For international flights, passengers must carry:
                              </p>
                              <ul className="space-y-4">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">Valid Passport</p>
                                    <p className="text-body2 text-secondary">Must be valid for at least 6 months beyond your return date</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">Visa (if required)</p>
                                    <p className="text-body2 text-secondary">Check visa requirements for your destination and any transit countries</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">Boarding Pass</p>
                                    <p className="text-body2 text-secondary">Printed format is recommended for international travel</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">Travel Insurance Documents</p>
                                    <p className="text-body2 text-secondary">Recommended for all international travel</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-warning-50 border border-warning-200 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-6 w-6 text-warning-600 mt-0.5" />
                            <div>
                              <h5 className="text-h6 text-warning-700 mb-2">COVID-19 Documentation Requirements</h5>
                              <p className="text-body2 text-warning-600 mb-3">
                                Due to the evolving nature of COVID-19 regulations, additional documentation may be required:
                              </p>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <span className="w-5 text-warning-700 mr-2">•</span>
                                  <p className="text-body2 text-warning-600">Vaccination certificates (fully vaccinated status may be required)</p>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-5 text-warning-700 mr-2">•</span>
                                  <p className="text-body2 text-warning-600">Negative COVID-19 test results (RT-PCR/Rapid Antigen, check timing requirements)</p>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-5 text-warning-700 mr-2">•</span>
                                  <p className="text-body2 text-warning-600">Health declaration forms (may be required by destination or transit countries)</p>
                                </li>
                              </ul>
                              <p className="text-body2 text-warning-600 mt-3">
                                Requirements vary by destination and may change without notice. Always check the latest requirements before travel.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-h5 text-primary mb-4">Children's Documentation</h4>
                            <div className="card p-6 bg-gray-50">
                              <ul className="space-y-4">
                                <li className="flex items-start">
                                  <Info className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">Infants (under 2 years)</p>
                                    <p className="text-body2 text-secondary">Birth certificate required. For international travel, passport is mandatory.</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <Info className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">Children (2-18 years)</p>
                                    <p className="text-body2 text-secondary">Same ID requirements as adults. School ID may be accepted for domestic travel for children above 12 years.</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-warning-700 mb-1">Unaccompanied Minors</p>
                                    <p className="text-body2 text-warning-600">Additional documentation required, including consent forms from both parents/guardians.</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-h5 text-primary mb-4">Name Matching Requirements</h4>
                            <div className="card p-6 bg-gray-50">
                              <ul className="space-y-4">
                                <li className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-warning-700 mb-1">Exact Name Match</p>
                                    <p className="text-body2 text-warning-600">The name on your booking must exactly match the name on your ID/passport. Minor differences can result in denied boarding.</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">Name Corrections</p>
                                    <p className="text-body2 text-secondary">Minor corrections (up to 3 characters) can be made through Manage Booking for a fee. Major corrections may require rebooking.</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <Info className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">Marriage/Divorce Name Changes</p>
                                    <p className="text-body2 text-secondary">Carry supporting documentation (marriage certificate, court orders) if your ID name differs from your booking name.</p>
                                  </div>
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
                    onClick={() => toggleSection('visa-requirements')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-secondary-100 rounded-full p-3 mt-1">
                        <FileText className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Visa Requirements & Resources</h3>
                        <p className="text-body1 text-secondary">Information about visa requirements for international travel</p>
                      </div>
                    </div>
                    {expandedSections.has('visa-requirements') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('visa-requirements') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Visa Information</h4>
                          <p className="text-body1 text-secondary mb-4">
                            It is the passenger's responsibility to ensure they have the correct visa(s) for their destination and any transit countries. 
                            Here are some important points to remember:
                          </p>
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-warning-700 mb-1">Verify Requirements Early</p>
                                <p className="text-body2 text-warning-600">Check visa requirements at least 30 days before travel, as processing times vary by country.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-warning-700 mb-1">Transit Visas</p>
                                <p className="text-body2 text-warning-600">Some countries require transit visas even if you don't leave the airport. Always check transit visa requirements.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-warning-700 mb-1">Passport Validity</p>
                                <p className="text-body2 text-warning-600">Most countries require your passport to be valid for at least 6 months beyond your return date, regardless of visa status.</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-h5 text-primary mb-4">Visa Services</h4>
                            <div className="card p-6 bg-gray-50">
                              <p className="text-body1 text-secondary mb-4">
                                We offer visa assistance services to help simplify your travel preparations:
                              </p>
                              <ul className="space-y-3">
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">Visa requirement checking tool</span>
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">Documentation guidance and checklists</span>
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">Application assistance for major destinations</span>
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                                  <span className="text-body2 text-secondary">Express and priority processing options</span>
                                </li>
                              </ul>
                              <div className="mt-4">
                                <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white w-full">
                                  <span>Visit Visa Services</span>
                                  <ArrowRight className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-h5 text-primary mb-4">Visa-Free Travel</h4>
                            <div className="card p-6 bg-gray-50">
                              <p className="text-body1 text-secondary mb-4">
                                Indian passport holders can enjoy visa-free or visa-on-arrival access to several destinations:
                              </p>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  "Bhutan", "Nepal", "Mauritius", "Fiji", "Thailand",
                                  "Indonesia", "Maldives", "Seychelles", "Jamaica", "Trinidad & Tobago"
                                ].map((country, index) => (
                                  <div key={index} className="flex items-center">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                                    <span className="text-body2 text-secondary">{country}</span>
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-gray-500 mt-4">
                                <Info className="h-3 w-3 inline mr-1" /> Terms and conditions apply. Visa policies change frequently.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <Info className="h-6 w-6 text-primary-600 mt-0.5" />
                            <div>
                              <h5 className="text-h6 text-primary mb-2">Disclaimer</h5>
                              <p className="text-body2 text-primary-600">
                                While we provide visa information as a convenience to our customers, visa requirements are determined by government authorities and are subject to change without notice. The airline is not responsible for any passenger denied entry due to invalid visas or documentation. Always verify requirements with the embassy or consulate of your destination country.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Special Assistance */}
            {activeTab === 'assistance' && (
              <div className="space-y-6">
                <h2 className="text-h3 text-primary">Special Assistance Policies</h2>

                <div className="card p-8">
                  <button 
                    className="flex items-start justify-between w-full text-left"
                    onClick={() => toggleSection('mobility-assistance')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 rounded-full p-3 mt-1">
                        <Heart className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Passengers with Reduced Mobility</h3>
                        <p className="text-body1 text-secondary">Assistance for passengers with mobility limitations</p>
                      </div>
                    </div>
                    {expandedSections.has('mobility-assistance') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('mobility-assistance') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Wheelchair Assistance</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="card p-6 bg-gray-50">
                              <h5 className="text-h6 text-primary mb-3">Service Overview</h5>
                              <p className="text-body2 text-secondary mb-4">
                                We provide complimentary wheelchair assistance for passengers who require mobility support. 
                                This service is available from the airport entrance to the boarding gate, and upon arrival, 
                                from the aircraft to the arrivals area.
                              </p>
                              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                                <h6 className="text-body1 font-medium text-primary-700 mb-2">Types of Wheelchair Assistance:</h6>
                                <ul className="space-y-2">
                                  <li className="flex items-start">
                                    <span className="w-5 text-primary-700 mr-2">•</span>
                                    <span className="text-body2 text-primary-600"><strong>WCHR:</strong> Wheelchair for ramp (can ascend/descend stairs)</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="w-5 text-primary-700 mr-2">•</span>
                                    <span className="text-body2 text-primary-600"><strong>WCHS:</strong> Wheelchair for steps (cannot manage stairs)</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="w-5 text-primary-700 mr-2">•</span>
                                    <span className="text-body2 text-primary-600"><strong>WCHC:</strong> Wheelchair completely (passenger is immobile)</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="card p-6 bg-gray-50">
                              <h5 className="text-h6 text-primary mb-3">How to Request</h5>
                              <p className="text-body2 text-secondary mb-4">
                                Wheelchair assistance should be requested at least 48 hours before your flight:
                              </p>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <div className="bg-primary-200 rounded-full w-5 h-5 flex items-center justify-center text-primary-700 font-bold mr-2 mt-0.5 text-xs">
                                    1
                                  </div>
                                  <p className="text-body2 text-secondary">During booking - Select special assistance option</p>
                                </li>
                                <li className="flex items-start">
                                  <div className="bg-primary-200 rounded-full w-5 h-5 flex items-center justify-center text-primary-700 font-bold mr-2 mt-0.5 text-xs">
                                    2
                                  </div>
                                  <p className="text-body2 text-secondary">After booking - Add through Manage Booking section</p>
                                </li>
                                <li className="flex items-start">
                                  <div className="bg-primary-200 rounded-full w-5 h-5 flex items-center justify-center text-primary-700 font-bold mr-2 mt-0.5 text-xs">
                                    3
                                  </div>
                                  <p className="text-body2 text-secondary">Call customer service - For immediate assistance</p>
                                </li>
                              </ul>
                              <div className="mt-4">
                                <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50 w-full">
                                  <Phone className="h-5 w-5" />
                                  <span>Request Assistance</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Additional Services for Reduced Mobility</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                              <thead>
                                <tr>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Service</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Description</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Advance Notice</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Charges</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">Passenger-Owned Wheelchair</td>
                                  <td className="p-4">Transportation of your personal wheelchair</td>
                                  <td className="p-4">24 hours</td>
                                  <td className="p-4 text-success-600">Free of charge</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">Onboard Wheelchair</td>
                                  <td className="p-4">Special narrow aisle chair for onboard mobility</td>
                                  <td className="p-4">48 hours</td>
                                  <td className="p-4 text-success-600">Free of charge</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">Accessible Seating</td>
                                  <td className="p-4">Seats with movable armrests</td>
                                  <td className="p-4">48 hours</td>
                                  <td className="p-4 text-success-600">Free of charge</td>
                                </tr>
                                <tr>
                                  <td className="p-4 font-medium">Airport Transfer</td>
                                  <td className="p-4">Special assistance vehicle if required</td>
                                  <td className="p-4">72 hours</td>
                                  <td className="p-4">Variable charges</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <Info className="h-6 w-6 text-primary-600 mt-0.5" />
                            <div>
                              <h5 className="text-h6 text-primary mb-2">Important Arrival Information</h5>
                              <p className="text-body2 text-primary-600 mb-3">
                                To ensure we can provide the best possible assistance:
                              </p>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <span className="w-5 text-primary-700 mr-2">•</span>
                                  <span className="text-body2 text-primary-600">Arrive at the airport at least 3 hours before departure for domestic and 4 hours for international flights</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-5 text-primary-700 mr-2">•</span>
                                  <span className="text-body2 text-primary-600">Report to the special assistance counter upon arrival</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-5 text-primary-700 mr-2">•</span>
                                  <span className="text-body2 text-primary-600">If using your own wheelchair, it will need to be checked in at the gate</span>
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
                    onClick={() => toggleSection('special-needs')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-secondary-100 rounded-full p-3 mt-1">
                        <Shield className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Other Special Needs Assistance</h3>
                        <p className="text-body1 text-secondary">Support for passengers with various special requirements</p>
                      </div>
                    </div>
                    {expandedSections.has('special-needs') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('special-needs') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Visual Impairment</h4>
                          <div className="card p-6 bg-gray-50">
                            <p className="text-body1 text-secondary mb-4">
                              We offer the following services for visually impaired passengers:
                            </p>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Escort assistance from check-in to the aircraft and from the aircraft to arrivals area</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Special safety briefing onboard</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Assistance with meal service</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Guide dogs permitted in cabin (subject to regulations)</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Hearing Impairment</h4>
                          <div className="card p-6 bg-gray-50">
                            <p className="text-body1 text-secondary mb-4">
                              We offer the following services for hearing impaired passengers:
                            </p>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Visual safety briefing materials</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Special attention from cabin crew for announcements</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Priority boarding if requested</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Written communication when required</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Medical Conditions</h4>
                          <div className="card p-6 bg-gray-50">
                            <p className="text-body1 text-secondary mb-4">
                              Passengers with medical conditions may require:
                            </p>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-body1 font-medium text-warning-700 mb-1">Medical Clearance</p>
                                  <p className="text-body2 text-warning-600">Required for passengers with certain medical conditions. Medical Information Form (MEDIF) must be submitted at least 48 hours before travel.</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Medical Equipment</p>
                                  <p className="text-body2 text-secondary">Portable medical devices (CPAP, oxygen concentrators, etc.) are permitted onboard subject to approval.</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Medications</p>
                                  <p className="text-body2 text-secondary">Carry essential medications in hand luggage with prescriptions/doctor's notes.</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Unaccompanied Minors</h4>
                          <div className="card p-6 bg-gray-50">
                            <p className="text-body1 text-secondary mb-4">
                              Children aged 5-12 years traveling alone:
                            </p>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Dedicated staff assistance throughout the journey</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Special seating arrangements near cabin crew</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Handover only to authorized person with ID verification</p>
                              </li>
                              <li className="flex items-start">
                                <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-warning-600">Must be booked at least 72 hours in advance with service fee of ₹2,500 per child</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h4 className="text-h5 text-primary mb-4">Requesting Special Assistance</h4>
                        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <Info className="h-5 w-5 text-primary-500 mt-0.5" />
                            <div>
                              <h5 className="text-h6 text-primary mb-3">How to Request Special Assistance</h5>
                              <ol className="space-y-4">
                                <li className="flex items-start">
                                  <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                    1
                                  </div>
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">During Booking</p>
                                    <p className="text-body2 text-primary-600">Select the appropriate special assistance option from the dropdown menu during the booking process.</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                    2
                                  </div>
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">After Booking</p>
                                    <p className="text-body2 text-primary-600">Go to "Manage Booking" on our website or app, enter your booking reference, and add special assistance to your booking.</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                    3
                                  </div>
                                  <div>
                                    <p className="text-body1 font-medium text-primary mb-1">Contact Customer Service</p>
                                    <p className="text-body2 text-primary-600">Call our dedicated special assistance line at +91 9910 383 838 at least 48 hours before your flight.</p>
                                  </div>
                                </li>
                              </ol>
                              <div className="mt-4 flex">
                                <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                                  <Heart className="h-5 w-5" />
                                  <span>Request Special Assistance</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Pet Travel Policies */}
            {activeTab === 'pets' && (
              <div className="space-y-6">
                <h2 className="text-h3 text-primary">Pet Travel Policies</h2>

                <div className="card p-8">
                  <button 
                    className="flex items-start justify-between w-full text-left"
                    onClick={() => toggleSection('pet-travel')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 rounded-full p-3 mt-1">
                        <Dog className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Pet Travel Requirements</h3>
                        <p className="text-body1 text-secondary">Policies for traveling with pets</p>
                      </div>
                    </div>
                    {expandedSections.has('pet-travel') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('pet-travel') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Pet Travel Options</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="card p-6 bg-gray-50">
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-primary-100 rounded-lg p-2">
                                  <Plane className="h-5 w-5 text-primary-600" />
                                </div>
                                <h5 className="text-h6 text-primary">Pets in Cabin (PETC)</h5>
                              </div>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Small pets up to 5 kg including container</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Container size must not exceed 45cm x 35cm x 25cm</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Only dogs and cats permitted</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Must be placed under the seat in front</p>
                                </li>
                                <li className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-warning-600">Limited to 2 pets per flight; advance booking required</p>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="card p-6 bg-gray-50">
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-secondary-100 rounded-lg p-2">
                                  <Briefcase className="h-5 w-5 text-secondary-600" />
                                </div>
                                <h5 className="text-h6 text-primary">Pets as Checked Baggage (AVIH)</h5>
                              </div>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Larger pets up to 32 kg including container</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Transported in climate-controlled cargo hold</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Dogs, cats, and household birds permitted</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">IATA-approved travel containers required</p>
                                </li>
                                <li className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-warning-600">Limited to 3 pets per flight; 72 hours advance booking</p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Pet Travel Fees</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                              <thead>
                                <tr>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Route Type</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Pets in Cabin (PETC)</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Pets as Checked Baggage (AVIH)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">Domestic (per sector)</td>
                                  <td className="p-4">₹4,000</td>
                                  <td className="p-4">₹5,000</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">International Short Haul (per sector)</td>
                                  <td className="p-4">₹7,000</td>
                                  <td className="p-4">₹10,000</td>
                                </tr>
                                <tr>
                                  <td className="p-4 font-medium">International Long Haul (per sector)</td>
                                  <td className="p-4">₹10,000</td>
                                  <td className="p-4">₹15,000</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <p className="text-sm text-gray-500 mt-4">
                            <Info className="h-4 w-4 inline-block mr-1" /> Fees are per pet, per one-way journey and are subject to change. Additional charges may apply for stopovers.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Required Documentation</h4>
                          <div className="card p-6 bg-gray-50">
                            <p className="text-body1 text-secondary mb-4">
                              The following documentation is required for pet travel:
                            </p>
                            <ul className="space-y-4">
                              <li className="flex items-start">
                                <FileText className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Health Certificate</p>
                                  <p className="text-body2 text-secondary">Issued by a registered veterinarian within 10 days before travel</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <FileText className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Vaccination Records</p>
                                  <p className="text-body2 text-secondary">Up-to-date vaccination records including rabies (at least 30 days old but not older than 1 year)</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <FileText className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Government Permits</p>
                                  <p className="text-body2 text-secondary">For international travel, import permits from destination country and export permits from origin country</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <FileText className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Microchip Certificate</p>
                                  <p className="text-body2 text-secondary">Required for international travel to many countries</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-warning-50 border border-warning-200 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-6 w-6 text-warning-600 mt-0.5" />
                            <div>
                              <h5 className="text-h6 text-warning-700 mb-2">Breed & Age Restrictions</h5>
                              <p className="text-body2 text-warning-600 mb-3">
                                For safety reasons, we have the following restrictions:
                              </p>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <span className="w-5 text-warning-700 mr-2">•</span>
                                  <span className="text-body2 text-warning-600">Brachycephalic (snub-nosed) dogs and cats are not permitted as checked baggage due to breathing concerns</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-5 text-warning-700 mr-2">•</span>
                                  <span className="text-body2 text-warning-600">Pets must be at least 16 weeks old for domestic travel and may have different age requirements for international travel</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-5 text-warning-700 mr-2">•</span>
                                  <span className="text-body2 text-warning-600">Pregnant pets within 15% of term are not permitted to travel</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white px-8 py-3">
                            <Dog className="h-5 w-5" />
                            <span>Book Pet Travel</span>
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="card p-8">
                  <button 
                    className="flex items-start justify-between w-full text-left"
                    onClick={() => toggleSection('service-animals')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-success-100 rounded-full p-3 mt-1">
                        <Heart className="h-6 w-6 text-success-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Service & Emotional Support Animals</h3>
                        <p className="text-body1 text-secondary">Policies for assistance animals</p>
                      </div>
                    </div>
                    {expandedSections.has('service-animals') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('service-animals') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Service Animals</h4>
                          <div className="card p-6 bg-gray-50">
                            <p className="text-body1 text-secondary mb-4">
                              Service animals are trained to perform specific tasks for passengers with disabilities:
                            </p>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Permitted to travel in cabin free of charge</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Must remain on floor at passenger's feet</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Must be harnessed and under control at all times</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Must not occupy a seat or obstruct aisles</p>
                              </li>
                            </ul>
                            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mt-4">
                              <p className="text-body2 text-primary-600">
                                <strong>Required Documentation:</strong> Service animal identification, harness, or tags; letter from a licensed mental health professional for psychiatric service animals; and proof of training.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Emotional Support Animals</h4>
                          <div className="card p-6 bg-gray-50">
                            <p className="text-body1 text-secondary mb-4">
                              Emotional Support Animals (ESAs) provide comfort but aren't trained for specific tasks:
                            </p>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Accepted only on certain international routes</p>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-secondary">Must be dogs only, well-behaved and properly restrained</p>
                              </li>
                              <li className="flex items-start">
                                <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-warning-600">Must be pre-approved at least 48 hours before travel</p>
                              </li>
                              <li className="flex items-start">
                                <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-body2 text-warning-600">Standard pet fees may apply on certain routes</p>
                              </li>
                            </ul>
                            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mt-4">
                              <p className="text-body2 text-warning-600">
                                <strong>Required Documentation:</strong> Letter from a licensed mental health professional issued within one year of travel date, stating the passenger's condition and need for the animal.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h4 className="text-h5 text-primary mb-4">Animal Travel Guidelines</h4>
                        <div className="card p-6 bg-gray-50">
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <Info className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-primary mb-1">Appropriate Behavior</p>
                                <p className="text-body2 text-secondary">Animals must be well-behaved, non-aggressive, and not cause disruption to other passengers. Airlines reserve the right to deny boarding to animals that pose a threat.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Info className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-primary mb-1">Sanitation</p>
                                <p className="text-body2 text-secondary">Owners are responsible for ensuring animals relieve themselves before boarding and for managing any sanitation needs during travel.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Info className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-body1 font-medium text-primary mb-1">Destination Requirements</p>
                                <p className="text-body2 text-secondary">Passengers are responsible for checking and complying with animal entry requirements, quarantine, and health regulations at their destination.</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Missed Flights Policies */}
            {activeTab === 'missed' && (
              <div className="space-y-6">
                <h2 className="text-h3 text-primary">Missed Flights & Rebooking</h2>

                <div className="card p-8">
                  <button 
                    className="flex items-start justify-between w-full text-left"
                    onClick={() => toggleSection('missed-flight')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-error-100 rounded-full p-3 mt-1">
                        <Clock className="h-6 w-6 text-error-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Missed Flight Policy</h3>
                        <p className="text-body1 text-secondary">What happens if you miss your flight</p>
                      </div>
                    </div>
                    {expandedSections.has('missed-flight') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('missed-flight') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Missed Flight Scenarios</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                              <thead>
                                <tr>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Scenario</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Policy</th>
                                  <th className="p-4 bg-gray-50 text-left text-primary font-semibold">Fees & Options</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">Passenger Delay<br /><span className="text-sm font-normal text-gray-500">(Airport Traffic, Check-in Delay)</span></td>
                                  <td className="p-4">No-show policy applies</td>
                                  <td className="p-4">Rebooking fee + fare difference applies. Only Flexi fares may be eligible for partial refund.</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">Airport Security Delay<br /><span className="text-sm font-normal text-gray-500">(With documented evidence)</span></td>
                                  <td className="p-4">Case-by-case basis</td>
                                  <td className="p-4">May be eligible for reduced fee rebooking to next available flight. Documentation required.</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">Weather & Natural Events</td>
                                  <td className="p-4">Eligible for rebooking</td>
                                  <td className="p-4">Free rebooking to next available flight within 7 days. No fare difference charged if same booking class.</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="p-4 font-medium">Medical Emergency<br /><span className="text-sm font-normal text-gray-500">(With medical certificate)</span></td>
                                  <td className="p-4">Eligible for rebooking or refund</td>
                                  <td className="p-4">Rebooking fee waived, fare difference may apply. Full or partial refund possible with valid documentation.</td>
                                </tr>
                                <tr>
                                  <td className="p-4 font-medium">Missed Connection<br /><span className="text-sm font-normal text-gray-500">(Separate bookings)</span></td>
                                  <td className="p-4">No-show policy applies</td>
                                  <td className="p-4">Standard rebooking fees and policies apply. Recommended to have minimum 3 hours between separately booked flights.</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">What to Do If You Miss Your Flight</h4>
                          <div className="card p-6 bg-gray-50">
                            <ol className="space-y-4">
                              <li className="flex items-start">
                                <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                  1
                                </div>
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Contact Us Immediately</p>
                                  <p className="text-body2 text-secondary">Call our customer service as soon as you know you'll miss your flight: +91 9910 383 838</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                  2
                                </div>
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Go to the Ticket Counter</p>
                                  <p className="text-body2 text-secondary">If you're at the airport, proceed to our ticket counter for assistance</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                  3
                                </div>
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Check Alternative Flights</p>
                                  <p className="text-body2 text-secondary">Our staff will help you find the next available flight options</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                  4
                                </div>
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Prepare for Fees</p>
                                  <p className="text-body2 text-secondary">Be prepared to pay applicable rebooking fees and fare differences</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                  5
                                </div>
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Check Connected Bookings</p>
                                  <p className="text-body2 text-secondary">Notify us of any connecting flights or hotel reservations that may be affected</p>
                                </div>
                              </li>
                            </ol>
                          </div>
                        </div>
                        
                        <div className="bg-warning-50 border border-warning-200 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-6 w-6 text-warning-600 mt-0.5" />
                            <div>
                              <h5 className="text-h6 text-warning-700 mb-2">Important Considerations</h5>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-warning-600">If you miss your outbound flight, your return journey may be automatically cancelled unless you notify us</p>
                                </li>
                                <li className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-warning-600">Travel insurance is strongly recommended to cover potential costs of missed flights</p>
                                </li>
                                <li className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-warning-600">For connecting flights on separate bookings, we are not responsible for missed connections</p>
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
                    onClick={() => toggleSection('rebooking')}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-secondary-100 rounded-full p-3 mt-1">
                        <CalendarCheck className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-primary mb-2">Rebooking Procedures</h3>
                        <p className="text-body1 text-secondary">How to rebook after a missed flight</p>
                      </div>
                    </div>
                    {expandedSections.has('rebooking') ? (
                      <ChevronUp className="h-6 w-6 text-gray-400 mt-2" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 mt-2" />
                    )}
                  </button>
                  
                  {expandedSections.has('rebooking') && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Rebooking Options</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card p-6 bg-gray-50">
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-primary-100 rounded-lg p-2">
                                  <Plane className="h-5 w-5 text-primary-600" />
                                </div>
                                <h5 className="text-h6 text-primary">Same-Day Rebooking</h5>
                              </div>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Available within 24 hours of original flight</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Subject to seat availability</p>
                                </li>
                                <li className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-warning-600">Fee: ₹3,500 + fare difference (if any)</p>
                                </li>
                              </ul>
                              <div className="mt-4">
                                <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50 w-full">
                                  <span>Check Availability</span>
                                  <ArrowRight className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="card p-6 bg-gray-50">
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-secondary-100 rounded-lg p-2">
                                  <Calendar className="h-5 w-5 text-secondary-600" />
                                </div>
                                <h5 className="text-h6 text-primary">Future Date Rebooking</h5>
                              </div>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Rebook for any future date within 30 days</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">More flight options available</p>
                                </li>
                                <li className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-warning-600">Fee: ₹2,500 + fare difference (if any)</p>
                                </li>
                              </ul>
                              <div className="mt-4">
                                <button className="btn-outlined border-secondary-500 text-secondary-500 hover:bg-secondary-50 w-full">
                                  <span>Search Future Flights</span>
                                  <ArrowRight className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="card p-6 bg-gray-50">
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-success-100 rounded-lg p-2">
                                  <Umbrella className="h-5 w-5 text-success-600" />
                                </div>
                                <h5 className="text-h6 text-primary">Insurance Coverage</h5>
                              </div>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">If you have travel insurance, it may cover rebooking costs</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Premium credit cards may also offer coverage</p>
                                </li>
                                <li className="flex items-start">
                                  <Info className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-secondary">Documentation will be provided for insurance claims</p>
                                </li>
                              </ul>
                              <div className="mt-4">
                                <button className="btn-outlined border-success-500 text-success-500 hover:bg-success-50 w-full">
                                  <span>Purchase Insurance</span>
                                  <ArrowRight className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-h5 text-primary mb-4">Rebooking Process</h4>
                          <div className="card p-6 bg-gray-50">
                            <p className="text-body1 text-secondary mb-4">
                              To rebook after missing your flight, follow these steps:
                            </p>
                            <ol className="space-y-4">
                              <li className="flex items-start">
                                <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                  1
                                </div>
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Contact Us Immediately</p>
                                  <p className="text-body2 text-secondary">Call our rebooking hotline at +91 9910 383 838 or visit our airport ticket counter</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                  2
                                </div>
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Provide Your Details</p>
                                  <p className="text-body2 text-secondary">Have your booking reference and identification ready</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                  3
                                </div>
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Review Available Options</p>
                                  <p className="text-body2 text-secondary">Our agents will present rebooking options based on your fare type and circumstances</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                  4
                                </div>
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Pay Applicable Fees</p>
                                  <p className="text-body2 text-secondary">Process payment for rebooking fees and any fare difference</p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-primary-700 font-bold mr-3 mt-0.5 text-sm">
                                  5
                                </div>
                                <div>
                                  <p className="text-body1 font-medium text-primary mb-1">Receive New Confirmation</p>
                                  <p className="text-body2 text-secondary">Get your updated booking confirmation and boarding passes</p>
                                </div>
                              </li>
                            </ol>
                          </div>
                        </div>
                        
                        <div className="bg-success-50 border border-success-200 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <Umbrella className="h-6 w-6 text-success-600 mt-0.5" />
                            <div>
                              <h5 className="text-h6 text-success-700 mb-2">Travel Insurance Recommendation</h5>
                              <p className="text-body2 text-success-600 mb-3">
                                We strongly recommend purchasing travel insurance to protect against unexpected events:
                              </p>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-success-600">Coverage for missed flights due to circumstances beyond your control</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-success-600">Reimbursement for additional expenses like accommodation and meals</p>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-body2 text-success-600">Protection against cancellations due to illness, weather, and more</p>
                                </li>
                              </ul>
                              <div className="mt-4">
                                <button className="btn-contained bg-success-500 hover:bg-success-600 text-white">
                                  <Umbrella className="h-5 w-5" />
                                  <span>Explore Insurance Options</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Download Section */}
        <div className="card-elevated p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 mt-12">
          <div className="text-center mb-8">
            <h2 className="text-h3 text-primary mb-4">Download Our Policies</h2>
            <p className="text-h5 font-normal text-secondary max-w-xl mx-auto">
              Keep our complete policy documents for your reference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Conditions of Carriage</h3>
              <p className="text-body1 text-secondary mb-4">Complete legal terms governing your travel</p>
              <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white w-full">
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
            </div>
            
            <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-secondary-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Fare Rules & Policies</h3>
              <p className="text-body1 text-secondary mb-4">Detailed fare conditions for all ticket types</p>
              <button className="btn-contained bg-secondary-500 hover:bg-secondary-600 text-white w-full">
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
            </div>
            
            <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-success-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Passenger Rights</h3>
              <p className="text-body1 text-secondary mb-4">Your rights and protections as our passenger</p>
              <button className="btn-contained bg-success-500 hover:bg-success-600 text-white w-full">
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Policy Updates Subscription */}
        <div className="card p-8 mt-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-h4 text-primary mb-3">Stay Informed on Policy Updates</h3>
              <p className="text-body1 text-secondary">
                Subscribe to receive notifications when our policies change, ensuring you're always up to date with the latest travel requirements and procedures.
              </p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <div className="flex-1 floating-label">
                <input
                  type="email"
                  className="input-box"
                  placeholder=" "
                  id="policy-update-email"
                />
                <label htmlFor="policy-update-email">Your email address</label>
              </div>
              <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                <Bell className="h-5 w-5" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="card-elevated p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 mt-12">
          <div className="text-center mb-8">
            <h2 className="text-h3 text-primary mb-4">Need Policy Clarification?</h2>
            <p className="text-h5 font-normal text-secondary max-w-xl mx-auto">
              Our policy experts are available to answer your questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Policy Helpline</h3>
              <p className="text-body1 text-secondary mb-4">Expert policy assistance</p>
              <a 
                href="tel:+919910383838" 
                className="text-h6 text-primary-500 hover:text-primary-600 transition-colors block"
              >
                +91 9910 383 838
              </a>
            </div>
            
            <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-secondary-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Email Support</h3>
              <p className="text-body1 text-secondary mb-4">Response within 24 hours</p>
              <a 
                href="mailto:policy@indigo.com" 
                className="text-h6 text-secondary-500 hover:text-secondary-600 transition-colors block"
              >
                policy@indigo.com
              </a>
            </div>
            
            <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-success-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Live Chat</h3>
              <p className="text-body1 text-secondary mb-4">Instant policy guidance</p>
              <button className="btn-contained bg-success-500 hover:bg-success-600 text-white">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// These function components are defined here to be used in the Travel Policies page
const Calculator = (props) => (
  <svg 
    {...props}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="8" x2="16" y1="10" y2="10" />
    <line x1="8" x2="16" y1="14" y2="14" />
    <line x1="8" x2="16" y1="18" y2="18" />
  </svg>
);

const MinusCircle = (props) => (
  <svg 
    {...props}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const Equals = (props) => (
  <svg 
    {...props}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="5" y1="9" x2="19" y2="9" />
    <line x1="5" y1="15" x2="19" y2="15" />
  </svg>
);

const Printer = (props) => (
  <svg 
    {...props}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

export default TravelPoliciesPage;