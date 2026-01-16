import { LiquidNavbar } from "@/components/layout/LiquidNavbar";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <LiquidNavbar />

            <div className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="text-4xl md:text-6xl font-serif mb-8">Privacy Policy</h1>
                <p className="text-white/40 text-sm mb-12">Last updated: January 2026</p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-serif mb-4">Introduction</h2>
                        <p className="text-white/70 leading-relaxed">
                            At Montérin, we are committed to protecting your privacy and ensuring the security
                            of your personal information. This Privacy Policy explains how we collect, use, and
                            safeguard your data when you visit our website or engage with our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">Information We Collect</h2>
                        <p className="text-white/70 leading-relaxed mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                            <li>Name, email address, and contact details</li>
                            <li>Shipping and billing information</li>
                            <li>Communication preferences</li>
                            <li>Purchase history and product preferences</li>
                            <li>Information provided in custom design consultations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">How We Use Your Information</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                            <li>Processing and fulfilling your orders</li>
                            <li>Communicating about products, services, and promotions</li>
                            <li>Providing customer support</li>
                            <li>Improving our website and services</li>
                            <li>Personalizing your experience</li>
                            <li>Complying with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">Data Security</h2>
                        <p className="text-white/70 leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your
                            personal information against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">Your Rights</h2>
                        <p className="text-white/70 leading-relaxed mb-4">
                            Under applicable data protection laws, you have the right to:
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to processing of your data</li>
                            <li>Data portability</li>
                            <li>Withdraw consent</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-4">Contact Us</h2>
                        <p className="text-white/70 leading-relaxed">
                            If you have any questions about this Privacy Policy or our data practices,
                            please contact us at:
                        </p>
                        <p className="text-white mt-4">
                            <a href="mailto:privacy@monterin.com" className="text-primary hover:underline">
                                privacy@monterin.com
                            </a>
                        </p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex gap-6">
                    <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                        Terms of Service
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
