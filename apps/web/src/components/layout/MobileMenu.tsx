"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { t, language, setLanguage } = useLanguage();

    const navLinks = [
        { name: t.nav.maison, href: "/maison" },
        { name: t.nav.origins, href: "/origins" },
        { name: t.nav.education, href: "/education" },
        { name: t.nav.atelier, href: "/forge" },
        { name: t.nav.collections, href: "/collections" },
        { name: t.nav.contact, href: "/contact" },
        { name: t.nav.vault, href: "/vault" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[150] md:hidden"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-neutral-950 border-l border-white/10 z-[200] md:hidden overflow-y-auto"
                    >
                        <div className="p-6">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Logo */}
                            <div className="mb-8 mt-2">
                                <Link href="/" onClick={onClose}>
                                    <h2 className="text-2xl font-serif tracking-widest text-white">
                                        MONTÉRIN
                                    </h2>
                                </Link>
                            </div>

                            {/* Language Switcher */}
                            <div className="flex gap-4 mb-8">
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`text-xs uppercase tracking-widest transition-colors ${language === 'en' ? 'text-white font-bold' : 'text-white/40'}`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => setLanguage('fr')}
                                    className={`text-xs uppercase tracking-widest transition-colors ${language === 'fr' ? 'text-white font-bold' : 'text-white/40'}`}
                                >
                                    FR
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="space-y-6">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={onClose}
                                            className="block text-white hover:text-primary transition-colors text-lg tracking-wide"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Divider */}
                            <div className="h-px bg-white/10 my-8" />

                            {/* Additional Links */}
                            <div className="space-y-4 text-sm">
                                <Link
                                    href="/appointments"
                                    onClick={onClose}
                                    className="block text-white/60 hover:text-white transition-colors uppercase tracking-widest text-xs"
                                >
                                    {t.nav.appointments}
                                </Link>
                                <Link
                                    href="/services"
                                    onClick={onClose}
                                    className="block text-white/60 hover:text-white transition-colors uppercase tracking-widest text-xs"
                                >
                                    {t.nav.services}
                                </Link>
                            </div>

                            {/* Contact Info */}
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                                    {t.nav.contact}
                                </p>
                                <a
                                    href="mailto:contact@monterin.com"
                                    className="block text-white/80 hover:text-white transition-colors mb-2"
                                >
                                    contact@monterin.com
                                </a>
                            </div>

                            {/* Location */}
                            <div className="mt-6">
                                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                                    {t.contact.atelier}
                                </p>
                                <p className="text-white/60 text-sm">
                                    Montreal, Quebec<br />
                                    Canada
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
