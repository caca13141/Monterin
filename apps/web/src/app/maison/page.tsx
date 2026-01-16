"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MaisonPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-primary selection:text-black">
            <LiquidNavbar />

            {/* Header */}
            <section className="h-[70vh] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2000&auto=format&fit=crop"
                        alt="Atelier Background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="block text-primary/80 uppercase tracking-[0.3em] text-xs mb-6"
                    >
                        The Philosophy
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-5xl md:text-8xl font-serif tracking-widest leading-tight"
                    >
                        THE ATELIER
                    </motion.h1>
                </div>
            </section>

            {/* Content Story */}
            <section className="py-24 md:py-48 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                    <h2 className="text-3xl font-serif tracking-wide text-white/90">Exceptional Craftsmanship</h2>
                    <p className="text-white/60 leading-loose font-light text-lg">
                        At Montérin, we believe true luxury is not merely seen—it is felt.
                        Our artisans unite centuries-old techniques with contemporary vision
                        to create pieces that transcend the ordinary.
                    </p>
                    <p className="text-white/60 leading-loose font-light text-lg">
                        Each precious stone is selected not for market value alone,
                        but for its unique character—its ability to capture and reflect light
                        in a way that touches the soul.
                    </p>
                    <div className="h-[1px] w-24 bg-primary/50 mt-8" />
                </div>

                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                    <Image
                        src="https://images.unsplash.com/photo-1617038224531-15d9cd1916e4?q=80&w=1000&auto=format&fit=crop"
                        alt="Craftsmanship"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-1000"
                    />
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-24 bg-white/5 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h3 className="text-2xl font-serif mb-8 text-primary">Our Vision</h3>
                    <p className="text-2xl md:text-4xl leading-relaxed text-white/80 font-serif italic">
                        "To create timeless jewels, precious heirlooms for generations to come."
                    </p>
                </div>
            </section>

            <LuxuryFooter />
        </main>
    );
}
