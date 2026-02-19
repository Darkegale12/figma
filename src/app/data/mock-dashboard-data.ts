// Mock data for dashboard analytics and KPIs

export interface FoggingInstance {
  id: string;
  zoneId: string;
  zoneName: string;
  date: string;
  area: number; // in sq meters
  duration: number; // in minutes
  team: string;
  effectiveness: number; // 0-100
  status: 'completed' | 'scheduled' | 'in-progress';
}

export interface CasesByMonth {
  month: string;
  cases: number;
  deaths: number;
  recovered: number;
}

export interface ZonePerformance {
  zoneId: string;
  zoneName: string;
  cases: number;
  foggingCount: number;
  trapEfficiency: number; // 0-100
  responseTime: number; // in hours
  breedingSitesEliminated: number;
  riskLevel: 'high' | 'medium' | 'low';
}

// Fogging operations over last 3 months
export const foggingInstances: FoggingInstance[] = [
  // December 2025
  { id: 'fog-001', zoneId: 'zone-1', zoneName: 'Shivajinagar', date: '2025-12-05', area: 45000, duration: 180, team: 'Team A', effectiveness: 85, status: 'completed' },
  { id: 'fog-002', zoneId: 'zone-4', zoneName: 'Deccan Gymkhana', date: '2025-12-08', area: 38000, duration: 165, team: 'Team B', effectiveness: 82, status: 'completed' },
  { id: 'fog-003', zoneId: 'zone-7', zoneName: 'Hadapsar', date: '2025-12-12', area: 52000, duration: 195, team: 'Team C', effectiveness: 88, status: 'completed' },
  { id: 'fog-004', zoneId: 'zone-1', zoneName: 'Shivajinagar', date: '2025-12-15', area: 45000, duration: 175, team: 'Team A', effectiveness: 87, status: 'completed' },
  { id: 'fog-005', zoneId: 'zone-5', zoneName: 'Viman Nagar', date: '2025-12-18', area: 32000, duration: 150, team: 'Team D', effectiveness: 80, status: 'completed' },
  { id: 'fog-006', zoneId: 'zone-4', zoneName: 'Deccan Gymkhana', date: '2025-12-22', area: 38000, duration: 170, team: 'Team B', effectiveness: 84, status: 'completed' },
  { id: 'fog-007', zoneId: 'zone-7', zoneName: 'Hadapsar', date: '2025-12-28', area: 52000, duration: 200, team: 'Team C', effectiveness: 90, status: 'completed' },
  
  // January 2026
  { id: 'fog-008', zoneId: 'zone-1', zoneName: 'Shivajinagar', date: '2026-01-03', area: 45000, duration: 182, team: 'Team A', effectiveness: 86, status: 'completed' },
  { id: 'fog-009', zoneId: 'zone-2', zoneName: 'Koregaon Park', date: '2026-01-07', area: 28000, duration: 140, team: 'Team D', effectiveness: 78, status: 'completed' },
  { id: 'fog-010', zoneId: 'zone-4', zoneName: 'Deccan Gymkhana', date: '2026-01-10', area: 38000, duration: 168, team: 'Team B', effectiveness: 83, status: 'completed' },
  { id: 'fog-011', zoneId: 'zone-7', zoneName: 'Hadapsar', date: '2026-01-14', area: 52000, duration: 198, team: 'Team C', effectiveness: 89, status: 'completed' },
  { id: 'fog-012', zoneId: 'zone-5', zoneName: 'Viman Nagar', date: '2026-01-18', area: 32000, duration: 155, team: 'Team D', effectiveness: 81, status: 'completed' },
  { id: 'fog-013', zoneId: 'zone-1', zoneName: 'Shivajinagar', date: '2026-01-22', area: 45000, duration: 178, team: 'Team A', effectiveness: 85, status: 'completed' },
  { id: 'fog-014', zoneId: 'zone-4', zoneName: 'Deccan Gymkhana', date: '2026-01-26', area: 38000, duration: 172, team: 'Team B', effectiveness: 84, status: 'completed' },
  { id: 'fog-015', zoneId: 'zone-7', zoneName: 'Hadapsar', date: '2026-01-30', area: 52000, duration: 202, team: 'Team C', effectiveness: 91, status: 'completed' },
  
  // February 2026
  { id: 'fog-016', zoneId: 'zone-1', zoneName: 'Shivajinagar', date: '2026-02-04', area: 45000, duration: 180, team: 'Team A', effectiveness: 86, status: 'completed' },
  { id: 'fog-017', zoneId: 'zone-3', zoneName: 'Kothrud', date: '2026-02-06', area: 25000, duration: 130, team: 'Team D', effectiveness: 75, status: 'completed' },
  { id: 'fog-018', zoneId: 'zone-4', zoneName: 'Deccan Gymkhana', date: '2026-02-09', area: 38000, duration: 169, team: 'Team B', effectiveness: 83, status: 'completed' },
  { id: 'fog-019', zoneId: 'zone-7', zoneName: 'Hadapsar', date: '2026-02-11', area: 52000, duration: 197, team: 'Team C', effectiveness: 88, status: 'in-progress' },
  { id: 'fog-020', zoneId: 'zone-5', zoneName: 'Viman Nagar', date: '2026-02-14', area: 32000, duration: 152, team: 'Team D', effectiveness: 80, status: 'scheduled' },
  { id: 'fog-021', zoneId: 'zone-1', zoneName: 'Shivajinagar', date: '2026-02-18', area: 45000, duration: 0, team: 'Team A', effectiveness: 0, status: 'scheduled' },
  { id: 'fog-022', zoneId: 'zone-4', zoneName: 'Deccan Gymkhana', date: '2026-02-22', area: 38000, duration: 0, team: 'Team B', effectiveness: 0, status: 'scheduled' },
  
  // MMCOE Hill operations
  { id: 'fog-023', zoneId: 'pond-area', zoneName: 'MMCOE Hill', date: '2025-12-20', area: 22000, duration: 125, team: 'Team C', effectiveness: 68, status: 'completed' },
  { id: 'fog-024', zoneId: 'pond-area', zoneName: 'MMCOE Hill', date: '2026-01-08', area: 22000, duration: 130, team: 'Team D', effectiveness: 72, status: 'completed' },
  { id: 'fog-025', zoneId: 'pond-area', zoneName: 'MMCOE Hill', date: '2026-01-20', area: 22000, duration: 135, team: 'Team C', effectiveness: 75, status: 'completed' },
  { id: 'fog-026', zoneId: 'pond-area', zoneName: 'MMCOE Hill', date: '2026-02-02', area: 22000, duration: 128, team: 'Team D', effectiveness: 70, status: 'completed' },
  { id: 'fog-027', zoneId: 'pond-area', zoneName: 'MMCOE Hill', date: '2026-02-13', area: 22000, duration: 140, team: 'Team C', effectiveness: 78, status: 'completed' },
];

