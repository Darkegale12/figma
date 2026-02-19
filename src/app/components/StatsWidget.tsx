import { AlertTriangle, MapPin, Activity, Shield } from 'lucide-react';
import { mockZones } from '../data/mock-zones';
import { mockHotspots } from '../data/mock-hotspots';

export function StatsWidget() {
  const highRiskZones = mockZones.filter(z => z.riskLevel === 'high').length;
  const mediumRiskZones = mockZones.filter(z => z.riskLevel === 'medium').length;
  const lowRiskZones = mockZones.filter(z => z.riskLevel === 'low').length;
  const totalCases = mockZones.reduce((sum, z) => sum + z.metrics.recentCases, 0);
  const totalHotspots = mockHotspots.length;
  const highRiskHotspots = mockHotspots.filter(h => h.riskLevel === 'high').length;

  return (
    <div className="bg-white shadow-md px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between max-w-full">
        {/* Title */}
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">PCMC Disease Vector Control</h1>
            <p className="text-xs text-gray-600">Real-time risk assessment & operational guidance</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          {/* Risk Zones */}
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

          {/* Total Cases */}
          <div className="flex items-center gap-3 px-4 py-2 bg-red-50 rounded-lg">
            <Activity className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-xs text-gray-600">Total Cases</p>
              <p className="text-lg font-bold text-red-900">{totalCases}</p>
            </div>
          </div>

          {/* Hotspots */}
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
  );
}
