import { LatLngExpression } from 'leaflet';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskComponent {
  breeding: number;
  environmental: number;
  transmission: number;
}

export interface ZoneMetrics {
  population: number;
  recentCases: number;
  trapCount: number;
  temperature: number;
  humidity: number;
  caseTrend: 'increasing' | 'stable' | 'decreasing';
}

export interface RiskDriver {
  factor: string;
  impact: 'high' | 'medium' | 'low';
  type: 'static' | 'transient';
  lastUpdated: string;
}

export interface Hotspot {
  id: string;
  name: string;
  center: [number, number]; // [lat, lng]
  area: number; // in m^2
  riskLevel: RiskLevel;
  cases: number;
  lastUpdated: string;
  zoneId?: string; // Optional zone identifier
}

export interface ZoneData {
  id: string;
  name: string;
  riskLevel: RiskLevel;
  coordinates: LatLngExpression[];
  metrics: ZoneMetrics;
  riskComponents: RiskComponent;
  drivers: RiskDriver[];
  recommendation: {
    action: string;
    priority: 'immediate' | 'scheduled' | 'monitor';
    details: string;
  };
}