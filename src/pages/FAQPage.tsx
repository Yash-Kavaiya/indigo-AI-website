import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, HelpCircle, Search, ChevronDown, ChevronUp, MessageSquare, 
  Phone, Mail, Filter, CheckCircle, Luggage, Clock, CreditCard, Plane,
  Calendar, User, Shield, FileText, AlertCircle, PenTool, Coffee
} from 'lucide-react';

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  
  // FAQ categories
  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'booking', name: 'Booking & Payment' },
    { id: 'cancellation', name: 'Cancellation & Refunds' },
    { id: 'checkin', name: 'Check-in & Boarding' },
    { id: 'baggage', name: 'Baggage' },
    { id: 'services', name: 'Special Services' },
    { id: 'loyalty', name: 'BluChip Rewards' }
  ];

  // FAQ data
  const faqs = [
    {
      id: '1',
      question: 'How can I book a flight on your website?',
      answer: 'Booking a flight on our website is easy! Start by entering your departure city, destination, travel dates, and number of passengers in the search form. Browse the available flights, select your preferred option, and proceed to checkout. You can pay using credit/debit cards, net banking, or digital wallets. Once payment is complete, you'll receive a confirmation email with your e-ticket.',
      category: 'booking'
    },
    {
      id: '2',
      question: 'What is your cancellation policy?',
      answer: 'Our cancellation policy depends on the fare type you've booked. For refundable fares, cancellations made at least 24 hours before departure incur a fee of ₹3,000 per passenger for domestic flights and ₹5,000 for international flights. Non-refundable fares allow cancellation with only taxes refunded. Cancellations within 24 hours of departure may result in higher fees. You can view the specific policy for your booking in the fare rules section of your booking confirmation.',
      category: 'cancellation'
    },
    {
      id: '3',
      question: 'How do I check in for my flight?',
      answer: 'You can check in for your flight in several ways: (1) Web Check-in: Available from 48 hours to 2 hours before departure on our website or mobile app. (2) Airport Kiosk: Self-service kiosks are available at the airport. (3) Check-in Counter: Traditional check-in counters open 3 hours before departure for domestic flights and 4 hours for international flights. For domestic flights, counters close 45 minutes before departure, and for international flights, they close 60 minutes before departure. We recommend web check-in to save time at the airport.',
      category: 'checkin'
    },
    {
      id: '4',
      question: 'What is the baggage allowance for domestic and international flights?',
      answer: 'For domestic flights, the free check-in baggage allowance is 15kg in Economy and 25kg in Business Class. Hand baggage is limited to 7kg per passenger. For international flights, the allowance varies by destination: (1) Asia & Middle East: 25kg in Economy, 35kg in Business. (2) Europe & Americas: 30kg in Economy, 40kg in Business. Hand baggage remains 7kg for all international routes. Excess baggage charges apply for baggage exceeding these limits. For detailed information, please visit our Baggage Information page.',
      category: 'baggage'
    },
    {
      id: '5',
      question: 'How can I select or change my seat?',
      answer: 'You can select your seat during booking or later through the "Manage Booking" section of our website or app. Standard seats are complimentary, while premium seats (front rows, extra legroom) are available for an additional fee ranging from ₹500 to ₹1,500 depending on the route and seat type. Seat selection is subject to availability, and some seats may be reserved for passengers with special needs. You can change your seat at any time before check-in closes, subject to availability.',
      category: 'booking'
    },
    {
      id: '6',
      question: 'What payment methods are accepted?',
      answer: 'We accept a variety of payment methods including major credit cards (Visa, MasterCard, American Express, Diners Club), debit cards, net banking from all major Indian banks, UPI (Google Pay, PhonePe, Paytm), and digital wallets. International customers can also pay using international payment options. All transactions are secured with 256-bit encryption for your safety. Please note that some payment methods may incur a nominal convenience fee.',
      category: 'booking'
    },
    {
      id: '7',
      question: 'How can I request special meals?',
      answer: 'Special meals can be requested during the booking process or later through the "Manage Booking" section. We offer various options including vegetarian, Jain, vegan, diabetic, gluten-free, kosher, and children's meals. For international flights, special meal requests should be made at least 24 hours before departure. For domestic flights with meal service, requests should be made at least 12 hours prior to departure. Not all special meals are available on short domestic flights without regular meal service.',
      category: 'services'
    },
    {
      id: '8',
      question: 'What is the refund process and how long does it take?',
      answer: 'When you cancel an eligible booking, refunds are processed automatically to your original payment method. The processing time depends on your payment method: (1) Credit Cards: 7-14 business days (2) Debit Cards: 7-14 business days (3) Net Banking: 5-7 business days (4) Digital Wallets: 3-5 business days. Please note that while we initiate refunds promptly, the actual credit to your account is subject to your bank or payment provider's processing times. You can check your refund status in the "Manage Booking" section using your booking reference.',
      category: 'cancellation'
    },
    {
      id: '9',
      question: 'How do I earn and redeem BluChip points?',
      answer: 'BluChip is our loyalty program where you earn points for every flight. Economy passengers earn 5 points per ₹100 spent, while Business Class earns 10 points per ₹100. Points can be redeemed for flights, seat upgrades, excess baggage, or lounge access. 5,000 points is worth approximately ₹1,000 in redemption value. Points are valid for 2 years from the date earned. To earn points, make sure your BluChip number is added to your booking. You can join the BluChip program for free through our website or mobile app.',
      category: 'loyalty'
    },
    {
      id: '10',
      question: 'How can I request assistance for passengers with special needs?',
      answer: 'We provide assistance to passengers with reduced mobility, vision or hearing impairment, and other special needs. To request assistance, please contact our call center at least 48 hours before your flight or add a special assistance request in the "Manage Booking" section. Services include wheelchair assistance, priority boarding, assistance with baggage, and special seating arrangements. These services are complimentary, but we recommend arriving at the airport at least 2 hours before domestic flights and 3 hours before international flights to ensure smooth assistance.',
      category: 'services'
    }
  ];

  useEffect(() => {
    // Reset expanded questions when category changes
    setExpandedQuestions(new Set());
  }, [selectedCategory]);

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = searchTerm.trim() === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categoryMap = Object.fromEntries(categories.map(cat => [cat.id, cat.name]));

  const handleBack = () => {
    window.history.back();
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
                  <HelpCircle className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-h4 font-bold">Frequently Asked Questions</h1>
                  <p className="text-primary-200 text-body2">Find answers to common questions about our services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for questions or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-box w-full pl-14 py-4 text-lg"
              aria-label="Search FAQs"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-200 font-medium ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="card-elevated overflow-hidden">
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors duration-200"
                  aria-expanded={expandedQuestions.has(faq.id)}
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-primary-100 rounded-full p-2 flex-shrink-0">
                      <HelpCircle className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-h5 text-primary font-medium">{faq.question}</h3>
                      <span className="inline-block mt-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        {categoryMap[faq.category]}
                      </span>
                    </div>
                  </div>
                  {expandedQuestions.has(faq.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedQuestions.has(faq.id) && (
                  <div className="p-6 pt-0 border-t border-gray-100">
                    <p className="text-body1 text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-h5 text-primary mb-2">No Results Found</h3>
              <p className="text-body1 text-secondary mb-6">
                We couldn't find any FAQs matching your search criteria.
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-16 mb-8">
          <h2 className="text-h4 text-primary mb-8 text-center">Popular Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: Plane, title: "Flight Status", link: "#", color: "primary" },
              { icon: CreditCard, title: "Refund Process", link: "#", color: "success" },
              { icon: Luggage, title: "Baggage Policy", link: "#", color: "secondary" },
              { icon: CheckCircle, title: "Web Check-in", link: "#", color: "warning" },
              { icon: Calendar, title: "Rebooking Options", link: "#", color: "error" },
              { icon: Shield, title: "Travel Insurance", link: "#", color: "primary" },
              { icon: Coffee, title: "In-flight Services", link: "#", color: "secondary" },
              { icon: PenTool, title: "Travel Documents", link: "#", color: "success" }
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

        {/* Still Have Questions */}
        <div className="card-elevated p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 mt-12">
          <div className="text-center mb-8">
            <h2 className="text-h3 text-primary mb-4">Still Have Questions?</h2>
            <p className="text-h5 font-normal text-secondary max-w-xl mx-auto">
              Our customer support team is here to help you 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Call Us</h3>
              <p className="text-body1 text-secondary mb-4">24/7 customer service</p>
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
              <h3 className="text-h5 text-primary mb-2">Email Us</h3>
              <p className="text-body1 text-secondary mb-4">Response within 24 hours</p>
              <a 
                href="mailto:care@indigo.com" 
                className="text-h6 text-secondary-500 hover:text-secondary-600 transition-colors block"
              >
                care@indigo.com
              </a>
            </div>
            
            <div className="card bg-white p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-success-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-h5 text-primary mb-2">Live Chat</h3>
              <p className="text-body1 text-secondary mb-4">Instant support</p>
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

export default FAQPage;