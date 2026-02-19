import { Hotspot } from '../types/map-types';

// Zone-specific hotspots with realistic locations
// Each hotspot represents a potential mosquito breeding site (pond, lake, stagnant water)

// Shivajinagar hotspots (High risk zone)
const shivajinagar_hotspots: Hotspot[] = [
  { id: 'shiv-1', name: 'Shivajinagar Garden Pond', center: [18.5330, 73.8500], area: 20, riskLevel: 'high', cases: 12, lastUpdated: '1 day ago', zoneId: 'zone-1' },
  { id: 'shiv-2', name: 'Parvati Hill Reservoir', center: [18.5310, 73.8520], area: 20, riskLevel: 'high', cases: 15, lastUpdated: '1 day ago', zoneId: 'zone-1' },
  { id: 'shiv-3', name: 'JM Road Drainage', center: [18.5350, 73.8540], area: 20, riskLevel: 'high', cases: 10, lastUpdated: '2 days ago', zoneId: 'zone-1' },
  { id: 'shiv-4', name: 'Ghole Road Water Tank', center: [18.5360, 73.8570], area: 20, riskLevel: 'high', cases: 8, lastUpdated: '1 day ago', zoneId: 'zone-1' },
  { id: 'shiv-5', name: 'Bajirao Road Gutter', center: [18.5340, 73.8600], area: 20, riskLevel: 'medium', cases: 6, lastUpdated: '2 days ago', zoneId: 'zone-1' },
  { id: 'shiv-6', name: 'Corporation Building Pool', center: [18.5320, 73.8580], area: 20, riskLevel: 'high', cases: 11, lastUpdated: '1 day ago', zoneId: 'zone-1' },
  { id: 'shiv-7', name: 'Market Area Drains', center: [18.5300, 73.8560], area: 20, riskLevel: 'medium', cases: 7, lastUpdated: '2 days ago', zoneId: 'zone-1' },
  { id: 'shiv-8', name: 'Hospital Campus Pond', center: [18.5370, 73.8620], area: 20, riskLevel: 'high', cases: 9, lastUpdated: '1 day ago', zoneId: 'zone-1' },
];

// Koregaon Park hotspots (Medium risk zone)
const koregaon_hotspots: Hotspot[] = [
  { id: 'kp-1', name: 'Aga Khan Palace Lake', center: [18.5440, 73.8920], area: 20, riskLevel: 'medium', cases: 5, lastUpdated: '2 days ago', zoneId: 'zone-2' },
  { id: 'kp-2', name: 'Mula River Bank', center: [18.5470, 73.8950], area: 20, riskLevel: 'medium', cases: 6, lastUpdated: '1 day ago', zoneId: 'zone-2' },
  { id: 'kp-3', name: 'North Main Road Pond', center: [18.5490, 73.8980], area: 20, riskLevel: 'low', cases: 3, lastUpdated: '3 days ago', zoneId: 'zone-2' },
  { id: 'kp-4', name: 'Club Area Water Feature', center: [18.5510, 73.9010], area: 20, riskLevel: 'medium', cases: 4, lastUpdated: '2 days ago', zoneId: 'zone-2' },
  { id: 'kp-5', name: 'Garden Society Pool', center: [18.5430, 73.8970], area: 20, riskLevel: 'low', cases: 2, lastUpdated: '3 days ago', zoneId: 'zone-2' },
  { id: 'kp-6', name: 'Park Avenue Drainage', center: [18.5460, 73.9000], area: 20, riskLevel: 'medium', cases: 4, lastUpdated: '2 days ago', zoneId: 'zone-2' },
];

