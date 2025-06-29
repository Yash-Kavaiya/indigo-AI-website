import React from 'react';
import { Bot, Brain, Zap, Shield, Globe, Heart, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const AIFeatures: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Predictive Intelligence',
      description: 'AI analyzes millions of data points to predict price changes, weather patterns, and optimal booking times.',
      color: 'primary',
      stats: '99.2% accuracy',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      iconBg: 'bg-primary-500'
    },
    {
      icon: Bot,
      title: 'Autonomous Booking',
      description: 'Let AI handle complex multi-city bookings, rebooking during disruptions, and securing upgrades automatically.',
      color: 'secondary',
      stats: '24/7 monitoring',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-200',
      iconBg: 'bg-secondary-500'
    },
    {
      icon: Heart,
      title: 'Hyper-Personalization',
      description: 'Learns your preferences, travel patterns, and lifestyle to create perfectly tailored travel experiences.',
      color: 'error',
      stats: '10+ preference factors',
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200',
      iconBg: 'bg-error-500'
    },
    {
      icon: Zap,
      title: 'Real-time Optimization',
      description: 'Continuously monitors and adjusts your itinerary for better prices, weather, and local events.',
      color: 'warning',
      stats: 'Live updates every 5min',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      iconBg: 'bg-warning-500'
    },
    {
      icon: Globe,
      title: 'Smart Destination Discovery',
      description: 'Discovers hidden gems and trending destinations based on your interests and social media activity.',
      color: 'success',
      stats: '500+ destinations analyzed',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      iconBg: 'bg-success-500'
    },
    {
      icon: Shield,
      title: 'Proactive Protection',
      description: 'Anticipates travel disruptions and automatically implements backup plans to protect your journey.',
      color: 'slate',
      stats: '95% disruption prevention',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      iconBg: 'bg-gray-600'
    }
  ];

  return (
    <section id="ai-features" className="py-24 bg-gradient-to-br from-surface-secondary to-primary-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200 shadow-elevation-1 mb-8">
            <Bot className="h-6 w-6 text-primary-500" />
            <span className="text-body1 font-semibold text-primary">Advanced AI Capabilities</span>
          </div>
          <h2 className="text-h2 text-primary mb-6">
            Next-Generation Travel Intelligence
          </h2>
          <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto">
            Experience the future of travel with AI agents that understand, anticipate, and act on your behalf
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-elevated p-8 hover:scale-105 transform transition-all duration-300 group"
            >
              <div className={`${feature.iconBg} rounded-2xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-elevation-1`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-h5 text-primary mb-4">{feature.title}</h3>
              <p className="text-body1 text-secondary mb-6 leading-relaxed">{feature.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-caption font-semibold text-secondary uppercase tracking-wide">Performance</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success-500" />
                  <span className="text-body2 font-bold text-primary">{feature.stats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Showcase */}
        <div className="card-elevated p-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-h3 text-primary mb-8">
                AI in Action: Real-time Decision Making
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 rounded-2xl p-3 mt-1">
                    <TrendingUp className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-h6 text-primary mb-2">Price Monitoring</h4>
                    <p className="text-body1 text-secondary">Continuously tracks price fluctuations across 500+ airlines</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary-100 rounded-2xl p-3 mt-1">
                    <Clock className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div>
                    <h4 className="text-h6 text-primary mb-2">Optimal Timing</h4>
                    <p className="text-body1 text-secondary">Predicts the best booking windows with 99% accuracy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-success-100 rounded-2xl p-3 mt-1">
                    <Shield className="h-6 w-6 text-success-600" />
                  </div>
                  <div>
                    <h4 className="text-h6 text-primary mb-2">Risk Assessment</h4>
                    <p className="text-body1 text-secondary">Evaluates weather, political, and operational risks</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card bg-gradient-to-br from-primary-500 to-secondary-500 p-10 text-white">
              <div className="mb-8">
                <Bot className="h-16 w-16 mb-6 opacity-90" />
                <h4 className="text-h4 font-bold mb-3">AI Agent Status</h4>
                <p className="text-body1 text-primary-100">Currently monitoring your preferences</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-body1">Flight Tracking</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse"></div>
                    <span className="text-body2 font-medium">Active</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body1">Price Alerts</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse"></div>
                    <span className="text-body2 font-medium">Monitoring</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body1">Weather Analysis</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse"></div>
                    <span className="text-body2 font-medium">Updated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;