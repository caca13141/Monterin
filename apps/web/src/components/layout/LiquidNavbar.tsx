"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export function LiquidNavbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useLanguage();

    const navLinks = [
        { name: t.nav.maison, href: "/maison" },
        { name: t.nav.origins, href: "/origins" },
        { name: t.nav.education, href: "/education" },
        { name: t.nav.atelier, href: "/forge" },
        { name: t.nav.collections, href: "/collections" },
        { name: t.nav.contact, href: "/contact" },
    ];

    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(0, 0, 0, 0)", "rgba(5, 5, 5, 0.6)"]
    );

    const backdropBlur = useTransform(
        scrollY,
        [0, 100],
        ["blur(0px)", "blur(12px)"]
    );

    const borderOpacity = useTransform(
        scrollY,
        [0, 100],
        [0, 0.1]
    );

    const paddingBlock = useTransform(
        scrollY,
        [0, 100],
        ["2rem", "1rem"]
    );

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    return (
        <>
            <motion.header
                style={{
                    backgroundColor,
                    backdropFilter: backdropBlur,
                    paddingTop: paddingBlock,
                    paddingBottom: paddingBlock,
                    borderColor: `rgba(255, 255, 255, ${borderOpacity})`
                }}
                className="fixed top-0 left-0 right-0 z-50 w-full border-b border-transparent transition-colors duration-500"
            >
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-3 items-center">
                        {/* Left: Menu & Language */}
                        <div className="flex items-center gap-4 justify-start">
                            <MagneticButton
                                className="p-2 text-white/80 hover:text-white md:hidden"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu strokeWidth={1} size={24} />
                            </MagneticButton>
                            <div className="hidden md:block">
                                <LanguageSwitcher />
                            </div>
                        </div>

                        {/* Center: Logo */}
                        <div className="flex justify-center">
                            <Link href="/">
                                <h2 className={cn(
                                    "font-serif tracking-widest text-white transition-all duration-500",
                                    isScrolled ? "text-xl" : "text-2xl"
                                )}>
                                    MONTÉRIN
                                </h2>
                            </Link>
                        </div>

                        {/* Right: Cart */}
                        <div className="flex items-center gap-4 justify-end">
                            <MagneticButton className="relative p-2 text-white/80 hover:text-white group">
                                <Link href="/vault">
                                    <ShoppingBag strokeWidth={1} size={20} />
                                    <span className="absolute top-1 right-0 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Desktop Nav Links Below */}
                    <nav className="hidden md:flex items-center justify-center gap-8 mt-6">
                        {navLinks.map((link) => (
                            <MagneticButton key={link.name} strength={0.2} className="text-xs uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors">
                                <Link href={link.href}>
                                    {link.name}
                                </Link>
                            </MagneticButton>
                        ))}
                    </nav>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
