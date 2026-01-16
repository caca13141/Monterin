import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <div className="max-w-2xl text-center">
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto mb-8 bg-white/5 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/10 rotate-45"></div>
                    </div>

                    <h1 className="text-8xl font-serif mb-4">404</h1>
                    <h2 className="text-2xl md:text-4xl font-serif mb-6 tracking-wide">
                        Page Not Found
                    </h2>
                    <p className="text-white/60 mb-12 max-w-md mx-auto">
                        The page you're looking for has been moved, deleted,
                        or perhaps never existed. Like a perfect diamond, some things are rare to find.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-4 bg-white text-black uppercase text-xs tracking-widest hover:bg-primary transition-colors inline-block"
                    >
                        Return Home
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-4 border border-white/20 text-white uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors inline-block"
                    >
                        Contact Us
                    </Link>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10">
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                        Quick Links
                    </p>
                    <div className="flex flex-wrap gap-6 justify-center text-sm">
                        <Link href="/maison" className="text-white/60 hover:text-white transition-colors">
                            Maison
                        </Link>
                        <Link href="/collections" className="text-white/60 hover:text-white transition-colors">
                            Collections
                        </Link>
                        <Link href="/forge" className="text-white/60 hover:text-white transition-colors">
                            The Atelier
                        </Link>
                        <Link href="/origins" className="text-white/60 hover:text-white transition-colors">
                            Origins
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
