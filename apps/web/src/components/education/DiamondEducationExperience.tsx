"use client";

import { ScrollControls, Scroll, useScroll, useEnvironment, MeshRefractionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { getBrilliantCutGeometry } from "@/utils/GeometryUtils";

function Scene() {
    const scroll = useScroll();
    const diamondRef = useRef<THREE.Mesh>(null);
    const naturalDiamondRef = useRef<THREE.Mesh>(null);
    const labDiamondRef = useRef<THREE.Mesh>(null);
    const env = useEnvironment({ preset: "studio" });
    const geometry = useMemo(() => getBrilliantCutGeometry(), []);

    useFrame((state, delta) => {
        const offset = scroll.offset;

        // Section 1: Single rotating diamond (0 - 0.15)
        if (diamondRef.current) {
            const section1 = Math.max(0, Math.min(1, offset / 0.15));
            diamondRef.current.scale.setScalar(section1);
            diamondRef.current.rotation.y += delta * 0.5;
            diamondRef.current.visible = offset < 0.3;
        }

        // Section 2-3: Lab vs Natural comparison (0.15 - 0.45)
        const comparisonStart = 0.15;
        const comparisonProgress = Math.max(0, Math.min(1, (offset - comparisonStart) / 0.3));

        if (naturalDiamondRef.current && labDiamondRef.current) {
            const visible = offset >= comparisonStart && offset < 0.6;
            naturalDiamondRef.current.visible = visible;
            labDiamondRef.current.visible = visible;

            if (visible) {
                const spread = comparisonProgress * 3;
                naturalDiamondRef.current.position.x = -spread;
                labDiamondRef.current.position.x = spread;
                naturalDiamondRef.current.rotation.y += delta * 0.3;
                labDiamondRef.current.rotation.y -= delta * 0.3;
            }
        }
    });

    return (
        <group>
            {/* Single diamond for intro */}
            <mesh ref={diamondRef} geometry={geometry} scale={0}>
                <MeshRefractionMaterial
                    envMap={env}
                    bounces={3}
                    ior={2.75}
                    fresnel={1}
                    color="white"
                    fastChroma={false}
                />
            </mesh>

            {/* Natural diamond (slightly warmer) */}
            <mesh ref={naturalDiamondRef} geometry={geometry} visible={false} position={[0, 0, 0]}>
                <MeshRefractionMaterial
                    envMap={env}
                    bounces={3}
                    ior={2.75}
                    fresnel={1}
                    color="#ffffea"
                    fastChroma={false}
                />
            </mesh>

            {/* Lab diamond (pure white) */}
            <mesh ref={labDiamondRef} geometry={geometry} visible={false} position={[0, 0, 0]}>
                <MeshRefractionMaterial
                    envMap={env}
                    bounces={3}
                    ior={2.75}
                    fresnel={1}
                    color="white"
                    fastChroma={false}
                />
            </mesh>
        </group>
    );
}

export function DiamondEducationExperience() {
    return (
        <ScrollControls pages={6} damping={0.2}>
            <Scene />

            <Scroll html>
                {/* Section 1: Introduction */}
                <div className="w-screen h-screen flex items-center justify-center pointer-events-none">
                    <div className="text-center max-w-2xl px-6">
                        <span className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4">Diamond Education</span>
                        <h1 className="text-white font-serif text-4xl md:text-6xl tracking-widest leading-tight mb-6">
                            Understanding<br />Your Diamond
                        </h1>
                        <p className="text-white/60 leading-relaxed">
                            Not all diamonds are created equal. Let us guide you through
                            the essential knowledge every client should have.
                        </p>
                    </div>
                </div>

                {/* Section 2: Lab vs Natural - Introduction */}
                <div className="w-screen h-screen flex items-center justify-center pointer-events-none">
                    <div className="text-center max-w-2xl px-6">
                        <span className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4">The Origin</span>
                        <h2 className="text-white font-serif text-4xl md:text-5xl tracking-widest leading-tight mb-6">
                            Lab-Grown vs Natural
                        </h2>
                        <p className="text-white/60 leading-relaxed">
                            Both are real diamonds with identical physical, chemical, and optical properties.
                            The difference? One forms in nature over billions of years,
                            the other is cultivated in weeks using advanced technology.
                        </p>
                    </div>
                </div>

                {/* Section 3: Lab-Grown Details */}
                <div className="w-screen h-screen flex items-start md:items-center justify-start pointer-events-none">
                    <div className="max-w-md px-6 md:px-12 pt-24 md:pt-0">
                        <span className="text-primary text-xs uppercase tracking-[0.5em] block mb-4">Lab-Grown</span>
                        <h3 className="text-white font-serif text-3xl md:text-4xl mb-4">
                            Modern Science
                        </h3>
                        <ul className="text-white/70 space-y-3 leading-relaxed">
                            <li>• Identical to natural diamonds</li>
                            <li>• Created in 2-4 weeks</li>
                            <li>• 40-60% more affordable</li>
                            <li>• Minimal environmental impact</li>
                            <li>• Certified by GIA & IGI</li>
                        </ul>
                    </div>
                </div>

                {/* Section 4: Natural Details */}
                <div className="w-screen h-screen flex items-start md:items-center justify-end pointer-events-none">
                    <div className="max-w-md px-6 md:px-12 pt-24 md:pt-0 text-right">
                        <span className="text-primary text-xs uppercase tracking-[0.5em] block mb-4">Natural</span>
                        <h3 className="text-white font-serif text-3xl md:text-4xl mb-4">
                            Earth's Masterpiece
                        </h3>
                        <ul className="text-white/70 space-y-3 leading-relaxed">
                            <li>Formed over billions of years •</li>
                            <li>Unique inclusions (fingerprints) •</li>
                            <li>Traditional heirloom value •</li>
                            <li>Certified provenance •</li>
                            <li>Investment-grade options •</li>
                        </ul>
                    </div>
                </div>

                {/* Section 5: The 4 Cs */}
                <div className="w-screen h-screen flex items-center justify-center pointer-events-none">
                    <div className="text-center max-w-3xl px-6">
                        <span className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4">Quality Standards</span>
                        <h2 className="text-white font-serif text-4xl md:text-5xl tracking-widest mb-8">
                            The 4 Cs
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                            <div>
                                <h4 className="text-primary text-sm uppercase tracking-widest mb-2">Cut</h4>
                                <p className="text-white/60 text-sm">Brilliance & fire</p>
                            </div>
                            <div>
                                <h4 className="text-primary text-sm uppercase tracking-widest mb-2">Clarity</h4>
                                <p className="text-white/60 text-sm">Internal purity</p>
                            </div>
                            <div>
                                <h4 className="text-primary text-sm uppercase tracking-widest mb-2">Color</h4>
                                <p className="text-white/60 text-sm">Grade D-Z</p>
                            </div>
                            <div>
                                <h4 className="text-primary text-sm uppercase tracking-widest mb-2">Carat</h4>
                                <p className="text-white/60 text-sm">Weight & size</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 6: Certification & CTA */}
                <div className="w-screen h-screen flex items-center justify-center pointer-events-none">
                    <div className="text-center max-w-2xl px-6 bg-black/40 backdrop-blur-md p-12 rounded-2xl border border-white/5">
                        <span className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4">Trust & Authenticity</span>
                        <h2 className="text-white font-serif text-4xl md:text-5xl mb-6">
                            Every Diamond<br />Certified
                        </h2>
                        <p className="text-white/70 leading-relaxed mb-8">
                            All our diamonds come with independent certification from
                            GIA or IGI, ensuring transparency and peace of mind.
                        </p>
                        <a
                            href="/forge"
                            className="inline-block px-8 py-4 bg-white text-black text-xs uppercase tracking-widest hover:bg-primary transition-colors pointer-events-auto"
                        >
                            Design Your Diamond
                        </a>
                    </div>
                </div>
            </Scroll>
        </ScrollControls>
    );
}
