import { ReactNode, useEffect, useState } from "react";

interface StaticMapProps {
  apiKey: string;
  polyline: string; // Encoded polyline for the route
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
}

// Componente para plotar o mapa estático da rota
export default function StaticMap({
  apiKey,
  polyline,
  origin,
  destination,
}: StaticMapProps): ReactNode {
  const [mapUrl, setMapUrl] = useState<string>("");

  useEffect(() => {
    const generateMapUrl = () => {
      const base_url = "https://maps.googleapis.com/maps/api/staticmap";
      const params = new URLSearchParams({
        size: "543x400", // Width x Height of the map
        maptype: "roadmap",
        path: `enc:${polyline}`, // Encoded polyline for the route
        markers: `markers=markersStyle|color:green|label:A|${origin.latitude},${origin.longitude}|color:red|label:B|${destination.latitude},${destination.longitude}`,
        key: apiKey,
      });

      setMapUrl(`${base_url}?${params.toString()}`);
    };

    generateMapUrl();
  }, [apiKey, polyline, origin, destination]);

  return (
    <div>
      {mapUrl ? (
        <img className="rounded-2xl" src={mapUrl} alt="Route Map" />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
}
