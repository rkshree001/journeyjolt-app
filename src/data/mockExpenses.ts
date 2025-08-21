export interface Expense {
  id: string;
  tripId: string;
  title: string;
  amount: number;
  currency: string;
  category: 'food' | 'transport' | 'accommodation' | 'activities' | 'shopping' | 'other';
  paidBy: string;
  splitBetween: string[];
  date: string;
  description: string;
  receipt?: string;
  location?: string;
  tags: string[];
}

export interface ExpenseSummary {
  totalSpent: number;
  categoryBreakdown: Record<string, number>;
  personalBalance: Record<string, number>;
  recentExpenses: Expense[];
}

export const mockExpenses: Expense[] = [
  {
    id: '1',
    tripId: '1',
    title: 'Sushi Dinner at Tsukiji',
    amount: 180,
    currency: 'USD',
    category: 'food',
    paidBy: 'user1',
    splitBetween: ['user1', 'user2', 'user3'],
    date: '2024-09-16',
    description: 'Amazing fresh sushi at the famous Tsukiji market',
    location: 'Tsukiji Fish Market, Tokyo',
    tags: ['sushi', 'market', 'dinner']
  },
  {
    id: '2',
    tripId: '1',
    title: 'Train Tickets JR Pass',
    amount: 280,
    currency: 'USD',
    category: 'transport',
    paidBy: 'user2',
    splitBetween: ['user1', 'user2', 'user3'],
    date: '2024-09-15',
    description: '7-day JR Pass for unlimited train travel',
    location: 'Tokyo Station',
    tags: ['train', 'jr-pass', 'transport']
  },
  {
    id: '3',
    tripId: '1',
    title: 'Hotel Shibuya',
    amount: 450,
    currency: 'USD',
    category: 'accommodation',
    paidBy: 'user3',
    splitBetween: ['user1', 'user2', 'user3'],
    date: '2024-09-15',
    description: 'Two nights at boutique hotel in Shibuya',
    location: 'Shibuya, Tokyo',
    tags: ['hotel', 'shibuya', 'accommodation']
  },
  {
    id: '4',
    tripId: '1',
    title: 'Tokyo Skytree Tickets',
    amount: 75,
    currency: 'USD',
    category: 'activities',
    paidBy: 'user1',
    splitBetween: ['user1', 'user2', 'user3'],
    date: '2024-09-17',
    description: 'Observation deck tickets with city views',
    location: 'Tokyo Skytree',
    tags: ['sightseeing', 'skytree', 'views']
  },
  {
    id: '5',
    tripId: '1',
    title: 'Ramen in Harajuku',
    amount: 45,
    currency: 'USD',
    category: 'food',
    paidBy: 'user2',
    splitBetween: ['user1', 'user2'],
    date: '2024-09-18',
    description: 'Tonkotsu ramen at famous local spot',
    location: 'Harajuku, Tokyo',
    tags: ['ramen', 'harajuku', 'lunch']
  },
  {
    id: '6',
    tripId: '3',
    title: 'Beach Resort Stay',
    amount: 800,
    currency: 'USD',
    category: 'accommodation',
    paidBy: 'user1',
    splitBetween: ['user1', 'user5', 'user6'],
    date: '2024-07-02',
    description: 'Luxury beachfront resort in Seminyak',
    location: 'Seminyak, Bali',
    tags: ['resort', 'beach', 'luxury']
  }
];

export const getExpensesByTrip = (tripId: string) => 
  mockExpenses.filter(expense => expense.tripId === tripId);

export const getExpenseSummary = (tripId: string): ExpenseSummary => {
  const tripExpenses = getExpensesByTrip(tripId);
  const totalSpent = tripExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categoryBreakdown = tripExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Calculate personal balances (simplified)
  const personalBalance = {
    'user1': -45.50,
    'user2': 32.20,
    'user3': 13.30
  };

  const recentExpenses = tripExpenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return {
    totalSpent,
    categoryBreakdown,
    personalBalance,
    recentExpenses
  };
};