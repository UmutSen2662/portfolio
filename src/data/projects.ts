import type { Project } from "@/lib/types";

export const PROJECTS: Project[] = [
    {
        id: "bare-metal-paas",
        translations: {
            en: {
                title: "Bare Metal PaaS",
                description:
                    "A high-performance, self-hosted deployment platform that orchestrates native Linux processes, eliminating container overhead.",
                detailedDescription:
                    "This platform automates the entire application lifecycle directly on the host OS, managing Git deployments, Systemd services, and Caddy reverse proxy configurations in real-time. It enforces strict security isolation by generating dedicated Linux users for each application and supports a wide range of runtimes including Node.js, Python, Go, and static sites. The system features built-in CI/CD webhooks, zero-downtime updates, and a modern React 19 dashboard for monitoring system health and application logs.",
            },
            tr: {
                title: "Bare Metal PaaS",
                description:
                    "Konteyner ek yükünü ortadan kaldıran, yerel Linux süreçlerini yöneten, yüksek performanslı ve kendi sunucunuzda barındırılan dağıtım platformu.",
                detailedDescription:
                    "Bu platform, Git dağıtımlarını, Systemd servislerini ve Caddy ters proxy yapılandırmalarını gerçek zamanlı olarak yöneterek uygulama yaşam döngüsünü doğrudan ana işlet sistemi üzerinde otomatikleştirir. Her uygulama için özel Linux kullanıcıları oluşturarak sıkı güvenlik izolasyonu sağlar ve Node.js, Python, Go ve statik siteler dahil olmak üzere geniş bir çalışma zama yelpazesini destekler. Sistem, yerleşik CI/CD webhook'ları, sıfır kesintili güncellemeler ve sistem sağlığı ile uygulama loglarını izlemek için modern bir React 19 paneli içerir.",
            },
        },
        technologies: ["React", "FastAPI", "Caddy", "Python", "TypeScript", "Tailwind"],
        images: ["https://placehold.co/1920x1080"],
        links: [
            {
                title: "View Live",
                url: "",
                icon: "external",
            },
            {
                title: "Source Code",
                url: "",
                icon: "github",
            },
        ],
    },
    {
        id: "chat-app",
        translations: {
            en: {
                title: "ChatApp",
                description:
                    "A modern messaging application featuring low-latency text and peer-to-peer voice communication.",
                detailedDescription:
                    "This app uses WebRTC for secure peer-to-peer audio streaming and Supabase Realtime for signaling and presence management. Developed as a Progressive Web App, it provides a responsive, app-like experience with a focus on efficient real-time data orchestration and serverless architecture.",
            },
            tr: {
                title: "ChatApp",
                description:
                    "Düşük gecikmeli metin ve eşler arası sesli iletişim sunan modern bir mesajlaşma uygulaması.",
                detailedDescription:
                    "Bu uygulama, güvenli eşler arası ses akışı için WebRTC'yi ve sinyalizasyon ile varlık takibi için Supabase Realtime'ı kullanır. Bir İlerici Web Uygulaması (PWA) olarak geliştirilen proje, verimli gerçek zamanlı veri orkestrasyonuna ve sunucusuz mimariye odaklanarak uygulama benzeri bir deneyim sunar.",
            },
        },
        technologies: ["React", "Supabase", "Tailwind", "TypeScript", "WebRTC", "Vite PWA"],
        images: ["https://placehold.co/1920x1080"],
        links: [
            {
                title: "View Live",
                url: "",
                icon: "external",
            },
            {
                title: "Source Code",
                url: "",
                icon: "github",
            },
        ],
    },
    {
        id: "usrc",
        translations: {
            en: {
                title: "USrc",
                description:
                    "A high-performance video streaming interface aggregating trending content with a local personalized watchlist.",
                detailedDescription:
                    "Engineered with Next.js 15 App Router to deliver optimized server-side rendering and efficient data fetching from the TMDB API. Utilizes React 19 Server Components for seamless data orchestration while managing client-side state for a persistent, local-storage-based watchlist. The UI is built with Tailwind CSS 4, ensuring a responsive and modern viewing experience across devices.",
            },
            tr: {
                title: "USrc",
                description:
                    "Trend içerikleri yerel ve kişiselleştirilmiş bir izleme listesiyle birleştiren yüksek performanslı bir video akış arayüzü.",
                detailedDescription:
                    "TMDB API'sinden verimli veri çekimi ve optimize edilmiş sunucu taraflı işleme (SSR) sağlamak için Next.js 15 App Router mimarisi ile geliştirildi. Veri orkestrasyonu için React 19 Sunucu Bileşenlerini kullanırken, yerel depolama tabanlı kalıcı bir izleme listesi için istemci taraflı durum yönetimini idare eder. Arayüz, cihazlar arası duyarlı ve modern bir izleme deneyimi sunmak için Tailwind CSS 4 ile oluşturulmuştur.",
            },
        },
        technologies: ["Next.js", "TypeScript", "TMDB API", "React", "Tailwind"],
        images: ["https://placehold.co/1920x1080"],
        links: [
            {
                title: "View Live",
                url: "",
                icon: "external",
            },
            {
                title: "Source Code",
                url: "",
                icon: "github",
            },
        ],
    },
    {
        id: "mono",
        translations: {
            en: {
                title: "Mono",
                description:
                    "A real-time multiplayer card game featuring Uno-like mechanics, room management, and intelligent bot integration.",
                detailedDescription:
                    "Orchestrates real-time gameplay sessions using Node.js and Socket.io, synchronizing game state across multiple clients with low latency. Features a custom state machin to handle complex rules like penalty stacking and turn reversals, while supporting heuristic-based AI opponents for solo or mixed play.",
            },
            tr: {
                title: "Mono",
                description:
                    "Uno benzeri mekaniklere, oda yönetimine ve akıllı bot entegrasyonuna sahip gerçek zamanlı, çok oyunculu bir kart oyunu.",
                detailedDescription:
                    "Node.js ve Socket.io kullanarak gerçek zamanlı oyun oturumlarını yönetir ve oyun durumunu birden fazla istemci arasında düşük gecikmeyle senkronize eder. Ceza katlama sıra tersine çevirme gibi karmaşık kuralları işlemek için özel bir durum makinesi (state machine) içerir ve solo veya karma oyun için sezgisel tabanlı yapay zeka rakiplerini destekler.",
            },
        },
        technologies: ["Node.js", "Socket.io", "Express.js", "EJS", "CSS3"],
        images: ["https://placehold.co/1920x1080"],
        links: [
            {
                title: "View Live",
                url: "",
                icon: "external",
            },
            {
                title: "Source Code",
                url: "",
                icon: "github",
            },
        ],
    },
    {
        id: "scheduler",
        translations: {
            en: {
                title: "Scheduler",
                description:
                    "A high-performance PWA for university course scheduling and exam tracking with offline-first capabilities.",
                detailedDescription:
                    "This application consolidates fragmented university scheduling systems into a single, cohesive user experience. Built with Svelte 5 and Vite, it features an offline-first architecture for constant accessibility, using Supabase for secure cloud synchronization and authentication. It includes a protected administrative interface designed for manual data ingestion, ensuring compliance with institutional access policies while maintaining data accuracy.",
            },
            tr: {
                title: "Scheduler",
                description:
                    "Üniversite ders ve sınav takibi için geliştirilmiş, çevrimdışı öncelikli yüksek performanslı bir PWA.",
                detailedDescription:
                    "Parçalı üniversite çizelge sistemlerini tek bir bütünleşik kullanıcı deneyiminde birleştiren bu uygulama, Svelte 5 ve Vite ile inşa edilmiştir. Sürekli erişilebilirlik için çevrimdışı öncelikli bir mimari sunan sistem, güvenli bulut senkronizasyonu ve kimlik doğrulama için Supabase kullanır. Kurumsal erişim politikalarına uyum sağlamak amacıyla, manuel veri girişine iz veren korumalı bir yönetim arayüzü içerir.",
            },
        },
        technologies: ["Svelte", "Supabase", "Vite", "PWA", "JavaScript"],
        images: ["https://placehold.co/1920x1080"],
        links: [
            { title: "View Live", url: "", icon: "external" },
            { title: "Source Code", url: "", icon: "github" },
        ],
    },
    {
        id: "metu-gpa-calculator",
        translations: {
            en: {
                title: "METU GPA Calculator",
                description:
                    "A specialized academic performance tracker for METU students that automates complex GPA/CGPA calculations. It features dynamic course management, CSV data portability, and secure authentication via Google OAuth.",
                detailedDescription:
                    "Built with Flask and SQLAlchemy, this application utilizes a Model-View-Controller (MVC) architecture to manage user academic histories. It implements custom GPA algorithms to handle course retakes and credit weightings according to university regulations, while HTMX powers reactive, seamless frontend updates without full page reloads. The system integrates with external data sources for course autocomplete and employs robust security features like bcrypt and OAuth.",
            },
            tr: {
                title: "ODTÜ GNO Hesaplayıcı",
                description:
                    "ODTÜ öğrencileri için not ortalaması (GNO) ve genel not ortalaması (CGPA) hesaplamalarını otomatize eden kapsamlı bir akademik takip aracı. Dinamik ders yönetimi, dış kaynaklı ders verisi entegrasyonu ve Google OAuth ile güvenli erişim sunar.",
                detailedDescription:
                    "Flask ve SQLAlchemy tabanlı bu proje, öğrenci notlarını ve ders geçmişlerini yönetmek için ölçeklenebilir bir MVC mimarisi kullanır. Üniversite yönetmeliklerine uygun kredi ağırlıklandırma ve ders tekrarı mantığını işleyen özel algoritmalar içerir; arayüz tarafında ise HTMX ile sayfa yenilemeden reaktif veri güncellemeleri sağlanır. Sistem, bcrypt şifreleme ve OAuth entegrasyonu ile veri güvenliğini ön planda tutar.",
            },
        },
        technologies: ["Python", "Flask", "HTMX", "SQLAlchemy", "Google OAuth", "JavaScript"],
        images: ["https://placehold.co/1920x1080"],
        links: [
            {
                title: "View Live",
                url: "https://metugpacalculator.pythonanywhere.com/",
                icon: "external",
            },
            {
                title: "Source Code",
                url: "",
                icon: "github",
            },
        ],
    },
];
