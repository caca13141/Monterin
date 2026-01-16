import Script from 'next/script';

export function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "JewelryStore",
        "name": "Montérin",
        "description": "Haute joaillerie and exceptional diamonds from Montreal. Bespoke jewelry creations and diamond customization.",
        "url": "https://www.monterin.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Montreal",
            "addressRegion": "QC",
            "addressCountry": "CA"
        },
        "priceRange": "$$$",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "By Appointment"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "contact@monterin.com"
        }
    };

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
    );
}