// Kothrud hotspots (Low risk zone)
const kothrud_hotspots: Hotspot[] = [
  { id: 'koth-1', name: 'Karve Road Garden Pond', center: [18.5020, 73.8320], area: 20, riskLevel: 'low', cases: 1, lastUpdated: '4 days ago', zoneId: 'zone-3' },
  { id: 'koth-2', name: 'Paud Road Water Tank', center: [18.5060, 73.8360], area: 20, riskLevel: 'low', cases: 2, lastUpdated: '3 days ago', zoneId: 'zone-3' },
  { id: 'koth-3', name: 'Mayur Colony Pond', center: [18.5100, 73.8400], area: 20, riskLevel: 'low', cases: 1, lastUpdated: '5 days ago', zoneId: 'zone-3' },
  { id: 'koth-4', name: 'Kothrud Depot Lake', center: [18.5130, 73.8440], area: 20, riskLevel: 'medium', cases: 3, lastUpdated: '2 days ago', zoneId: 'zone-3' },
  { id: 'koth-5', name: 'Ideal Colony Pool', center: [18.5110, 73.8480], area: 20, riskLevel: 'low', cases: 1, lastUpdated: '4 days ago', zoneId: 'zone-3' },
  { id: 'koth-6', name: 'Karve Nagar Garden', center: [18.5070, 73.8420], area: 20, riskLevel: 'low', cases: 0, lastUpdated: '6 days ago', zoneId: 'zone-3' },
  { id: 'koth-7', name: 'Warje Road Drainage', center: [18.5000, 73.8380], area: 20, riskLevel: 'low', cases: 0, lastUpdated: '5 days ago', zoneId: 'zone-3' },
  { id: 'koth-8', name: 'MIT College Pond', center: [18.5150, 73.8500], area: 20, riskLevel: 'low', cases: 0, lastUpdated: '6 days ago', zoneId: 'zone-3' },
];

// Deccan Gymkhana hotspots (High risk zone)
const deccan_hotspots: Hotspot[] = [
  { id: 'dec-1', name: 'Ferguson College Lake', center: [18.5140, 73.8520], area: 20, riskLevel: 'high', cases: 14, lastUpdated: '1 day ago', zoneId: 'zone-4' },
  { id: 'dec-2', name: 'Goodluck Cafe Area Pond', center: [18.5170, 73.8550], area: 20, riskLevel: 'high', cases: 16, lastUpdated: '1 day ago', zoneId: 'zone-4' },
  { id: 'dec-3', name: 'Law College Road Tank', center: [18.5200, 73.8590], area: 20, riskLevel: 'high', cases: 12, lastUpdated: '1 day ago', zoneId: 'zone-4' },
  { id: 'dec-4', name: 'Deccan Corner Drainage', center: [18.5220, 73.8630], area: 20, riskLevel: 'high', cases: 13, lastUpdated: '1 day ago', zoneId: 'zone-4' },
  { id: 'dec-5', name: 'Pune University Pool', center: [18.5180, 73.8610], area: 20, riskLevel: 'high', cases: 11, lastUpdated: '2 days ago', zoneId: 'zone-4' },
  { id: 'dec-6', name: 'Karve Road Construction', center: [18.5130, 73.8560], area: 20, riskLevel: 'high', cases: 10, lastUpdated: '1 day ago', zoneId: 'zone-4' },
  { id: 'dec-7', name: 'BMC Road Water Body', center: [18.5160, 73.8640], area: 20, riskLevel: 'medium', cases: 8, lastUpdated: '2 days ago', zoneId: 'zone-4' },
  { id: 'dec-8', name: 'Tilak Road Gutter', center: [18.5110, 73.8590], area: 20, riskLevel: 'high', cases: 9, lastUpdated: '1 day ago', zoneId: 'zone-4' },
];

// Viman Nagar hotspots (Medium risk zone)
const viman_hotspots: Hotspot[] = [
  { id: 'vim-1', name: 'Airport Road Pond', center: [18.5640, 73.9120], area: 20, riskLevel: 'medium', cases: 5, lastUpdated: '2 days ago', zoneId: 'zone-5' },
  { id: 'vim-2', name: 'Phoenix Mall Area Tank', center: [18.5670, 73.9160], area: 20, riskLevel: 'medium', cases: 6, lastUpdated: '1 day ago', zoneId: 'zone-5' },
  { id: 'vim-3', name: 'Nagar Road Drainage', center: [18.5700, 73.9200], area: 20, riskLevel: 'medium', cases: 4, lastUpdated: '2 days ago', zoneId: 'zone-5' },
  { id: 'vim-4', name: 'Tech Park Lake', center: [18.5710, 73.9240], area: 20, riskLevel: 'low', cases: 3, lastUpdated: '3 days ago', zoneId: 'zone-5' },
  { id: 'vim-5', name: 'Ruby Hall Pond', center: [18.5650, 73.9180], area: 20, riskLevel: 'medium', cases: 5, lastUpdated: '2 days ago', zoneId: 'zone-5' },
  { id: 'vim-6', name: 'Kalyani Nagar Pool', center: [18.5620, 73.9140], area: 20, riskLevel: 'medium', cases: 4, lastUpdated: '2 days ago', zoneId: 'zone-5' },
  { id: 'vim-7', name: 'Datta Mandir Area', center: [18.5690, 73.9260], area: 20, riskLevel: 'low', cases: 2, lastUpdated: '3 days ago', zoneId: 'zone-5' },
];

