export interface BookingOption {
  id: string;
  hotelName: string;
  location: string;
  price: number;
  refundable: boolean;
  supplierReliability: number;
  cancellationRisk: number;
  operationalEffort: number;
  bsiScore: number;
  imageUrl: string;
  rating: number;
  amenities: string[];
  conflicts: ConflictItem[];
  isRejected: boolean;
  rejectionReason?: string;
}

export interface ConflictItem {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface AgentConstraints {
  destination: string;
  checkIn: string;
  checkOut: string;
  budget: number;
  refundabilityRequired: boolean;
  dateFlexibility: 'low' | 'medium' | 'high';
  clientType: 'corporate' | 'leisure';
}

export const mockBookingOptions: BookingOption[] = [
  {
    id: 'opt-1',
    hotelName: 'The Grand Meridian',
    location: 'Mumbai, Maharashtra',
    price: 78000,
    refundable: true,
    supplierReliability: 0.92,
    cancellationRisk: 0.08,
    operationalEffort: 0.15,
    bsiScore: 87,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    rating: 4.8,
    amenities: ['Free WiFi', 'Breakfast', 'Airport Shuttle', 'Business Center'],
    conflicts: [],
    isRejected: false,
  },
  {
    id: 'opt-2',
    hotelName: 'Taj Palace Suites',
    location: 'Mumbai, Maharashtra',
    price: 95000,
    refundable: true,
    supplierReliability: 0.95,
    cancellationRisk: 0.05,
    operationalEffort: 0.10,
    bsiScore: 94,
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop',
    rating: 4.9,
    amenities: ['Free WiFi', 'Spa', 'Pool', 'Fine Dining', 'Concierge'],
    conflicts: [
      { type: 'budget', severity: 'low', description: 'Slightly over budget but offers premium stability' }
    ],
    isRejected: false,
  },
  {
    id: 'opt-3',
    hotelName: 'City Star Inn',
    location: 'Mumbai, Maharashtra',
    price: 45000,
    refundable: false,
    supplierReliability: 0.68,
    cancellationRisk: 0.35,
    operationalEffort: 0.45,
    bsiScore: 42,
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
    rating: 3.5,
    amenities: ['Free WiFi', 'Parking'],
    conflicts: [
      { type: 'refundability', severity: 'high', description: 'Non-refundable conflicts with corporate requirement' },
      { type: 'reliability', severity: 'medium', description: 'Lower supplier reliability score' }
    ],
    isRejected: true,
    rejectionReason: 'Non-refundable policy conflicts with corporate client requirements. High cancellation risk detected.',
  },
  {
    id: 'opt-4',
    hotelName: 'Oberoi Business Bay',
    location: 'Mumbai, Maharashtra',
    price: 82000,
    refundable: true,
    supplierReliability: 0.88,
    cancellationRisk: 0.12,
    operationalEffort: 0.20,
    bsiScore: 79,
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
    rating: 4.6,
    amenities: ['Free WiFi', 'Gym', 'Meeting Rooms', 'Restaurant'],
    conflicts: [],
    isRejected: false,
  },
  {
    id: 'opt-5',
    hotelName: 'Budget Express',
    location: 'Mumbai, Maharashtra',
    price: 32000,
    refundable: false,
    supplierReliability: 0.55,
    cancellationRisk: 0.48,
    operationalEffort: 0.60,
    bsiScore: 28,
    imageUrl: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=300&fit=crop',
    rating: 2.8,
    amenities: ['WiFi'],
    conflicts: [
      { type: 'refundability', severity: 'high', description: 'Non-refundable policy' },
      { type: 'reliability', severity: 'high', description: 'Very low supplier reliability' },
      { type: 'risk', severity: 'high', description: 'High cancellation probability' }
    ],
    isRejected: true,
    rejectionReason: 'Multiple high-severity conflicts: Non-refundable, unreliable supplier, high cancellation risk. Not suitable for corporate bookings.',
  },
];

export const defaultConstraints: AgentConstraints = {
  destination: 'Mumbai',
  checkIn: '2025-02-15',
  checkOut: '2025-02-18',
  budget: 90000,
  refundabilityRequired: true,
  dateFlexibility: 'low',
  clientType: 'corporate',
};
