export interface ItineraryItem {
  id: string;
  tripId: string;
  day: number;
  time: string;
  title: string;
  type: 'accommodation' | 'transport' | 'activity' | 'meal' | 'free-time';
  location: {
    name: string;
    address: string;
    coordinates: [number, number]; // [lng, lat]
  };
  duration: number; // in minutes
  cost?: number;
  currency?: string;
  description: string;
  notes?: string;
  bookingStatus: 'not-booked' | 'booked' | 'confirmed';
  bookingUrl?: string;
  tags: string[];
}

export interface DayItinerary {
  day: number;
  date: string;
  title: string;
  items: ItineraryItem[];
  totalCost: number;
  estimatedDuration: number;
}

export const mockItineraryItems: ItineraryItem[] = [
  // Tokyo Trip - Day 1
  {
    id: 'it1',
    tripId: '1',
    day: 1,
    time: '09:00',
    title: 'Arrive at Haneda Airport',
    type: 'transport',
    location: {
      name: 'Haneda Airport',
      address: 'Tokyo International Airport, Tokyo, Japan',
      coordinates: [139.7798, 35.5494]
    },
    duration: 60,
    description: 'International arrival and customs',
    bookingStatus: 'confirmed',
    tags: ['arrival', 'airport']
  },
  {
    id: 'it2',
    tripId: '1',
    day: 1,
    time: '11:00',
    title: 'Check-in at Shibuya Hotel',
    type: 'accommodation',
    location: {
      name: 'Shibuya Hotel',
      address: 'Shibuya, Tokyo, Japan',
      coordinates: [139.7016, 35.6598]
    },
    duration: 30,
    cost: 150,
    currency: 'USD',
    description: 'Boutique hotel in the heart of Shibuya',
    bookingStatus: 'confirmed',
    bookingUrl: 'https://booking.com/shibuya-hotel',
    tags: ['hotel', 'shibuya']
  },
  {
    id: 'it3',
    tripId: '1',
    day: 1,
    time: '13:00',
    title: 'Lunch at Shibuya Crossing',
    type: 'meal',
    location: {
      name: 'Shibuya Crossing',
      address: 'Shibuya Crossing, Tokyo, Japan',
      coordinates: [139.7016, 35.6598]
    },
    duration: 90,
    cost: 25,
    currency: 'USD',
    description: 'Local ramen shop with a view of the famous crossing',
    bookingStatus: 'not-booked',
    tags: ['ramen', 'lunch', 'crossing']
  },
  {
    id: 'it4',
    tripId: '1',
    day: 1,
    time: '15:00',
    title: 'Explore Harajuku',
    type: 'activity',
    location: {
      name: 'Harajuku',
      address: 'Harajuku, Tokyo, Japan',
      coordinates: [139.7026, 35.6702]
    },
    duration: 180,
    cost: 50,
    currency: 'USD',
    description: 'Street fashion, cafes, and unique culture',
    bookingStatus: 'not-booked',
    tags: ['fashion', 'culture', 'shopping']
  },
  // Tokyo Trip - Day 2
  {
    id: 'it5',
    tripId: '1',
    day: 2,
    time: '08:00',
    title: 'Tsukiji Fish Market',
    type: 'activity',
    location: {
      name: 'Tsukiji Fish Market',
      address: 'Tsukiji, Tokyo, Japan',
      coordinates: [139.7710, 35.6654]
    },
    duration: 120,
    cost: 30,
    currency: 'USD',
    description: 'Fresh sushi breakfast and market exploration',
    bookingStatus: 'not-booked',
    tags: ['market', 'sushi', 'breakfast']
  },
  {
    id: 'it6',
    tripId: '1',
    day: 2,
    time: '11:00',
    title: 'Tokyo Skytree Visit',
    type: 'activity',
    location: {
      name: 'Tokyo Skytree',
      address: 'Tokyo Skytree, Tokyo, Japan',
      coordinates: [139.8107, 35.7101]
    },
    duration: 150,
    cost: 25,
    currency: 'USD',
    description: 'Observation deck with panoramic city views',
    bookingStatus: 'booked',
    bookingUrl: 'https://tokyo-skytree.jp/en/',
    tags: ['observatory', 'views', 'landmark']
  },
  // European Trip Planning
  {
    id: 'it7',
    tripId: '2',
    day: 1,
    time: '10:00',
    title: 'Arrive in Paris',
    type: 'transport',
    location: {
      name: 'Charles de Gaulle Airport',
      address: 'Charles de Gaulle Airport, Paris, France',
      coordinates: [2.5479, 49.0097]
    },
    duration: 90,
    description: 'International arrival in Paris',
    bookingStatus: 'not-booked',
    tags: ['arrival', 'paris']
  },
  {
    id: 'it8',
    tripId: '2',
    day: 1,
    time: '14:00',
    title: 'Eiffel Tower Visit',
    type: 'activity',
    location: {
      name: 'Eiffel Tower',
      address: 'Eiffel Tower, Paris, France',
      coordinates: [2.2945, 48.8584]
    },
    duration: 120,
    cost: 30,
    currency: 'USD',
    description: 'Iconic landmark and city views',
    bookingStatus: 'not-booked',
    tags: ['landmark', 'views', 'iconic']
  }
];

export const getItineraryByTrip = (tripId: string): DayItinerary[] => {
  const items = mockItineraryItems.filter(item => item.tripId === tripId);
  const groupedByDay = items.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<number, ItineraryItem[]>);

  return Object.entries(groupedByDay).map(([day, dayItems]) => {
    const dayNumber = parseInt(day);
    const totalCost = dayItems.reduce((sum, item) => sum + (item.cost || 0), 0);
    const estimatedDuration = dayItems.reduce((sum, item) => sum + item.duration, 0);
    
    // Calculate date based on trip start date
    const baseDate = new Date('2024-09-15'); // Tokyo trip start date
    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + dayNumber - 1);
    
    return {
      day: dayNumber,
      date: currentDate.toISOString().split('T')[0],
      title: `Day ${dayNumber}`,
      items: dayItems.sort((a, b) => a.time.localeCompare(b.time)),
      totalCost,
      estimatedDuration
    };
  }).sort((a, b) => a.day - b.day);
};

export const getItineraryStats = (tripId: string) => {
  const items = mockItineraryItems.filter(item => item.tripId === tripId);
  const totalCost = items.reduce((sum, item) => sum + (item.cost || 0), 0);
  const totalDuration = items.reduce((sum, item) => sum + item.duration, 0);
  const bookedItems = items.filter(item => item.bookingStatus === 'booked' || item.bookingStatus === 'confirmed').length;
  const totalItems = items.length;
  
  return {
    totalCost,
    totalDuration,
    bookedPercentage: totalItems > 0 ? (bookedItems / totalItems) * 100 : 0,
    totalItems,
    bookedItems
  };
};