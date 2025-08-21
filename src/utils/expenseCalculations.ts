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

interface Balance {
  userId: string;
  balance: number; // positive = owed money, negative = owes money
}

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export const calculateUserBalances = (expenses: Expense[], users: User[]): Balance[] => {
  const balances = users.reduce((acc, user) => {
    acc[user.id] = 0;
    return acc;
  }, {} as Record<string, number>);

  expenses.forEach(expense => {
    // Add amount paid by user
    balances[expense.paidBy] += expense.amount;

    // Subtract each user's share
    expense.splitDetails.forEach(split => {
      balances[split.userId] -= split.amount;
    });
  });

  return Object.entries(balances).map(([userId, balance]) => ({
    userId,
    balance
  }));
};

export const calculateSettlements = (balances: Balance[], users: User[]): Settlement[] => {
  // Separate creditors (positive balance) and debtors (negative balance)
  const creditors = balances.filter(b => b.balance > 0.01).sort((a, b) => b.balance - a.balance);
  const debtors = balances.filter(b => b.balance < -0.01).sort((a, b) => a.balance - b.balance);
  
  const settlements: Settlement[] = [];
  let i = 0, j = 0;

  while (i < creditors.length && j < debtors.length) {
    const creditor = creditors[i];
    const debtor = debtors[j];
    
    const amount = Math.min(creditor.balance, Math.abs(debtor.balance));
    
    if (amount > 0.01) {
      settlements.push({
        from: debtor.userId,
        to: creditor.userId,
        amount
      });
    }

    creditor.balance -= amount;
    debtor.balance += amount;

    if (creditor.balance < 0.01) i++;
    if (Math.abs(debtor.balance) < 0.01) j++;
  }

  return settlements;
};

export const getExpensesByUser = (expenses: Expense[], userId: string): Expense[] => {
  return expenses.filter(expense => 
    expense.paidBy === userId || expense.participants.includes(userId)
  );
};

export const getExpensesByCategory = (expenses: Expense[], category: string): Expense[] => {
  return expenses.filter(expense => expense.category === category);
};

export const getExpensesByDateRange = (
  expenses: Expense[], 
  startDate: Date, 
  endDate: Date
): Expense[] => {
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startDate && expenseDate <= endDate;
  });
};

export const getTotalExpensesByUser = (expenses: Expense[], userId: string): number => {
  return expenses
    .filter(expense => expense.paidBy === userId)
    .reduce((total, expense) => total + expense.amount, 0);
};

export const getUserShareTotal = (expenses: Expense[], userId: string): number => {
  return expenses
    .filter(expense => expense.participants.includes(userId))
    .reduce((total, expense) => {
      const userSplit = expense.splitDetails.find(split => split.userId === userId);
      return total + (userSplit?.amount || 0);
    }, 0);
};

export const getExpenseSummary = (expenses: Expense[]) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categorySummary = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const monthlySummary = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalAmount,
    expenseCount: expenses.length,
    categorySummary,
    monthlySummary,
    averageExpense: expenses.length > 0 ? totalAmount / expenses.length : 0
  };
};

// Multi-currency support
export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  // In a real app, this would fetch live exchange rates
  const exchangeRates: Record<string, Record<string, number>> = {
    'INR': { 'USD': 0.012, 'EUR': 0.011, 'GBP': 0.0095, 'JPY': 1.8 },
    'USD': { 'INR': 83.0, 'EUR': 0.92, 'GBP': 0.79, 'JPY': 148.0 },
    'EUR': { 'INR': 90.0, 'USD': 1.09, 'GBP': 0.86, 'JPY': 161.0 },
    'GBP': { 'INR': 105.0, 'USD': 1.27, 'EUR': 1.16, 'JPY': 187.0 },
    'JPY': { 'INR': 0.56, 'USD': 0.0068, 'EUR': 0.0062, 'GBP': 0.0053 }
  };

  if (fromCurrency === toCurrency) return amount;
  return amount * (exchangeRates[fromCurrency]?.[toCurrency] || 1);
};

// Expense analytics
export const getExpenseAnalytics = (expenses: Expense[], users: User[]) => {
  const userExpenseMap = users.reduce((acc, user) => {
    acc[user.id] = {
      totalPaid: 0,
      totalOwed: 0,
      expenseCount: 0,
      categories: {} as Record<string, number>
    };
    return acc;
  }, {} as Record<string, any>);

  expenses.forEach(expense => {
    // Track who paid
    userExpenseMap[expense.paidBy].totalPaid += expense.amount;
    userExpenseMap[expense.paidBy].expenseCount += 1;

    // Track what each user owes
    expense.splitDetails.forEach(split => {
      userExpenseMap[split.userId].totalOwed += split.amount;
      userExpenseMap[split.userId].categories[expense.category] = 
        (userExpenseMap[split.userId].categories[expense.category] || 0) + split.amount;
    });
  });

  return userExpenseMap;
};