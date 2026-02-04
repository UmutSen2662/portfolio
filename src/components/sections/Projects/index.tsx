import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { flushSync } from "react-dom";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function Projects() {
    const { t } = useLanguage();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    // Track which project is currently "active" for the transition context (clicked or closing)
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleProjectClick = (id: string) => {
        if (selectedId === id) return;

        // 1. Mark this project as active so it gets the unique view-transition-name.
        // We use flushSync to ensure the DOM updates (applying the name) BEFORE the browser captures the snapshot.
        flushSync(() => {
            setActiveId(id);
        });

        // 2. Start the transition.
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                // 3. Update the state to switch to the modal.
                flushSync(() => {
                    setSelectedId(id);
                });
            });
        } else {
            setSelectedId(id);
        }
    };

    const handleClose = () => {
        // We capture the document transition if available to handle activeId cleanup
        if (document.startViewTransition) {
            const transition = document.startViewTransition(() => {
                flushSync(() => {
                    setSelectedId(null);
                });
            });
            // Clean up the activeId after the close transition finishes
            transition.finished.then(() => setActiveId(null));
        } else {
            // Fallback for no View Transition support
            setSelectedId(null);
            setActiveId(null);
        }
    };

    const selectedProject = PROJECTS.find((p) => p.id === selectedId);

    return (
        <section id="projects" className="flex flex-col pt-6 mt-18 gap-8 relative">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-primary-400">/</span> {t("nav.projects")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => handleProjectClick(project.id)}
                        isSelected={selectedId === project.id}
                        viewTransitionName={
                            activeId === project.id && selectedId !== project.id ? `project-${project.id}` : undefined
                        }
                    />
                ))}
            </div>

            {selectedProject && <ProjectModal project={selectedProject} onClose={handleClose} />}
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
