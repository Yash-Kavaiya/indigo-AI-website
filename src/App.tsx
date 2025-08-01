import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import AIFeatures from './components/AIFeatures';
import SmartRecommendations from './components/SmartRecommendations';
import TravelAssistant from './components/TravelAssistant';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import LoyaltyProgramPage from './pages/LoyaltyProgramPage';
import BookingManagement from './components/booking/BookingManagement';
import DestinationsPage from './pages/DestinationsPage';
import AboutUsPage from './pages/AboutUsPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import WebCheckInPage from './pages/WebCheckInPage';
import FlightStatusPage from './pages/FlightStatusPage';
import ManageBookingPage from './pages/ManageBookingPage';
import FlightsPage from './pages/FlightsPage';
import HotelsPage from './pages/HotelsPage';
import CabsPage from './pages/CabsPage';
import PackagesPage from './pages/PackagesPage';
import VisaPage from './pages/VisaPage';
import InsurancePage from './pages/InsurancePage';
import GroupBookingsPage from './pages/GroupBookingsPage';
import FAQPage from './pages/FAQPage';
import BaggageInfoPage from './pages/BaggageInfoPage';
import TravelPoliciesPage from './pages/TravelPoliciesPage';

type CurrentPage = 
  | 'home' 
  | 'loyalty' 
  | 'booking' 
  | 'destinations' 
  | 'about' 
  | 'careers' 
  | 'press' 
  | 'blog' 
  | 'contact' 
  | 'webCheckIn' 
  | 'flightStatus' 
  | 'manageBooking'
  | 'flights'
  | 'hotels'
  | 'cabs'
  | 'packages'
  | 'visa'
  | 'insurance'
  | 'groupBookings'
  | 'faq'
  | 'baggageInfo'
  | 'travelPolicies';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');

  // Legacy/About pages
  if (currentPage === 'loyalty') {
    return <LoyaltyProgramPage />;
  }

  if (currentPage === 'booking') {
    return <BookingManagement />;
  }

  if (currentPage === 'destinations') {
    return <DestinationsPage />;
  }

  if (currentPage === 'about') {
    return <AboutUsPage onNavigateHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'careers') {
    return <CareersPage onNavigateHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'press') {
    return <PressPage onNavigateHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'blog') {
    return <BlogPage onNavigateHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'contact') {
    return <ContactPage onNavigateHome={() => setCurrentPage('home')} />;
  }

  // Service pages
  if (currentPage === 'webCheckIn') {
    return <WebCheckInPage onNavigateHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'flightStatus') {
    return <FlightStatusPage onNavigateHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'manageBooking') {
    return <ManageBookingPage onNavigateHome={() => setCurrentPage('home')} />;
  }

  // New dedicated travel service pages
  if (currentPage === 'flights') {
    return <FlightsPage />;
  }

  if (currentPage === 'hotels') {
    return <HotelsPage />;
  }

  if (currentPage === 'cabs') {
    return <CabsPage />;
  }

  if (currentPage === 'packages') {
    return <PackagesPage />;
  }

  if (currentPage === 'visa') {
    return <VisaPage />;
  }

  if (currentPage === 'insurance') {
    return <InsurancePage />;
  }

  if (currentPage === 'groupBookings') {
    return <GroupBookingsPage />;
  }
  
  // New information pages
  if (currentPage === 'faq') {
    return <FAQPage />;
  }
  
  if (currentPage === 'baggageInfo') {
    return <BaggageInfoPage />;
  }
  
  if (currentPage === 'travelPolicies') {
    return <TravelPoliciesPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavigateToLoyalty={() => setCurrentPage('loyalty')}
        onNavigateToBooking={() => setCurrentPage('booking')}
        onNavigateToDestinations={() => setCurrentPage('destinations')}
        onNavigateToAbout={() => setCurrentPage('about')}
        onNavigateToCareers={() => setCurrentPage('careers')}
        onNavigateToPress={() => setCurrentPage('press')}
        onNavigateToBlog={() => setCurrentPage('blog')}
        onNavigateToContact={() => setCurrentPage('contact')}
        onNavigateToWebCheckIn={() => setCurrentPage('webCheckIn')}
        onNavigateToFlightStatus={() => setCurrentPage('flightStatus')}
        onNavigateToManageBooking={() => setCurrentPage('manageBooking')}
        onNavigateToFlights={() => setCurrentPage('flights')}
        onNavigateToHotels={() => setCurrentPage('hotels')}
        onNavigateToCabs={() => setCurrentPage('cabs')}
        onNavigateToPackages={() => setCurrentPage('packages')}
        onNavigateToVisa={() => setCurrentPage('visa')}
        onNavigateToInsurance={() => setCurrentPage('insurance')}
        onNavigateToGroupBookings={() => setCurrentPage('groupBookings')}
        onNavigateToFAQ={() => setCurrentPage('faq')}
        onNavigateToBaggageInfo={() => setCurrentPage('baggageInfo')}
        onNavigateToTravelPolicies={() => setCurrentPage('travelPolicies')}
      />
      {/* Main content area with top padding to account for fixed header */}
      <main className="pt-20">
        <Hero />
        <SearchForm />
        <AIFeatures />
        <SmartRecommendations />
        <TravelAssistant />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

export default App;