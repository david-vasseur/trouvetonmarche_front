"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import RegisterForm from "@/components/form/auth/registerForm";
import LoginForm from "@/components/form/auth/loginForm";
import RetrievePasswordForm from "@/components/form/auth/retrievePasswordForm";

const highlights = [
    "Accès exposant & organisateur",
    "Suivi des marchés",
    "Gestion de votre profil",
];
export const registerHighlights = [
    "Référencez vos marchés gratuitement",
    "Gérez vos informations simplement",
    "Touchez les visiteurs de Trouve ton marché",
];

export default function LoginPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const transitionPanelRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const registerContentRef = useRef<HTMLDivElement>(null);
    const loginHeroRef = useRef<HTMLDivElement>(null);
    const registerHeroRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const [isRegister, setIsRegister] = useState(false);
    const [isRetrieveLogin, setIsRetrieveLogin] = useState(false);

    useLayoutEffect(() => {
        if (
        !containerRef.current ||
        !transitionPanelRef.current ||
        !heroContentRef.current ||
        !registerContentRef.current
        ) {
        return;
        }

        const ctx = gsap.context(() => {
        const panel = transitionPanelRef.current!;
        const hero = heroContentRef.current!;
        const register = registerContentRef.current!;
        const loginHero = loginHeroRef.current!;
        const registerHero = registerHeroRef.current!;

        // État initial
        gsap.set(panel, {
            left: 0,
            width: "55%",
        });

        gsap.set(hero, {
            autoAlpha: 1,
            y: 0,
        });

        gsap.set(register, {
            autoAlpha: 0,
            x: -20,
        });
        gsap.set(loginHero, {
    autoAlpha: 1,
    });

    gsap.set(registerHero, {
    autoAlpha: 0,
    y: 15,
    });

        const tl = gsap.timeline({
    paused: true,
    });

    tl
    // ==========================================
    // 1. Le hero LOGIN disparaît
    // ==========================================
    .to(loginHero, {
        autoAlpha: 0,
        y: -15,
        duration: 0.3,
        ease: "power2.out",
    })

    // ==========================================
    // 2. Le panneau recouvre tout
    // ==========================================
    .to(panel, {
        width: "100%",
        duration: 0.7,
        ease: "power3.inOut",
    })

    // ==========================================
    // 3. On échange le contenu du panneau
    // ==========================================
    .set(loginHero, {
        display: "none",
    })

    .set(registerHero, {
        display: "block",
    })

    // ==========================================
    // 4. Nouveau hero apparaît
    // ==========================================
    .to(registerHero, {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
    })

    // ==========================================
    // 5. Le formulaire d'inscription apparaît
    // ==========================================
    .to(register, {
        autoAlpha: 1,
        x: 0,
        duration: 0.35,
        ease: "power2.out",
    }, "-=0.2")

    // ==========================================
    // 6. Le rideau repart vers la droite
    // ==========================================
    .to(panel, {
        left: "55%",
        width: "45%",
        duration: 0.7,
        ease: "power3.inOut",
    });

        timelineRef.current = tl;
        }, containerRef);

        return () => {
        ctx.revert();
        };
    }, []);

    const toggleMode = () => {
        const tl = timelineRef.current;

        if (!tl) return;

        if (!isRegister) {
        setIsRegister(true);
        tl.play();
        } else {
        setIsRegister(false);
        tl.reverse();
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(42,111,69,0.12),_transparent_45%),linear-gradient(180deg,#f4f7f9_0%,#eef5f0_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div
            ref={containerRef}
            className="relative grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[1.1fr_0.9fr]"
        >
            {/* ================================================= */}
            {/* REGISTER */}
            {/* ================================================= */}

            <section className="relative bg-white px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
            <div
                ref={registerContentRef}
                className="mx-auto max-w-md"
            >
                <div className="mb-8 text-left">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
                    Inscription
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                    Créez votre espace pro.
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Référencez vos marchés et gérez votre activité simplement.
                </p>
                </div>

                <RegisterForm onRegistered={toggleMode} />

            </div>
            </section>

            {/* ================================================= */}
            {/* LOGIN */}
            {/* ================================================= */}

            <section className="relative bg-white px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
            <div className="mx-auto max-w-md">
                <div className="mb-8 text-left">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
                    Connexion
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                    Bon retour !
                </h2>
                </div>

                {!isRetrieveLogin ? (
                    <LoginForm onRetrieve={() => setIsRetrieveLogin(true)} />
                ) : (
                    <RetrievePasswordForm onBack={() => setIsRetrieveLogin(false)} />
                )}
            </div>
            </section>

            {/* ================================================= */}
            {/* TRANSITION PANEL */}
            {/* ================================================= */}

            <section
            ref={transitionPanelRef}
            className="absolute inset-y-0 left-0 z-20 hidden overflow-hidden bg-slate-950 lg:block"
            >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,166,35,0.35),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(42,111,69,0.45),_transparent_25%)]" />

            <div
                ref={heroContentRef}
                className="relative z-10 flex h-full flex-col justify-between px-6 py-8 text-white sm:px-8 lg:px-10 lg:py-12"
                >
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/80">
                    Trouve ton marché
                    </p>

                    {/* LOGIN HERO */}
                    <div ref={loginHeroRef}>
                    <h1 className="pointer-events-none mt-4 max-w-md text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                        Connectez-vous à votre espace pro.
                    </h1>

                    <div className="mt-6 space-y-3">
                        {highlights.map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-3 text-sm text-white/80"
                        >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                            ✓
                            </span>

                            <span>{item}</span>
                        </div>
                        ))}
                    </div>

                    <div className="mt-5 relative z-1000">
                        <button
                        type="button"
                        onClick={toggleMode}
                        className="inline-flex items-center rounded-full border border-white/15 bg-accent/40  px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
                        >
                        Pas encore inscrit ?
                        </button>
                    </div>
                    </div>

                    {/* REGISTER HERO */}
                    <div
                    ref={registerHeroRef}
                    className="absolute left-6 right-6 top-[68px] sm:left-8 sm:right-8 lg:left-10 lg:right-10 lg:top-[76px]"
                    >
                    <h1 className="max-w-md text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                        Donnez de la visibilité à vos marchés.
                    </h1>

                    <div className="mt-6 space-y-3">
                        {registerHighlights.map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-3 text-sm text-white/80"
                        >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                            ✓
                            </span>

                            <span>{item}</span>
                        </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <button
                        type="button"
                        onClick={toggleMode}
                        className="inline-flex items-center bg-accent/40 rounded-full border border-white/15 px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
                        >
                        Déjà inscrit ?
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
        </main>
    );
}