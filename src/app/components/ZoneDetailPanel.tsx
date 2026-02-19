import { ZoneData } from '../types/map-types';
import { mockHotspots } from '../data/mock-hotspots';
import { AlertTriangle, Users, Activity, Thermometer, Droplets, TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ZoneDetailPanelProps {
  zone: ZoneData | null;
  onClose: () => void;
}

export function ZoneDetailPanel({ zone, onClose }: ZoneDetailPanelProps) {
  if (!zone) return null;

  // Get hotspots for this zone
  const zoneHotspots = mockHotspots.filter(h => h.zoneId === zone.id);
  const totalHotspots = zoneHotspots.length;
  const highRiskHotspots = zoneHotspots.filter(h => h.riskLevel === 'high').length;
  const mediumRiskHotspots = zoneHotspots.filter(h => h.riskLevel === 'medium').length;
  const lowRiskHotspots = zoneHotspots.filter(h => h.riskLevel === 'low').length;
  const totalHotspotCases = zoneHotspots.reduce((sum, h) => sum + h.cases, 0);

  const riskData = [
    { name: 'Breeding', value: zone.riskComponents.breeding, color: '#ef4444' },
    { name: 'Environmental', value: zone.riskComponents.environmental, color: '#f59e0b' },
    { name: 'Transmission', value: zone.riskComponents.transmission, color: '#3b82f6' },
  ];

  const getRiskBadgeColor = () => {
    switch (zone.riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const getActionBadgeColor = () => {
    switch (zone.recommendation.priority) {
      case 'immediate':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'scheduled':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'monitor':
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getTrendIcon = () => {
    switch (zone.metrics.caseTrend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-green-600" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0 z-10">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{zone.name}</h2>
          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm border ${getRiskBadgeColor()}`}>
            {zone.riskLevel.toUpperCase()} RISK
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Risk Explanation */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why This Risk Level?</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {zone.riskLevel === 'high' && 
                  'This area shows elevated risk due to multiple converging factors. Immediate attention is warranted to prevent outbreak escalation.'
                }
                {zone.riskLevel === 'medium' && 
                  'This area has moderate risk factors that require monitoring. Preventive measures should be scheduled.'
                }
                {zone.riskLevel === 'low' && 
                  'This area currently shows low risk indicators. Continue routine surveillance to maintain status.'
                }
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium text-gray-700">Key Risk Drivers:</p>
            {zone.drivers.map((driver, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{driver.factor}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    driver.type === 'static' ? 'bg-gray-200 text-gray-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {driver.type}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    driver.impact === 'high' ? 'bg-red-100 text-red-700' : 
                    driver.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    {driver.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contextual Metrics */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Contextual Metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-700 font-medium">Population</span>
              </div>
              <p className="text-lg font-semibold text-blue-900">
                {zone.metrics.population.toLocaleString()}
              </p>
            </div>

            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-red-600" />
                <span className="text-xs text-red-700 font-medium">Recent Cases</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-red-900">
                  {zone.metrics.recentCases}
                </p>
                {getTrendIcon()}
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer className="w-4 h-4 text-orange-600" />
                <span className="text-xs text-orange-700 font-medium">Temperature</span>
              </div>
              <p className="text-lg font-semibold text-orange-900">
                {zone.metrics.temperature}°C
              </p>
            </div>

            <div className="bg-cyan-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-cyan-600" />
                <span className="text-xs text-cyan-700 font-medium">Humidity</span>
              </div>
              <p className="text-lg font-semibold text-cyan-900">
                {zone.metrics.humidity}%
              </p>
            </div>
          </div>

          <div className="mt-3 bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700 font-medium">Active Traps</span>
              <span className="text-lg font-semibold text-purple-900">{zone.metrics.trapCount}</span>
            </div>
          </div>
        </div>

        {/* Risk Component Breakdown */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Risk Component Breakdown</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-3 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Breeding Conditions</span>
                <span className="font-semibold text-gray-900">{zone.riskComponents.breeding}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Environmental Factors</span>
                <span className="font-semibold text-gray-900">{zone.riskComponents.environmental}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Human Transmission</span>
                <span className="font-semibold text-gray-900">{zone.riskComponents.transmission}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hotspot Statistics */}
        {totalHotspots > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Hotspot Analysis (200m² Macro View)</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-900">{totalHotspots} Active Hotspots</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-red-50 p-2 rounded text-center">
                  <div className="text-2xl font-bold text-red-700">{highRiskHotspots}</div>
                  <div className="text-xs text-red-600">High Risk</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded text-center">
                  <div className="text-2xl font-bold text-yellow-700">{mediumRiskHotspots}</div>
                  <div className="text-xs text-yellow-600">Medium</div>
                </div>
                <div className="bg-green-50 p-2 rounded text-center">
                  <div className="text-2xl font-bold text-green-700">{lowRiskHotspots}</div>
                  <div className="text-xs text-green-600">Low Risk</div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Cases in Hotspots:</span>
                  <span className="text-lg font-bold text-gray-900">{totalHotspotCases}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800 leading-relaxed">
                  Each hotspot represents a potential breeding site (pond, lake, stagnant water) 
                  with 20m² detection area, surrounded by a 200m² macro-analysis grid showing 
                  feature and factor layer patterns.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Recommendation */}
        <div className={`border rounded-lg p-4 ${getActionBadgeColor()}`}>
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Recommended Action
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Action:</span>
              <span className="text-sm font-semibold">{zone.recommendation.action}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Priority:</span>
              <span className="text-sm font-semibold uppercase">{zone.recommendation.priority}</span>
            </div>
            <p className="text-sm mt-2 leading-relaxed">
              {zone.recommendation.details}
            </p>
          </div>
        </div>

        {/* Data Recency */}
        <div className="text-xs text-gray-500 pt-3 border-t border-gray-200">
          Last updated: {new Date().toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
}