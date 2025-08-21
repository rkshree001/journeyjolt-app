// Central export for all mock data
export * from './mockTrips';
export * from './mockExpenses';
export * from './mockUsers';
export * from './mockItinerary';
export * from './mockPlaces';
export * from './mockGroups';

// Helper functions for common data operations
export const getMockDataSummary = () => {
  return {
    trips: 4,
    expenses: 6,
    users: 6,
    itineraryItems: 8,
    places: 6,
    groups: 5
  };
};

// Common data relationships
export const getActiveTripsWithData = () => {
  // This would typically join data from multiple sources
  // For now, return mock structure that components can use
  return {
    currentTrip: {
      id: '1',
      title: 'Tokyo Adventure',
      status: 'active',
      daysRemaining: 3,
      totalBudget: 3500,
      totalSpent: 2100,
      upcomingItems: 2,
      groupMembers: 3
    }
  };
};

export const getDashboardStats = () => {
  return {
    activeTrips: 1,
    plannedTrips: 2,
    totalSpent: 4750,
    savedAmount: 1200,
    friendsConnected: 15,
    countriesVisited: 8
  };
};