import React, { useState } from 'react';
import { 
  X, Play, Pause, Volume2, VolumeX, RotateCcw, 
  Maximize, Camera, MapPin, Clock, Star, Share2,
  ChevronLeft, ChevronRight, Download, Heart
} from 'lucide-react';

interface VirtualTourModalProps {
  destination: {
    name: string;
    country: string;
    images: { url: string; title: string; description: string; type: '360' | 'photo' | 'video' }[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ destination, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  const currentImage = destination.images[currentImageIndex];
  const total360Images = destination.images.filter(img => img.type === '360').length;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-black/50 backdrop-blur-sm p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-white">
              <h2 className="text-h4 font-bold">{destination.name} Virtual Tour</h2>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-body1">{destination.country}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full px-4 py-2 text-white">
              <span className="text-body2">{currentImageIndex + 1} / {destination.images.length}</span>
            </div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
            >
              <Maximize className="h-6 w-6" />
            </button>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Image/360 View */}
          <div className="relative h-full">
            {currentImage.type === '360' ? (
              <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <img
                  src={currentImage.url}
                  alt={currentImage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                  <RotateCcw className="h-12 w-12 mx-auto mb-4 animate-spin" />
                  <p className="text-h5 font-bold">360° Experience</p>
                  <p className="text-body1">Drag to explore</p>
                </div>
              </div>
            ) : currentImage.type === 'video' ? (
              <div className="h-full bg-black flex items-center justify-center">
                <video
                  src={currentImage.url}
                  className="w-full h-full object-cover"
                  controls={false}
                  autoPlay={isPlaying}
                  muted={isMuted}
                  loop
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-6 text-white hover:bg-white/30 transition-colors duration-200"
                  >
                    {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12" />}
                  </button>
                </div>
              </div>
            ) : (
              <img
                src={currentImage.url}
                alt={currentImage.title}
                className="w-full h-full object-cover"
              />
            )}

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Controls Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-h5 font-bold mb-2">{currentImage.title}</h3>
                    <p className="text-body1">{currentImage.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {currentImage.type === 'video' && (
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>
                    )}
                    <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors duration-200">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors duration-200">
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors duration-200">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Progress Indicators */}
                <div className="flex space-x-2">
                  {destination.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'w-8 bg-white'
                          : 'w-2 bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="bg-black/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span className="text-body2">{destination.images.length} Photos</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5" />
                <span className="text-body2">{total360Images} 360° Views</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-outlined border-white text-white hover:bg-white/10">
                View All Photos
              </button>
              <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                Book This Destination
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;