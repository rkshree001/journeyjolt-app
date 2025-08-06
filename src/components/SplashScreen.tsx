import { useEffect, useState } from "react";
import { Plane, MapPin } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-gradient-hero flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="animate-bounce">
            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full shadow-glow">
              <Plane className="w-12 h-12 text-white animate-pulse" />
              <MapPin className="w-6 h-6 text-white absolute -bottom-1 -right-1 animate-ping" />
            </div>
          </div>
          
          {/* Rotating circles */}
          <div className="absolute inset-0 animate-spin">
            <div className="w-32 h-32 border-2 border-white/30 border-t-white/60 rounded-full"></div>
          </div>
        </div>

        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">TripMate</h1>
          <p className="text-lg text-white/90 font-medium">Plan • Share • Explore</p>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2 justify-center">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;