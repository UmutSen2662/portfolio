import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/hooks/useData";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
    const { t } = useLanguage();
    const { hero } = useData();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full relative z-40 py-2">
            <div className="max-w-3xl mx-auto px-6 pb-24 sm:pb-4 flex flex-col gap-6">
                {/* Top Row: Status, Language & Links */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        {/* Compact Status */}
                        <div className="flex items-center gap-2 bg-ndark-800/50 px-3 py-1.5 rounded-full border border-ndark-700/50">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-medium text-green-400 tracking-wide">
                                {t("footer.openToWork")}
                            </span>
                        </div>
                    </div>

                    {/* Compact Socials */}
                    <div className="flex items-center gap-6">
                        <a
                            href={hero.links.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-nlight-300 hover:text-primary-400 transition-colors font-medium"
                        >
                            {t("hero.resume")}
                        </a>
                        <a
                            href={hero.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-nlight-300 hover:text-nlight-100 transition-colors font-medium"
                        >
                            GitHub
                        </a>
                        <a
                            href={hero.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-nlight-300 hover:text-blue-400 transition-colors font-medium"
                        >
                            LinkedIn
                        </a>
                        <a
                            href={hero.links.email}
                            className="text-sm text-nlight-300 hover:text-primary-400 transition-colors font-medium"
                        >
                            Email
                        </a>
                    </div>
                </div>

                {/* Bottom Row: Copyright & Tech Centered */}
                <div className="flex justify-center items-center gap-4 text-xs text-nlight-400 opacity-80">
                    <p>© {currentYear} Umut Şen.</p>
                    <p className="hidden sm:block opacity-70">|</p>
                    <p className="opacity-70">
                        {t("footer.builtWith")} <span className="text-nlight-200">React</span> &{" "}
                        <span className="text-primary-400">Tailwind</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
