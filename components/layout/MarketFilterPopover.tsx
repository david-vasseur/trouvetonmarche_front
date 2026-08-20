import { Check, SlidersHorizontal, X } from "lucide-react";

type MarketFilterPopoverProps = {
    filters: string[];
    activeFilter: string | null;
    draftFilter: string | null;
    onDraftChange: (filter: string | null) => void;
    onApply: () => void;
    onReset: () => void;
    onClose: () => void;
};

export default function MarketFilterPopover({
    filters,
    activeFilter,
    draftFilter,
    onDraftChange,
    onApply,
    onReset,
    onClose,
}: MarketFilterPopoverProps) {
    return (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                    Affiner les résultats
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                    aria-label="Fermer le filtrage"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <div className="space-y-2">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100">
                    <span>Tous les marchés</span>
                    <span className="relative flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-white">
                        {draftFilter === null && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                    </span>
                    <input
                        type="checkbox"
                        checked={draftFilter === null}
                        onChange={() => onDraftChange(null)}
                        className="sr-only"
                    />
                </label>

                {filters.map((filter) => {
                    const checked = draftFilter === filter;

                    return (
                        <label
                            key={filter}
                            className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm capitalize text-slate-700 transition hover:bg-slate-100"
                        >
                            <span>{filter}</span>
                            <span className="relative flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-white">
                                {checked && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                            </span>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onDraftChange(checked ? null : filter)}
                                className="sr-only"
                            />
                        </label>
                    );
                })}
            </div>

            <div className="mt-4 flex gap-2">
                <button
                    type="button"
                    onClick={onReset}
                    className="flex-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                    Réinitialiser
                </button>

                <button
                    type="button"
                    onClick={onApply}
                    className="flex-1 rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-slate-700"
                >
                    Appliquer
                </button>
            </div>
        </div>
    );
}
