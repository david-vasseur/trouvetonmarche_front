"use client"

import { getMarketsByUserId } from "@/actions/market.action";
import { useUserStore } from "@/lib/store/userStore";
import { normalizeString } from "@/lib/string";
import { formatDate, slugify } from "@/lib/utils";
import { Market } from "@/types/market";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MarketsListPage() {
    const { user } = useUserStore() 
    const [markets, setMarkets] = useState<Market[]>([])
    
    useEffect(() => {
        const getMarkets = async () => {
            const result = await getMarketsByUserId();
            if (result.success && result.data) {
                setMarkets(result.data);
            }
        }
        if (user) {
            getMarkets()
        }
        
    }, [user])

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            {/* En-tête de page */}
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Mes marchés publiés
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Gérez l'ensemble de vos événements et suivez leur statut.
                    </p>
                </div>

                <Link
                    href="/profile/create"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 shadow-sm"
                >
                    + Créer un événement
                </Link>
            </div>

            {/* Liste ou État vide */}
            {markets.length === 0 ? (
                <div className="rounded-[24px] border border-slate-200 bg-white p-12 text-center shadow-sm">
                    <p className="text-base font-medium text-slate-900">
                        Aucun marché associé à votre profil pour le moment.
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        Lancez-vous dès maintenant en créant votre premier événement.
                    </p>
                    <Link
                        href="/profile/create"
                        className="mt-6 inline-flex rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-800 hover:text-white"
                    >
                        Créer un événement
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {markets.map((market: any) => (
                        <div
                            key={market.id}
                            className="flex flex-col justify-between rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                        >
                            <div>
                                {/* Badge de type ou statut */}
                                <div className="flex items-center justify-between">
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                        {formatDate(market.startAt)}
                                    </span>
                                    <span className="text-xs font-medium text-slate-400">
                                        {market.city} ({market.zip})
                                    </span>
                                </div>

                                <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
                                    {market.name}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                                    {market.excerpt || "Aucun résumé renseigné pour cet événement."}
                                </p>
                            </div>

                            {/* Actions de la carte */}
                            <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
                                <Link
                                    href={`/profile/markets/${market.id}/edit`} // Adapte ta route d'édition
                                    className="flex-1 rounded-xl bg-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-800 hover:text-white"
                                >
                                    Modifier
                                </Link>
                                <Link
                                    href={`/${normalizeString(market.region)}/${normalizeString(market.department)}/${normalizeString(market.city)}/${slugify(market.category.name)}/${slugify(market.name)}-${market.id}`} // Lien vers la page publique
                                    className="rounded-xl border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Voir
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}