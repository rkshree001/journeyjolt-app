import { useState } from "react";
import { ArrowLeft, DollarSign, Globe, Moon, Sun, Bell, Shield, Database, Ruler, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface PreferencesScreenProps {
  onBack: () => void;
}

const PreferencesScreen = ({ onBack }: PreferencesScreenProps) => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    currency: "USD",
    language: "English",
    theme: "light",
    tripNotifications: true,
    expenseNotifications: true,
    marketingNotifications: false,
    profileVisibility: true,
    locationSharing: false,
    dataUsageLimit: 5, // GB
    currentDataUsage: 2.8, // GB
    units: "metric"
  });

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    // Auto-save with toast feedback
    setTimeout(() => {
      toast({
        title: "Preference saved",
        description: "Your setting has been automatically saved",
      });
    }, 300);
  };

  const resetToDefaults = () => {
    setPreferences({
      currency: "USD",
      language: "English",
      theme: "light",
      tripNotifications: true,
      expenseNotifications: true,
      marketingNotifications: false,
      profileVisibility: true,
      locationSharing: false,
      dataUsageLimit: 5,
      currentDataUsage: 2.8,
      units: "metric"
    });
    toast({
      title: "Preferences reset",
      description: "All preferences have been reset to default values",
    });
  };

  const PreferenceSection = ({ title, icon, children, expandable = false }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    expandable?: boolean;
  }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => expandable && toggleSection(title)}
        className={`w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${expandable ? 'cursor-pointer' : 'cursor-default'}`}
        disabled={!expandable}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium text-foreground">{title}</span>
        </div>
        {expandable && (
          <ChevronRight 
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              expandedSections.has(title) ? 'rotate-90' : ''
            }`} 
          />
        )}
      </button>
      {(!expandable || expandedSections.has(title)) && (
        <div className="px-4 pb-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );

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
          <h1 className="text-xl font-semibold text-foreground">Preferences</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="pt-16 flex-1 overflow-y-auto">
        <div className="bg-card">
          {/* Currency Settings */}
          <PreferenceSection
            title="Currency"
            icon={<DollarSign className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-2">
              <Label>Default Currency</Label>
              <Select
                value={preferences.currency}
                onValueChange={(value) => handlePreferenceChange("currency", value)}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border shadow-strong z-50">
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Current selection: {preferences.currency} ({
                  preferences.currency === 'USD' ? '$' :
                  preferences.currency === 'EUR' ? '€' :
                  preferences.currency === 'GBP' ? '£' :
                  preferences.currency === 'INR' ? '₹' : '¥'
                })
              </p>
            </div>
          </PreferenceSection>

          {/* Language Settings */}
          <PreferenceSection
            title="Language"
            icon={<Globe className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-2">
              <Label>App Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => handlePreferenceChange("language", value)}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border shadow-strong z-50">
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Español</SelectItem>
                  <SelectItem value="French">Français</SelectItem>
                  <SelectItem value="German">Deutsch</SelectItem>
                  <SelectItem value="Hindi">हिन्दी</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Current selection: {preferences.language}
              </p>
            </div>
          </PreferenceSection>

          {/* Theme Settings */}
          <PreferenceSection
            title="Theme"
            icon={preferences.theme === 'dark' ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  {preferences.theme === 'dark' ? 'Dark theme active' : 'Light theme active'}
                </p>
              </div>
              <Switch
                checked={preferences.theme === 'dark'}
                onCheckedChange={(checked) => handlePreferenceChange("theme", checked ? 'dark' : 'light')}
              />
            </div>
          </PreferenceSection>

          {/* Notification Settings */}
          <PreferenceSection
            title="Notifications"
            icon={<Bell className="h-5 w-5 text-primary" />}
            expandable
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Trip Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications about your trips and bookings
                  </p>
                </div>
                <Switch
                  checked={preferences.tripNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange("tripNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Expense Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications about expense splits and payments
                  </p>
                </div>
                <Switch
                  checked={preferences.expenseNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange("expenseNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Marketing Communications</Label>
                  <p className="text-sm text-muted-foreground">
                    Promotional offers and travel deals
                  </p>
                </div>
                <Switch
                  checked={preferences.marketingNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange("marketingNotifications", checked)}
                />
              </div>
            </div>
          </PreferenceSection>

          {/* Privacy Settings */}
          <PreferenceSection
            title="Privacy"
            icon={<Shield className="h-5 w-5 text-primary" />}
            expandable
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see your profile information
                  </p>
                </div>
                <Switch
                  checked={preferences.profileVisibility}
                  onCheckedChange={(checked) => handlePreferenceChange("profileVisibility", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Location Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Share your location with trip members
                  </p>
                </div>
                <Switch
                  checked={preferences.locationSharing}
                  onCheckedChange={(checked) => handlePreferenceChange("locationSharing", checked)}
                />
              </div>
            </div>
          </PreferenceSection>

          {/* Data Usage */}
          <PreferenceSection
            title="Data Usage"
            icon={<Database className="h-5 w-5 text-primary" />}
            expandable
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Usage</span>
                  <span className="font-medium">
                    {preferences.currentDataUsage} GB / {preferences.dataUsageLimit} GB
                  </span>
                </div>
                <Progress 
                  value={(preferences.currentDataUsage / preferences.dataUsageLimit) * 100} 
                  className="h-2"
                />
                {preferences.currentDataUsage > preferences.dataUsageLimit * 0.8 && (
                  <p className="text-xs text-amber-600">
                    ⚠️ Approaching data limit
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Monthly Data Limit (GB)</Label>
                <Select
                  value={preferences.dataUsageLimit.toString()}
                  onValueChange={(value) => handlePreferenceChange("dataUsageLimit", parseInt(value))}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border shadow-strong z-50">
                    <SelectItem value="1">1 GB</SelectItem>
                    <SelectItem value="3">3 GB</SelectItem>
                    <SelectItem value="5">5 GB</SelectItem>
                    <SelectItem value="10">10 GB</SelectItem>
                    <SelectItem value="0">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PreferenceSection>

          {/* Measurement Units */}
          <PreferenceSection
            title="Units"
            icon={<Ruler className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-4">
              <Label>Measurement System</Label>
              <RadioGroup
                value={preferences.units}
                onValueChange={(value) => handlePreferenceChange("units", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="metric" id="metric" />
                  <Label htmlFor="metric" className="flex-1">
                    <div>
                      <span className="font-medium">Metric</span>
                      <p className="text-sm text-muted-foreground">
                        Kilometers, Celsius, Kilograms
                      </p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="imperial" id="imperial" />
                  <Label htmlFor="imperial" className="flex-1">
                    <div>
                      <span className="font-medium">Imperial</span>
                      <p className="text-sm text-muted-foreground">
                        Miles, Fahrenheit, Pounds
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground">
                Preview: {preferences.units === 'metric' ? '10 km, 25°C' : '6.2 mi, 77°F'}
              </p>
            </div>
          </PreferenceSection>
        </div>

        {/* Reset Button */}
        <div className="p-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Reset to Default Settings
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Preferences</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all your preferences to their default values. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetToDefaults}>
                  Reset All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default PreferencesScreen;