import { useState } from "react";
import { 
  Home, 
  Map, 
  Bed, 
  Calendar, 
  Calculator, 
  FileText, 
  User, 
  Compass 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "route", label: "Route", icon: Map },
  { id: "itinerary", label: "Plan", icon: Calendar },
  { id: "expense", label: "Expenses", icon: Calculator },
  { id: "more", label: "More", icon: User }
];

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-border shadow-strong z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px]",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn("w-5 h-5 mb-1", isActive && "scale-110")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;