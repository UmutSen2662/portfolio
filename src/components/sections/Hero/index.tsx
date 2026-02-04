import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaFileAlt, FaEnvelope, FaCode } from "react-icons/fa";
import { useCanvas } from "@/context/CanvasContext";
import { useData } from "@/hooks/useData";
import { Button } from "@/components/ui/Button";

export function Hero() {
    const { hero } = useData();
    const { setIsHovering, registerAttractor, unregisterAttractor } = useCanvas();
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (titleRef.current) {
            registerAttractor(titleRef);
        }
        return () => {
            unregisterAttractor(titleRef);
        };
    }, [registerAttractor, unregisterAttractor]);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    return (
        <section
            id="hero"
            className="min-h-[calc(100vh-5rem)] py-20 flex flex-col items-center justify-center text-center gap-6 relative z-10"
        >
            {/* Top: Small Greeting */}
            <p className="text-2xl md:text-3xl text-nlight-200 font-medium tracking-wide">{hero.greeting}</p>

            {/* Middle: Huge H1 (Attractor) */}
            <div className="relative w-fit mx-auto">
                <h1 className="flex flex-col items-center leading-tight">
                    {hero.title.map((line, index) => (
                        <span
                            key={index}
                            className="text-5xl md:text-7xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-nlight-100/90 to-nlight-100/70 pb-4"
                        >
                            {line}
                        </span>
                    ))}
                </h1>
                <div ref={titleRef} className="absolute top-0 left-0 w-full h-full z-[-10]"></div>
            </div>

            {/* Bottom: Medium Subtitle */}
            <p className="text-lg md:text-xl text-nlight-300 max-w-2xl font-light">{hero.description}</p>

            {/* Footer of Hero: Location */}
            <p className="text-base text-nlight-400 opacity-80 mt-2">{hero.location}</p>

            {/* CTAs */}
            <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
                {/* Primary CTA - View Projects (Hover Strategy) */}
                <Button
                    onClick={() => {
                        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    variant="default"
                    size="lg"
                    className="gap-2 active:scale-95"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <FaCode /> {hero.viewProjects}
                </Button>

                {/* Secondary Social Links */}
                <div className="flex gap-6 text-2xl text-nlight-300">
                    <a
                        href={hero.links.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors hover:scale-110 transform duration-200"
                        aria-label="Resume"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FaFileAlt />
                    </a>
                    <a
                        href={hero.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors hover:scale-110 transform duration-200"
                        aria-label="GitHub"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FaGithub />
                    </a>
                    <a
                        href={hero.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors hover:scale-110 transform duration-200"
                        aria-label="LinkedIn"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href={hero.links.email}
                        className="hover:text-white transition-colors hover:scale-110 transform duration-200"
                        aria-label="Email"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FaEnvelope />
                    </a>
                </div>
            </div>
        </section>
    );
}
