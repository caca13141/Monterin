import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import Link from "next/link";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <LiquidNavbar />

            <div className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="text-4xl md:text-6xl font-serif mb-8">Terms of Service</h1>
                <p className="text-white/40 text-sm mb-12">Last updated: January 2026</p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-serif mb-4">Agreement to Terms</h2>
                        <p className="text-white/70 leading-relaxed">
                            By accessing and using the Montérin website, you accept and agree to be bound
                            by the terms and provision of this agreement. If you do not agree to these terms,
                            please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">Products & Services</h2>
                        <p className="text-white/70 leading-relaxed">
                            All jewelry and services are subject to availability. We reserve the right to
                            limit quantities or refuse service to anyone at our sole discretion. Product
                            descriptions and images are provided for general information and may vary slightly
                            from actual items due to the unique nature of our handcrafted pieces.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">Pricing & Payment</h2>
                        <p className="text-white/70 leading-relaxed mb-4">
                            All prices are quoted in the local currency and are subject to change without notice.
                            We accept the following payment methods:
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                            <li>Bank transfers</li>
                            <li>Credit cards (Visa, Mastercard, American Express)</li>
                            <li>Financing options (subject to approval)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">Custom Orders</h2>
                        <p className="text-white/70 leading-relaxed">
                            Bespoke commissions require a non-refundable deposit. Timeline estimates are
                            provided in good faith but may vary depending on complexity and material availability.
                            Design consultations and revisions are included in the commission fee.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">Returns & Exchanges</h2>
                        <p className="text-white/70 leading-relaxed">
                            Ready-to-wear items may be returned within 14 days of delivery in unworn,
                            original condition. Custom and bespoke pieces are final sale. All returns
                            are subject to inspection and approval.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">Authenticity & Certification</h2>
                        <p className="text-white/70 leading-relaxed">
                            All diamonds and gemstones are certified by independent gemological laboratories.
                            Each piece comes with a certificate of authenticity and detailed specifications.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">Intellectual Property</h2>
                        <p className="text-white/70 leading-relaxed">
                            All content, designs, and imagery on this website are the exclusive property
                            of Montérin and protected by international copyright laws. Unauthorized use
                            is prohibited.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">Contact Information</h2>
                        <p className="text-white/70 leading-relaxed">
                            For questions regarding these terms, please contact us at:
                        </p>
                        <p className="text-white mt-4">
                            <a href="mailto:legal@monterin.com" className="text-primary hover:underline">
                                legal@monterin.com
                            </a>
                        </p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex gap-6">
                    <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">
                        Contact Us
                    </Link>
                </div>
            </div>

            <LuxuryFooter />
        </main>
    );
}
