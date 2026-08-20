export default function AboutPanel() {
  return (
    <div className="mx-auto flex min-h-[500px] max-w-6xl items-center px-6">
      <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Trouve Ton Marché
          </p>

          <h2 className="font-heading text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Les marchés qui font vivre nos territoires.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Trouve Ton Marché rassemble les marchés locaux et leurs
            événements pour vous permettre de découvrir facilement ce qui
            se passe près de chez vous.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div>
              <div className="text-2xl font-semibold text-slate-900">
                01
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Recherchez votre ville ou votre région.
              </p>
            </div>

            <div>
              <div className="text-2xl font-semibold text-slate-900">
                02
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Découvrez les marchés et leurs événements.
              </p>
            </div>

            <div>
              <div className="text-2xl font-semibold text-slate-900">
                03
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Revenez régulièrement pour ne rien manquer.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
            <div className="flex h-full flex-col justify-between">
              <div className="text-sm uppercase tracking-[0.2em] text-white/50">
                Une autre façon de découvrir
              </div>

              <div>
                <p className="font-heading text-3xl leading-tight sm:text-4xl">
                  Du marché du dimanche matin aux grands rendez-vous
                  locaux.
                </p>

                <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
                  Producteurs, artisans, créateurs, événements et
                  rencontres : explorez votre territoire autrement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}