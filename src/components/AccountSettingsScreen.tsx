import { useState } from "react";
import { ArrowLeft, User, Shield, Bell, Database, AlertTriangle, Key, Smartphone, Mail, Eye, EyeOff, Edit3, Trash2, Download, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface AccountSettingsScreenProps {
  onBack: () => void;
}

const AccountSettingsScreen = ({ onBack }: AccountSettingsScreenProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false
  });

  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    profilePicture: ""
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    locationSharing: false,
    activityStatus: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    tripUpdates: true,
    messages: true,
    expenseAlerts: true,
    marketing: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    biometricLogin: true
  });

  const handleEditToggle = (field: string) => {
    setIsEditing(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleSaveField = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
    setIsEditing(prev => ({ ...prev, [field]: false }));
    toast({
      title: "Information updated",
      description: `Your ${field} has been updated successfully`,
    });
  };

  const handlePrivacyChange = (setting: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
    toast({
      title: "Privacy setting updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
    toast({
      title: "Notification setting updated",
      description: `${setting} notifications ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleSecurityChange = (setting: string, value: boolean) => {
    setSecuritySettings(prev => ({ ...prev, [setting]: value }));
    toast({
      title: "Security setting updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Change Password",
      description: "Password change form will be displayed",
    });
  };

  const handleDataExport = () => {
    toast({
      title: "Data Export",
      description: "Your data export has been initiated",
    });
  };

  const handleClearCache = () => {
    toast({
      title: "Cache Cleared",
      description: "App cache has been cleared successfully",
    });
  };

  const handleDeactivateAccount = () => {
    toast({
      title: "Account Deactivated",
      description: "Your account has been temporarily deactivated",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Account deletion process has been initiated",
    });
  };

  const EditableField = ({ label, value, field, type = "text" }: {
    label: string;
    value: string;
    field: string;
    type?: string;
  }) => {
    const [tempValue, setTempValue] = useState(value);
    const isEditingField = isEditing[field as keyof typeof isEditing];

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex gap-2">
          <div className="flex-1">
            {isEditingField ? (
              <Input
                type={type}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveField(field, tempValue);
                  if (e.key === 'Escape') {
                    setTempValue(value);
                    handleEditToggle(field);
                  }
                }}
                autoFocus
              />
            ) : (
              <div className="px-3 py-2 bg-muted rounded-md text-foreground">
                {value}
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (isEditingField) {
                handleSaveField(field, tempValue);
              } else {
                handleEditToggle(field);
              }
            }}
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
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
          <h1 className="text-xl font-semibold text-foreground">Account Settings</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="pt-16 flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Personal Information Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userInfo.profilePicture} />
                  <AvatarFallback className="text-lg bg-gradient-hero text-white">
                    {userInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>

              {/* Editable Fields */}
              <EditableField
                label="Full Name"
                value={userInfo.name}
                field="name"
              />

              <EditableField
                label="Email Address"
                value={userInfo.email}
                field="email"
                type="email"
              />

              <EditableField
                label="Phone Number"
                value={userInfo.phone}
                field="phone"
                type="tel"
              />
            </CardContent>
          </Card>

          {/* Privacy Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see your profile information
                  </p>
                </div>
                <Switch
                  checked={privacySettings.profileVisibility}
                  onCheckedChange={(checked) => handlePrivacyChange("profileVisibility", checked)}
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
                  checked={privacySettings.locationSharing}
                  onCheckedChange={(checked) => handlePrivacyChange("locationSharing", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Activity Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Show when you're online to other users
                  </p>
                </div>
                <Switch
                  checked={privacySettings.activityStatus}
                  onCheckedChange={(checked) => handlePrivacyChange("activityStatus", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Trip Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications about your trips and bookings
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.tripUpdates}
                  onCheckedChange={(checked) => handleNotificationChange("tripUpdates", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications for new messages and comments
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.messages}
                  onCheckedChange={(checked) => handleNotificationChange("messages", checked)}
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
                  checked={notificationSettings.expenseAlerts}
                  onCheckedChange={(checked) => handleNotificationChange("expenseAlerts", checked)}
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
                  checked={notificationSettings.marketing}
                  onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={handleChangePassword} className="w-full justify-start">
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Button>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Biometric Login</Label>
                  <p className="text-sm text-muted-foreground">
                    Use fingerprint or face ID to login
                  </p>
                </div>
                <Switch
                  checked={securitySettings.biometricLogin}
                  onCheckedChange={(checked) => handleSecurityChange("biometricLogin", checked)}
                />
              </div>

              <Button variant="outline" className="w-full justify-start">
                <Smartphone className="h-4 w-4 mr-2" />
                Login History & Devices
              </Button>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage Used</span>
                  <span className="font-medium">2.4 GB / 5 GB</span>
                </div>
                <Progress value={48} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Photos, documents, and offline data
                </p>
              </div>

              <Button variant="outline" onClick={handleDataExport} className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export My Data
              </Button>

              <Button variant="outline" onClick={handleClearCache} className="w-full justify-start">
                <HardDrive className="h-4 w-4 mr-2" />
                Clear Cache (248 MB)
              </Button>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-amber-200 dark:border-amber-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
                Account Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-amber-600 border-amber-300 hover:bg-amber-50">
                    <EyeOff className="h-4 w-4 mr-2" />
                    Deactivate Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deactivate Account</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your account will be temporarily disabled. You can reactivate it anytime by logging in again. Your data will remain safe.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeactivateAccount} className="bg-amber-600 hover:bg-amber-700">
                      Deactivate
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-destructive border-destructive/30 hover:bg-destructive/5">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove all your data from our servers including trips, expenses, and personal information.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsScreen;