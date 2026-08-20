"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { Location } from "@/types/geo";
import { getDepartmentById, getRegionById } from "@/lib/geo";
import { normalizeString } from "@/lib/string";

export default function SearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

 const buildLocationUrl = async (location: Location) => {
  const slug = normalizeString(location.nom);

  if (location.type === "region") {
    return `/${slug}`;
  }

  if (location.type === "departement") {
    const region = await getRegionById(location.codeRegion);

    if (!region) {
      return null;
    }

    return `/${normalizeString(region.nom)}/${slug}`;
  }

  if (location.type === "ville") {
    const [region, department] = await Promise.all([
      getRegionById(location.codeRegion),
      getDepartmentById(location.codeDepartement),
    ]);

    if (!region || !department) {
      return null;
    }

    return `/${normalizeString(region.nom)}/${normalizeString(
      department.nom
    )}/${slug}`;
  }

  return null;
};

  const handleClick = async (location: Location) => {
    const url = await buildLocationUrl(location);
    if (url) {
      router.push(url);
    }
  
  };

  useEffect(() => {
  if (debouncedQuery.length < 2) {
    setLocations([]);
    return;
  }

  const fetchLocations = async () => {
    try {
      setLoading(true);

      const encodedQuery = encodeURIComponent(debouncedQuery);

      const [regionsResponse, departmentsResponse, citiesResponse] =
        await Promise.all([
          fetch(
            `https://geo.api.gouv.fr/regions?nom=${encodedQuery}&limit=5`
          ),

          fetch(
            `https://geo.api.gouv.fr/departements?nom=${encodedQuery}&limit=5`
          ),

          fetch(
            `https://geo.api.gouv.fr/communes?nom=${encodedQuery}&fields=nom,code,codeDepartement,codeRegion&limit=10`
          ),
        ]);

      if (
        !regionsResponse.ok ||
        !departmentsResponse.ok ||
        !citiesResponse.ok
      ) {
        throw new Error(
          "Erreur lors de la récupération des résultats"
        );
      }

      const [regions, departments, cities] = await Promise.all([
        regionsResponse.json(),
        departmentsResponse.json(),
        citiesResponse.json(),
      ]);

      const results: Location[] = [
        ...regions.map((region: any) => ({
          nom: region.nom,
          code: region.code,
          type: "region" as const,
        })),

        ...departments.map((department: any) => ({
          nom: department.nom,
          code: department.code,
          codeRegion: department.codeRegion,
          type: "departement" as const,
        })),

        ...cities.map((city: any) => ({
          nom: city.nom,
          code: city.code,
          codeDepartement: city.codeDepartement,
          codeRegion: city.codeRegion,
          type: "ville" as const,
        })),
      ];

      setLocations(results);
    } catch (error) {
      console.error(error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  fetchLocations();
}, [debouncedQuery]);


  return (
    <div className="relative w-full max-w-xl mx-auto my-4">
      <div className="relative">
        <Search
          className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-all duration-300 ${
            isFocused ? "translate-x-2 opacity-0" : "translate-x-0 opacity-100"
          }`}
          size={24}
        />

        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Rechercher un marché..."
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {loading && (
        <div className="absolute z-10 w-full mt-2 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-lg">
          Recherche...
        </div>
      )}


    {!loading && locations.length > 0 && (
    <div className="absolute flex flex-col z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        {locations.map((location) => (
        <button
            key={`${location.type}-${location.code}`}
            type="button"
            onClick={() => handleClick(location)}
            className="w-full px-4 py-3 text-left hover:bg-gray-100"
        >
            <div className="font-medium">
            {location.nom}
            </div>

            <div className="text-sm text-muted-foreground">
            {location.type === "region" && "Région"}
            {location.type === "departement" && "Département"}
            {location.type === "ville" && "Ville"}
            </div>
        </button>
        ))}
    </div>
    )}

    </div>
  );
}
