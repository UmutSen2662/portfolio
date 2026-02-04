import { useData } from "@/hooks/useData";
import { useLanguage } from "@/context/LanguageContext";
import { EducationCard } from "./EducationCard";

export function Education() {
    const { t } = useLanguage();
    const { education } = useData();

    return (
        <section id="education" className="flex flex-col gap-4 pt-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-primary-400">/</span> {t("nav.education")}
            </h2>

            <div className="flex flex-col gap-4">
                {education.map((edu) => (
                    <EducationCard key={edu.id} education={edu} />
                ))}
            </div>
        </section>
    );
}