// Aundh hotspots (Low risk zone)
const aundh_hotspots: Hotspot[] = [
  { id: 'aundh-1', name: 'University Road Pond', center: [18.5520, 73.8130], area: 20, riskLevel: 'low', cases: 1, lastUpdated: '5 days ago', zoneId: 'zone-6' },
  { id: 'aundh-2', name: 'IT Park Lake', center: [18.5570, 73.8180], area: 20, riskLevel: 'low', cases: 2, lastUpdated: '4 days ago', zoneId: 'zone-6' },
  { id: 'aundh-3', name: 'Blue Ridge Garden', center: [18.5600, 73.8220], area: 20, riskLevel: 'low', cases: 1, lastUpdated: '5 days ago', zoneId: 'zone-6' },
  { id: 'aundh-4', name: 'Megapolis Area Pool', center: [18.5630, 73.8270], area: 20, riskLevel: 'low', cases: 1, lastUpdated: '4 days ago', zoneId: 'zone-6' },
  { id: 'aundh-5', name: 'Pashan Lake', center: [18.5590, 73.8160], area: 20, riskLevel: 'low', cases: 0, lastUpdated: '6 days ago', zoneId: 'zone-6' },
  { id: 'aundh-6', name: 'Baner Link Road Tank', center: [18.5550, 73.8240], area: 20, riskLevel: 'low', cases: 1, lastUpdated: '5 days ago', zoneId: 'zone-6' },
  { id: 'aundh-7', name: 'Aundh Park Pond', center: [18.5510, 73.8190], area: 20, riskLevel: 'low', cases: 0, lastUpdated: '7 days ago', zoneId: 'zone-6' },
];

// Hadapsar hotspots (High risk zone)
const hadapsar_hotspots: Hotspot[] = [
  { id: 'had-1', name: 'Magarpatta Lake', center: [18.4940, 73.9320], area: 20, riskLevel: 'high', cases: 18, lastUpdated: '1 day ago', zoneId: 'zone-7' },
  { id: 'had-2', name: 'EON Mall Pond', center: [18.4980, 73.9360], area: 20, riskLevel: 'high', cases: 16, lastUpdated: '1 day ago', zoneId: 'zone-7' },
  { id: 'had-3', name: 'Hadapsar Industrial Tank', center: [18.5010, 73.9400], area: 20, riskLevel: 'high', cases: 20, lastUpdated: '1 day ago', zoneId: 'zone-7' },
  { id: 'had-4', name: 'Mundhwa Drainage', center: [18.5040, 73.9440], area: 20, riskLevel: 'high', cases: 15, lastUpdated: '1 day ago', zoneId: 'zone-7' },
  { id: 'had-5', name: 'Airport Road Pool', center: [18.5020, 73.9480], area: 20, riskLevel: 'high', cases: 14, lastUpdated: '1 day ago', zoneId: 'zone-7' },
  { id: 'had-6', name: 'Kharadi IT Park Lake', center: [18.4960, 73.9390], area: 20, riskLevel: 'high', cases: 12, lastUpdated: '2 days ago', zoneId: 'zone-7' },
  { id: 'had-7', name: 'Seasonal Water Body', center: [18.4920, 73.9340], area: 20, riskLevel: 'high', cases: 10, lastUpdated: '2 days ago', zoneId: 'zone-7' },
];

// Baner hotspots (Low risk zone)
const baner_hotspots: Hotspot[] = [
  { id: 'ban-1', name: 'Baner Balewadi Road Pond', center: [18.5640, 73.7910], area: 20, riskLevel: 'low', cases: 2, lastUpdated: '4 days ago', zoneId: 'zone-8' },
  { id: 'ban-2', name: 'Aundh-Baner Link Pool', center: [18.5680, 73.7960], area: 20, riskLevel: 'low', cases: 3, lastUpdated: '3 days ago', zoneId: 'zone-8' },
  { id: 'ban-3', name: 'Balewadi Stadium Lake', center: [18.5710, 73.8010], area: 20, riskLevel: 'low', cases: 2, lastUpdated: '4 days ago', zoneId: 'zone-8' },
  { id: 'ban-4', name: 'Baner IT Park Tank', center: [18.5720, 73.8050], area: 20, riskLevel: 'low', cases: 1, lastUpdated: '5 days ago', zoneId: 'zone-8' },
  { id: 'ban-5', name: 'SUS Road Drainage', center: [18.5670, 73.8020], area: 20, riskLevel: 'low', cases: 2, lastUpdated: '4 days ago', zoneId: 'zone-8' },
  { id: 'ban-6', name: 'Baner Garden Pond', center: [18.5630, 73.7950], area: 20, riskLevel: 'low', cases: 1, lastUpdated: '5 days ago', zoneId: 'zone-8' },
  { id: 'ban-7', name: 'Residential Society Pool', center: [18.5690, 73.8070], area: 20, riskLevel: 'low', cases: 1, lastUpdated: '6 days ago', zoneId: 'zone-8' },
];

// Pond area hotspots (around 18.491292, 73.800823) - keeping existing
const pond_hotspots: Hotspot[] = [
  { id: 'pond-1', name: 'Main Pond Center', center: [18.491292, 73.800823], area: 20, riskLevel: 'high', cases: 15, lastUpdated: '1 day ago', zoneId: 'pond-area' },
  { id: 'pond-2', name: 'Pond North Edge', center: [18.491392, 73.800823], area: 20, riskLevel: 'high', cases: 12, lastUpdated: '1 day ago', zoneId: 'pond-area' },
  { id: 'pond-3', name: 'Pond South Edge', center: [18.491192, 73.800823], area: 20, riskLevel: 'high', cases: 10, lastUpdated: '1 day ago', zoneId: 'pond-area' },
  { id: 'pond-4', name: 'Pond East Edge', center: [18.491292, 73.800923], area: 20, riskLevel: 'high', cases: 11, lastUpdated: '1 day ago', zoneId: 'pond-area' },
  { id: 'pond-5', name: 'Pond West Edge', center: [18.491292, 73.800723], area: 20, riskLevel: 'medium', cases: 8, lastUpdated: '2 days ago', zoneId: 'pond-area' },
  { id: 'pond-6', name: 'Surrounding Area NE', center: [18.491392, 73.800923], area: 20, riskLevel: 'medium', cases: 6, lastUpdated: '2 days ago', zoneId: 'pond-area' },
  { id: 'pond-7', name: 'Surrounding Area SE', center: [18.491192, 73.800923], area: 20, riskLevel: 'medium', cases: 5, lastUpdated: '3 days ago', zoneId: 'pond-area' },
  { id: 'pond-8', name: 'Surrounding Area SW', center: [18.491192, 73.800723], area: 20, riskLevel: 'low', cases: 3, lastUpdated: '3 days ago', zoneId: 'pond-area' },
  { id: 'pond-9', name: 'Surrounding Area NW', center: [18.491392, 73.800723], area: 20, riskLevel: 'low', cases: 2, lastUpdated: '4 days ago', zoneId: 'pond-area' },
];

// Combine all hotspots
export const mockHotspots: Hotspot[] = [
  ...shivajinagar_hotspots,
  ...koregaon_hotspots,
  ...kothrud_hotspots,
  ...deccan_hotspots,
  ...viman_hotspots,
  ...aundh_hotspots,
  ...hadapsar_hotspots,
  ...baner_hotspots,
  ...pond_hotspots,
];
