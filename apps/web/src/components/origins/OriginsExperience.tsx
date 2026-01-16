"use client";

import { ScrollControls, Scroll, useScroll, useEnvironment, MeshRefractionMaterial, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useLayoutEffect } from "react";
import * as THREE from "three";
import { getBrilliantCutGeometry } from "@/utils/GeometryUtils";

function GemInstances({
    count,
    geometry,
    color,
    scaleRange = [0.05, 0.1],
    envMap
}: {
    count: number;
    geometry: THREE.BufferGeometry;
    color: string;
    scaleRange?: [number, number];
    envMap: THREE.Texture | THREE.CubeTexture;
}) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random positions (Spherical distribution for consistent rotation coverage)
    const particles = useMemo(() => {
        const temp = [];
        const radius = 12; // Radius to cover screen corners
        for (let i = 0; i < count; i++) {
            // Spherical coordinate generation
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);

            // Random distance from center (concentrated slightly towards shell for volume)
            const r = radius * Math.cbrt(Math.random());

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi) - 5; // Center at z = -5

            const scale = Math.random() * (scaleRange[1] - scaleRange[0]) + scaleRange[0];
            const rotation = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
            temp.push({ x, y, z, scale, rotation });
        }
        return temp;
    }, [count, scaleRange]);

    useLayoutEffect(() => {
        if (!meshRef.current) return;
        particles.forEach((p, i) => {
            dummy.position.set(p.x, p.y, p.z);
            dummy.rotation.set(p.rotation[0], p.rotation[1], p.rotation[2]);
            dummy.scale.set(p.scale, p.scale, p.scale);
            dummy.updateMatrix();
            meshRef.current?.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [particles, dummy]);

    return (
        <instancedMesh ref={meshRef} args={[geometry, undefined, count]}>
            <meshPhysicalMaterial
                color={color}
                roughness={0}
                metalness={0.1}
                transmission={0.9} // Glass-like
                thickness={0.5} // Refraction volume
                ior={2.4} // Diamond-like IOR
                clearcoat={1}
                clearcoatRoughness={0}
                envMap={envMap}
            />
        </instancedMesh>
    );
}

function Scene() {
    const scroll = useScroll();
    const particleGroupRef = useRef<THREE.Group>(null);
    const diamondRef = useRef<THREE.Mesh>(null);
    const env = useEnvironment({ preset: "studio" });
    const brilliantGeo = useMemo(() => getBrilliantCutGeometry(), []);
    const pearlGeo = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []); // Low poly sphere
    const emeraldGeo = useMemo(() => new THREE.BoxGeometry(0.8, 1.2, 0.6), []); // Emerald cut approx

    // Gemstone Configurations (Increased counts for density)
    const GEMS = [
        { type: "Ruby", color: "#E0115F", geo: brilliantGeo, count: 80 },
        { type: "Emerald", color: "#50C878", geo: emeraldGeo, count: 80 },
        { type: "Sapphire", color: "#0F52BA", geo: brilliantGeo, count: 80 },
        { type: "Amethyst", color: "#9966CC", geo: brilliantGeo, count: 80 },
        { type: "Alexandrite", color: "#008080", geo: brilliantGeo, count: 60 }, // Teal
        { type: "Pearl", color: "#F5F5F0", geo: pearlGeo, count: 80, mat: "physical" as const },
    ];

    useFrame((state, delta) => {
        const offset = scroll.offset;

        if (particleGroupRef.current) {
            particleGroupRef.current.rotation.y += delta * 0.05; // Slightly slower for heavy meshes
            particleGroupRef.current.rotation.z = offset * Math.PI;
        }

        if (diamondRef.current) {
            const diamondProgress = Math.max(0, (offset - 0.3) * 1.5);
            const scale = Math.min(1, diamondProgress);
            diamondRef.current.scale.set(scale, scale, scale);
            diamondRef.current.rotation.y += delta * 0.5;
            diamondRef.current.position.z = -5 + (diamondProgress * 5);
        }
    });

    return (
        <group>
            {/* Gemstone Cloud */}
            <group ref={particleGroupRef}>
                {GEMS.map((gem, i) => (
                    <GemInstances
                        key={gem.type}
                        count={gem.count}
                        geometry={gem.geo}
                        color={gem.color}
                        envMap={env}
                    />
                ))}
            </group>

            {/* Main Diamond Hero */}
            <mesh ref={diamondRef} geometry={brilliantGeo} scale={[0, 0, 0]}>
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

export function OriginsExperience() {
    return (
        <ScrollControls key="origins-scroll" pages={3} damping={0.2}>
            <Scene />

            <Scroll html>
                <div className="w-screen h-screen flex items-center justify-center pointer-events-none">
                    <div className="text-center max-w-lg px-6">
                        <span className="text-white/60 text-xs uppercase tracking-[0.5em] block mb-4">The Beginning</span>
                        <h1 className="text-white font-serif text-4xl md:text-5xl tracking-widest leading-tight">
                            THE LIGHT
                        </h1>
                        <p className="text-white/40 mt-6 leading-relaxed font-light">
                            Before form, there was only brilliance.
                            Raw beauty waiting to be revealed by the hand of a master artisan.
                        </p>
                    </div>
                </div>

                <div className="w-screen h-screen flex items-center justify-center pointer-events-none">
                    <div className="text-center max-w-lg px-6">
                        <span className="text-white/60 text-xs uppercase tracking-[0.5em] block mb-4">The Savoir-Faire</span>
                        <h1 className="text-white font-serif text-4xl md:text-5xl tracking-widest leading-tight">
                            THE CUT
                        </h1>
                        <p className="text-white/40 mt-6 leading-relaxed font-light">
                            Each facet sculpted by hand. Every angle studied with precision.
                            Artisanal excellence in pursuit of absolute perfection.
                        </p>
                    </div>
                </div>

                <div className="w-screen h-screen flex items-center justify-center pointer-events-none">
                    <div className="text-center bg-black/40 p-12 backdrop-blur-md rounded-2xl border border-white/5">
                        <span className="text-white/60 text-xs uppercase tracking-[0.5em] block mb-4">The Masterpiece</span>
                        <h1 className="text-white font-serif text-5xl md:text-7xl tracking-widest mb-6">
                            MONTÉRIN
                        </h1>
                        <p className="text-white/80 text-sm uppercase tracking-[0.3em] font-light">
                            Heirlooms for Eternity
                        </p>
                        <button className="mt-8 px-8 py-3 bg-white text-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors pointer-events-auto">
                            View Collection
                        </button>
                    </div>
                </div>
            </Scroll>
        </ScrollControls>
    );
}
