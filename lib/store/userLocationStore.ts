import { create } from 'zustand';

interface LocationState {
    latitude: number | null;
    longitude: number | null;
    radius: number; // ✅ Ajout du radius (en km)
    
    setLocation: (latitude: number, longitude: number) => void;
    setRadius: (radius: number) => void; // ✅ Ajout de l'action pour le radius
    clearLocation: () => void;
}

// Définition du rayon par défaut
const DEFAULT_RADIUS = 10;

export const useLocationStore = create<LocationState>((set) => ({
    latitude: null,
    longitude: null,
    radius: DEFAULT_RADIUS, // ✅ Initialisation du radius

    setLocation: (latitude, longitude) => set({ latitude, longitude }),
    
    setRadius: (radius) => set({ radius }), // ✅ Implémentation de setRadius

    clearLocation: () => set({ 
        latitude: null, 
        longitude: null, 
        radius: DEFAULT_RADIUS // ✅ Reset du radius aussi
    }),
}));