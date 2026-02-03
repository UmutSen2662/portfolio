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
                    className="bg-ndark-700 text-nlight-100 hover:bg-ndark-600"
                >
                    English
                </Button>
            )}
            {language === "en" && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguage("tr")}
                    className="bg-ndark-700 text-nlight-100 hover:bg-ndark-600"
                >
                    Türkçe
                </Button>
            )}
        </div>
    );
}
