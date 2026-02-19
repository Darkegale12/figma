import { Map, Satellite } from 'lucide-react';

interface BasemapToggleProps {
  basemap: 'streets' | 'satellite';
  onBasemapChange: (basemap: 'streets' | 'satellite') => void;
}

export function BasemapToggle({ basemap, onBasemapChange }: BasemapToggleProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Map className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-gray-900">Basemap</h3>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onBasemapChange('streets')}
          className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
            basemap === 'streets'
              ? 'bg-blue-50 border-2 border-blue-500'
              : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
          }`}
          title="Street Map"
        >
          <Map className={`w-6 h-6 ${basemap === 'streets' ? 'text-blue-600' : 'text-gray-600'}`} />
          <span className={`text-xs font-medium ${basemap === 'streets' ? 'text-blue-900' : 'text-gray-700'}`}>
            Streets
          </span>
        </button>
        
        <button
          onClick={() => onBasemapChange('satellite')}
          className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
            basemap === 'satellite'
              ? 'bg-blue-50 border-2 border-blue-500'
              : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
          }`}
          title="Satellite Imagery"
        >
          <Satellite className={`w-6 h-6 ${basemap === 'satellite' ? 'text-blue-600' : 'text-gray-600'}`} />
          <span className={`text-xs font-medium ${basemap === 'satellite' ? 'text-blue-900' : 'text-gray-700'}`}>
            Satellite
          </span>
        </button>
      </div>
    </div>
  );
}