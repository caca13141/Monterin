"use client";

import { motion } from "framer-motion";

interface ForgeConfig {
    carat: number;
    clarity: number;
    cut: string;
}

interface Props {
    config: ForgeConfig;
    setConfig: (config: ForgeConfig) => void;
}

export function ForgeControls({ config, setConfig }: Props) {
    return (
        <div className="space-y-12">
            {/* Carat Slider */}
            <div className="space-y-4">
                <div className="flex justify-between text-white text-sm font-serif">
                    <span>Carat Weight</span>
                    <span>{config.carat.toFixed(2)} ct</span>
                </div>
                <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.01"
                    value={config.carat}
                    onChange={(e) => setConfig({ ...config, carat: parseFloat(e.target.value) })}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-primary"
                />
            </div>

            {/* Clarity Slider */}
            <div className="space-y-4">
                <div className="flex justify-between text-white text-sm font-serif">
                    <span>Luster (Clarity)</span>
                    <span>{config.clarity}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={config.clarity}
                    onChange={(e) => setConfig({ ...config, clarity: parseInt(e.target.value) })}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-primary"
                />
            </div>

            {/* Cut Selector */}
            <div className="space-y-4">
                <div className="flex justify-between text-white text-sm font-serif">
                    <span>Cut Grade</span>
                    <span>{config.cut}</span>
                </div>
                <div className="flex gap-2">
                    {["Deep", "Ideal", "Shallow"].map((c) => (
                        <button
                            key={c}
                            onClick={() => setConfig({ ...config, cut: c })}
                            className={`flex-1 py-2 text-[10px] uppercase tracking-wider border transition-all ${config.cut === c
                                    ? "bg-white text-black border-white"
                                    : "border-white/20 text-white/40 hover:text-white"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
