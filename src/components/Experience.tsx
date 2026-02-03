import { EXPERIENCE } from "@/data/experience";
import { useLanguage } from "@/context/LanguageContext";
import { useRef } from "react";

export function Experience() {
    const { language, t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section id="experience" className="flex flex-col pt-12 gap-8" ref={containerRef}>
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-primary-400">/</span> {t("nav.experience")}
            </h2>

            <div className="relative pl-4 sm:pl-0">
                {/* Vertical Line */}
                <div
                    className="absolute left-2 sm:left-[22px] top-2 bottom-6 w-[3px] bg-gradient-to-b from-ndark-600 via-ndark-600 to-transparent"
                    aria-hidden="true"
                />

                <div className="flex flex-col gap-12">
                    {EXPERIENCE.map((exp) => (
                        <div key={exp.id} className="relative pl-10 sm:pl-16 group">
                            {/* Timeline Node */}
                            <div className="absolute left-[3.5px] sm:left-[16.5px] top-2 z-10">
                                <div className="w-3 h-3 rounded-full bg-ndark-900 border-3 border-ndark-600 transition-colors duration-300 group-hover:border-primary-400 group-hover:bg-primary-900/50" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-xl font-bold text-primary-400">{exp.company}</h3>
                                        <h4 className="text-lg font-bold text-nlight-100">
                                            {exp.translations[language].role}
                                        </h4>
                                    </div>

                                    <div className="self-start text-xs font-mono text-nlight-300 bg-ndark-800/80 border border-ndark-700 rounded px-3 py-1.5 whitespace-nowrap">
                                        {exp.startDate} - {exp.endDate}
                                    </div>
                                </div>

                                <div className="text-nlight-300 text-base leading-relaxed max-w-2xl">
                                    <p>{exp.translations[language].description}</p>

                                    {exp.translations[language].achievements && (
                                        <ul className="mt-3 flex flex-col gap-1 list-disc list-inside text-sm text-nlight-400 marker:text-primary-500/70">
                                            {exp.translations[language].achievements?.map((achievement, i) => (
                                                <li key={i}>{achievement}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {exp.technologies && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {exp.technologies.map((tech) => (
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
                    ))}
                </div>
            </div>
        </section>
    );
}
