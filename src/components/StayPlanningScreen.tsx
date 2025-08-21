import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bed, 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee, 
  ChevronLeft,
  Filter,
  SortAsc
} from "lucide-react";

interface StayPlanningScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const mockAccommodations = [
  {
    id: 1,
    name: "Backpacker's Haven Hostel",
    type: "Hostel",
    price: 800,
    rating: 4.2,
    reviews: 156,
    distance: "0.5 km from center",
    amenities: ["Wifi", "Breakfast", "Common Room"],
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    name: "Budget Inn Express",
    type: "Budget Hotel",
    price: 1500,
    rating: 4.0,
    reviews: 89,
    distance: "1.2 km from center",
    amenities: ["Wifi", "Parking", "AC"],
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    name: "City Center PG",
    type: "PG",
    price: 1200,
    rating: 3.8,
    reviews: 42,
    distance: "0.3 km from center",
    amenities: ["Wifi", "Meals", "Laundry"],
    image: "/api/placeholder/300/200"
  },
  {
    id: 4,
    name: "Cozy Airbnb Studio",
    type: "Airbnb",
    price: 2000,
    rating: 4.6,
    reviews: 23,
    distance: "0.8 km from center",
    amenities: ["Wifi", "Kitchen", "Self Check-in"],
    image: "/api/placeholder/300/200"
  }
];

const amenityIcons = {
  "Wifi": <Wifi className="w-4 h-4" />,
  "Parking": <Car className="w-4 h-4" />,
  "Breakfast": <Coffee className="w-4 h-4" />,
  "AC": <span className="text-xs">❄️</span>,
  "Kitchen": <span className="text-xs">🍳</span>,
  "Meals": <span className="text-xs">🍽️</span>,
  "Laundry": <span className="text-xs">👕</span>,
  "Common Room": <span className="text-xs">🏠</span>,
  "Self Check-in": <span className="text-xs">🔑</span>
};

const StayPlanningScreen = ({ onNext, onBack }: StayPlanningScreenProps) => {
  const [stayDays, setStayDays] = useState("2");
  const [sortBy, setSortBy] = useState("price");
  const [filterType, setFilterType] = useState("all");

  const filteredAccommodations = mockAccommodations
    .filter(acc => filterType === "all" || acc.type.toLowerCase().includes(filterType))
    .sort((a, b) => {
      switch (sortBy) {
        case "price": return a.price - b.price;
        case "rating": return b.rating - a.rating;
        case "distance": return parseFloat(a.distance) - parseFloat(b.distance);
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="glass" size="icon" onClick={onBack}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Stay Planning</h1>
            <p className="text-white/80 text-sm">Find your perfect accommodation</p>
          </div>
        </div>

        {/* Stay duration input */}
        <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                <Bed className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground">Days Staying</label>
                <Input
                  type="number"
                  min="1"
                  max="30"
                  value={stayDays}
                  onChange={(e) => setStayDays(e.target.value)}
                  className="mt-1"
                  placeholder="Number of days"
                />
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total nights</p>
                <p className="font-semibold">{stayDays} nights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Sort */}
      <div className="px-6 py-4 space-y-4">
        <div className="flex gap-3">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="flex-1">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter by type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="hostel">Hostels</SelectItem>
              <SelectItem value="hotel">Budget Hotels</SelectItem>
              <SelectItem value="pg">PGs</SelectItem>
              <SelectItem value="airbnb">Airbnb</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex-1">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Accommodations list */}
      <div className="px-6 space-y-4">
        {filteredAccommodations.map((acc) => (
          <Card key={acc.id} className="shadow-soft overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                {/* Image placeholder */}
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Bed className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-sm">{acc.name}</h3>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {acc.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{acc.price}</p>
                      <p className="text-xs text-muted-foreground">per night</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {acc.rating} ({acc.reviews})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {acc.distance}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {acc.amenities.slice(0, 3).map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs"
                        >
                          {amenityIcons[amenity as keyof typeof amenityIcons]}
                          <span className="hidden sm:inline">{amenity}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button size="sm" variant="outline">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total cost summary */}
      <div className="px-6 py-4">
        <Card className="shadow-medium bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Estimated total for {stayDays} nights</p>
                <p className="font-bold text-lg">₹{parseInt(stayDays) * 1200} - ₹{parseInt(stayDays) * 2000}</p>
              </div>
              <Badge variant="secondary">Budget Range</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next button */}
      <div className="p-6">
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full"
          onClick={onNext}
        >
          Next: Build Itinerary
        </Button>
      </div>
    </div>
  );
};

export default StayPlanningScreen;