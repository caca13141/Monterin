"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, MeshRefractionMaterial, OrbitControls, useEnvironment } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";
import { getBrilliantCutGeometry } from "@/utils/GeometryUtils";

interface ForgeConfig {
    carat: number;
    clarity: number;
    cut: string;
}

function DynamicDiamond({ config }: { config: ForgeConfig }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const env = useEnvironment({ preset: "studio" });
    const geometry = useMemo(() => getBrilliantCutGeometry(), []);

    // Derived Visual Properties
    // Carat -> Scale (0.5ct = 0.8scale, 5ct = 2.0scale approx linear hook for visual)
    const scale = 0.8 + (config.carat * 0.2);

    // Clarity -> Transmission/Opacity visual trick
    // Not scientifically accurate but visually "feely"
    const aberration = 0.05 + (config.clarity / 1000);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                geometry={geometry}
                scale={[scale, scale, scale]}
                castShadow
                receiveShadow
            >
                <MeshRefractionMaterial
                    envMap={env}
                    bounces={2}
                    aberrationStrength={aberration}
                    ior={2.75}
                    fresnel={1}
                    color="white"
                    fastChroma={true}
                />
            </mesh>
        </Float>
    );
}

export function ForgeCanvas({ config }: { config: ForgeConfig }) {
    return (
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} shadows dpr={[1, 1]} gl={{ antialias: false }}>
            <Suspense fallback={null}>
                <color attach="background" args={["#050505"]} />

                {/* Lighting */}
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} intensity={2} color="#efd" />
                <pointLight position={[-10, 0, -10]} intensity={2} color="#del" />

                <Environment preset="studio" background={false} blur={0.8} />

                <DynamicDiamond config={config} />

                <ContactShadows opacity={0.4} scale={15} blur={3} far={10} resolution={256} color="#000000" />
                <OrbitControls enableZoom={true} minDistance={3} maxDistance={10} autoRotate={false} />
            </Suspense>
        </Canvas>
    );
}
