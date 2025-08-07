import { useState } from "react";
import EnhancedSplashScreen from "./EnhancedSplashScreen";
import EnhancedOnboardingScreen from "./EnhancedOnboardingScreen";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import RoutePlanningScreen from "./RoutePlanningScreen";
import EnhancedStayPlanningScreen from "./EnhancedStayPlanningScreen";
import EnhancedItineraryBuilderScreen from "./EnhancedItineraryBuilderScreen";
import ExpenseTrackerScreen from "./ExpenseTrackerScreen";
import EnhancedTripSummaryScreen from "./EnhancedTripSummaryScreen";
import EnhancedExploreNearbyScreen from "./EnhancedExploreNearbyScreen";
import BottomNavigation from "./BottomNavigation";
import MoreScreen from "./MoreScreen";
import EditProfileScreen from "./EditProfileScreen";
import AccountSettingsScreen from "./AccountSettingsScreen";
import EnhancedTripHistoryScreen from "./EnhancedTripHistoryScreen";
import PreferencesScreen from "./PreferencesScreen";
import ExpenseSettingsScreen from "./ExpenseSettingsScreen";
import HelpSupportScreen from "./HelpSupportScreen";

type AppState = 
  | "splash" 
  | "onboarding" 
  | "auth" 
  | "home" 
  | "route" 
  | "itinerary" 
  | "expense" 
  | "more"
  | "editProfile"
  | "accountSettings"
  | "tripHistory"
  | "preferences"
  | "settings"
  | "helpSupport"
  | "explore"
  | "summary"
  | "stay";

const AppRouter = () => {
  const [currentState, setCurrentState] = useState<AppState>("splash");
  const [tripData] = useState({
    from: "",
    to: "", 
    mode: "car",
    date: "",
    time: ""
  });

  const handleSplashComplete = () => setCurrentState("onboarding");
  const handleOnboardingComplete = () => setCurrentState("auth");
  const handleAuthComplete = () => setCurrentState("home");
  const handleCreateTrip = () => setCurrentState("route");
  const handleShowProfile = () => setCurrentState("more");
  const handleShowExplore = () => setCurrentState("explore");
  
  // More screen navigation
  const handleEditProfile = () => setCurrentState("editProfile");
  const handleAccountSettings = () => setCurrentState("accountSettings");
  const handleTripHistory = () => setCurrentState("tripHistory");
  const handlePreferences = () => setCurrentState("preferences");
  const handleSettings = () => setCurrentState("settings");
  const handleHelpSupport = () => setCurrentState("helpSupport");
  const handleLogout = () => setCurrentState("auth");

  const handleBack = () => {
    if (["route", "itinerary", "expense", "more", "explore", "summary", "stay"].includes(currentState)) {
      setCurrentState("home");
    } else if (["editProfile", "accountSettings", "tripHistory", "preferences", "settings", "helpSupport"].includes(currentState)) {
      setCurrentState("more");
    }
  };

  const handleTabChange = (tab: string) => {
    if (["splash", "onboarding", "auth"].includes(currentState)) return;
    setCurrentState(tab as AppState);
  };

  const showBottomNav = !["splash", "onboarding", "auth", "editProfile", "accountSettings", "tripHistory", "preferences", "settings", "helpSupport"].includes(currentState);
  
  const getActiveTab = () => {
    switch (currentState) {
      case "home": return "home";
      case "route": return "route";
      case "itinerary": return "itinerary";
      case "expense": return "expense";
      case "more": case "editProfile": case "accountSettings": case "tripHistory": case "preferences": case "settings": case "helpSupport": return "more";
      default: return "home";
    }
  };

  const renderContent = () => {
    switch (currentState) {
      case "splash": return <EnhancedSplashScreen onComplete={handleSplashComplete} />;
      case "onboarding": return <EnhancedOnboardingScreen onComplete={handleOnboardingComplete} />;
      case "auth": return <AuthScreen onComplete={handleAuthComplete} />;
      case "home": return <HomeScreen onCreateTrip={handleCreateTrip} onShowProfile={handleShowProfile} onShowExplore={handleShowExplore} />;
      case "route": return <RoutePlanningScreen onNext={() => setCurrentState("stay")} onBack={handleBack} tripData={tripData} />;
      case "itinerary": return <EnhancedItineraryBuilderScreen onNext={() => setCurrentState("expense")} onBack={handleBack} stayDays={2} />;
      case "expense": return <ExpenseTrackerScreen onNext={() => setCurrentState("summary")} onBack={handleBack} />;
      case "explore": return <EnhancedExploreNearbyScreen onBack={handleBack} />;
      case "summary": return <EnhancedTripSummaryScreen onBack={handleBack} onComplete={() => setCurrentState("home")} />;
      case "stay": return <EnhancedStayPlanningScreen onNext={() => setCurrentState("itinerary")} onBack={handleBack} />;
      case "more": return (
        <MoreScreen 
          onEditProfile={handleEditProfile}
          onAccountSettings={handleAccountSettings}
          onTripHistory={handleTripHistory}
          onPreferences={handlePreferences}
          onSettings={handleSettings}
          onHelpSupport={handleHelpSupport}
          onLogout={handleLogout}
          onExplore={() => setCurrentState("explore")}
          onSummary={() => setCurrentState("summary")}
          onStay={() => setCurrentState("stay")}
          onGroup={() => setCurrentState("expense")}
          onExport={() => setCurrentState("expense")}
        />
      );
      case "editProfile": return <EditProfileScreen onBack={handleBack} />;
      case "accountSettings": return <AccountSettingsScreen onBack={handleBack} />;
      case "tripHistory": return <EnhancedTripHistoryScreen onBack={handleBack} />;
      case "preferences": return <PreferencesScreen onBack={handleBack} />;
      case "settings": return <ExpenseSettingsScreen onBack={handleBack} />;
      case "helpSupport": return <HelpSupportScreen onBack={handleBack} />;
      default: return <HomeScreen onCreateTrip={handleCreateTrip} onShowProfile={handleShowProfile} onShowExplore={handleShowExplore} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className={showBottomNav ? "pb-20" : ""}>
        {renderContent()}
      </div>
      {showBottomNav && (
        <BottomNavigation 
          activeTab={getActiveTab()} 
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default AppRouter;