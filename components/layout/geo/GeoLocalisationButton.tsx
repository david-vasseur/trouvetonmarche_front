'use client';

import { useLocationStore } from '@/lib/store/userLocationStore';
import { useState } from 'react';

export default function GeolocationButton() {
    // 1. On récupère le store et la fonction setLocation
    const { latitude, longitude, setLocation } = useLocationStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            setError("La géolocalisation n'est pas supportée par votre navigateur.");
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude: lat, longitude: lng } = position.coords;
                
                // 2. 🎉 On stocke directement dans Zustand !
                setLocation(lat, lng);
                
                setLoading(false);
                console.log("Position enregistrée dans Zustand :", lat, lng);
            },
            (err) => {
                setLoading(false);
                setError("Impossible de récupérer votre position.");
                console.error(err);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    return (
        <div className="flex flex-col gap-2 items-start">
            <button 
                onClick={handleGetLocation} 
                disabled={loading}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
                {loading ? "Localisation..." : "📍 Utiliser ma position"}
            </button>

            {/* 3. Tu peux afficher l'état directement depuis le store */}
            {latitude && longitude && (
                <p className="text-sm text-slate-600">
                    Lat: {latitude.toFixed(4)} | Lng: {longitude.toFixed(4)}
                </p>
            )}

            {error && (
                <p className="text-sm text-rose-500">{error}</p>
            )}
        </div>
    );
}