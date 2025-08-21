import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar,
  Users,
  DollarSign,
  Plane,
  Hotel,
  Camera,
  Share2,
  Download,
  Save,
  CheckCircle,
  Clock,
  Star,
  Navigation
} from "lucide-react";
import { toast } from "sonner";

interface TripSummaryScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

const mockTripData = {
  title: "San Francisco Adventure",
  destination: "San Francisco, CA",
  startDate: "2024-02-15",
  endDate: "2024-02-18",
  status: "upcoming",
  participants: 4,
  
  route: {
    from: "Los Angeles, CA",
    to: "San Francisco, CA",
    mode: "plane",
    duration: "1h 30m",
    distance: "347 miles",
    stops: ["Oakland Airport", "Golden Gate Bridge"]
  },
  
  accommodation: {
    name: "Grand Hotel San Francisco",
    type: "Hotel",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    rooms: 2,
    rating: 4.5,
    cost: 450
  },
  
  itinerary: [
    {
      day: 1,
      date: "2024-02-15",
      places: [
        { name: "Golden Gate Bridge", type: "Landmark", time: "09:00", cost: 0 },
        { name: "Fisherman's Wharf", type: "Attraction", time: "11:30", cost: 25 }
      ]
    },
    {
      day: 2,
      date: "2024-02-16",
      places: [
        { name: "Alcatraz Island", type: "Historical", time: "10:00", cost: 45 }
      ]
    }
  ],
  
  expenses: {
    categories: [
      { name: "Accommodation", amount: 450, percentage: 45 },
      { name: "Transportation", amount: 320, percentage: 32 },
      { name: "Food & Dining", amount: 180, percentage: 18 },
      { name: "Activities", amount: 50, percentage: 5 }
    ],
    total: 1000,
    perPerson: 250
  }
};

const EnhancedTripSummaryScreen = ({ onBack, onComplete }: TripSummaryScreenProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Trip saved as draft");
    }, 1500);
  };

  const handleShare = () => {
    toast.success("Trip shared successfully");
  };

  const handleExport = () => {
    toast.success("Trip exported as PDF");
  };

  const handleComplete = () => {
    onComplete();
    toast.success("Trip completed and saved!");
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="glass" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="glass" size="icon" onClick={handleShare} className="text-white">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="icon" onClick={handleExport} className="text-white">
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="text-center text-white space-y-2">
          <h1 className="text-2xl font-bold">{mockTripData.title}</h1>
          <p className="text-white/80">Complete trip summary</p>
        </div>

        {/* Trip Status */}
        <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Trip Ready</span>
              </div>
              <Badge className="bg-gradient-nature text-white">
                {mockTripData.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="px-6 pb-24 space-y-6 -mt-3">
        {/* Basic Information */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Trip Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Destination</p>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">{mockTripData.destination}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <span className="font-medium">4 days, 3 nights</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dates</p>
                <span className="font-medium">
                  {new Date(mockTripData.startDate).toLocaleDateString()} - {new Date(mockTripData.endDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Travelers</p>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-medium">{mockTripData.participants} people</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Information */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              Route & Transportation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-card rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{mockTripData.route.from} → {mockTripData.route.to}</p>
                  <p className="text-sm text-muted-foreground">{mockTripData.route.duration} • {mockTripData.route.distance}</p>
                </div>
              </div>
            </div>
            
            {mockTripData.route.stops.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Planned Stops:</p>
                <div className="space-y-2">
                  {mockTripData.route.stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{stop}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Accommodation */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hotel className="w-5 h-5 text-primary" />
              Accommodation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-gradient-card rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{mockTripData.accommodation.name}</h4>
                  <p className="text-sm text-muted-foreground">{mockTripData.accommodation.type}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{mockTripData.accommodation.rating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Check-in</p>
                  <p className="font-medium">{new Date(mockTripData.accommodation.checkIn).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check-out</p>
                  <p className="font-medium">{new Date(mockTripData.accommodation.checkOut).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rooms</p>
                  <p className="font-medium">{mockTripData.accommodation.rooms}</p>
                </div>
              </div>
              
              <Separator className="my-3" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Cost</span>
                <span className="font-semibold text-primary">${mockTripData.accommodation.cost}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Itinerary */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Daily Itinerary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTripData.itinerary.map((day) => (
              <div key={day.day} className="border-l-2 border-primary pl-4">
                <h4 className="font-semibold mb-2">Day {day.day} - {new Date(day.date).toLocaleDateString()}</h4>
                <div className="space-y-2">
                  {day.places.map((place, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{place.name}</p>
                        <p className="text-xs text-muted-foreground">{place.time} • {place.type}</p>
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {place.cost === 0 ? 'Free' : `$${place.cost}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Expense Summary */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTripData.expenses.categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm font-semibold">${category.amount}</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
            
            <Separator />
            
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Trip Cost</span>
              <span className="text-primary">${mockTripData.expenses.total}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Cost per person</span>
              <span>${mockTripData.expenses.perPerson}</span>
            </div>
          </CardContent>
        </Card>

        {/* Photos Section */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Trip Photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              <Camera className="w-4 h-4" />
              Add Photos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            disabled={isSaving}
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button variant="hero" onClick={handleComplete}>
            <CheckCircle className="w-4 h-4" />
            Complete Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTripSummaryScreen;