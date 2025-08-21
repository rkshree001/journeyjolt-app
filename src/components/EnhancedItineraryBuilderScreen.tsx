import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Plus, 
  MapPin, 
  Clock, 
  Calendar,
  Camera,
  Upload,
  Edit3,
  Map,
  Navigation,
  Star
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface ItineraryBuilderScreenProps {
  onNext: () => void;
  onBack: () => void;
  stayDays: number;
}

interface ItineraryPlace {
  id: number;
  name: string;
  type: string;
  time: string;
  duration: string;
  description: string;
  rating: number;
  cost: string;
  distance: string;
  coordinates: [number, number];
  image?: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  places: ItineraryPlace[];
  totalCost: number;
  totalDistance: string;
}

const mockItinerary: ItineraryDay[] = [
  {
    day: 1,
    date: "2024-02-15",
    places: [
      {
        id: 1,
        name: "Golden Gate Bridge",
        type: "Landmark",
        time: "09:00",
        duration: "2 hours",
        description: "Iconic suspension bridge with stunning views",
        rating: 4.8,
        cost: "Free",
        distance: "0 km",
        coordinates: [-122.4783, 37.8199]
      },
      {
        id: 2,
        name: "Fisherman's Wharf",
        type: "Attraction",
        time: "11:30",
        duration: "3 hours",
        description: "Waterfront area with shops and restaurants",
        rating: 4.3,
        cost: "$25",
        distance: "8.5 km",
        coordinates: [-122.4177, 37.8080]
      }
    ],
    totalCost: 25,
    totalDistance: "8.5 km"
  },
  {
    day: 2,
    date: "2024-02-16",
    places: [
      {
        id: 3,
        name: "Alcatraz Island",
        type: "Historical",
        time: "10:00",
        duration: "4 hours",
        description: "Famous former federal prison",
        rating: 4.6,
        cost: "$45",
        distance: "2.5 km",
        coordinates: [-122.4230, 37.8267]
      }
    ],
    totalCost: 45,
    totalDistance: "2.5 km"
  }
];

const typeColors: { [key: string]: string } = {
  "Landmark": "bg-gradient-hero text-white",
  "Attraction": "bg-gradient-sunset text-white",
  "Historical": "bg-gradient-nature text-white",
  "Restaurant": "bg-gradient-ocean text-white",
  "Shopping": "bg-secondary text-secondary-foreground"
};

const EnhancedItineraryBuilderScreen = ({ onNext, onBack, stayDays }: ItineraryBuilderScreenProps) => {
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(mockItinerary);
  const [startDate, setStartDate] = useState("2024-02-15");
  const [endDate, setEndDate] = useState("2024-02-17");
  const [editingPlace, setEditingPlace] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

  const addPlace = (dayIndex: number) => {
    const newPlace: ItineraryPlace = {
      id: Date.now(),
      name: "New Place",
      type: "Attraction",
      time: "12:00",
      duration: "1 hour",
      description: "Add description",
      rating: 4.0,
      cost: "$0",
      distance: "0 km",
      coordinates: [-122.4194, 37.7749]
    };

    const updatedItinerary = [...itinerary];
    if (updatedItinerary[dayIndex]) {
      updatedItinerary[dayIndex].places.push(newPlace);
      setItinerary(updatedItinerary);
    }
    toast.success("New place added to itinerary");
  };

  const editPlace = (placeId: number) => {
    setEditingPlace(placeId);
  };

  const addDay = () => {
    const newDay: ItineraryDay = {
      day: itinerary.length + 1,
      date: new Date(Date.now() + (itinerary.length * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      places: [],
      totalCost: 0,
      totalDistance: "0 km"
    };
    setItinerary([...itinerary, newDay]);
    toast.success("New day added to itinerary");
  };

  const takePhoto = () => {
    toast.info("Camera feature will be available in the mobile app");
  };

  const uploadImage = () => {
    toast.info("Image upload feature coming soon");
  };

  const totalTripCost = itinerary.reduce((sum, day) => sum + day.totalCost, 0);

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="glass" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="glass" 
              size="icon" 
              onClick={() => setShowMap(!showMap)}
              className="text-white"
            >
              <Map className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="icon" onClick={takePhoto} className="text-white">
              <Camera className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="text-center text-white space-y-2">
          <h1 className="text-2xl font-bold">Build Your Itinerary</h1>
          <p className="text-white/80">Create your perfect travel plan</p>
        </div>

        {/* Trip Dates */}
        <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm font-medium">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map View Toggle */}
      {showMap && (
        <div className="h-64 bg-muted mx-6 -mt-6 rounded-lg mb-6 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-hero/20">
            <div className="text-center text-white">
              <Navigation className="w-12 h-12 mx-auto mb-2" />
              <p className="font-medium">Interactive Map View</p>
              <p className="text-sm opacity-80">Live route with all destinations</p>
            </div>
          </div>
        </div>
      )}

      {/* Itinerary Content */}
      <div className="px-6 pb-24 space-y-6">
        {itinerary.map((day, dayIndex) => (
          <Card key={day.day} className="shadow-medium">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Day {day.day}
                  </CardTitle>
                  <p className="text-muted-foreground">{new Date(day.date).toLocaleDateString()}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => addPlace(dayIndex)}>
                  <Plus className="w-4 h-4" />
                  Add Place
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {day.places.map((place, placeIndex) => (
                <div key={place.id}>
                  <Card className="bg-gradient-card border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{place.name}</h3>
                            <Badge className={typeColors[place.type] || "bg-muted"}>
                              {place.type}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{place.time} ({place.duration})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{place.distance}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">{place.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{place.rating}</span>
                            </div>
                            <span className="text-sm font-medium text-primary">{place.cost}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Upload className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Photos</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4 p-4">
                                <Button variant="outline" onClick={takePhoto} className="h-24 flex-col">
                                  <Camera className="w-8 h-8 mb-2" />
                                  Take Photo
                                </Button>
                                <Button variant="outline" onClick={uploadImage} className="h-24 flex-col">
                                  <Upload className="w-8 h-8 mb-2" />
                                  Upload Image
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button variant="ghost" size="icon" onClick={() => editPlace(place.id)}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {placeIndex < day.places.length - 1 && (
                    <div className="flex justify-center my-2">
                      <div className="w-px h-8 bg-border"></div>
                    </div>
                  )}
                </div>
              ))}
              
              {day.places.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No places added yet</p>
                  <Button variant="outline" onClick={() => addPlace(dayIndex)} className="mt-2">
                    <Plus className="w-4 h-4" />
                    Add Your First Place
                  </Button>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Day Total:</span>
                <div className="flex gap-4">
                  <span>${day.totalCost}</span>
                  <span>{day.totalDistance}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add Day Button */}
        <Card className="border-dashed border-2 border-muted-foreground/30">
          <CardContent className="p-8 text-center">
            <Button variant="outline" onClick={addDay} className="w-full">
              <Plus className="w-5 h-5" />
              Add Another Day
            </Button>
          </CardContent>
        </Card>
        
        {/* Trip Summary */}
        <Card className="bg-gradient-hero text-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Trip Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-white/80 text-sm">Duration</p>
                <p className="text-2xl font-bold">{itinerary.length} Days</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Cost</p>
                <p className="text-2xl font-bold">${totalTripCost}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Places</p>
                <p className="text-2xl font-bold">{itinerary.reduce((sum, day) => sum + day.places.length, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t">
        <Button variant="hero" size="lg" className="w-full" onClick={onNext}>
          Continue to Expense Tracking
        </Button>
      </div>
    </div>
  );
};

export default EnhancedItineraryBuilderScreen;