import { useEffect, useState } from "react";
import { Plane, MapPin, Sparkles } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const EnhancedSplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Initializing your journey...",
    "Loading amazing destinations...",
    "Preparing expense tracking...",
    "Setting up group features...",
    "Almost ready to explore!"
  ];

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Change loading text
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 800);

    // Complete splash after loading
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-gradient-hero flex items-center justify-center z-50 transition-all duration-500 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/5 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="text-center space-y-8 z-10">
        {/* Enhanced Logo */}
        <div className="relative">
          <div className="animate-bounce">
            <div className="relative inline-flex items-center justify-center w-32 h-32 bg-white/20 backdrop-blur-lg rounded-3xl shadow-glow">
              <Plane className="w-16 h-16 text-white animate-pulse" />
              <MapPin className="w-8 h-8 text-white absolute -bottom-2 -right-2 animate-ping" />
              <Sparkles className="w-6 h-6 text-white absolute -top-1 -left-1 animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
          
          {/* Rotating rings */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
            <div className="w-40 h-40 border-2 border-white/30 border-t-white/60 rounded-full"></div>
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "4s", animationDirection: "reverse" }}>
            <div className="w-48 h-48 border border-white/20 border-b-white/40 rounded-full"></div>
          </div>
        </div>

        {/* App Branding */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white tracking-wide">
            Journey<span className="text-yellow-300">Jolt</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
              <span className="text-lg font-medium">Plan</span>
            </div>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
              <span className="text-lg font-medium">Share</span>
            </div>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></div>
              <span className="text-lg font-medium">Explore</span>
            </div>
          </div>
        </div>

        {/* Enhanced Loading */}
        <div className="space-y-4 w-80">
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full transition-all duration-100 animate-pulse"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          
          {/* Loading Text */}
          <div className="text-white/80 text-sm font-medium h-6 flex items-center justify-center">
            <span className="animate-fade-in" key={currentText}>
              {loadingTexts[currentText]}
            </span>
          </div>
          
          {/* Loading Percentage */}
          <div className="text-white/60 text-xs">
            {loadingProgress}%
          </div>
        </div>

        {/* Floating Elements */}
        <div className="flex justify-center space-x-6">
          <div className="w-3 h-3 bg-yellow-300/60 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-300/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-green-300/60 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSplashScreen;