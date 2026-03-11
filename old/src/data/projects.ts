import type { Project } from "./types";

export const PROJECTS: Project[] = [
    {
        id: "bare-metal-paas",
        title: "Bare Metal PaaS",
        description: {
            en: "An orchestration engine managing native Linux processes with atomic Git deployments and isolated runtime security.",
            tr: "Yerel Linux süreçlerini yöneten, atomik dağıtım ve izole güvenlik sunan süreç orkestrasyon motoru.",
        },
        detailedDescription: {
            en: "This platform automates the application lifecycle directly on the host OS, utilizing Mise for isolated runtime management to eliminate container overhead. It orchestrates atomic Git deployments via a custom file-based LockManager to prevent build race conditions, alongside Systemd services and Caddy reverse proxy configurations. It enforces strict security isolation by generating dedicated Linux users for each application and supports a wide range of runtimes including Node.js, Python, Go, and static sites. The system features built-in CI/CD webhooks, zero-downtime updates, and a modern React 19 dashboard for monitoring system health and application logs.",
            tr: "Bu platform, konteyner ek yükünü ortadan kaldırmak için Mise kullanarak izole çalışma zamanı yönetimini sağlar ve uygulama yaşam döngüsünü doğrudan ana işletim sistemi üzerinde otomatikleştirir. Derleme sırasında oluşabilecek yarış koşullarını önlemek için özel dosya tabanlı bir LockManager aracılığıyla atomik Git dağıtımlarını, Systemd servislerini ve Caddy ters proxy yapılandırmalarını yönetir. Her uygulama için özel Linux kullanıcıları oluşturarak sıkı güvenlik izolasyonu sağlar ve Node.js, Python, Go ve statik siteler dahil olmak üzere geniş bir çalışma zamanı yelpazesini destekler. Sistem, yerleşik CI/CD webhook'ları, sıfır kesintili güncellemeler ve sistem sağlığı ile uygulama loglarını izlemek için modern bir React 19 paneli içerir.",
        },
        technologies: ["React", "TypeScript", "FastAPI", "Python", "Tailwind", "Systemd", "Caddy", "CI/CD"],
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
            en: "Secure PWA messeging platform featuring WebRTC audio, real-time presence, and local image optimization.",
            tr: "WebRTC ses, anlık durum takibi ve görsel optimizasyonlu güvenli PWA mesajlaşma platformu.",
        },
        detailedDescription: {
            en: "This app leverages WebRTC with asynchronous candidate queueing to resolve connection race conditions, ensuring stable peer-to-peer audio streaming. It uses Supabase Realtime for signaling, while a custom real-time synchronization engine built on PostgreSQL Change Data Capture (CDC) ensures robust room state consistency. Developed as a PWA, it also optimizes performance by compressing images (Canvas to WebP) in-browser, providing a responsive, app-like experience.",
            tr: "Bu uygulama, güvenli eşler arası ses akışı için asenkron candidate queueing ile güçlendirilmiş WebRTC altyapısını kullanır ve bağlantı yarış koşullarını (race conditions) ortadan kaldırır. Sinyalizasyon için Supabase Realtime kullanılırken, PostgreSQL Change Data Capture (CDC) üzerine inşa edilen özel bir gerçek zamanlı senkronizasyon motoru, oda durumunun tutarlılığını garanti eder. PWA olarak geliştirilen proje, görselleri tarayıcıda sıkıştırarak (Canvas → WebP) performansı optimize eder ve uygulama benzeri akıcı bir deneyim sunar.",
        },
        technologies: ["React", "Supabase", "Tailwind", "WebRTC", "TypeScript", "PWA", "PostgreSQL"],
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
            en: "High-performance media interface using React Server Components, ISR caching, and cross-origin state sync.",
            tr: "React Sunucu Bileşenleri, ISR ve çapraz köken senkronizasyonlu yüksek performanslı medya arayüzü.",
        },
        detailedDescription: {
            en: "Engineered with Next.js 15 App Router to deliver optimized server-side rendering. Utilizes React 19 Server Components for seamless data orchestration and Next.js Incremental Static Regeneration (ISR) to reduce API load. It manages client-side state for a watchlist, and implements secure cross-origin communication using the HTML5 postMessage API to synchronize state with external video player iframes. The UI is built with Tailwind CSS 4, ensuring a responsive and modern viewing experience across devices.",
            tr: "TMDB API'sinden verimli veri çekimi için Next.js 15 App Router mimarisi ile geliştirildi. Veri orkestrasyonu için React 19 Sunucu Bileşenlerini kullanırken, API yükünü hafifletmek amacıyla Next.js Incremental Static Regeneration (ISR) teknolojisinden yararlanır. Ayrıca, harici video oynatıcı iframe'leri ile durum senkronizasyonunu sağlamak için HTML5 postMessage API kullanarak güvenli bir çapraz kökenli (cross-origin) iletişim mekanizması uygular. Arayüz, cihazlar arası duyarlı ve modern bir izleme deneyimi sunmak için Tailwind CSS 4 ile oluşturulmuştur.",
        },
        technologies: ["Next.js", "Tailwind", "React", "TypeScript", "TMDB API"],
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
            en: "Event-driven card game engine with low-latency sync, deterministic rules, and adaptive AI integration.",
            tr: "Düşük gecikmeli senkronizasyon, deterministik kurallar ve yapay zeka destekli olay güdümlü oyun motoru.",
        },
        detailedDescription: {
            en: "Engineered a real-time, event-driven game server using Node.js and Socket.io to synchronize state across clients with low latency. Implemented a deterministic state machine to enforce complex rule sets—such as penalty stacking and turn reversals—and integrated heuristic-based AI agents for adaptive single-player and mixed-mode gameplay.",
            tr: "Node.js ve Socket.io kullanarak, istemciler arasında düşük gecikmeyle durum senkronizasyonu sağlayan gerçek zamanlı ve olay güdümlü (event-driven) bir oyun sunucusu geliştirdim. Ceza katlama ve sıra tersine çevirme gibi karmaşık kural setlerini dayatmak için deterministik bir durum makinesi (state machine) uyguladım ve adaptif tek/karma oyun modları için sezgisel tabanlı yapay zeka ajanlarını entegre ettim.",
        },
        technologies: ["Node.js", "Socket.io", "Express.js", "EJS", "CSS", "JavaScript"],
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
            en: "Offline-first academic PWA consolidating scheduling data via local persistence and secure access control.",
            tr: "Yerel kalıcılık ve güvenli erişim kontrolü ile verileri birleştiren çevrimdışı öncelikli akademik PWA.",
        },
        detailedDescription: {
            en: "Consolidates fragmented academic scheduling data into a unified, high-performance PWA. Built with Svelte 5 and Vite, it employs an offline-first architecture with local persistence strategies to ensure uninterrupted access. The system leverages Supabase for real-time cloud synchronization and Row Level Security (RLS), featuring a Role-Based Access Control (RBAC) administrative interface for secure, compliant data ingestion.",
            tr: "Parçalı akademik program verilerini birleştiren, yüksek performanslı bir PWA. Svelte 5 ve Vite ile geliştirilen uygulama, kesintisiz erişim sağlamak için yerel kalıcılık stratejilerine sahip çevrimdışı öncelikli (offline-first) bir mimari kullanır. Gerçek zamanlı bulut senkronizasyonu ve Satır Düzeyinde Güvenlik (RLS) için Supabase'den yararlanan sistem, güvenli ve uyumlu veri girişi için Rol Tabanlı Erişim Kontrolü (RBAC) içeren bir yönetim arayüzü sunar.",
        },
        technologies: ["Svelte", "Supabase", "PWA", "Vite", "JavaScript"],
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
            en: "Scalable MVC academic tracker automating grading algorithms with reactive server-side UI updates.",
            tr: "Reaktif sunucu arayüzü ve MVC mimarisi ile not hesaplamalarını otomatize eden akademik sistem.",
        },
        detailedDescription: {
            en: "Architected a scalable academic tracking system using Flask and SQLAlchemy within an MVC pattern. Implemented complex aggregation algorithms to handle course repeats and credit weighting logic in strict compliance with university bylaws. Leverages HTMX for server-driven UI updates to achieve Single Page Application (SPA) interactivity with server-side simplicity, secured by OAuth authentication and bcrypt hashing.",
            tr: "Flask ve SQLAlchemy kullanarak MVC mimarisi içinde ölçeklenebilir bir akademik takip sistemi mimarisi kurguladım. Üniversite yönetmeliklerine tam uyum sağlamak için ders tekrarlarını ve kredi ağırlıklandırma mantığını işleyen karmaşık toplama (aggregation) algoritmaları geliştirdim. Sunucu taraflı sadelikle Tek Sayfalı Uygulama (SPA) etkileşimi elde etmek için HTMX kullandım ve sistemi OAuth kimlik doğrulama ve bcrypt şifreleme ile güvence altına aldım.",
        },
        technologies: ["Python", "Flask", "HTMX", "SQLAlchemy", "JavaScript", "Google OAuth"],
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
