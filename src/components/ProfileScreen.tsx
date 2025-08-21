import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  MapPin, 
  Calendar, 
  Settings, 
  Download, 
  Trash2,
  Edit3,
  LogOut,
  ChevronLeft,
  Moon,
  Sun,
  Globe,
  CreditCard,
  Shield
} from "lucide-react";

interface ProfileScreenProps {
  onBack: () => void;
}

const mockTrips = [
  {
    id: 1,
    title: "Mumbai to Goa",
    dates: "Dec 15-17, 2024",
    status: "upcoming",
    members: 4,
    totalCost: "₹3,950"
  },
  {
    id: 2,
    title: "Delhi Weekend Getaway",
    dates: "Nov 20-22, 2024",
    status: "completed",
    members: 3,
    totalCost: "₹2,800"
  },
  {
    id: 3,
    title: "Rajasthan Heritage Tour",
    dates: "Oct 5-12, 2024",
    status: "completed",
    members: 6,
    totalCost: "₹8,500"
  }
];

const ProfileScreen = ({ onBack }: ProfileScreenProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("en");

  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    joinDate: "October 2024",
    tripsCompleted: 8,
    totalSaved: "₹15,000"
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
            <h1 className="text-xl font-bold text-white">Profile</h1>
            <p className="text-white/80 text-sm">Manage your account & trips</p>
          </div>
        </div>

        {/* User info card */}
        <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center text-white text-xl font-bold">
                {userInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-lg">{userInfo.name}</h2>
                <p className="text-muted-foreground text-sm">{userInfo.email}</p>
                <p className="text-muted-foreground text-xs">Member since {userInfo.joinDate}</p>
              </div>
              <Button variant="outline" size="sm">
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div className="text-center">
                <p className="font-bold text-lg text-primary">{userInfo.tripsCompleted}</p>
                <p className="text-xs text-muted-foreground">Trips Completed</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg text-secondary">{userInfo.totalSaved}</p>
                <p className="text-xs text-muted-foreground">Total Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <Tabs defaultValue="trips" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="space-y-4">
            {/* Filter tabs */}
            <div className="flex gap-2">
              <Button variant="default" size="sm">All Trips</Button>
              <Button variant="outline" size="sm">Upcoming</Button>
              <Button variant="outline" size="sm">Completed</Button>
              <Button variant="outline" size="sm">Templates</Button>
            </div>

            {/* Trips list */}
            <div className="space-y-3">
              {mockTrips.map((trip) => (
                <Card key={trip.id} className="shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{trip.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {trip.dates}
                        </p>
                      </div>
                      <Badge 
                        variant={trip.status === "upcoming" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {trip.status}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {trip.members} members
                        </span>
                        <span className="font-medium">{trip.totalCost}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            {/* Preferences */}
            <Card className="shadow-medium">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Preferences
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      <span>Dark Mode</span>
                    </div>
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Currency</span>
                    </div>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">₹ INR</SelectItem>
                        <SelectItem value="USD">$ USD</SelectItem>
                        <SelectItem value="EUR">€ EUR</SelectItem>
                        <SelectItem value="GBP">£ GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Language</span>
                    </div>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">EN</SelectItem>
                        <SelectItem value="hi">हिन्दी</SelectItem>
                        <SelectItem value="es">ES</SelectItem>
                        <SelectItem value="fr">FR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="shadow-medium">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security
                </h3>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Update Email
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Two-Factor Authentication
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="shadow-medium">
              <CardContent className="p-5 space-y-3">
                <Button variant="outline" className="w-full text-red-600 hover:bg-red-50">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
                <Button variant="outline" className="w-full text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            {/* Data Management */}
            <Card className="shadow-medium">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Data
                </h3>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4" />
                    Export All Trips as PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4" />
                    Export Expenses as CSV
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4" />
                    Download Account Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Storage Info */}
            <Card className="shadow-medium">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-4">Storage Usage</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Trip Data</span>
                    <span>2.5 MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Photos</span>
                    <span>15.2 MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Documents</span>
                    <span>1.8 MB</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-3">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">19.5 MB of 100 MB used</p>
                </div>

                <Button variant="outline" className="w-full mt-4 text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                  Clear All Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileScreen;