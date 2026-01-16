"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUpRight, Download } from "lucide-react";

export default function PressPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-black text-white">
            <LiquidNavbar />

            {/* Hero */}
            <section className="h-[50vh] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black z-0 opacity-40" />

                <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4"
                    >
                        {t.press.title}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif mb-6"
                    >
                        {t.press.heading}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 max-w-xl mx-auto"
                    >
                        {t.press.description}
                    </motion.p>
                </div>
            </section>

            {/* Featured Articles */}
            <section className="py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 gap-12">
                        {/* Article 1 - Vogue */}
                        <ScrollReveal>
                            <div className="group border-t border-white/10 pt-12 pb-4 transition-colors hover:border-primary/50">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
                                    <div>
                                        <span className="text-primary text-xs uppercase tracking-widest block mb-2">{t.press.articles.vogue.publication}</span>
                                        <h2 className="text-3xl md:text-5xl font-serif group-hover:text-white transition-colors text-white/90">
                                            {t.press.articles.vogue.title}
                                        </h2>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-white/40 text-sm block">{t.press.articles.vogue.date}</span>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-12">
                                    <p className="text-white/60 text-lg leading-relaxed">
                                        "{t.press.articles.vogue.excerpt}"
                                    </p>
                                    <div className="flex justify-start md:justify-end items-end">
                                        <button className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors uppercase text-xs tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                                            Read Full Article <ArrowUpRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Article 2 - ELLE */}
                        <ScrollReveal delay={0.1}>
                            <div className="group border-t border-white/10 pt-12 pb-4 transition-colors hover:border-primary/50">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
                                    <div>
                                        <span className="text-primary text-xs uppercase tracking-widest block mb-2">{t.press.articles.elle.publication}</span>
                                        <h2 className="text-3xl md:text-5xl font-serif group-hover:text-white transition-colors text-white/90">
                                            {t.press.articles.elle.title}
                                        </h2>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-white/40 text-sm block">{t.press.articles.elle.date}</span>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-12">
                                    <p className="text-white/60 text-lg leading-relaxed">
                                        "{t.press.articles.elle.excerpt}"
                                    </p>
                                    <div className="flex justify-start md:justify-end items-end">
                                        <button className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors uppercase text-xs tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                                            Read Full Article <ArrowUpRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Article 3 - Forbes */}
                        <ScrollReveal delay={0.2}>
                            <div className="group border-t border-white/10 pt-12 pb-4 border-b transition-colors hover:border-primary/50">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
                                    <div>
                                        <span className="text-primary text-xs uppercase tracking-widest block mb-2">{t.press.articles.forbes.publication}</span>
                                        <h2 className="text-3xl md:text-5xl font-serif group-hover:text-white transition-colors text-white/90">
                                            {t.press.articles.forbes.title}
                                        </h2>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-white/40 text-sm block">{t.press.articles.forbes.date}</span>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-12">
                                    <p className="text-white/60 text-lg leading-relaxed">
                                        "{t.press.articles.forbes.excerpt}"
                                    </p>
                                    <div className="flex justify-start md:justify-end items-end">
                                        <button className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors uppercase text-xs tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                                            Read Full Article <ArrowUpRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Media Kit & Contact */}
            <section className="py-24 px-6 bg-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <h3 className="text-2xl font-serif mb-4">{t.press.heading}</h3>
                            <p className="text-white/60 mb-8">
                                Access our high-resolution imagery, brand guidelines, and official press releases.
                            </p>
                            <button className="flex items-center gap-3 bg-white text-black px-6 py-3 uppercase text-xs tracking-widest hover:bg-primary transition-colors">
                                <Download size={16} />
                                {t.press.downloadKit}
                            </button>
                        </div>
                        <div className="text-left md:border-l border-white/10 md:pl-16">
                            <h3 className="text-2xl font-serif mb-4">{t.press.contact.heading}</h3>
                            <p className="text-white/60 mb-2">
                                {t.press.contact.description}
                            </p>
                            <a href={`mailto:${t.press.contact.email}`} className="text-primary text-lg hover:underline block mt-4">
                                {t.press.contact.email}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <LuxuryFooter />
        </main>
    );
}
