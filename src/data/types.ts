// Translatable content interfaces
export interface ProjectTranslations {
    title: string;
    description: string;
    detailedDescription?: string;
}

export interface ExperienceTranslations {
    role: string;
    description: string;
    achievements?: string[];
}

export interface EducationTranslations {
    degree: string;
    institution: string;
    location: string;
    honors: string;
}

// Main data interfaces with hybrid structure
export interface Project {
    id: string;
    translations: Record<Language, ProjectTranslations>;
    technologies: string[];
    images?: string[];
    links?: {
        title: string;
        url: string;
        icon?: "github" | "external";
    }[];
}

export interface Experience {
    id: string;
    translations: Record<Language, ExperienceTranslations>;
    company: string;
    startDate: string;
    endDate: string;
    technologies?: string[];
}

export interface Education {
    id: string;
    translations: Record<Language, EducationTranslations>;
    startDate: string;
    endDate: string;
    gpa?: string;
    logo?: string;
}

export interface HeroTranslations {
    greeting: string;
    title: string[];
    description: string;
    location: string;
    downloadResume: string;
    viewProjects: string;
}

export interface Hero {
    links: {
        github: string;
        linkedin: string;
        resume: string;
        email: string;
    };
    translations: Record<Language, HeroTranslations>;
}

export type Language = "en" | "tr";
