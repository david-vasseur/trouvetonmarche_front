import Link from "next/link";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.10),_transparent_58%)] px-4 py-16 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.95),_rgba(248,250,252,0.85))]" />
            <div className="absolute left-[-8%] top-[-8%] h-40 w-40 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="absolute bottom-[-6%] right-[-4%] h-48 w-48 rounded-full bg-slate-200/70 blur-3xl" />

            <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 shadow-[0_25px_120px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-14 lg:py-14">
                    <div>
                        <div className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                            404 · Page introuvable
                        </div>

                        <div className="relative mt-6">
                            <span className="absolute left-0 top-0 text-[4.8rem] font-black leading-none tracking-[-0.08em] text-slate-100 sm:text-[6.4rem] lg:text-[8rem]">
                                404
                            </span>
                            <h1 className="relative pt-10 text-4xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-5xl">
                                Cette page a disparu du chemin.
                            </h1>
                        </div>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            Le lieu que vous cherchez n’est pas disponible pour le moment. Revenir à l’accueil ou explorer les marchés et événements à venir.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.75 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700"
                            >
                                Retour à l’accueil
                            </Link>

                            <Link
                                href="/events"
                                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.75 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                            >
                                Voir les événements
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-2">
                            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                                Marchés du week-end
                            </span>
                            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                                Événements à venir
                            </span>
                            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                                Cartes intéractives
                            </span>
                        </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/80 p-6 shadow-inner shadow-slate-100">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                            Suggestion du moment
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-slate-900">
                            Rejoignez l’expérience à partir de la page d’accueil.
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            Retrouvez les marchés les plus actifs, filtrez selon votre région et ouvrez rapidement les fiches détaillées.
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                                • Découvrir les marchés autour de vous
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                                • Explorer les événements du jour
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                                • Revenir facilement à la navigation principale
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
