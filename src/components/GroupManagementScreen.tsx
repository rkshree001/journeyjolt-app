import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  Plus, 
  Users, 
  Settings,
  Trash2,
  UserPlus,
  DollarSign,
  Calendar
} from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar: string;
  email?: string;
}

interface Group {
  id: string;
  name: string;
  description?: string;
  currency: string;
  members: string[];
  createdAt: string;
  totalExpenses: number;
  settledAmount: number;
}

interface GroupManagementScreenProps {
  onBack: () => void;
  onSelectGroup: (groupId: string) => void;
  users: User[];
}

const CURRENCIES = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" }
];

const mockGroups: Group[] = [
  {
    id: "1",
    name: "Goa Trip 2024",
    description: "Beach vacation with college friends",
    currency: "INR",
    members: ["1", "2", "3", "4"],
    createdAt: "2024-12-10",
    totalExpenses: 15750,
    settledAmount: 8500
  },
  {
    id: "2", 
    name: "Flatmates",
    description: "Shared apartment expenses",
    currency: "INR",
    members: ["1", "2"],
    createdAt: "2024-11-01", 
    totalExpenses: 12000,
    settledAmount: 12000
  },
  {
    id: "3",
    name: "Project Team Lunch",
    description: "Weekly team lunches",
    currency: "INR",
    members: ["1", "2", "3"],
    createdAt: "2024-12-01",
    totalExpenses: 2400,
    settledAmount: 1200
  }
];

const GroupManagementScreen = ({ onBack, onSelectGroup, users }: GroupManagementScreenProps) => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    currency: "INR",
    members: ["1"] // Always include current user
  });

  const handleCreateGroup = () => {
    if (!newGroup.name.trim()) return;

    const group: Group = {
      id: Date.now().toString(),
      name: newGroup.name,
      description: newGroup.description,
      currency: newGroup.currency,
      members: newGroup.members,
      createdAt: new Date().toISOString(),
      totalExpenses: 0,
      settledAmount: 0
    };

    setGroups([group, ...groups]);
    setNewGroup({
      name: "",
      description: "",
      currency: "INR", 
      members: ["1"]
    });
    setShowCreateGroup(false);
  };

  const handleMemberToggle = (userId: string) => {
    if (userId === "1") return; // Can't remove current user
    
    setNewGroup(prev => ({
      ...prev,
      members: prev.members.includes(userId)
        ? prev.members.filter(id => id !== userId)
        : [...prev.members, userId]
    }));
  };

  const getCurrencySymbol = (currencyCode: string) => {
    return CURRENCIES.find(c => c.code === currencyCode)?.symbol || "₹";
  };

  if (showCreateGroup) {
    return (
      <div className="min-h-screen bg-gradient-card">
        {/* Header */}
        <div className="bg-gradient-hero px-6 pt-12 pb-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="glass" size="icon" onClick={() => setShowCreateGroup(false)}>
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">Create New Group</h1>
              <p className="text-white/80 text-sm">Set up expense sharing group</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Group Details */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-lg">Group Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Group name (e.g., Goa Trip 2024)"
                value={newGroup.name}
                onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
              />
              
              <Input
                placeholder="Description (optional)"
                value={newGroup.description}
                onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
              />

              <Select 
                value={newGroup.currency} 
                onValueChange={(value) => setNewGroup(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Add Members */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-lg">Add Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {users.map(user => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.avatar}
                      </div>
                      <div>
                        <span className="font-medium">{user.name}</span>
                        {user.id === "1" && (
                          <Badge variant="secondary" className="ml-2 text-xs">You</Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant={newGroup.members.includes(user.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleMemberToggle(user.id)}
                      disabled={user.id === "1"}
                    >
                      {newGroup.members.includes(user.id) ? "Added" : "Add"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create Button */}
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={handleCreateGroup}
            disabled={!newGroup.name.trim() || newGroup.members.length < 2}
          >
            <Users className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="glass" size="icon" onClick={onBack}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Groups</h1>
            <p className="text-white/80 text-sm">Manage expense sharing groups</p>
          </div>
          <Button variant="glass" onClick={() => setShowCreateGroup(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Group
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{groups.length}</p>
              <p className="text-sm text-muted-foreground">Total Groups</p>
            </CardContent>
          </Card>

          <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold">
                ₹{groups.reduce((sum, group) => sum + group.totalExpenses, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Groups List */}
      <div className="px-6 py-4 space-y-4">
        {groups.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No groups yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Create your first group to start splitting expenses
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setShowCreateGroup(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </CardContent>
          </Card>
        ) : (
          groups.map((group) => {
            const currency = getCurrencySymbol(group.currency);
            const pendingAmount = group.totalExpenses - group.settledAmount;
            const completionPercentage = group.totalExpenses > 0 
              ? Math.round((group.settledAmount / group.totalExpenses) * 100) 
              : 100;

            return (
              <Card 
                key={group.id} 
                className="shadow-soft cursor-pointer hover:shadow-medium transition-all"
                onClick={() => onSelectGroup(group.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{group.name}</h3>
                      {group.description && (
                        <p className="text-sm text-muted-foreground">{group.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {group.currency}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Expenses</p>
                      <p className="font-bold">{currency}{group.totalExpenses}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pending</p>
                      <p className="font-bold text-orange-600">{currency}{pendingAmount}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-muted-foreground">Settlement Progress</span>
                      <span className="text-xs font-medium">{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-hero h-2 rounded-full transition-all duration-300"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {group.members.length} members
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(group.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GroupManagementScreen;