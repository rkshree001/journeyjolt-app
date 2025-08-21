import { useState } from "react";
import { ArrowLeft, MapPin, Users, Calendar, Bed, Bath, Wifi, Car, Star, Heart, Share2, User, Baby, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface StayPlanningScreenProps {
  onNext: () => void;
  onBack: () => void;
}

interface Guest {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  type: "adult" | "child";
  email?: string;
  phone?: string;
}

const EnhancedStayPlanningScreen = ({ onNext, onBack }: StayPlanningScreenProps) => {
  const { toast } = useToast();
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([
    { id: "1", name: "John Doe", age: 28, gender: "male", type: "adult", email: "john@example.com", phone: "+1234567890" }
  ]);

  const [newGuest, setNewGuest] = useState({
    name: "",
    age: "",
    gender: "male" as "male" | "female",
    type: "adult" as "adult" | "child",
    email: "",
    phone: ""
  });

  const [searchLocation, setSearchLocation] = useState("Goa, India");
  const [checkIn, setCheckIn] = useState("2024-01-15");
  const [checkOut, setCheckOut] = useState("2024-01-18");
  const [rooms, setRooms] = useState("1");

  const hotels = [
    {
      id: 1,
      name: "Taj Exotica Resort & Spa",
      location: "Benaulim, Goa",
      rating: 4.8,
      reviews: 2340,
      price: 15000,
      originalPrice: 18000,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      amenities: ["Wifi", "Pool", "Spa", "Beach Access", "Parking"],
      rooms: "Ocean View Suite",
      capacity: "2 Adults + 1 Child"
    },
    {
      id: 2,
      name: "Radisson Blu Resort",
      location: "Cavelossim, Goa",
      rating: 4.6,
      reviews: 1890,
      price: 12000,
      originalPrice: 15000,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      amenities: ["Wifi", "Pool", "Gym", "Restaurant", "Parking"],
      rooms: "Deluxe Room",
      capacity: "2 Adults"
    }
  ];

  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.age) {
      toast({
        title: "Error",
        description: "Name and age are required",
        variant: "destructive"
      });
      return;
    }

    const guest: Guest = {
      id: Date.now().toString(),
      name: newGuest.name,
      age: parseInt(newGuest.age),
      gender: newGuest.gender,
      type: parseInt(newGuest.age) < 18 ? "child" : newGuest.type,
      email: newGuest.email,
      phone: newGuest.phone
    };

    setGuests([...guests, guest]);
    setNewGuest({ name: "", age: "", gender: "male", type: "adult", email: "", phone: "" });
    setShowAddGuest(false);

    toast({
      title: "Guest added",
      description: `${guest.name} has been added to the booking`,
    });
  };

  const removeGuest = (guestId: string) => {
    setGuests(guests.filter(g => g.id !== guestId));
  };

  const getTotalCost = () => {
    const basePrice = hotels[0].price;
    const totalGuests = guests.length;
    const extraGuestFee = Math.max(0, totalGuests - 2) * 2000;
    const taxes = (basePrice + extraGuestFee) * 0.18;
    return basePrice + extraGuestFee + taxes;
  };

  const getGuestSummary = () => {
    const adults = guests.filter(g => g.type === "adult").length;
    const children = guests.filter(g => g.type === "child").length;
    const males = guests.filter(g => g.gender === "male").length;
    const females = guests.filter(g => g.gender === "female").length;
    
    return { adults, children, males, females, total: guests.length };
  };

  const summary = getGuestSummary();

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero p-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Stay Planning</h1>
            <p className="text-white/80 text-sm">Find perfect accommodations for your group</p>
          </div>
        </div>

        {/* Search Filters */}
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                placeholder="Where are you going?"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-white/80 text-xs">Check-in</Label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-xs">Check-out</Label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-xs">Rooms</Label>
                <Select value={rooms} onValueChange={setRooms}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Room</SelectItem>
                    <SelectItem value="2">2 Rooms</SelectItem>
                    <SelectItem value="3">3 Rooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Guest Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Guest Details ({summary.total} guests)
              </CardTitle>
              <Dialog open={showAddGuest} onOpenChange={setShowAddGuest}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-3 w-3 mr-1" />
                    Add Guest
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Guest</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input
                          value={newGuest.name}
                          onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                          placeholder="Enter full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Age *</Label>
                        <Input
                          type="number"
                          value={newGuest.age}
                          onChange={(e) => setNewGuest({ ...newGuest, age: e.target.value })}
                          placeholder="Age"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select value={newGuest.gender} onValueChange={(value: "male" | "female") => setNewGuest({ ...newGuest, gender: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={newGuest.type} onValueChange={(value: "adult" | "child") => setNewGuest({ ...newGuest, type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="adult">Adult</SelectItem>
                            <SelectItem value="child">Child</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={newGuest.email}
                        onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                        placeholder="email@example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        type="tel"
                        value={newGuest.phone}
                        onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddGuest(false)}>Cancel</Button>
                    <Button onClick={handleAddGuest}>Add Guest</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Guest Summary */}
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="font-semibold text-blue-600">{summary.adults}</div>
                <div className="text-blue-600">Adults</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="font-semibold text-green-600">{summary.children}</div>
                <div className="text-green-600">Children</div>
              </div>
              <div className="text-center p-2 bg-purple-50 rounded">
                <div className="font-semibold text-purple-600">{summary.males}</div>
                <div className="text-purple-600">Male</div>
              </div>
              <div className="text-center p-2 bg-pink-50 rounded">
                <div className="font-semibold text-pink-600">{summary.females}</div>
                <div className="text-pink-600">Female</div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {guests.map((guest) => (
              <div key={guest.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={guest.gender === "male" ? "bg-blue-100" : "bg-pink-100"}>
                      {guest.type === "child" ? <Baby className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{guest.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {guest.age} years • {guest.gender} • {guest.type}
                    </div>
                  </div>
                </div>
                {guests.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeGuest(guest.id)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Base Price (3 nights)</span>
              <span>₹{hotels[0].price.toLocaleString()}</span>
            </div>
            {summary.total > 2 && (
              <div className="flex justify-between">
                <span>Extra Guest Fee ({summary.total - 2} guests)</span>
                <span>₹{((summary.total - 2) * 2000).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Taxes & Fees (18%)</span>
              <span>₹{Math.round(getTotalCost() * 0.15).toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span className="text-primary">₹{getTotalCost().toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Hotels */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recommended Hotels</h3>
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-medium transition-shadow animate-fade-in">
              <div className="flex">
                <div className="w-32 h-32 flex-shrink-0">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{hotel.name}</h4>
                        <p className="text-sm text-muted-foreground">{hotel.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{hotel.rating}</span>
                          <span className="text-sm text-muted-foreground">({hotel.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">₹{hotel.price.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground line-through">₹{hotel.originalPrice.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">per night</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.slice(0, 4).map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">{amenity}</Badge>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <Badge variant="outline" className="text-xs">+{hotel.amenities.length - 4} more</Badge>
                      )}
                    </div>
                    
                    <Button className="w-full">Book Now</Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <Button onClick={onNext} className="w-full" size="lg">
          Continue to Itinerary
        </Button>
      </div>
    </div>
  );
};

export default EnhancedStayPlanningScreen;