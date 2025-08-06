import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  Filter,
  X,
  Users,
  Tag,
  CalendarDays
} from "lucide-react";
import { format } from "date-fns";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface FilterState {
  users: string[];
  categories: string[];
  startDate?: Date;
  endDate?: Date;
  amountRange?: {
    min: number;
    max: number;
  };
}

interface ExpenseFilterScreenProps {
  onBack: () => void;
  onApplyFilters: (filters: FilterState) => void;
  users: User[];
  categories: string[];
  currentFilters: FilterState;
}

const ExpenseFilterScreen = ({ 
  onBack, 
  onApplyFilters, 
  users, 
  categories, 
  currentFilters 
}: ExpenseFilterScreenProps) => {
  const [filters, setFilters] = useState<FilterState>(currentFilters);
  const [isSelectingDateRange, setIsSelectingDateRange] = useState(false);

  const handleUserToggle = (userId: string) => {
    setFilters(prev => ({
      ...prev,
      users: prev.users.includes(userId)
        ? prev.users.filter(id => id !== userId)
        : [...prev.users, userId]
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(cat => cat !== category)
        : [...prev.categories, category]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      users: [],
      categories: [],
      startDate: undefined,
      endDate: undefined,
      amountRange: undefined
    });
  };

  const activeFiltersCount = 
    filters.users.length + 
    filters.categories.length + 
    (filters.startDate ? 1 : 0) + 
    (filters.endDate ? 1 : 0) +
    (filters.amountRange ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="glass" size="icon" onClick={onBack}>
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">Filter Expenses</h1>
              <p className="text-white/80 text-sm">
                {activeFiltersCount > 0 ? `${activeFiltersCount} filters active` : "No filters applied"}
              </p>
            </div>
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="glass" size="sm" onClick={clearAllFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="px-6 py-4 space-y-6">
        {/* People Filter */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Filter by People
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {users.map(user => (
              <div key={user.id} className="flex items-center space-x-3">
                <Checkbox
                  checked={filters.users.includes(user.id)}
                  onCheckedChange={() => handleUserToggle(user.id)}
                />
                <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.avatar}
                </div>
                <span className="flex-1">{user.name}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Category Filter */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Filter by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <span className="text-sm">{category}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Date Range Filter */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Filter by Date Range
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {filters.startDate ? format(filters.startDate, "MMM d") : "Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.startDate}
                    onSelect={(date) => setFilters(prev => ({ ...prev, startDate: date }))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {filters.endDate ? format(filters.endDate, "MMM d") : "End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.endDate}
                    onSelect={(date) => setFilters(prev => ({ ...prev, endDate: date }))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {(filters.startDate || filters.endDate) && (
              <div className="flex gap-2">
                {filters.startDate && (
                  <Badge variant="secondary">
                    From: {format(filters.startDate, "MMM d, yyyy")}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => setFilters(prev => ({ ...prev, startDate: undefined }))}
                    />
                  </Badge>
                )}
                {filters.endDate && (
                  <Badge variant="secondary">
                    To: {format(filters.endDate, "MMM d, yyyy")}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => setFilters(prev => ({ ...prev, endDate: undefined }))}
                    />
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Date Filters */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Quick Date Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  const today = new Date();
                  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                  setFilters(prev => ({ ...prev, startDate: lastWeek, endDate: today }));
                }}
              >
                Last 7 days
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const today = new Date();
                  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                  setFilters(prev => ({ ...prev, startDate: lastMonth, endDate: today }));
                }}
              >
                Last month
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const today = new Date();
                  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                  setFilters(prev => ({ ...prev, startDate: startOfMonth, endDate: today }));
                }}
              >
                This month
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const today = new Date();
                  const startOfYear = new Date(today.getFullYear(), 0, 1);
                  setFilters(prev => ({ ...prev, startDate: startOfYear, endDate: today }));
                }}
              >
                This year
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Active Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {filters.users.map(userId => {
                  const user = users.find(u => u.id === userId);
                  return (
                    <Badge key={userId} variant="secondary">
                      {user?.name}
                      <X 
                        className="w-3 h-3 ml-1 cursor-pointer" 
                        onClick={() => handleUserToggle(userId)}
                      />
                    </Badge>
                  );
                })}
                {filters.categories.map(category => (
                  <Badge key={category} variant="secondary">
                    {category}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => handleCategoryToggle(category)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Apply Filters Button */}
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={() => onApplyFilters(filters)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default ExpenseFilterScreen;