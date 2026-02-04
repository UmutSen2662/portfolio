import { useData } from "@/hooks/useData";
import { useLanguage } from "@/context/LanguageContext";
import { useRef } from "react";
import { ExperienceItem } from "./ExperienceItem";

export function Experience() {
    const { t } = useLanguage();
    const { experience } = useData();
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section id="experience" className="flex flex-col pt-6 mt-18 gap-8" ref={containerRef}>
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-primary-400">/</span> {t("nav.experience")}
            </h2>

            <div className="relative">
                {/* Vertical Line */}
                <div
                    className="absolute left-2 sm:left-[22px] top-2 bottom-6 w-[3px] bg-gradient-to-b from-ndark-600 via-ndark-600 to-transparent"
                    aria-hidden="true"
                />

                <div className="flex flex-col gap-12">
                    {experience.map((exp) => (
                        <ExperienceItem key={exp.id} experience={exp} />
                    ))}
                </div>
            </div>
        </section>
    );
}
