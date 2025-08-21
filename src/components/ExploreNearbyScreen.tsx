import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  Camera, 
  Utensils, 
  Mountain, 
  Calendar,
  Navigation,
  ChevronLeft,
  Heart,
  Share2
} from "lucide-react";

interface ExploreNearbyScreenProps {
  onBack: () => void;
}

const categories = [
  { id: "attractions", name: "Attractions", icon: <Camera className="w-4 h-4" />, color: "bg-gradient-sunset" },
  { id: "food", name: "Food", icon: <Utensils className="w-4 h-4" />, color: "bg-gradient-ocean" },
  { id: "nature", name: "Nature", icon: <Mountain className="w-4 h-4" />, color: "bg-gradient-nature" },
  { id: "events", name: "Events", icon: <Calendar className="w-4 h-4" />, color: "bg-gradient-hero" }
];

const mockPlaces = [
  {
    id: 1,
    name: "Sunset Beach Resort",
    category: "attractions",
    rating: 4.5,
    reviews: 324,
    distance: "2.3 km",
    openTime: "6:00 AM - 8:00 PM",
    price: "Free",
    description: "Beautiful beach with golden sunset views",
    tags: ["Beach", "Sunset", "Photography"],
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    name: "Street Food Paradise",
    category: "food",
    rating: 4.7,
    reviews: 156,
    distance: "0.8 km",
    openTime: "5:00 PM - 12:00 AM",
    price: "₹150-300",
    description: "Local street food with authentic flavors",
    tags: ["Street Food", "Local", "Spicy"],
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    name: "Hilltop Trekking Trail",
    category: "nature",
    rating: 4.3,
    reviews: 89,
    distance: "5.2 km",
    openTime: "5:00 AM - 6:00 PM",
    price: "₹50 entry",
    description: "Scenic hiking trail with panoramic views",
    tags: ["Hiking", "Views", "Adventure"],
    image: "/api/placeholder/300/200"
  },
  {
    id: 4,
    name: "Cultural Music Festival",
    category: "events",
    rating: 4.6,
    reviews: 67,
    distance: "1.5 km",
    openTime: "Dec 20-22, 7:00 PM",
    price: "₹500",
    description: "Traditional music and dance performances",
    tags: ["Music", "Culture", "Festival"],
    image: "/api/placeholder/300/200"
  },
  {
    id: 5,
    name: "Rooftop Cafe & Lounge",
    category: "food",
    rating: 4.4,
    reviews: 203,
    distance: "1.1 km",
    openTime: "11:00 AM - 11:00 PM",
    price: "₹300-800",
    description: "Cafe with city views and continental menu",
    tags: ["Cafe", "Views", "Continental"],
    image: "/api/placeholder/300/200"
  },
  {
    id: 6,
    name: "Ancient Temple Complex",
    category: "attractions",
    rating: 4.2,
    reviews: 445,
    distance: "3.7 km",
    openTime: "6:00 AM - 7:00 PM",
    price: "₹20",
    description: "Historical temple with intricate architecture",
    tags: ["History", "Architecture", "Spiritual"],
    image: "/api/placeholder/300/200"
  }
];

const ExploreNearbyScreen = ({ onBack }: ExploreNearbyScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (placeId: number) => {
    setFavorites(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  const filteredPlaces = mockPlaces.filter(place => {
    const matchesCategory = selectedCategory === "all" || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
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
            <h1 className="text-xl font-bold text-white">Explore Nearby</h1>
            <p className="text-white/80 text-sm">Discover amazing places around you</p>
          </div>
        </div>

        {/* Search bar */}
        <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search attractions, food, events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
              <Button variant="outline" size="icon" className="absolute right-2 top-2">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="whitespace-nowrap"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap flex items-center gap-1"
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-6 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">{filteredPlaces.length} places found</p>
          <Button variant="ghost" size="sm">
            <MapPin className="w-4 h-4" />
            Map View
          </Button>
        </div>

        {/* Places grid */}
        <div className="space-y-4">
          {filteredPlaces.map((place) => (
            <Card key={place.id} className="shadow-soft overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Image placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-sm">{place.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{place.rating}</span>
                            <span className="text-xs text-muted-foreground">({place.reviews})</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {categories.find(c => c.id === place.category)?.name}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(place.id)}
                        >
                          <Heart 
                            className={`w-4 h-4 ${
                              favorites.includes(place.id) 
                                ? "fill-red-500 text-red-500" 
                                : "text-muted-foreground"
                            }`} 
                          />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {place.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        {place.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {place.openTime}
                      </span>
                      <span className="font-medium text-primary">{place.price}</span>
                    </div>

                    <div className="flex gap-1 flex-wrap">
                      {place.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load more */}
        {filteredPlaces.length > 6 && (
          <div className="text-center py-4">
            <Button variant="outline">
              Load More Places
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreNearbyScreen;