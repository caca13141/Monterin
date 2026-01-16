"use client";

import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF } from "@react-three/drei";
import React, { Suspense, Component, ErrorInfo, ReactNode } from "react";

interface Product3DViewerProps {
    modelPath: string;
    autoRotate?: boolean;
}

function Model({ path }: { path: string }) {
    const { scene } = useGLTF(path);
    return <primitive object={scene} />;
}

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode; fallback: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("3D Model Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export function Product3DViewer({ modelPath, autoRotate = true }: Product3DViewerProps) {
    return (
        <div className="w-full h-full min-h-[400px] relative bg-neutral-100/5 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
            <ErrorBoundary fallback={
                <div className="text-center p-6 bg-black/50 rounded-lg backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-widest text-white/40 block mb-2">3D View Unavailable</span>
                    <p className="text-[10px] text-white/20">Please add model: {modelPath.split('/').pop()}</p>
                </div>
            }>
                <div className="absolute inset-0 w-full h-full">
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                        <span className="text-xs uppercase tracking-widest text-white/40">3D View • Interactive</span>
                    </div>

                    <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                        <Suspense fallback={null}>
                            <Stage environment="city" intensity={0.6} shadows={{ type: 'contact', opacity: 0.7, blur: 2 }}>
                                <Model path={modelPath} />
                            </Stage>
                        </Suspense>
                        <OrbitControls autoRotate={autoRotate} makeDefault />
                    </Canvas>
                </div>
            </ErrorBoundary>
        </div>
    );
}
