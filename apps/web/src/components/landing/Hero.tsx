"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import PrismaticButton from "@/components/ui/PrismaticButton";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            {/* Static Cinematic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black z-0" />

            {/* Subtle Grain Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 z-0 pointer-events-none mix-blend-overlay"></div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(transparent_0%,_black_100%)] z-0 opacity-80 pointer-events-none"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                >
                    <span className="block text-primary/80 uppercase tracking-[0.3em] text-sm mb-4 font-light">
                        {t.hero.established}
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white tracking-widest mb-6 drop-shadow-2xl">
                        {t.hero.title}
                    </h1>
                    <p className="text-white/60 max-w-lg mx-auto font-light text-lg tracking-wide leading-relaxed italic">
                        {t.hero.tagline}<br />
                        {t.hero.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col md:flex-row gap-6 mt-12 items-center pointer-events-auto"
                >
                    <MagneticButton>
                        <button className="px-8 py-4 border border-white/20 text-white uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-colors duration-500">
                            {t.hero.cta}
                        </button>
                    </MagneticButton>

                    <PrismaticButton />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="absolute bottom-12 flex flex-col items-center gap-2 pointer-events-none"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                    <span className="text-xs text-white/40 tracking-widest uppercase">Explore</span>
                </motion.div>
            </div>
        </section>
    );
}
