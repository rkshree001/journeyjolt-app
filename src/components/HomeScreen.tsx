import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  User,
  Wallet,
  TrendingUp,
  Activity
} from "lucide-react";
import { mockTrips, getCurrentTrip, getPlanningTrips, getCurrentUser, getDashboardStats } from "@/data";

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
  
  const currentUser = getCurrentUser();
  const currentTrip = getCurrentTrip();
  const planningTrips = getPlanningTrips();
  const stats = getDashboardStats();

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">TripWisePay</h1>
            <p className="text-white/80">Welcome back, {currentUser.name.split(' ')[0]}!</p>
          </div>
          <Button variant="glass" size="icon" className="text-white" onClick={onShowProfile}>
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-5 h-5 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <User className="w-5 h-5 hidden" />
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

      {/* Stats overview */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-lg font-bold">${stats.totalSpent.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <Activity className="w-6 h-6 text-secondary mx-auto mb-2" />
              <p className="text-lg font-bold">{stats.countriesVisited}</p>
              <p className="text-xs text-muted-foreground">Countries</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <User className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-lg font-bold">{stats.friendsConnected}</p>
              <p className="text-xs text-muted-foreground">Friends</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Current active trip */}
      {currentTrip && (
        <div className="px-6 pb-4">
          <h2 className="text-lg font-bold text-foreground mb-3">Current Trip</h2>
          <Card className="shadow-medium bg-gradient-hero">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-white text-lg">{currentTrip.title}</h3>
                  <p className="text-white/80 text-sm">{currentTrip.destination}</p>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Active
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-white/90 text-sm">
                <div>
                  <p className="font-medium">Budget: ${currentTrip.budget.toLocaleString()}</p>
                  <p>Spent: ${currentTrip.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium">{currentTrip.participants.length} Members</p>
                  <p>{new Date(currentTrip.startDate).toLocaleDateString()} - {new Date(currentTrip.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Planning trips */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-foreground">Planning</h2>
          <Button variant="ghost" size="sm" onClick={onShowExplore}>
            <History className="w-4 h-4" />
            View All
          </Button>
        </div>

        {planningTrips.length > 0 ? (
          <div className="space-y-3">
            {planningTrips.slice(0, 2).map((trip) => (
              <Card key={trip.id} className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{trip.title}</h3>
                      <p className="text-sm text-muted-foreground">{trip.destination}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>${trip.budget.toLocaleString()} budget</span>
                        <span>{trip.participants.length} members</span>
                      </div>
                    </div>
                    <Badge variant="outline">Planning</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-soft">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No trips planned</h3>
              <p className="text-muted-foreground text-sm">Create your first trip to get started!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;