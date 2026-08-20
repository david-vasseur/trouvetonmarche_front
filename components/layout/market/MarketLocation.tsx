type MarketLocationProps = {
  address?: string | null;
  zip?: string | null;
  city: string;
  latitude?: number | null;
  longitude?: number | null;
};

export default function MarketLocation({
  address,
  zip,
  city,
  latitude,
  longitude,
}: MarketLocationProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        Localisation
      </p>

      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
        Où nous trouver ?
      </h2>

      <div className="mt-5 rounded-2xl bg-slate-50 p-5">
        <p className="font-semibold text-slate-900">
          {address || "Adresse non renseignée"}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {zip ? `${zip} ` : ""}
          {city}
        </p>

        {latitude != null && longitude != null && (
          <p className="mt-3 text-xs text-slate-400">
            Coordonnées : {latitude}, {longitude}
          </p>
        )}
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
      >
        Voir l'itinéraire
      </button>
    </section>
  );
}