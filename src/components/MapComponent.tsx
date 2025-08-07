import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation } from 'lucide-react';

interface MapComponentProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
}

const MapComponent = ({ onLocationSelect }: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.006, 40.7128], // NYC default
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    });
    
    map.current.addControl(geolocate, 'top-right');

    // Add click event for location selection
    map.current.on('click', async (e) => {
      const { lng, lat } = e.lngLat;
      
      // Add marker
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([lng, lat])
        .addTo(map.current!);

      // Reverse geocoding to get address
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`
        );
        const data = await response.json();
        const address = data.features[0]?.place_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        
        onLocationSelect?.({ lat, lng, address });
      } catch (error) {
        console.error('Geocoding error:', error);
        onLocationSelect?.({ lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
      }
    });

    setShowTokenInput(false);
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken.trim());
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-muted rounded-lg p-6 space-y-4">
        <MapPin className="w-12 h-12 text-muted-foreground" />
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Map Integration</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            To use the map, please enter your Mapbox public token. Get yours at{' '}
            <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              mapbox.com
            </a>
          </p>
        </div>
        <div className="flex gap-2 w-full max-w-sm">
          <Input
            placeholder="Enter Mapbox public token..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleTokenSubmit()}
          />
          <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium shadow-lg">
        Click on the map to select a location
      </div>
    </div>
  );
};

export default MapComponent;