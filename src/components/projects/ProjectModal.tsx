import type { Project } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { FaTimes } from "react-icons/fa";

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const { language } = useLanguage();
    const t = project.translations[language];

    // Use placeholder gradients if no images
    const carouselImages =
        project.images && project.images.length > 0
            ? project.images
            : [
                  "bg-gradient-to-br from-ndark-800 to-ndark-700",
                  "bg-gradient-to-bl from-ndark-700 to-ndark-800",
                  "bg-gradient-to-tr from-ndark-800 to-ndark-900",
              ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm transition-all duration-300"
            onClick={onClose}
        >
            <div
                className="w-full max-w-3xl max-h-[90dvh] h-[90dvh] bg-ndark-900 rounded-2xl border border-nlight-200/10 shadow-2xl overflow-hidden flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
                style={{ viewTransitionName: `project-${project.id}` } as React.CSSProperties}
            >
                <div className="absolute top-4 right-4 z-50">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-md"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="shrink-0 aspect-[16/9] w-full relative overflow-hidden bg-ndark-950">
                    {/* CSS-only Carousel */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory h-full w-full scrollbar-none">
                        {carouselImages.map((imgClass, idx) => (
                            <div
                                key={idx}
                                className={`snap-center shrink-0 w-full h-full flex items-center justify-center ${imgClass.startsWith("bg-") ? imgClass : ""} relative`}
                            >
                                {!imgClass.startsWith("bg-") && (
                                    <img src={imgClass} alt="" className="w-full h-full object-cover" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto bg-ndark-900">
                    <div className="p-8 flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <h3 className="text-3xl font-bold text-nlight-100">{t.title}</h3>

                                {/* Dynamic Links - Right Aligned, Horizontal, Simple Text */}
                                {project.links && project.links.length > 0 && (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        {project.links.map((link) => (
                                            <a
                                                key={link.title}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-nlight-400 hover:text-primary-400 font-medium transition-colors text-sm hover:underline underline-offset-4"
                                            >
                                                {link.title}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 text-xs font-mono text-primary-400 bg-primary-900/10 border border-primary-500/20 rounded-md transition-colors hover:bg-primary-900/20 hover:border-primary-500/30"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none text-nlight-200">
                            <p className="text-lg leading-relaxed">{t.detailedDescription || t.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
