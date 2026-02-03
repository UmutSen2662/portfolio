import { EDUCATION } from "@/data/education";
import { useLanguage } from "@/context/LanguageContext";
import { EducationCard } from "./EducationCard";

export function Education() {
    const { t } = useLanguage();

    return (
        <section id="education" className="flex flex-col gap-4 pt-12">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-primary-400">/</span> {t("nav.education")}
            </h2>

            <div className="flex flex-col gap-4">
                {EDUCATION.map((edu) => (
                    <EducationCard key={edu.id} education={edu} />
                ))}
            </div>
        </section>
    );
}
