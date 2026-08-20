import { normalizeString } from "@/lib/string";
import { UserProfile, Role } from "@/types/user";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
    user: UserProfile | null;
    selectedRole: Role;
};

export default function ProfileDashboard({ user, selectedRole }: Props) {
    const isExposant = selectedRole === "EXPOSANT";
    const isOrganisateur = selectedRole === "ORGANISATEUR";

    return (
        <section className="mb-8 grid gap-4 md:grid-cols-3">

            {/* Card 1 — Marchés / Favoris */}
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

                <p className="text-sm font-medium text-slate-500">
                    {isExposant
                        ? "Ma liste de favoris"
                        : "Marchés associés à votre profil"
                    }
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                    {user && (user.markets?.length ?? 0)}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                    {isExposant
                        ? "marché(s) dans votre liste de favoris"
                        : "marché(s) associé(s) à votre profil"
                    }
                </p>

                {isExposant ? (
                    <Link
                        type="button"
                        href={`/profile//favoris`}
                        className="inline-flex mt-4 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-800 hover:text-white hover:shadow-lg"
                    >
                        Consulter mes favoris
                    </Link>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={"/profile/markets"}
                            className="mt-4 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-800 hover:text-white hover:shadow-lg"
                        >
                            Voir mes marchés
                        </Link>

                        <Link
                            href={`/profile/create`}
                            className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Créer un événement
                        </Link>
                    </div>
                )}
            </div>


            {/* Card 2 — Mise en avant */}
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

                <p className="text-sm font-medium text-slate-500">
                    {isExposant
                        ? "Mise en avant de ma boutique"
                        : "Mise en avant de vos marchés"
                    }
                </p>

                {isExposant ? (
                    <>
                        {user && user.promotions?.length > 0 ? (
                            <>
                                <span className="mt-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-green-200 bg-green-50">
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                                </span>

                                <p className="mt-2 text-sm text-slate-500">
                                    Mise en avant en cours
                                </p>
                            </>
                        ) : (
                            <>
                                <span className="mt-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-200 bg-red-50">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                </span>

                                <p className="mt-2 text-sm text-slate-500">
                                    Pas de mise en avant en cours
                                </p>
                            </>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {user && user.promotions?.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => toast.success("Fonctionnalité à venir !")}
                                    className="mt-4 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-800 hover:text-white hover:shadow-lg"
                                >
                                    Consulter
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => toast.success("Fonctionnalité à venir !")}
                                className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Mettre en avant
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                            {user && (user.promotions?.length ?? 0)}
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            événement(s) mis en avant
                        </p>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => toast.success("Fonctionnalité à venir !")}
                                className="mt-4 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-800 hover:text-white hover:shadow-lg"
                            >
                                Consulter
                            </button>

                            <button
                                type="button"
                                onClick={() => toast.success("Fonctionnalité à venir !")}
                                className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Mettre en avant
                            </button>
                        </div>
                    </>
                )}
            </div>


            {/* Card 3 — Rôles */}
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

                <p className="text-sm font-medium text-slate-500">
                    Rôle
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                    {user && user.roles.length}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                    rôle(s) associé(s) à votre compte
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {user && user.roles.map((role) => (
                        <span
                            key={role}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                        >
                            {role}
                        </span>
                    ))}
                </div>
            </div>

        </section>
    );
}