"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";

const products = [
    {
        id: 1,
        name: "The Sovereign",
        price: "$45,000",
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop",
        tag: "High Jewellery"
    },
    {
        id: 2,
        name: "Ethereal Band",
        price: "$12,500",
        image: "https://images.unsplash.com/photo-1603561591411-0613dc041e4a?q=80&w=800&auto=format&fit=crop",
        tag: "Bridal"
    },
    {
        id: 3,
        name: "Lumina Pendant",
        price: "$28,000",
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop",
        tag: "Collection"
    }
];

export function FeaturedCollection() {
    return (
        <section className="py-32 bg-neutral-950 px-6 md:px-12 relative overflow-hidden">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
                <div>
                    <span className="text-secondary/60 uppercase tracking-[0.3em] text-xs">Curated Selection</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mt-4">New Arrivals</h2>
                </div>
                <MagneticButton className="mt-8 md:mt-0 text-white border-b border-white pb-1 hover:text-primary hover:border-primary transition-colors uppercase tracking-widest text-xs">
                    View All Works
                </MagneticButton>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 mb-6">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-12 h-[1px] bg-white transform -translate-x-4 group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="mx-4 text-white uppercase tracking-widest text-xs translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View</span>
                                <div className="w-12 h-[1px] bg-white transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500" />
                            </div>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-secondary/50 text-xs uppercase tracking-widest mb-1 block">{product.tag}</span>
                                <h3 className="text-xl text-white font-serif">{product.name}</h3>
                            </div>
                            <span className="text-primary/80 font-serif">{product.price}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
