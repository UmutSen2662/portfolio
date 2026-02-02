import { FaGithub, FaLinkedin, FaFileAlt, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { useCanvas } from "../context/CanvasContext";
import { HERO } from "../data/hero";

export function Hero() {
    const { language } = useLanguage();
    const { setIsHovering } = useCanvas();

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    return (
        <section id="hero" className="py-12 flex flex-col items-center gap-4">
            <h2 className="text-4xl font-bold">{HERO.translations[language].title}</h2>
            <h3 className="text-xl">{HERO.translations[language].description}</h3>
            <div className="flex gap-4 text-lg">
                <a
                    href={HERO.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-nlight-100"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <FaGithub /> GitHub
                </a>
                <a
                    href={HERO.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-nlight-100"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <FaLinkedin /> LinkedIn
                </a>
                <a
                    href={HERO.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-nlight-100"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <FaFileAlt /> Resume
                </a>
                <a
                    href={HERO.links.email}
                    className="flex items-center gap-2 hover:text-nlight-100"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <FaEnvelope /> Email
                </a>
            </div>
        </section>
    );
}
