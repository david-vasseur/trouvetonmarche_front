"use client";

import { useState } from "react";
import MarketExplorer from "@/components/ui/MarketExplorer";
import AboutPanel from "./AboutPanel";
import { Market } from "@/types/market";


export default function HomeShowcase({ markets }: { markets: Market[] }) {
    const [activePanel, setActivePanel] = useState<"markets" | "about">(
        "markets"
    );

    const showAbout = activePanel === "about";

    return (
        <section className="w-full overflow-hidden py-20">
            {/* Switch */}
            <div className="mb-10 flex justify-center px-4">
                <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                    <button
                        type="button"
                        onClick={() => setActivePanel("markets")}
                        className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                        !showAbout
                            ? "bg-primary text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        Les marchés
                    </button>

                    <button
                        type="button"
                        onClick={() => setActivePanel("about")}
                        className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                        showAbout
                            ? "bg-secondary text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        Comment ça marche
                    </button>
                </div>
            </div>

            {/* Viewport */}
            <div className="w-full overflow-hidden">
                {/* 200vw track */}
                <div
                className="flex w-[200vw] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                    transform: showAbout
                    ? "translateX(-100vw)"
                    : "translateX(0)",
                }}
                >
                    {/* Markets */}
                    <div className="w-screen shrink-0">
                        <MarketExplorer markets={markets} />
                    </div>

                    {/* About */}
                    <div className="w-screen shrink-0">
                        <AboutPanel />
                    </div>
                </div>
            </div>
        </section>
    );
}