"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { ForgeCanvas } from "@/components/forge/ForgeCanvas";
import { ForgeControls } from "@/components/forge/ForgeControls";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgePage() {
    const router = useRouter();
    const [config, setConfig] = useState({
        carat: 1.0,
        clarity: 50,
        cut: "Ideal"
    });

    const handleSaveToVault = () => {
        router.push("/vault/login");
    };

    return (
        <main className="h-screen bg-black overflow-hidden flex flex-col">
            <LiquidNavbar />

            <div className="flex-grow flex relative">
                {/* 3D Viewport */}
                <div className="flex-grow relative z-0">
                    <ForgeCanvas config={config} />
                </div>

                {/* Controls Sidebar */}
                <div className="w-full md:w-96 bg-neutral-950/80 backdrop-blur-md border-l border-white/10 z-10 p-8 flex flex-col justify-center">
                    <h1 className="text-3xl font-serif text-white mb-2">The Atelier</h1>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-12">
                        Design your bespoke diamond
                    </p>

                    <ForgeControls config={config} setConfig={setConfig} />

                    <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                        <div>
                            <span className="block text-xs text-white/40 uppercase tracking-widest">Estimated Value</span>
                            <span className="text-2xl font-serif text-white">
                                ${(config.carat * 8500 * (1 + config.clarity / 100)).toLocaleString()}
                            </span>
                        </div>
                        <button
                            onClick={handleSaveToVault}
                            className="bg-white text-black px-6 py-3 uppercase text-xs tracking-widest hover:bg-primary transition-colors"
                        >
                            Save Design
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
