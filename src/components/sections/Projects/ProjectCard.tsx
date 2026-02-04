import type { ResolvedProject } from "@/data/types";
import { Card } from "@/components/ui/Card";

interface ProjectCardProps {
    project: ResolvedProject;
    onClick: () => void;
    isSelected: boolean;
    viewTransitionName?: string;
    activeImageIndex: number;
}

export function ProjectCard({ project, onClick, isSelected, viewTransitionName, activeImageIndex }: ProjectCardProps) {
    // Determine which image to show based on the propagated state
    // Default to the first image if the index is out of bounds or images array is empty
    const displayImage = project.images && project.images[activeImageIndex] ? project.images[activeImageIndex] : null;

    return (
        <Card
            className="group cursor-pointer hover:border-primary-500/30 active:scale-[0.98] h-full flex flex-col justify-between p-4 relative hover:z-30 transition-all duration-300"
            onClick={onClick}
            style={viewTransitionName ? ({ viewTransitionName } as React.CSSProperties) : undefined}
        >
            <div className={!isSelected ? "contents" : "opacity-0"}>
                <div className="flex flex-col gap-6">
                    {/* Preview Area */}
                    <div
                        className="aspect-[16/9] w-full bg-ndark-900/50 rounded-lg flex items-center justify-center border border-nlight-200/5 overflow-hidden relative"
                        style={
                            viewTransitionName
                                ? ({ viewTransitionName: `${viewTransitionName}-image` } as React.CSSProperties)
                                : undefined
                        }
                    >
                        {/* Placeholder content - use active image if available, else gradient/fallback */}
                        {displayImage ? (
                            <div className="absolute inset-0">
                                <img
                                    loading="lazy"
                                    src={displayImage}
                                    alt=""
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ndark-900/80 to-transparent opacity-60" />
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-transparent group-hover:opacity-100 transition-opacity" />
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-2xl font-bold text-nlight-100 group-hover:text-primary-400 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-nlight-300 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap mt-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-mono text-primary-400 bg-primary-900/10 border border-primary-500/20 rounded-md transition-colors hover:bg-primary-900/20 hover:border-primary-500/30"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </Card>
    );
}
