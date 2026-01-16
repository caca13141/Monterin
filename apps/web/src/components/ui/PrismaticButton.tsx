"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function PrismaticButton() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href="/origins" className="relative group inline-block">
            {/* Morphing Gradient Background */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-50 blur group-hover:opacity-100 group-hover:blur-md transition duration-1000 group-hover:duration-200 animate-tilt"></div>

            {/* Main Button Container */}
            <motion.div
                className="relative relative px-8 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="flex items-center space-x-5">
                    <span className="relative overflow-hidden">
                        {/* Glitch/Aberration Text Effect */}
                        <motion.span
                            className="absolute inset-0 text-cyan-400 mix-blend-screen opacity-0 group-hover:opacity-100 uppercase tracking-widest text-xs"
                            animate={isHovered ? { x: [-2, 2, -1, 0], clipPath: ["inset(10% 0 0 0)", "inset(80% 0 0 0)", "inset(0 0 0 0)"] } : {}}
                            transition={{ repeat: Infinity, duration: 0.2 }}
                        >
                            Origins
                        </motion.span>
                        <motion.span
                            className="absolute inset-0 text-red-400 mix-blend-screen opacity-0 group-hover:opacity-100 uppercase tracking-widest text-xs"
                            animate={isHovered ? { x: [2, -2, 1, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 0.3 }}
                        >
                            Origins
                        </motion.span>

                        {/* Base Text */}
                        <span className="text-white uppercase tracking-widest text-xs group-hover:text-transparent transition-colors duration-100">
                            Discover our Origins
                        </span>
                    </span>

                    {/* Icon */}
                    <span className="text-gray-400 pl-6 group-hover:text-white transition-colors">
                        &rarr;
                    </span>
                </div>
            </motion.div>
        </Link>
    );
}
