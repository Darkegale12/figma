import { ZoneData } from '../types/map-types';
import { LatLngExpression } from 'leaflet';

// Mock zone data for Pune city segments with realistic boundaries
export const mockZones: ZoneData[] = [
  {
    id: 'zone-1',
    name: 'Shivajinagar',
    riskLevel: 'high',
    coordinates: [
      [18.5304, 73.8467],
      [18.5350, 73.8520],
      [18.5380, 73.8550],
      [18.5400, 73.8600],
      [18.5380, 73.8650],
      [18.5320, 73.8640],
      [18.5280, 73.8550],
    ] as LatLngExpression[],
    metrics: {
      population: 65000,
      recentCases: 78,
      trapCount: 4,
      temperature: 33,
      humidity: 78,
      caseTrend: 'increasing',
    },
    riskComponents: {
      breeding: 45,
      environmental: 35,
      transmission: 20,
    },
    drivers: [
      {
        factor: 'High standing water accumulation',
        impact: 'high',
        type: 'transient',
        lastUpdated: '2 days ago',
      },
      {
        factor: 'Dense population cluster',
        impact: 'high',
        type: 'static',
        lastUpdated: '1 week ago',
      },
      {
        factor: 'Recent rainfall (45mm)',
        impact: 'medium',
        type: 'transient',
        lastUpdated: '3 days ago',
      },
    ],
    recommendation: {
      action: 'Immediate fogging and larval control',
      priority: 'immediate',
      details:
        'Deploy fogging teams within 24 hours. Conduct door-to-door surveys for breeding sites. Increase trap density to 8 per zone. Community awareness campaign needed.',
    },
  },
  {
    id: 'zone-2',
    name: 'Koregaon Park',
    riskLevel: 'medium',
    coordinates: [
      [18.5404, 73.8867],
      [18.5480, 73.8900],
      [18.5520, 73.8950],
      [18.5550, 73.9000],
      [18.5520, 73.9050],
      [18.5450, 73.9030],
      [18.5400, 73.8950],
    ] as LatLngExpression[],
    metrics: {
      population: 38000,
      recentCases: 24,
      trapCount: 6,
      temperature: 31,
      humidity: 72,
      caseTrend: 'stable',
    },
    riskComponents: {
      breeding: 30,
      environmental: 40,
      transmission: 30,
    },
    drivers: [
      {
        factor: 'Moderate vector presence',
        impact: 'medium',
        type: 'transient',
        lastUpdated: '1 day ago',
      },
      {
        factor: 'Good trap coverage',
        impact: 'low',
        type: 'static',
        lastUpdated: '5 days ago',
      },
    ],
    recommendation: {
      action: 'Scheduled surveillance and preventive measures',
      priority: 'scheduled',
      details:
        'Maintain current trap levels. Schedule fogging for next week if case trend shifts. Continue weekly monitoring. Focus on public spaces and parks.',
    },
  },
  {
    id: 'zone-3',
    name: 'Kothrud',
    riskLevel: 'low',
    coordinates: [
      [18.4980, 73.8280],
      [18.5080, 73.8320],
      [18.5150, 73.8400],
      [18.5180, 73.8480],
      [18.5140, 73.8550],
      [18.5060, 73.8520],
      [18.4990, 73.8450],
      [18.4960, 73.8370],
    ] as LatLngExpression[],
    metrics: {
      population: 42000,
      recentCases: 8,
      trapCount: 9,
      temperature: 29,
      humidity: 65,
      caseTrend: 'decreasing',
    },
    riskComponents: {
      breeding: 20,
      environmental: 25,
      transmission: 55,
    },
    drivers: [
      {
        factor: 'Excellent trap coverage',
        impact: 'low',
        type: 'static',
        lastUpdated: '1 week ago',
      },
      {
        factor: 'Recent control measures effective',
        impact: 'low',
        type: 'transient',
        lastUpdated: '4 days ago',
      },
    ],
    recommendation: {
      action: 'Continue routine monitoring',
      priority: 'monitor',
      details:
        'Maintain current surveillance protocols. No immediate intervention required. Review status in 2 weeks. Keep community informed of positive trends.',
    },
  },
  {
    id: 'zone-4',
    name: 'Deccan Gymkhana',
    riskLevel: 'high',
    coordinates: [
      [18.5104, 73.8467],
      [18.5180, 73.8500],
      [18.5220, 73.8560],
      [18.5240, 73.8620],
      [18.5200, 73.8680],
      [18.5130, 73.8660],
      [18.5080, 73.8580],
    ] as LatLngExpression[],
    metrics: {
      population: 55000,
      recentCases: 92,
      trapCount: 3,
      temperature: 34,
      humidity: 82,
      caseTrend: 'increasing',
    },
    riskComponents: {
      breeding: 50,
      environmental: 30,
      transmission: 20,
    },
    drivers: [
      {
        factor: 'Construction sites with water storage',
        impact: 'high',
        type: 'static',
        lastUpdated: '2 days ago',
      },
      {
        factor: 'Insufficient trap coverage',
        impact: 'high',
        type: 'static',
        lastUpdated: '1 week ago',
      },
      {
        factor: 'High temperature and humidity',
        impact: 'high',
        type: 'transient',
        lastUpdated: '1 day ago',
      },
    ],
    recommendation: {
      action: 'Urgent intervention and expanded surveillance',
      priority: 'immediate',
      details:
        'Deploy emergency response team. Inspect all construction sites. Triple trap density to 9 units. Conduct intensive fogging for 3 consecutive days. Issue public health advisory.',
    },
  },
  {
    id: 'zone-5',
    name: 'Viman Nagar',
    riskLevel: 'medium',
    coordinates: [
      [18.5604, 73.9067],
      [18.5670, 73.9100],
      [18.5720, 73.9180],
      [18.5740, 73.9250],
      [18.5700, 73.9300],
      [18.5630, 73.9280],
      [18.5590, 73.9200],
    ] as LatLngExpression[],
    metrics: {
      population: 48000,
      recentCases: 31,
      trapCount: 5,
      temperature: 30,
      humidity: 70,
      caseTrend: 'stable',
    },
    riskComponents: {
      breeding: 35,
      environmental: 35,
      transmission: 30,
    },
    drivers: [
      {
        factor: 'Commercial area with moderate risk',
        impact: 'medium',
        type: 'static',
        lastUpdated: '3 days ago',
      },
      {
        factor: 'Adequate but not optimal trap density',
        impact: 'medium',
        type: 'static',
        lastUpdated: '6 days ago',
      },
    ],
    recommendation: {
      action: 'Enhance monitoring and add 2 traps',
      priority: 'scheduled',
      details:
        'Increase trap count to 7. Schedule fogging if cases increase above 40. Focus on commercial complexes and apartment communities. Weekly review recommended.',
    },
  },
  {
    id: 'zone-6',
    name: 'Aundh',
    riskLevel: 'low',
    coordinates: [
      [18.5480, 73.8050],
      [18.5560, 73.8100],
      [18.5620, 73.8180],
      [18.5650, 73.8260],
      [18.5610, 73.8320],
      [18.5540, 73.8300],
      [18.5480, 73.8240],
      [18.5450, 73.8160],
    ] as LatLngExpression[],
    metrics: {
      population: 35000,
      recentCases: 6,
      trapCount: 8,
      temperature: 28,
      humidity: 62,
      caseTrend: 'decreasing',
    },
    riskComponents: {
      breeding: 15,
      environmental: 30,
      transmission: 55,
    },
    drivers: [
      {
        factor: 'Well-maintained residential area',
        impact: 'low',
        type: 'static',
        lastUpdated: '1 week ago',
      },
      {
        factor: 'Strong community participation',
        impact: 'low',
        type: 'static',
        lastUpdated: '5 days ago',
      },
    ],
    recommendation: {
      action: 'Maintain current status',
      priority: 'monitor',
      details:
        'Continue bi-weekly monitoring. Maintain trap infrastructure. Recognize community efforts. Use as model for other zones.',
    },
  },
  {
    id: 'zone-7',
    name: 'Hadapsar',
    riskLevel: 'high',
    coordinates: [
      [18.4904, 73.9267],
      [18.4980, 73.9300],
      [18.5030, 73.9380],
      [18.5060, 73.9450],
      [18.5020, 73.9510],
      [18.4950, 73.9490],
      [18.4900, 73.9420],
    ] as LatLngExpression[],
    metrics: {
      population: 72000,
      recentCases: 105,
      trapCount: 4,
      temperature: 35,
      humidity: 85,
      caseTrend: 'increasing',
    },
    riskComponents: {
      breeding: 55,
      environmental: 25,
      transmission: 20,
    },
    drivers: [
      {
        factor: 'Industrial area with poor drainage',
        impact: 'high',
        type: 'static',
        lastUpdated: '1 day ago',
      },
      {
        factor: 'Very high population density',
        impact: 'high',
        type: 'static',
        lastUpdated: '1 week ago',
      },
      {
        factor: 'Monsoon water accumulation',
        impact: 'high',
        type: 'transient',
        lastUpdated: '2 days ago',
      },
    ],
    recommendation: {
      action: 'Critical intervention required',
      priority: 'immediate',
      details:
        'Declare as high-priority zone. Deploy maximum resources. Coordinate with municipal drainage department. Intensive 5-day fogging program. Increase traps to 12. Daily case monitoring.',
    },
  },
  {
    id: 'zone-8',
    name: 'Baner',
    riskLevel: 'low',
    coordinates: [
      [18.5604, 73.7867],
      [18.5670, 73.7910],
      [18.5720, 73.7980],
      [18.5740, 73.8050],
      [18.5700, 73.8100],
      [18.5640, 73.8080],
      [18.5590, 73.8010],
    ] as LatLngExpression[],
    metrics: {
      population: 40000,
      recentCases: 12,
      trapCount: 7,
      temperature: 29,
      humidity: 68,
      caseTrend: 'stable',
    },
    riskComponents: {
      breeding: 25,
      environmental: 35,
      transmission: 40,
    },
    drivers: [
      {
        factor: 'Planned residential layout',
        impact: 'low',
        type: 'static',
        lastUpdated: '4 days ago',
      },
      {
        factor: 'Good sanitation coverage',
        impact: 'low',
        type: 'static',
        lastUpdated: '1 week ago',
      },
    ],
    recommendation: {
      action: 'Standard monitoring protocol',
      priority: 'monitor',
      details:
        'Continue routine surveillance. Maintain 7 traps. Monthly review sufficient. Engage with residential welfare associations for awareness.',
    },
  },
  {
    id: 'pond-area',
    name: 'MMCOE Hill',
    riskLevel: 'high',
    coordinates: [
      [18.4958, 73.7963],  // NW - ~500m radius
      [18.4947, 73.8008],  // N
      [18.4958, 73.8053],  // NE
      [18.4947, 73.8063],  // E
      [18.4913, 73.8063],  // SE
      [18.4868, 73.8053],  // S
      [18.4868, 73.8008],  // SW
      [18.4878, 73.7963],  // W
      [18.4913, 73.7953],  // Back to start area
    ] as LatLngExpression[],
    metrics: {
      population: 28000,
      recentCases: 72,
      trapCount: 2,
      temperature: 34,
      humidity: 80,
      caseTrend: 'increasing',
    },
    riskComponents: {
      breeding: 60,
      environmental: 25,
      transmission: 15,
    },
    drivers: [
      {
        factor: 'Large stagnant pond with breeding',
        impact: 'high',
        type: 'static',
        lastUpdated: '1 day ago',
      },
      {
        factor: 'Poor drainage infrastructure',
        impact: 'high',
        type: 'static',
        lastUpdated: '2 days ago',
      },
      {
        factor: 'High mosquito larvae density',
        impact: 'high',
        type: 'transient',
        lastUpdated: '1 day ago',
      },
    ],
    recommendation: {
      action: 'Emergency intervention with source reduction',
      priority: 'immediate',
      details:
        'Immediate fogging required at Lotus pond - MMCOE (18.491292, 73.800823). Deploy larvicide treatment. Coordinate with drainage authority for permanent solution. Install 4 additional traps. Daily monitoring for next 2 weeks.',
    },
  },
];