import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
    const { t } = useLanguage();

    return (
        <nav className="p-4 border-b flex justify-between items-center">
            <a href="#hero" className="text-xl font-bold text-emerald-500 hover:text-emerald-600">Umut Şen</a>
            <div className="flex items-center gap-6">
                <ul className="flex gap-4">
                    <li>
                        <a href="#education" className="hover:text-nlight-100">{t('nav.education')}</a>
                    </li>
                    <li>
                        <a href="#experience" className="hover:text-nlight-100">{t('nav.experience')}</a>
                    </li>
                    <li>
                        <a href="#projects" className="hover:text-nlight-100">{t('nav.projects')}</a>
                    </li>
                </ul>
                <LanguageSwitcher />
            </div>
        </nav>
    );
}
