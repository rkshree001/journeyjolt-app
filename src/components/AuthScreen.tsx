import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, User, Eye, EyeOff } from "lucide-react";

interface AuthScreenProps {
  onComplete: () => void;
}

const AuthScreen = ({ onComplete }: AuthScreenProps) => {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    name: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    onComplete();
  };

  const handleGuestAccess = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-6">
      <Card className="w-full max-w-md shadow-strong bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              {authMode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground">
              {authMode === "login" 
                ? "Sign in to continue your journey" 
                : "Join TripMate and start planning"
              }
            </p>
          </div>

          {/* Google Sign-in */}
          <Button variant="outline" className="w-full" size="lg">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center space-x-4">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "signup" && (
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 h-12"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 h-12"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-10 h-12"
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-12 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              {authMode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {/* Toggle auth mode */}
          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              {authMode === "login" ? "Don't have an account?" : "Already have an account?"}
            </span>
            <Button
              variant="ghost"
              onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
              className="ml-2 text-primary font-medium"
            >
              {authMode === "login" ? "Sign Up" : "Sign In"}
            </Button>
          </div>

          {/* Guest access */}
          <Button
            variant="outline"
            onClick={handleGuestAccess}
            className="w-full"
          >
            Continue as Guest
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;