// Cases trend over last 3 months (weekly breakdown)
export const casesTrend: CasesByMonth[] = [
  { month: 'Dec W1', cases: 45, deaths: 2, recovered: 38 },
  { month: 'Dec W2', cases: 52, deaths: 3, recovered: 42 },
  { month: 'Dec W3', cases: 48, deaths: 1, recovered: 44 },
  { month: 'Dec W4', cases: 58, deaths: 2, recovered: 48 },
  { month: 'Jan W1', cases: 62, deaths: 3, recovered: 51 },
  { month: 'Jan W2', cases: 55, deaths: 2, recovered: 49 },
  { month: 'Jan W3', cases: 51, deaths: 1, recovered: 47 },
  { month: 'Jan W4', cases: 48, deaths: 2, recovered: 45 },
  { month: 'Feb W1', cases: 44, deaths: 1, recovered: 41 },
  { month: 'Feb W2', cases: 40, deaths: 1, recovered: 38 },
  { month: 'Feb W3', cases: 38, deaths: 0, recovered: 37 },
];

// Zone performance metrics
export const zonePerformance: ZonePerformance[] = [
  {
    zoneId: 'zone-1',
    zoneName: 'Shivajinagar',
    cases: 78,
    foggingCount: 6,
    trapEfficiency: 72,
    responseTime: 6,
    breedingSitesEliminated: 45,
    riskLevel: 'high',
  },
  {
    zoneId: 'zone-2',
    zoneName: 'Koregaon Park',
    cases: 24,
    foggingCount: 2,
    trapEfficiency: 85,
    responseTime: 12,
    breedingSitesEliminated: 18,
    riskLevel: 'medium',
  },
  {
    zoneId: 'zone-3',
    zoneName: 'Kothrud',
    cases: 8,
    foggingCount: 1,
    trapEfficiency: 92,
    responseTime: 24,
    breedingSitesEliminated: 12,
    riskLevel: 'low',
  },
  {
    zoneId: 'zone-4',
    zoneName: 'Deccan Gymkhana',
    cases: 92,
    foggingCount: 7,
    trapEfficiency: 68,
    responseTime: 5,
    breedingSitesEliminated: 52,
    riskLevel: 'high',
  },
  {
    zoneId: 'zone-5',
    zoneName: 'Viman Nagar',
    cases: 31,
    foggingCount: 3,
    trapEfficiency: 80,
    responseTime: 10,
    breedingSitesEliminated: 22,
    riskLevel: 'medium',
  },
  {
    zoneId: 'zone-6',
    zoneName: 'Aundh',
    cases: 6,
    foggingCount: 0,
    trapEfficiency: 95,
    responseTime: 36,
    breedingSitesEliminated: 8,
    riskLevel: 'low',
  },
  {
    zoneId: 'zone-7',
    zoneName: 'Hadapsar',
    cases: 105,
    foggingCount: 8,
    trapEfficiency: 65,
    responseTime: 4,
    breedingSitesEliminated: 68,
    riskLevel: 'high',
  },
  {
    zoneId: 'zone-8',
    zoneName: 'Baner',
    cases: 12,
    foggingCount: 0,
    trapEfficiency: 88,
    responseTime: 30,
    breedingSitesEliminated: 10,
    riskLevel: 'low',
  },
  {
    zoneId: 'pond-area',
    zoneName: 'MMCOE Hill',
    cases: 72,
    foggingCount: 5,
    trapEfficiency: 58,
    responseTime: 8,
    breedingSitesEliminated: 38,
    riskLevel: 'high',
  },
];

// Daily operations summary
export const dailyOperations = {
  teamsDeployed: 4,
  areasCovoered: 185000, // sq meters
  trapsChecked: 52,
  breedingSitesFound: 18,
  breedingSitesEliminated: 15,
  foggingScheduled: 3,
};

// Resource allocation
export const resourceAllocation = {
  totalBudget: 5000000, // in INR
  spent: 3250000,
  teams: 4,
  traps: 52,
  foggingMachines: 8,
  vehicles: 6,
};