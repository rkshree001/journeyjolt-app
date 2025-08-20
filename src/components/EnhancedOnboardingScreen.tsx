import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users, Share2, Heart, Sparkles, Zap } from "lucide-react";
import onboarding1 from "@/assets/onboarding-1.jpg";
import onboarding2 from "@/assets/onboarding-2.jpg";
import onboarding3 from "@/assets/onboarding-3.jpg";
import onboarding4 from "@/assets/onboarding-4.jpg";
import onboarding5 from "@/assets/onboarding-5.jpg";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const onboardingData = [
  {
    image: onboarding1,
    title: "Plan Perfect Trips",
    description: "Create detailed itineraries with smart route planning and discover amazing stops along the way. Your journey starts here!",
    gradient: "bg-gradient-to-br from-blue-400 to-purple-600",
    icon: <Sparkles className="w-8 h-8 text-white" />,
    highlight: "Smart Planning"
  },
  {
    image: onboarding2,
    title: "Split Expenses Effortlessly",
    description: "Share costs with friends seamlessly. Track who owes what, split bills instantly, and settle up with just a tap.",
    gradient: "bg-gradient-to-br from-orange-400 to-pink-600",
    icon: <Share2 className="w-8 h-8 text-white" />,
    highlight: "Easy Splitting"
  },
  {
    image: onboarding3,
    title: "Discover & Navigate",
    description: "Find hidden gems, budget accommodations, and the best routes. Interactive maps guide you to unforgettable experiences.",
    gradient: "bg-gradient-to-br from-green-400 to-teal-600",
    icon: <Zap className="w-8 h-8 text-white" />,
    highlight: "Smart Discovery"
  },
  {
    image: onboarding4,
    title: "Share with Friends",
    description: "Invite friends, share memories, and stay connected throughout your journey. Make every trip a shared adventure!",
    gradient: "bg-gradient-to-br from-purple-400 to-pink-600",
    icon: <Users className="w-8 h-8 text-white" />,
    highlight: "Social Travel"
  },
  {
    image: onboarding5,
    title: "Your Travel Companion",
    description: "Everything you need in one app - planning, expenses, navigation, and sharing. Ready to start your next adventure?",
    gradient: "bg-gradient-to-br from-indigo-400 to-cyan-600",
    icon: <Heart className="w-8 h-8 text-white" />,
    highlight: "All-in-One"
  }
];

const EnhancedOnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const nextStep = () => {
    if (currentStep < onboardingData.length - 1) {
      setDirection('forward');
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection('backward');
      setCurrentStep(currentStep - 1);
    }
  };

  const jumpToStep = (step: number) => {
    setDirection(step > currentStep ? 'forward' : 'backward');
    setCurrentStep(step);
  };

  const currentData = onboardingData[currentStep];

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden fixed inset-0 z-50">
      {/* Skip Button - Top Right */}
      {currentStep < onboardingData.length - 1 && (
        <Button
          variant="ghost"
          onClick={onComplete}
          className="absolute top-4 right-4 z-30 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 text-sm px-4 py-2 rounded-full backdrop-blur-sm font-medium shadow-lg border border-white/20"
        >
          Skip
        </Button>
      )}
      
      {/* Enhanced Progress Bar */}
      <div className="relative w-full bg-muted h-2 safe-area-inset-top">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / onboardingData.length) * 100}%` }}
        />
        {/* Progress dots */}
        <div className="absolute top-0 left-0 w-full flex justify-between px-4 -mt-1">
          {onboardingData.map((_, index) => (
            <button
              key={index}
              onClick={() => jumpToStep(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index <= currentStep 
                  ? "bg-primary scale-110" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background with image */}
        <div className={`absolute inset-0 ${currentData.gradient} transition-all duration-700`}>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 transition-all duration-700"
            style={{ 
              backgroundImage: `url(${currentData.image})`,
              transform: direction === 'forward' ? 'scale(1.1)' : 'scale(1.05)'
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-12 text-center">
          <div className="w-full max-w-md space-y-8">
            {/* Feature Image */}
            <div className="relative mx-auto">
              <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <img 
                  src={currentData.image} 
                  alt={currentData.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Floating highlight badge */}
              <div className="absolute -top-3 -right-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  {currentData.icon}
                  <span className="text-sm font-semibold text-gray-800">{currentData.highlight}</span>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white leading-tight">
                {currentData.title}
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                {currentData.description}
              </p>
            </div>

            {/* Enhanced Step Indicators */}
            <div className="flex justify-center space-x-3">
              {onboardingData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => jumpToStep(index)}
                  className="group relative transition-all duration-300"
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStep 
                        ? "bg-white scale-125 shadow-lg" 
                        : index < currentStep 
                        ? "bg-white/70 scale-100" 
                        : "bg-white/30 scale-75 hover:bg-white/50 hover:scale-90"
                    }`}
                  />
                  {index === currentStep && (
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation - Fixed at bottom with better visibility */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex justify-between items-center w-full max-w-screen-sm mx-auto">
          {/* Back Button */}
          <Button
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 bg-white/20 border-white/40 text-white hover:bg-white/30 hover:border-white/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-md shadow-lg font-medium px-6 py-3 rounded-full"
            size="lg"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </Button>

          {/* Center Section - Progress */}
          <div className="flex flex-col items-center gap-3">
            {/* Step Progress Indicator */}
            <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
              <span className="text-white font-medium text-sm">
                {currentStep + 1} of {onboardingData.length}
              </span>
            </div>
          </div>

          {/* Next/Get Started Button */}
          <Button
            onClick={nextStep}
            className="flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 shadow-xl transition-all duration-300 hover:scale-105 font-semibold px-6 py-3 rounded-full"
            size="lg"
          >
            {currentStep === onboardingData.length - 1 ? (
              <>
                Get Started
                <Sparkles className="w-5 h-5" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedOnboardingScreen;