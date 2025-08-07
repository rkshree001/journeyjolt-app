import { useEffect, useState } from "react";
import { Plane, MapPin, Sparkles, CreditCard, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SplashScreenProps {
  onComplete: () => void;
  onSkip?: () => void;
}

const EnhancedSplashScreen = ({ onComplete, onSkip }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [showBottomNav, setShowBottomNav] = useState(false);

  const loadingTexts = [
    "Initializing your journey...",
    "Loading amazing destinations...",
    "Preparing expense tracking...",
    "Setting up smart payments...",
    "Almost ready to explore!"
  ];

  useEffect(() => {
    // Show bottom navigation after 1 second
    const navTimer = setTimeout(() => {
      setShowBottomNav(true);
    }, 1000);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 50);

    // Change loading text
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1000);

    // Complete splash after loading
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 4000);

    return () => {
      clearTimeout(navTimer);
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onSkip || onComplete, 300);
  };

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  return (
    <div
      className={`fixed inset-0 w-screen h-screen flex flex-col z-50 transition-all duration-500 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {/* Full-screen Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/lovable-uploads/1abc93bf-156e-4629-a325-0c658ecbfde3.png')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-600/70 to-indigo-800/80"></div>
        
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/5 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center text-center space-y-8 z-10 px-6 relative">
        {/* Enhanced Logo */}
        <div className="relative">
          <div className="animate-bounce">
            <div className="relative inline-flex items-center justify-center w-32 h-32 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30">
              <CreditCard className="w-12 h-12 text-white animate-pulse" />
              <Wallet className="w-8 h-8 text-white absolute -bottom-2 -right-2 animate-ping" />
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
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wide drop-shadow-lg">
            TripWise<span className="text-yellow-300">Pay</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
              <span className="text-lg font-medium">Plan</span>
            </div>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
              <span className="text-lg font-medium">Pay</span>
            </div>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></div>
              <span className="text-lg font-medium">Travel</span>
            </div>
          </div>
        </div>

        {/* Enhanced Loading */}
        <div className="space-y-4 w-80 max-w-sm">
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full transition-all duration-200 shadow-lg"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          
          {/* Loading Text */}
          <div className="text-white/90 text-sm font-medium h-6 flex items-center justify-center">
            <span className="animate-fade-in drop-shadow-sm" key={currentText}>
              {loadingTexts[currentText]}
            </span>
          </div>
          
          {/* Loading Percentage */}
          <div className="text-white/70 text-xs font-medium">
            {Math.round(loadingProgress)}%
          </div>
        </div>

        {/* Floating Elements */}
        <div className="flex justify-center space-x-6">
          <div className="w-3 h-3 bg-yellow-300/60 rounded-full animate-bounce shadow-lg"></div>
          <div className="w-3 h-3 bg-orange-300/60 rounded-full animate-bounce shadow-lg" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-green-300/60 rounded-full animate-bounce shadow-lg" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-gradient-to-t from-black/50 via-black/20 to-transparent backdrop-blur-sm transition-all duration-500 ${showBottomNav ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button 
            variant="ghost" 
            className="text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full shadow-lg"
            onClick={handleSkip}
            size="lg"
          >
            Skip
          </Button>
          
          <div className="text-white/60 text-sm font-medium">
            {Math.round(loadingProgress)}% Complete
          </div>
          
          <Button 
            className="bg-white/90 hover:bg-white text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg backdrop-blur-sm border border-white/30 transition-all duration-200 hover:scale-105"
            onClick={handleNext}
            disabled={loadingProgress < 100}
            size="lg"
          >
            {loadingProgress >= 100 ? 'Get Started' : 'Loading...'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSplashScreen;