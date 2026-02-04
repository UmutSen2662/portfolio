import type { Poly } from "@/lib/localization";

export type Language = "en" | "tr";

export interface ProjectLink {
    url: Poly<string>;
    icon?: "github" | "external";
    labelKey?: string;
}

export interface ResolvedProjectLink {
    url: string;
    icon?: "github" | "external";
}

export interface Project {
    id: string;
    title: Poly<string>;
    description: Poly<string>;
    detailedDescription?: Poly<string>;
    technologies: Poly<string[]>;
    images?: string[];
    links?: Poly<ProjectLink[]>;
}

export interface ResolvedProject {
    id: string;
    title: string;
    description: string;
    detailedDescription?: string;
    technologies: string[];
    images?: string[];
    links?: ResolvedProjectLink[];
}

export interface Experience {
    id: string;
    company: string;
    role: Poly<string>;
    startDate: Poly<string>;
    endDate: Poly<string>;
    description: Poly<string>;
    technologies?: string[];
}

export interface ResolvedExperience {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
    technologies?: string[];
}

export interface Education {
    id: string;
    institution: Poly<string>;
    degree: Poly<string>;
    startDate: Poly<string>;
    endDate: Poly<string>;
    gpa?: Poly<string>;
    location: Poly<string>;
    logo?: string;
    honors?: Poly<string>;
}

export interface ResolvedEducation {
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    location: string;
    logo?: string;
    honors?: string;
}

export interface Hero {
    greeting: Poly<string>;
    title: Poly<string[]>;
    description: Poly<string>;
    location: Poly<string>;
    downloadResume: Poly<string>;
    viewProjects: Poly<string>;
    links: {
        github: string;
        linkedin: string;
        resume: string;
        email: string;
    };
}

export interface ResolvedHero {
    greeting: string;
    title: string[];
    description: string;
    location: string;
    downloadResume: string;
    viewProjects: string;
    links: {
        github: string;
        linkedin: string;
        resume: string;
        email: string;
    };
}
