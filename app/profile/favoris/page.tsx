import Link from "next/link";
import { Heart, MapPin, ArrowRight, Search, CalendarDays } from "lucide-react";

type FavoriteProps = {
	params: {
		userSlug: string;
	}
};

const favoriteMarkets = [
  {
    id: 1,
    name: "Marché des créateurs",
    city: "Nîmes",
    date: "Samedi 24 août",
    category: "Créateurs",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Une sélection de créateurs locaux, artisanat, décoration et savoir-faire.",
  },
  {
    id: 2,
    name: "Marché artisanal d'été",
    city: "Uzès",
    date: "Dimanche 1 septembre",
    category: "Artisanat",
    image:
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Artisans, producteurs et créateurs se retrouvent au cœur de la ville.",
  },
  {
    id: 3,
    name: "Marché des producteurs",
    city: "Beaucaire",
    date: "Samedi 7 septembre",
    category: "Producteurs",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Produits locaux, rencontres et découvertes auprès des producteurs.",
  },
];

export default async function FavoritesPage({ params }: FavoriteProps) {
  const { userSlug } = await params;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(42,111,69,0.10),transparent_40%),linear-gradient(180deg,#f4f7f9_0%,#eef5f0_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="mb-8">
          <Link
            href={`/profile/${userSlug}`}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Retour à mon profil
          </Link>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Heart className="h-5 w-5 fill-current" />
                </div>

                <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
                  Mon espace
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                  Mes favoris
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                  Retrouvez ici les marchés que vous souhaitez garder à portée
                  de main.
                </p>
              </div>

              <Link
                href="/marches"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#2a6f45_0%,#1e4d34_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(42,111,69,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(42,111,69,0.30)]"
              >
                <Search className="h-4 w-4" />
                Découvrir les marchés
              </Link>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        {favoriteMarkets.length > 0 ? (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Votre sélection
                </p>

                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  {favoriteMarkets.length} marchés enregistrés
                </h2>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {favoriteMarkets.map((market) => (
                <article
                  key={market.id}
                  className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={market.image}
                      alt={market.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                      <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                        {market.category}
                      </span>

                      <button
                        type="button"
                        aria-label={`Retirer ${market.name} des favoris`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow-sm backdrop-blur transition hover:bg-white hover:text-rose-600"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {market.date}
                    </div>

                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-slate-900">
                      {market.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 text-amber-600" />
                      {market.city}
                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                      {market.excerpt}
                    </p>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <Link
                        href={`/marches/${market.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
                      >
                        Voir le marché
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          /* EMPTY STATE */
          <section className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 px-6 py-16 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Heart className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-slate-900">
              Aucun favori pour le moment
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Vous pouvez enregistrer vos marchés préférés pour les retrouver
              facilement ici.
            </p>

            <Link
              href="/marches"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#2a6f45_0%,#1e4d34_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(42,111,69,0.22)] transition hover:-translate-y-0.5"
            >
              Explorer les marchés
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}

