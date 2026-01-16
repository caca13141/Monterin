"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: Product;
    index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
        >
            <Link href={`/collections/${product.slug}`} className="block">
                {/* Image Container: Clean, no dark overlay, subtle scale */}
                <div className="relative aspect-square overflow-hidden bg-[#f5f5f5] mb-6">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />

                    {/* Minimalist 'Wishlist' or Interaction Icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                            <span className="text-lg leading-none">+</span>
                        </div>
                    </div>
                </div>

                {/* Typography: Clean, centered, high-fashion */}
                <div className="text-center space-y-2">
                    <h3 className="font-serif text-lg tracking-wide text-black group-hover:text-[#9A8555] transition-colors duration-300">
                        {product.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                        {product.price}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}
