export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  preferences: {
    currency: string;
    language: string;
    notifications: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
  stats: {
    tripsCompleted: number;
    totalSpent: number;
    countriesVisited: number;
    friendsConnected: number;
  };
  joinedAt: string;
}

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '+1-555-123-4567',
    preferences: {
      currency: 'USD',
      language: 'en',
      notifications: true,
      theme: 'auto'
    },
    stats: {
      tripsCompleted: 12,
      totalSpent: 15400,
      countriesVisited: 8,
      friendsConnected: 15
    },
    joinedAt: '2023-01-15'
  },
  {
    id: 'user2',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72d0db3?w=150&h=150&fit=crop&crop=face',
    phone: '+1-555-234-5678',
    preferences: {
      currency: 'USD',
      language: 'en',
      notifications: true,
      theme: 'light'
    },
    stats: {
      tripsCompleted: 8,
      totalSpent: 9800,
      countriesVisited: 6,
      friendsConnected: 12
    },
    joinedAt: '2023-03-22'
  },
  {
    id: 'user3',
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '+1-555-345-6789',
    preferences: {
      currency: 'USD',
      language: 'en',
      notifications: false,
      theme: 'dark'
    },
    stats: {
      tripsCompleted: 15,
      totalSpent: 22100,
      countriesVisited: 12,
      friendsConnected: 20
    },
    joinedAt: '2022-11-08'
  },
  {
    id: 'user4',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    preferences: {
      currency: 'EUR',
      language: 'en',
      notifications: true,
      theme: 'auto'
    },
    stats: {
      tripsCompleted: 6,
      totalSpent: 7200,
      countriesVisited: 4,
      friendsConnected: 8
    },
    joinedAt: '2023-05-14'
  },
  {
    id: 'user5',
    name: 'David Kim',
    email: 'david.kim@email.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    preferences: {
      currency: 'USD',
      language: 'en',
      notifications: true,
      theme: 'light'
    },
    stats: {
      tripsCompleted: 10,
      totalSpent: 13500,
      countriesVisited: 7,
      friendsConnected: 14
    },
    joinedAt: '2023-02-28'
  },
  {
    id: 'user6',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    preferences: {
      currency: 'USD',
      language: 'en',
      notifications: true,
      theme: 'auto'
    },
    stats: {
      tripsCompleted: 9,
      totalSpent: 11200,
      countriesVisited: 5,
      friendsConnected: 11
    },
    joinedAt: '2023-04-10'
  }
];

export const getCurrentUser = () => mockUsers[0]; // Alex Johnson as current user
export const getUserById = (id: string) => mockUsers.find(user => user.id === id);
export const getUsersByIds = (ids: string[]) => mockUsers.filter(user => ids.includes(user.id));