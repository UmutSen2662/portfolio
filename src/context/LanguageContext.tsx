import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { UI_LABELS } from '@/data/ui';
import type { Language } from '@/lib/types';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof UI_LABELS['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'tr')) {
            setLanguage(savedLang);
        } else {
            const browserLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
            setLanguage(browserLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: keyof typeof UI_LABELS['en']) => {
        return UI_LABELS[language][key] || UI_LABELS['en'][key];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
