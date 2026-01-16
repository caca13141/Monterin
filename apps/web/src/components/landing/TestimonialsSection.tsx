"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
    {
        name: "S.M.",
        location: "Montreal",
        text: "The attention to detail in my bespoke engagement ring exceeded all expectations. Every visit to the atelier felt personal and special.",
        rating: 5,
    },
    {
        name: "A.R.",
        location: "Toronto",
        text: "Their expertise in lab-grown diamonds helped me make an informed decision. The quality is exceptional and the transparency refreshing.",
        rating: 5,
    },
    {
        name: "M.L.",
        location: "New York",
        text: "A true haute joaillerie experience. The craftsmanship rivals the finest European houses. Worth every penny.",
        rating: 5,
    },
];

export function TestimonialsSection() {
    const { t } = useLanguage();
    return (
        <section className="py-32 px-6 bg-neutral-950">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal direction="up">
                    <div className="text-center mb-16">
                        <span className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4">{t.testimonials.title}</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">{t.testimonials.heading}</h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            {t.testimonials.subtitle}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                            <div className="bg-white/5 border border-white/10 p-8 hover:border-primary/30 transition-colors group">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-primary text-primary" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-white/80 leading-relaxed mb-6 italic">
                                    "{testimonial.text}"
                                </p>

                                {/* Attribution */}
                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-white font-serif">{testimonial.name}</p>
                                    <p className="text-white/40 text-sm">{testimonial.location}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Trust Badge */}
                <div className="mt-16 text-center">
                    <p className="text-white/40 text-sm uppercase tracking-widest">
                        {t.testimonials.trustBadge}
                    </p>
                </div>
            </div>
        </section>
    );
}
