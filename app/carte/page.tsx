'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useLocationStore } from '@/lib/store/userLocationStore';
import MapControls from '@/components/layout/geo/MapControls';
import { CityResult } from '@/components/map/SearchInputMap';
import { getFilteredMarkets } from '@/actions/market.action';

// Chargement dynamique obligatoire
const Map = dynamic(() => import('@/components/map/MapContainer'), { ssr: false });

export default function CartePage() {

    const { latitude, longitude, radius, setLocation } = useLocationStore();

    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMarkets = async () => {
            if (!latitude || !longitude) return;
            
            setLoading(true);
            const result = await getFilteredMarkets({
                lat: latitude,
                lng: longitude,
                radius,
                categoryId: category ? category : undefined,
                startDate: startDate ? startDate : undefined,
                endDate: endDate ? endDate : undefined
            });

            if (result.success) {
                setMarkets(result.data);
            }
            setLoading(false);
        };

        fetchMarkets();
    }, [latitude, longitude, radius, category, startDate, endDate]);

    const handleLocationSelect = (city: CityResult) => {
        // On met à jour le store avec la latitude et la longitude de la ville choisie
        setLocation(city.lat, city.lon);
        console.log(`📍 Ville sélectionnée : ${city.nom} (${city.lat}, ${city.lon})`);
    };

    // Trigger de recherche quand lat/lng ou radius changent
    useEffect(() => {
        if (latitude && longitude) {
            // TODO: Appeler ta Server Action getMarketsByRadius(lat, lng, radius)
            console.log(`Recherche marchés à ${radius}km de ${latitude}, ${longitude}`);
        }
    }, [latitude, longitude, radius]);

    return (
        <main className="h-lvh overflow-hidden flex flex-col -gap-10">
            {/* Header / Contrôles */}
            <div className="relative z-9999 mt-18 p-4 z-10 flex gap-4 justify-center items-center">
                <MapControls
                    onLocationSelect={handleLocationSelect}
                    category={category}
                    onCategoryChange={setCategory}
                    startDate={startDate}
                    onStartDateChange={setStartDate}
                    endDate={endDate}
                    onEndDateChange={setEndDate}
                />
            </div>

            {/* Carte */}
            <div className="flex-grow">
                {latitude && longitude ? (
                    <Map lat={latitude} lng={longitude} radius={radius} markets={markets} />
                ) : (
                    <div className="h-full flex items-center justify-center">Activez la géolocalisation ou selectionnez une ville pour afficher la carte</div>
                )}
            </div>
        </main>
    );
}