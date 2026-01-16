"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { OriginsExperience } from "@/components/origins/OriginsExperience";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function OriginsPage() {
    return (
        <main className="h-screen bg-black overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full z-[100] pointer-events-none">
                <div className="pointer-events-auto">
                    <LiquidNavbar />
                </div>
            </div>

            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1]} gl={{ antialias: false }}>
                <Suspense fallback={null}>
                    <color attach="background" args={["#000000"]} />
                    <OriginsExperience />
                </Suspense>
            </Canvas>

            {/* Overlay UI hints */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-[10px] uppercase tracking-[0.5em] animate-pulse pointer-events-none z-50">
                Scroll to Begin
            </div>
        </main>
    );
}
