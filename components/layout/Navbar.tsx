"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { useUserStore } from "@/lib/store/userStore";

const links = [
    { href: "/", label: "Accueil" },
    { href: "/categories", label: "Categories" },
    { href: "/carte", label: "Carte" },
    { href: "/comment-ca-marche", label: "Comment ca marche?" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const { user, setUser } = useUserStore();

    useEffect(() => {
        if (!mobileMenuRef.current) return;

        gsap.set(mobileMenuRef.current, { y: -16, opacity: 0, scale: 0.98 });
    }, []);

    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (isOpen) {
            gsap.to(mobileMenuRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.32,
                ease: "power3.out",
                display: "flex",
            });
            gsap.fromTo(
                linksRef.current,
                { y: 12, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.05, duration: 0.24, ease: "power2.out" },
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                y: -10,
                opacity: 0,
                scale: 0.98,
                duration: 0.24,
                ease: "power2.in",
                onComplete: () => gsap.set(mobileMenuRef.current, { display: "none" }),
            });
        }
    }, [isOpen]);

    useEffect(() => {
        if (!buttonRef.current) return;

        gsap.to(buttonRef.current, {
            rotate: isOpen ? 90 : 0,
            duration: 0.25,
            ease: "power2.out",
        });
    }, [isOpen]);

    const handleLinkEnter = (element: HTMLAnchorElement | null) => {
        if (!element) return;
        gsap.to(element, {
            y: -1,
            scale: 1.02,
            duration: 0.18,
            ease: "power2.out",
        });
    };

    const handleLinkLeave = (element: HTMLAnchorElement | null) => {
        if (!element) return;
        gsap.to(element, {
            y: 0,
            scale: 1,
            duration: 0.18,
            ease: "power2.out",
        });
    };

    return (
        <header className="fixed top-0 z-950 h-18 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <Link href="/" className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
                    Trouve Ton Marché
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 transition-all duration-200 hover:text-slate-900"
                            onMouseEnter={(event) => handleLinkEnter(event.currentTarget)}
                            onMouseLeave={(event) => handleLinkLeave(event.currentTarget)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {user?.roles[0] === "EXPOSANT" || user?.roles[0] === "ADMIN" || user?.roles[0] === "ORGANISATEUR" ? (
                    <div className="hidden items-center md:flex">
                        <Link
                        href="/profile"
                        className="
                            group flex items-center gap-2.5
                            rounded-full
                            border border-slate-200
                            bg-white
                            px-3.5 py-2
                            text-sm font-semibold text-slate-700
                            shadow-sm
                            transition-all duration-200
                            hover:-translate-y-0.5
                            hover:border-emerald-200
                            hover:bg-emerald-50
                            hover:text-emerald-800
                            hover:shadow-md
                        "
                        onMouseEnter={(event) => handleLinkEnter(event.currentTarget)}
                        onMouseLeave={(event) => handleLinkLeave(event.currentTarget)}
                        >
                        <span
                            className="
                            flex h-7 w-7 items-center justify-center
                            rounded-full
                            bg-emerald-100
                            text-xs font-bold text-emerald-700
                            transition-colors duration-200
                            group-hover:bg-emerald-200
                            "
                        >
                            {user.firstName.at(0)}
                            {user.lastName.at(0)}
                        </span>

                        <span>
                            {user.firstName} {user.lastName.at(0)}.
                        </span>
                        </Link>
                    </div>
                    ) : (
                    <div className="hidden items-center md:flex">
                        <Link
                        href="/login"
                        className="
                            rounded-full
                            bg-slate-900
                            px-5 py-2.5
                            text-sm font-semibold text-white
                            shadow-sm
                            transition-all duration-200
                            hover:-translate-y-0.5
                            hover:bg-emerald-700
                            hover:shadow-md
                            active:translate-y-0
                        "
                        onMouseEnter={(event) => handleLinkEnter(event.currentTarget)}
                        onMouseLeave={(event) => handleLinkLeave(event.currentTarget)}
                        >
                        Se connecter
                        </Link>
                    </div>
                    )}

                <button
                    ref={buttonRef}
                    type="button"
                    aria-label="Ouvrir le menu"
                    className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition-all duration-200 md:hidden"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            <div
                ref={mobileMenuRef}
                className="mx-4 mb-3 hidden flex-col rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] md:hidden"
            >
                {links.map((link) => (
                    <Link
                        key={link.href}
                        ref={(element) => {
                            linksRef.current.push(element);
                        }}
                        href={link.href}
                        className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900"
                        onClick={() => setIsOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}

                <Link
                    href="/login"
                    className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-medium text-slate-700"
                    onClick={() => setIsOpen(false)}
                >
                    Se connecter
                </Link>
            </div>
        </header>
    );
}
