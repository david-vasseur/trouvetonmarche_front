"use client";

import { Heart, Share2 } from "lucide-react";

type MarketHeaderProps = {
  name: string;
  city: string;
  department?: string | null;
  image?: string | null;
  marketType: "COVERED" | "EXTERIOR" | "BOTH";

  isFavorite?: boolean;
  onFavorite?: () => void;
  onShare?: () => void;
};

const marketTypeLabels = {
  COVERED: "Marché couvert",
  EXTERIOR: "Marché extérieur",
  BOTH: "Marché couvert & extérieur",
};

export default function MarketHeader({
  name,
  city,
  department,
  image,
  marketType,
  isFavorite = false,
  onFavorite,
  onShare,
}: MarketHeaderProps) {
  return (
    <header className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-64 bg-slate-100 sm:h-80">
        {image ? (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-amber-50">
            <span className="text-sm font-medium text-slate-400">
              Aucun visuel disponible
            </span>
          </div>
        )}

        {/* Dégradé inférieur */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-6 pt-20">
          <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
            {marketTypeLabels[marketType]}
          </span>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {name}
          </h1>

          <p className="mt-2 text-sm text-white/80">
            {city}
            {department ? ` · ${department}` : ""}
          </p>
        </div>

        {/* Actions */}
        <div className="absolute bottom-5 right-5 flex items-center gap-2">
          <button
            type="button"
            onClick={onFavorite}
            aria-label={
              isFavorite
                ? "Retirer des favoris"
                : "Ajouter aux favoris"
            }
            aria-pressed={isFavorite}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/40 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-slate-950/60 active:scale-95"
          >
            <Heart
              className={`h-5 w-5 transition ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-white"
              }`}
            />
          </button>

          <button
            type="button"
            onClick={onShare}
            aria-label="Partager ce marché"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/40 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-slate-950/60 active:scale-95"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
    </header>
  );
}