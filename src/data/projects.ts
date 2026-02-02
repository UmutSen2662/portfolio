import type { Project } from "@/lib/types";

export const PROJECTS: Project[] = [
    {
        id: "portfolio",
        translations: {
            en: {
                title: "Portfolio Website",
                description: "My personal portfolio built with React, TypeScript, and Tailwind CSS.",
            },
            tr: {
                title: "Portfolyo Sitesi",
                description: "React, TypeScript ve Tailwind CSS ile yapılmış kişisel portfolyo sitem.",
            }
        },
        technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
        repoUrl: "https://github.com/myusername/portfolio",
        demoUrl: "https://myportfolio.com",
        imageUrl: ""
    },
    {
        id: "ecommerce-dashboard",
        translations: {
            en: {
                title: "E-commerce Dashboard",
                description: "An admin dashboard for managing products and orders.",
            },
            tr: {
                title: "E-ticaret Paneli",
                description: "Ürün ve sipariş yönetimi için bir admin paneli.",
            }
        },
        technologies: ["Next.js", "Prisma", "PostgreSQL"],
        repoUrl: "https://github.com/myusername/ecommerce-dashboard",
    }
];
