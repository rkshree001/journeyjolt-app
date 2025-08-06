import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  ChevronLeft, 
  Download, 
  FileText, 
  Share2,
  Calendar as CalendarIcon,
  Filter,
  Check
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  date: string;
  category: string;
  notes?: string;
  splitType: "equally" | "percentage" | "shares" | "exact";
  splitDetails: { userId: string; amount: number }[];
  participants: string[];
}

interface ExportReportScreenProps {
  onBack: () => void;
  expenses: Expense[];
  users: User[];
}

interface ExportSettings {
  format: "pdf" | "excel" | "csv";
  dateRange: "all" | "custom" | "lastMonth" | "lastWeek";
  startDate?: Date;
  endDate?: Date;
  includedSections: {
    expenseList: boolean;
    categoryBreakdown: boolean;
    userBalances: boolean;
    settlements: boolean;
    summary: boolean;
  };
  groupBy: "date" | "category" | "paidBy";
  includeNotes: boolean;
  selectedUsers: string[];
}

const ExportReportScreen = ({ onBack, expenses, users }: ExportReportScreenProps) => {
  const [settings, setSettings] = useState<ExportSettings>({
    format: "pdf",
    dateRange: "all",
    includedSections: {
      expenseList: true,
      categoryBreakdown: true,
      userBalances: true,
      settlements: true,
      summary: true
    },
    groupBy: "date",
    includeNotes: true,
    selectedUsers: users.map(u => u.id)
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleSectionToggle = (section: keyof typeof settings.includedSections) => {
    setSettings(prev => ({
      ...prev,
      includedSections: {
        ...prev.includedSections,
        [section]: !prev.includedSections[section]
      }
    }));
  };

  const handleUserToggle = (userId: string) => {
    setSettings(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.includes(userId)
        ? prev.selectedUsers.filter(id => id !== userId)
        : [...prev.selectedUsers, userId]
    }));
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    setGenerated(true);
    
    // In a real app, this would generate and download the actual file
    const fileName = `expense-report-${format(new Date(), 'yyyy-MM-dd')}.${settings.format}`;
    console.log(`Generated report: ${fileName}`);
  };

  const handleShare = () => {
    // In a real app, this would open the share sheet
    if (navigator.share) {
      navigator.share({
        title: 'Expense Report',
        text: 'Check out our expense report',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const getFilteredExpensesCount = () => {
    let filtered = expenses.filter(expense => 
      settings.selectedUsers.some(userId => 
        expense.paidBy === userId || expense.participants.includes(userId)
      )
    );

    if (settings.dateRange === "custom" && settings.startDate && settings.endDate) {
      filtered = filtered.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= settings.startDate! && expenseDate <= settings.endDate!;
      });
    } else if (settings.dateRange === "lastMonth") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      filtered = filtered.filter(expense => new Date(expense.date) >= lastMonth);
    } else if (settings.dateRange === "lastWeek") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      filtered = filtered.filter(expense => new Date(expense.date) >= lastWeek);
    }

    return filtered.length;
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="glass" size="icon" onClick={onBack}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Export Report</h1>
            <p className="text-white/80 text-sm">Generate detailed expense reports</p>
          </div>
        </div>

        {/* Preview Stats */}
        <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <FileText className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold">{getFilteredExpensesCount()}</p>
                <p className="text-xs text-muted-foreground">Expenses</p>
              </div>
              <div>
                <Filter className="w-6 h-6 text-secondary mx-auto mb-1" />
                <p className="text-lg font-bold">{settings.selectedUsers.length}</p>
                <p className="text-xs text-muted-foreground">Users</p>
              </div>
              <div>
                <Download className="w-6 h-6 text-accent mx-auto mb-1" />
                <p className="text-lg font-bold">{settings.format.toUpperCase()}</p>
                <p className="text-xs text-muted-foreground">Format</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-6 py-4 space-y-6">
        {/* Export Format */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">Export Format</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={settings.format} 
              onValueChange={(value: "pdf" | "excel" | "csv") => 
                setSettings(prev => ({ ...prev, format: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf">PDF - Formatted report with charts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel">Excel - Spreadsheet with data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv">CSV - Raw data for analysis</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Date Range */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">Date Range</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={settings.dateRange} 
              onValueChange={(value: "all" | "custom" | "lastMonth" | "lastWeek") => 
                setSettings(prev => ({ ...prev, dateRange: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All expenses</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lastWeek" id="lastWeek" />
                <Label htmlFor="lastWeek">Last 7 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lastMonth" id="lastMonth" />
                <Label htmlFor="lastMonth">Last 30 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom range</Label>
              </div>
            </RadioGroup>

            {settings.dateRange === "custom" && (
              <div className="grid grid-cols-2 gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {settings.startDate ? format(settings.startDate, "PPP") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={settings.startDate}
                      onSelect={(date) => setSettings(prev => ({ ...prev, startDate: date }))}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {settings.endDate ? format(settings.endDate, "PPP") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={settings.endDate}
                      onSelect={(date) => setSettings(prev => ({ ...prev, endDate: date }))}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Report Sections */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">Include Sections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(settings.includedSections).map(([key, checked]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={checked}
                  onCheckedChange={() => handleSectionToggle(key as keyof typeof settings.includedSections)}
                />
                <Label htmlFor={key} className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
              </div>
            ))}
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeNotes"
                checked={settings.includeNotes}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeNotes: !!checked }))}
              />
              <Label htmlFor="includeNotes">Include notes and descriptions</Label>
            </div>
          </CardContent>
        </Card>

        {/* Group By */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">Group Expenses By</CardTitle>
          </CardHeader>
          <CardContent>
            <Select 
              value={settings.groupBy} 
              onValueChange={(value: "date" | "category" | "paidBy") => 
                setSettings(prev => ({ ...prev, groupBy: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="paidBy">Person who paid</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Filter Users */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">Include Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {users.map(user => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.avatar}
                  </div>
                  <span>{user.name}</span>
                </div>
                <Checkbox
                  checked={settings.selectedUsers.includes(user.id)}
                  onCheckedChange={() => handleUserToggle(user.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Generate Report */}
        <div className="space-y-3">
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={handleGenerateReport}
            disabled={isGenerating || settings.selectedUsers.length === 0}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating Report...
              </>
            ) : generated ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Report Generated
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>

          {generated && (
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleGenerateReport}>
                <Download className="w-4 h-4 mr-2" />
                Download Again
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Report
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportReportScreen;