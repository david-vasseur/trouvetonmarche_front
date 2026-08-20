'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '@/actions/category.action';
import { getFilteredMarkets } from '@/actions/market.action';
import { MapPin, ArrowRight, ShieldCheck, Layers, ArrowDown } from 'lucide-react';
import MarketCard from '@/components/ui/MarketCard';

type CategoryType = {
    id: number;
    name: string;
    slug: string;
};

// Association d'images haut de gamme par slug (avec un fallback)
const CATEGORY_VISUALS: Record<string, { image: string; badge: string; subtitle: string; description: string }> = {
    'producteurs': {
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
        badge: "Circuit Court",
        subtitle: "Du producteur à l'assiette",
        description: "Rencontrez les agriculteurs, maraîchers et artisans passionnés de votre région. Des fruits gorgés de soleil aux fromages AOP, savourez l'authenticité et la fraîcheur absolue."
    },
    'brocante': {
        image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1200&auto=format&fit=crop",
        badge: "Chine & Patrimoine",
        subtitle: "L'art de donner une seconde vie",
        description: "Flânez dans les allées à la recherche de la perle rare. Meubles vintages, livres anciens, vaisselle rétro et objets de collection vous attendent lors de ces rendez-vous de passionnés."
    },
    'artisanat': {
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
        badge: "Savoir-faire",
        subtitle: "L'excellence des mains libres",
        description: "Découvrez les créations uniques d'artisans d'art locaux. Céramique, maroquinerie, bijoux et pièces de décoration façonnés avec exigence et créativité."
    },
    'default': {
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
        badge: "Immersion locale",
        subtitle: "À la découverte des traditions",
        description: "Explorez les rendez-vous incontournables de votre région. Chaque marché raconte une histoire unique et met en valeur le dynamisme local."
    }
};



export default function CategoriesPage() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
    const [markets, setMarkets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const scrollToEvents = () => {
        const section = document.getElementById('events-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        async function fetchCats() {
            const res = await getCategories();
            if (Array.isArray(res) && res.length > 0) {
                setCategories(res);
                setSelectedCategory(res[0]);
            }
        }
        fetchCats();
    }, []);

    useEffect(() => {
        async function fetchMarketsForCategory() {
            if (!selectedCategory) return;
            setLoading(true);
            const res = await getFilteredMarkets({ categoryId: selectedCategory.id.toString() });
            if (res.success) {
                setMarkets(res.data);
            }
            setLoading(false);
        }
        fetchMarketsForCategory();
    }, [selectedCategory]);

    const currentDetail = selectedCategory 
        ? CATEGORY_VISUALS[selectedCategory.slug] || CATEGORY_VISUALS.default 
        : CATEGORY_VISUALS.default;

    return (
        <main className="relative min-h-screen bg-[#F5F5F7] mt-18 text-slate-900 pb-20">
            <div className='fixed top-0 z-900 w-full h-22 bg-[#F5F5F7]' />
            {/* Header minimaliste type Apple */}
            <header className="w-full xl:w-[85vw] sticky z-1000 top-18 mx-auto px-6 pt-4 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
                
                {/* Header façon "App Header" */}
                <div className="bg-white/80 backdrop-blur-md w-full p-2 sm:p-6 rounded-3xl shadow-xl border border-slate-100/80 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                                Explorez par thématique
                            </h1>
                        </div>
                    </div>

                    <Link
                        href="/carte"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white font-medium rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-slate-900/10 text-sm group"
                    >
                        <MapPin className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" /> 
                        <span>Ouvrir la carte</span>
                    </Link>
                </div>
            </header>

            {/* Container Principal : Split-View */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* 1. SIDEBAR FIXED (sticky top-6) */}
                <aside className="lg:col-span-4 lg:sticky lg:top-56 flex flex-col gap-3">
                    
                    <div className="flex flex-col gap-2.5">
                        {categories.map((cat) => {
                            const isSelected = selectedCategory?.id === cat.id;
                            const visual = CATEGORY_VISUALS[cat.slug] || CATEGORY_VISUALS.default;

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`relative w-full h-15 text-left rounded-2xl overflow-hidden transition-all duration-300 group flex items-center p-3 shadow-sm ${
                                        isSelected 
                                            ? 'ring-2 ring-emerald-500 shadow-xl scale-[1.02]' 
                                            : 'hover:scale-[1.01] opacity-90 hover:opacity-100'
                                    }`}
                                >
                                    {/* Image de fond de la card avec effet zoom au survol */}
                                    <img 
                                        src={visual.image} 
                                        alt={cat.name}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Dégradé sombre pour garantir une lisibilité parfaite du texte */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />

                                    {/* Indicateur de sélection lumineux */}
                                    {isSelected && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 shadow-[0_0_12px_#10b981]" />
                                    )}

                                    {/* Contenu textuel de la card */}
                                    <div className="relative z-10 flex items-center justify-between w-full pl-2">
                                        <div>
                                            <h3 className="font-bold text-white text-base tracking-tight">
                                                {cat.name}
                                            </h3>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                            isSelected ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100'
                                        }`}>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </aside>


                {/* 2. ZONE PRINCIPALE DROITE (Éditorial + Showcase) */}
                <div className="lg:col-span-8 px-8 flex flex-col gap-8">
                    
                    {/* Encadré Éditorial */}
                    <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/60 relative overflow-hidden flex flex-col gap-6">
                        {selectedCategory ? (
                            <>
                                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-inner">
                                    <img 
                                        src={currentDetail.image} 
                                        alt={selectedCategory.name}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                                    
                                    <div className="absolute bottom-6 left-6 right-6 text-white">
                                        <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase mb-2 shadow-sm">
                                            {currentDetail.badge}
                                        </span>
                                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                            {selectedCategory.name}
                                        </h2>
                                        <p className="text-slate-200 text-xs sm:text-sm font-medium mt-1">
                                            {currentDetail.subtitle}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                                        À propos de cette thématique
                                    </h3>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                        {currentDetail.description}
                                    </p>
                                </div>

                                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                        <span>{markets.length} marché(s) disponible(s) dans cette catégorie</span>
                                    </div>
                                    <button
                                        onClick={scrollToEvents}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all shadow-md text-xs sm:text-sm cursor-pointer"
                                    >
                                        <span>voir les événements</span>
                                        <ArrowDown className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="h-96 flex items-center justify-center text-slate-400 text-sm">
                                Sélectionnez une catégorie...
                            </div>
                        )}
                    </section>


                    {/* 3. EN DESSOUS : Ton composant HomeShowcase */}
                    <section id='events-section' className="scroll-mt-56">
                        <div className="mb-6 w-full flex items-center justify-center">
                            <div className='text-center'>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Événements associés
                                </h2>
                                <p className="text-xs text-center text-slate-500 mt-0.5">
                                    Aperçu des marchés correspondants à votre sélection
                                </p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="h-48 flex items-center justify-center bg-white rounded-3xl border border-slate-200/60 shadow-sm">
                                <p className="text-xs font-medium text-slate-400 animate-pulse">Chargement des marchés...</p>
                            </div>
                        ) : markets.length === 0 ? (
                            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/60 shadow-sm">
                                <p className="text-sm text-slate-500">Aucun marché trouvé pour cette catégorie actuellement.</p>
                            </div>
                        ) : (
                            /* Remplace par <HomeShowcase markets={markets} /> dès que tu l'importes */
                            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                                {markets.map((market) => (
                                    <MarketCard market={market} />
                                ))}
                            </div>
                        )}
                    </section>

                </div>

            </div>
        </main>
    );
}