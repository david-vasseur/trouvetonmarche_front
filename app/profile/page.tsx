"use client";

import ProfileForm from "@/components/form/profile/profileForm";
import { useUserStore } from "@/lib/store/userStore";
import { Role, UserProfile } from "@/types/user";
import { useEffect, useState } from "react";
import { getUser } from "@/actions/user.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProfileDashboard from "@/components/layout/ProfileDashboard";
import { logoutAction } from "@/actions/auth.action";


export default function ProfilePage() {
  
    const { user, logout } = useUserStore();
    const [trueUser, setTrueUser] = useState<UserProfile | null>(null);
    const [selectedRole, setSelectedRole] = useState<Role>(
        trueUser?.roles.includes("EXPOSANT") ? "EXPOSANT" : "ORGANISATEUR",
    );

    const router = useRouter();

    const handleLogout = async () => {
        const result = await logoutAction();
        if (result.success) {
            toast.success("Déconnexion réussie !");
            logout();
            setTrueUser(null);
        }
        
        setTimeout(() => {
            router.push("/");
        }, 50);
    };

    useEffect(() => {
        if (!user) return;

        const fetchUser = async () => {
            try {
                const fetchedUser = await getUser(user.id);
                setTrueUser(fetchedUser);
            } catch (error) {
                console.error("Erreur récupération user :", error);
            }
        };
        fetchUser();
    }, [user]);


    return (
        <main className="min-h-screen mt-18 bg-[radial-gradient(circle_at_top,_rgba(42,111,69,0.12),_transparent_45%),linear-gradient(180deg,#f4f7f9_0%,#eef5f0_100%)] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-[0_30px_80px_rgba(15,23,42,0.08)] text-white">
                    <div className="relative bg-[radial-gradient(circle_at_top_right,_rgba(245,166,35,0.35),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(42,111,69,0.45),_transparent_25%)] p-6 sm:p-8 lg:p-10">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white/30 bg-white/10 shadow-lg">
                                    <img
                                        src={trueUser?.avatarUrl ?? "https://placehold.co/200x200/0f172a/ffffff?text=Profil"}
                                        alt="Avatar du profil"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/80">
                                    Profil utilisateur
                                </p>
                                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
                                    {trueUser?.firstName} {trueUser?.lastName}
                                </h1>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    {trueUser?.roles.map((role) => (
                                    <span
                                        key={role}
                                        className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/80"
                                    >
                                        {role}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
    {/* Sélection du rôle */}
    {user?.roles.includes("EXPOSANT") && (
        <button
            type="button"
            onClick={() => setSelectedRole("EXPOSANT")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedRole === "EXPOSANT"
                    ? "bg-emerald-400 text-slate-950 shadow-sm"
                    : "border border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
            }`}
        >
            Exposant
        </button>
    )}

    {user?.roles.includes("ORGANISATEUR") && (
        <button
            type="button"
            onClick={() => setSelectedRole("ORGANISATEUR")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedRole === "ORGANISATEUR"
                    ? "bg-amber-300 text-slate-950 shadow-sm"
                    : "border border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
            }`}
        >
            Organisateur
        </button>
    )}

    {/* Séparateur */}
    <div className="mx-1 hidden h-7 w-px bg-white/15 sm:block" />

    {/* Déconnexion */}
    <button
        type="button"
        onClick={handleLogout}
        className="
            group flex items-center gap-2
            rounded-full
            border border-red-400/20
            bg-red-500/5
            px-4 py-2
            text-sm font-semibold
            text-red-200
            transition-all duration-200
            hover:border-red-400/40
            hover:bg-red-500/15
            hover:text-red-100
            hover:shadow-sm
        "
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 12H9m9 0l-3-3m3 3l-3 3"
            />
        </svg>

        <span>Déconnexion</span>
    </button>
</div>
                        </div>
                    </div>
                </header>

                <ProfileDashboard user={trueUser} selectedRole={selectedRole} />

                {trueUser && <ProfileForm user={trueUser} />}
            </div>
        </main>
    );
}
