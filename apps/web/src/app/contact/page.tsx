"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import { motion } from "framer-motion";
import { Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, type: formData.subject }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
                }, 4000);
            }
        } catch (error) {
            console.error("Contact form error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <LiquidNavbar />

            {/* Header */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary/60 text-xs uppercase tracking-[0.5em] block mb-4"
                    >
                        {t.contact.title}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif mb-6"
                    >
                        {t.contact.heading}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 max-w-2xl mx-auto"
                    >
                        {t.contact.description}
                    </motion.p>
                </div>
            </section>

            {/* Contact Information & Form */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-2xl font-serif mb-8">{t.contact.atelier}</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Mail className="text-primary mt-1" size={20} />
                                    <div>
                                        <a href="mailto:contact@monterin.com" className="text-white/80 hover:text-white transition-colors">
                                            contact@monterin.com
                                        </a>
                                        <p className="text-white/40 text-sm mt-1">{t.contact.responseTime}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="text-primary mt-1" size={20} />
                                    <div>
                                        <p className="text-white/80">{t.contact.hours}</p>
                                        <p className="text-white/40 text-sm mt-1">{t.contact.hoursDetail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-8">
                            <h3 className="text-lg font-serif mb-4">{t.contact.privateAppointments}</h3>
                            <p className="text-white/60 text-sm mb-4">
                                {t.contact.appointmentDescription}
                            </p>
                            <a
                                href="/appointments"
                                className="inline-block px-6 py-3 border border-white/20 text-white uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors"
                            >
                                {t.contact.bookAppointment}
                            </a>
                        </div>

                        <div className="border-t border-white/10 pt-8">
                            <h3 className="text-lg font-serif mb-4">{t.contact.location}</h3>
                            <p className="text-white/60 text-sm">
                                {t.contact.locationDescription}
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8"
                    >
                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">✓</span>
                                </div>
                                <h3 className="text-2xl font-serif mb-2">{t.contact.form.thankYou}</h3>
                                <p className="text-white/60">{t.contact.form.confirmation}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                        {t.contact.form.name} *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                        {t.contact.form.email} *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                        {t.contact.form.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                        {t.contact.form.subject} *
                                    </label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors"
                                    >
                                        <option value="general">{t.contact.form.subjects.general}</option>
                                        <option value="bespoke">{t.contact.form.subjects.bespoke}</option>
                                        <option value="appointment">{t.contact.form.subjects.appointment}</option>
                                        <option value="collection">{t.contact.form.subjects.collection}</option>
                                        <option value="services">{t.contact.form.subjects.services}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                        {t.contact.form.message} *
                                    </label>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={5}
                                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-white text-black py-4 uppercase text-xs tracking-widest hover:bg-primary transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? t.contact.form.sending : t.contact.form.send}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

            <LuxuryFooter />
        </main>
    );
}
