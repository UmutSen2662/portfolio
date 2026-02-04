import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2">
            {language === "tr" && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguage("en")}
                    className="bg-ndark-800/75 text-nlight-100 hover:bg-ndark-700/75 ring-1 ring-ndark-700"
                >
                    English
                </Button>
            )}
            {language === "en" && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguage("tr")}
                    className="bg-ndark-800/75 text-nlight-100 hover:bg-ndark-700/75 ring-1 ring-ndark-700"
                >
                    Türkçe
                </Button>
            )}
        </div>
    );
}
