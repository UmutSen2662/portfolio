import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
    const { t } = useLanguage();

    const navItems = [
        { id: "education", label: "nav.education" },
        { id: "experience", label: "nav.experience" },
        { id: "projects", label: "nav.projects" },
    ];

    return (
        <nav className="p-4 pt-6 border-b flex justify-between items-center">
            <p className="text-2xl font-bold">Umut Şen</p>
            <div className="flex items-center gap-6">
                <ul className="hidden sm:flex gap-4">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => {
                                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="hover:text-nlight-100 transition-colors cursor-pointer"
                            >
                                {t(item.label)}
                            </button>
                        </li>
                    ))}
                </ul>
                <LanguageSwitcher />
            </div>
        </nav>
    );
}
