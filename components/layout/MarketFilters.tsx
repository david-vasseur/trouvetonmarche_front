"use client";

import { useEffect, useRef, useState } from "react";
import { Filter } from "lucide-react";
import MarketFilterPopover from "@/components/layout/MarketFilterPopover";

type MarketFiltersProps = {
    filters: string[];
    activeFilter: string | null;
    onFilterChange: (filter: string | null) => void;
};

export default function MarketFilters({
    filters,
    activeFilter,
    onFilterChange,
}: MarketFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [draftFilter, setDraftFilter] = useState<string | null>(activeFilter);
    const panelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setDraftFilter(activeFilter);
    }, [activeFilter]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!panelRef.current) return;

            if (!panelRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleApply = () => {
        onFilterChange(draftFilter);
        setIsOpen(false);
    };

    const handleReset = () => {
        setDraftFilter(null);
        onFilterChange(null);
        setIsOpen(false);
    };

    return (
        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-8 mb-30 sm:px-6 lg:px-8" ref={panelRef}>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-sm backdrop-blur">
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onFilterChange(null)}
                        className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                            activeFilter === null
                                ? "bg-slate-900 text-white shadow-sm"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        Tous
                    </button>

                    {filters.map((filter) => {
                        const isActive = activeFilter === filter;

                        return (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => onFilterChange(filter)}
                                className={`rounded-full px-3.5 py-2 text-sm font-medium capitalize transition-all duration-200 ${
                                    isActive
                                        ? "bg-emerald-600 text-white shadow-sm"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                            >
                                {filter}
                            </button>
                        );
                    })}
                </div>

                <div className="relative ml-auto">
                    <button
                        type="button"
                        onClick={() => {
                            setDraftFilter(activeFilter);
                            setIsOpen((prev) => !prev);
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-white"
                    >
                        <Filter className="h-4 w-4" />
                        <span>Filtrer</span>
                    </button>

                    {isOpen && (
                        <MarketFilterPopover
                            filters={filters}
                            activeFilter={activeFilter}
                            draftFilter={draftFilter}
                            onDraftChange={setDraftFilter}
                            onApply={handleApply}
                            onReset={handleReset}
                            onClose={() => setIsOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
