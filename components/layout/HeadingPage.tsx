import BackButton from "../ui/BackButton";

export default function HeadingPage({ region }: { region: string }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-white to-emerald-50/60">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* Navigation */}
        <div className="mb-10">
          <BackButton />
        </div>

        {/* Eyebrow */}
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-emerald-500" />

          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Marchés locaux · Région
          </span>
        </div>

        {/* Heading */}
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Les marchés de{" "}
            <span className="text-emerald-700">
              {decodeURIComponent(region || "")}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Retrouvez les marchés, producteurs, artisans et créateurs
            qui font vivre les territoires de la région.
          </p>
        </div>

        {/* Bottom information */}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-slate-200/80 pt-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            Marchés référencés
          </div>

          <div className="hidden h-4 w-px bg-slate-300 sm:block" />

          <div className="text-sm text-slate-500">
            Trouvez votre prochain marché près de chez vous
          </div>
        </div>
      </div>
    </section>
  );
}
