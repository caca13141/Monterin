"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export function NewsletterSection() {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSubmitted(true);
                setEmail("");
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-32 px-6 bg-black">
            <div className="max-w-4xl mx-auto">
                <ScrollReveal direction="up">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
                            {t.newsletter.heading}
                        </h2>
                        <p className="text-white/50 mb-12 max-w-2xl mx-auto">
                            {t.newsletter.description}
                        </p>

                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t.newsletter.placeholder}
                                    required
                                    disabled={isLoading || isSubmitted}
                                    className="w-full bg-white/5 border border-white/10 text-white px-6 py-4 pr-32 outline-none focus:border-primary/50 transition-colors text-center tracking-widest text-xs uppercase placeholder:text-white/20 disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || isSubmitted}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black px-6 py-3 text-xs uppercase tracking-widest hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "..." : isSubmitted ? `✓ ${t.newsletter.subscribed}` : t.newsletter.button}
                                </button>
                            </div>

                            {error && (
                                <p className="text-red-400 text-xs mt-2">{error}</p>
                            )}

                            {isSubmitted && (
                                <p className="text-primary text-xs mt-2">{t.newsletter.success}</p>
                            )}

                            <p className="text-white/20 text-[10px] mt-4 uppercase tracking-widest">
                                {t.newsletter.privacy}
                            </p>
                        </form>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
