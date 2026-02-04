import type { ResolvedExperience } from "@/data/types";

interface ExperienceItemProps {
    experience: ResolvedExperience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
    return (
        <div className="relative pl-10 sm:pl-16 group">
            {/* Timeline Node */}
            <div className="absolute left-[3.5px] sm:left-[16.5px] top-2 z-10">
                <div className="w-3 h-3 rounded-full bg-ndark-900 border-3 border-ndark-600 transition-colors duration-300 group-hover:border-primary-400 group-hover:bg-primary-900/50" />
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold text-primary-400">{experience.company}</h3>
                        <h4 className="text-lg font-bold text-nlight-100">{experience.role}</h4>
                    </div>

                    <div className="self-start text-xs font-mono text-nlight-300 bg-ndark-800/80 border border-ndark-700 rounded px-3 py-1.5 whitespace-nowrap">
                        {experience.startDate} - {experience.endDate}
                    </div>
                </div>

                <div className="text-nlight-300 text-base leading-relaxed max-w-2xl">
                    <p>{experience.description}</p>

                    {experience.technologies && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {experience.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2.5 py-1 text-xs font-mono text-primary-400 bg-primary-900/10 border border-primary-500/20 rounded-md transition-colors hover:bg-primary-900/20 hover:border-primary-500/30"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
