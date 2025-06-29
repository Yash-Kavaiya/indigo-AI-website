import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, PaperclipIcon, 
  Mic, Download, Bot, User, MoreVertical, 
  ChevronDown, FileJson, FileText, FileSpreadsheet 
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI travel assistant. How can I help you today?',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(message),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string) => {
    const userMessageLower = userMessage.toLowerCase();
    
    if (userMessageLower.includes('flight') && userMessageLower.includes('book')) {
      return "I'd be happy to help you book a flight! To get started, could you provide your departure city, destination, and travel dates?";
    } else if (userMessageLower.includes('cancel')) {
      return "If you need to cancel a booking, you can do so through the 'Manage Booking' section with your booking reference. Cancellation fees may apply depending on your fare type and how close it is to your departure date.";
    } else if (userMessageLower.includes('baggage') || userMessageLower.includes('luggage')) {
      return "For domestic flights, you're allowed one piece of cabin baggage weighing up to 7 kg and check-in baggage of 15 kg. International allowances vary by route. Would you like specific information about baggage fees or dimensions?";
    } else if (userMessageLower.includes('delay') || userMessageLower.includes('reschedule')) {
      return "I'm sorry to hear about potential delays. You can check real-time flight status on our website or app. In case of significant delays, we'll assist with rebooking or provide compensation as per our policy. Would you like me to check a specific flight status for you?";
    } else {
      return "I'm here to help with all your travel needs. You can ask me about bookings, flight status, baggage policy, or any other travel-related questions. How else can I assist you today?";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const exportTranscript = (format: 'json' | 'csv' | 'text') => {
    let data: string = '';
    let fileName: string = `chat-transcript-${new Date().toISOString().slice(0, 10)}`;
    let mimeType: string = '';

    switch (format) {
      case 'json':
        data = JSON.stringify(messages, null, 2);
        fileName += '.json';
        mimeType = 'application/json';
        break;
      case 'csv':
        // CSV header
        data = 'Type,Content,Timestamp\n';
        // Add each message as a row
        data += messages.map(msg => 
          `"${msg.type}","${msg.content.replace(/"/g, '""')}","${msg.timestamp.toISOString()}"`
        ).join('\n');
        fileName += '.csv';
        mimeType = 'text/csv';
        break;
      case 'text':
        data = messages.map(msg => 
          `[${msg.timestamp.toLocaleString()}] ${msg.type.toUpperCase()}: ${msg.content}`
        ).join('\n\n');
        fileName += '.txt';
        mimeType = 'text/plain';
        break;
    }

    // Create download link
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  return (
    <>
      {/* Chat Widget Button */}
      <button
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-elevation-3 z-50 transition-all duration-300 ${
          isOpen 
            ? 'bg-error-500 hover:bg-error-600 rotate-90 transform'
            : 'bg-primary-500 hover:bg-primary-600'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageSquare className="h-6 w-6 text-white" />}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-20 right-6 w-96 rounded-2xl shadow-elevation-4 bg-white overflow-hidden z-50 transition-all duration-300 transform ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 rounded-full p-2">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-h6 font-bold">Travel Assistant</h3>
                <p className="text-body2 text-primary-100">Online | Powered by AI</p>
              </div>
            </div>
            <div className="relative">
              <button 
                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              
              {/* Export Menu */}
              {showExportMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-elevation-3 p-2 w-48 z-10">
                  <h4 className="text-primary text-body2 font-medium px-3 py-2">Export Transcript</h4>
                  <div className="space-y-1">
                    <button 
                      className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => exportTranscript('json')}
                    >
                      <FileJson className="h-4 w-4 text-primary-500" />
                      <span className="text-body2 text-gray-700">JSON Format</span>
                    </button>
                    <button 
                      className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => exportTranscript('csv')}
                    >
                      <FileSpreadsheet className="h-4 w-4 text-success-500" />
                      <span className="text-body2 text-gray-700">CSV Format</span>
                    </button>
                    <button 
                      className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => exportTranscript('text')}
                    >
                      <FileText className="h-4 w-4 text-secondary-500" />
                      <span className="text-body2 text-gray-700">Text Format</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div 
          className="h-96 p-4 overflow-y-auto" 
          ref={chatContainerRef}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#E5E7EB transparent'
          }}
        >
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'ai' && (
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center mr-2">
                    <Bot className="h-5 w-5 text-primary-600" />
                  </div>
                )}
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    msg.type === 'user'
                      ? 'bg-primary-500 text-white rounded-tr-none'
                      : 'bg-gray-100 text-primary rounded-tl-none'
                  }`}
                >
                  <p className="text-body2">{msg.content}</p>
                  <p 
                    className={`text-right text-xs mt-1 ${
                      msg.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
                {msg.type === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-secondary-100 flex-shrink-0 flex items-center justify-center ml-2">
                    <User className="h-5 w-5 text-secondary-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center mr-2">
                  <Bot className="h-5 w-5 text-primary-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-primary">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <PaperclipIcon className="h-5 w-5" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
            >
              <Mic className="h-5 w-5" />
            </button>
          </form>
          <div className="mt-2 text-center">
            <button 
              className="text-xs text-gray-500 hover:text-primary-500 inline-flex items-center"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <Download className="h-3 w-3 mr-1" />
              Export Transcript
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotWidget;