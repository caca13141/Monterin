"use client";

import { useEffect, useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Float, MeshRefractionMaterial, CubeCamera, useCubeTexture, useEnvironment } from "@react-three/drei";
import * as THREE from "three";
import { getBrilliantCutGeometry } from "@/utils/GeometryUtils";
import { RGBELoader } from "three-stdlib";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";

// Dynamically import WASM
const loadWasm = async () => {
    try {
        const wasm = await import("../../wasm/wasm_gem.js");
        await wasm.default('/wasm_gem_bg.wasm');
        return wasm;
    } catch (e) {
        console.error("Failed to load WASM:", e);
        return null;
    }
};

function Diamond({ cutGrade }: { cutGrade: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [lightReturn, setLightReturn] = useState(100);

    // Load environment map for refraction
    const env = useEnvironment({ preset: "studio" });

    // Generate geometry once
    const geometry = useMemo(() => getBrilliantCutGeometry(), []);

    useEffect(() => {
        loadWasm().then((wasm) => {
            if (wasm) {
                setLightReturn(wasm.calculate_light_return(cutGrade));
            }
        });
    }, [cutGrade]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            const speed = lightReturn > 90 ? 0.2 : 0.05;
            meshRef.current.rotation.y += delta * speed;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]} castShadow receiveShadow>
                <MeshRefractionMaterial
                    envMap={env}
                    bounces={3}
                    aberrationStrength={0.03}
                    ior={2.75}
                    fresnel={1}
                    color="white"
                    fastChroma={false}
                />
            </mesh>
        </Float>
    );
}

export default function InteractiveDiamond() {
    const [cut, setCut] = useState("Ideal");

    return (
        <section className="w-full h-[800px] relative bg-neutral-950 overflow-hidden border-y border-white/10">
            <div className="absolute top-10 left-0 w-full z-10 pointer-events-none text-center">
                <p className="text-secondary/60 uppercase tracking-[0.5em] text-xs mb-2">Simulated Physics</p>
                <h3 className="font-serif text-3xl md:text-5xl text-white mb-2">The Montérin Cut</h3>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-6 pointer-events-auto backdrop-blur-md bg-white/5 p-2 rounded-full border border-white/10">
                {["Ideal", "Deep", "Shallow"].map((c) => (
                    <button
                        key={c}
                        onClick={() => setCut(c)}
                        className={`px-6 py-2 text-xs uppercase tracking-widest transition-all duration-500 rounded-full ${cut === c
                            ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            : "text-white/40 hover:text-white"
                            }`}
                    >
                        {c}
                    </button>
                ))}
            </div>

            <Canvas camera={{ position: [0, 1, 5], fov: 45 }} shadows dpr={[1, 2]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
                <Suspense fallback={null}>
                    <color attach="background" args={["#0a0a0a"]} />

                    {/* Complex Lighting for Sparkle */}
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} castShadow color="#efd" />
                    <spotLight position={[-10, 0, -10]} angle={0.5} penumbra={1} intensity={2} color="#del" />
                    <pointLight position={[0, -5, 0]} intensity={1} color="#white" />

                    {/* High quality Studio Environment for Refraction */}
                    <Environment preset="studio" background={false} blur={0.6} />

                    <Diamond cutGrade={cut} />

                    <ContactShadows opacity={0.4} scale={15} blur={3} far={10} resolution={512} color="#000000" />
                    <OrbitControls
                        enableZoom={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />

                    {/* Cinematic Post-Processing (Subtle) */}
                    <EffectComposer>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={0.2} radius={0.5} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
            {/* Overlay Gradient for seamless integration */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_50%,_#0a0a0a_120%)]" />
        </section>
    );
}
