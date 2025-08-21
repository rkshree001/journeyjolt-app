import { useState } from "react";
import { ArrowLeft, MapPin, Star, Heart, Share2, Navigation, Filter, Search, Users, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ExploreNearbyScreenProps {
  onBack: () => void;
}

const ExploreNearbyScreen = ({ onBack }: ExploreNearbyScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const categories = [
    { id: "all", label: "All", icon: "🏛️" },
    { id: "restaurants", label: "Restaurants", icon: "🍽️" },
    { id: "attractions", label: "Attractions", icon: "🎡" },
    { id: "hotels", label: "Hotels", icon: "🏨" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "nightlife", label: "Nightlife", icon: "🌃" }
  ];

  const places = [
    {
      id: 1,
      name: "Taj Mahal",
      category: "attractions",
      rating: 4.8,
      reviews: 12450,
      distance: "2.3 km",
      price: "₹500",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400",
      description: "Iconic marble mausoleum and UNESCO World Heritage Site"
    },
    {
      id: 2,
      name: "Karim's Restaurant",
      category: "restaurants",
      rating: 4.5,
      reviews: 3200,
      distance: "1.8 km",
      price: "₹₹",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
      description: "Authentic Mughlai cuisine since 1913"
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero p-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Explore Nearby</h1>
            <p className="text-white/80 text-sm">Discover amazing places around you</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="text-white"
            >
              List
            </Button>
            <Button
              variant={viewMode === "map" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="text-white"
            >
              Map
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            placeholder="Search places, restaurants, attractions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap flex-shrink-0 text-white"
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === "map" ? (
          <div className="h-full bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Interactive map will load here</p>
              <p className="text-sm text-muted-foreground mt-2">Add your Mapbox token to enable maps</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {places.map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-medium transition-shadow animate-fade-in">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="flex-1 p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground line-clamp-1">{place.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{place.description}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{place.rating}</span>
                          <span className="text-muted-foreground">({place.reviews.toLocaleString()})</span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{place.distance}</span>
                        <span className="text-muted-foreground">•</span>
                        <Badge variant="secondary">{place.price}</Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Navigation className="h-3 w-3 mr-1" />
                          Directions
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreNearbyScreen;