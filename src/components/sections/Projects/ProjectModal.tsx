import { useEffect, useCallback, useState } from "react";
import type { Project } from "@/data/types";
import { useLanguage } from "@/context/LanguageContext";
import { FaExternalLinkAlt, FaGithub, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import useEmblaCarousel from "embla-carousel-react";

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
    initialImageIndex: number;
    onIndexChange: (index: number) => void;
}

export function ProjectModal({ project, onClose, initialImageIndex, onIndexChange }: ProjectModalProps) {
    const { language } = useLanguage();
    const t = project.translations[language];

    // Capture mount index to prevent Embla re-initialization on parent updates
    const [mountIndex] = useState(initialImageIndex);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "center",
        containScroll: "trimSnaps",
        startIndex: mountIndex,
    });

    // Prevent background scrolling
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    // Sync Embla state with parent
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        const index = emblaApi.selectedScrollSnap();
        onIndexChange(index);
    }, [emblaApi, onIndexChange]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    const carouselImages =
        project.images && project.images.length > 0
            ? project.images
            : [
                  "bg-gradient-to-br from-ndark-800 to-ndark-700",
                  "bg-gradient-to-bl from-ndark-700 to-ndark-800",
                  "bg-gradient-to-tr from-ndark-800 to-ndark-900",
              ];

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

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
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-black/40 text-white hover:bg-black/60 hover:text-white backdrop-blur-md"
                    >
                        <FaTimes size={20} />
                    </Button>
                </div>

                <div className="shrink-0 aspect-[16/9] w-full relative overflow-hidden bg-ndark-950 group/carousel">
                    <div className="overflow-hidden h-full" ref={emblaRef}>
                        <div className="flex touch-pan-y h-full">
                            {carouselImages.map((imgClass, idx) => (
                                <div
                                    key={idx}
                                    className={`shrink-0 flex-[0_0_100%] min-w-0 w-full h-full flex items-center justify-center ${imgClass.startsWith("bg-") ? imgClass : ""} relative`}
                                    style={
                                        idx === initialImageIndex
                                            ? ({
                                                  viewTransitionName: `project-${project.id}-image`,
                                              } as React.CSSProperties)
                                            : undefined
                                    }
                                >
                                    {!imgClass.startsWith("bg-") && (
                                        <img
                                            loading="lazy"
                                            src={imgClass}
                                            alt=""
                                            className="w-full h-full object-cover select-none"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {carouselImages.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    scrollPrev();
                                }}
                                disabled={initialImageIndex === 0}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white backdrop-blur-sm transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed"
                                aria-label="Previous image"
                            >
                                <FaChevronLeft size={20} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    scrollNext();
                                }}
                                disabled={initialImageIndex === carouselImages.length - 1}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white backdrop-blur-sm transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed"
                                aria-label="Next image"
                            >
                                <FaChevronRight size={20} />
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-full bg-black/20 backdrop-blur-sm z-10">
                                {carouselImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            scrollTo(idx);
                                        }}
                                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                            idx === initialImageIndex
                                                ? "bg-primary-500"
                                                : "bg-white/30 hover:bg-white/50"
                                        }`}
                                        aria-label={`Go to image ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
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
                                                className="text-nlight-200 hover:text-nlight-100 flex items-center gap-2"
                                            >
                                                <span className="hover:underline">{link.title}</span>
                                                {link.icon == "github" && <FaGithub size={20} />}
                                                {link.icon == "external" && <FaExternalLinkAlt size={18} />}
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
