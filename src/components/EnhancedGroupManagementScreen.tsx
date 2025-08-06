import { useState } from "react";
import { ArrowLeft, Plus, UserPlus, Send, Copy, MessageCircle, Phone, Mail, Share2, Users, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface GroupManagementScreenProps {
  onBack: () => void;
  onSelectGroup: (groupId: string) => void;
  users: Array<{ id: string; name: string; avatar: string }>;
}

interface Member {
  id: string;
  name: string;
  mobile: string;
  email: string;
  age: number;
  avatar?: string;
  status: 'pending' | 'active' | 'declined';
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: Member[];
  createdAt: string;
  currency: string;
}

const GroupManagementScreen = ({ onBack, onSelectGroup, users }: GroupManagementScreenProps) => {
  const { toast } = useToast();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    currency: "USD"
  });

  const [newMember, setNewMember] = useState({
    name: "",
    mobile: "",
    email: "",
    age: ""
  });

  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Goa Trip 2024",
      description: "Beach vacation with friends",
      members: [
        { id: "1", name: "John Doe", mobile: "+1234567890", email: "john@example.com", age: 28, status: "active" },
        { id: "2", name: "Alice Smith", mobile: "+1234567891", email: "alice@example.com", age: 26, status: "active" },
        { id: "3", name: "Bob Wilson", mobile: "+1234567892", email: "bob@example.com", age: 30, status: "pending" }
      ],
      createdAt: "2024-01-15",
      currency: "INR"
    },
    {
      id: "2", 
      name: "Office Lunch",
      description: "Weekly team lunch expenses",
      members: [
        { id: "1", name: "John Doe", mobile: "+1234567890", email: "john@example.com", age: 28, status: "active" },
        { id: "4", name: "Sarah Johnson", mobile: "+1234567893", email: "sarah@example.com", age: 32, status: "active" }
      ],
      createdAt: "2024-01-10",
      currency: "USD"
    }
  ]);

  const handleCreateGroup = () => {
    if (!newGroup.name.trim()) {
      toast({
        title: "Error",
        description: "Group name is required",
        variant: "destructive"
      });
      return;
    }

    const group: Group = {
      id: Date.now().toString(),
      name: newGroup.name,
      description: newGroup.description,
      members: [
        { 
          id: "1", 
          name: "You", 
          mobile: "+1234567890", 
          email: "you@example.com", 
          age: 25, 
          status: "active" 
        }
      ],
      createdAt: new Date().toISOString().split('T')[0],
      currency: newGroup.currency
    };

    setGroups([...groups, group]);
    setNewGroup({ name: "", description: "", currency: "USD" });
    setShowCreateGroup(false);
    
    toast({
      title: "Group created",
      description: `${group.name} has been created successfully`,
    });
  };

  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.mobile.trim() || !newMember.email.trim()) {
      toast({
        title: "Error", 
        description: "Name, mobile, and email are required",
        variant: "destructive"
      });
      return;
    }

    if (!selectedGroupId) return;

    const member: Member = {
      id: Date.now().toString(),
      name: newMember.name,
      mobile: newMember.mobile,
      email: newMember.email,
      age: parseInt(newMember.age) || 0,
      status: "pending"
    };

    setGroups(groups.map(group => 
      group.id === selectedGroupId 
        ? { ...group, members: [...group.members, member] }
        : group
    ));

    setNewMember({ name: "", mobile: "", email: "", age: "" });
    setShowAddMember(false);
    
    toast({
      title: "Member added",
      description: `${member.name} has been added to the group`,
    });
  };

  const handleSendInvite = async (member: Member, method: 'whatsapp' | 'sms' | 'email' | 'share') => {
    const inviteLink = `https://journeyjolt.app/invite/${selectedGroupId}?member=${member.id}`;
    const groupName = groups.find(g => g.id === selectedGroupId)?.name || "Group";
    const message = `Hi ${member.name}! You've been invited to join "${groupName}" on JourneyJolt. Click here to join: ${inviteLink}`;

    try {
      switch (method) {
        case 'whatsapp':
          const whatsappUrl = `https://wa.me/${member.mobile.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
          break;
          
        case 'sms':
          const smsUrl = `sms:${member.mobile}?body=${encodeURIComponent(message)}`;
          window.open(smsUrl, '_blank');
          break;
          
        case 'email':
          const emailUrl = `mailto:${member.email}?subject=${encodeURIComponent(`Invitation to join ${groupName}`)}&body=${encodeURIComponent(message)}`;
          window.open(emailUrl, '_blank');
          break;
          
        case 'share':
          if (navigator.share) {
            await navigator.share({
              title: `Join ${groupName}`,
              text: message,
              url: inviteLink
            });
          } else {
            // Fallback to clipboard
            await navigator.clipboard.writeText(message);
            toast({
              title: "Copied to clipboard",
              description: "Invitation link copied to clipboard",
            });
          }
          break;
      }
      
      toast({
        title: "Invite sent",
        description: `Invitation sent to ${member.name} via ${method}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800">Declined</Badge>;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Group Management</h1>
            <p className="text-sm text-muted-foreground">Manage your expense groups</p>
          </div>
        </div>
        
        <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name *</Label>
                <Input
                  id="groupName"
                  placeholder="e.g., Goa Trip 2024"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groupDescription">Description</Label>
                <Textarea
                  id="groupDescription"
                  placeholder="Brief description of the group"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Default Currency</Label>
                <Select value={newGroup.currency} onValueChange={(value) => setNewGroup({ ...newGroup, currency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateGroup(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGroup}>
                Create Group
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {groups.map((group) => (
          <Card key={group.id} className="hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Created: {new Date(group.createdAt).toLocaleDateString()}</span>
                    <span>Currency: {group.currency}</span>
                    <span>{group.members.length} members</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectGroup(group.id)}
                >
                  Select
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Members List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Members</h4>
                  <Dialog open={showAddMember && selectedGroupId === group.id} onOpenChange={(open) => {
                    setShowAddMember(open);
                    if (open) setSelectedGroupId(group.id);
                  }}>
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
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddMember(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddMember}>
                          Add Member
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {group.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-gradient-hero text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{member.name}</p>
                          {getStatusBadge(member.status)}
                        </div>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground">{member.mobile}</p>
                      </div>
                    </div>
                    
                    {member.status === 'pending' && (
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendInvite(member, 'whatsapp')}
                          className="h-8 w-8 p-0"
                        >
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendInvite(member, 'sms')}
                          className="h-8 w-8 p-0"
                        >
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendInvite(member, 'email')}
                          className="h-8 w-8 p-0"
                        >
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendInvite(member, 'share')}
                          className="h-8 w-8 p-0"
                        >
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {groups.length === 0 && (
          <div className="text-center py-16">
            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No groups yet</h3>
            <p className="text-muted-foreground mb-6">Create your first group to start tracking shared expenses</p>
            <Button onClick={() => setShowCreateGroup(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Group
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupManagementScreen;