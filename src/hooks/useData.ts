import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { resolvePoly } from "@/lib/localization";
import { UI_LABELS } from "@/data/ui";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE } from "@/data/experience";
import { EDUCATION } from "@/data/education";
import { HERO } from "@/data/hero";

export function useData() {
    const { language, t: tLabel } = useLanguage();

    const data = useMemo(() => {
        // Projects Logic
        const projects = PROJECTS.map((project) => {
            const links = resolvePoly(project.links, language);
            const resolvedLinks = links?.map((link) => ({
                ...link,
                title: link.labelKey
                    ? tLabel(link.labelKey as keyof (typeof UI_LABELS)["en"])
                    : resolvePoly(link.title, language),
                url: resolvePoly(link.url, language),
            }));

            return {
                ...project,
                title: resolvePoly(project.title, language),
                description: resolvePoly(project.description, language),
                detailedDescription: project.detailedDescription
                    ? resolvePoly(project.detailedDescription, language)
                    : undefined,
                technologies: resolvePoly(project.technologies, language),
                links: resolvedLinks,
            };
        });

        // Experience Logic
        const experience = EXPERIENCE.map((exp) => ({
            ...exp,
            role: resolvePoly(exp.role, language),
            company: resolvePoly(exp.company, language),
            startDate: resolvePoly(exp.startDate, language),
            endDate: resolvePoly(exp.endDate, language),
            description: resolvePoly(exp.description, language),
        }));

        // Education Logic
        const education = EDUCATION.map((edu) => ({
            ...edu,
            institution: resolvePoly(edu.institution, language),
            degree: resolvePoly(edu.degree, language),
            startDate: resolvePoly(edu.startDate, language),
            endDate: resolvePoly(edu.endDate, language),
            gpa: edu.gpa ? resolvePoly(edu.gpa, language) : undefined,
            location: resolvePoly(edu.location, language),
            honors: edu.honors ? resolvePoly(edu.honors, language) : undefined,
        }));

        // Hero Logic
        const hero = {
            ...HERO,
            greeting: resolvePoly(HERO.greeting, language),
            title: resolvePoly(HERO.title, language),
            description: resolvePoly(HERO.description, language),
            location: resolvePoly(HERO.location, language),
            downloadResume: resolvePoly(HERO.downloadResume, language),
            viewProjects: resolvePoly(HERO.viewProjects, language),
        };

        return { projects, experience, education, hero };
    }, [language, tLabel]);

    return data;
}
