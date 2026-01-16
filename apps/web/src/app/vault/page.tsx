"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import { motion } from "framer-motion";
import Link from "next/link";

export default function VaultPage() {
    // Mock saved configurations
    const savedDesigns = [
        { id: 1, name: "Eternal Radiance", carat: 2.5, clarity: 95, cut: "Ideal", date: "2026-01-10" },
        { id: 2, name: "Celestial Crown", carat: 1.8, clarity: 88, cut: "Deep", date: "2026-01-12" },
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            <LiquidNavbar />

            <section className="max-w-7xl mx-auto px-6 py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h1 className="text-4xl font-serif mb-2">Your Vault</h1>
                            <p className="text-white/40 uppercase tracking-widest text-xs">
                                Personal Design Archive
                            </p>
                        </div>

                        <Link
                            href="/forge"
                            className="px-6 py-3 bg-white text-black uppercase text-xs tracking-widest hover:bg-primary transition-colors"
                        >
                            Create New Design
                        </Link>
                    </div>

                    {/* Saved Designs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedDesigns.map((design, index) => (
                            <motion.div
                                key={design.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group"
                            >
                                {/* Visual Placeholder for 3D Preview */}
                                <div className="aspect-square bg-gradient-to-br from-white/10 to-transparent rounded-lg mb-4 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rotate-45 group-hover:rotate-[60deg] transition-transform duration-500"></div>
                                </div>

                                <h3 className="text-xl font-serif mb-2">{design.name}</h3>
                                <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                                    Created {new Date(design.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </p>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Carat</span>
                                        <span className="text-white font-serif">{design.carat} ct</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Luster</span>
                                        <span className="text-white font-serif">{design.clarity}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Cut</span>
                                        <span className="text-white font-serif">{design.cut}</span>
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-3 border border-white/20 text-white uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors">
                                    View in Forge
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {savedDesigns.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-32 h-32 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6">
                                <div className="w-16 h-16 bg-white/10 rotate-45"></div>
                            </div>
                            <h3 className="text-2xl font-serif mb-2">No Designs Yet</h3>
                            <p className="text-white/40 mb-6">Start creating your first masterpiece</p>
                            <Link
                                href="/forge"
                                className="inline-block px-8 py-4 bg-white text-black uppercase text-xs tracking-widest hover:bg-primary transition-colors"
                            >
                                Enter The Forge
                            </Link>
                        </div>
                    )}
                </motion.div>
            </section>

            <LuxuryFooter />
        </main>
    );
}
