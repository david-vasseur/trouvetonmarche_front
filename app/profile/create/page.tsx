"use client"

import Link from "next/link";
import { ArrowLeft, CircleHelp } from "lucide-react";
import MarketCreateWizard from "@/components/form/market/MarketWrapperForm";
import { useUserStore } from "@/lib/store/userStore";
import { redirect } from "next/navigation";


export default function CreateMarketPage() {

    const { user } = useUserStore();

    if (!user) {
    redirect("/login");
}

    const categories = [
        {
        id: 1,
        name: "Marché",
        slug: "marche",
        },
        {
        id: 2,
        name: "Marché nocturne",
        slug: "marche-nocturne",
        },
        {
        id: 3,
        name: "Foire",
        slug: "foire",
        },
        {
        id: 4,
        name: "Salon",
        slug: "salon",
        },
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200/80 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Retour
                </Link>

                <div className="text-sm font-medium text-slate-400">
                    TrouveTonMarché
                </div>
                </div>
            </header>

            <div className="mx-auto max-w-4xl px-6 py-10 sm:py-14">
                <div className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    Création d'un événement
                </p>

                <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                    Présentons votre événement
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                    Commencez par les informations essentielles. Vous pourrez
                    compléter les détails de votre événement aux prochaines étapes.
                </p>
                </div>

                <MarketCreateWizard categories={categories} userId={user.id} />

                <div className="mt-6 flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                <p className="text-xs leading-5 text-slate-500">
                    Pas d'inquiétude : vous pourrez revenir sur les informations
                    saisies avant de publier votre événement.
                </p>
                </div>
            </div>
        </main>
    );
}