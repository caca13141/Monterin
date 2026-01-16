"use client";

import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <LiquidNavbar />

            <section className="flex-grow flex items-center justify-center py-32 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10">
                        <h1 className="text-3xl font-serif text-center mb-2">
                            {isRegister ? "Join The Vault" : "Enter The Vault"}
                        </h1>
                        <p className="text-white/40 text-center text-sm mb-8 uppercase tracking-widest">
                            {isRegister ? "Create Your Account" : "Access Your Collection"}
                        </p>

                        <form className="space-y-6">
                            {isRegister && (
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
                                        placeholder="James Montérin"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-black py-4 rounded-lg uppercase text-xs tracking-widest font-semibold hover:bg-primary transition-colors"
                            >
                                {isRegister ? "Create Account" : "Sign In"}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setIsRegister(!isRegister)}
                                className="text-white/60 hover:text-white text-sm transition-colors"
                            >
                                {isRegister ? "Already have an account? Sign in" : "Don't have an account? Register"}
                            </button>
                        </div>
                    </div>

                    <p className="text-white/20 text-center text-xs mt-6 uppercase tracking-widest">
                        Secure • Encrypted • Private
                    </p>
                </motion.div>
            </section>

            <LuxuryFooter />
        </main>
    );
}
