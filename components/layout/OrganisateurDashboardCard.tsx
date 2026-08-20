import Link from "next/link";

function OrganisateurMarketsCard({ userId }: { userId: number }) {
    const activeMarketsCount = 0;

    return (
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
                Marchés en cours
            </p>

            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                {activeMarketsCount}
            </p>

            <p className="mt-1 text-sm text-slate-500">
                événements actifs
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                <Link
                    href="/profile/evenements"
                    className="rounded-full bg-amber-50 px-3.5 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
                >
                    Mes événements
                </Link>

                <Link
                    href="/profile/evenements/creer"
                    className="rounded-full bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                    Créer
                </Link>
            </div>
        </div>
    );
}