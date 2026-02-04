import type { Hero } from "./types";

export const HERO: Hero = {
    links: {
        github: "https://github.com/UmutSen2662",
        linkedin: "https://linkedin.com/in/umutsen-dev",
        resume: "https://portfolio.umutsen.dev",
        email: "mailto:umutsen2662@gmail.com",
    },
    greeting: { en: "Hi, I'm Umut", tr: "Merhaba, Ben Umut" },
    title: { en: ["Full-Stack", "Engineer"], tr: ["Full-Stack", "Mühendis"] },
    description: {
        en: "Specializing in React & Node.js | METU High Honors (3.8 GPA)",
        tr: "React & Node.js odaklı | ODTÜ Yüksek Şeref (3.8 GPA)",
    },
    location: { en: "Based in Denizli, Turkey 🇹🇷", tr: "Denizli, Türkiye" },
    downloadResume: { en: "Download Resume", tr: "CV İndir" },
    viewProjects: { en: "View Projects", tr: "Projelerim" },
};
