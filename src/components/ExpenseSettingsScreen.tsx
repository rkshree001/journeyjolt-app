import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  Settings,
  Bell,
  Moon,
  Sun,
  DollarSign,
  Download,
  Trash2,
  Shield,
  Globe
} from "lucide-react";

interface ExpenseSettingsScreenProps {
  onBack: () => void;
}

interface SettingsState {
  defaultCurrency: string;
  notifications: {
    newExpenses: boolean;
    settlements: boolean;
    weeklyReports: boolean;
    reminders: boolean;
  };
  privacy: {
    showProfile: boolean;
    allowInvites: boolean;
    shareAnalytics: boolean;
  };
  display: {
    darkMode: boolean;
    compactView: boolean;
    showCents: boolean;
  };
  export: {
    autoBackup: boolean;
    includePictures: boolean;
    defaultFormat: string;
  };
}

const CURRENCIES = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" }
];

const ExpenseSettingsScreen = ({ onBack }: ExpenseSettingsScreenProps) => {
  const [settings, setSettings] = useState<SettingsState>({
    defaultCurrency: "INR",
    notifications: {
      newExpenses: true,
      settlements: true,
      weeklyReports: false,
      reminders: true
    },
    privacy: {
      showProfile: true,
      allowInvites: true,
      shareAnalytics: false
    },
    display: {
      darkMode: false,
      compactView: false,
      showCents: true
    },
    export: {
      autoBackup: false,
      includePictures: true,
      defaultFormat: "pdf"
    }
  });

  const updateNotificationSetting = (key: keyof typeof settings.notifications, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const updatePrivacySetting = (key: keyof typeof settings.privacy, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value }
    }));
  };

  const updateDisplaySetting = (key: keyof typeof settings.display, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      display: { ...prev.display, [key]: value }
    }));
  };

  const updateExportSetting = (key: keyof typeof settings.export, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      export: { ...prev.export, [key]: value }
    }));
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
            <h1 className="text-xl font-bold text-white">Settings</h1>
            <p className="text-white/80 text-sm">Customize your expense tracker</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 space-y-6">
        {/* Currency Settings */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Currency & Region
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Currency</Label>
              <Select 
                value={settings.defaultCurrency} 
                onValueChange={(value) => setSettings(prev => ({ ...prev, defaultCurrency: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show cents/decimals</Label>
                <p className="text-sm text-muted-foreground">Display amounts with decimal places</p>
              </div>
              <Switch
                checked={settings.display.showCents}
                onCheckedChange={(checked) => updateDisplaySetting('showCents', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>New Expenses</Label>
                <p className="text-sm text-muted-foreground">Get notified when expenses are added</p>
              </div>
              <Switch
                checked={settings.notifications.newExpenses}
                onCheckedChange={(checked) => updateNotificationSetting('newExpenses', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Settlements</Label>
                <p className="text-sm text-muted-foreground">Notifications for payment requests</p>
              </div>
              <Switch
                checked={settings.notifications.settlements}
                onCheckedChange={(checked) => updateNotificationSetting('settlements', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Weekly expense summaries</p>
              </div>
              <Switch
                checked={settings.notifications.weeklyReports}
                onCheckedChange={(checked) => updateNotificationSetting('weeklyReports', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Payment Reminders</Label>
                <p className="text-sm text-muted-foreground">Reminders for pending settlements</p>
              </div>
              <Switch
                checked={settings.notifications.reminders}
                onCheckedChange={(checked) => updateNotificationSetting('reminders', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {settings.display.darkMode ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-primary" />
              )}
              Display
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
              <Switch
                checked={settings.display.darkMode}
                onCheckedChange={(checked) => updateDisplaySetting('darkMode', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Compact View</Label>
                <p className="text-sm text-muted-foreground">Show more items on screen</p>
              </div>
              <Switch
                checked={settings.display.compactView}
                onCheckedChange={(checked) => updateDisplaySetting('compactView', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show Profile to Others</Label>
                <p className="text-sm text-muted-foreground">Allow others to see your profile</p>
              </div>
              <Switch
                checked={settings.privacy.showProfile}
                onCheckedChange={(checked) => updatePrivacySetting('showProfile', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Allow Group Invites</Label>
                <p className="text-sm text-muted-foreground">Let others invite you to groups</p>
              </div>
              <Switch
                checked={settings.privacy.allowInvites}
                onCheckedChange={(checked) => updatePrivacySetting('allowInvites', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Share Anonymous Analytics</Label>
                <p className="text-sm text-muted-foreground">Help improve the app</p>
              </div>
              <Switch
                checked={settings.privacy.shareAnalytics}
                onCheckedChange={(checked) => updatePrivacySetting('shareAnalytics', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Export Settings */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Export & Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">Automatically backup to cloud</p>
              </div>
              <Switch
                checked={settings.export.autoBackup}
                onCheckedChange={(checked) => updateExportSetting('autoBackup', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Include Pictures in Exports</Label>
                <p className="text-sm text-muted-foreground">Add receipt photos to reports</p>
              </div>
              <Switch
                checked={settings.export.includePictures}
                onCheckedChange={(checked) => updateExportSetting('includePictures', checked)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Default Export Format</Label>
              <Select 
                value={settings.export.defaultFormat} 
                onValueChange={(value) => updateExportSetting('defaultFormat', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="shadow-medium border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/10">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/10">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              These actions cannot be undone. Please be careful.
            </p>
          </CardContent>
        </Card>

        {/* Save Settings */}
        <Button variant="hero" size="lg" className="w-full">
          <Settings className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default ExpenseSettingsScreen;