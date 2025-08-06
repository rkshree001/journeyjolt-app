import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  Bus, 
  Train, 
  Plane,
  Navigation,
  Plus,
  History,
  User
} from "lucide-react";

interface HomeScreenProps {
  onCreateTrip: () => void;
  onShowProfile: () => void;
  onShowExplore: () => void;
}

const travelModes = [
  { icon: <Car className="w-6 h-6" />, label: "Car", value: "car", gradient: "bg-gradient-sunset" },
  { icon: <Bus className="w-6 h-6" />, label: "Bus", value: "bus", gradient: "bg-gradient-ocean" },
  { icon: <Train className="w-6 h-6" />, label: "Train", value: "train", gradient: "bg-gradient-nature" },
  { icon: <Plane className="w-6 h-6" />, label: "Flight", value: "flight", gradient: "bg-gradient-hero" },
];

const HomeScreen = ({ onCreateTrip, onShowProfile, onShowExplore }: HomeScreenProps) => {
  const [selectedMode, setSelectedMode] = useState("car");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">TripMate</h1>
            <p className="text-white/80">Plan your next adventure</p>
          </div>
          <Button variant="glass" size="icon" className="text-white" onClick={onShowProfile}>
            <User className="w-5 h-5" />
          </Button>
        </div>

        {/* Quick trip planner card */}
        <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            {/* Location inputs */}
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="From: Current location"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="relative">
                <Navigation className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="To: Where do you want to go?"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Travel mode selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Travel Mode</label>
              <div className="grid grid-cols-4 gap-3">
                {travelModes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setSelectedMode(mode.value)}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      selectedMode === mode.value
                        ? "border-primary bg-primary/5 scale-105"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full ${mode.gradient} flex items-center justify-center text-white mx-auto mb-2`}>
                      {mode.icon}
                    </div>
                    <span className="text-xs font-medium">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date and time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-10 h-12"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  type="time"
                  className="pl-10 h-12"
                  defaultValue="09:00"
                />
              </div>
            </div>

            {/* Create trip button */}
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full"
              onClick={onCreateTrip}
              disabled={!fromLocation || !toLocation}
            >
              <Plus className="w-5 h-5" />
              Create Trip
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent trips section */}
      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-foreground">Recent Trips</h2>
          <Button variant="ghost" size="sm" onClick={onShowExplore}>
            <History className="w-4 h-4" />
            Explore
          </Button>
        </div>

        {/* Empty state for now */}
        <Card className="shadow-soft">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No trips yet</h3>
            <p className="text-muted-foreground text-sm">Create your first trip to get started!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;