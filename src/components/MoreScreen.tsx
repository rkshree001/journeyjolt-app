import { useState } from "react";
import { 
  User, 
  Settings, 
  History, 
  Heart, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Shield,
  Bell,
  Globe,
  Moon,
  CreditCard,
  Download,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface MoreScreenProps {
  onEditProfile: () => void;
  onAccountSettings: () => void;
  onTripHistory: () => void;
  onPreferences: () => void;
  onSettings: () => void;
  onHelpSupport: () => void;
  onLogout: () => void;
  onExplore: () => void;
  onSummary: () => void;
  onStay: () => void;
  onGroup: () => void;
  onExport: () => void;
}

const MoreScreen = ({ 
  onEditProfile, 
  onAccountSettings, 
  onTripHistory, 
  onPreferences, 
  onSettings, 
  onHelpSupport, 
  onLogout,
  onExplore,
  onSummary,
  onStay,
  onGroup,
  onExport
}: MoreScreenProps) => {
  const { toast } = useToast();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    onLogout();
  };

  const menuSections = [
    {
      title: "Profile",
      items: [
        { icon: User, label: "Edit Profile", action: onEditProfile },
        { icon: Settings, label: "Account Settings", action: onAccountSettings }
      ]
    },
    {
      title: "Trip Management",
      items: [
        { icon: History, label: "Trip History", action: onTripHistory },
        { icon: Globe, label: "Explore Trips", action: onExplore },
        { icon: Download, label: "Trip Summary", action: onSummary }
      ]
    },
    {
      title: "Planning Tools",
      items: [
        { icon: CreditCard, label: "Stay Planning", action: onStay },
        { icon: Share2, label: "Group Management", action: onGroup },
        { icon: Download, label: "Export Reports", action: onExport }
      ]
    },
    {
      title: "Settings & Support",
      items: [
        { icon: Heart, label: "Preferences", action: onPreferences },
        { icon: Settings, label: "App Settings", action: onSettings },
        { icon: HelpCircle, label: "Help & Support", action: onHelpSupport }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <h1 className="text-2xl font-bold text-foreground">More</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Profile Card */}
        <Card className="bg-gradient-hero text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-2 ring-white/20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-white/20 text-white text-lg">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-white/80">john.doe@example.com</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Premium Member
                  </Badge>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onEditProfile}
                className="text-white hover:bg-white/20"
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground px-2">
              {section.title}
            </h3>
            <Card>
              <CardContent className="p-0">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-border last:border-b-0"
                  >
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="flex-1 text-left text-foreground">{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Logout Button */}
        <Card className="border-destructive/20">
          <CardContent className="p-0">
            <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
              <AlertDialogTrigger asChild>
                <button className="w-full flex items-center gap-3 p-4 hover:bg-destructive/5 transition-colors rounded-lg">
                  <LogOut className="h-5 w-5 text-destructive" />
                  <span className="flex-1 text-left text-destructive">Logout</span>
                  <ChevronRight className="h-4 w-4 text-destructive" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to logout? You'll need to sign in again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            ExpenseTracker v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoreScreen;