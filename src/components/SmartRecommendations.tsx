import React from 'react';
import { MapPin, Clock, Star, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { aiDestinations } from '../data/mockData';

const SmartRecommendations: React.FC = () => {
  return (
    <section id="destinations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-3 rounded-full border border-primary-200 shadow-elevation-1 mb-8">
            <Sparkles className="h-6 w-6 text-primary-500" />
            <span className="text-body1 font-semibold text-primary">AI-Curated for You</span>
          </div>
          <h2 className="text-h2 text-primary mb-6">
            Personalized Destination Recommendations
          </h2>
          <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto">
            Our AI analyzes your travel history, preferences, and current trends to suggest perfect destinations
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {aiDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className="group card-elevated overflow-hidden hover:scale-[1.02] transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* AI Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 shadow-elevation-1">
                  <Sparkles className="h-4 w-4 text-primary-500" />
                  <span className="text-body2 font-semibold text-primary">AI Match</span>
                </div>

                {/* Price */}
                <div className="absolute top-4 right-4 bg-success-500 text-white rounded-full px-4 py-2 shadow-elevation-1">
                  <span className="text-body2 font-bold">
                    From ${destination.price}
                  </span>
                </div>

                {/* Location */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-h3 font-bold mb-2">{destination.name}</h3>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span className="text-body1">{destination.country}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* AI Reason */}
                <div className="card bg-primary-50 border border-primary-200 p-6 mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-500 rounded-2xl p-3 mt-1">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-h6 text-primary-700 mb-2">Why AI Recommends This</h4>
                      <p className="text-body2 text-primary-600">{destination.aiReason}</p>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-h6 text-primary mb-3">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="bg-surface-tertiary text-primary px-3 py-1 rounded-full text-body2 font-medium border border-gray-200"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Best Time & AI Score */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2 text-secondary">
                    <Clock className="h-5 w-5" />
                    <span className="text-body2">Best time: {destination.bestTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-warning-500 fill-current" />
                    <span className="text-body2 font-semibold text-primary">AI Score: 9.{index + 1}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-elevation-2 hover:shadow-elevation-3 ripple transform hover:scale-[1.02] transition-all duration-300">
                  <span>Explore {destination.name}</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="card-elevated p-10 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
          <div className="text-center mb-12">
            <h3 className="text-h3 text-primary mb-4">
              Why These Destinations?
            </h3>
            <p className="text-body1 text-secondary max-w-2xl mx-auto">
              Our AI considers multiple factors to create personalized recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="card p-6 w-fit mx-auto mb-4 shadow-elevation-1">
                <Star className="h-10 w-10 text-warning-500" />
              </div>
              <h4 className="text-h6 text-primary mb-2">Travel History</h4>
              <p className="text-body2 text-secondary">Analyzed your past 12 trips</p>
            </div>
            <div className="text-center">
              <div className="card p-6 w-fit mx-auto mb-4 shadow-elevation-1">
                <Clock className="h-10 w-10 text-primary-500" />
              </div>
              <h4 className="text-h6 text-primary mb-2">Seasonal Trends</h4>
              <p className="text-body2 text-secondary">Optimal weather patterns</p>
            </div>
            <div className="text-center">
              <div className="card p-6 w-fit mx-auto mb-4 shadow-elevation-1">
                <MapPin className="h-10 w-10 text-secondary-500" />
              </div>
              <h4 className="text-h6 text-primary mb-2">Local Events</h4>
              <p className="text-body2 text-secondary">Festivals and cultural events</p>
            </div>
            <div className="text-center">
              <div className="card p-6 w-fit mx-auto mb-4 shadow-elevation-1">
                <TrendingUp className="h-10 w-10 text-success-500" />
              </div>
              <h4 className="text-h6 text-primary mb-2">Price Trends</h4>
              <p className="text-body2 text-secondary">Best value opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartRecommendations;