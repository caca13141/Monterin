"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeritagePage() {
    const { t } = useLanguage();

    const timeline = [
        {
            year: "2026",
            title: t.heritage.timeline["2026_1"].title,
            description: t.heritage.timeline["2026_1"].description
        },
        {
            year: "2026",
            title: t.heritage.timeline["2026_2"].title,
            description: t.heritage.timeline["2026_2"].description
        },
        {
            year: "2027",
            title: t.heritage.timeline["2027"].title,
            description: t.heritage.timeline["2027"].description
        },
        {
            year: "Future",
            title: t.heritage.timeline.future.title,
            description: t.heritage.timeline.future.description
        },
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            <LiquidNavbar />

            {/* Hero */}
            <section className="h-[60vh] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black z-0 opacity-60" />

                <div className="relative z-10 text-center max-w-4xl px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4"
                    >
                        {t.heritage.subtitle}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif"
                    >
                        {t.heritage.heading}
                    </motion.h1>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal direction="up">
                        <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
                            {t.heritage.philosophy.heading}
                        </h2>
                        <p className="text-white/70 leading-relaxed text-lg mb-6">
                            {t.heritage.philosophy.p1}
                        </p>
                        <p className="text-white/60 leading-relaxed">
                            {t.heritage.philosophy.p2}
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 px-6 bg-white/5 border-y border-white/10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-serif mb-16 text-center">{t.heritage.timeline.heading}</h2>

                    <div className="space-y-16">
                        {timeline.map((item, index) => (
                            <ScrollReveal key={item.year} direction={index % 2 === 0 ? "left" : "right"}>
                                <div className="grid md:grid-cols-12 gap-8 items-center">
                                    <div className={`md:col-span-4 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                                        <div className="text-6xl md:text-8xl font-serif text-primary/20">
                                            {item.year}
                                        </div>
                                    </div>
                                    <div className={`md:col-span-8 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                        <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
                                        <p className="text-white/70 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-serif mb-16 text-center">{t.heritage.values.heading}</h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                title: t.heritage.values.excellence.title,
                                description: t.heritage.values.excellence.description,
                            },
                            {
                                title: t.heritage.values.integrity.title,
                                description: t.heritage.values.integrity.description,
                            },
                            {
                                title: t.heritage.values.artistry.title,
                                description: t.heritage.values.artistry.description,
                            },
                        ].map((value, index) => (
                            <ScrollReveal key={value.title} direction="up" delay={index * 0.1}>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                                        <div className="w-8 h-8 bg-white/10 rotate-45"></div>
                                    </div>
                                    <h3 className="text-xl font-serif mb-3">{value.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center border-t border-white/10">
                <h2 className="text-3xl md:text-4xl font-serif mb-6">{t.heritage.cta.heading}</h2>
                <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                    {t.heritage.cta.description}
                </p>
                <a
                    href="/appointments"
                    className="px-8 py-4 bg-white text-black uppercase text-xs tracking-widest hover:bg-primary transition-colors inline-block"
                >
                    {t.heritage.cta.button}
                </a>
            </section>

            <LuxuryFooter />
        </main>
    );
}
