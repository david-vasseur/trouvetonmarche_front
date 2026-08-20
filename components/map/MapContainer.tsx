'use client';
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import Link from 'next/link';
import { formatDate, slugify } from '@/lib/utils';
import { normalizeString } from '@/lib/string';

// Fix icône Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function RecenterMap({ lat, lng }: { lat: number, lng: number }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);
  return null;
}

const groupMarketsByPosition = (markets: any[] = []) => {
    if (!Array.isArray(markets)) return [];
    
    // 💡 On utilise 'marketMap' au lieu de 'Map' pour éviter le conflit
    const marketMap = new Map();
    markets.forEach((market) => {
        if (!market) return;
        const key = `${market.latitude}-${market.longitude}`;
        if (!marketMap.has(key)) {
            marketMap.set(key, { ...market, groupedMarkets: [market] });
        } else {
            marketMap.get(key).groupedMarkets.push(market);
        }
    });
    return Array.from(marketMap.values());
};

export default function MapContainerComponent({ lat, lng, radius = 10, markets = [] }: any) {
  if (lat == null || lng == null) {
    return null;
  }

  const uniqueLocationMarkets = groupMarketsByPosition(markets);

  return (
    <LeafletMapContainer center={[lat, lng]} zoom={12} className="h-full w-full">
        <div className='absolute w-full h-50 bg-linear-to-b from-[#f4f7f9] to-transparent z-1000 pointer-events-none' />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RecenterMap lat={lat} lng={lng} />
      
      <Circle center={[lat, lng]} radius={radius * 1000} color="#059669" fillColor="#059669" fillOpacity={0.1} />

      {uniqueLocationMarkets.map((group: any) => (
        <Marker key={group.id} position={[group.latitude, group.longitude]}>
          <Popup>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto min-w-[200px] p-1">
              {group.groupedMarkets.map((market: any) => (
                <Link 
                  key={market.id} 
                  href={`/${normalizeString(market.region)}/${normalizeString(market.department)}/${normalizeString(market.city)}/${slugify(market.category.name)}/${slugify(market.name)}-${market.id}`}                   
                  className="block p-2 rounded-lg hover:bg-emerald-50 transition-colors group border-b last:border-none border-slate-100"
                >
                  <div className="font-semibold text-emerald-700 group-hover:text-emerald-800 text-sm">
                    {market.name}
                  </div>
                  <div className="font-semibold text-emerald-700 group-hover:text-emerald-800 text-sm">
                    le {formatDate(market.startAt)}
                  </div>
                  <div className="text-xs text-slate-500">
                    {market.city}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <span>Voir le détail</span> <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </Popup>
        </Marker>
      ))}
    </LeafletMapContainer>
  );
}