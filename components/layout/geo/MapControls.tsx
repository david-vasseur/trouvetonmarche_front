'use client';

import { useLocationStore } from '@/lib/store/userLocationStore';
import { useEffect, useState } from 'react';
import SearchInputMap, { CityResult } from '@/components/map/SearchInputMap';
import { getCategories } from '@/actions/category.action';
import { SlidersHorizontal, MapPin, X, ChevronRight } from 'lucide-react';

interface MapControlsProps {
    onLocationSelect: (city: CityResult) => void;
    category: string;
    onCategoryChange: (cat: string) => void;
    startDate: string;
    onStartDateChange: (date: string) => void;
    endDate: string;
    onEndDateChange: (date: string) => void;
}

type CategoriesType = {
    id: number;
    name: string;
    slug: string;
}

export default function MapControls({ 
    onLocationSelect,
    category, onCategoryChange,
    startDate, onStartDateChange,
    endDate, onEndDateChange 
}: MapControlsProps) {
    const { latitude, longitude, radius, setRadius, setLocation } = useLocationStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fetchedCategory, setFetchedCategory] = useState<CategoriesType[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    // 📱 État pour gérer quel panneau mobile est ouvert ('filters' | 'radius' | null)
    const [activePanel, setActivePanel] = useState<'filters' | 'radius' | null>(null);

    useEffect(() => {
        const getAllCategories = async () => {
            const categories = await getCategories();
            setFetchedCategory(categories);
        };
        getAllCategories();
    }, []);

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            setError("Non supporté.");
            return;
        }
        setLoading(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation(pos.coords.latitude, pos.coords.longitude);
                setLoading(false);
            },
            () => {
                setLoading(false);
                setError("Refusé.");
            }
        );
    };

    return (
        <div className={`relative z-[9999] bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-2xl shadow-xl border border-slate-100 max-w-6xl ${!isOpen ? "overflow-hidden" : ""}`}>
            
            {/* ================= DESKTOP VIEW (≥ md) ================= */}
            <div className="hidden md:flex items-start gap-4">
                {/* 1. FILTRES (Gauche) */}
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Filtres</label>
                    <select 
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="text-sm p-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                        <option value="">Toutes catégories</option>
                        {fetchedCategory.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-medium text-slate-400">Période</span>
                        <div className="flex items-center gap-1">
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => onStartDateChange(e.target.value)}
                                className="text-xs p-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                            />
                            <span className="text-xs text-slate-400">au</span>
                            <input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => onEndDateChange(e.target.value)}
                                className="text-xs p-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="h-28 w-px bg-slate-100" />

                {/* 2. GÉOLOC & RECHERCHE (Centre) */}
                <div className="flex flex-col gap-2 min-w-[250px]">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Localisation</label>
                    <button 
                        onClick={handleGetLocation} 
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all shadow-sm text-sm"
                    >
                        {loading ? "Localisation..." : "📍 Ma position"}
                    </button>

                    {latitude && longitude && (
                        <p className="text-[10px] text-emerald-600 font-medium text-center bg-emerald-50 py-1 rounded-md">
                            Position active ✓
                        </p>
                    )}
                    
                    {error && (
                        <p className="text-[10px] text-rose-500 font-medium text-center bg-rose-50 py-1 rounded-md">{error}</p>
                    )}
                    
                    <div className="mt-1">
                         <SearchInputMap onSelectLocation={onLocationSelect} onDropdownChange={setIsOpen} />
                    </div>
                </div>

                <div className="h-28 w-px bg-slate-100" />

                {/* 3. RAYON (Droite) */}
                <div className="flex flex-col gap-3 min-w-[160px]">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 font-medium">Rayon</span>
                        <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 rounded-md">{radius} km</span>
                    </div>
                    <input 
                        type="range" min="1" max="150" value={radius} 
                        onChange={(e) => setRadius(Number(e.target.value))} 
                        className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                    />
                </div>
            </div>


            {/* ================= MOBILE VIEW (< md) ================= */}
            <div className="flex z-1000 md:hidden items-center justify-between gap-2 w-full">
    
    {/* Icône Filtre (gauche) - Ajout de flex-shrink-0 */}
    <button 
        onClick={() => setActivePanel('filters')}
        className="flex-shrink-0 p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all flex items-center justify-center shadow-sm relative"
        aria-label="Ouvrir les filtres"
    >
        <SlidersHorizontal className="w-5 h-5" />
        {(category || startDate || endDate) && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-600 rounded-full" />
        )}
    </button>

    {/* Bloc Localisation central - Ajout de min-w-0 pour éviter qu'il ne pousse les boutons */}
    <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <button 
            onClick={handleGetLocation} 
            disabled={loading}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 text-white font-medium rounded-xl text-xs shadow-sm truncate"
        >
            {loading ? "..." : "📍 Ma position"}
        </button>
        <div className="scale-95">
            <SearchInputMap onSelectLocation={onLocationSelect} onDropdownChange={setIsOpen} />
        </div>
    </div>

    {/* Icône Rayon (droite) - Ajout de flex-shrink-0 */}
    <button 
        onClick={() => setActivePanel('radius')}
        className="flex-shrink-0 p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all flex items-center justify-center shadow-sm"
        aria-label="Ouvrir le rayon"
    >
        <MapPin className="w-5 h-5 text-emerald-600" />
    </button>
</div>


            {/* ================= MOBILE SLIDE-OVER PANELS ================= */}
            {/* Panneau Filtres */}
            <div className={`absolute inset-0 bg-white z-50 p-5 flex-col justify-between transition-transform duration-300 ease-in-out md:hidden overflow-hidden ${
                activePanel === 'filters' ? 'translate-x-0' : 'translate-x-full'
            } ${isOpen ? "hidden" : "flex"}`}>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b pb-3">
                        <select 
                            value={category}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            <option value="">Toutes catégories</option>
                            {fetchedCategory.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <button 
                            onClick={() => setActivePanel(null)}
                            className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                        
                        <div className="flex items-center gap-2">
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => onStartDateChange(e.target.value)}
                                className="text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                            />
                            <span className="text-xs text-slate-400 font-medium">au</span>
                            <input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => onEndDateChange(e.target.value)}
                                className="text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Panneau Rayon */}
            <div className={`absolute inset-0 bg-white z-50 p-5 flex-col justify-between transition-transform duration-300 ease-in-out md:hidden overflow-hidden ${
                activePanel === 'radius' ? 'translate-x-0' : 'translate-x-full'
            } ${isOpen ? "hidden" : "flex"}`}>
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center text-base">
                            <span className="text-slate-600 font-medium">Distance maximale</span>
                            <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">{radius} km</span>
                        </div>
                        <button 
                            onClick={() => setActivePanel(null)}
                            className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        
                        <input 
                            type="range" 
                            min="1" 
                            max="150" 
                            value={radius} 
                            onChange={(e) => setRadius(Number(e.target.value))} 
                            className="w-full h-5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md"
                        />
                        <p className="text-xs text-slate-400 text-center mt-2">
                            Ajuste le curseur pour élargir ou restreindre la zone de recherche autour de ta position.
                        </p>
                    </div>
                </div>

                <button 
                    onClick={() => setActivePanel(null)}
                    className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-700 transition-all text-sm"
                >
                    Valider le rayon
                </button>
            </div>

        </div>
    );
}