"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getBrilliantCutGeometry } from "@/utils/GeometryUtils";
import { useLanguage } from "@/contexts/LanguageContext";

interface DiamondSceneProps {
    scrollProgress: number;
}

function DiamondScene({ scrollProgress }: DiamondSceneProps) {
    const diamondRef = useRef<THREE.Mesh>(null);
    const geometry = useMemo(() => getBrilliantCutGeometry(), []);

    useFrame((state, delta) => {
        if (diamondRef.current) {
            // Base rotation
            diamondRef.current.rotation.y += delta * 0.1;

            // Scroll-driven rotation (adds extra spin when scrolling)
            const targetRotationY = scrollProgress * Math.PI * 4;

            // Smoothly interpolate current extra rotation to target
            // We essentially add the scroll influence to the continuous rotation
            diamondRef.current.rotation.x = THREE.MathUtils.lerp(diamondRef.current.rotation.x, scrollProgress * Math.PI * 0.5, 0.1);
            diamondRef.current.position.y = THREE.MathUtils.lerp(diamondRef.current.position.y, Math.sin(scrollProgress * Math.PI) * 0.5, 0.1);
            diamondRef.current.rotation.z = THREE.MathUtils.lerp(diamondRef.current.rotation.z, scrollProgress * 0.5, 0.1);
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <pointLight position={[0, -5, 0]} intensity={0.5} color="#blue" />

            <mesh ref={diamondRef} geometry={geometry}>
                <meshStandardMaterial
                    color="white"
                    metalness={0.9}
                    roughness={0.1}
                    envMapIntensity={1}
                />
            </mesh>
        </>
    );
}

export default function EducationPage() {
    const { t } = useLanguage();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call to set state correctly on load
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to safely access nested translation keys
    // @ts-ignore - Dynamic key access
    const labPoints = (t.education.lab.points as string[]) || [];
    // @ts-ignore
    const naturalPoints = (t.education.natural.points as string[]) || [];

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-[100]">
                <LiquidNavbar />
            </div>

            {/* Fixed 3D Background */}
            <div className="fixed inset-0 z-0 bg-black">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                >
                    <Suspense fallback={null}>
                        <DiamondScene scrollProgress={scrollProgress} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Scrollable Content */}
            <main className="relative z-10">
                {/* Section 1: Introduction */}
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center max-w-2xl px-6">
                        <span className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4">{t.education.intro.subtitle}</span>
                        <h1 className="text-white font-serif text-4xl md:text-6xl tracking-widest leading-tight mb-6">
                            {t.education.intro.heading}
                        </h1>
                        <p className="text-white/60 leading-relaxed">
                            {t.education.intro.description}
                        </p>
                    </div>
                </div>

                {/* Section 2: Lab vs Natural - Introduction */}
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center max-w-2xl px-6">
                        <span className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4">{t.education.labVsNatural.subtitle}</span>
                        <h2 className="text-white font-serif text-4xl md:text-5xl tracking-widest leading-tight mb-6">
                            {t.education.labVsNatural.heading}
                        </h2>
                        <p className="text-white/60 leading-relaxed">
                            {t.education.labVsNatural.description}
                        </p>
                    </div>
                </div>

                {/* Section 3: Lab-Grown Details */}
                <div className="min-h-screen flex items-start md:items-center justify-start">
                    <div className="max-w-md px-6 md:px-12 pt-24 md:pt-0">
                        <span className="text-primary text-xs uppercase tracking-[0.5em] block mb-4">{t.education.lab.subtitle}</span>
                        <h3 className="text-white font-serif text-3xl md:text-4xl mb-4">
                            {t.education.lab.heading}
                        </h3>
                        <ul className="text-white/70 space-y-3 leading-relaxed">
                            {labPoints.map((point, i) => (
                                <li key={i}>• {point}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Section 4: Natural Details */}
                <div className="min-h-screen flex items-start md:items-center justify-end">
                    <div className="max-w-md px-6 md:px-12 pt-24 md:pt-0 text-right">
                        <span className="text-primary text-xs uppercase tracking-[0.5em] block mb-4">{t.education.natural.subtitle}</span>
                        <h3 className="text-white font-serif text-3xl md:text-4xl mb-4">
                            {t.education.natural.heading}
                        </h3>
                        <ul className="text-white/70 space-y-3 leading-relaxed">
                            {naturalPoints.map((point, i) => (
                                <li key={i}>{point} •</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Section 5: The 4 Cs */}
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center max-w-3xl px-6">
                        <span className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4">{t.education.fourCs.subtitle}</span>
                        <h2 className="text-white font-serif text-4xl md:text-5xl tracking-widest mb-8">
                            {t.education.fourCs.heading}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                            <div>
                                <h4 className="text-primary text-sm uppercase tracking-widest mb-2">{t.education.fourCs.cut}</h4>
                                <p className="text-white/60 text-sm">{t.education.fourCs.cutDesc}</p>
                            </div>
                            <div>
                                <h4 className="text-primary text-sm uppercase tracking-widest mb-2">{t.education.fourCs.clarity}</h4>
                                <p className="text-white/60 text-sm">{t.education.fourCs.clarityDesc}</p>
                            </div>
                            <div>
                                <h4 className="text-primary text-sm uppercase tracking-widest mb-2">{t.education.fourCs.color}</h4>
                                <p className="text-white/60 text-sm">{t.education.fourCs.colorDesc}</p>
                            </div>
                            <div>
                                <h4 className="text-primary text-sm uppercase tracking-widest mb-2">{t.education.fourCs.carat}</h4>
                                <p className="text-white/60 text-sm">{t.education.fourCs.caratDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 6: Certification & CTA */}
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center max-w-2xl px-6 bg-black/40 backdrop-blur-md p-12 rounded-2xl border border-white/5">
                        <span className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4">{t.education.certification.subtitle}</span>
                        <h2 className="text-white font-serif text-4xl md:text-5xl mb-6">
                            {t.education.certification.heading}
                        </h2>
                        <p className="text-white/70 leading-relaxed mb-8">
                            {t.education.certification.description}
                        </p>
                        <a
                            href="/forge"
                            className="inline-block px-8 py-4 bg-white text-black text-xs uppercase tracking-widest hover:bg-primary transition-colors"
                        >
                            {t.education.certification.cta}
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none animate-bounce">
                    <span className="text-white/40 text-xs uppercase tracking-widest">Scroll to Learn</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
                </div>
            </main>
        </>
    );
}
