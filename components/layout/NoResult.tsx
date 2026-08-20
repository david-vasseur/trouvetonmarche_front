
import { CalendarPlus, Store, Bell } from "lucide-react";
import Link from "next/link";

export default function EmptyMarketState() {
  return (
    <section className="w-full mt-12">
      {/* Empty state */}
      <div className="text-center mb-10">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <CalendarPlus className="h-6 w-6 text-slate-500" />
        </div>

        <h2 className="text-2xl font-semibold text-slate-900">
          Aucun marché référencé pour le moment
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-slate-600">
          Aucun événement n'est encore disponible dans cette ville.
          Vous pouvez être le premier à faire vivre les marchés locaux.
        </p>
      </div>

      {/* CTAs */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Organisateur */}
        <Link
          href="/login?redirect=/organisateur/creer"
          className="group rounded-2xl border border-blue-200 bg-blue-50 p-6 transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
        >
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
            <CalendarPlus className="h-5 w-5" />
          </div>

          <p className="mb-1 text-sm font-medium text-blue-600">
            Vous êtes organisateur ?
          </p>

          <h3 className="text-lg font-semibold text-slate-900">
            Créez votre événement
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Référencez gratuitement votre marché et rendez-le visible auprès
            des visiteurs et des exposants.
          </p>

          <span className="mt-5 inline-flex items-center text-sm font-semibold text-blue-600">
            Créer un événement
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>

        {/* Exposant */}
        <Link
          href="/login?redirect=/exposant/creer"
          className="group rounded-2xl border border-emerald-200 bg-emerald-50 p-6 transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
        >
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Store className="h-5 w-5" />
          </div>

          <p className="mb-1 text-sm font-medium text-emerald-600">
            Vous êtes exposant ?
          </p>

          <h3 className="text-lg font-semibold text-slate-900">
            Créez votre fiche boutique
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Présentez votre activité, vos produits et vos prochains marchés
            aux visiteurs qui cherchent des exposants locaux.
          </p>

          <span className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-600">
            Créer ma fiche
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>

        {/* Visiteur */}
        <Link
          href="/newsletter"
          className="group rounded-2xl border border-amber-200 bg-amber-50 p-6 transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
        >
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white">
            <Bell className="h-5 w-5" />
          </div>

          <p className="mb-1 text-sm font-medium text-amber-600">
            Vous êtes visiteur ?
          </p>

          <h3 className="text-lg font-semibold text-slate-900">
            Ne manquez pas les prochains marchés
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Inscrivez-vous pour être informé des nouveaux marchés et événements
            près de chez vous.
          </p>

          <span className="mt-5 inline-flex items-center text-sm font-semibold text-amber-600">
            Être informé
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}

