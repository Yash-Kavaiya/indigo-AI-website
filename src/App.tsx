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

type CurrentPage = 'home' | 'loyalty' | 'booking' | 'destinations' | 'about' | 'careers' | 'press' | 'blog' | 'contact' | 'webCheckIn' | 'flightStatus' | 'manageBooking';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');

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

  if (currentPage === 'webCheckIn') {
    return <WebCheckInPage />;
  }

  if (currentPage === 'flightStatus') {
    return <FlightStatusPage />;
  }

  if (currentPage === 'manageBooking') {
    return <ManageBookingPage />;
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
      />
      <Hero />
      <SearchForm />
      <AIFeatures />
      <SmartRecommendations />
      <TravelAssistant />
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

export default App;