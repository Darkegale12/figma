import { ZoneData, Hotspot } from '../types/map-types';
import { gridLayers } from '../data/mock-grid-data';
import { useEffect, useRef } from 'react';

interface RiskMapProps {
  zones: ZoneData[];
  hotspots: Hotspot[];
  selectedZone: string | null;
  onZoneClick: (zoneId: string) => void;
  activeLayers: string[];
  center: [number, number];
  basemap?: 'streets' | 'satellite';
}

export function RiskMap({ zones, hotspots, selectedZone, onZoneClick, activeLayers, center, basemap = 'streets' }: RiskMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersRef = useRef<Map<string, any>>(new Map());
  const hotspotLayersRef = useRef<any[]>([]);
  const gridLayersMapRef = useRef<Map<string, any[]>>(new Map());
  const basemapLayerRef = useRef<any>(null);
  const currentZoomRef = useRef<number>(12);

  const getRiskColor = (zone: ZoneData, layerId: string) => {
    if (layerId === 'risk') {
      switch (zone.riskLevel) {
        case 'high':
          return '#ef4444';
        case 'medium':
          return '#f59e0b';
        case 'low':
          return '#22c55e';
        default:
          return '#94a3b8';
      }
    } else if (layerId === 'temperature') {
      const temp = zone.metrics.temperature;
      if (temp > 32) return '#ef4444';
      if (temp > 28) return '#f59e0b';
      return '#22c55e';
    } else if (layerId === 'population') {
      const pop = zone.metrics.population;
      if (pop > 50000) return '#ef4444';
      if (pop > 25000) return '#f59e0b';
      return '#22c55e';
    } else if (layerId === 'cases') {
      const cases = zone.metrics.recentCases;
      if (cases > 50) return '#ef4444';
      if (cases > 20) return '#f59e0b';
      return '#22c55e';
    } else if (layerId === 'traps') {
      const traps = zone.metrics.trapCount;
      if (traps < 3) return '#ef4444';
      if (traps < 6) return '#f59e0b';
      return '#22c55e';
    }
    return '#94a3b8';
  };

  // Initialize map
  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
      const loadLeaflet = async () => {
        const L = (await import('leaflet')).default;
        await import('leaflet/dist/leaflet.css');

        // Initialize map
        const map = L.map(mapRef.current!, {
          center: center,
          zoom: 12, // Zoomed out to see all zones
          zoomControl: true,
          scrollWheelZoom: true,
        });

        // Add OpenStreetMap tiles
        const basemapUrl = basemap === 'streets' ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const basemapAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const basemapMaxZoom = 19;

        basemapLayerRef.current = L.tileLayer(basemapUrl, {
          attribution: basemapAttribution,
          maxZoom: basemapMaxZoom,
        }).addTo(map);

        mapInstanceRef.current = map;

        // Add zones as GeoJSON layers
        zones.forEach((zone) => {
          const coordinates = zone.coordinates.map((coord) =>
            Array.isArray(coord) ? [coord[1], coord[0]] : [coord.lng, coord.lat]
          );

          // Create GeoJSON polygon
          const geoJsonFeature = {
            type: 'Feature',
            properties: {
              zoneId: zone.id,
              zoneName: zone.name,
            },
            geometry: {
              type: 'Polygon',
              coordinates: [coordinates],
            },
          };

          const color = getRiskColor(zone, 'risk');
          const isSelected = selectedZone === zone.id;

          const layer = L.geoJSON(geoJsonFeature as any, {
            style: {
              fillColor: color,
              fillOpacity: 0, // No fill - outline only
              color: color, // Border color matches risk level
              weight: isSelected ? 5 : 3, // Thicker border (3px normal, 5px selected)
            },
            onEachFeature: (feature, layer) => {
              layer.on({
                click: () => {
                  onZoneClick(zone.id);
                },
                mouseover: (e) => {
                  const layer = e.target;
                  if (!isSelected) {
                    layer.setStyle({
                      weight: 4, // Slightly thicker on hover
                    });
                  }
                },
                mouseout: (e) => {
                  const layer = e.target;
                  if (!isSelected) {
                    layer.setStyle({
                      weight: 3,
                    });
                  }
                },
              });

              // Add zone label
              const center = layer.getBounds().getCenter();
              L.marker(center, {
                icon: L.divIcon({
                  className: 'zone-label',
                  html: `<div style="font-size: 14px; font-weight: bold; color: #1e293b; text-shadow: 1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white; pointer-events: none; white-space: nowrap;">${zone.name}</div>`,
                  iconSize: [100, 20],
                }),
              }).addTo(map);
            },
          }).addTo(map);

          layersRef.current.set(zone.id, layer);
        });

        // Add hotspots as markers
        hotspots.forEach((hotspot) => {
          const getHotspotColor = (level: string) => {
            switch (level) {
              case 'high':
                return '#dc2626';
              case 'medium':
                return '#ea580c';
              case 'low':
                return '#16a34a';
              default:
                return '#6b7280';
            }
          };

          const color = getHotspotColor(hotspot.riskLevel);
          
          // Calculate radius based on area (assuming circular hotspot)
          // area = π * r^2, so r = sqrt(area / π)
          const radiusInMeters = Math.sqrt(hotspot.area / Math.PI);

          // Create circle marker for hotspot
          const circle = L.circle([hotspot.center[0], hotspot.center[1]], {
            color: color,
            fillColor: color,
            fillOpacity: 0.6,
            radius: radiusInMeters,
            weight: 2,
          }).addTo(map);

          // Add popup with hotspot info
          circle.bindPopup(`
            <div style="font-family: system-ui, -apple-system, sans-serif;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">${hotspot.name}</h3>
              <div style="font-size: 12px; color: #374151;">
                <div><strong>Area:</strong> ${hotspot.area} m²</div>
                <div><strong>Cases:</strong> ${hotspot.cases}</div>
                <div><strong>Risk:</strong> ${hotspot.riskLevel.toUpperCase()}</div>
                <div><strong>Updated:</strong> ${hotspot.lastUpdated}</div>
              </div>
            </div>
          `);

          // Add label for larger hotspots
          if (hotspot.area >= 100) {
            L.marker([hotspot.center[0], hotspot.center[1]], {
              icon: L.divIcon({
                className: 'hotspot-label',
                html: `<div style="font-size: 11px; font-weight: 600; color: white; background-color: ${color}; padding: 2px 6px; border-radius: 4px; white-space: nowrap; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">${hotspot.area}m² - ${hotspot.cases} cases</div>`,
                iconSize: [80, 20],
              }),
            }).addTo(map);
          }

          hotspotLayersRef.current.push(circle);
        });
      };

      loadLeaflet();

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, []);

  // Update zone layer styles when activeLayer or selectedZone changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      zones.forEach((zone) => {
        const layer = layersRef.current.get(zone.id);
        if (layer) {
          const color = getRiskColor(zone, 'risk');
          const isSelected = selectedZone === zone.id;

          layer.setStyle({
            fillColor: color,
            fillOpacity: 0, // No fill - outline only
            color: color, // Border color matches risk level
            weight: isSelected ? 5 : 3, // Thicker border (3px normal, 5px selected)
          });
        }
      });
    }
  }, [activeLayers, selectedZone, zones]);

  // Render grid layers when activeLayers changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      const loadLeaflet = async () => {
        const L = (await import('leaflet')).default;

        // Remove all existing grid layers
        gridLayersMapRef.current.forEach((rectangles) => {
          rectangles.forEach((rect: any) => {
            mapInstanceRef.current.removeLayer(rect);
          });
        });
        gridLayersMapRef.current.clear();

        // Check if any grid layers are active
        const activeGridLayerIds = activeLayers.filter(layerId => 
          gridLayers.some(gl => gl.id === layerId)
        );

        if (activeGridLayerIds.length > 0) {
          // Keep zone layers visible even when grid layers are active
          layersRef.current.forEach((layer, zoneId) => {
            const zone = zones.find(z => z.id === zoneId);
            if (zone) {
              const isSelected = selectedZone === zoneId;
              const color = getRiskColor(zone, 'risk');
              
              layer.setStyle({
                fillOpacity: 0, // No fill
                color: color, // Border color matches risk level
                weight: isSelected ? 5 : 3, // Thicker border (3px normal, 5px selected)
                opacity: 1, // Always visible
              });
            }
          });

          // Render each active grid layer with lighter opacity (0.25 instead of 0.5)
          activeGridLayerIds.forEach(layerId => {
            const gridLayer = gridLayers.find(gl => gl.id === layerId);
            if (gridLayer) {
              const rectangles: any[] = [];
              
              gridLayer.data.forEach((cell) => {
                const rectangle = L.rectangle(cell.bounds, {
                  fillColor: gridLayer.colorScale(cell.value),
                  fillOpacity: 0.25, // Lighter opacity for macro view
                  color: '#ffffff',
                  weight: 0.5,
                  opacity: 0.15,
                }).addTo(mapInstanceRef.current);

                // Add tooltip
                rectangle.bindTooltip(`
                  <div style="font-size: 11px;">
                    <strong>${gridLayer.name}</strong><br/>
                    Value: ${cell.label}
                  </div>
                `, {
                  sticky: true,
                });

                rectangles.push(rectangle);
              });
              
              gridLayersMapRef.current.set(layerId, rectangles);
            }
          });
        } else {
          // Show zone layers when no grid layers are active
          // Determine which zone layer to show
          const zoneLayerId = activeLayers.find(id => 
            ['risk', 'temperature', 'population', 'cases', 'traps'].includes(id)
          );

          layersRef.current.forEach((layer, zoneId) => {
            const zone = zones.find(z => z.id === zoneId);
            if (zone) {
              const isSelected = selectedZone === zoneId;
              const color = zoneLayerId ? getRiskColor(zone, zoneLayerId) : getRiskColor(zone, 'risk');
              
              layer.setStyle({
                fillColor: color,
                fillOpacity: 0, // No fill - outline only
                color: color, // Border color matches risk level
                weight: isSelected ? 5 : 3, // Thicker border (3px normal, 5px selected)
                opacity: 1,
              });
            }
          });
        }
      };

      loadLeaflet();
    }
  }, [activeLayers, zones, selectedZone]);

  // Update map center when center prop changes
  useEffect(() => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.setView(center, 16, {
        animate: true,
        duration: 1,
      });
    }
  }, [center]);

  // Update basemap when basemap prop changes
  useEffect(() => {
    if (mapInstanceRef.current && basemapLayerRef.current) {
      const loadLeaflet = async () => {
        const L = (await import('leaflet')).default;

        // Remove existing basemap layer
        mapInstanceRef.current.removeLayer(basemapLayerRef.current);

        // Add new basemap layer
        let basemapUrl, basemapAttribution;
        
        if (basemap === 'satellite') {
          // Using Esri World Imagery (free, no API key required)
          basemapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
          basemapAttribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
        } else {
          // OpenStreetMap
          basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
          basemapAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        }

        basemapLayerRef.current = L.tileLayer(basemapUrl, {
          attribution: basemapAttribution,
          maxZoom: 19,
        }).addTo(mapInstanceRef.current);

        // Move basemap to back
        basemapLayerRef.current.bringToBack();
      };

      loadLeaflet();
    }
  }, [basemap]);

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Leaflet Map */}
      <div
        ref={mapRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}