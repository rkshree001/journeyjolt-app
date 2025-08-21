import { supabase } from "@/integrations/supabase/client";

export interface Expense {
  id: string;
  trip_id: string;
  title: string;
  amount: number;
  currency: string;
  category: 'food' | 'transport' | 'accommodation' | 'activities' | 'shopping' | 'other';
  paid_by: string;
  date: string;
  description?: string;
  receipt?: string;
  location?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  splits?: ExpenseSplit[];
}

export interface ExpenseSplit {
  id: string;
  expense_id: string;
  user_id: string;
  amount: number;
  settled: boolean;
  settled_at?: string;
}

export interface ExpenseSummary {
  totalSpent: number;
  categoryBreakdown: Record<string, number>;
  personalBalance: Record<string, number>;
  recentExpenses: Expense[];
}

export const createExpense = async (expenseData: Omit<Expense, 'id' | 'created_at' | 'updated_at'>, splitBetween: string[]) => {
  const { data: expense, error: expenseError } = await supabase
    .from('expenses')
    .insert([expenseData])
    .select()
    .single();

  if (expenseError) throw expenseError;

  // Create expense splits
  const splitAmount = expenseData.amount / splitBetween.length;
  const splits = splitBetween.map(userId => ({
    expense_id: expense.id,
    user_id: userId,
    amount: splitAmount
  }));

  const { error: splitsError } = await supabase
    .from('expense_splits')
    .insert(splits);

  if (splitsError) throw splitsError;

  return expense;
};

export const getExpensesByTrip = async (tripId: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select(`
      *,
      expense_splits(*)
    `)
    .eq('trip_id', tripId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getExpenseById = async (expenseId: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select(`
      *,
      expense_splits(*)
    `)
    .eq('id', expenseId)
    .single();

  if (error) throw error;
  return data;
};

export const updateExpense = async (expenseId: string, updates: Partial<Expense>) => {
  const { data, error } = await supabase
    .from('expenses')
    .update(updates)
    .eq('id', expenseId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteExpense = async (expenseId: string) => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', expenseId);

  if (error) throw error;
};

export const settleExpenseSplit = async (splitId: string) => {
  const { data, error } = await supabase
    .from('expense_splits')
    .update({ 
      settled: true, 
      settled_at: new Date().toISOString() 
    })
    .eq('id', splitId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getExpenseSummary = async (tripId: string): Promise<ExpenseSummary> => {
  const expenses = await getExpensesByTrip(tripId);
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categoryBreakdown = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Calculate personal balances
  const currentUser = await supabase.auth.getUser();
  const userId = currentUser.data.user?.id;
  
  let personalBalance: Record<string, number> = {};
  
  if (userId) {
    // Get all splits for this user in this trip
    const { data: userSplits } = await supabase
      .from('expense_splits')
      .select(`
        *,
        expenses!inner(trip_id, paid_by, amount)
      `)
      .eq('user_id', userId)
      .eq('expenses.trip_id', tripId);

    // Calculate what user owes vs what they paid
    let totalOwed = 0;
    let totalPaid = 0;

    userSplits?.forEach(split => {
      totalOwed += split.amount;
      if (split.expenses.paid_by === userId) {
        totalPaid += split.expenses.amount;
      }
    });

    personalBalance[userId] = totalPaid - totalOwed;
  }

  const recentExpenses = expenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return {
    totalSpent,
    categoryBreakdown,
    personalBalance,
    recentExpenses
  };
};