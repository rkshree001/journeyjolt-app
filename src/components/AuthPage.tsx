import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plane, AlertCircle, Mail, Lock, User, Eye, EyeOff, MapPin, Compass } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const AuthPage = () => {
  const { signIn, signUp, signInAsGuest, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(signInData.email, signInData.password);
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (signUpData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(signUpData.email, signUpData.password, signUpData.name);
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Please check your email to confirm your account!');
        setSignUpData({ name: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="relative">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center animate-pulse">
              <Plane className="w-8 h-8" />
            </div>
            <div className="absolute inset-0 animate-spin">
              <div className="w-16 h-16 border-2 border-white/30 border-t-white/60 rounded-full"></div>
            </div>
          </div>
          <span className="font-medium">Loading your journey...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-16 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/8 rounded-full blur-xl"></div>
      </div>

      <div className="relative flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/15 backdrop-blur-lg rounded-full shadow-glow mb-6">
              <div className="relative">
                <Plane className="w-10 h-10 text-white" />
                <MapPin className="w-4 h-4 text-white absolute -bottom-1 -right-1 animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">TripWisePay</h1>
            <p className="text-white/80 text-lg">Your Travel Companion</p>
          </div>

          {/* Auth Card */}
          <Card className="shadow-strong bg-white/95 backdrop-blur-sm border-0">
            <CardContent className="p-6">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
                  <TabsTrigger 
                    value="signin"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {error && (
                  <Alert variant="destructive" className="mb-4 bg-destructive/10 border-destructive/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="mb-4 bg-accent/10 border-accent/20">
                    <AlertCircle className="h-4 w-4 text-accent" />
                    <AlertDescription className="text-accent-foreground">{success}</AlertDescription>
                  </Alert>
                )}

                <TabsContent value="signin" className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="signin-email" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signInData.email}
                          onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                          className="pl-10 h-12 bg-background/50 border-border/50 focus:bg-background"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="signin-password" className="text-sm font-medium text-foreground">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={signInData.password}
                          onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                          className="pl-10 pr-10 h-12 bg-background/50 border-border/50 focus:bg-background"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full mt-6" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <Compass className="mr-2 h-4 w-4" />
                          Start Your Journey
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="signup-name" className="text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={signUpData.name}
                          onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                          className="pl-10 h-12 bg-background/50 border-border/50 focus:bg-background"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-email" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                          className="pl-10 h-12 bg-background/50 border-border/50 focus:bg-background"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="text-sm font-medium text-foreground">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a secure password"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                          className="pl-10 pr-10 h-12 bg-background/50 border-border/50 focus:bg-background"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-confirm" className="text-sm font-medium text-foreground">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="signup-confirm"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={signUpData.confirmPassword}
                          onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                          className="pl-10 pr-10 h-12 bg-background/50 border-border/50 focus:bg-background"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full mt-6" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <Plane className="mr-2 h-4 w-4" />
                          Begin Adventure
                        </>
                      )}
                    </Button>
                  </form>
                 </TabsContent>
              </Tabs>

              {/* Guest Login Section */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted-foreground/20"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full mt-4 bg-secondary/50 hover:bg-secondary border-muted-foreground/20"
                  onClick={signInAsGuest}
                  disabled={isLoading}
                >
                  <User className="mr-2 h-4 w-4" />
                  Continue as Guest
                </Button>
                
                <p className="text-center text-muted-foreground text-xs mt-2">
                  Explore the app with limited features
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer message */}
          <p className="text-center text-white/70 text-sm mt-6">
            Track expenses • Plan routes • Share with friends
          </p>
        </div>
      </div>
    </div>
  );
};