import SearchInput from "../ui/SearchInput";

export default function Hero() {
  return (
    <section className="relative overflow-hidden w-full ">
  {/* Subtle editorial background */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10"
  >
    <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
    <div className="absolute -left-32 top-32 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" />
    <div className="absolute -right-32 top-48 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
  </div>

  <div className="mx-auto max-w-5xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24">
    {/* Editorial eyebrow */}
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      Les marchés près de chez vous
    </div>

{/* Main heading */}
<h1 className="mx-auto max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
  Retrouvez les marchés
  <span className="block text-primary">
    qui font vivre nos territoires.
  </span>
</h1>

{/* Supporting copy */}
<p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
  Marchés de producteurs, artisanat, créateurs et rendez-vous locaux.
  Trouvez facilement où aller, quand y aller et découvrez les événements
  près de chez vous.
</p>

{/* Search */}
<div className="mx-auto mt-10 max-w-2xl">
  <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]">
    <SearchInput />
  </div>

  <p className="mt-3 text-xs text-slate-400">
    Recherchez une ville, un département ou une région
  </p>
</div>

{/* Primary actions */}
<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
  <a
    href="/events"
    className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  >
    Voir les événements
    <span className="ml-2">→</span>
  </a>

  <a
    href="/about"
    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  >
    Découvrir Trouve Ton Marché
  </a>
</div>

{/* Trust / positioning */}
<div className="mx-auto mt-12 flex max-w-2xl flex-col items-center justify-center gap-4 text-sm text-slate-500 sm:flex-row sm:gap-8">
  <div className="flex items-center gap-2">
    <span className="text-base">✦</span>
    <span>Des rendez-vous locaux</span>
  </div>

  <div className="hidden h-4 w-px bg-slate-200 sm:block" />

  <div className="flex items-center gap-2">
    <span className="text-base">⌖</span>
    <span>Une recherche par territoire</span>
  </div>

  <div className="hidden h-4 w-px bg-slate-200 sm:block" />

  <div className="flex items-center gap-2">
    <span className="text-base">♡</span>
    <span>Pour visiteurs et professionnels</span>
  </div>
</div>

  </div>
</section>

  );
}