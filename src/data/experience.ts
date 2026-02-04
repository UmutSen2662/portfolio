import type { Experience } from "./types";

export const EXPERIENCE: Experience[] = [
    {
        id: "orion-innovation",
        role: { en: "Backend Developer Intern", tr: "Backend Geliştirici Stajyeri" },
        startDate: { en: "Jul 2025", tr: "Tem 2025" },
        endDate: { en: "Aug 2025", tr: "Ağu 2025" },
        description: {
            en: "Worked as part of an 18-person team on a large-scale enterprise platform. Contributed to backend services using Java Spring Boot, including implementing transactional audit logging and AOP performance optimizations. Gained valuable experience with professional CI/CD pipelines and Agile workflows.",
            tr: "18 kişilik bir ekibin parçası olarak büyük ölçekli bir kurumsal platform üzerinde çalıştım. Java Spring Boot kullanarak backend servislerine katkıda bulundum, işlemsel denetim kaydı (transactional audit logging) ve AOP performans optimizasyonları gerçekleştirdim. Profesyonel CI/CD süreçleri ve Agile iş akışları konusunda değerli deneyimler kazandım.",
        },
        company: "Orion Innovation",
        technologies: ["Java Spring Boot", "PostgreSQL", "Hibernate/JPA", "Maven", "Swagger"],
    },
    {
        id: "3d-probox",
        role: { en: "Full-Stack Developer Intern", tr: "Full-Stack Geliştirici Stajyeri" },
        startDate: { en: "Jun 2024", tr: "Haz 2024" },
        endDate: { en: "Aug 2024", tr: "Ağu 2024" },
        description: {
            en: "Developed custom Framer and Webflow Plugins to enable no-code embedding of 3D models. Integrated Supabase for data caching to reduce main server load and implemented fuzzy search logic for real-time model retrieval.",
            tr: "3D modellerin kodsuz entegrasyonunu sağlamak için özel Framer ve Webflow eklentileri geliştirdim. Ana sunucu yükünü azaltmak amacıyla veri önbellekleme için Supabase entegrasyonu yaptım ve gerçek zamanlı model alımı için fuzzy arama mantığı uyguladım.",
        },
        company: "3D ProBox",
        technologies: ["React", "Svelte", "Supabase", "Framer API", "Webflow API"],
    },
];
