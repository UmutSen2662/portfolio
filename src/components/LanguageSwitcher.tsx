import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <>
            <button
                onClick={() => setLanguage('en')}
                className={cn(
                    "px-3 py-1 rounded text-sm cursor-pointer",
                    language === 'en'
                        ? 'hidden'
                        : 'bg-ndark-700 text-nlight-100 hover:bg-ndark-600'
                )}
            >
                English
            </button>
            <button
                onClick={() => setLanguage('tr')}
                className={cn(
                    "px-3 py-1 rounded text-sm cursor-pointer",
                    language === 'tr'
                        ? 'hidden'
                        : 'bg-ndark-700 text-nlight-100 hover:bg-ndark-600'
                )}
            >
                Türkçe
            </button>
        </>
    );
}
