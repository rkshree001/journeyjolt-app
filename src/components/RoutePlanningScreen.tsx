import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Mountain, 
  Utensils, 
  Camera, 
  Star,
  Plus,
  X,
  ChevronLeft
} from "lucide-react";

interface RoutePlanningScreenProps {
  onNext: () => void;
  onBack: () => void;
  tripData: {
    from: string;
    to: string;
    mode: string;
    date: string;
    time: string;
  };
}

const mockStops = [
  {
    id: 1,
    name: "Sunset Point Viewpont",
    type: "Nature",
    distance: "15 km",
    duration: "20 min",
    rating: 4.5,
    saved: false,
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: 2,
    name: "Heritage Fort",
    type: "History",
    distance: "32 km",
    duration: "45 min",
    rating: 4.2,
    saved: false,
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: 3,
    name: "Local Food Street",
    type: "Food",
    distance: "28 km",
    duration: "35 min",
    rating: 4.7,
    saved: true,
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: 4,
    name: "Adventure Park",
    type: "Popular",
    distance: "41 km",
    duration: "55 min",
    rating: 4.3,
    saved: false,
    coordinates: { lat: 12.9716, lng: 77.5946 }
  }
];

const filters = [
  { label: "Nature", icon: <Mountain className="w-4 h-4" />, color: "bg-gradient-nature" },
  { label: "History", icon: <Camera className="w-4 h-4" />, color: "bg-gradient-sunset" },
  { label: "Food", icon: <Utensils className="w-4 h-4" />, color: "bg-gradient-ocean" },
  { label: "Popular", icon: <Star className="w-4 h-4" />, color: "bg-gradient-hero" }
];

const RoutePlanningScreen = ({ onNext, onBack, tripData }: RoutePlanningScreenProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [savedStops, setSavedStops] = useState<number[]>([3]);

  const toggleStop = (stopId: number) => {
    setSavedStops(prev => 
      prev.includes(stopId) 
        ? prev.filter(id => id !== stopId)
        : [...prev, stopId]
    );
  };

  const filteredStops = activeFilter === "All" 
    ? mockStops 
    : mockStops.filter(stop => stop.type === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="glass" size="icon" onClick={onBack}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Route Preview</h1>
            <p className="text-white/80 text-sm">{tripData.from} → {tripData.to}</p>
          </div>
        </div>

        {/* Route info */}
        <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Total Distance: 245 km</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Estimated: 4h 30min
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {savedStops.length} stops saved
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map placeholder */}
      <div className="mx-6 -mt-3 mb-6">
        <Card className="shadow-medium">
          <CardContent className="p-0">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive Map View</p>
                <p className="text-sm text-muted-foreground">Route with suggested stops</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Filter Stops</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={activeFilter === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("All")}
            className="whitespace-nowrap"
          >
            All Stops
          </Button>
          {filters.map((filter) => (
            <Button
              key={filter.label}
              variant={activeFilter === filter.label ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.label)}
              className="whitespace-nowrap flex items-center gap-1"
            >
              {filter.icon}
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Stops list */}
      <div className="px-6 space-y-4">
        {filteredStops.map((stop) => (
          <Card key={stop.id} className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{stop.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {stop.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-4 h-4" />
                      {stop.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {stop.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {stop.rating}
                    </span>
                  </div>
                </div>

                <Button
                  variant={savedStops.includes(stop.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleStop(stop.id)}
                  className="ml-4"
                >
                  {savedStops.includes(stop.id) ? (
                    <>
                      <X className="w-4 h-4" />
                      Remove
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next button */}
      <div className="p-6 mt-8">
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full"
          onClick={onNext}
        >
          Next: Stay Planning
        </Button>
      </div>
    </div>
  );
};

export default RoutePlanningScreen;