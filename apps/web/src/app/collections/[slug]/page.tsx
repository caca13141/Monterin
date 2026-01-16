import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Product3DViewer } from "@/components/collections/Product3DViewer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#000000] text-white selection:bg-white/20 selection:text-white">
            <div className="fixed top-0 left-0 w-full z-50">
                <LiquidNavbar />
            </div>

            {/* Sticky Back Button - Subtle */}
            <div className="fixed top-24 left-6 z-40 mix-blend-difference opacity-0 animate-[fadeIn_1s_2s_forwards]">
                <Link href="/collections" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-[10px] uppercase tracking-[0.2em] group">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back
                </Link>
            </div>

            {/* 1. Cinematic Video Hero */}
            <section className="relative w-screen h-screen overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                >
                    <source src={product.video} type="video/mp4" />
                </video>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-6">
                    <span className="text-white text-xs uppercase tracking-[0.4em] mb-6 opacity-0 animate-[fadeInUp_1s_0.5s_forwards]">
                        The Collection
                    </span>
                    <h1 className="text-5xl md:text-8xl font-serif text-white tracking-wide mb-8 opacity-0 translate-y-8 animate-[fadeInUp_1s_0.8s_forwards]">
                        {product.name}
                    </h1>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeIn_1s_2s_forwards]">
                    <span className="text-white/60 text-[10px] uppercase tracking-widest">Discover</span>
                    <div className="w-[1px] h-12 bg-white/40" />
                </div>
            </section>

            {/* 2. Editorial Reveal Section */}
            <section className="py-32 md:py-48 px-6 bg-black overflow-hidden relative">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="w-px h-24 bg-white/10 mx-auto mb-12" />
                    <p className="font-serif text-2xl md:text-4xl text-white/90 leading-relaxed md:leading-normal">
                        {product.description}
                    </p>
                    <div className="w-px h-24 bg-white/10 mx-auto mt-12" />

                    <div className="mt-16 flex flex-col items-center gap-2">
                        <span className="text-xs uppercase tracking-widest text-[#D4Af37] font-semibold">{product.price}</span>
                        <Link
                            href="/appointments"
                            className="mt-6 px-12 py-4 border border-white/20 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 text-white"
                        >
                            Acquire This Piece
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3. Immersive Layout Grid */}
            <section className="w-full bg-[#050505] py-32 border-t border-white/5">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

                    {/* Left: Close-up Detail (Static Image) */}
                    <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden group">
                        <Image
                            src={product.image}
                            alt="Detail View"
                            fill
                            className="object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-90"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
                        <div className="absolute bottom-8 left-8">
                            <span className="block text-white text-xs uppercase tracking-widest">Close-up Detail</span>
                        </div>
                    </div>

                    {/* Right: Technical Specifications & Story */}
                    <div className="md:px-12">
                        <h3 className="font-serif text-3xl md:text-4xl mb-8 text-white">Savoir-Faire</h3>
                        <div className="space-y-6 text-neutral-400 leading-relaxed">
                            <p>
                                Crafted in our Montreal atelier, this piece represents the pinnacle of jewelry making.
                                Each stone is hand-selected for its exceptional fire and brilliance, paying homage to
                                the rich heritage of European craftsmanship.
                            </p>
                            <ul className="grid grid-cols-1 gap-4 pt-6 border-t border-white/10">
                                {product.details.map((detail, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm tracking-wide uppercase text-neutral-300">
                                        <span className="w-1.5 h-1.5 bg-[#D4Af37] rounded-full" />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. The Interactive Experience (3D Viewer) */}
            <section className="w-full h-screen bg-black relative flex items-center justify-center overflow-hidden">
                <div className="absolute top-12 left-0 w-full text-center z-10 pointer-events-none">
                    <span className="text-white/40 text-xs uppercase tracking-[0.4em]">Interactive View</span>
                    <h2 className="text-white font-serif text-3xl mt-4">360° Perspective</h2>
                </div>

                <div className="w-full h-full max-w-5xl mx-auto md:p-12">
                    <Product3DViewer modelPath={product.modelPath} autoRotate={true} />
                </div>

                {/* Decorative Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
            </section>

            <LuxuryFooter />
        </main>
    );
}
