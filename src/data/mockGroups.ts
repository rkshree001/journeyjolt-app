export interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  members: string[]; // user IDs
  adminId: string;
  tripIds: string[];
  createdAt: string;
  stats: {
    totalTrips: number;
    totalSpent: number;
    activeMembers: number;
  };
  settings: {
    visibility: 'public' | 'private';
    joinApproval: boolean;
    expenseNotifications: boolean;
  };
}

export interface GroupInvite {
  id: string;
  groupId: string;
  invitedBy: string;
  invitedEmail: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  expiresAt: string;
}

export const mockGroups: Group[] = [
  {
    id: 'g1',
    name: 'Tokyo Adventurers',
    description: 'Friends exploring Japan together - amazing food, culture, and experiences!',
    avatar: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&h=200&fit=crop',
    members: ['user1', 'user2', 'user3'],
    adminId: 'user1',
    tripIds: ['1'],
    createdAt: '2024-08-01',
    stats: {
      totalTrips: 1,
      totalSpent: 2100,
      activeMembers: 3
    },
    settings: {
      visibility: 'private',
      joinApproval: true,
      expenseNotifications: true
    }
  },
  {
    id: 'g2',
    name: 'European Backpackers',
    description: 'Budget-friendly European adventure across multiple countries',
    avatar: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=200&h=200&fit=crop',
    members: ['user1', 'user4'],
    adminId: 'user1',
    tripIds: ['2'],
    createdAt: '2024-07-15',
    stats: {
      totalTrips: 1,
      totalSpent: 0,
      activeMembers: 2
    },
    settings: {
      visibility: 'private',
      joinApproval: false,
      expenseNotifications: true
    }
  },
  {
    id: 'g3',
    name: 'Bali Retreat Squad',
    description: 'Relaxation and wellness trip to beautiful Bali',
    avatar: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=200&h=200&fit=crop',
    members: ['user1', 'user5', 'user6'],
    adminId: 'user5',
    tripIds: ['3'],
    createdAt: '2024-05-20',
    stats: {
      totalTrips: 1,
      totalSpent: 2650,
      activeMembers: 3
    },
    settings: {
      visibility: 'private',
      joinApproval: true,
      expenseNotifications: true
    }
  },
  {
    id: 'g4',
    name: 'NYC Weekend Warriors',
    description: 'Quick city break to experience the best of New York',
    avatar: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=200&h=200&fit=crop',
    members: ['user1', 'user2'],
    adminId: 'user2',
    tripIds: ['4'],
    createdAt: '2024-08-10',
    stats: {
      totalTrips: 1,
      totalSpent: 0,
      activeMembers: 2
    },
    settings: {
      visibility: 'private',
      joinApproval: false,
      expenseNotifications: true
    }
  },
  {
    id: 'g5',
    name: 'Travel Enthusiasts',
    description: 'Global community of passionate travelers sharing experiences',
    avatar: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop',
    members: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
    adminId: 'user3',
    tripIds: [],
    createdAt: '2023-12-01',
    stats: {
      totalTrips: 0,
      totalSpent: 0,
      activeMembers: 6
    },
    settings: {
      visibility: 'public',
      joinApproval: true,
      expenseNotifications: false
    }
  }
];

export const mockGroupInvites: GroupInvite[] = [
  {
    id: 'inv1',
    groupId: 'g1',
    invitedBy: 'user1',
    invitedEmail: 'newuser@email.com',
    status: 'pending',
    createdAt: '2024-08-15',
    expiresAt: '2024-08-22'
  },
  {
    id: 'inv2',
    groupId: 'g5',
    invitedBy: 'user3',
    invitedEmail: 'traveler@email.com',
    status: 'pending',
    createdAt: '2024-08-18',
    expiresAt: '2024-08-25'
  }
];

export const getUserGroups = (userId: string) => 
  mockGroups.filter(group => group.members.includes(userId));

export const getGroupsByTrip = (tripId: string) =>
  mockGroups.filter(group => group.tripIds.includes(tripId));

export const getGroupInvites = (userId: string) =>
  mockGroupInvites.filter(invite => invite.status === 'pending');

export const getGroupMembers = (groupId: string) => {
  const group = mockGroups.find(g => g.id === groupId);
  return group ? group.members : [];
};

export const isGroupAdmin = (groupId: string, userId: string) => {
  const group = mockGroups.find(g => g.id === groupId);
  return group?.adminId === userId;
};