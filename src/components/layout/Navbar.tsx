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
        <nav className="w-full relative z-50">
            {/* Main Navbar Content */}
            <div className="flex justify-between items-center p-4">
                <p className="text-2xl font-bold text-nlight-100 tracking-wide">Umut Şen</p>

                <div className="flex items-center gap-8">
                    <ul className="hidden sm:flex items-center gap-8">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => {
                                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="group flex items-center text-nlight-300 hover:text-nlight-100 transition-colors cursor-pointer relative"
                                >
                                    <span className="text-primary-400 font-bold absolute -left-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        /
                                    </span>
                                    {t(item.label)}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <LanguageSwitcher />
                </div>
            </div>

            {/* Gradient Divider Line */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-nlight-200/25 to-transparent" />
        </nav>
    );
}
