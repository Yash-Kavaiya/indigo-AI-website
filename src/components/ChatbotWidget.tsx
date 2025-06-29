import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, PaperclipIcon, 
  Mic, Download, Bot, User, MoreVertical, 
  ChevronDown, FileJson, FileText, FileSpreadsheet,
  Camera, Video, Upload, MonitorUp, Square, Loader,
  Image, XCircle, Check, PauseCircle, PlayCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  mediaType?: 'image' | 'video' | 'file' | 'screen';
  mediaUrl?: string;
  fileName?: string;
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
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [showInputOptions, setShowInputOptions] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioTranscription, setAudioTranscription] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'file' | 'screen' | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isRecordingVoice) {
      startVoiceRecording();
    } else {
      stopVoiceRecording();
    }
    return () => {
      stopVoiceRecording();
    };
  }, [isRecordingVoice]);

  useEffect(() => {
    if (isVideoRecording) {
      startVideoRecording();
      
      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      stopVideoRecording();
      
      // Clear timer
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      
      // Reset timer
      setRecordingTime(0);
    }
    
    return () => {
      // Cleanup
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      stopMediaStream();
    };
  }, [isVideoRecording]);

  useEffect(() => {
    if (isCameraOpen) {
      startCamera();
    } else {
      stopMediaStream();
    }
    
    return () => {
      stopMediaStream();
    };
  }, [isCameraOpen]);

  useEffect(() => {
    if (!isOpen) {
      // Clean up all media when chat is closed
      stopMediaStream();
      setIsCameraOpen(false);
      setIsVideoRecording(false);
      setIsScreenSharing(false);
      setIsRecordingVoice(false);
      setMediaPreview(null);
      setMediaType(null);
      setUploadFile(null);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsCameraOpen(false);
      alert('Could not access camera. Please check your permissions.');
    }
  };

  const takePicture = () => {
    if (videoRef.current && streamRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setMediaPreview(imageDataUrl);
        setMediaType('image');
        setIsCameraOpen(false);
      }
    }
  };

  // Video recording functions
  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      
      // Initialize MediaRecorder
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      
      // Clear previous chunks
      mediaChunksRef.current = [];
      
      // Collect data
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          mediaChunksRef.current.push(e.data);
        }
      };
      
      // When recording stops
      recorder.onstop = () => {
        const blob = new Blob(mediaChunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setMediaPreview(videoUrl);
        setMediaType('video');
      };
      
      // Start recording
      recorder.start();
    } catch (error) {
      console.error('Error starting video recording:', error);
      setIsVideoRecording(false);
      alert('Could not access camera or microphone. Please check your permissions.');
    }
  };

  const stopVideoRecording = () => {
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop();
    }
  };

  // Screen sharing functions
  const shareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      
      // Take a screenshot immediately
      const video = document.createElement('video');
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        
        setTimeout(() => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const screenShotUrl = canvas.toDataURL('image/jpeg');
            setMediaPreview(screenShotUrl);
            setMediaType('screen');
          }
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
          setIsScreenSharing(false);
        }, 500); // Small delay to ensure the video is loaded
      };
    } catch (error) {
      console.error('Error sharing screen:', error);
      setIsScreenSharing(false);
      alert('Could not share screen. Please check your permissions.');
    }
  };

  // Voice recording functions
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Initialize MediaRecorder
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      
      // Clear previous chunks
      mediaChunksRef.current = [];
      
      // Collect data
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          mediaChunksRef.current.push(e.data);
        }
      };
      
      // When recording stops
      recorder.onstop = () => {
        // In a real app, you would send this audio to a speech-to-text service
        // Here we'll simulate a transcription after a delay
        setTimeout(() => {
          const transcription = "This is a simulated transcription of what would be converted from speech to text.";
          setAudioTranscription(transcription);
          setMessage(transcription);
          setIsRecordingVoice(false);
        }, 1000);
      };
      
      // Start recording
      recorder.start();
    } catch (error) {
      console.error('Error starting voice recording:', error);
      setIsRecordingVoice(false);
      alert('Could not access microphone. Please check your permissions.');
    }
  };

  const stopVoiceRecording = () => {
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop();
    }
  };

  const stopMediaStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadFile(file);
      
      // Create preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            setMediaPreview(e.target.result);
            setMediaType('image');
          }
        };
        reader.readAsDataURL(file);
      } else {
        // For non-image files, just show the filename
        setMediaPreview(null);
        setMediaType('file');
      }
    }
  };

  const clearMedia = () => {
    setMediaPreview(null);
    setMediaType(null);
    setUploadFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!message.trim() && !mediaPreview)) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message.trim(),
      timestamp: new Date(),
    };
    
    // Add media if present
    if (mediaPreview) {
      userMessage.mediaType = mediaType || 'file';
      userMessage.mediaUrl = mediaPreview;
      
      if (mediaType === 'file' && uploadFile) {
        userMessage.fileName = uploadFile.name;
      }
    }
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // Clear media preview after sending
    clearMedia();

    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(message, mediaType),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string, mediaSent: string | null = null) => {
    if (mediaSent) {
      switch (mediaSent) {
        case 'image':
          return "I've received your image. Is there anything specific about this image you'd like help with?";
        case 'video':
          return "Thanks for sharing the video. How can I assist you with this content?";
        case 'file':
          return "I've received your file. Let me know if you need any assistance related to this document.";
        case 'screen':
          return "I can see your screen capture. What would you like to know about what's shown?";
      }
    }
    
    const userMessageLower = userMessage.toLowerCase();
    
    if (userMessageLower.includes('flight') && userMessageLower.includes('book')) {
      return "I'd be happy to help you book a flight! To get started, could you provide your departure city, destination, and travel dates?";
    } else if (userMessageLower.includes('cancel')) {
      return "If you need to cancel a booking, you can do so through the 'Manage Booking' section with your booking reference. Cancellation fees may apply depending on your fare type and how close it is to your departure date.";
    } else if (userMessageLower.includes('baggage') || userMessageLower.includes('luggage')) {
      return "For domestic flights, you're allowed one piece of cabin baggage weighing up to 7 kg and check-in baggage of 15 kg. International allowances vary by route. Would you like specific information about baggage fees or dimensions?";
    } else if (userMessageLower.includes('delay') || userMessageLower.includes('reschedule')) {
      return "I'm sorry to hear about potential delays. You can check real-time flight status on our website or app. In case of significant delays, we'll assist with rebooking or provide compensation as per our policy. Would you like me to check a specific flight status for you?";
    } else if (!userMessageLower) {
      return "I see you've sent a message. How can I assist you with your travel plans today?";
    } else {
      return "I'm here to help with all your travel needs. You can ask me about bookings, flight status, baggage policy, or any other travel-related questions. How else can I assist you today?";
    }
  };

  const exportTranscript = (format: 'json' | 'csv' | 'text') => {
    let data: string = '';
    let fileName: string = `chat-transcript-${new Date().toISOString().slice(0, 10)}`;
    let mimeType: string = '';

    switch (format) {
      case 'json':
        // Create a simplified version without circular references
        const simplifiedMessages = messages.map(msg => ({
          type: msg.type,
          content: msg.content,
          timestamp: msg.timestamp.toISOString(),
          mediaType: msg.mediaType || null,
          // Don't include actual media data in export, just note that media was shared
          hasMedia: !!msg.mediaType
        }));
        
        data = JSON.stringify(simplifiedMessages, null, 2);
        fileName += '.json';
        mimeType = 'application/json';
        break;
      case 'csv':
        // CSV header
        data = 'Type,Content,Timestamp,MediaType\n';
        // Add each message as a row
        data += messages.map(msg => 
          `"${msg.type}","${msg.content.replace(/"/g, '""')}","${msg.timestamp.toISOString()}","${msg.mediaType || ''}"`
        ).join('\n');
        fileName += '.csv';
        mimeType = 'text/csv';
        break;
      case 'text':
        data = messages.map(msg => {
          let text = `[${msg.timestamp.toLocaleString()}] ${msg.type.toUpperCase()}: ${msg.content}`;
          if (msg.mediaType) {
            text += ` [Shared ${msg.mediaType}]`;
          }
          return text;
        }).join('\n\n');
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

  const renderMediaPreview = () => {
    if (!mediaPreview) return null;
    
    return (
      <div className="relative mt-2 border border-gray-300 rounded-lg overflow-hidden">
        {mediaType === 'image' || mediaType === 'screen' ? (
          <div className="relative w-full h-40">
            <img 
              src={mediaPreview} 
              alt="Preview" 
              className="w-full h-full object-contain bg-gray-100"
            />
            <button 
              className="absolute top-1 right-1 bg-error-500 text-white p-1 rounded-full"
              onClick={clearMedia}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : mediaType === 'video' ? (
          <div className="relative w-full h-40">
            <video 
              src={mediaPreview} 
              className="w-full h-full object-contain bg-black" 
              controls
            />
            <button 
              className="absolute top-1 right-1 bg-error-500 text-white p-1 rounded-full"
              onClick={clearMedia}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : mediaType === 'file' && uploadFile ? (
          <div className="bg-gray-100 p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-500" />
              <span className="text-body2 truncate max-w-[200px]">{uploadFile.name}</span>
            </div>
            <button 
              className="text-error-500 hover:bg-gray-200 p-1 rounded-full"
              onClick={clearMedia}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    );
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
      <div className={`fixed bottom-20 right-6 w-[500px] max-w-[95vw] rounded-2xl shadow-elevation-4 bg-white overflow-hidden z-50 transition-all duration-300 transform ${
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
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} max-w-full`}
              >
                {msg.type === 'ai' && (
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center mr-2">
                    <Bot className="h-5 w-5 text-primary-600" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.type === 'user'
                      ? 'bg-primary-500 text-white rounded-tr-none'
                      : 'bg-gray-100 text-primary rounded-tl-none'
                  }`}
                >
                  {/* Media Content if exists */}
                  {msg.mediaType && msg.mediaUrl && (
                    <div className="mb-2 rounded overflow-hidden">
                      {(msg.mediaType === 'image' || msg.mediaType === 'screen') && (
                        <img 
                          src={msg.mediaUrl} 
                          alt="Shared image" 
                          className="max-w-full max-h-40 object-contain"
                        />
                      )}
                      {msg.mediaType === 'video' && (
                        <video 
                          src={msg.mediaUrl} 
                          controls 
                          className="max-w-full max-h-40 object-contain"
                        />
                      )}
                      {msg.mediaType === 'file' && (
                        <div className={`flex items-center space-x-2 p-2 rounded ${
                          msg.type === 'user' ? 'bg-white/20' : 'bg-gray-200'
                        }`}>
                          <FileText className={`h-4 w-4 ${
                            msg.type === 'user' ? 'text-white' : 'text-gray-600'
                          }`} />
                          <span className="text-sm truncate">{msg.fileName || 'Attached file'}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Text Content */}
                  {msg.content && <p className="text-body2">{msg.content}</p>}
                  
                  {/* Timestamp */}
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

        {/* Camera View */}
        {isCameraOpen && (
          <div className="relative">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-48 object-cover bg-black"
            />
            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-4">
              <button 
                className="bg-white p-2 rounded-full shadow-md"
                onClick={takePicture}
              >
                <Camera className="h-6 w-6 text-primary-500" />
              </button>
              <button 
                className="bg-white p-2 rounded-full shadow-md"
                onClick={() => setIsCameraOpen(false)}
              >
                <X className="h-6 w-6 text-error-500" />
              </button>
            </div>
          </div>
        )}

        {/* Video Recording View */}
        {isVideoRecording && (
          <div className="relative">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="w-full h-48 object-cover bg-black"
            />
            <div className="absolute top-3 left-3 bg-error-500 text-white px-3 py-1 rounded-full flex items-center space-x-2 animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="text-sm font-medium">{formatRecordingTime(recordingTime)}</span>
            </div>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-4">
              <button 
                className="bg-white p-2 rounded-full shadow-md"
                onClick={() => setIsVideoRecording(false)}
              >
                <Square className="h-6 w-6 text-error-500" />
              </button>
            </div>
          </div>
        )}

        {/* Media Preview */}
        {renderMediaPreview()}

        {/* Media Tools Bar - More visible than the dropdown menu */}
        <div className="bg-gray-100 border-t border-b border-gray-200 p-2 flex justify-center space-x-3">
          <button 
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-primary-500 flex flex-col items-center"
            onClick={() => setIsCameraOpen(true)}
            title="Take a photo"
          >
            <Camera className="h-5 w-5" />
            <span className="text-xs mt-1">Photo</span>
          </button>
          
          <button 
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-success-500 flex flex-col items-center"
            onClick={() => setIsVideoRecording(true)}
            title="Record a video"
          >
            <Video className="h-5 w-5" />
            <span className="text-xs mt-1">Video</span>
          </button>
          
          <button 
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-secondary-500 flex flex-col items-center"
            onClick={() => {
              setIsScreenSharing(true);
              shareScreen();
            }}
            title="Share your screen"
          >
            <MonitorUp className="h-5 w-5" />
            <span className="text-xs mt-1">Screen</span>
          </button>
          
          <button 
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-warning-500 flex flex-col items-center"
            onClick={() => fileInputRef.current?.click()}
            title="Upload a file"
          >
            <Upload className="h-5 w-5" />
            <span className="text-xs mt-1">File</span>
          </button>
          
          <button 
            className={`p-2 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center ${
              isRecordingVoice ? 'text-error-500' : 'text-gray-600'
            }`}
            onClick={() => setIsRecordingVoice(!isRecordingVoice)}
            title="Record voice"
          >
            <Mic className="h-5 w-5" />
            <span className="text-xs mt-1">Voice</span>
          </button>
        </div>

        {/* Input Options Menu */}
        {showInputOptions && (
          <div className="absolute bottom-[4.5rem] left-4 bg-white rounded-xl shadow-elevation-3 p-2 z-10">
            <div className="space-y-1">
              <button 
                className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowInputOptions(false);
                  setIsCameraOpen(true);
                }}
              >
                <Camera className="h-4 w-4 text-primary-500" />
                <span className="text-body2 text-gray-700">Take Picture</span>
              </button>
              
              <button 
                className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowInputOptions(false);
                  setIsVideoRecording(true);
                }}
              >
                <Video className="h-4 w-4 text-success-500" />
                <span className="text-body2 text-gray-700">Record Video</span>
              </button>
              
              <button 
                className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowInputOptions(false);
                  setIsScreenSharing(true);
                  shareScreen();
                }}
              >
                <MonitorUp className="h-4 w-4 text-secondary-500" />
                <span className="text-body2 text-gray-700">Share Screen</span>
              </button>
              
              <button 
                className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowInputOptions(false);
                  fileInputRef.current?.click();
                }}
              >
                <Upload className="h-4 w-4 text-warning-500" />
                <span className="text-body2 text-gray-700">Upload File</span>
              </button>
            </div>
          </div>
        )}

        {/* Voice Recording Indicator */}
        {isRecordingVoice && (
          <div className="bg-primary-50 p-3 border-t border-primary-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-error-500 rounded-full animate-pulse"></div>
              <span className="text-body2 text-primary">Recording voice...</span>
            </div>
            <button 
              className="text-error-500 hover:bg-error-50 p-2 rounded-full transition-colors"
              onClick={() => setIsRecordingVoice(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Input Form */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileUpload} 
              accept="image/*,video/*,application/pdf,application/msword,application/vnd.ms-excel"
            />
            
            <div className="relative flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={isRecordingVoice}
              />
              <button 
                type="button" 
                onClick={() => setShowInputOptions(!showInputOptions)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <PaperclipIcon className="h-5 w-5" />
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!message.trim() && !mediaPreview}
              className="p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
            
            <button
              type="button"
              onClick={() => setIsRecordingVoice(!isRecordingVoice)}
              className={`p-2 rounded-full ${isRecordingVoice 
                ? 'bg-error-500 text-white hover:bg-error-600' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
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