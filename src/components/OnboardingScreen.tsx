import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Route, DollarSign, MapPin, Users } from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const onboardingData = [
  {
    icon: <Route className="w-16 h-16 text-primary" />,
    title: "Plan Trips Easily",
    description: "Create detailed itineraries with smart route planning and discover amazing stops along the way",
    gradient: "bg-gradient-ocean"
  },
  {
    icon: <DollarSign className="w-16 h-16 text-secondary" />,
    title: "Track Shared Expenses",
    description: "Split costs effortlessly with friends. Track who owes what and settle up with ease",
    gradient: "bg-gradient-sunset"
  },
  {
    icon: <MapPin className="w-16 h-16 text-accent" />,
    title: "Discover & Budget",
    description: "Find the best stops, budget accommodations, and hidden gems for your perfect trip",
    gradient: "bg-gradient-nature"
  }
];

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentData = onboardingData[currentStep];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Progress bar */}
      <div className="w-full bg-muted h-1">
        <div 
          className="h-full bg-gradient-hero transition-all duration-300"
          style={{ width: `${((currentStep + 1) / onboardingData.length) * 100}%` }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-center space-y-8">
          {/* Icon with animated background */}
          <div className="relative mx-auto w-32 h-32">
            <div className={`absolute inset-0 ${currentData.gradient} rounded-full opacity-20 animate-pulse`} />
            <div className="relative w-full h-full flex items-center justify-center bg-card rounded-full shadow-medium">
              {currentData.icon}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {currentData.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentData.description}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex justify-center space-x-2">
            {onboardingData.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep 
                    ? "bg-primary" 
                    : index < currentStep 
                    ? "bg-primary/50" 
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            variant="hero"
            onClick={nextStep}
            className="flex items-center gap-2"
            size="lg"
          >
            {currentStep === onboardingData.length - 1 ? (
              <>
                Get Started
                <Users className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;