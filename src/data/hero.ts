import type { Hero } from "./types";

export const HERO: Hero = {
    links: {
        github: "https://github.com/UmutSen2662",
        linkedin: "https://linkedin.com/in/umutsen-dev",
        resume: { en: "/resume-en.pdf", tr: "/resume-tr.pdf" },
        email: "mailto:umutsen2662@gmail.com",
    },
    resumeDownloadName: {
        en: "Umut Şen Resume.pdf",
        tr: "Umut Şen CV.pdf",
    },
    greeting: { en: "Hi, I'm Umut", tr: "Merhaba, Ben Umut" },
    title: { en: ["Full-Stack", "Engineer"], tr: ["Full-Stack", "Mühendis"] },
    description: {
        en: "Specializing in React & Node.js | METU High Honors (3.86 GPA)",
        tr: "React & Node.js odaklı | ODTÜ Yüksek Şeref (3.86 GPA)",
    },
    location: { en: "Based in Denizli, Turkey 🇹🇷", tr: "Denizli, Türkiye" },
    downloadResume: { en: "Download Resume", tr: "CV İndir" },
    viewProjects: { en: "View Projects", tr: "Projelerim" },
};
