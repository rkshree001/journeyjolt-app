import { useState } from "react";
import { ArrowLeft, Plus, Camera, Calendar, Repeat, Calculator, UserPlus, Share2, MessageCircle, Mail, Phone, Users, Percent, Hash, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface EnhancedAddExpenseScreenProps {
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

const EnhancedAddExpenseScreen = ({ onBack, onSave, users, groupCurrency = "INR" }: EnhancedAddExpenseScreenProps) => {
  const { toast } = useToast();
  const [showAddMember, setShowAddMember] = useState(false);
  const [availableUsers, setAvailableUsers] = useState(users);
  
  const [newMember, setNewMember] = useState({
    name: "",
    mobile: "",
    email: "", 
    age: ""
  });

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    paidBy: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    notes: "",
    splitType: "equally",
    participants: [] as string[],
    isRecurring: false,
    recurringFrequency: "weekly"
  });

  const [splitDetails, setSplitDetails] = useState<{ [key: string]: number }>({});

  const handleAddNewMember = async () => {
    if (!newMember.name.trim() || !newMember.mobile.trim() || !newMember.email.trim()) {
      toast({
        title: "Error",
        description: "Name, mobile, and email are required",
        variant: "destructive"
      });
      return;
    }

    const member = {
      id: Date.now().toString(),
      name: newMember.name,
      avatar: newMember.name.split(' ').map(n => n[0]).join('').toUpperCase()
    };

    setAvailableUsers([...availableUsers, member]);
    setNewMember({ name: "", mobile: "", email: "", age: "" });
    setShowAddMember(false);

    toast({
      title: "Member added",
      description: `${member.name} has been added to the group`,
    });
  };

  const handleSendInvite = async (method: 'whatsapp' | 'sms' | 'email' | 'share') => {
    const inviteLink = `https://journeyjolt.app/invite/expense?member=${Date.now()}`;
    const message = `Hi ${newMember.name}! You've been invited to share expenses on JourneyJolt. Join here: ${inviteLink}`;

    try {
      switch (method) {
        case 'whatsapp':
          window.open(`https://wa.me/${newMember.mobile.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
          break;
        case 'sms':
          window.open(`sms:${newMember.mobile}?body=${encodeURIComponent(message)}`, '_blank');
          break;
        case 'email':
          window.open(`mailto:${newMember.email}?subject=Expense Sharing Invitation&body=${encodeURIComponent(message)}`, '_blank');
          break;
        case 'share':
          if (navigator.share) {
            await navigator.share({ title: 'Join Expense Group', text: message, url: inviteLink });
          } else {
            await navigator.clipboard.writeText(message);
            toast({ title: "Copied to clipboard", description: "Invitation link copied" });
          }
          break;
      }
      
      toast({
        title: "Invite sent",
        description: `Invitation sent via ${method}`,
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to send invitation", variant: "destructive" });
    }
  };

  const handleParticipantToggle = (userId: string) => {
    const isSelected = expense.participants.includes(userId);
    const newParticipants = isSelected 
      ? expense.participants.filter(id => id !== userId)
      : [...expense.participants, userId];
    
    setExpense({ ...expense, participants: newParticipants });
  };

  const calculateSplits = () => {
    const totalAmount = parseFloat(expense.amount) || 0;
    const participants = expense.participants;
    
    if (participants.length === 0) return {};

    switch (expense.splitType) {
      case "equally":
        const equalAmount = totalAmount / participants.length;
        return participants.reduce((acc, userId) => ({ ...acc, [userId]: equalAmount }), {});
      
      case "percentage":
        return splitDetails;
      
      case "shares":
        const totalShares = Object.values(splitDetails).reduce((sum, shares) => sum + shares, 0);
        return participants.reduce((acc, userId) => {
          const shares = splitDetails[userId] || 1;
          return { ...acc, [userId]: (shares / totalShares) * totalAmount };
        }, {});
      
      case "exact":
        return splitDetails;
      
      default:
        return {};
    }
  };

  const handleSave = () => {
    if (!expense.title || !expense.amount || !expense.paidBy || expense.participants.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const splits = calculateSplits();
    const expenseData = {
      ...expense,
      amount: parseFloat(expense.amount),
      splitDetails: Object.entries(splits).map(([userId, amount]) => ({
        userId,
        amount: amount as number
      }))
    };

    onSave(expenseData);
    toast({
      title: "Expense added",
      description: "Your expense has been saved successfully",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border bg-card">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-foreground">Add Expense</h1>
          <p className="text-sm text-muted-foreground">Split costs with your group</p>
        </div>
        <Button onClick={handleSave}>
          Save Expense
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Basic Details */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Dinner at Pizza Hut"
                value={expense.title}
                onChange={(e) => setExpense({ ...expense, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder={`Amount (${groupCurrency})`}
                  value={expense.amount}
                  onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={expense.category} onValueChange={(value) => setExpense({ ...expense, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paidBy">Paid By *</Label>
              <Select value={expense.paidBy} onValueChange={(value) => setExpense({ ...expense, paidBy: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Who paid?" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map(user => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={expense.date}
                onChange={(e) => setExpense({ ...expense, date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes..."
                value={expense.notes}
                onChange={(e) => setExpense({ ...expense, notes: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Participants */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Split Among</CardTitle>
              <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-3 w-3 mr-1" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="memberName">Full Name *</Label>
                      <Input
                        id="memberName"
                        placeholder="Enter full name"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="memberMobile">Mobile Number *</Label>
                      <Input
                        id="memberMobile"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={newMember.mobile}
                        onChange={(e) => setNewMember({ ...newMember, mobile: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="memberEmail">Email Address *</Label>
                      <Input
                        id="memberEmail"
                        type="email"
                        placeholder="email@example.com"
                        value={newMember.email}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="memberAge">Age</Label>
                      <Input
                        id="memberAge"
                        type="number"
                        placeholder="25"
                        value={newMember.age}
                        onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                      />
                    </div>

                    {/* Invite Options */}
                    {newMember.name && newMember.mobile && newMember.email && (
                      <div className="space-y-2">
                        <Label>Send Invitation Via:</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendInvite('whatsapp')}
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            WhatsApp
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendInvite('sms')}
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            SMS
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendInvite('email')}
                          >
                            <Mail className="h-3 w-3 mr-1" />
                            Email
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendInvite('share')}
                          >
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddMember(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddNewMember}>
                      Add Member
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3">
                <Checkbox
                  id={user.id}
                  checked={expense.participants.includes(user.id)}
                  onCheckedChange={() => handleParticipantToggle(user.id)}
                />
                <Label htmlFor={user.id} className="flex items-center gap-3 flex-1 cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xs bg-gradient-hero text-white">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{user.name}</span>
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Split Type */}
        <Card>
          <CardHeader>
            <CardTitle>Split Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {SPLIT_TYPES.map((type) => (
                <Button
                  key={type.value}
                  variant={expense.splitType === type.value ? "default" : "outline"}
                  onClick={() => setExpense({ ...expense, splitType: type.value })}
                  className="flex items-center gap-2 h-auto p-3"
                >
                  {type.icon}
                  <span className="text-xs">{type.label}</span>
                </Button>
              ))}
            </div>

            {/* Split Details */}
            {expense.splitType !== "equally" && expense.participants.length > 0 && (
              <div className="space-y-3">
                <Label>Split Details</Label>
                {expense.participants.map((userId) => {
                  const user = availableUsers.find(u => u.id === userId);
                  return (
                    <div key={userId} className="flex items-center gap-3">
                      <span className="text-sm w-20">{user?.name}</span>
                      <Input
                        type="number"
                        placeholder={
                          expense.splitType === "percentage" ? "%" :
                          expense.splitType === "shares" ? "shares" : 
                          groupCurrency
                        }
                        value={splitDetails[userId] || ""}
                        onChange={(e) => setSplitDetails({
                          ...splitDetails,
                          [userId]: parseFloat(e.target.value) || 0
                        })}
                        className="flex-1"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Options */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Recurring Expense</Label>
                <p className="text-sm text-muted-foreground">
                  Repeat this expense automatically
                </p>
              </div>
              <Switch
                checked={expense.isRecurring}
                onCheckedChange={(checked) => setExpense({ ...expense, isRecurring: checked })}
              />
            </div>

            {expense.isRecurring && (
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select 
                  value={expense.recurringFrequency} 
                  onValueChange={(value) => setExpense({ ...expense, recurringFrequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button variant="outline" className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              Add Receipt Photo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAddExpenseScreen;