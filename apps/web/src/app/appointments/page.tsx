"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AppointmentsPage() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        service: "consultation",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", date: "", time: "", service: "consultation", message: "" });
                }, 5000);
            }
        } catch (error) {
            console.error("Appointment error:", error);
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
                        {t.appointments.title}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif mb-6"
                    >
                        {t.appointments.heading}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 max-w-2xl mx-auto"
                    >
                        {t.appointments.description}
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            title: t.appointments.services.consultation.title,
                            description: t.appointments.services.consultation.description,
                            duration: t.appointments.services.consultation.duration
                        },
                        {
                            title: t.appointments.services.bespoke.title,
                            description: t.appointments.services.bespoke.description,
                            duration: t.appointments.services.bespoke.duration
                        },
                        {
                            title: t.appointments.services.viewing.title,
                            description: t.appointments.services.viewing.description,
                            duration: t.appointments.services.viewing.duration
                        },
                    ].map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="bg-white/5 border border-white/10 p-6 text-center hover:border-primary/30 transition-colors"
                        >
                            <h3 className="text-xl font-serif mb-2">{service.title}</h3>
                            <p className="text-white/60 text-sm mb-4">{service.description}</p>
                            <p className="text-primary text-xs uppercase tracking-widest">{service.duration}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Booking Form */}
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8"
                    >
                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="text-primary" size={32} />
                                </div>
                                <h3 className="text-2xl font-serif mb-2">{t.appointments.form.success.title}</h3>
                                <p className="text-white/60 mb-4">
                                    {t.appointments.form.success.message}
                                </p>
                                <p className="text-white/40 text-sm">
                                    {t.appointments.form.success.checkEmail}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                            <User className="inline mr-2" size={14} />
                                            {t.appointments.form.name} *
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
                                            <Mail className="inline mr-2" size={14} />
                                            {t.appointments.form.email} *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                        <Phone className="inline mr-2" size={14} />
                                        {t.appointments.form.phone} *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                            <Calendar className="inline mr-2" size={14} />
                                            {t.appointments.form.date} *
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                            <Clock className="inline mr-2" size={14} />
                                            {t.appointments.form.time} *
                                        </label>
                                        <select
                                            required
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors"
                                        >
                                            <option value="">{t.appointments.form.timeSelect}</option>
                                            <option value="10:00">10:00 AM</option>
                                            <option value="11:00">11:00 AM</option>
                                            <option value="12:00">12:00 PM</option>
                                            <option value="14:00">2:00 PM</option>
                                            <option value="15:00">3:00 PM</option>
                                            <option value="16:00">4:00 PM</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                        {t.appointments.form.service} *
                                    </label>
                                    <select
                                        value={formData.service}
                                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors"
                                    >
                                        <option value="consultation">{t.appointments.form.serviceTypes.consultation}</option>
                                        <option value="bespoke">{t.appointments.form.serviceTypes.bespoke}</option>
                                        <option value="viewing">{t.appointments.form.serviceTypes.viewing}</option>
                                        <option value="service">{t.appointments.form.serviceTypes.service}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                        <MessageSquare className="inline mr-2" size={14} />
                                        {t.appointments.form.notes}
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={4}
                                        placeholder={t.appointments.form.notesPlaceholder}
                                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors resize-none placeholder:text-white/20"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-white text-black py-4 uppercase text-xs tracking-widest hover:bg-primary transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? t.appointments.form.submitting : t.appointments.form.submit}
                                </button>

                                <p className="text-white/40 text-xs text-center">
                                    {t.appointments.form.disclaimer}
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

            <LuxuryFooter />
        </main>
    );
}
