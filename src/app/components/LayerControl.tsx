import { Layers, AlertCircle, Users, Thermometer, Activity, Hexagon, Droplet, Leaf, Wind, Bug } from 'lucide-react';

interface LayerControlProps {
  activeLayers: string[];
  onLayerToggle: (layer: string) => void;
}

export function LayerControl({ activeLayers, onLayerToggle }: LayerControlProps) {
  const layers = [
    { id: 'risk', label: 'Risk Level', icon: AlertCircle, description: 'Overall risk assessment', category: 'Zone View' },
    { id: 'temperature', label: 'Temperature', icon: Thermometer, description: 'Temperature distribution', category: 'Zone View' },
    { id: 'population', label: 'Population', icon: Users, description: 'Population density', category: 'Zone View' },
    { id: 'cases', label: 'Cases', icon: Activity, description: 'Recent case distribution', category: 'Zone View' },
    { id: 'traps', label: 'Traps', icon: Hexagon, description: 'Trap coverage', category: 'Zone View' },
    
    // Grid-based layers
    { id: 'water-index', label: 'Water Index', icon: Droplet, description: 'Standing water (200m² grid)', category: 'Feature Layers' },
    { id: 'vegetation-index', label: 'Vegetation', icon: Leaf, description: 'Vegetation coverage (200m² grid)', category: 'Feature Layers' },
    { id: 'temperature-grid', label: 'Temperature Grid', icon: Thermometer, description: 'Surface temperature (200m² grid)', category: 'Feature Layers' },
    { id: 'humidity-grid', label: 'Humidity', icon: Wind, description: 'Relative humidity (200m² grid)', category: 'Feature Layers' },
    
    { id: 'breeding-sites', label: 'Breeding Sites', icon: Bug, description: 'Breeding potential (200m² grid)', category: 'Factor Layers' },
    { id: 'larvae-density', label: 'Larvae Density', icon: Bug, description: 'Larvae count (200m² grid)', category: 'Factor Layers' },
    
    { id: 'risk-score-grid', label: 'Risk Score Grid', icon: AlertCircle, description: 'Composite risk (200m² grid)', category: 'Risk Analysis' },
  ];

  // Group layers by category
  const categories = Array.from(new Set(layers.map(l => l.category)));

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        <Layers className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-gray-900">Map Layers</h3>
      </div>
      
      {categories.map((category) => (
        <div key={category} className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">{category}</h4>
          <div className="space-y-2">
            {layers.filter(l => l.category === category).map((layer) => {
              const Icon = layer.icon;
              const isActive = activeLayers.includes(layer.id);
              
              return (
                <label
                  key={layer.id}
                  className={`w-full flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                    isActive
                      ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => onLayerToggle(layer.id)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    isActive ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                  <div className="flex-1">
                    <div className={`text-xs font-medium ${
                      isActive ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {layer.label}
                    </div>
                    <div className={`text-[10px] ${
                      isActive ? 'text-blue-700' : 'text-gray-600'
                    }`}>
                      {layer.description}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-gray-700">Legend:</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-600">Low</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-gray-600">Med</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-gray-600">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}