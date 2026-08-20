"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import type { CitySearchResult } from "@/types/geo";
import { searchCities } from "@/lib/utils";

type Props = {
  value: string;
  onSelect: (city: CitySearchResult) => void;
};

export default function CitySearchInput({ value, onSelect }: Props) {

	const [query, setQuery] = useState(value);
	const [cities, setCities] = useState<CitySearchResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [focused, setFocused] = useState(false);

  	const debouncedQuery = useDebounce(query, 300);

	useEffect(() => {
		setQuery(value);
	}, [value]);

	useEffect(() => {
		const search = async () => {
			const query = debouncedQuery.trim();

			if (query.length < 2) {
				setCities([]);
				setLoading(false);
				return;
			}

			try {
				setLoading(true);

				const results = await searchCities(query, 8);

				setCities(results);
			} catch (error) {
				console.error("Erreur recherche villes :", error);
				setCities([]);
			} finally {
				setLoading(false);
			}
		};

		search();
	}, [debouncedQuery]);

	const handleSelect = (city: CitySearchResult) => {
		setQuery(city.nom);
		setCities([]);
		onSelect(city);
	};

	return (
		<div className="relative">
			<input
				type="text"
				value={query}
				onChange={(event) => {
				setQuery(event.target.value);
				}}
				onFocus={() => setFocused(true)}
				className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"

				placeholder="Rechercher une ville..."
				autoComplete="off"
			/>

			{focused && loading && (
				<div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-500 shadow-lg">
				Recherche...
				</div>
			)}

			{focused && !loading && cities.length > 0 && (
				<div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
				{cities.map((city) => (
					<button
					key={city.code}
					type="button"
					onMouseDown={(event) => {
						event.preventDefault();
					}}
					onClick={() => handleSelect(city)}
					className="w-full px-4 py-3 text-left transition hover:bg-slate-50"
					>
					<p className="font-medium text-slate-900">
						{city.nom}
					</p>

					<p className="mt-0.5 text-xs text-slate-500">
						{city.codesPostaux?.join(", ")}
					</p>
					</button>
				))}
				</div>
			)}
		</div>
	);
}