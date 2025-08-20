import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  DollarSign, 
  Calculator,
  Receipt,
  Utensils,
  Car,
  Bed,
  Camera,
  ChevronLeft,
  Filter,
  Download,
  Share2,
  CheckCircle,
  AlertCircle,
  Users,
  Settings
} from "lucide-react";
import AddExpenseScreen from "./AddExpenseScreen";
import EnhancedAddExpenseScreen from "./EnhancedAddExpenseScreen";
import ExpenseFilterScreen from "./ExpenseFilterScreen";
import GroupManagementScreen from "./GroupManagementScreen";
import ExportReportScreen from "./ExportReportScreen";
import ExpenseSettingsScreen from "./ExpenseSettingsScreen";
import EnhancedGroupManagementScreen from "./EnhancedGroupManagementScreen";
import { 
  calculateUserBalances, 
  calculateSettlements, 
  getExpensesByUser,
  getExpensesByCategory,
  getExpensesByDateRange,
  getExpenseSummary
} from "@/utils/expenseCalculations";
import { mockExpenses, mockUsers, getCurrentUser } from "@/data";

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

interface FilterState {
  users: string[];
  categories: string[];
  startDate?: Date;
  endDate?: Date;
}

interface ExpenseTrackerScreenProps {
  onNext: () => void;
  onBack: () => void;
}

// Convert mock data to component format
const convertUsersToComponentFormat = () => {
  return mockUsers.map(user => ({
    id: user.id,
    name: user.name,
    avatar: user.name.split(' ').map(n => n[0]).join('').toUpperCase()
  }));
};

const convertExpensesToComponentFormat = () => {
  return mockExpenses.map(expense => ({
    id: expense.id,
    title: expense.title,
    amount: expense.amount,
    paidBy: expense.paidBy,
    date: expense.date,
    category: expense.category,
    notes: expense.description,
    splitType: "equally" as const,
    splitDetails: expense.splitBetween.map(userId => ({
      userId,
      amount: expense.amount / expense.splitBetween.length
    })),
    participants: expense.splitBetween
  }));
};

const componentUsers = convertUsersToComponentFormat();
const componentExpenses = convertExpensesToComponentFormat();

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

const categoryIcons = {
  "Food": <Utensils className="w-4 h-4" />,
  "Travel": <Car className="w-4 h-4" />,
  "Room": <Bed className="w-4 h-4" />,
  "Activity": <Camera className="w-4 h-4" />
};

