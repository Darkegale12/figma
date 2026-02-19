import { useState, lazy, Suspense } from 'react';
import { Map, BarChart3, Shield, AlertTriangle, MapPin, Activity, Loader2 } from 'lucide-react';
import { mockZones } from './data/mock-zones';
import { mockHotspots } from './data/mock-hotspots';

// Lazy load heavy components
const RiskMap = lazy(() => import('./components/RiskMap').then(m => ({ default: m.RiskMap })));
const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));
const LayerControl = lazy(() => import('./components/LayerControl').then(m => ({ default: m.LayerControl })));
const MapCenterControl = lazy(() => import('./components/MapCenterControl').then(m => ({ default: m.MapCenterControl })));
const BasemapToggle = lazy(() => import('./components/BasemapToggle').then(m => ({ default: m.BasemapToggle })));
const ZoneDetailPanel = lazy(() => import('./components/ZoneDetailPanel').then(m => ({ default: m.ZoneDetailPanel })));

// Loading component
function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [activeLayers, setActiveLayers] = useState<string[]>(['risk']);
  const [mapCenter, setMapCenter] = useState<[number, number]>([18.491292, 73.800823]); // Default to Lotus Pond
  const [basemap, setBasemap] = useState<'streets' | 'satellite'>('streets');
  const [activeTab, setActiveTab] = useState<'map' | 'dashboard'>('map');

  const selectedZone = selectedZoneId 
    ? mockZones.find(zone => zone.id === selectedZoneId) || null
    : null;

  // Calculate stats
  const highRiskZones = mockZones.filter(z => z.riskLevel === 'high').length;
  const mediumRiskZones = mockZones.filter(z => z.riskLevel === 'medium').length;
  const lowRiskZones = mockZones.filter(z => z.riskLevel === 'low').length;
  const totalCases = mockZones.reduce((sum, z) => sum + z.metrics.recentCases, 0);
  const totalHotspots = mockHotspots.length;
  const highRiskHotspots = mockHotspots.filter(h => h.riskLevel === 'high').length;

  // Last updated timestamp
  const lastUpdated = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  });

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100 flex flex-col">
      {/* Top Stats Widget */}
      <div className="bg-white shadow-md px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-full">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">DBT- Vector Disease Control</h1>
              <p className="text-xs text-gray-600">Real-time risk assessment & operational guidance • Last updated: {lastUpdated}</p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-xs text-gray-600">Risk Zones</p>
                <div className="flex gap-2 items-baseline">
                  <span className="text-sm font-bold text-red-600">{highRiskZones} High</span>
                  <span className="text-sm font-bold text-yellow-600">{mediumRiskZones} Med</span>
                  <span className="text-sm font-bold text-green-600">{lowRiskZones} Low</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-red-50 rounded-lg">
              <Activity className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-xs text-gray-600">Total Cases</p>
                <p className="text-lg font-bold text-red-900">{totalCases}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-purple-50 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-xs text-gray-600">Active Hotspots</p>
                <div className="flex gap-2 items-baseline">
                  <span className="text-lg font-bold text-purple-900">{totalHotspots}</span>
                  <span className="text-xs text-red-600">({highRiskHotspots} High)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'map'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Map className="w-5 h-5" />
            Vector-Borne Disease Prevention Map
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'dashboard'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Prevention Analytics
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      {activeTab === 'map' ? (
        <div className="flex-1 flex overflow-hidden">
          <Suspense fallback={<div className="w-80 bg-white shadow-xl flex items-center justify-center"><LoadingSpinner message="Loading controls..." /></div>}>
            <div className="w-80 bg-white shadow-xl overflow-y-auto flex-shrink-0 z-10">
              <LayerControl
                activeLayers={activeLayers}
                onLayerToggle={(layerId) => {
                  setActiveLayers(prev => 
                    prev.includes(layerId) 
                      ? prev.filter(id => id !== layerId)
                      : [...prev, layerId]
                  );
                }}
              />
              
              <div className="p-4 border-t border-gray-200">
                <MapCenterControl onCenterChange={(lat, lng) => setMapCenter([lat, lng])} />
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <BasemapToggle
                  basemap={basemap}
                  onBasemapChange={setBasemap}
                />
              </div>
            </div>
          </Suspense>

          <div className="flex-1 relative">
            <Suspense fallback={<LoadingSpinner message="Loading map..." />}>
              <RiskMap
                zones={mockZones}
                hotspots={mockHotspots}
                selectedZone={selectedZoneId}
                onZoneClick={setSelectedZoneId}
                activeLayers={activeLayers}
                center={mapCenter}
                basemap={basemap}
              />
            </Suspense>
          </div>

          {selectedZone && (
            <Suspense fallback={<div className="w-96 bg-white shadow-xl flex items-center justify-center"><LoadingSpinner /></div>}>
              <div className="w-96 bg-white shadow-xl overflow-y-auto flex-shrink-0 z-10">
                <ZoneDetailPanel
                  zone={selectedZone}
                  onClose={() => setSelectedZoneId(null)}
                />
              </div>
            </Suspense>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">
          <Suspense fallback={<LoadingSpinner message="Loading dashboard..." />}>
            <Dashboard />
          </Suspense>
        </div>
      )}
    </div>
  );
}