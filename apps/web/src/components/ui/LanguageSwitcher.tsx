"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'fr' : 'en');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white transition-colors text-xs uppercase tracking-widest"
            aria-label="Switch language"
        >
            <Globe size={16} strokeWidth={1} />
            <span>{language === 'en' ? 'FR' : 'EN'}</span>
        </button>
    );
}
