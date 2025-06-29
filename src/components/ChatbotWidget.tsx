import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Bot, MessageCircle, Send, X, Minimize2, Maximize2, Mic, Camera, Monitor, Video, 
  Paperclip, Phone, PhoneOff, MicOff, VideoOff, Settings, Upload, Download, 
  ArrowRight, Play, Pause, Square, RotateCcw, ZoomIn, ZoomOut, MousePointer, 
  Pen, Type, Circle, Inspect as Rect, ArrowUp, Trash2, Save, Share2, Copy, 
  Volume2, VolumeX, ScreenShare, ScreenShareOff, CameraOff, Timer, Sun, 
  RefreshCw, AlertCircle, CheckCircle, Loader, Maximize, Image, MoreHorizontal,
  FlashlightOff, Flashlight, RotateCcw as Rotate, Crop, Filter, Eye, EyeOff
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'voice' | 'image' | 'file' | 'video' | 'screen-share';
  fileUrl?: string;
  fileName?: string;
  imageFormat?: 'jpeg' | 'png' | 'webp';
}

interface CameraDevice {
  deviceId: string;
  label: string;
  kind: MediaDeviceKind;
}

interface CameraState {
  isActive: boolean;
  stream: MediaStream | null;
  isRecording: boolean;
  devices: CameraDevice[];
  selectedDevice: string;
  resolution: '720p' | '1080p' | '4k';
  isFlashOn: boolean;
  captureFormat: 'jpeg' | 'png';
  countdownTimer: 0 | 3 | 5 | 10;
  isCountingDown: boolean;
  lastPhoto: string | null;
  hasPermission: boolean;
  permissionError: string | null;
  isLoading: boolean;
}

interface ScreenShareState {
  isActive: boolean;
  stream: MediaStream | null;
  shareType: 'screen' | 'window' | 'tab';
  audioEnabled: boolean;
  resolution: 'auto' | '720p' | '1080p' | '4k';
  hasPermission: boolean;
  permissionError: string | null;
  isLoading: boolean;
}

