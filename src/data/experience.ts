import type { Experience } from "@/lib/types";

export const EXPERIENCE: Experience[] = [
    {
        id: "tech-corp-frontend",
        translations: {
            en: {
                role: "Frontend Developer",
                description: "Building responsive web applications using React and TypeScript.",
                achievements: [
                    "Optimized performance, reducing load time by 30%.",
                    "Collaborated with UX designers to implement new features."
                ]
            },
            tr: {
                role: "Frontend Geliştirici",
                description: "React ve TypeScript kullanarak duyarlı web uygulamaları geliştirme.",
                achievements: [
                    "Performansı optimize ederek yükleme süresini %30 azalttı.",
                    "Yeni özellikler uygulamak için UX tasarımcılarıyla işbirliği yaptı."
                ]
            }
        },
        company: "Tech Corp",
        startDate: "Jan 2023",
        endDate: "Present"
    },
    {
        id: "startup-inc-intern",
        translations: {
            en: {
                role: "Intern",
                description: "Assisted in backend development with Node.js.",
                achievements: [
                    "Built a REST API for user authentication."
                ]
            },
            tr: {
                role: "Stajyer",
                description: "Node.js ile backend geliştirmeye yardımcı oldu.",
                achievements: [
                    "Kullanıcı kimlik doğrulaması için bir REST API oluşturdu."
                ]
            }
        },
        company: "Startup Inc",
        startDate: "Jun 2022",
        endDate: "Aug 2022"
    }
];
