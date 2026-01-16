"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const branding = "MONTÉRIN";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Progress counter simulation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1; // Incrementally reach 100
            });
        }, 20);

        // Completion delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <div className="fixed inset-0 z-[100] flex flex-col pointer-events-none">
                    {/* Top Shutter */}
                    <motion.div
                        initial={{ height: "50vh" }}
                        exit={{ height: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
                        className="w-full bg-black relative flex items-end justify-center overflow-hidden border-b border-white/10"
                    >
                        {/* Text Half Top */}
                        <div className="absolute bottom-[-2rem] md:bottom-[-3rem] flex overflow-hidden">
                            {branding.split("").map((letter, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="text-6xl md:text-9xl font-serif text-white tracking-[0.2em]"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Bottom Shutter */}
                    <motion.div
                        initial={{ height: "50vh" }}
                        exit={{ height: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
                        className="w-full bg-black relative flex items-start justify-center overflow-hidden border-t border-white/10"
                    >
                        {/* Text Half Bottom mirrors the top to create full text illusion if we aligned perfectly, 
                            but for this effect let's keep it simpler: The text is IN FRONT of the shutters? 
                            Actually, a better "Curtain" effect is text overlaying the shutters, then shutters open.
                        */}
                    </motion.div>

                    {/* Re-implementing as Fullscreen overlay that splits */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.1, delay: 1 } }} // Immediate fade of container after panels move
                        className="absolute inset-0 z-[101] flex items-center justify-center"
                    >
                        <div className="absolute bottom-12 right-12 text-white font-mono text-xs">
                            {progress}%
                        </div>

                        <div className="flex overflow-hidden relative z-50 mix-blend-difference text-white">
                            {branding.split("").map((letter, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-100%", opacity: 0, transition: { duration: 0.5 } }}
                                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 }}
                                    className="text-4xl md:text-8xl font-serif tracking-widest inline-block"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* The Shutters */}
                    <motion.div
                        initial={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                        className="absolute top-0 left-0 w-full h-[50vh] bg-black z-[100]"
                    />
                    <motion.div
                        initial={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                        className="absolute bottom-0 left-0 w-full h-[50vh] bg-black z-[100]"
                    />
                </div>
            )}
        </AnimatePresence>
    );
}