interface CallState {
  isActive: boolean;
  isVideo: boolean;
  isMuted: boolean;
  isCameraOff: boolean;
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeFeature, setActiveFeature] = useState<'chat' | 'camera' | 'screen-share' | 'call'>('chat');
  
  const [callState, setCallState] = useState<CallState>({
    isActive: false,
    isVideo: false,
    isMuted: false,
    isCameraOff: false
  });
  
  const [cameraState, setCameraState] = useState<CameraState>({
    isActive: false,
    stream: null,
    isRecording: false,
    devices: [],
    selectedDevice: '',
    resolution: '720p',
    isFlashOn: false,
    captureFormat: 'jpeg',
    countdownTimer: 0,
    isCountingDown: false,
    lastPhoto: null,
    hasPermission: false,
    permissionError: null,
    isLoading: false
  });

  const [screenShareState, setScreenShareState] = useState<ScreenShareState>({
    isActive: false,
    stream: null,
    shareType: 'screen',
    audioEnabled: true,
    resolution: 'auto',
    hasPermission: false,
    permissionError: null,
    isLoading: false
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your advanced AI travel assistant with full multimedia support including HD camera, screen sharing, and live collaboration tools. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ]);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const screenShareVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Utility Functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getVideoConstraints = (resolution: string, deviceId?: string) => {
    const constraints: MediaStreamConstraints = {
      video: {
        deviceId: deviceId ? { exact: deviceId } : undefined,
        facingMode: 'user'
      },
      audio: false
    };

    switch (resolution) {
      case '720p':
        constraints.video = {
          ...constraints.video,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        };
        break;
      case '1080p':
        constraints.video = {
          ...constraints.video,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        };
        break;
      case '4k':
        constraints.video = {
          ...constraints.video,
          width: { ideal: 3840 },
          height: { ideal: 2160 }
        };
        break;
    }

    return constraints;
  };

  const getDisplayMediaConstraints = (shareType: string, resolution: string, audioEnabled: boolean) => {
    const constraints: DisplayMediaStreamConstraints = {
      video: true,
      audio: audioEnabled
    };

    if (resolution !== 'auto') {
      switch (resolution) {
        case '720p':
          constraints.video = {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          };
          break;
        case '1080p':
          constraints.video = {
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          };
          break;
        case '4k':
          constraints.video = {
            width: { ideal: 3840 },
            height: { ideal: 2160 }
          };
          break;
      }
    }

    return constraints;
  };

  // Camera Functions
  const getCameraDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices
        .filter(device => device.kind === 'videoinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${device.deviceId.slice(0, 8)}`,
          kind: device.kind
        }));
      
      setCameraState(prev => ({ 
        ...prev, 
        devices: videoDevices,
        selectedDevice: videoDevices[0]?.deviceId || ''
      }));
    } catch (error) {
      console.error('Error getting camera devices:', error);
    }
  };

  const requestCameraPermission = async () => {
    setCameraState(prev => ({ ...prev, isLoading: true, permissionError: null }));
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setCameraState(prev => ({ ...prev, hasPermission: true, isLoading: false }));
      await getCameraDevices();
      return true;
    } catch (error: any) {
      let errorMessage = 'Unable to access camera. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera permissions in your browser settings.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera device found. Please connect a camera.';
      } else if (error.name === 'NotReadableError') {
        errorMessage += 'Camera is being used by another application.';
      } else {
        errorMessage += 'Please check your camera settings and try again.';
      }
      
      setCameraState(prev => ({ 
        ...prev, 
        hasPermission: false, 
        permissionError: errorMessage,
        isLoading: false 
      }));
      return false;
    }
  };

  const startCamera = async () => {
    if (!cameraState.hasPermission) {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;
    }

    setCameraState(prev => ({ ...prev, isLoading: true }));

    try {
      const constraints = getVideoConstraints(cameraState.resolution, cameraState.selectedDevice);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      setCameraState(prev => ({ 
        ...prev, 
        isActive: true, 
        stream,
        isLoading: false,
        permissionError: null
      }));
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setActiveFeature('camera');
      
      const cameraMessage: Message = {
        id: Date.now().toString(),
        text: `Camera activated at ${cameraState.resolution} resolution - I can now assist with visual travel planning`,
        isUser: false,
        timestamp: new Date(),
        type: 'video'
      };
      setMessages(prev => [...prev, cameraMessage]);
    } catch (error: any) {
      let errorMessage = 'Failed to start camera. ';
      
      if (error.name === 'OverconstrainedError') {
        errorMessage += 'The selected resolution is not supported by your camera.';
      } else {
        errorMessage += 'Please check your camera settings and try again.';
      }
      
      setCameraState(prev => ({ 
        ...prev, 
        isLoading: false,
        permissionError: errorMessage
      }));
    }
  };

  const stopCamera = () => {
    if (cameraState.stream) {
      cameraState.stream.getTracks().forEach(track => track.stop());
    }
    
    setCameraState(prev => ({ 
      ...prev, 
      isActive: false, 
      stream: null, 
      isRecording: false,
      isCountingDown: false,
      isLoading: false
    }));
    
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    
    if (activeFeature === 'camera') setActiveFeature('chat');
  };

  const switchCamera = async (deviceId: string) => {
    if (!cameraState.isActive) return;
    
    setCameraState(prev => ({ ...prev, selectedDevice: deviceId, isLoading: true }));
    
    try {
      if (cameraState.stream) {
        cameraState.stream.getTracks().forEach(track => track.stop());
      }
      
      const constraints = getVideoConstraints(cameraState.resolution, deviceId);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      setCameraState(prev => ({ ...prev, stream, isLoading: false }));
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setCameraState(prev => ({ 
        ...prev, 
        isLoading: false,
        permissionError: 'Failed to switch camera device'
      }));
    }
  };

  const capturePhotoWithCountdown = (countdown: number) => {
    if (countdown === 0) {
      capturePhoto();
      return;
    }

    setCameraState(prev => ({ ...prev, countdownTimer: countdown as 3 | 5 | 10, isCountingDown: true }));
    
    let timeLeft = countdown;
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    
    countdownIntervalRef.current = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        setCameraState(prev => ({ ...prev, isCountingDown: false }));
        capturePhoto();
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
        }
      }
    }, 1000);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    // Set 16:9 aspect ratio
    const aspectRatio = 16 / 9;
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    
    let sourceWidth = video.videoWidth;
    let sourceHeight = video.videoHeight;
    let sourceX = 0;
    let sourceY = 0;
    
    if (videoAspectRatio > aspectRatio) {
      sourceWidth = video.videoHeight * aspectRatio;
      sourceX = (video.videoWidth - sourceWidth) / 2;
    } else {
      sourceHeight = video.videoWidth / aspectRatio;
      sourceY = (video.videoHeight - sourceHeight) / 2;
    }
    
    canvas.width = 1280;
    canvas.height = 720;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Apply flash effect if enabled
      if (cameraState.isFlashOn) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
          ctx.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
          savePhoto();
        }, 100);
      } else {
        ctx.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
        savePhoto();
      }
    }
  };

  const savePhoto = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const mimeType = cameraState.captureFormat === 'png' ? 'image/png' : 'image/jpeg';
    const quality = cameraState.captureFormat === 'jpeg' ? 0.9 : undefined;
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setCameraState(prev => ({ ...prev, lastPhoto: url }));
        
        const photoMessage: Message = {
          id: Date.now().toString(),
          text: `Photo captured in ${cameraState.captureFormat.toUpperCase()} format`,
          isUser: true,
          timestamp: new Date(),
          type: 'image',
          fileName: `camera-photo-${Date.now()}.${cameraState.captureFormat}`,
          fileUrl: url,
          imageFormat: cameraState.captureFormat
        };
        setMessages(prev => [...prev, photoMessage]);
        
        // Add AI response
        setTimeout(() => {
          const aiResponse: Message = {
            id: Date.now().toString() + "-response",
            text: "I've received your photo! I can help analyze this for your travel planning. Would you like me to identify landmarks, suggest similar destinations, or look for travel accommodations in this area?",
            isUser: false,
            timestamp: new Date(),
            type: 'text'
          };
          setMessages(prev => [...prev, aiResponse]);
        }, 1000);
      }
    }, mimeType, quality);
  };

  // Screen Share Functions
  const requestScreenSharePermission = async () => {
    setScreenShareState(prev => ({ ...prev, isLoading: true, permissionError: null }));
    
    try {
      const constraints = getDisplayMediaConstraints(
        screenShareState.shareType, 
        screenShareState.resolution, 
        screenShareState.audioEnabled
      );
      
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      stream.getTracks().forEach(track => track.stop());
      
      setScreenShareState(prev => ({ ...prev, hasPermission: true, isLoading: false }));
      return true;
    } catch (error: any) {
      let errorMessage = 'Unable to access screen sharing. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow screen sharing permissions.';
      } else {
        errorMessage += 'Please check your browser settings and try again.';
      }
      
      setScreenShareState(prev => ({ 
        ...prev, 
        hasPermission: false, 
        permissionError: errorMessage,
        isLoading: false 
      }));
      return false;
    }
  };

  const startScreenShare = async () => {
    if (!screenShareState.hasPermission) {
      const hasPermission = await requestScreenSharePermission();
      if (!hasPermission) return;
    }

    setScreenShareState(prev => ({ ...prev, isLoading: true }));

    try {
      const constraints = getDisplayMediaConstraints(
        screenShareState.shareType, 
        screenShareState.resolution, 
        screenShareState.audioEnabled
      );
      
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      
      setScreenShareState(prev => ({ 
        ...prev, 
        isActive: true, 
        stream,
        isLoading: false,
        permissionError: null
      }));
      
      if (screenShareVideoRef.current) {
        screenShareVideoRef.current.srcObject = stream;
      }
      
      setActiveFeature('screen-share');
      
      const shareMessage: Message = {
        id: Date.now().toString(),
        text: `Screen sharing started at ${screenShareState.resolution} resolution ${screenShareState.audioEnabled ? 'with audio' : 'without audio'}`,
        isUser: true,
        timestamp: new Date(),
        type: 'screen-share'
      };
      setMessages(prev => [...prev, shareMessage]);

      // Add AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now().toString() + "-response",
          text: "I can see your screen now! I'll be able to provide real-time guidance as you navigate through your travel planning. Feel free to show me any websites, itineraries, or booking questions you have.",
          isUser: false,
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);

      // Handle stream end
      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
    } catch (error: any) {
      let errorMessage = 'Failed to start screen sharing. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Screen sharing was denied or cancelled.';
      } else {
        errorMessage += 'Please try again or check your browser settings.';
      }
      
      setScreenShareState(prev => ({ 
        ...prev, 
        isLoading: false,
        permissionError: errorMessage
      }));
    }
  };

  const stopScreenShare = () => {
    if (screenShareState.stream) {
      screenShareState.stream.getTracks().forEach(track => track.stop());
    }
    
    setScreenShareState(prev => ({ 
      ...prev, 
      isActive: false, 
      stream: null,
      isLoading: false
    }));
    
    if (activeFeature === 'screen-share') setActiveFeature('chat');
    
    // Add message about ending screen share
    const endMessage: Message = {
      id: Date.now().toString(),
      text: "Screen sharing ended. Let me know if you'd like to share your screen again or need any other assistance.",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, endMessage]);
  };

  // Voice Recording Functions
  const startVoiceRecording = () => {
    setIsRecording(true);
    
    // Show recording status message
    const recordingStartMessage: Message = {
      id: Date.now().toString(),
      text: "Recording voice message...",
      isUser: true,
      timestamp: new Date(),
      type: 'voice'
    };
    setMessages(prev => [...prev, recordingStartMessage]);
    
    // Simulate ending recording after 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      
      // Replace with completed voice message
      setMessages(prev => {
        const filteredMessages = prev.filter(msg => msg.id !== recordingStartMessage.id);
        return [
          ...filteredMessages,
          {
            id: Date.now().toString(),
            text: "Voice message: I need help finding flights to Bali with good connections and reasonable prices for next month.",
            isUser: true,
            timestamp: new Date(),
            type: 'voice'
          }
        ];
      });
      
      // Add AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now().toString() + "-response",
          text: "I've processed your voice message about flights to Bali. Looking at next month, I'm seeing good options with Singapore Airlines and Garuda Indonesia with connections in Singapore or Jakarta. Prices range from $800-1200 round trip. When exactly were you planning to travel, and do you have a specific budget in mind?",
          isUser: false,
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }, 3000);
  };

  // File Upload Functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const fileTypeMap: {[key: string]: string} = {
      'image/jpeg': 'image',
      'image/png': 'image',
      'image/gif': 'image',
      'application/pdf': 'file',
      'application/msword': 'file',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'file',
      'text/plain': 'file',
    };
    
    const fileType = fileTypeMap[file.type] || 'file';
    
    const fileMessage: Message = {
      id: Date.now().toString(),
      text: `Uploaded ${fileType}: ${file.name}`,
      isUser: true,
      timestamp: new Date(),
      type: fileType as 'file' | 'image',
      fileName: file.name,
      fileUrl: URL.createObjectURL(file)
    };
    
    setMessages(prev => [...prev, fileMessage]);
    
    // Clear the input to allow uploading the same file again
    event.target.value = '';
    
    // Add AI response
    setTimeout(() => {
      let responseText = "";
      if (fileType === 'image') {
        responseText = "Thanks for sharing this image! I can analyze this for your travel planning. It looks like a beautiful destination. Would you like information about this location or similar places to visit?";
      } else {
        responseText = `I've received your file "${file.name}". I'll analyze its contents to help with your travel planning. Is there anything specific you'd like me to look for in this document?`;
      }
      
      const aiResponse: Message = {
        id: Date.now().toString() + "-response",
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Message Functions
  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(message),
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string): string => {
    const responses = [
      "I can see your camera feed clearly! Let me help you with visual travel planning and destination recommendations.",
      "Perfect screen sharing quality! I can now provide detailed assistance with your travel booking interface.",
      "Great! With your multimedia setup, I can offer enhanced visual travel guidance and real-time collaboration.",
      "I'm analyzing your screen content to provide the most relevant travel recommendations and assistance.",
      "Excellent camera quality! I can now help you with visual passport photo requirements and travel documentation.",
      "Your screen sharing is working perfectly. Let me guide you through the booking process step by step.",
      "I can see everything clearly through your camera. How can I assist with your travel planning today?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // UI Helper Functions
  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'voice': return <Mic className="h-4 w-4 text-success-500" />;
      case 'video': return <Video className="h-4 w-4 text-primary-500" />;
      case 'file': return <Paperclip className="h-4 w-4 text-secondary-500" />;
      case 'image': return <Camera className="h-4 w-4 text-warning-500" />;
      case 'screen-share': return <Monitor className="h-4 w-4 text-purple-500" />;
      default: return null;
    }
  };

  // Permission Error Component
  const PermissionError: React.FC<{ 
    error: string; 
    onRetry: () => void; 
    onDismiss: () => void;
  }> = ({ error, onRetry, onDismiss }) => (
    <div className="bg-error-50 border-2 border-error-200 rounded-2xl p-6 m-4">
      <div className="flex items-start space-x-4">
        <AlertCircle className="h-6 w-6 text-error-500 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-h6 text-error-700 mb-2">Permission Required</h4>
          <p className="text-body2 text-error-600 mb-4">{error}</p>
          <div className="flex space-x-3">
            <button
              onClick={onRetry}
              className="btn-contained bg-error-500 hover:bg-error-600 text-white text-sm"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
            <button
              onClick={onDismiss}
              className="btn-outlined border-error-500 text-error-500 hover:bg-error-50 text-sm"
            >
              <span>Dismiss</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Chat Widget Button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Chat Assistant"
          className="btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-full shadow-elevation-3 hover:shadow-elevation-4 ripple transform hover:scale-110 transition-all duration-300 group relative"
        >
          <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-success-400 rounded-full animate-pulse"></div>
          <div className="absolute -top-2 -left-2 bg-error-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce font-bold">
            1
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div 
        className="flex-1 bg-black/30 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      ></div>
      
      {/* Chat Widget */}
      <div className={`bg-white shadow-elevation-4 transition-all duration-300 flex flex-col ${
        isMinimized ? 'w-80 h-20' : 'w-full max-w-7xl h-full'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-2xl p-3 relative">
              <Bot className="h-8 w-8" />
              {(cameraState.isActive || screenShareState.isActive || callState.isActive) && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success-400 rounded-full animate-pulse"></div>
              )}
            </div>
            <div>
              <h3 className="text-h5 font-bold">AeroAI Assistant</h3>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse"></div>
                <span className="text-body2 text-primary-100">
                  {cameraState.isActive ? `Camera Active (${cameraState.resolution})` : 
                   screenShareState.isActive ? `Screen Sharing (${screenShareState.resolution})` : 
                   callState.isActive ? 'In Call' :
                   'Multimedia Ready'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Feature Buttons */}
            <div className="flex items-center space-x-1">
              {/* Camera Toggle */}
              <button
                onClick={cameraState.isActive ? stopCamera : startCamera}
                disabled={cameraState.isLoading}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  cameraState.isActive 
                    ? 'bg-success-500 hover:bg-success-600' 
                    : 'bg-white/20 hover:bg-white/30'
                } disabled:opacity-50`}
                title={cameraState.isActive ? 'Stop Camera' : 'Start Camera'}
                aria-label={cameraState.isActive ? 'Stop Camera' : 'Start Camera'}
              >
                {cameraState.isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : cameraState.isActive ? (
                  <CameraOff className="h-5 w-5" />
                ) : (
                  <Camera className="h-5 w-5" />
                )}
              </button>

              {/* Screen Share Toggle */}
              <button
                onClick={screenShareState.isActive ? stopScreenShare : startScreenShare}
                disabled={screenShareState.isLoading}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  screenShareState.isActive 
                    ? 'bg-purple-500 hover:bg-purple-600' 
                    : 'bg-white/20 hover:bg-white/30'
                } disabled:opacity-50`}
                title={screenShareState.isActive ? 'Stop Screen Share' : 'Start Screen Share'}
                aria-label={screenShareState.isActive ? 'Stop Screen Share' : 'Start Screen Share'}
              >
                {screenShareState.isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : screenShareState.isActive ? (
                  <ScreenShareOff className="h-5 w-5" />
                ) : (
                  <ScreenShare className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {/* Window Controls */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                title={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="h-6 w-6" /> : <Minimize2 className="h-6 w-6" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
                aria-label="Close"
                title="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Permission Errors */}
            {cameraState.permissionError && (
              <PermissionError
                error={cameraState.permissionError}
                onRetry={requestCameraPermission}
                onDismiss={() => setCameraState(prev => ({ ...prev, permissionError: null }))}
              />
            )}
            
            {screenShareState.permissionError && (
              <PermissionError
                error={screenShareState.permissionError}
                onRetry={requestScreenSharePermission}
                onDismiss={() => setScreenShareState(prev => ({ ...prev, permissionError: null }))}
              />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex">
              {/* Left Panel - Camera/Screen Share */}
              {(cameraState.isActive || screenShareState.isActive) && (
                <div className="w-1/2 bg-gray-900 relative">
                  {/* Camera View */}
                  {cameraState.isActive && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Video Feed */}
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      <canvas ref={canvasRef} className="hidden" />

                      {/* Countdown Overlay */}
                      {cameraState.isCountingDown && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-white text-9xl font-bold animate-pulse">
                            {cameraState.countdownTimer}
                          </div>
                        </div>
                      )}

                      {/* Camera Controls Panel */}
                      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-2xl p-4 shadow-elevation-2 border border-gray-700">
                        <div className="space-y-4">
                          {/* Camera Device Selection */}
                          {cameraState.devices.length > 1 && (
                            <div>
                              <label className="block text-white text-sm mb-2">Camera</label>
                              <select
                                value={cameraState.selectedDevice}
                                onChange={(e) => switchCamera(e.target.value)}
                                className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              >
                                {cameraState.devices.map(device => (
                                  <option key={device.deviceId} value={device.deviceId}>
                                    {device.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* Resolution Selection */}
                          <div>
                            <label className="block text-white text-sm mb-2">Resolution</label>
                            <select
                              value={cameraState.resolution}
                              onChange={(e) => setCameraState(prev => ({ 
                                ...prev, 
                                resolution: e.target.value as '720p' | '1080p' | '4k' 
                              }))}
                              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                              <option value="720p">720p HD</option>
                              <option value="1080p">1080p Full HD</option>
                              <option value="4k">4K Ultra HD</option>
                            </select>
                          </div>

                          {/* Image Format */}
                          <div>
                            <label className="block text-white text-sm mb-2">Format</label>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setCameraState(prev => ({ ...prev, captureFormat: 'jpeg' }))}
                                className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                                  cameraState.captureFormat === 'jpeg'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-700 text-white hover:bg-gray-600'
                                }`}
                              >
                                JPEG
                              </button>
                              <button
                                onClick={() => setCameraState(prev => ({ ...prev, captureFormat: 'png' }))}
                                className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                                  cameraState.captureFormat === 'png'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-700 text-white hover:bg-gray-600'
                                }`}
                              >
                                PNG
                              </button>
                            </div>
                          </div>

                          {/* Flash Toggle */}
                          <button
                            onClick={() => setCameraState(prev => ({ ...prev, isFlashOn: !prev.isFlashOn }))}
                            className={`w-full p-2 rounded-lg transition-colors ${
                              cameraState.isFlashOn
                                ? 'bg-yellow-500 text-black'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                            }`}
                          >
                            <div className="flex items-center justify-center space-x-2">
                              {cameraState.isFlashOn ? <Flashlight className="h-4 w-4" /> : <FlashlightOff className="h-4 w-4" />}
                              <span className="text-sm">Flash {cameraState.isFlashOn ? 'On' : 'Off'}</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Photo Preview */}
                      {cameraState.lastPhoto && (
                        <div className="absolute top-4 right-4 w-32 h-24 rounded-lg overflow-hidden border-2 border-white shadow-lg bg-black/40 backdrop-blur-sm">
                          <img
                            src={cameraState.lastPhoto}
                            alt="Last captured"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                            <button className="text-white bg-black/70 p-2 rounded-full">
                              <Eye className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Capture Controls */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                        <div className="bg-black/70 backdrop-blur-sm rounded-3xl px-8 py-4 shadow-elevation-2 border border-gray-700">
                          <div className="flex items-center space-x-6">
                            {/* Countdown Timer Buttons */}
                            <div className="flex items-center space-x-2">
                              {[0, 3, 5, 10].map(seconds => (
                                <button
                                  key={seconds}
                                  onClick={() => capturePhotoWithCountdown(seconds)}
                                  disabled={cameraState.isCountingDown}
                                  className={`${seconds === 0 ? 'bg-gray-700' : 'bg-gray-700'} text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 text-sm`}
                                  title={seconds === 0 ? "Capture Now" : `${seconds}s Countdown`}
                                >
                                  {seconds === 0 ? (
                                    <Camera className="h-4 w-4" />
                                  ) : (
                                    <>
                                      <Timer className="h-4 w-4 inline mr-1" />
                                      {seconds}s
                                    </>
                                  )}
                                </button>
                              ))}
                            </div>

                            {/* Main Capture Button */}
                            <button
                              onClick={() => capturePhotoWithCountdown(0)}
                              disabled={cameraState.isCountingDown}
                              className="bg-white text-gray-900 p-4 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 shadow-lg transform hover:scale-110 transition-transform duration-200"
                            >
                              <Camera className="h-6 w-6" />
                            </button>

                            {/* Additional Controls */}
                            <div className="flex items-center space-x-2">
                              {cameraState.lastPhoto && (
                                <button
                                  onClick={() => setCameraState(prev => ({ ...prev, lastPhoto: null }))}
                                  className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
                                  title="Clear Preview"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={stopCamera}
                                className="bg-error-500 text-white p-2 rounded-lg hover:bg-error-600 transition-colors"
                                title="Stop Camera"
                              >
                                <CameraOff className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Screen Share View */}
                  {screenShareState.isActive && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <video
                        ref={screenShareVideoRef}
                        autoPlay
                        className="w-full h-full object-contain"
                      />

                      {/* Screen Share Controls Panel */}
                      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-2xl p-4 shadow-elevation-2 border border-gray-700">
                        <div className="space-y-4">
                          {/* Resolution Selection */}
                          <div>
                            <label className="block text-white text-sm mb-2">Resolution</label>
                            <select
                              value={screenShareState.resolution}
                              onChange={(e) => setScreenShareState(prev => ({ 
                                ...prev, 
                                resolution: e.target.value as 'auto' | '720p' | '1080p' | '4k' 
                              }))}
                              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                              <option value="auto">Auto</option>
                              <option value="720p">720p HD</option>
                              <option value="1080p">1080p Full HD</option>
                              <option value="4k">4K Ultra HD</option>
                            </select>
                          </div>

                          {/* Audio Toggle */}
                          <button
                            onClick={() => setScreenShareState(prev => ({ ...prev, audioEnabled: !prev.audioEnabled }))}
                            className={`w-full p-2 rounded-lg transition-colors ${
                              screenShareState.audioEnabled
                                ? 'bg-success-500 text-white'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                            }`}
                          >
                            <div className="flex items-center justify-center space-x-2">
                              {screenShareState.audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                              <span className="text-sm">Audio {screenShareState.audioEnabled ? 'On' : 'Off'}</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Screen Share Status */}
                      <div className="absolute top-4 right-4 bg-error-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 animate-pulse shadow-lg">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                        <span className="text-sm font-medium">Screen Sharing</span>
                      </div>

                      {/* Screen Share Controls */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                        <div className="bg-black/70 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-elevation-2 border border-gray-700">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => {/* Save screenshot functionality */}}
                              className="bg-success-500 text-white p-3 rounded-xl hover:bg-success-600 transition-colors"
                              title="Save Screenshot"
                            >
                              <Save className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => {/* Share functionality */}}
                              className="bg-primary-500 text-white p-3 rounded-xl hover:bg-primary-600 transition-colors"
                              title="Share"
                            >
                              <Share2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={stopScreenShare}
                              className="bg-error-500 text-white p-3 rounded-xl hover:bg-error-600 transition-colors"
                              title="Stop Sharing"
                            >
                              <ScreenShareOff className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Right Panel - Chat */}
              <div className={`${(cameraState.isActive || screenShareState.isActive) ? 'w-1/2' : 'w-full'} flex flex-col bg-surface-secondary`} ref={chatContainerRef}>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-sm lg:max-w-md px-6 py-4 rounded-2xl shadow-elevation-1 ${
                        msg.isUser
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                          : 'bg-white text-primary border border-gray-200'
                      }`}>
                        <div className="flex items-start space-x-3 mb-2">
                          {getMessageIcon(msg.type)}
                          <p className="text-body1 flex-1 break-words">{msg.text}</p>
                        </div>
                        
                        {/* File or image preview */}
                        {msg.type === 'image' && msg.fileUrl && (
                          <div className="mt-3 rounded-xl overflow-hidden">
                            <img 
                              src={msg.fileUrl} 
                              alt="Shared image" 
                              className="w-full h-auto max-h-60 object-contain"
                            />
                          </div>
                        )}
                        
                        {msg.type === 'file' && msg.fileName && (
                          <div className="mt-3 p-3 bg-black/10 rounded-xl text-body2 flex items-center justify-between">
                            <div className="flex items-center space-x-2 truncate">
                              <Paperclip className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{msg.fileName}</span>
                            </div>
                            {msg.fileUrl && (
                              <a 
                                href={msg.fileUrl} 
                                download={msg.fileName}
                                className="text-blue-400 hover:text-blue-300 p-1 flex-shrink-0"
                                title="Download"
                              >
                                <Download className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        )}
                        
                        <p className={`text-caption mt-2 ${
                          msg.isUser ? 'text-primary-200' : 'text-secondary'
                        }`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Feature Toolbar */}
                <div className="bg-white border-t border-gray-200 p-3">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={startCamera}
                      disabled={cameraState.isActive}
                      className={`btn-text text-gray-600 hover:text-primary-500 hover:bg-gray-100 p-2 ${
                        cameraState.isActive ? 'text-success-500' : ''
                      }`}
                      title="Camera"
                    >
                      <Camera className="h-5 w-5" />
                    </button>
                    <button
                      onClick={startScreenShare}
                      disabled={screenShareState.isActive}
                      className={`btn-text text-gray-600 hover:text-primary-500 hover:bg-gray-100 p-2 ${
                        screenShareState.isActive ? 'text-purple-500' : ''
                      }`}
                      title="Screen Share"
                    >
                      <ScreenShare className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-text text-gray-600 hover:text-primary-500 hover:bg-gray-100 p-2"
                      title="Upload File"
                    >
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <button
                      className="btn-text text-gray-600 hover:text-primary-500 hover:bg-gray-100 p-2"
                      title="Video Call"
                    >
                      <Video className="h-5 w-5" />
                    </button>
                    <button
                      className="btn-text text-gray-600 hover:text-primary-500 hover:bg-gray-100 p-2"
                      title="Voice Call"
                    >
                      <Phone className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-gray-200 bg-white">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1 floating-label">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder=" "
                        className="input-box resize-none"
                        rows={2}
                        id="chat-input"
                      />
                      <label htmlFor="chat-input">Ask about flights, hotels, or use multimedia tools...</label>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={startVoiceRecording}
                        disabled={isRecording}
                        className={`btn-text p-3 rounded-full transition-all duration-200 ${
                          isRecording
                            ? 'bg-error-500 text-white animate-pulse'
                            : 'text-gray-600 hover:text-primary-500 hover:bg-gray-100'
                        }`}
                        title="Voice Message"
                      >
                        <Mic className="h-5 w-5" />
                      </button>
                      
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-3 rounded-full shadow-elevation-2 hover:shadow-elevation-3 disabled:opacity-50 disabled:cursor-not-allowed ripple"
                        title="Send Message"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Recording Indicator */}
                  {isRecording && (
                    <div className="mt-4 flex items-center justify-center space-x-3 text-error-600">
                      <div className="w-3 h-3 bg-error-600 rounded-full animate-pulse"></div>
                      <span className="text-body2 font-semibold">Recording voice message...</span>
                    </div>
                  )}
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatbotWidget;