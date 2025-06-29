import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Mail, Phone, MapPin, Clock, Globe, Send, ArrowRight, HelpCircle, Plane, Hotel, Car, CreditCard, User, Shield, Linkedin, Github as GitHub, Instagram, Twitter } from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
}

interface OfficeLocation {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl: string;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const [inquiryType, setInquiryType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'faq'>('form');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('all');

  const officeLocations: OfficeLocation[] = [
    {
      city: 'Pune (Main Office)',
      address: 'Hinjawadi Phase 1, Pune - 410057, Maharashtra, India',
      phone: '+91 9265745362',
      email: 'yash.kavaiya3@gmail.com',
      hours: 'Monday-Friday: 9:00 AM - 6:00 PM',
      mapUrl: 'https://maps.google.com'
    },
    {
      city: 'Gurgaon (Headquarters)',
      address: 'Level 1-5, Tower C, Global Business Park, Mehrauli-Gurgaon Road, Gurgaon - 122 002, Haryana, India',
      phone: '+91 124 435 2500',
      email: 'corporate@indigo.com',
      hours: 'Monday-Friday: 9:00 AM - 6:00 PM',
      mapUrl: 'https://maps.google.com'
    },
    {
      city: 'Mumbai',
      address: 'Ceejay House, Level 11, Plot F, Shivsagar Estate, Dr. Annie Besant Road, Worli, Mumbai - 400 018, Maharashtra, India',
      phone: '+91 22 6685 4000',
      email: 'mumbai@indigo.com',
      hours: 'Monday-Friday: 9:00 AM - 6:00 PM',
      mapUrl: 'https://maps.google.com'
    }
  ];

  const faqItems: FAQItem[] = [
    {
      question: 'How do I check my flight status?',
      answer: 'You can check your flight status on our website or mobile app by entering your flight number or route details. Alternatively, you can also call our customer service center.',
      category: 'Booking'
    },
    {
      question: 'What is the baggage allowance for domestic flights?',
      answer: 'For domestic flights, IndiGo allows one piece of cabin baggage weighing up to 7 kg and check-in baggage of 15 kg per passenger. Additional baggage can be purchased during booking or at the airport.',
      category: 'Baggage'
    },
    {
      question: 'How can I change or cancel my booking?',
      answer: 'You can change or cancel your booking through our website or mobile app under the "Manage Booking" section. Changes and cancellations are subject to our fare rules and may incur fees.',
      category: 'Booking'
    },
    {
      question: 'What is the check-in process for IndiGo flights?',
      answer: 'You can check-in online through our website or mobile app starting 48 hours and up to 60 minutes before departure. Airport check-in counters open 2 hours before departure and close 45 minutes before for domestic flights.',
      category: 'Check-in'
    },
    {
      question: 'How do I join the IndiGo BluChip loyalty program?',
      answer: 'You can join our BluChip loyalty program for free by registering on our website or mobile app. Simply provide your details and start earning points on every flight.',
      category: 'Loyalty'
    },
    {
      question: 'What are the benefits of booking directly through IndiGo?',
      answer: 'Booking directly through IndiGo ensures you get the best prices, exclusive offers, and seamless service. You\'ll also earn BluChip points and receive real-time updates about your flight.',
      category: 'Booking'
    },
    {
      question: 'How can I request special assistance?',
      answer: 'Special assistance can be requested during booking or by contacting our customer service at least 48 hours before your flight. We provide assistance for passengers with reduced mobility, unaccompanied minors, and more.',
      category: 'Services'
    },
    {
      question: 'What is IndiGo\'s policy on flight delays and cancellations?',
      answer: 'In case of flight delays or cancellations, we provide options including rebooking on the next available flight, rerouting, or refunds as per regulatory guidelines. We also provide meals and accommodation when applicable.',
      category: 'Policies'
    }
  ];

  const faqCategories = ['all', 'Booking', 'Baggage', 'Check-in', 'Loyalty', 'Services', 'Policies'];

  const filteredFaqs = faqItems.filter(faq => 
    selectedFaqCategory === 'all' || faq.category === selectedFaqCategory
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message. We will get back to you shortly.');
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onNavigateHome}
                className="btn-text text-white hover:bg-white/20 p-2"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-2xl p-3">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-h4 font-bold">Contact IndiGo</h1>
                  <p className="text-primary-200 text-body2">We're here to help with your travel needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-h2 text-primary mb-8">Get in Touch</h2>
          <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto leading-relaxed">
            Whether you have a question about bookings, need assistance with your travel plans, 
            or want to provide feedback, our team is ready to help.
          </p>
        </div>

        {/* Contact Tabs */}
        <div className="flex justify-center mb-16">
          <div className="card p-2 bg-surface-tertiary border-2 border-gray-200">
            <div className="flex rounded-xl overflow-hidden">
              <button
                className={`px-8 py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'form'
                    ? 'bg-white shadow-elevation-1 text-primary-500 rounded-xl'
                    : 'text-secondary hover:text-primary-500'
                }`}
                onClick={() => setActiveTab('form')}
              >
                Contact Form
              </button>
              <button
                className={`px-8 py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'faq'
                    ? 'bg-white shadow-elevation-1 text-primary-500 rounded-xl'
                    : 'text-secondary hover:text-primary-500'
                }`}
                onClick={() => setActiveTab('faq')}
              >
                FAQs
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'form' ? (
          <>
            {/* Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
              <div>
                <h3 className="text-h3 text-primary mb-8">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="floating-label">
                    <select
                      className="input-box"
                      id="inquiry-type"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="booking">Booking Assistance</option>
                      <option value="feedback">Feedback</option>
                      <option value="baggage">Baggage Inquiry</option>
                      <option value="refund">Refund Status</option>
                      <option value="loyalty">BluChip Program</option>
                      <option value="corporate">Corporate Inquiries</option>
                      <option value="other">Other</option>
                    </select>
                    <label htmlFor="inquiry-type">Inquiry Type*</label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="floating-label">
                      <input
                        type="text"
                        className="input-box"
                        placeholder=" "
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <label htmlFor="name">Full Name*</label>
                    </div>
                    
                    <div className="floating-label">
                      <input
                        type="email"
                        className="input-box"
                        placeholder=" "
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label htmlFor="email">Email Address*</label>
                      <div className="absolute right-4 top-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="floating-label">
                    <input
                      type="tel"
                      className="input-box"
                      placeholder=" "
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="phone">Phone Number</label>
                    <div className="absolute right-4 top-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="floating-label">
                    <textarea
                      className="input-box h-40 resize-none"
                      placeholder=" "
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                    <label htmlFor="message">Your Message*</label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="privacy-policy"
                      className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                      required
                    />
                    <label htmlFor="privacy-policy" className="text-body2 text-secondary">
                      I agree to the <a href="#" className="text-primary-500 hover:text-primary-600 underline">privacy policy</a> and consent to the processing of my personal data.
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
              
              <div>
                <h3 className="text-h3 text-primary mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="card p-6 hover:shadow-elevation-2 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 rounded-2xl p-3 mt-1">
                        <Phone className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="text-h6 text-primary mb-2">Customer Care</h4>
                        <p className="text-body1 text-secondary mb-1">+91 9910 383 838</p>
                        <p className="text-body2 text-secondary">Available 24/7 for all your travel needs</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-elevation-2 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-secondary-100 rounded-2xl p-3 mt-1">
                        <Mail className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div>
                        <h4 className="text-h6 text-primary mb-2">Email Support</h4>
                        <p className="text-body1 text-secondary mb-1">customer.relations@indigo.com</p>
                        <p className="text-body2 text-secondary">We aim to respond within 24 hours</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-elevation-2 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-success-100 rounded-2xl p-3 mt-1">
                        <Globe className="h-6 w-6 text-success-600" />
                      </div>
                      <div>
                        <h4 className="text-h6 text-primary mb-2">Social Media</h4>
                        <div className="flex space-x-4 mt-2">
                          <a href="https://www.linkedin.com/in/yashkavaiya" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 transition-colors">LinkedIn</a>
                          <a href="https://www.github.com/Yash-Kavaiya" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 transition-colors">GitHub</a>
                          <a href="https://www.instagram.com/gen_ai_guru" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 transition-colors">Instagram</a>
                          <a href="https://x.com/Yash_Kavaiya_" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 transition-colors">Twitter</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-elevation-2 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-warning-100 rounded-2xl p-3 mt-1">
                        <Clock className="h-6 w-6 text-warning-600" />
                      </div>
                      <div>
                        <h4 className="text-h6 text-primary mb-2">Business Hours</h4>
                        <p className="text-body1 text-secondary mb-1">Customer Care: 24/7</p>
                        <p className="text-body1 text-secondary mb-1">Corporate Offices: Monday-Friday, 9:00 AM - 6:00 PM</p>
                        <p className="text-body2 text-secondary">Closed on national holidays</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="text-h2 text-primary mb-6">Our Offices</h2>
                <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
                  Visit us at one of our office locations across India
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {officeLocations.map((location, index) => (
                  <div key={index} className="card-elevated p-8 hover:scale-105 transition-all duration-300">
                    <div className="bg-primary-100 rounded-2xl p-4 w-fit mb-6">
                      <MapPin className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-h5 text-primary mb-4">{location.city}</h3>
                    <p className="text-body1 text-secondary mb-6 leading-relaxed">{location.address}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <span className="text-body1 text-secondary">{location.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <span className="text-body1 text-secondary">{location.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span className="text-body1 text-secondary">{location.hours}</span>
                      </div>
                    </div>
                    
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50 w-full"
                    >
                      <MapPin className="h-5 w-5" />
                      <span>View on Map</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Personal Contact Section */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="text-h2 text-primary mb-6">Personal Contact</h2>
                <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
                  Reach out directly to our representative
                </p>
              </div>
              
              <div className="card-elevated p-8 hover:scale-105 transition-all duration-300 max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-40 h-40 rounded-full overflow-hidden bg-primary-100 flex items-center justify-center">
                    <User className="h-20 w-20 text-primary-500" />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <h3 className="text-h4 text-primary text-center md:text-left">Yash Kavaiya</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-secondary-600" />
                        <a href="mailto:yash.kavaiya3@gmail.com" className="text-body1 text-secondary hover:text-primary-500 transition-colors">
                          yash.kavaiya3@gmail.com
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-secondary-600" />
                        <a href="tel:+919265745362" className="text-body1 text-secondary hover:text-primary-500 transition-colors">
                          +91 9265745362
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-secondary-600" />
                        <span className="text-body1 text-secondary">
                          Pune, Hinjawadi Phase 1, 410057
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center md:justify-start space-x-4 pt-2">
                      <a href="https://www.linkedin.com/in/yashkavaiya" target="_blank" rel="noopener noreferrer" className="bg-primary-100 p-3 rounded-full text-primary-600 hover:bg-primary-200 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="https://www.github.com/Yash-Kavaiya" target="_blank" rel="noopener noreferrer" className="bg-primary-100 p-3 rounded-full text-primary-600 hover:bg-primary-200 transition-colors">
                        <GitHub className="h-5 w-5" />
                      </a>
                      <a href="https://www.instagram.com/gen_ai_guru" target="_blank" rel="noopener noreferrer" className="bg-primary-100 p-3 rounded-full text-primary-600 hover:bg-primary-200 transition-colors">
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a href="https://x.com/Yash_Kavaiya_" target="_blank" rel="noopener noreferrer" className="bg-primary-100 p-3 rounded-full text-primary-600 hover:bg-primary-200 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* FAQ Section */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="text-h2 text-primary mb-6">Frequently Asked Questions</h2>
                <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
                  Find quick answers to common questions about our services
                </p>
              </div>

              <div className="flex justify-center mb-12">
                <div className="flex flex-wrap gap-3">
                  {faqCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedFaqCategory(category)}
                      className={`btn-contained transition-all duration-200 ${
                        selectedFaqCategory === category
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {category === 'all' ? 'All Questions' : category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6 max-w-4xl mx-auto">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="card-elevated p-6 hover:shadow-elevation-2 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 rounded-2xl p-3 mt-1">
                        <HelpCircle className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="text-h6 text-primary mb-3">{faq.question}</h4>
                        <p className="text-body1 text-secondary leading-relaxed">{faq.answer}</p>
                        <div className="mt-4">
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-body2">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="text-h2 text-primary mb-6">Quick Support Links</h2>
                <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
                  Direct access to our most requested support services
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
                  <div className="bg-primary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                    <Plane className="h-8 w-8 text-primary-600" />
                  </div>
                  <h4 className="text-h6 text-primary mb-3">Flight Status</h4>
                  <p className="text-body2 text-secondary mb-4">Check the latest status of your flight</p>
                  <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50 w-full">
                    Check Status
                  </button>
                </div>
                
                <div className="card p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
                  <div className="bg-secondary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                    <User className="h-8 w-8 text-secondary-600" />
                  </div>
                  <h4 className="text-h6 text-primary mb-3">Manage Booking</h4>
                  <p className="text-body2 text-secondary mb-4">Change, cancel or upgrade your booking</p>
                  <button className="btn-outlined border-secondary-500 text-secondary-500 hover:bg-secondary-50 w-full">
                    Manage Now
                  </button>
                </div>
                
                <div className="card p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
                  <div className="bg-success-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-success-600" />
                  </div>
                  <h4 className="text-h6 text-primary mb-3">Refund Status</h4>
                  <p className="text-body2 text-secondary mb-4">Track the status of your refund request</p>
                  <button className="btn-outlined border-success-500 text-success-500 hover:bg-success-50 w-full">
                    Check Refund
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* CTA Section */}
        <div className="card-elevated p-12 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
          <div className="text-center">
            <h2 className="text-h3 text-primary mb-6">Need Immediate Assistance?</h2>
            <p className="text-h4 font-normal text-secondary mb-8 max-w-2xl mx-auto">
              Our customer service team is available 24/7 to help with urgent travel needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919910383838"
                className="btn-contained bg-primary-500 hover:bg-primary-600 text-white shadow-elevation-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now: +91 9910 383 838</span>
              </a>
              <button className="btn-outlined border-secondary-500 text-secondary-500 hover:bg-secondary-50">
                <MessageSquare className="h-5 w-5" />
                <span>Start Live Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;