const ExpenseTrackerScreen = ({ onNext, onBack }: ExpenseTrackerScreenProps) => {
  const [expenses, setExpenses] = useState<Expense[]>(componentExpenses);
  const [currentScreen, setCurrentScreen] = useState<"main" | "add" | "filter" | "groups" | "export" | "settings">("main");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    users: [],
    categories: [],
    startDate: undefined,
    endDate: undefined
  });
  const [settledExpenses, setSettledExpenses] = useState<Set<string>>(new Set());

  // Apply filters to expenses
  const filteredExpenses = expenses.filter(expense => {
    if (filters.users.length > 0) {
      const hasUser = filters.users.some(userId => 
        expense.paidBy === userId || expense.participants.includes(userId)
      );
      if (!hasUser) return false;
    }

    if (filters.categories.length > 0) {
      if (!filters.categories.includes(expense.category)) return false;
    }

    if (filters.startDate) {
      const expenseDate = new Date(expense.date);
      if (expenseDate < filters.startDate) return false;
    }

    if (filters.endDate) {
      const expenseDate = new Date(expense.date);
      if (expenseDate > filters.endDate) return false;
    }

    return true;
  });

  const balances = calculateUserBalances(filteredExpenses, componentUsers);
  const settlements = calculateSettlements(balances, componentUsers);
  const summary = getExpenseSummary(filteredExpenses);

  const handleAddExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
    setCurrentScreen("main");
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentScreen("main");
  };

  const markAsSettled = (fromUserId: string, toUserId: string) => {
    const settlementKey = `${fromUserId}-${toUserId}`;
    setSettledExpenses(prev => new Set([...prev, settlementKey]));
  };

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    setCurrentScreen("main");
  };

  if (currentScreen === "add") {
    return (
      <EnhancedAddExpenseScreen
        onBack={() => setCurrentScreen("main")}
        onSave={handleAddExpense}
        users={componentUsers}
        groupCurrency="USD"
      />
    );
  }

  if (currentScreen === "filter") {
    return (
      <ExpenseFilterScreen
        onBack={() => setCurrentScreen("main")}
        onApplyFilters={handleApplyFilters}
        users={componentUsers}
        categories={CATEGORIES}
        currentFilters={filters}
      />
    );
  }

  if (currentScreen === "groups") {
    return (
      <EnhancedGroupManagementScreen
        onBack={() => setCurrentScreen("main")}
        onSelectGroup={handleSelectGroup}
        users={mockUsers}
      />
    );
  }

  if (currentScreen === "export") {
    return (
      <ExportReportScreen
        onBack={() => setCurrentScreen("main")}
        expenses={filteredExpenses}
        users={mockUsers}
      />
    );
  }

  if (currentScreen === "settings") {
    return (
      <ExpenseSettingsScreen
        onBack={() => setCurrentScreen("main")}
      />
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
            <h1 className="text-xl font-bold text-white">Expense Split Tracker</h1>
            <p className="text-white/80 text-sm">
              {selectedGroupId ? "Group: Goa Trip 2024" : "Split costs with friends"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="glass" size="icon" onClick={() => setCurrentScreen("groups")}>
              <Users className="w-4 h-4 text-white" />
            </Button>
            <Button variant="glass" size="icon" onClick={() => setCurrentScreen("export")}>
              <Download className="w-4 h-4 text-white" />
            </Button>
            <Button variant="glass" size="icon" onClick={() => setCurrentScreen("settings")}>
              <Settings className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">₹{summary.totalAmount.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
            </CardContent>
          </Card>

          <Card className="shadow-strong bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Calculator className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold">
                ₹{filteredExpenses
                  .filter(exp => exp.participants.includes("1"))
                  .reduce((sum, exp) => {
                    const userSplit = exp.splitDetails.find(split => split.userId === "1");
                    return sum + (userSplit?.amount || 0);
                  }, 0).toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground">Your Share</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content tabs */}
      <div className="px-6 py-4">
        <Tabs defaultValue="expenses" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="expenses">
              Expenses {filteredExpenses.length !== expenses.length && `(${filteredExpenses.length})`}
            </TabsTrigger>
            <TabsTrigger value="settlements">Settlements</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-4">
            {/* Action buttons */}
            <div className="flex gap-3">
              <Button 
                variant="default" 
                className="flex-1"
                onClick={() => setCurrentScreen("add")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
              <Button 
                variant="outline"
                onClick={() => setCurrentScreen("filter")}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
                {(filters.users.length + filters.categories.length + 
                  (filters.startDate ? 1 : 0) + (filters.endDate ? 1 : 0)) > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filters.users.length + filters.categories.length + 
                     (filters.startDate ? 1 : 0) + (filters.endDate ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Expenses list */}
            <div className="space-y-3">
              {filteredExpenses.length === 0 ? (
                <Card className="shadow-soft">
                  <CardContent className="p-8 text-center">
                    <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No expenses found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {expenses.length === 0 ? "Add your first expense to get started" : "Try adjusting your filters"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredExpenses.map((expense) => {
                  const paidByUser = mockUsers.find(u => u.id === expense.paidBy);
                  const userSplit = expense.splitDetails.find(split => split.userId === "1");
                  
                  return (
                    <Card key={expense.id} className="shadow-soft">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              {categoryIcons[expense.category as keyof typeof categoryIcons] || <Receipt className="w-4 h-4" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm">{expense.title}</h3>
                              <p className="text-xs text-muted-foreground">
                                Paid by {paidByUser?.name} • {new Date(expense.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{expense.amount}</p>
                            <Badge variant="outline" className="text-xs">
                              {expense.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            Split {expense.splitType} among {expense.participants.length} people
                          </span>
                          {userSplit && (
                            <span className="font-medium">Your share: ₹{userSplit.amount.toFixed(2)}</span>
                          )}
                        </div>
                        
                        {expense.notes && (
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            "{expense.notes}"
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="settlements" className="space-y-4">
            {settlements.length === 0 ? (
              <Card className="shadow-soft">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="font-semibold">All settled up!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    No outstanding balances between group members
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <p className="font-semibold text-blue-900 dark:text-blue-100">
                      Suggested Settlements
                    </p>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-200">
                    These are the minimum transfers needed to settle all debts efficiently.
                  </p>
                </div>

                {settlements.map((settlement, index) => {
                  const fromUser = mockUsers.find(u => u.id === settlement.from);
                  const toUser = mockUsers.find(u => u.id === settlement.to);
                  const settlementKey = `${settlement.from}-${settlement.to}`;
                  const isSettled = settledExpenses.has(settlementKey);
                  
                  return (
                    <Card key={index} className={`shadow-soft ${isSettled ? 'opacity-50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {fromUser?.avatar}
                            </div>
                            <div>
                              <p className="font-semibold">
                                {fromUser?.name} → {toUser?.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {isSettled ? "Settled" : "Pending settlement"}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-red-600">
                              ₹{settlement.amount.toFixed(2)}
                            </p>
                            <Button 
                              variant={isSettled ? "secondary" : "outline"} 
                              size="sm" 
                              className="mt-1"
                              onClick={() => !isSettled && markAsSettled(settlement.from, settlement.to)}
                              disabled={isSettled}
                            >
                              {isSettled ? "Settled" : "Mark as Settled"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </>
            )}
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <Card className="shadow-medium">
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <Receipt className="w-12 h-12 text-primary mx-auto mb-2" />
                  <h3 className="font-bold text-lg">Expense Summary</h3>
                  <p className="text-muted-foreground">Complete breakdown of all expenses</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Expenses:</span>
                    <span className="font-bold">₹{summary.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Expenses:</span>
                    <span>{summary.expenseCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Expense:</span>
                    <span>₹{summary.averageExpense.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Group Members:</span>
                    <span>{mockUsers.length}</span>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-2">
                  <h4 className="font-semibold">By Category:</h4>
                  {Object.entries(summary.categorySummary).map(([category, amount]) => (
                    <div key={category} className="flex justify-between text-sm">
                      <span>{category}:</span>
                      <span>₹{amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* User Balances */}
                <div className="space-y-2">
                  <h4 className="font-semibold">Net Balances:</h4>
                  {balances.map(balance => {
                    const user = mockUsers.find(u => u.id === balance.userId);
                    return (
                      <div key={balance.userId} className="flex justify-between text-sm">
                        <span>{user?.name}:</span>
                        <span className={balance.balance > 0 ? "text-green-600" : balance.balance < 0 ? "text-red-600" : ""}>
                          {balance.balance > 0 ? "+" : ""}₹{balance.balance.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Next button */}
      <div className="p-6">
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full"
          onClick={onNext}
        >
          Next: Trip Summary
        </Button>
      </div>
    </div>
  );
};

export default ExpenseTrackerScreen;