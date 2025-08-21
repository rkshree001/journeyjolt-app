export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed';
  budget: number;
  spent: number;
  currency: string;
  participants: string[];
  image: string;
  description: string;
  tags: string[];
  createdAt: string;
}

export const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    startDate: '2024-09-15',
    endDate: '2024-09-22',
    status: 'active',
    budget: 3500,
    spent: 2100,
    currency: 'USD',
    participants: ['user1', 'user2', 'user3'],
    image: '/src/assets/travel-hero.jpg',
    description: 'Exploring the vibrant culture, amazing food, and modern technology of Tokyo',
    tags: ['culture', 'food', 'technology', 'urban'],
    createdAt: '2024-08-01'
  },
  {
    id: '2',
    title: 'European Backpacking',
    destination: 'Europe',
    startDate: '2024-10-10',
    endDate: '2024-10-25',
    status: 'planning',
    budget: 4200,
    spent: 0,
    currency: 'USD',
    participants: ['user1', 'user4'],
    image: '/src/assets/onboarding-2.jpg',
    description: 'Multi-city European adventure through Paris, Rome, Barcelona, and Amsterdam',
    tags: ['backpacking', 'culture', 'history', 'adventure'],
    createdAt: '2024-07-15'
  },
  {
    id: '3',
    title: 'Bali Retreat',
    destination: 'Bali, Indonesia',
    startDate: '2024-07-01',
    endDate: '2024-07-10',
    status: 'completed',
    budget: 2800,
    spent: 2650,
    currency: 'USD',
    participants: ['user1', 'user5', 'user6'],
    image: '/src/assets/onboarding-3.jpg',
    description: 'Relaxing retreat with beaches, temples, and amazing Indonesian cuisine',
    tags: ['beach', 'relaxation', 'temples', 'tropical'],
    createdAt: '2024-05-20'
  },
  {
    id: '4',
    title: 'New York City Weekend',
    destination: 'New York, USA',
    startDate: '2024-11-15',
    endDate: '2024-11-18',
    status: 'planning',
    budget: 1800,
    spent: 0,
    currency: 'USD',
    participants: ['user1', 'user2'],
    image: '/src/assets/onboarding-4.jpg',
    description: 'City break to see Broadway shows, visit museums, and enjoy world-class dining',
    tags: ['city', 'shows', 'museums', 'dining'],
    createdAt: '2024-08-10'
  }
];

export const getCurrentTrip = () => mockTrips.find(trip => trip.status === 'active');
export const getPlanningTrips = () => mockTrips.filter(trip => trip.status === 'planning');
export const getCompletedTrips = () => mockTrips.filter(trip => trip.status === 'completed');