import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Car,
  Plane,
  Train,
  Bus,
  RefreshCw,
  Eye,
  RotateCcw,
  Share2,
  Download
} from "lucide-react";
import { toast } from "sonner";

interface TripHistoryScreenProps {
  onBack: () => void;
}

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "completed" | "upcoming" | "cancelled" | "draft";
  totalCost: number;
  participants: number;
  transportation: "car" | "plane" | "train" | "bus";
  image: string;
  duration: string;
  activities: number;
}

const mockTrips: Trip[] = [
  {
    id: "1",
    title: "San Francisco Adventure",
    destination: "San Francisco, CA",
    startDate: "2024-02-15",
    endDate: "2024-02-18",
    status: "completed",
    totalCost: 1250,
    participants: 4,
    transportation: "plane",
    image: "🌉",
    duration: "4 days",
    activities: 12
  },
  {
    id: "2",
    title: "NYC Weekend Getaway",
    destination: "New York, NY",
    startDate: "2024-03-20",
    endDate: "2024-03-23",
    status: "upcoming",
    totalCost: 890,
    participants: 2,
    transportation: "train",
    image: "🗽",
    duration: "3 days",
    activities: 8
  },
  {
    id: "3",
    title: "Grand Canyon Road Trip",
    destination: "Arizona, USA",
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    status: "completed",
    totalCost: 750,
    participants: 3,
    transportation: "car",
    image: "🏔️",
    duration: "5 days",
    activities: 15
  },
  {
    id: "4",
    title: "Miami Beach Vacation",
    destination: "Miami, FL",
    startDate: "2024-04-05",
    endDate: "2024-04-10",
    status: "draft",
    totalCost: 0,
    participants: 5,
    transportation: "plane",
    image: "🏖️",
    duration: "5 days",
    activities: 0
  }
];

const EnhancedTripHistoryScreen = ({ onBack }: TripHistoryScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredTrips = mockTrips
    .filter(trip => {
      const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === "all" || trip.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case "cost":
          return b.totalCost - a.totalCost;
        case "duration":
          return parseInt(b.duration) - parseInt(a.duration);
        case "destination":
          return a.destination.localeCompare(b.destination);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-gradient-nature text-white";
      case "upcoming": return "bg-gradient-hero text-white";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      case "draft": return "bg-gradient-sunset text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTransportationIcon = (type: string) => {
    switch (type) {
      case "car": return <Car className="w-4 h-4" />;
      case "plane": return <Plane className="w-4 h-4" />;
      case "train": return <Train className="w-4 h-4" />;
      case "bus": return <Bus className="w-4 h-4" />;
      default: return <Car className="w-4 h-4" />;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Trip history updated");
    }, 1500);
  };

  const handleViewDetails = (trip: Trip) => {
    toast.info(`Viewing details for ${trip.title}`);
  };

  const handleRePlanTrip = (trip: Trip) => {
    toast.info(`Re-planning ${trip.title}`);
  };

  const handleShare = (trip: Trip) => {
    toast.success(`Shared ${trip.title}`);
  };

  const handleExport = (trip: Trip) => {
    toast.success(`Exported ${trip.title} details`);
  };

  const statusFilters = [
    { value: "all", label: "All Trips", count: mockTrips.length },
    { value: "completed", label: "Completed", count: mockTrips.filter(t => t.status === "completed").length },
    { value: "upcoming", label: "Upcoming", count: mockTrips.filter(t => t.status === "upcoming").length },
    { value: "draft", label: "Drafts", count: mockTrips.filter(t => t.status === "draft").length }
  ];

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="glass" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button 
            variant="glass" 
            size="icon" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-white"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <div className="text-center text-white space-y-2 mb-6">
          <h1 className="text-2xl font-bold">Trip History</h1>
          <p className="text-white/80">Manage your travel memories</p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 w-5 h-5 text-white/60" />
          <Input
            placeholder="Search trips or destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 -mt-3 mb-6">
        <Card className="bg-white/95 backdrop-blur-sm shadow-medium">
          <CardContent className="p-4">
            {/* Status Filter Chips */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={filterStatus === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(filter.value)}
                  className="whitespace-nowrap"
                >
                  {filter.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest)</SelectItem>
                  <SelectItem value="cost">Cost (Highest)</SelectItem>
                  <SelectItem value="duration">Duration (Longest)</SelectItem>
                  <SelectItem value="destination">Destination (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trip List */}
      <div className="px-6 pb-6 space-y-4">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <Card key={trip.id} className="shadow-medium hover:shadow-strong transition-shadow">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Trip Image/Icon */}
                  <div className="w-20 h-20 bg-gradient-hero flex items-center justify-center text-3xl">
                    {trip.image}
                  </div>
                  
                  {/* Trip Details */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{trip.title}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{trip.destination}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(trip.status)}>
                        {trip.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{trip.participants} people</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTransportationIcon(trip.transportation)}
                        <span className="capitalize">{trip.transportation}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        <span>${trip.totalCost}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(trip)}
                        className="flex-1"
                      >
                        <Eye className="w-3 h-3" />
                        Details
                      </Button>
                      
                      {trip.status !== "cancelled" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleRePlanTrip(trip)}
                          className="flex-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Re-plan
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleShare(trip)}
                      >
                        <Share2 className="w-3 h-3" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleExport(trip)}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="shadow-soft">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No trips found</h3>
              <p className="text-muted-foreground text-sm">
                {searchQuery || filterStatus !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Start planning your first adventure!"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnhancedTripHistoryScreen;