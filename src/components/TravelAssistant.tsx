import React, { useState } from 'react';
import { Bot, MessageSquare, Send, Mic, Camera, MapPin, Clock, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { aiInsights } from '../data/mockData';

const TravelAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const chatMessages = [
    {
      type: 'ai',
      message: "Hello! I'm your AI travel assistant. I've been monitoring your upcoming trip to Tokyo. Would you like me to share some real-time insights?",
      time: '2 min ago'
    },
    {
      type: 'user',
      message: "Yes, please tell me about any updates for my flight tomorrow.",
      time: '1 min ago'
    },
    {
      type: 'ai',
      message: "Great news! Your flight DL 1234 is on time, and I've secured you a complimentary upgrade to Premium Economy. The weather in Tokyo will be perfect - sunny with 22°C. Should I also arrange airport transfer?",
      time: 'Just now'
    }
  ];

  return (
    <section id="assistant" className="py-24 bg-gradient-to-br from-surface-secondary to-primary-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200 shadow-elevation-1 mb-8">
            <Bot className="h-6 w-6 text-primary-500" />
            <span className="text-body1 font-semibold text-primary">24/7 AI Support</span>
          </div>
          <h2 className="text-h2 text-primary mb-6">
            Your Personal Travel Assistant
          </h2>
          <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto">
            Get instant help, real-time updates, and proactive assistance throughout your entire journey
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="xl:col-span-2">
            <div className="card-elevated overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 text-white">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 rounded-2xl p-4">
                    <Bot className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-h4 font-bold">AeroAI Assistant</h3>
                    <p className="text-body1 text-primary-100">Online and ready to help</p>
                  </div>
                  <div className="ml-auto flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse"></div>
                    <span className="text-body1 font-medium">Active</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-8 space-y-6 bg-surface-secondary">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md px-6 py-4 rounded-2xl shadow-elevation-1 ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                        : 'bg-white text-primary border border-gray-200'
                    }`}>
                      <p className="text-body1">{msg.message}</p>
                      <p className={`text-caption mt-2 ${
                        msg.type === 'user' ? 'text-primary-200' : 'text-secondary'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-8 border-t border-gray-200 bg-white">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <div className="floating-label">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder=" "
                        className="input-box resize-none"
                        rows={2}
                        id="chat-message"
                      />
                      <label htmlFor="chat-message">Ask me anything about your trip...</label>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsListening(!isListening)}
                      className={`btn-contained p-4 transition-all duration-200 ${
                        isListening
                          ? 'bg-error-500 hover:bg-error-600 text-white animate-pulse'
                          : 'bg-surface-tertiary hover:bg-gray-200 text-secondary'
                      }`}
                    >
                      <Mic className="h-6 w-6" />
                    </button>
                    
                    <button className="btn-contained bg-surface-tertiary hover:bg-gray-200 text-secondary p-4">
                      <Camera className="h-6 w-6" />
                    </button>
                    
                    <button 
                      disabled={!message.trim()}
                      className="btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-elevation-2 hover:shadow-elevation-3 p-4 disabled:opacity-50"
                    >
                      <Send className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                {/* Recording Indicator */}
                {isListening && (
                  <div className="mt-4 flex items-center justify-center space-x-3 text-error-600">
                    <div className="w-3 h-3 bg-error-600 rounded-full animate-pulse"></div>
                    <span className="text-body2 font-medium">Recording voice message...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="space-y-8">
            <div className="card-elevated p-8">
              <h3 className="text-h5 text-primary mb-6 flex items-center space-x-3">
                <Bot className="h-6 w-6 text-primary-500" />
                <span>Live Insights</span>
              </h3>
              <div className="space-y-6">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className={`card p-6 border ${
                      insight.type === 'price'
                        ? 'bg-success-50 border-success-200'
                        : insight.type === 'weather'
                        ? 'bg-primary-50 border-primary-200'
                        : 'bg-warning-50 border-warning-200'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`rounded-2xl p-3 ${
                        insight.type === 'price'
                          ? 'bg-success-500'
                          : insight.type === 'weather'
                          ? 'bg-primary-500'
                          : 'bg-warning-500'
                      }`}>
                        {insight.type === 'price' && <CheckCircle className="h-5 w-5 text-white" />}
                        {insight.type === 'weather' && <MapPin className="h-5 w-5 text-white" />}
                        {insight.type === 'events' && <AlertTriangle className="h-5 w-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-h6 text-primary mb-2">
                          {insight.title}
                        </h4>
                        <p className="text-body2 text-secondary mb-3">
                          {insight.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-caption text-secondary">
                            {insight.confidence}% confident
                          </span>
                          {insight.action && (
                            <button className="btn-text text-primary-500 hover:text-primary-600 text-body2 font-semibold">
                              {insight.action}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-elevated p-8">
              <h3 className="text-h5 text-primary mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full card p-4 hover:bg-surface-secondary transition-colors duration-200 flex items-center space-x-4 text-left">
                  <Clock className="h-6 w-6 text-primary-500" />
                  <span className="text-body1 font-medium text-primary">Check flight status</span>
                </button>
                <button className="w-full card p-4 hover:bg-surface-secondary transition-colors duration-200 flex items-center space-x-4 text-left">
                  <MapPin className="h-6 w-6 text-secondary-500" />
                  <span className="text-body1 font-medium text-primary">Get directions</span>
                </button>
                <button className="w-full card p-4 hover:bg-surface-secondary transition-colors duration-200 flex items-center space-x-4 text-left">
                  <MessageSquare className="h-6 w-6 text-success-500" />
                  <span className="text-body1 font-medium text-primary">Travel recommendations</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="mt-20 card-elevated p-10">
          <h3 className="text-h3 text-primary text-center mb-12">
            What Your AI Assistant Can Do
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="card bg-primary-100 p-6 w-fit mx-auto mb-6 shadow-elevation-1">
                <Bot className="h-12 w-12 text-primary-600" />
              </div>
              <h4 className="text-h6 text-primary mb-3">24/7 Support</h4>
              <p className="text-body2 text-secondary">Always available to help with any travel questions</p>
            </div>
            <div className="text-center">
              <div className="card bg-secondary-100 p-6 w-fit mx-auto mb-6 shadow-elevation-1">
                <CheckCircle className="h-12 w-12 text-secondary-600" />
              </div>
              <h4 className="text-h6 text-primary mb-3">Proactive Updates</h4>
              <p className="text-body2 text-secondary">Sends alerts before you need them</p>
            </div>
            <div className="text-center">
              <div className="card bg-success-100 p-6 w-fit mx-auto mb-6 shadow-elevation-1">
                <MapPin className="h-12 w-12 text-success-600" />
              </div>
              <h4 className="text-h6 text-primary mb-3">Local Expertise</h4>
              <p className="text-body2 text-secondary">Knows every destination like a local</p>
            </div>
            <div className="text-center">
              <div className="card bg-warning-100 p-6 w-fit mx-auto mb-6 shadow-elevation-1">
                <Zap className="h-12 w-12 text-warning-600" />
              </div>
              <h4 className="text-h6 text-primary mb-3">Instant Actions</h4>
              <p className="text-body2 text-secondary">Takes immediate action on your behalf</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelAssistant;