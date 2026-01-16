"use client";

import { motion } from "framer-motion";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Left: Menu & Search */}
                <div className="flex items-center gap-6">
                    <button className="text-white/80 hover:text-primary transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                    <button className="text-white/80 hover:text-primary transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                {/* Center: Brand */}
                <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                    {/* Using CSS mix-blend-mode to blend the white background of the JPG if needed, 
                 but ideally we want to show the logo clearly. Since it's a JPG with white/grey bg,
                 we might want to style it as a badge or just text if the image isn't transparent.
                 Given the image is high quality metal text, let's use the text name for now but stylized,
                 OR render the image. Let's use the text "MONTÉRIN" in the font first to match the logo style,
                 as the JPG might look boxy on a dark background without processing. 
                 Actually, user said "this is the name and brand and logo", so I should probably show the text.
             */}
                    <span className="text-2xl md:text-3xl font-serif tracking-widest text-white uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/60 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                        MONTÉRIN
                    </span>
                </Link>

                {/* Right: Cart & Account */}
                <div className="flex items-center gap-6">
                    <button className="text-white/80 hover:text-primary transition-colors">
                        <User className="w-5 h-5" />
                    </button>
                    <div className="relative">
                        <button className="text-white/80 hover:text-primary transition-colors">
                            <ShoppingBag className="w-5 h-5" />
                        </button>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
