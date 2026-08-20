"use client";

import { useState } from "react";

import MarketGeneralForm from "./MarketGeneralForm";
import MarketLocationForm from "./MarketLocationForm";
import MarketDateForm from "./MarketDateForm";
import MarketExhibitorForm from "./MarketExhibitorForm";
import MarketContentForm from "./MarketContentForm";
import { MarketFormValues } from "@/schema/market/market.schema";
import { createMarket } from "@/actions/market.action";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";
import { redirect } from "next/navigation";

type Category = {
    id: number;
    name: string;
    slug: string;
};

type Props = {
    userId: Number;
    categories: Category[];
};

export default function MarketCreateWizard({ categories, userId }: Props) {
    const [step, setStep] = useState(1);
    const [marketData, setMarketData] = useState<Partial<MarketFormValues>>({});

    return (
        <>
        {/* Progression */}
        <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                {step}
            </div>

            <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                {step === 1 && "Informations générales"}
                {step === 2 && "Localisation"}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                {step === 1 && "Nom, type d'événement et mots-clés"}
                {step === 2 && "Adresse et ville"}
                </p>
            </div>

            <div className="ml-auto hidden text-xs font-medium text-emerald-600 sm:block">
                Étape {step} sur 5
            </div>
            </div>
        </div>

        {/* Formulaire */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 border-b border-slate-100 pb-6">
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                {step === 1 && "Informations générales"}
                {step === 2 && "Localisation"}
                {step === 3 && "Dates de l'evenement"}
                {step === 4 && "Informations pour les exposants"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
                {step === 1 &&
                "Ces informations permettront aux visiteurs d'identifier rapidement votre événement."}

                {step === 2 &&
                "Indiquez où se déroulera votre événement."}
                {step === 3 &&
                "Ces dates permetront de vous trouver rapidement"}
                {step === 4 && "Mettez ici toutes les infos pratiques qui ne seront visibles que pour les exposants"}
            </p>
            </div>

            {step === 1 && (
            <MarketGeneralForm
                categories={categories}
                onNext={(values) => {
                    setMarketData((prev) => ({
                    ...prev,
                    ...values,
                    }));

                    setStep(2);
                }}
            />
            )}

            {step === 2 && (
                <MarketLocationForm
                    onPrevious={() => setStep(1)}
                    onNext={(values) => {
                        setMarketData((prev) => ({
                        ...prev,
                        ...values,
                        }));

                        setStep(3);
                    }}
                />
            )}
            {step === 3 && (
                <MarketDateForm
                    onPrevious={() => setStep(2)}
                    onNext={(values) => {
                        setMarketData((prev) => ({
                        ...prev,
                        ...values,
                        }));

                        setStep(4);
                    }}
                />
            )}
            {step === 4 && (
                <MarketExhibitorForm 
                    onPrevious={() => setStep(3)}
                    onNext={(values) => {
                        setMarketData((prev) => ({
                        ...prev,
                        ...values,
                        }));

                        setStep(5);
                    }}
                />
            )}
            {step === 5 && (
                <MarketContentForm 
                    onPrevious={() => setStep(4)}
                    onNext={async (values) => {
                        const nextMarketData = {
                            ...marketData,
                            ...values,
                            userId,
                        };

                        setMarketData(nextMarketData);
                        const result = await createMarket(marketData);
                        if (result.success) {
                            toast.success("Création reussi")
                            redirect("/profile/markets")
                        }
                    }}
                />
            )}
            
        </section>
        </>
    );
}