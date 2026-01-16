"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import { motion, useScroll, useTransform } from "framer-motion";
import { products, Product } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

// --- Components ---

function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
            >
                <source src="https://cdn.coverr.co/videos/coverr-diamond-dust-in-light-4558/1080p.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <motion.span
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-white/60 text-xs uppercase tracking-[0.5em] mb-8"
                >
                    The Nocturne Collection
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                    className="text-6xl md:text-9xl font-serif text-white tracking-widest mix-blend-overlay"
                >
                    ETHEREAL
                </motion.h1>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent opacity-30" />
            </motion.div>
        </section>
    );
}

function Narrative() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-24">
            <motion.div
                style={{ opacity }}
                className="max-w-2xl text-center space-y-12"
            >
                <p className="font-serif text-2xl md:text-4xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/40">
                    "Before form, there was light. In the silence of the void, we forged a collection that speaks only in brilliance."
                </p>
                <p className="text-white/40 text-sm uppercase tracking-[0.3em]">
                    Montérin Atelier • MMXXVI
                </p>
            </motion.div>
        </section>
    );
}

function ProductShowcase({ product, index }: { product: Product; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <div className="min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-24">
            <div className={`w-full max-w-[1600px] flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-32 items-center`}>

                {/* Visual Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="relative w-full md:w-3/5 aspect-[3/4] md:aspect-[16/9] overflow-hidden group cursor-none"
                >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none mix-blend-overlay" />

                    <Link href={`/collections/${product.slug}`}>
                        {product.video ? (
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover transform duration-[2s] group-hover:scale-105 opacity-80 group-hover:opacity-100 transition-all"
                            >
                                <source src={product.video} type="video/mp4" />
                            </video>
                        ) : (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transform duration-[2s] group-hover:scale-105 opacity-80 group-hover:opacity-100 transition-all"
                            />
                        )}
                    </Link>

                    {/* Cursor Follower (CSS only implementation for simplicity) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-30 transform scale-75 group-hover:scale-100 border border-white/20">
                        <span className="text-[10px] uppercase tracking-widest text-white">View</span>
                    </div>
                </motion.div>

                {/* Info Side */}
                <div className="w-full md:w-2/5 md:py-12 flex flex-col justify-center text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#D4Af37] text-xs uppercase tracking-[0.4em] mb-6 block">
                            High Jewelry
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                            {product.name}
                        </h2>
                        <p className="text-white/50 leading-relaxed mb-12 max-w-md mx-auto md:mx-0 font-light">
                            {product.description}
                        </p>

                        <Link
                            href={`/collections/${product.slug}`}
                            className="inline-block text-white border-b border-white/20 pb-2 hover:border-white transition-colors text-xs uppercase tracking-[0.3em] hover:text-[#D4Af37]"
                        >
                            Discover Piece
                        </Link>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}

// --- Main View ---

export function CollectionsView() {
    return (
        <main className="bg-[#000000] text-white selection:bg-white/20 selection:text-white overflow-x-hidden">
            <div className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
                <LiquidNavbar />
            </div>

            <Hero />

            <Narrative />

            <section className="pb-32">
                {products.map((product, index) => (
                    <ProductShowcase key={product.id} product={product} index={index} />
                ))}
            </section>

            <section className="py-24 text-center border-t border-white/5">
                <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-8">
                    Personal Consultation
                </p>
                <Link
                    href="/appointments"
                    className="text-2xl font-serif text-white hover:text-[#D4Af37] transition-colors"
                >
                    Book a private viewing at the Atelier
                </Link>
            </section>

            <div className="relative z-10 bg-black">
                <LuxuryFooter />
            </div>
        </main>
    );
}
