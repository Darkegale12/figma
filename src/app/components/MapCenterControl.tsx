import { MapPin } from 'lucide-react';
import { useState } from 'react';

interface MapCenterControlProps {
  onCenterChange: (lat: number, lng: number) => void;
}

// Popular spots in Pune with coordinates
const popularSpots = [
  { name: 'Pune City Center', lat: 18.5204, lng: 73.8567 },
  { name: 'Shivajinagar (High Risk Zone)', lat: 18.5330, lng: 73.8500 },
  { name: 'Kothrud (Low Risk Zone)', lat: 18.5060, lng: 73.8380 },
  { name: 'Aundh (Low Risk Zone)', lat: 18.5570, lng: 73.8180 },
  { name: 'Deccan Gymkhana (High Risk)', lat: 18.5170, lng: 73.8550 },
  { name: 'Koregaon Park', lat: 18.5470, lng: 73.8950 },
  { name: 'Viman Nagar', lat: 18.5670, lng: 73.9160 },
  { name: 'Hadapsar (High Risk Zone)', lat: 18.5010, lng: 73.9400 },
  { name: 'Baner', lat: 18.5680, lng: 73.7960 },
  { name: 'Lotus pond - MMCOE', lat: 18.491292, lng: 73.800823 },
  { name: 'Ferguson College Lake', lat: 18.5140, lng: 73.8520 },
  { name: 'Aga Khan Palace', lat: 18.5440, lng: 73.8920 },
  { name: 'Magarpatta Lake', lat: 18.4940, lng: 73.9320 },
  { name: 'Pashan Lake', lat: 18.5590, lng: 73.8160 },
  { name: 'Balewadi Stadium', lat: 18.5710, lng: 73.8010 },
  { name: 'Pune University', lat: 18.5180, lng: 73.8610 },
  { name: 'Phoenix Mall Area', lat: 18.5670, lng: 73.9160 },
  { name: 'EON Mall Hadapsar', lat: 18.4980, lng: 73.9360 },
  { name: 'Kothrud Depot Area', lat: 18.5130, lng: 73.8440 },
  { name: 'IT Park Aundh', lat: 18.5570, lng: 73.8180 },
];

export function MapCenterControl({ onCenterChange }: MapCenterControlProps) {
  const [latitude, setLatitude] = useState('18.5204');
  const [longitude, setLongitude] = useState('73.8567');
  const [selectedSpot, setSelectedSpot] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      onCenterChange(lat, lng);
    }
  };

  const handleSpotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const spotName = e.target.value;
    setSelectedSpot(spotName);
    
    const spot = popularSpots.find(s => s.name === spotName);
    if (spot) {
      setLatitude(spot.lat.toString());
      setLongitude(spot.lng.toString());
      onCenterChange(spot.lat, spot.lng);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-gray-900">Map Center</h3>
      </div>
      
      <div className="mb-4">
        <label htmlFor="spot-select" className="block text-xs font-medium text-gray-700 mb-1">
          Popular Locations
        </label>
        <select
          id="spot-select"
          value={selectedSpot}
          onChange={handleSpotChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a location...</option>
          {popularSpots.map((spot, idx) => (
            <option key={idx} value={spot.name}>
              {spot.name}
            </option>
          ))}
        </select>
      </div>

      <div className="text-xs text-gray-500 text-center mb-3">OR</div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="latitude" className="block text-xs font-medium text-gray-700 mb-1">
            Latitude
          </label>
          <input
            id="latitude"
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="e.g., 18.491292"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="longitude" className="block text-xs font-medium text-gray-700 mb-1">
            Longitude
          </label>
          <input
            id="longitude"
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="e.g., 73.800823"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
        >
          Go to Location
        </button>
      </form>
    </div>
  );
}