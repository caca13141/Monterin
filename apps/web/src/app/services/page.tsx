"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Sparkles, Shield, Wrench, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesPage() {
    const { t } = useLanguage();

    // @ts-ignore
    const cleaningDetails = (t.services.cleaning.details as string[]) || [];
    // @ts-ignore
    const repairDetails = (t.services.repair.details as string[]) || [];
    // @ts-ignore
    const certificationDetails = (t.services.certification.details as string[]) || [];
    // @ts-ignore
    const warrantyDetails = (t.services.warranty.details as string[]) || [];

    // @ts-ignore
    const dailyPoints = (t.services.careGuide.daily.points as string[]) || [];
    // @ts-ignore
    const professionalPoints = (t.services.careGuide.professional.points as string[]) || [];

    return (
        <main className="min-h-screen bg-black text-white">
            <LiquidNavbar />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4"
                >
                    {t.services.title}
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-serif mb-6"
                >
                    {t.services.heading}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 max-w-2xl mx-auto"
                >
                    {t.services.description}
                </motion.p>
            </section>

            {/* Services Grid */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            icon: Sparkles,
                            title: t.services.cleaning.title,
                            description: t.services.cleaning.description,
                            details: cleaningDetails
                        },
                        {
                            icon: Wrench,
                            title: t.services.repair.title,
                            description: t.services.repair.description,
                            details: repairDetails
                        },
                        {
                            icon: Shield,
                            title: t.services.certification.title,
                            description: t.services.certification.description,
                            details: certificationDetails
                        },
                        {
                            icon: Award,
                            title: t.services.warranty.title,
                            description: t.services.warranty.description,
                            details: warrantyDetails
                        },
                    ].map((service, index) => (
                        <ScrollReveal key={service.title} direction="up" delay={index * 0.1}>
                            <div className="bg-white/5 border border-white/10 p-8 hover:border-primary/30 transition-colors group">
                                <service.icon className="text-primary mb-4" size={32} />
                                <h3 className="text-2xl font-serif mb-3">{service.title}</h3>
                                <p className="text-white/60 mb-6">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.details.map((detail) => (
                                        <li key={detail} className="text-sm text-white/50 flex items-center gap-2">
                                            <span className="w-1 h-1 bg-primary rounded-full"></span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Care Guide */}
            <section className="py-16 px-6 bg-white/5 border-y border-white/10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-serif mb-8 text-center">{t.services.careGuide.heading}</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-serif mb-4 text-primary">{t.services.careGuide.daily.title}</h3>
                            <ul className="space-y-3 text-white/70">
                                {dailyPoints.map((point, i) => (
                                    <li key={i}>• {point}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-serif mb-4 text-primary">{t.services.careGuide.professional.title}</h3>
                            <ul className="space-y-3 text-white/70">
                                {professionalPoints.map((point, i) => (
                                    <li key={i}>• {point}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-serif mb-6">{t.services.cta.heading}</h2>
                <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                    {t.services.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/contact"
                        className="px-8 py-4 bg-white text-black uppercase text-xs tracking-widest hover:bg-primary transition-colors inline-block"
                    >
                        {t.services.cta.contact}
                    </a>
                    <a
                        href="/appointments"
                        className="px-8 py-4 border border-white/20 text-white uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors inline-block"
                    >
                        {t.services.cta.appointment}
                    </a>
                </div>
            </section>

            <LuxuryFooter />
        </main>
    );
}
