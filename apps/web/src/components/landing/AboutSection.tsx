"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
    const { t } = useLanguage();
    return (
        <section className="py-32 px-6 bg-neutral-950 border-y border-white/10">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal direction="up">
                    <div className="text-center mb-20">
                        <span className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4">{t.about.title}</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">{t.about.heading}</h2>
                        <p className="text-white/60  max-w-2xl mx-auto leading-relaxed">
                            {t.about.description}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-12 mt-20">
                    {Object.entries(t.about.values).map(([key, value], i) => (
                        <ScrollReveal key={key} direction="up" delay={i * 0.1}>
                            <div className="text-center group">
                                <div className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 bg-white/10 rotate-45 group-hover:rotate-[60deg] transition-transform duration-500"></div>
                                </div>
                                <h3 className="text-xl font-serif text-white mb-3">{value.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
