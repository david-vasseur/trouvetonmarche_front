"use client";

import { useUserStore } from "@/lib/store/userStore";

type ElectricityOption = "NONE" | "INCLUDED" | "PAID";

type MarketProfessionalInfoProps = {
  standPrice?: number | string | null;
  price?: number | string | null;
  history?: number | null;
  visitors?: number | null;

  exhibitors?: number | null;
  registrationsOpen?: boolean;

  standSizes?: string[];
  electricity?: ElectricityOption;

  marketType?: "COVERED" | "EXTERIOR" | "BOTH";
  barnum?: "REQUIRED" | "FORBIDDEN" | "OPTIONAL";

  parkingAvailability?: "NEARBY" | "FAR" | "NONE";
  parkingFree?: boolean;
  
};

const formatPrice = (value?: number | string | null) => {
  if (value == null) return "Non renseigné";

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value));
};

const getBarnumLabel = (
  barnum?: "REQUIRED" | "FORBIDDEN" | "OPTIONAL" | undefined
) => {
  switch (barnum) {
    case "REQUIRED":
      return "Barnum obligatoire";
    case "FORBIDDEN":
      return "Barnum interdit";
    case "OPTIONAL":
      return "Barnum libre";
    default:
      return "Non renseigné";
  }
};

const electricityLabels: Record<ElectricityOption, string> = {
  NONE: "Pas d'électricité",
  INCLUDED: "Électricité incluse",
  PAID: "Électricité disponible · supplément",
};

export default function MarketProfessionalInfo({
    marketType,
    standPrice,
    price,
    history,
    visitors,
    exhibitors,
    registrationsOpen = false,
    standSizes = [],
    electricity = "NONE",
    parkingAvailability,
    parkingFree,
    barnum
}: MarketProfessionalInfoProps) {
  const { user } = useUserStore();

  const isProfessional =
    user?.roles.includes("EXPOSANT") ||
    user?.roles.includes("ORGANISATEUR");

  if (!isProfessional) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
          Espace professionnel
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Informations exposants
          </h2>

          {registrationsOpen ? (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Inscriptions ouvertes
            </span>
          ) : (
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
              Inscriptions fermées
            </span>
          )}
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Retrouvez ici les informations nécessaires pour préparer votre
          participation à ce marché.
        </p>
      </div>

      {/* Tarifs */}
      <div className="mt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          Tarifs
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Prix du stand
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              <em className="text-sm font-normal">à partir de</em> {formatPrice(standPrice)}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Prix d'entrée
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              {formatPrice(price)}
            </p>
          </div>
        </div>
      </div>

      {/* Stands */}
      <div className="mt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          Modalités du stand
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Tailles */}
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Tailles disponibles
            </p>

            {standSizes.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {standSizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                  >
                    {size} m
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm font-semibold text-slate-900">
                Non renseigné
              </p>
            )}
          </div>

          {/* Électricité */}
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Électricité
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              {electricityLabels[electricity]}
            </p>
          </div>
        </div>
      </div>

            <div className="grid gap-4 sm:grid-cols-2">
        {/* PARKING */}
        <div className="mt-6 rounded-2xl bg-white p-4 col-span-1">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Parking
            </p>

            <p className="mt-2 font-semibold text-slate-900">
                {parkingAvailability === "NEARBY" && (
                <>
                    Proche · {parkingFree ? "gratuit" : "payant"}
                </>
                )}

                {parkingAvailability === "FAR" && (
                <>
                    Éloigné · {parkingFree ? "gratuit" : "payant"}
                </>
                )}

                {parkingAvailability === "NONE" && (
                "Pas de parking identifié"
                )}
            </p>
        </div>

        <div className="rounded-2xl bg-white p-4 mt-6">
  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
    Installation
  </p>

  <div className="mt-3 space-y-2">
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-slate-600">
        Barnum
      </span>

      <span className="font-semibold text-slate-900">
        {getBarnumLabel(barnum)}
      </span>
    </div>

    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-slate-600">
        Couvert
      </span>

      <span className="font-semibold text-slate-900">
        {marketType === "COVERED"
          ? "Oui"
          : marketType === "EXTERIOR"
            ? "Non"
            : marketType === "BOTH"
              ? "Partiellement"
              : "Non renseigné"}
      </span>
    </div>
  </div>
</div>
</div>

      {/* Capacité / fréquentation */}
      <div className="mt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          Le marché
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Exposants recherchés
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              {exhibitors != null
                ? `${exhibitors} exposant${exhibitors > 1 ? "s" : ""}`
                : "Non renseigné"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Éditions précédentes
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              {history ?? 0}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Visiteurs estimés
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              {visitors?.toLocaleString("fr-FR") ?? "Non renseigné"}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      {registrationsOpen && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-900">
            Les inscriptions sont ouvertes
          </p>

          <p className="mt-1 text-sm text-emerald-800/80">
            Vous souhaitez participer à ce marché ? Contactez directement
            l'organisateur pour connaître les modalités d'inscription.
          </p>
        </div>
      )}
    </section>
  );
}