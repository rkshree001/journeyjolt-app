import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getExpensesByTrip, 
  createExpense, 
  updateExpense, 
  deleteExpense, 
  getExpenseSummary,
  settleExpenseSplit,
  Expense 
} from '@/lib/database/expenses';
import { toast } from '@/hooks/use-toast';

export const useExpensesByTrip = (tripId?: string) => {
  return useQuery({
    queryKey: ['expenses', tripId],
    queryFn: () => tripId ? getExpensesByTrip(tripId) : Promise.resolve([]),
    enabled: !!tripId,
  });
};

export const useExpenseSummary = (tripId?: string) => {
  return useQuery({
    queryKey: ['expense-summary', tripId],
    queryFn: () => tripId ? getExpenseSummary(tripId) : Promise.resolve({
      totalSpent: 0,
      categoryBreakdown: {},
      personalBalance: {},
      recentExpenses: []
    }),
    enabled: !!tripId,
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ expenseData, splitBetween }: { 
      expenseData: Omit<Expense, 'id' | 'created_at' | 'updated_at'>, 
      splitBetween: string[] 
    }) => createExpense(expenseData, splitBetween),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['expenses', variables.expenseData.trip_id] });
      queryClient.invalidateQueries({ queryKey: ['expense-summary', variables.expenseData.trip_id] });
      toast({
        title: "Expense added!",
        description: "Your expense has been recorded successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add expense",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ expenseId, updates }: { expenseId: string; updates: Partial<Expense> }) => 
      updateExpense(expenseId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expense-summary'] });
      toast({
        title: "Expense updated!",
        description: "Your expense has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update expense",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expense-summary'] });
      toast({
        title: "Expense deleted!",
        description: "Your expense has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete expense",
        variant: "destructive",
      });
    },
  });
};

export const useSettleExpense = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: settleExpenseSplit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expense-summary'] });
      toast({
        title: "Expense settled!",
        description: "The expense has been marked as settled.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to settle expense",
        variant: "destructive",
      });
    },
  });
};