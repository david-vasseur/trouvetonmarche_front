"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

// Interface pour le résultat de recherche
export interface CityResult {
  nom: string;
  code: string;
  lat: number;
  lon: number;
}

interface SearchInputMapProps {
    onSelectLocation: (city: any) => void;
    onDropdownChange?: (isOpen: boolean) => void;
}


export default function SearchInputMap({ onSelectLocation, onDropdownChange }: SearchInputMapProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CityResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const isOpen = !loading && isFocused && results.length > 0;

  useEffect(() => {
        if (onDropdownChange) {
            onDropdownChange(isOpen);
        }
    }, [isOpen, onDropdownChange]);

  const debouncedQuery = useDebounce(query, 300);

  const handleSelect = (city: CityResult) => {
    onSelectLocation(city);
    setQuery(""); // Optionnel : vider l'input après sélection
    setResults([]);
    setIsFocused(false);
  };

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    const fetchCities = async () => {
      try {
        setLoading(true);
        const encodedQuery = encodeURIComponent(debouncedQuery);

        // On ne cherche que les communes avec le champ "centre" pour avoir les coordonnées
        const response = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${encodedQuery}&fields=nom,code,centre&limit=10`
        );

        if (!response.ok) throw new Error("Erreur API");

        const data = await response.json();

        // Transformation des données
        const formattedResults: CityResult[] = data.map((city: any) => ({
          nom: city.nom,
          code: city.code,
          // Geo API retourne [longitude, latitude], on inverse pour correspondre aux standards (Leaflet/Maps)
          lon: city.centre.coordinates[0],
          lat: city.centre.coordinates[1],
        }));

        setResults(formattedResults);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [debouncedQuery]);

  return (
    <div className="relative z-2000 w-full max-w-xl mx-auto my-4">
      <div className="relative">
        <Search
          className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-all duration-300 ${
            isFocused ? "opacity-0" : "opacity-100"
          }`}
          size={24}
        />

        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Timeout pour permettre le clic
          placeholder="Rechercher une ville..."
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {loading && (
        <div className="absolute z-20 w-full mt-2 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-lg">
          Recherche...
        </div>
      )}

      {!loading && isFocused && results.length > 0 && (
        <div className="absolute flex flex-col z-9999 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {results.map((city) => (
            <button
              key={`${city.code}`}
              type="button"
              onClick={() => handleSelect(city)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 flex flex-col"
            >
              <span className="font-medium">{city.nom}</span>
              <span className="text-xs text-slate-400">Code: {city.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}