import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  Edit3, 
  Plus, 
  ChevronLeft,
  Calendar,
  Navigation
} from "lucide-react";

interface ItineraryBuilderScreenProps {
  onNext: () => void;
  onBack: () => void;
  stayDays: number;
}

const mockItinerary = [
  {
    day: 1,
    date: "Dec 15, 2024",
    places: [
      {
        id: 1,
        name: "City Heritage Museum",
        time: "09:00 AM",
        duration: "2 hours",
        distance: "0.5 km",
        type: "History",
        description: "Explore local heritage and culture"
      },
      {
        id: 2,
        name: "Central Market",
        time: "12:00 PM",
        duration: "1.5 hours",
        distance: "1.2 km",
        type: "Shopping",
        description: "Local crafts and souvenirs"
      },
      {
        id: 3,
        name: "Sunset Point",
        time: "05:30 PM",
        duration: "1 hour",
        distance: "3.5 km",
        type: "Nature",
        description: "Perfect evening views"
      }
    ]
  },
  {
    day: 2,
    date: "Dec 16, 2024",
    places: [
      {
        id: 4,
        name: "Adventure Park",
        time: "10:00 AM",
        duration: "3 hours",
        distance: "5.2 km",
        type: "Adventure",
        description: "Thrilling activities and rides"
      },
      {
        id: 5,
        name: "Local Food Street",
        time: "02:00 PM",
        duration: "2 hours",
        distance: "2.1 km",
        type: "Food",
        description: "Authentic local cuisine"
      },
      {
        id: 6,
        name: "Lakeside Walk",
        time: "06:00 PM",
        duration: "1.5 hours",
        distance: "1.8 km",
        type: "Nature",
        description: "Peaceful evening stroll"
      }
    ]
  }
];

const typeColors = {
  "History": "bg-gradient-sunset",
  "Shopping": "bg-gradient-ocean",
  "Nature": "bg-gradient-nature",
  "Adventure": "bg-gradient-hero",
  "Food": "bg-primary"
};

const ItineraryBuilderScreen = ({ onNext, onBack, stayDays }: ItineraryBuilderScreenProps) => {
  const [itinerary, setItinerary] = useState(mockItinerary);
  const [editingPlace, setEditingPlace] = useState<number | null>(null);

  const addPlace = (dayIndex: number) => {
    // Placeholder for add place functionality
    console.log(`Adding place to day ${dayIndex + 1}`);
  };

  const editPlace = (placeId: number) => {
    setEditingPlace(placeId);
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="glass" size="icon" onClick={onBack}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Itinerary Builder</h1>
            <p className="text-white/80 text-sm">Your {stayDays}-day adventure plan</p>
          </div>
        </div>

        {/* Summary card */}
        <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{stayDays} Days Planned</p>
                  <p className="text-sm text-muted-foreground">15 places to visit</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Customizable
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Itinerary days */}
      <div className="px-6 py-4 space-y-6">
        {itinerary.map((day, dayIndex) => (
          <div key={day.day}>
            {/* Day header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">Day {day.day}</h2>
                <p className="text-sm text-muted-foreground">{day.date}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addPlace(dayIndex)}
              >
                <Plus className="w-4 h-4" />
                Add Place
              </Button>
            </div>

            {/* Places for the day */}
            <div className="space-y-3">
              {day.places.map((place, placeIndex) => (
                <Card key={place.id} className="shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3 flex-1">
                        {/* Time indicator */}
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full ${typeColors[place.type as keyof typeof typeColors]} flex items-center justify-center text-white text-xs font-bold`}>
                            {placeIndex + 1}
                          </div>
                          {placeIndex < day.places.length - 1 && (
                            <div className="w-0.5 h-12 bg-border mt-2"></div>
                          )}
                        </div>

                        {/* Place details */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{place.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {place.type}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {place.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {place.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {place.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Navigation className="w-3 h-3" />
                              {place.distance}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Edit button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editPlace(place.id)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Day summary */}
            <Card className="mt-4 bg-gradient-to-r from-muted/50 to-muted/30">
              <CardContent className="p-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Day {day.day} Summary:</span>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {day.places.length} places
                    </span>
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      12.5 km total
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Add new day */}
        {stayDays > itinerary.length && (
          <Card className="border-dashed border-2">
            <CardContent className="p-6 text-center">
              <Button variant="ghost" className="w-full">
                <Plus className="w-5 h-5" />
                Add Day {itinerary.length + 1} Itinerary
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Next button */}
      <div className="p-6">
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full"
          onClick={onNext}
        >
          Add to Trip Summary
        </Button>
      </div>
    </div>
  );
};

export default ItineraryBuilderScreen;