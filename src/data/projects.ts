import type { Project } from "./types";

export const PROJECTS: Project[] = [
    {
        id: "bare-metal-paas",
        title: "Bare Metal PaaS",
        description: {
            en: "A high-performance, self-hosted deployment platform that orchestrates native Linux processes, eliminating container overhead.",
            tr: "Konteyner ek yükünü ortadan kaldıran, yerel Linux süreçlerini yöneten, yüksek performanslı ve kendi sunucunuzda barındırılan dağıtım platformu.",
        },
        detailedDescription: {
            en: "This platform automates the entire application lifecycle directly on the host OS, managing Git deployments, Systemd services, and Caddy reverse proxy configurations in real-time. It enforces strict security isolation by generating dedicated Linux users for each application and supports a wide range of runtimes including Node.js, Python, Go, and static sites. The system features built-in CI/CD webhooks, zero-downtime updates, and a modern React 19 dashboard for monitoring system health and application logs.",
            tr: "Bu platform, Git dağıtımlarını, Systemd servislerini ve Caddy ters proxy yapılandırmalarını gerçek zamanlı olarak yöneterek uygulama yaşam döngüsünü doğrudan ana işletim sistemi üzerinde otomatikleştirir. Her uygulama için özel Linux kullanıcıları oluşturarak sıkı güvenlik izolasyonu sağlar ve Node.js, Python, Go ve statik siteler dahil olmak üzere geniş bir çalışma zamanı yelpazesini destekler. Sistem, yerleşik CI/CD webhook'ları, sıfır kesintili güncellemeler ve sistem sağlığı ile uygulama loglarını izlemek için modern bir React 19 paneli içerir.",
        },
        technologies: ["React", "FastAPI", "Caddy", "Python", "TypeScript", "Tailwind"],
        images: ["/images/bare-metal-paas-1.webp", "/images/bare-metal-paas-2.webp", "/images/bare-metal-paas-3.webp"],
        links: [
            {
                labelKey: "projects.sourceCode",
                url: "https://github.com/UmutSen2662/bare-metal-paas",
                icon: "github",
            },
        ],
    },
    {
        id: "chat-app",
        title: "ChatApp",
        description: {
            en: "A modern messaging application featuring low-latency text and peer-to-peer voice communication.",
            tr: "Düşük gecikmeli metin ve eşler arası sesli iletişim sunan modern bir mesajlaşma uygulaması.",
        },
        detailedDescription: {
            en: "This app uses WebRTC for secure peer-to-peer audio streaming and Supabase Realtime for signaling and presence management. Developed as a Progressive Web App, it provides a responsive, app-like experience with a focus on efficient real-time data orchestration and serverless architecture.",
            tr: "Bu uygulama, güvenli eşler arası ses akışı için WebRTC'yi ve sinyalizasyon ile varlık takibi için Supabase Realtime'ı kullanır. Bir İlerici Web Uygulaması (PWA) olarak geliştirilen proje, verimli gerçek zamanlı veri orkestrasyonuna ve sunucusuz mimariye odaklanarak uygulama benzeri bir deneyim sunar.",
        },
        technologies: ["React", "Supabase", "Tailwind", "TypeScript", "WebRTC", "Vite PWA"],
        images: ["/images/chat-app-1.webp", "/images/chat-app-2.webp"],
        links: [
            {
                labelKey: "projects.viewLive",
                url: "https://chatapp.umutsen.dev",
                icon: "external",
            },
            {
                labelKey: "projects.sourceCode",
                url: "https://github.com/UmutSen2662/chat-app",
                icon: "github",
            },
        ],
    },
    {
        id: "usrc",
        title: "USrc",
        description: {
            en: "A high-performance video streaming interface aggregating trending content with a local personalized watchlist.",
            tr: "Trend içerikleri yerel ve kişiselleştirilmiş bir izleme listesiyle birleştiren yüksek performanslı bir video akış arayüzü.",
        },
        detailedDescription: {
            en: "Engineered with Next.js 15 App Router to deliver optimized server-side rendering and efficient data fetching from the TMDB API. Utilizes React 19 Server Components for seamless data orchestration while managing client-side state for a persistent, local-storage-based watchlist. The UI is built with Tailwind CSS 4, ensuring a responsive and modern viewing experience across devices.",
            tr: "TMDB API'sinden verimli veri çekimi ve optimize edilmiş sunucu taraflı işleme (SSR) sağlamak için Next.js 15 App Router mimarisi ile geliştirildi. Veri orkestrasyonu için React 19 Sunucu Bileşenlerini kullanırken, yerel depolama tabanlı kalıcı bir izleme listesi için istemci taraflı durum yönetimini idare eder. Arayüz, cihazlar arası duyarlı ve modern bir izleme deneyimi sunmak için Tailwind CSS 4 ile oluşturulmuştur.",
        },
        technologies: ["Next.js", "TypeScript", "TMDB API", "React", "Tailwind"],
        images: ["/images/usrc-1.webp", "/images/usrc-2.webp", "/images/usrc-3.webp"],
        links: [
            {
                labelKey: "projects.viewLive",
                url: "https://usrc.vercel.app",
                icon: "external",
            },
        ],
    },
    {
        id: "mono",
        title: "Mono",
        description: {
            en: "A real-time multiplayer card game featuring Uno-like mechanics, room management, and intelligent bot integration.",
            tr: "Uno benzeri mekaniklere, oda yönetimine ve akıllı bot entegrasyonuna sahip gerçek zamanlı, çok oyunculu bir kart oyunu.",
        },
        detailedDescription: {
            en: "Orchestrates real-time gameplay sessions using Node.js and Socket.io, synchronizing game state across multiple clients with low latency. Features a custom state machine to handle complex rules like penalty stacking and turn reversals, while supporting heuristic-based AI opponents for solo or mixed play.",
            tr: "Node.js ve Socket.io kullanarak gerçek zamanlı oyun oturumlarını yönetir ve oyun durumunu birden fazla istemci arasında düşük gecikmeyle senkronize eder. Ceza katlama ve sıra tersine çevirme gibi karmaşık kuralları işlemek için özel bir durum makinesi (state machine) içerir ve solo veya karma oyun için sezgisel tabanlı yapay zeka rakiplerini destekler.",
        },
        technologies: ["Node.js", "Socket.io", "Express.js", "EJS", "CSS3"],
        images: ["/images/mono-1.webp", "/images/mono-2.webp", "/images/mono-3.webp", "/images/mono-4.webp"],
        links: [
            {
                labelKey: "projects.viewLive",
                url: "https://mono.umutsen.dev",
                icon: "external",
            },
            {
                labelKey: "projects.sourceCode",
                url: "https://github.com/UmutSen2662/mono",
                icon: "github",
            },
        ],
    },
    {
        id: "scheduler",
        title: "Scheduler",
        description: {
            en: "A high-performance PWA for university course scheduling and exam tracking with offline-first capabilities.",
            tr: "Üniversite ders ve sınav takibi için geliştirilmiş, çevrimdışı öncelikli yüksek performanslı bir PWA.",
        },
        detailedDescription: {
            en: "This application consolidates fragmented university scheduling systems into a single, cohesive user experience. Built with Svelte 5 and Vite, it features an offline-first architecture for constant accessibility, using Supabase for secure cloud synchronization and authentication. It includes a protected administrative interface designed for manual data ingestion, ensuring compliance with institutional access policies while maintaining data accuracy.",
            tr: "Parçalı üniversite çizelge sistemlerini tek bir bütünleşik kullanıcı deneyiminde birleştiren bu uygulama, Svelte 5 ve Vite ile inşa edilmiştir. Sürekli erişilebilirlik için çevrimdışı öncelikli bir mimari sunan sistem, güvenli bulut senkronizasyonu ve kimlik doğrulama için Supabase kullanır. Kurumsal erişim politikalarına uyum sağlamak amacıyla, manuel veri girişine izin veren korumalı bir yönetim arayüzü içerir.",
        },
        technologies: ["Svelte", "Supabase", "Vite", "PWA", "JavaScript"],
        images: ["/images/scheduler-1.webp", "/images/scheduler-2.webp", "/images/scheduler-3.webp"],
        links: [
            {
                labelKey: "projects.viewLive",
                url: "https://scheduler.umutsen.dev",
                icon: "external",
            },
            {
                labelKey: "projects.sourceCode",
                url: "https://github.com/UmutSen2662/scheduler",
                icon: "github",
            },
        ],
    },
    {
        id: "metu-gpa-calculator",
        title: {
            en: "METU GPA Calculator",
            tr: "ODTÜ GNO Hesaplayıcı",
        },
        description: {
            en: "A specialized academic performance tracker for METU students that automates complex GPA/CGPA calculations. It features dynamic course management, CSV data portability, and secure authentication via Google OAuth.",
            tr: "ODTÜ öğrencileri için not ortalaması (GNO) ve genel not ortalaması (CGPA) hesaplamalarını otomatize eden kapsamlı bir akademik takip aracı. Dinamik ders yönetimi, dış kaynaklı ders verisi entegrasyonu ve Google OAuth ile güvenli erişim sunar.",
        },
        detailedDescription: {
            en: "Built with Flask and SQLAlchemy, this application utilizes a Model-View-Controller (MVC) architecture to manage user academic histories. It implements custom GPA algorithms to handle course retakes and credit weightings according to university regulations, while HTMX powers reactive, seamless frontend updates without full page reloads. The system integrates with external data sources for course autocomplete and employs robust security features like bcrypt and OAuth.",
            tr: "Flask ve SQLAlchemy tabanlı bu proje, öğrenci notlarını ve ders geçmişlerini yönetmek için ölçeklenebilir bir MVC mimarisi kullanır. Üniversite yönetmeliklerine uygun kredi ağırlıklandırma ve ders tekrarı mantığını işleyen özel algoritmalar içerir; arayüz tarafında ise HTMX ile sayfa yenilemeden reaktif veri güncellemeleri sağlanır. Sistem, bcrypt şifreleme ve OAuth entegrasyonu ile veri güvenliğini ön planda tutar.",
        },
        technologies: ["Python", "Flask", "HTMX", "SQLAlchemy", "Google OAuth", "JavaScript"],
        images: ["/images/metu-gpa-calculator-1.webp"],
        links: [
            {
                labelKey: "projects.viewLive",
                url: "https://metugpacalculator.pythonanywhere.com",
                icon: "external",
            },
            {
                labelKey: "projects.sourceCode",
                url: "https://github.com/UmutSen2662/METU-GPA-Calculator",
                icon: "github",
            },
        ],
    },
];
