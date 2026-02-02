// Translatable content interfaces
export interface ProjectTranslations {
    title: string;
    description: string;
}

export interface ExperienceTranslations {
    role: string;
    description: string;
    achievements?: string[];
}

export interface EducationTranslations {
    degree: string;
}

// Main data interfaces with hybrid structure
export interface Project {
    id: string;
    translations: Record<Language, ProjectTranslations>;
    technologies: string[];
    repoUrl?: string;
    demoUrl?: string;
    imageUrl?: string;
}

export interface Experience {
    id: string;
    translations: Record<Language, ExperienceTranslations>;
    company: string;
    startDate: string;
    endDate: string;
}

export interface Education {
    id: string;
    translations: Record<Language, EducationTranslations>;
    institution: string;
    startDate: string;
    endDate: string;
}

export type Language = 'en' | 'tr';
