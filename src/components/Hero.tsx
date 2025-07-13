import React from 'react';
import { Bot, Sparkles, Zap, Heart, ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-surface-secondary to-secondary-50 mb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(63, 81, 181, 0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s' }}>
          <div className="card p-4 bg-white/80 backdrop-blur-sm">
            <Bot className="h-8 w-8 text-primary-500" />
          </div>
        </div>
        <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="card p-4 bg-white/80 backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-secondary-500" />
          </div>
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '2s' }}>
          <div className="card p-4 bg-white/80 backdrop-blur-sm">
            <Zap className="h-8 w-8 text-warning-500" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce" style={{ animationDelay: '3s' }}>
          <div className="card p-4 bg-white/80 backdrop-blur-sm">
            <Heart className="h-8 w-8 text-error-500" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200 shadow-elevation-1">
          <Bot className="h-5 w-5 text-primary-500" />
          <span className="text-body2 font-medium text-primary">Powered by Advanced AI</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-h1 mb-6 leading-tight max-w-4xl mx-auto">
          <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-warning-600 bg-clip-text text-transparent">
            Your Intelligent
          </span>
          <br />
          <span className="text-primary">Travel Companion</span>
        </h1>

        {/* Subtitle */}
        <p className="text-h4 font-normal text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
          Experience the future of travel with our AI agent that learns your preferences, 
          anticipates your needs, and creates perfect journeys tailored just for you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white shadow-elevation-2 hover:shadow-elevation-3 ripple transform hover:scale-105 transition-all duration-200">
            <Bot className="h-5 w-5 mr-2" />
            <span>Start Planning with AI</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
          
          <button className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50 ripple">
            <Play className="h-5 w-5 mr-2" />
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="card-elevated p-8 hover:scale-105 transition-all duration-300 group">
            <div className="bg-primary-100 rounded-2xl p-4 w-fit mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
              <Bot className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-h5 mb-3 text-primary">Smart Recommendations</h3>
            <p className="text-body1 text-secondary leading-relaxed">
              AI analyzes your preferences to suggest perfect destinations and experiences
            </p>
          </div>
          
          <div className="card-elevated p-8 hover:scale-105 transition-all duration-300 group">
            <div className="bg-secondary-100 rounded-2xl p-4 w-fit mx-auto mb-6 group-hover:bg-secondary-200 transition-colors duration-300">
              <Zap className="h-8 w-8 text-secondary-600" />
            </div>
            <h3 className="text-h5 mb-3 text-primary">Instant Booking</h3>
            <p className="text-body1 text-secondary leading-relaxed">
              Autonomous agents handle complex bookings and secure the best deals automatically
            </p>
          </div>
          
          <div className="card-elevated p-8 hover:scale-105 transition-all duration-300 group">
            <div className="bg-success-100 rounded-2xl p-4 w-fit mx-auto mb-6 group-hover:bg-success-200 transition-colors duration-300">
              <Heart className="h-8 w-8 text-success-600" />
            </div>
            <h3 className="text-h5 mb-3 text-primary">24/7 Support</h3>
            <p className="text-body1 text-secondary leading-relaxed">
              Your personal AI assistant provides continuous support throughout your journey
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;