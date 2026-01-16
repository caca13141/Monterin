"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQPage() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
        const key = `${categoryIndex}-${questionIndex}`;
        setOpenIndex(openIndex === key ? null : key);
    };

    // NOTE: Ideally, these questions would be fetched from the translation files.
    // For now, we are displaying the hardcoded content but using translation keys for the UI structure.
    // To make this fully bilingual, we would need to expand the JSON files with all FAQ content.
    const faqs = [
        {
            category: "Bespoke Process",
            questions: [
                {
                    question: "How long does a custom piece take?",
                    answer: "Bespoke creations typically require 6-12 weeks from initial consultation to final delivery. Complex designs may take longer. We'll provide a detailed timeline during your first appointment."
                },
                {
                    question: "What's included in the bespoke service?",
                    answer: "Your experience includes unlimited design consultations, 3D renderings, hand-crafted wax models for preview, GIA/IGI diamond selection assistance, and lifetime warranty on craftsmanship."
                },
            ]
        },
        {
            category: "Diamond Quality",
            questions: [
                {
                    question: "Lab-grown vs natural: which should I choose?",
                    answer: "Both are real diamonds with identical properties. Lab-grown offers 40-60% cost savings and minimal environmental impact. Natural diamonds carry traditional prestige and potential investment value. We help you decide based on your values and budget."
                },
                {
                    question: "Are all diamonds certified?",
                    answer: "Yes. Every diamond comes with independent certification from GIA (Gemological Institute of America) or IGI (International Gemological Institute), detailing the 4 Cs and authenticity."
                },
            ]
        },
        {
            category: "Pricing & Payment",
            questions: [
                {
                    question: "Do you offer financing?",
                    answer: "Yes. We partner with select financing providers for qualified purchases. Payment plans available for orders above a certain threshold. Contact us for details."
                },
                {
                    question: "Can I get an appraisal for insurance?",
                    answer: "Absolutely. All pieces include a detailed appraisal certificate suitable for insurance purposes. We also offer re-appraisal services every 3-5 years."
                },
            ]
        },
        {
            category: "Care & Warranty",
            questions: [
                {
                    question: "What's covered under warranty?",
                    answer: "Lifetime warranty covers manufacturing defects, prong integrity, and setting issues. Normal wear, loss, theft, and damage from accidents are not covered. See full terms for details."
                },
                {
                    question: "How should I care for my piece?",
                    answer: "Remove jewelry during physical activities. Clean with mild soap and warm water. Store separately to prevent scratching. Visit us annually for professional inspection and complimentary cleaning."
                },
            ]
        },
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            <LiquidNavbar />

            <div className="max-w-4xl mx-auto px-6 py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4">
                        {t.faq.title}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6">
                        {t.faq.heading}
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        {t.faq.description} <a href="/contact" className="text-primary hover:underline">{t.faq.contactLink}</a>.
                    </p>
                </motion.div>

                {faqs.map((category, catIndex) => (
                    <div key={catIndex} className="mb-12">
                        <h2 className="text-2xl font-serif mb-6 text-primary">
                            {category.category}
                        </h2>
                        <div className="space-y-4">
                            {category.questions.map((faq, qIndex) => {
                                const key = `${catIndex}-${qIndex}`;
                                const isOpen = openIndex === key;

                                return (
                                    <motion.div
                                        key={qIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: catIndex * 0.1 + qIndex * 0.05 }}
                                        className="bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                                    >
                                        <button
                                            onClick={() => toggleQuestion(catIndex, qIndex)}
                                            className="w-full px-6 py-4 flex items-center justify-between text-left"
                                        >
                                            <span className="text-white font-light">{faq.question}</span>
                                            <ChevronDown
                                                className={`text-primary transition-transform ${isOpen ? "rotate-180" : ""
                                                    }`}
                                                size={20}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="px-6 pb-4 text-white/70 leading-relaxed border-t border-white/10 pt-4">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="mt-16 pt-8 border-t border-white/10 text-center">
                    <h3 className="text-xl font-serif mb-4">{t.faq.stillHaveQuestions}</h3>
                    <p className="text-white/60 mb-6">
                        {t.faq.teamAvailable}
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-4 bg-white text-black uppercase text-xs tracking-widest hover:bg-primary transition-colors"
                    >
                        {t.faq.contactUs}
                    </a>
                </div>
            </div>

            <LuxuryFooter />
        </main>
    );
}
