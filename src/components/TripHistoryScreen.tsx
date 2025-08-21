import { useState } from "react";
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Search, Filter, SortAsc, Eye, RotateCcw, Plane, Car, Train, MapIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface TripHistoryScreenProps {
  onBack: () => void;
}

const TripHistoryScreen = ({ onBack }: TripHistoryScreenProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const mockTrips = [
    {
      id: 1,
      title: "Goa Beach Trip",
      route: "Delhi → Goa",
      dates: "Dec 15-20, 2023",
      duration: "6 days",
      location: "Goa, India",
      members: 4,
      totalCost: 45000,
      yourShare: 11250,
      status: "completed",
      transportation: "flight",
      thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      companions: ["Alice", "Bob", "Charlie"]
    },
    {
      id: 2,
      title: "Delhi Weekend",
      route: "Mumbai → Delhi",
      dates: "Nov 8-10, 2023", 
      duration: "3 days",
      location: "Delhi, India",
      members: 3,
      totalCost: 18500,
      yourShare: 6167,
      status: "completed",
      transportation: "train",
      thumbnail: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400",
      companions: ["Sarah", "Mike"]
    },
    {
      id: 3,
      title: "Manali Adventure",
      route: "Chandigarh → Manali",
      dates: "Oct 22-28, 2023",
      duration: "7 days", 
      location: "Manali, HP",
      members: 6,
      totalCost: 72000,
      yourShare: 12000,
      status: "completed",
      transportation: "car",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      companions: ["Team Alpha"]
    },
    {
      id: 4,
      title: "Mumbai Business Trip",
      route: "Bangalore → Mumbai",
      dates: "Jan 15-18, 2024",
      duration: "4 days",
      location: "Mumbai, India", 
      members: 2,
      totalCost: 32000,
      yourShare: 16000,
      status: "upcoming",
      transportation: "flight",
      thumbnail: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400",
      companions: ["Work Team"]
    },
    {
      id: 5,
      title: "Cancelled Kerala Tour",
      route: "Chennai → Kochi",
      dates: "Sep 5-12, 2023",
      duration: "8 days",
      location: "Kerala, India",
      members: 5,
      totalCost: 0,
      yourShare: 0,
      status: "cancelled",
      transportation: "train",
      thumbnail: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400",
      companions: ["Family"]
    }
  ];

  const filteredTrips = mockTrips
    .filter(trip => {
      const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trip.route.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === "all" || trip.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.dates.split('-')[0]).getTime() - new Date(a.dates.split('-')[0]).getTime();
        case "duration":
          return parseInt(b.duration) - parseInt(a.duration);
        case "destination":
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "cancelled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTransportationIcon = (transport: string) => {
    switch (transport) {
      case "flight": return <Plane className="h-4 w-4" />;
      case "car": return <Car className="h-4 w-4" />;
      case "train": return <Train className="h-4 w-4" />;
      default: return <MapIcon className="h-4 w-4" />;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    toast({
      title: "Refreshed",
      description: "Trip history has been updated",
    });
  };

  const handleViewDetails = (tripId: number) => {
    toast({
      title: "View Details",
      description: `Opening details for trip ${tripId}`,
    });
  };

  const handleRePlanTrip = (tripId: number) => {
    toast({
      title: "Re-plan Trip",
      description: `Copying trip ${tripId} details to new planning flow`,
    });
  };

  const statusCounts = {
    all: mockTrips.length,
    completed: mockTrips.filter(t => t.status === "completed").length,
    upcoming: mockTrips.filter(t => t.status === "upcoming").length,
    cancelled: mockTrips.filter(t => t.status === "cancelled").length
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-4 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Trip History</h1>
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-10 w-10"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="p-4 space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trips or destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          
          {/* Filter Chips and Sort */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {/* Status Filter Chips */}
            {Object.entries(statusCounts).map(([status, count]) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="whitespace-nowrap flex-shrink-0"
              >
                {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {count}
                </Badge>
              </Button>
            ))}
            
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 flex-shrink-0">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border shadow-strong z-50">
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="destination">Destination</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Trip List */}
      <div className="pt-32 flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {filteredTrips.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <MapIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery || filterStatus !== "all" ? "No trips found" : "No trips yet"}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                {searchQuery || filterStatus !== "all" 
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "Start planning your first adventure! Create memorable experiences and track your journey."
                }
              </p>
              {!searchQuery && filterStatus === "all" && (
                <Button onClick={() => toast({ title: "Start Planning", description: "Redirecting to trip planner..." })}>
                  Start Planning Your First Trip
                </Button>
              )}
            </div>
          ) : (
            /* Trip Cards */
            filteredTrips.map((trip) => (
              <Card key={trip.id} className="hover:shadow-medium transition-all duration-200 cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Trip Thumbnail */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <Avatar className="w-full h-full rounded-l-lg rounded-r-none">
                        <AvatarImage src={trip.thumbnail} className="object-cover" />
                        <AvatarFallback className="rounded-l-lg rounded-r-none bg-gradient-hero text-white">
                          {getTransportationIcon(trip.transportation)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Trip Details */}
                    <div className="flex-1 p-4">
                      <div className="space-y-3">
                        {/* Header Row */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground line-clamp-1">{trip.title}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              {getTransportationIcon(trip.transportation)}
                              {trip.route}
                            </p>
                          </div>
                          <Badge className={getStatusColor(trip.status)}>
                            {trip.status}
                          </Badge>
                        </div>

                        {/* Trip Info Grid */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{trip.dates}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{trip.members} members</span>
                          </div>
                        </div>

                        {/* Cost and Actions Row */}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="text-sm">
                            {trip.status !== "cancelled" ? (
                              <>
                                <span className="text-muted-foreground">Your share: </span>
                                <span className="font-medium text-primary">₹{trip.yourShare.toLocaleString()}</span>
                              </>
                            ) : (
                              <span className="text-muted-foreground italic">Cancelled</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(trip.id)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Details
                            </Button>
                            {trip.status !== "cancelled" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRePlanTrip(trip.id)}
                              >
                                <RotateCcw className="h-3 w-3 mr-1" />
                                Re-plan
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TripHistoryScreen;