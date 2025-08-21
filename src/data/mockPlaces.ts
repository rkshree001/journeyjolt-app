export interface Place {
  id: string;
  name: string;
  type: 'restaurant' | 'attraction' | 'hotel' | 'transport' | 'shopping' | 'entertainment';
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: [number, number]; // [lng, lat]
  };
  rating: number;
  priceLevel: 1 | 2 | 3 | 4 | 5; // $ to $$$$$
  photos: string[];
  description: string;
  tags: string[];
  openingHours: {
    [key: string]: string; // day of week to hours
  };
  contact: {
    phone?: string;
    website?: string;
    email?: string;
  };
  amenities: string[];
  averageCost?: number;
  currency?: string;
  distance?: number; // in km from user location
  estimatedDuration?: number; // in minutes
}

export const mockPlaces: Place[] = [
  {
    id: 'p1',
    name: 'Tsukiji Outer Market',
    type: 'attraction',
    location: {
      address: '4 Chome Tsukiji, Chuo City',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: [139.7710, 35.6654]
    },
    rating: 4.5,
    priceLevel: 2,
    photos: [
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300',
      'https://images.unsplash.com/photo-1582450871872-e0d13b48353e?w=400&h=300'
    ],
    description: 'Famous fish market with fresh sushi, street food, and traditional Japanese atmosphere',
    tags: ['market', 'sushi', 'street-food', 'traditional'],
    openingHours: {
      'monday': '5:00 AM - 2:00 PM',
      'tuesday': '5:00 AM - 2:00 PM',
      'wednesday': 'Closed',
      'thursday': '5:00 AM - 2:00 PM',
      'friday': '5:00 AM - 2:00 PM',
      'saturday': '5:00 AM - 2:00 PM',
      'sunday': 'Closed'
    },
    contact: {
      website: 'https://www.tsukiji.or.jp/'
    },
    amenities: ['wheelchair-accessible', 'cash-only', 'outdoor-seating'],
    averageCost: 25,
    currency: 'USD',
    distance: 2.5,
    estimatedDuration: 120
  },
  {
    id: 'p2',
    name: 'Shibuya Sky',
    type: 'attraction',
    location: {
      address: '2-24-12 Shibuya, Shibuya City',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: [139.7016, 35.6598]
    },
    rating: 4.8,
    priceLevel: 3,
    photos: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300'
    ],
    description: 'Rooftop observation deck with 360-degree views of Tokyo skyline',
    tags: ['observatory', 'views', 'rooftop', 'photography'],
    openingHours: {
      'monday': '9:00 AM - 11:00 PM',
      'tuesday': '9:00 AM - 11:00 PM',
      'wednesday': '9:00 AM - 11:00 PM',
      'thursday': '9:00 AM - 11:00 PM',
      'friday': '9:00 AM - 11:00 PM',
      'saturday': '9:00 AM - 11:00 PM',
      'sunday': '9:00 AM - 11:00 PM'
    },
    contact: {
      phone: '+81-3-4221-0229',
      website: 'https://www.shibuya-sky.com/'
    },
    amenities: ['elevator', 'gift-shop', 'cafe', 'wheelchair-accessible'],
    averageCost: 20,
    currency: 'USD',
    distance: 0.5,
    estimatedDuration: 90
  },
  {
    id: 'p3',
    name: 'Sushi Jiro Honten',
    type: 'restaurant',
    location: {
      address: 'Tsukamoto Sogyo Building B1F, 4-2-15 Ginza',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: [139.7640, 35.6735]
    },
    rating: 4.9,
    priceLevel: 5,
    photos: [
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300'
    ],
    description: 'World-renowned sushi restaurant, reservation required well in advance',
    tags: ['sushi', 'fine-dining', 'michelin', 'reservation-required'],
    openingHours: {
      'monday': '11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM',
      'tuesday': '11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM',
      'wednesday': '11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM',
      'thursday': '11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM',
      'friday': '11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM',
      'saturday': 'Closed',
      'sunday': 'Closed'
    },
    contact: {
      phone: '+81-3-3535-3600'
    },
    amenities: ['reservation-required', 'no-photography', 'cash-only'],
    averageCost: 300,
    currency: 'USD',
    distance: 1.8,
    estimatedDuration: 120
  },
  {
    id: 'p4',
    name: 'Park Hyatt Tokyo',
    type: 'hotel',
    location: {
      address: '3-7-1-2 Nishi Shinjuku',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: [139.6944, 35.6853]
    },
    rating: 4.7,
    priceLevel: 5,
    photos: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300'
    ],
    description: 'Luxury hotel with stunning city views, featured in Lost in Translation',
    tags: ['luxury', 'hotel', 'views', 'spa', 'fine-dining'],
    openingHours: {
      'monday': '24 hours',
      'tuesday': '24 hours',
      'wednesday': '24 hours',
      'thursday': '24 hours',
      'friday': '24 hours',
      'saturday': '24 hours',
      'sunday': '24 hours'
    },
    contact: {
      phone: '+81-3-5322-1234',
      website: 'https://www.hyatt.com/en-US/hotel/japan/park-hyatt-tokyo'
    },
    amenities: ['spa', 'pool', 'gym', 'restaurant', 'bar', 'concierge', 'wifi'],
    averageCost: 600,
    currency: 'USD',
    distance: 3.2,
    estimatedDuration: 30
  },
  {
    id: 'p5',
    name: 'Senso-ji Temple',
    type: 'attraction',
    location: {
      address: '2-3-1 Asakusa, Taito City',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: [139.7967, 35.7148]
    },
    rating: 4.6,
    priceLevel: 1,
    photos: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&h=300',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300'
    ],
    description: 'Ancient Buddhist temple, Tokyo\'s oldest temple with traditional architecture',
    tags: ['temple', 'historic', 'traditional', 'cultural', 'free'],
    openingHours: {
      'monday': '6:00 AM - 5:00 PM',
      'tuesday': '6:00 AM - 5:00 PM',
      'wednesday': '6:00 AM - 5:00 PM',
      'thursday': '6:00 AM - 5:00 PM',
      'friday': '6:00 AM - 5:00 PM',
      'saturday': '6:00 AM - 5:00 PM',
      'sunday': '6:00 AM - 5:00 PM'
    },
    contact: {
      website: 'https://www.senso-ji.jp/'
    },
    amenities: ['free-entry', 'wheelchair-accessible', 'gift-shop'],
    averageCost: 0,
    currency: 'USD',
    distance: 4.1,
    estimatedDuration: 90
  },
  // European places for planning trip
  {
    id: 'p6',
    name: 'Eiffel Tower',
    type: 'attraction',
    location: {
      address: 'Champ de Mars, 5 Avenue Anatole France',
      city: 'Paris',
      country: 'France',
      coordinates: [2.2945, 48.8584]
    },
    rating: 4.4,
    priceLevel: 3,
    photos: [
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300'
    ],
    description: 'Iconic iron lattice tower and symbol of Paris',
    tags: ['landmark', 'tower', 'views', 'iconic'],
    openingHours: {
      'monday': '9:30 AM - 11:45 PM',
      'tuesday': '9:30 AM - 11:45 PM',
      'wednesday': '9:30 AM - 11:45 PM',
      'thursday': '9:30 AM - 11:45 PM',
      'friday': '9:30 AM - 11:45 PM',
      'saturday': '9:30 AM - 11:45 PM',
      'sunday': '9:30 AM - 11:45 PM'
    },
    contact: {
      website: 'https://www.toureiffel.paris/'
    },
    amenities: ['elevator', 'gift-shop', 'restaurant'],
    averageCost: 30,
    currency: 'EUR',
    estimatedDuration: 120
  }
];

export const getPlacesByCity = (city: string) => 
  mockPlaces.filter(place => place.location.city.toLowerCase() === city.toLowerCase());

export const getPlacesByType = (type: Place['type']) => 
  mockPlaces.filter(place => place.type === type);

export const getNearbyPlaces = (coordinates: [number, number], radiusKm: number = 5) => {
  // Simple distance calculation (in real app, use proper geospatial queries)
  return mockPlaces.filter(place => {
    const distance = calculateDistance(coordinates, place.location.coordinates);
    return distance <= radiusKm;
  }).sort((a, b) => {
    const distA = calculateDistance(coordinates, a.location.coordinates);
    const distB = calculateDistance(coordinates, b.location.coordinates);
    return distA - distB;
  });
};

// Helper function for distance calculation
function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;
  
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}