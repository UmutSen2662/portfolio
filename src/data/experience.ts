import type { Experience } from "./types";

export const EXPERIENCE: Experience[] = [
    {
        id: "orion-innovation",
        translations: {
            en: {
                role: "Backend Developer Intern",
                description:
                    "Worked as part of an 18-person team on a large-scale enterprise platform. Contributed to backend services using Java Spring Boot, including implementing transactional audit logging and AOP performance optimizations. Gained valuable experience with professional CI/CD pipelines and Agile workflows.",
            },
            tr: {
                role: "Backend Geliştirici Stajyeri",
                description:
                    "18 kişilik bir ekibin parçası olarak büyük ölçekli bir kurumsal platform üzerinde çalıştım. Java Spring Boot kullanarak backend servislerine katkıda bulundum, işlemsel denetim kaydı (transactional audit logging) ve AOP performans optimizasyonları gerçekleştirdim. Profesyonel CI/CD süreçleri ve Agile iş akışları konusunda değerli deneyimler kazandım.",
            },
        },
        company: "Orion Innovation",
        startDate: "Jul 2025",
        endDate: "Aug 2025",
        technologies: ["Java Spring Boot", "PostgreSQL", "Hibernate/JPA", "Maven", "Swagger"],
    },
    {
        id: "3d-probox",
        translations: {
            en: {
                role: "Full-Stack Developer Intern",
                description:
                    "Developed custom Framer and Webflow Plugins to enable no-code embedding of 3D models. Integrated Supabase for data caching to reduce main server load and implemented fuzzy search logic for real-time model retrieval.",
            },
            tr: {
                role: "Full-Stack Geliştirici Stajyeri",
                description:
                    "3D modellerin kodsuz entegrasyonunu sağlamak için özel Framer ve Webflow eklentileri geliştirdim. Ana sunucu yükünü azaltmak amacıyla veri önbellekleme için Supabase entegrasyonu yaptım ve gerçek zamanlı model alımı için fuzzy arama mantığı uyguladım.",
            },
        },
        company: "3D ProBox",
        startDate: "Jun 2024",
        endDate: "Aug 2024",
        technologies: ["React", "Svelte", "Supabase", "Framer API", "Webflow API"],
    },
];
