"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
    label?: string;
    className?: string;
    fallbackHref?: string;
};

export default function BackButton({
    label = "Retour",
    className = "",
    fallbackHref = "/",
}: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
            return;
        }

        router.push(fallbackHref);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={`Retour`}
            className={`group relative mb-4 inline-flex items-center overflow-hidden rounded-full bg-white/90 px-3.5 py-2 text-[13px] font-medium tracking-[0.01em] text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] ${className}`.trim()}
        >
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(80, 91, 116, 0.08),rgba(59,130,246,0.12),rgba(15,23,42,0.08))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-[1px] rounded-full bg-white/90" />
            <span className="relative z-10 flex h-7 w-7 translate-x-[400%] items-center justify-center rounded-full bg-[linear-gradient(135deg,_#f8fafc_0%,_#e2e8f0_100%)] text-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 group-hover:translate-x-0 group-hover:bg-[linear-gradient(135deg,_#0f172a_0%,_#1e293b_100%)] group-hover:text-white">
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0" />
            </span>
            <span className="relative z-10 ml-0 transition-all duration-300 group-hover:ml-1">retour</span>
        </button>
    );
}
