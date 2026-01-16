"use client";

import { motion } from "framer-motion";
import { Link2, Instagram, Twitter, Facebook } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export function LuxuryFooter() {
    const { t } = useLanguage();
    return (
        <footer className="bg-black text-white pt-32 pb-12 px-6 md:px-12 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                {/* Brand */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-serif tracking-widest">MONTÉRIN</h2>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                        {t.footer.tagline}
                    </p>
                </div>

                {/* Links - Maison */}
                <div className="space-y-6">
                    <h4 className="text-xs uppercase tracking-[0.25em] text-white/40">{t.footer.links.maison.title}</h4>
                    <ul className="space-y-4 text-sm text-white/70">
                        <li className="hover:text-primary transition-colors cursor-pointer">
                            <Link href="/maison">{t.footer.links.maison.about}</Link>
                        </li>
                        <li className="hover:text-primary transition-colors cursor-pointer">
                            <Link href="/forge">{t.footer.links.maison.atelier}</Link>
                        </li>
                        <li className="hover:text-primary transition-colors cursor-pointer">
                            <Link href="/origins">{t.footer.links.maison.savoirFaire}</Link>
                        </li>
                        <li className="hover:text-primary transition-colors cursor-pointer">
                            <Link href="/education">{t.footer.links.maison.sustainability}</Link>
                        </li>
                        <li className="hover:text-primary transition-colors cursor-pointer">
                            <Link href="/press">{t.footer.links.maison.press}</Link>
                        </li>
                    </ul>
                </div>

                {/* Links - Services */}
                <div className="space-y-6">
                    <h4 className="text-xs uppercase tracking-[0.25em] text-white/40">{t.footer.links.services.title}</h4>
                    <ul className="space-y-4 text-sm text-white/70">
                        <li className="hover:text-primary transition-colors cursor-pointer">
                            <Link href="/contact">{t.footer.links.services.contact}</Link>
                        </li>
                        <li className="hover:text-primary transition-colors cursor-pointer">{t.footer.links.services.shipping}</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">{t.footer.links.services.sizeGuide}</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">
                            <Link href="/appointments">{t.footer.links.services.appointments}</Link>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="space-y-6">
                    <h4 className="text-xs uppercase tracking-[0.25em] text-white/40">{t.footer.newsletter.title}</h4>
                    <div className="flex border-b border-white/20 pb-4">
                        <input
                            type="email"
                            placeholder={t.footer.newsletter.placeholder}
                            className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/20 text-sm"
                        />
                        <button className="text-white/60 hover:text-white transition-colors uppercase text-xs tracking-widest">
                            {t.footer.newsletter.button}
                        </button>
                    </div>
                    <div className="flex gap-6 pt-4 text-white/40">
                        <Instagram size={20} className="hover:text-white transition-colors cursor-pointer" />
                        <Twitter size={20} className="hover:text-white transition-colors cursor-pointer" />
                        <Facebook size={20} className="hover:text-white transition-colors cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-xs text-white/30 uppercase tracking-widest">
                <p>&copy; 2026 Montérin. {t.footer.legal.rights}</p>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <span className="hover:text-white transition-colors cursor-pointer">{t.footer.legal.privacy}</span>
                    <span className="hover:text-white transition-colors cursor-pointer">{t.footer.legal.terms}</span>
                </div>
            </div>
        </footer>
    );
}
