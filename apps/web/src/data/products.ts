export interface Product {
    id: string;
    slug: string;
    name: string;
    price: string;
    description: string;
    details: string[];
    image: string;
    video: string; // Background video for hero
    modelPath: string; // Path to .glb/.gltf file
}

export const products: Product[] = [
    {
        id: "1",
        slug: "solitaire-sovereign",
        name: "The Sovereign Solitaire",
        price: "Price upon request",
        description: "A testament to absolute purity. The Sovereign Solitaire features a 3-carat D-Flawless diamond, set in platinum to maximize light return.",
        details: [
            "3.00 Carat Round Brilliant",
            "Color: D (Colorless)",
            "Clarity: Flawless",
            "Platinum 950 Setting"
        ],
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop",
        video: "https://cdn.coverr.co/videos/coverr-diamond-ring-macro-shot-2813/1080p.mp4",
        modelPath: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb"
    },
    {
        id: "2",
        slug: "eternal-band",
        name: "Eternal Eternity Band",
        price: "$12,500",
        description: "An unbroken circle of brilliance. Perfectly matched emerald-cut diamonds encircle the finger, symbolizing unending commitment.",
        details: [
            "Total Weight: 4.5 Carats",
            "Emerald Cut Diamonds",
            "Color: E-F",
            "Clarity: VVS",
            "18k White Gold"
        ],
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
        video: "https://cdn.coverr.co/videos/coverr-diamond-reflection-4560/1080p.mp4",
        modelPath: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb"
    },
    {
        id: "3",
        slug: "celestial-pendant",
        name: "Celestial Pendant",
        price: "$8,900",
        description: "Inspired by the northern star. A single pear-shaped diamond suspended in a delicate halo of micropavé.",
        details: [
            "1.5 Carat Pear Shape",
            "Halo: 0.5 Carat Total",
            "18k Rose Gold Chain",
            "Adjustable Length"
        ],
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2070&auto=format&fit=crop",
        video: "https://cdn.coverr.co/videos/coverr-jewelry-macro-video-4566/1080p.mp4",
        modelPath: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb"
    },
    {
        id: "4",
        slug: "royal-sapphire",
        name: "Royal Sapphire Halo",
        price: "$24,000",
        description: "A deep velvet blue sapphire of exceptional origin, surrounded by a constellation of marquise diamonds.",
        details: [
            "4.00 Carat Blue Sapphire",
            "Origin: Sri Lanka (Ceylon)",
            "Side Stones: 1.2 Carats",
            "Platinum Setting"
        ],
        image: "https://images.unsplash.com/photo-1603561596112-0a132908c1a5?q=80&w=2070&auto=format&fit=crop",
        video: "https://cdn.coverr.co/videos/coverr-blue-diamond-ring-4559/1080p.mp4",
        modelPath: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb"
    },
    {
        id: "5",
        slug: "luminary-earrings",
        name: "Luminary Drop Earrings",
        price: "$18,500",
        description: "Cascading light. These articulated drop earrings feature graduated round brilliant diamonds that catch light with every movement.",
        details: [
            "Total Weight: 3.8 Carats",
            "Graduated Design",
            "Secure Lever Backs",
            "18k Yellow Gold"
        ],
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop",
        video: "https://cdn.coverr.co/videos/coverr-luxury-earrings-display-4564/1080p.mp4",
        modelPath: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb"
    }
];
