import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, Coins, MapPin, Repeat2 } from "lucide-react";
import { normalizeString } from "@/lib/string";
import { Market } from "@/types/market";
import { formatDate, formatMarketType, formatPrice, slugify } from "@/lib/utils";

type Props = {
    market: Market;
};

function formatRecurrence(recurrence?: string | null) {
    switch (recurrence) {
        case "WEEKLY":
            return "Hebdomadaire";
        case "BIWEEKLY":
            return "Bihebdomadaire";
        case "MONTHLY":
            return "Mensuel";
        case "YEARLY":
            return "Annuel";
        default:
            return "Ponctuel";
    }
}

function formatOpeningHours(openingHours?: Market["openingHours"]) {
    if (!openingHours || openingHours.length === 0) {
        return "Horaires à venir";
    }

    const summary = [...openingHours]
        .sort(
            (a, b) =>
                new Date(a.date).getTime() -
                new Date(b.date).getTime(),
        )
        .slice(0, openingHours.length)
        .map((entry) => {
            const date = new Intl.DateTimeFormat("fr-FR", {
                weekday: "short",
            }).format(new Date(entry.date));

            return `${date} ${entry.openAt}–${entry.closeAt}`;
        });

    return summary.join(" • ");
}

function MarketCard({ market }: Props) {
    const tagList = market.tags ?? [];
    const openingHoursLabel = formatOpeningHours(market.openingHours);
    const marketTypeLabel = formatMarketType(market.marketType);
    const recurrenceLabel = formatRecurrence(market.recurrence);
    const priceLabel = formatPrice(market.price ?? market.standPrice ?? null);

    return (
        <article className="group relative w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5">
            
            {/* 1. LIEN PRINCIPAL ÉTIRÉ (Couvre toute la carte) */}
            <Link
                href={`/${normalizeString(market.region)}/${normalizeString(market.department)}/${normalizeString(market.city)}/${slugify(market.category.name)}/${slugify(market.name)}-${market.id}`}
                className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                aria-labelledby={`market-${market.id}-title`}
            >
                <span className="sr-only">Voir les détails de {market.name}</span>
            </Link>

            {/* IMAGE */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                {market.image ? (
                    <img
                        src={market.image}
                        alt={market.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-50 to-amber-50">
                        <span className="text-4xl opacity-40">🏘️</span>
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent pointer-events-none" />

                {/* Date */}
                <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 text-sm font-medium text-white pointer-events-none">
                    <CalendarDays className="h-4 w-4" />
                    <time dateTime={market.startAt ?? undefined}>{formatDate(market.startAt ?? undefined)}</time>
                </div>

                {/* Tags image */}
                {tagList.length > 0 && (
                    <div className="absolute right-5 top-5 z-20 flex flex-wrap justify-end gap-2 pointer-events-none">
                        {tagList.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm backdrop-blur-sm pointer-events-auto"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-6">
                {/* Location (Lien indépendant avec z-20) */}
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />

                    <Link
                        href={`/${normalizeString(market.region)}/${normalizeString(market.department)}/${normalizeString(market.city)}`}
                        className="relative z-20 truncate transition-colors hover:text-emerald-600 hover:underline"
                    >
                        {market.city}
                        {market.department ? ` · ${market.department}` : ""}
                    </Link>
                </div>

                {/* Title */}
                <h2
                    id={`market-${market.id}-title`}
                    className="mt-3 font-heading text-2xl font-semibold leading-tight tracking-tight text-slate-950"
                >
                    {market.name}
                </h2>

                {/* Address */}
                {market.address && (
                    <p className="mt-2 text-sm text-slate-500">
                        {market.address}
                        {market.zip ? ` · ${market.zip}` : ""}
                    </p>
                )}

                {/* Excerpt */}
                {market.excerpt && (
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
                        {market.excerpt}
                    </p>
                )}

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                        <Clock3 className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="truncate">{openingHoursLabel}</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                        <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="truncate">{marketTypeLabel}</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                        <Coins className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="truncate">{priceLabel}</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                        <Repeat2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="truncate">{recurrenceLabel}</span>
                    </div>
                </div>

                {/* Tags secondaires */}
                {tagList.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {tagList.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* FOOTER */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="text-sm font-medium text-slate-500">
                        Découvrir le marché
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-all duration-300 group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                </div>
            </div>
        </article>
    );
}

export default MarketCard;