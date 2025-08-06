import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Share2, 
  MapPin, 
  Calendar, 
  Car, 
  DollarSign,
  Clock,
  Bed,
  Navigation,
  Users,
  ChevronLeft,
  CheckCircle
} from "lucide-react";

interface TripSummaryScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

const TripSummaryScreen = ({ onBack, onComplete }: TripSummaryScreenProps) => {
  const tripData = {
    basic: {
      from: "Mumbai",
      to: "Goa",
      date: "Dec 15-17, 2024",
      travelMode: "Car",
      duration: "3 Days, 2 Nights"
    },
    route: {
      totalDistance: "245 km",
      estimatedTime: "4h 30min",
      stops: 3
    },
    stay: {
      accommodation: "Backpacker's Haven Hostel",
      checkIn: "Dec 15, 2024",
      checkOut: "Dec 17, 2024",
      nights: 2,
      cost: "₹1,600"
    },
    expenses: {
      total: "₹3,950",
      yourShare: "₹1,517",
      categories: [
        { name: "Food", amount: 1200 },
        { name: "Stay", amount: 1600 },
        { name: "Travel", amount: 800 },
        { name: "Activities", amount: 350 }
      ]
    }
  };

  const itinerary = [
    {
      day: 1,
      places: ["City Heritage Museum", "Central Market", "Sunset Point"]
    },
    {
      day: 2,
      places: ["Adventure Park", "Local Food Street", "Lakeside Walk"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="glass" size="icon" onClick={onBack}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Trip Summary</h1>
            <p className="text-white/80 text-sm">Your complete travel plan</p>
          </div>
        </div>

        {/* Trip completion status */}
        <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-green-600">Trip Plan Complete!</p>
                <p className="text-sm text-muted-foreground">Ready to export and share</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-6 py-4 space-y-6">
        {/* Basic Info */}
        <Card className="shadow-medium">
          <CardContent className="p-5">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">From</p>
                <p className="font-semibold">{tripData.basic.from}</p>
              </div>
              <div>
                <p className="text-muted-foreground">To</p>
                <p className="font-semibold">{tripData.basic.to}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Dates</p>
                <p className="font-semibold">{tripData.basic.date}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Travel Mode</p>
                <div className="flex items-center gap-1">
                  <Car className="w-4 h-4" />
                  <span className="font-semibold">{tripData.basic.travelMode}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route & Stops */}
        <Card className="shadow-medium">
          <CardContent className="p-5">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              Route & Stops
            </h2>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {tripData.route.totalDistance}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {tripData.route.estimatedTime}
                </span>
              </div>
              <Badge variant="secondary">
                {tripData.route.stops} stops saved
              </Badge>
            </div>
            
            <div className="h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Route map preview</p>
            </div>
          </CardContent>
        </Card>

        {/* Stay Details */}
        <Card className="shadow-medium">
          <CardContent className="p-5">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Bed className="w-5 h-5 text-primary" />
              Accommodation
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{tripData.stay.accommodation}</p>
                  <p className="text-sm text-muted-foreground">
                    {tripData.stay.checkIn} - {tripData.stay.checkOut}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{tripData.stay.cost}</p>
                  <p className="text-sm text-muted-foreground">{tripData.stay.nights} nights</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Itinerary */}
        <Card className="shadow-medium">
          <CardContent className="p-5">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Itinerary
            </h2>
            
            <div className="space-y-4">
              {itinerary.map((day) => (
                <div key={day.day}>
                  <p className="font-semibold text-sm mb-2">Day {day.day}</p>
                  <div className="flex flex-wrap gap-2">
                    {day.places.map((place, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {place}
                      </Badge>
                    ))}
                  </div>
                  {day.day < itinerary.length && <Separator className="mt-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expense Summary */}
        <Card className="shadow-medium">
          <CardContent className="p-5">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Expense Summary
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Trip Cost</span>
                <span className="font-bold text-lg">{tripData.expenses.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Your Share</span>
                <span className="font-semibold text-primary">{tripData.expenses.yourShare}</span>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                {tripData.expenses.categories.map((category) => (
                  <div key={category.name} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{category.name}</span>
                    <span>₹{category.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export & Share */}
        <Card className="shadow-medium bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-5">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-primary" />
              Export & Share
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Complete trip */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onComplete}>
            Save as Draft
          </Button>
          <Button variant="hero" className="flex-1" onClick={onComplete}>
            <Users className="w-4 h-4" />
            Complete Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripSummaryScreen;