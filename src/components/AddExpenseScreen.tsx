import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  Camera, 
  Users,
  Calculator,
  Percent,
  DollarSign,
  Hash,
  Upload,
  Repeat,
  X
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface SplitDetails {
  userId: string;
  amount?: number;
  percentage?: number;
  shares?: number;
}

interface AddExpenseScreenProps {
  onBack: () => void;
  onSave: (expense: any) => void;
  users: User[];
  groupCurrency?: string;
}

const CATEGORIES = [
  "Food & Dining",
  "Transportation", 
  "Accommodation",
  "Entertainment",
  "Shopping",
  "Utilities",
  "Medical",
  "Other"
];

const SPLIT_TYPES = [
  { value: "equally", label: "Split Equally", icon: <Users className="w-4 h-4" /> },
  { value: "percentage", label: "By Percentage", icon: <Percent className="w-4 h-4" /> },
  { value: "shares", label: "By Shares", icon: <Hash className="w-4 h-4" /> },
  { value: "exact", label: "Exact Amounts", icon: <Calculator className="w-4 h-4" /> }
];

const AddExpenseScreen = ({ onBack, onSave, users, groupCurrency = "INR" }: AddExpenseScreenProps) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [splitType, setSplitType] = useState("equally");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [splitDetails, setSplitDetails] = useState<SplitDetails[]>([]);
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("weekly");

  const handleUserSelection = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
      setSplitDetails([...splitDetails, { userId }]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
      setSplitDetails(splitDetails.filter(detail => detail.userId !== userId));
    }
  };

  const updateSplitDetail = (userId: string, field: keyof SplitDetails, value: number) => {
    setSplitDetails(prev => 
      prev.map(detail => 
        detail.userId === userId 
          ? { ...detail, [field]: value }
          : detail
      )
    );
  };

  const calculateSplit = () => {
    const totalAmount = parseFloat(amount) || 0;
    const numUsers = selectedUsers.length;

    switch (splitType) {
      case "equally":
        return selectedUsers.map(userId => ({
          userId,
          amount: totalAmount / numUsers
        }));
      
      case "percentage":
        const totalPercentage = splitDetails.reduce((sum, detail) => sum + (detail.percentage || 0), 0);
        if (Math.abs(totalPercentage - 100) > 0.01) {
          return null; // Invalid percentage split
        }
        return splitDetails.map(detail => ({
          userId: detail.userId,
          amount: (totalAmount * (detail.percentage || 0)) / 100
        }));
      
      case "shares":
        const totalShares = splitDetails.reduce((sum, detail) => sum + (detail.shares || 1), 0);
        return splitDetails.map(detail => ({
          userId: detail.userId,
          amount: (totalAmount * (detail.shares || 1)) / totalShares
        }));
      
      case "exact":
        const totalExact = splitDetails.reduce((sum, detail) => sum + (detail.amount || 0), 0);
        if (Math.abs(totalExact - totalAmount) > 0.01) {
          return null; // Amounts don't match total
        }
        return splitDetails.map(detail => ({
          userId: detail.userId,
          amount: detail.amount || 0
        }));
      
      default:
        return null;
    }
  };

  const handleSave = () => {
    const split = calculateSplit();
    if (!split || !title || !amount || !paidBy || selectedUsers.length === 0) {
      return;
    }

    const expense = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      paidBy,
      date: date.toISOString(),
      category,
      notes,
      splitType,
      splitDetails: split,
      participants: selectedUsers
    };

    onSave(expense);
  };

  const split = calculateSplit();
  const isValid = split && title && amount && paidBy && selectedUsers.length > 0;

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="glass" size="icon" onClick={onBack}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Add Expense</h1>
            <p className="text-white/80 text-sm">Split costs with friends</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 space-y-6">
        {/* Basic Details */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">Expense Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Expense title (e.g., Dinner at Pizza Hut)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder={`Amount (${groupCurrency === "INR" ? "₹" : groupCurrency})`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select value={paidBy} onValueChange={setPaidBy}>
              <SelectTrigger>
                <SelectValue placeholder="Paid by" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <Textarea
              placeholder="Add notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />

            <div className="space-y-3">
              <Button variant="outline" className="w-full" onClick={() => {
                // In a real app, this would open the camera/gallery
                const photoId = Date.now().toString();
                setAttachedPhotos([...attachedPhotos, photoId]);
              }}>
                <Camera className="w-4 h-4 mr-2" />
                Add Photo (Optional)
              </Button>

              {attachedPhotos.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Attached Photos:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {attachedPhotos.map((photoId, index) => (
                      <div key={photoId} className="relative">
                        <div className="w-full h-16 bg-gradient-hero/20 rounded border flex items-center justify-center">
                          <Camera className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs ml-1">Photo {index + 1}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full"
                          onClick={() => setAttachedPhotos(photos => photos.filter(id => id !== photoId))}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Recurring Expense</p>
                  <p className="text-xs text-muted-foreground">Set up automatic recurring</p>
                </div>
                <Switch
                  checked={isRecurring}
                  onCheckedChange={setIsRecurring}
                />
              </div>

              {isRecurring && (
                <Select value={recurringFrequency} onValueChange={setRecurringFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Split Among */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">Split Among</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {users.map(user => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => handleUserSelection(user.id, !!checked)}
                  />
                  <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.avatar}
                  </div>
                  <span className="flex-1">{user.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Split Type */}
        {selectedUsers.length > 0 && (
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-lg">Split Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {SPLIT_TYPES.map(type => (
                  <Button
                    key={type.value}
                    variant={splitType === type.value ? "default" : "outline"}
                    onClick={() => setSplitType(type.value)}
                    className="justify-start"
                  >
                    {type.icon}
                    <span className="ml-2">{type.label}</span>
                  </Button>
                ))}
              </div>

              <Separator />

              {/* Split Details Input */}
              {splitType !== "equally" && (
                <div className="space-y-3">
                  {selectedUsers.map(userId => {
                    const user = users.find(u => u.id === userId);
                    const detail = splitDetails.find(d => d.userId === userId);
                    
                    return (
                      <div key={userId} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {user?.avatar}
                        </div>
                        <span className="flex-1">{user?.name}</span>
                        <div className="w-24">
                          <Input
                            type="number"
                            placeholder={
                              splitType === "percentage" ? "%" :
                              splitType === "shares" ? "shares" : 
                              (groupCurrency === "INR" ? "₹" : groupCurrency)
                            }
                            value={
                              splitType === "percentage" ? detail?.percentage || "" :
                              splitType === "shares" ? detail?.shares || "" :
                              detail?.amount || ""
                            }
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              const field = splitType === "percentage" ? "percentage" :
                                          splitType === "shares" ? "shares" : "amount";
                              updateSplitDetail(userId, field, value);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  
                  {splitType === "percentage" && (
                    <div className="text-sm text-muted-foreground">
                      Total: {splitDetails.reduce((sum, detail) => sum + (detail.percentage || 0), 0)}%
                    </div>
                  )}
                  
                  {splitType === "exact" && (
                    <div className="text-sm text-muted-foreground">
                      Total: {groupCurrency === "INR" ? "₹" : groupCurrency}{splitDetails.reduce((sum, detail) => sum + (detail.amount || 0), 0)} / {groupCurrency === "INR" ? "₹" : groupCurrency}{amount}
                    </div>
                  )}
                </div>
              )}

              {/* Preview Split */}
              {split && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Split Preview:</h4>
                  <div className="space-y-2">
                    {split.map(item => {
                      const user = users.find(u => u.id === item.userId);
                      return (
                        <div key={item.userId} className="flex justify-between text-sm">
                          <span>{user?.name}</span>
                          <span>{groupCurrency === "INR" ? "₹" : groupCurrency}{item.amount.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={handleSave}
          disabled={!isValid}
        >
          {isRecurring ? (
            <>
              <Repeat className="w-4 h-4 mr-2" />
              Create Recurring Expense
            </>
          ) : (
            "Add Expense"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddExpenseScreen;