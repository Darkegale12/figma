import { mockHotspots } from './mock-hotspots';
import { mockZones } from './mock-zones';

export interface GridCell {
  id: string;
  bounds: [[number, number], [number, number]]; // SW, NE corners
  center: [number, number];
  value: number; // 0-1 normalized value
  label: string;
}

export interface GridLayer {
  id: string;
  name: string;
  data: GridCell[];
  colorScale: (value: number) => string;
}

// Grid size for 200m² cells = ~14.14m x 14.14m ≈ 0.00013 degrees at Pune latitude
const GRID_SIZE_DEG_200 = 0.00013;

// Generate a grid of 200m² cells around multiple hotspots for a zone
function generateMacroGrid(
  hotspots: Array<{center: [number, number]}>,
  valueGenerator: (lat: number, lng: number, nearestHotspotDist: number) => number,
  layerName: string,
  zoneId: string
): GridCell[] {
  const cells: GridCell[] = [];
  
  // For each hotspot, create a smaller 10x10 grid (200m² cells) around it to improve performance
  const gridRadius = 5; // 5 cells in each direction (reduced from 10)
  
  // Only process first 3 hotspots per zone for performance
  const limitedHotspots = hotspots.slice(0, 3);
  
  limitedHotspots.forEach((hotspot, hotspotIdx) => {
    const centerLat = hotspot.center[0];
    const centerLng = hotspot.center[1];
    
    for (let i = -gridRadius; i <= gridRadius; i++) {
      for (let j = -gridRadius; j <= gridRadius; j++) {
        const cellCenterLat = centerLat + i * GRID_SIZE_DEG_200;
        const cellCenterLng = centerLng + j * GRID_SIZE_DEG_200;

        const swLat = cellCenterLat - GRID_SIZE_DEG_200 / 2;
        const swLng = cellCenterLng - GRID_SIZE_DEG_200 / 2;
        const neLat = cellCenterLat + GRID_SIZE_DEG_200 / 2;
        const neLng = cellCenterLng + GRID_SIZE_DEG_200 / 2;

        // Calculate distance to nearest hotspot
        let nearestDist = Math.sqrt(i * i + j * j);
        
        const value = valueGenerator(cellCenterLat, cellCenterLng, nearestDist);

        cells.push({
          id: `${layerName}-${zoneId}-${hotspotIdx}-${i}-${j}`,
          bounds: [[swLat, swLng], [neLat, neLng]],
          center: [cellCenterLat, cellCenterLng],
          value: Math.max(0, Math.min(1, value)),
          label: `${(value * 100).toFixed(1)}%`,
        });
      }
    }
  });

  return cells;
}

// Color scales for different layers
const getHeatColorScale = (value: number): string => {
  if (value > 0.75) return '#dc2626'; // high
  if (value > 0.5) return '#f59e0b'; // medium-high
  if (value > 0.25) return '#fbbf24'; // medium-low
  return '#22c55e'; // low
};

const getWaterColorScale = (value: number): string => {
  if (value > 0.75) return '#1e40af'; // deep blue
  if (value > 0.5) return '#3b82f6'; // blue
  if (value > 0.25) return '#60a5fa'; // light blue
  return '#dbeafe'; // very light blue
};

const getVegetationColorScale = (value: number): string => {
  if (value > 0.75) return '#15803d'; // dark green
  if (value > 0.5) return '#22c55e'; // green
  if (value > 0.25) return '#86efac'; // light green
  return '#dcfce7'; // very light green
};

const getTemperatureColorScale = (value: number): string => {
  if (value > 0.75) return '#dc2626'; // hot red
  if (value > 0.5) return '#f97316'; // orange
  if (value > 0.25) return '#fbbf24'; // yellow
  return '#fef3c7'; // cool yellow
};

// Generate grids for each zone's hotspots
function generateZoneGrids(): GridLayer[] {
  const layers: GridLayer[] = [];

  // For each zone, create grids around its hotspots
  mockZones.forEach((zone) => {
    const zoneHotspots = mockHotspots.filter(h => h.zoneId === zone.id);
    
    if (zoneHotspots.length > 0) {
      // Water Index Layer
      layers.push({
        id: `water-index-${zone.id}`,
        name: `Water Index - ${zone.name}`,
        data: generateMacroGrid(
          zoneHotspots,
          (lat, lng, dist) => {
            // High water near hotspots (breeding sites)
            return Math.max(0, 1 - dist * 0.08);
          },
          'water-index',
          zone.id
        ),
        colorScale: getWaterColorScale,
      });

      // Vegetation Index Layer
      layers.push({
        id: `vegetation-index-${zone.id}`,
        name: `Vegetation - ${zone.name}`,
        data: generateMacroGrid(
          zoneHotspots,
          (lat, lng, dist) => {
            // Moderate vegetation around water bodies
            const baseVeg = 0.4 + Math.random() * 0.2;
            return Math.max(0, baseVeg - dist * 0.03);
          },
          'vegetation-index',
          zone.id
        ),
        colorScale: getVegetationColorScale,
      });

      // Temperature Grid Layer
      layers.push({
        id: `temperature-grid-${zone.id}`,
        name: `Temperature - ${zone.name}`,
        data: generateMacroGrid(
          zoneHotspots,
          (lat, lng, dist) => {
            // Temperature based on zone risk
            const baseTemp = zone.riskLevel === 'high' ? 0.8 : zone.riskLevel === 'medium' ? 0.6 : 0.4;
            return baseTemp + (Math.random() * 0.15 - 0.075);
          },
          'temperature-grid',
          zone.id
        ),
        colorScale: getTemperatureColorScale,
      });

      // Humidity Grid Layer
      layers.push({
        id: `humidity-grid-${zone.id}`,
        name: `Humidity - ${zone.name}`,
        data: generateMacroGrid(
          zoneHotspots,
          (lat, lng, dist) => {
            // High humidity near water
            const baseHumidity = 0.7;
            return Math.max(0.3, baseHumidity - dist * 0.05);
          },
          'humidity-grid',
          zone.id
        ),
        colorScale: getHeatColorScale,
      });

      // Breeding Sites Layer
      layers.push({
        id: `breeding-sites-${zone.id}`,
        name: `Breeding Sites - ${zone.name}`,
        data: generateMacroGrid(
          zoneHotspots,
          (lat, lng, dist) => {
            // High breeding potential near hotspots
            const riskMultiplier = zone.riskLevel === 'high' ? 1.0 : zone.riskLevel === 'medium' ? 0.7 : 0.4;
            return Math.max(0, riskMultiplier * (1 - dist * 0.1));
          },
          'breeding-sites',
          zone.id
        ),
        colorScale: getHeatColorScale,
      });

      // Larvae Density Layer
      layers.push({
        id: `larvae-density-${zone.id}`,
        name: `Larvae Density - ${zone.name}`,
        data: generateMacroGrid(
          zoneHotspots,
          (lat, lng, dist) => {
            // Larvae concentration near breeding sites
            const riskMultiplier = zone.riskLevel === 'high' ? 1.0 : zone.riskLevel === 'medium' ? 0.6 : 0.3;
            return Math.max(0, riskMultiplier * (1 - dist * 0.12));
          },
          'larvae-density',
          zone.id
        ),
        colorScale: getHeatColorScale,
      });

      // Risk Score Grid Layer
      layers.push({
        id: `risk-score-grid-${zone.id}`,
        name: `Risk Score - ${zone.name}`,
        data: generateMacroGrid(
          zoneHotspots,
          (lat, lng, dist) => {
            // Composite risk score
            const riskMultiplier = zone.riskLevel === 'high' ? 1.0 : zone.riskLevel === 'medium' ? 0.65 : 0.35;
            return Math.max(0, riskMultiplier * (1 - dist * 0.09));
          },
          'risk-score-grid',
          zone.id
        ),
        colorScale: getHeatColorScale,
      });
    }
  });

  return layers;
}

// Generate all grid layers
const allGridLayers = generateZoneGrids();

// Export consolidated grid layers by type (for layer control)
export const gridLayers: GridLayer[] = [
  // Water Index - all zones combined
  {
    id: 'water-index',
    name: 'Water Index (200m² grid)',
    data: allGridLayers.filter(l => l.id.includes('water-index')).flatMap(l => l.data),
    colorScale: getWaterColorScale,
  },
  // Vegetation Index
  {
    id: 'vegetation-index',
    name: 'Vegetation Index (200m² grid)',
    data: allGridLayers.filter(l => l.id.includes('vegetation-index')).flatMap(l => l.data),
    colorScale: getVegetationColorScale,
  },
  // Temperature Grid
  {
    id: 'temperature-grid',
    name: 'Temperature Grid (200m² grid)',
    data: allGridLayers.filter(l => l.id.includes('temperature-grid')).flatMap(l => l.data),
    colorScale: getTemperatureColorScale,
  },
  // Humidity Grid
  {
    id: 'humidity-grid',
    name: 'Humidity Grid (200m² grid)',
    data: allGridLayers.filter(l => l.id.includes('humidity-grid')).flatMap(l => l.data),
    colorScale: getHeatColorScale,
  },
  // Breeding Sites
  {
    id: 'breeding-sites',
    name: 'Breeding Sites (200m² grid)',
    data: allGridLayers.filter(l => l.id.includes('breeding-sites')).flatMap(l => l.data),
    colorScale: getHeatColorScale,
  },
  // Larvae Density
  {
    id: 'larvae-density',
    name: 'Larvae Density (200m² grid)',
    data: allGridLayers.filter(l => l.id.includes('larvae-density')).flatMap(l => l.data),
    colorScale: getHeatColorScale,
  },
  // Risk Score Grid
  {
    id: 'risk-score-grid',
    name: 'Risk Score Grid (200m² grid)',
    data: allGridLayers.filter(l => l.id.includes('risk-score-grid')).flatMap(l => l.data),
    colorScale: getHeatColorScale,
  },
];