import { useState } from "react";
import { useData } from "@/hooks/useData";
import { useLanguage } from "@/context/LanguageContext";
import { flushSync } from "react-dom";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Projects() {
    const { t } = useLanguage();
    // Use unified hook
    const { projects } = useData();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    // Track which project is currently "active" for the transition context (clicked or closing)
    const [activeId, setActiveId] = useState<string | null>(null);
    // Track the active image index for each project to sync Card and Modal
    const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});
    const [showAll, setShowAll] = useState(false);

    const INITIAL_COUNT = 2;
    const initialProjects = projects.slice(0, INITIAL_COUNT);
    const hiddenProjects = projects.slice(INITIAL_COUNT);

    const handleProjectClick = (id: string) => {
        if (selectedId === id) return;

        // Mark active for transition name assignment before snapshot
        flushSync(() => {
            setActiveId(id);
        });

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                flushSync(() => {
                    setSelectedId(id);
                });
            });
        } else {
            setSelectedId(id);
        }
    };

    const handleClose = () => {
        if (document.startViewTransition) {
            const transition = document.startViewTransition(() => {
                flushSync(() => {
                    setSelectedId(null);
                });
            });
            transition.finished.then(() => setActiveId(null));
        } else {
            setSelectedId(null);
            setActiveId(null);
        }
    };

    const handleImageIndexChange = (projectId: string, index: number) => {
        setActiveImageIndexes((prev) => ({
            ...prev,
            [projectId]: index,
        }));
    };

    const selectedProject = projects.find((p) => p.id === selectedId);

    return (
        <section id="projects" className="flex flex-col pt-6 mt-18 gap-8 relative">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-primary-400">/</span> {t("nav.projects")}
            </h2>

            <div>
                {/* Initial Grid (Always Visible) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {initialProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => handleProjectClick(project.id)}
                            isSelected={selectedId === project.id}
                            viewTransitionName={
                                activeId === project.id && selectedId !== project.id
                                    ? `project-${project.id}`
                                    : undefined
                            }
                            activeImageIndex={activeImageIndexes[project.id] || 0}
                        />
                    ))}
                </div>

                {/* Expandable Grid Wrapper */}
                <div
                    className={cn(
                        "grid transition-[grid-template-rows] duration-500 ease-in-out",
                        showAll ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                >
                    <div className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                            {hiddenProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => handleProjectClick(project.id)}
                                    isSelected={selectedId === project.id}
                                    viewTransitionName={
                                        activeId === project.id && selectedId !== project.id
                                            ? `project-${project.id}`
                                            : undefined
                                    }
                                    activeImageIndex={activeImageIndexes[project.id] || 0}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Show More Button */}
            {projects.length > INITIAL_COUNT && (
                <div className="flex justify-center">
                    <Button variant="outline" onClick={() => setShowAll(!showAll)}>
                        {showAll ? t("projects.showLess") : t("projects.viewMore")}
                    </Button>
                </div>
            )}

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={handleClose}
                    initialImageIndex={activeImageIndexes[selectedProject.id] || 0}
                    onIndexChange={(index) => handleImageIndexChange(selectedProject.id, index)}
                />
            )}
        </section>
    );
}

// Global scope declaration for ViewTransition API if not already present in environment
declare global {
    interface Document {
        startViewTransition(callback: () => void): {
            ready: Promise<void>;
            finished: Promise<void>;
            updateCallbackDone: Promise<void>;
        };
    }
}
