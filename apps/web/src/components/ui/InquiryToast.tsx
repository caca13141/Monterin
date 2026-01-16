"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InquiryToast() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        type: "general"
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsOpen(false);
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", message: "", type: "general" });
                }, 3000);
            }
        } catch (error) {
            console.error('Inquiry error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 bg-white text-black px-6 py-4 rounded-full shadow-2xl hover:bg-primary transition-colors uppercase text-xs tracking-widest"
            >
                Inquire
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-neutral-950 border border-white/10 rounded-lg max-w-lg w-full p-8 relative"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">✓</span>
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-2">Thank You</h3>
                                    <p className="text-white/60">We'll be in touch shortly.</p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-serif text-white mb-2">Private Inquiry</h3>
                                    <p className="text-white/40 text-sm mb-6">Connect with our concierge team</p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors text-sm"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors text-sm"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number (Optional)"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors text-sm"
                                        />
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors text-sm"
                                        >
                                            <option value="general">General Inquiry</option>
                                            <option value="bespoke">Bespoke Commission</option>
                                            <option value="appointment">Private Appointment</option>
                                            <option value="collection">Collection Information</option>
                                        </select>
                                        <textarea
                                            placeholder="Your Message"
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={4}
                                            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-primary/50 transition-colors text-sm resize-none"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-white text-black py-3 uppercase text-xs tracking-widest hover:bg-primary transition-colors disabled:opacity-50"
                                        >
                                            {isLoading ? "Sending..." : "Submit Inquiry"}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
