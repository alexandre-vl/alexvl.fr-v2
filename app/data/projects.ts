export interface Project {
    id: string;
    name: string;
    shortDesc: string;
    description: string;
    type: string;
    role: string;
    year: string;
    url: string | null;
    github: string | null;
    thumbnail: string;
    thumbnailPosition?: string;
    images: string[];
    tileColor: string; // unified warm palette color for the tile
    icon: string; // monogram letter or short text
    accentColor: string;
    tech: string[];
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: "devolab",
        name: "Devolab",
        shortDesc: "Web agency — custom sites & self-hosted infrastructure",
        description:
            "Co-founded web agency based in Bordeaux, France. Devolab delivers end-to-end web solutions — from design and development to deployment on self-managed servers. The agency offers custom website creation, SEO optimization, and ongoing hosting and maintenance for businesses.",
        type: "Web Agency",
        role: "Co-Founder & Lead Developer",
        year: "2023",
        url: "https://www.devolab.net",
        github: null,
        thumbnail: "/projects/devolab.webp",
        thumbnailPosition: "top",
        images: ["/projects/devolab.webp"],
        tileColor: "var(--tile-sage)",
        icon: "Dv",
        accentColor: "#6B7F5E",
        tech: ["Vue.js", "Vite", "SEO", "Node.js", "Self-Hosted"],
        featured: true,
    },
    {
        id: "ontrace",
        name: "Ontrace",
        shortDesc: "Vinted automation SaaS — real-time feed & autocop",
        description:
            "A full-featured SaaS platform built for Vinted resellers. Provides a real-time product feed with millisecond-level detection, automated purchasing (autocop), advanced filter management, order tracking, and built-in messaging. Features a CRM with sales stats, wardrobe management, and multi-tenant organization support via WebSocket-powered live updates.",
        type: "SaaS Platform",
        role: "Founder & Fullstack Developer",
        year: "2024",
        url: null,
        github: null,
        thumbnail: "/projects/vynter/banner_yellow.webp",
        thumbnailPosition: "center",
        images: [
            "/projects/vynter/feed.webp",
            "/projects/vynter/connect.webp",
            "/projects/vynter/multi_accounts.webp",
            "/projects/vynter/notifs_push.webp",
            "/projects/vynter/anti_ban.webp",
        ],
        tileColor: "var(--tile-sand)",
        icon: "On",
        accentColor: "#8B7E6A",
        tech: ["Next.js", "React", "Go", "WebSocket", "Redis", "PostgreSQL"],
        featured: true,
    },
    {
        id: "readycook",
        name: "ReadyCook",
        shortDesc: "Vinted seller CRM — inventory, scheduling & analytics",
        description:
            "An all-in-one management platform for Vinted resellers. ReadyCook provides stock management, strategic listing scheduling with automated publication, real-time order tracking, 1-click shipping label downloads, multi-account management, and detailed financial reports. Built to streamline every aspect of running a reselling business on Vinted, from inventory to revenue analytics.",
        type: "SaaS Platform",
        role: "Founder & Fullstack Developer",
        year: "2024",
        url: null,
        github: null,
        thumbnail: "/projects/readycook.webp",
        thumbnailPosition: "center",
        images: [
            "/projects/readycook.webp",
            "/projects/readycook_preview1.webp",
            "/projects/readycook_preview2.webp",
        ],
        tileColor: "var(--tile-moss)",
        icon: "Rc",
        accentColor: "#7BAF3E",
        tech: ["Next.js", "React", "Go", "PostgreSQL", "Redis"],
        featured: true,
    },
    {
        id: "upsky",
        name: "Upsky",
        shortDesc: "Crypto copy-trading platform — MetaTrader 5",
        description:
            "A copy-trading platform that lets users effortlessly replicate professional traders' strategies. Integrates directly with MetaTrader 5 for real-time order execution, with features including trader discovery, strategy performance analytics, and account security. Developed with a working backend connected to live MetaTrader APIs, but ultimately not launched.",
        type: "Trading Platform",
        role: "Co-Founder & Developer",
        year: "2023",
        url: null,
        github: null,
        thumbnail: "/projects/upsky.webp",
        thumbnailPosition: "top",
        images: ["/projects/upsky.webp"],
        tileColor: "var(--tile-clay)",
        icon: "Up",
        accentColor: "#9B8B78",
        tech: ["Vue.js", "Node.js", "MetaTrader 5", "WebSocket", "REST APIs"],
    },
    {
        id: "yaprof",
        name: "Yaprof",
        shortDesc: "Student app — collaborative teacher attendance via Pronote",
        description:
            "Open-source Progressive Web App for French high school students. Connects to Pronote and provides a social feed where students post teacher absence reports — verified by the community through an upvote/downvote system. Features user profiles linked to school and class info, a coin-based gamification layer, and real-time collaborative data.",
        type: "Mobile PWA",
        role: "Creator & Developer",
        year: "2022",
        url: null,
        github: "https://github.com/Yaprof/yaprof-app",
        thumbnail: "/projects/yaprof.webp",
        thumbnailPosition: "top",
        images: ["/projects/yaprof.webp"],
        tileColor: "var(--tile-moss)",
        icon: "Ya",
        accentColor: "#6B7F5E",
        tech: ["Vue 3", "Pronote API", "PWA", "Capacitor"],
    },
    {
        id: "homeflix",
        name: "Homeflix",
        shortDesc: "Discord bot — movie scheduling & screen sharing",
        description:
            "A Discord bot and companion server for hosting movie nights. Schedules screenings and streams movies directly into voice channels using Discord's screen-sharing feature, with FFmpeg handling video transcoding and playback. Community members could browse a movie catalog, vote on what to watch, and join live sessions.",
        type: "Discord Bot",
        role: "Creator & Developer",
        year: "2022",
        url: null,
        github: null,
        thumbnail: "/projects/homeflix.webp",
        thumbnailPosition: "top",
        images: ["/projects/homeflix.webp"],
        tileColor: "var(--tile-stone)",
        icon: "Hf",
        accentColor: "#8B8580",
        tech: ["Node.js", "Discord.js", "FFmpeg", "Screen Sharing"],
    },
    {
        id: "playbot",
        name: "Playbot",
        shortDesc: "Desktop app — real-time gaming matchmaking & quests",
        description:
            "A desktop application for gamers to find teammates matched by skill level, playstyle, and game preferences in real time. Features a rich dashboard with daily quests and coin rewards, a global leaderboard, friend lists with online status, live game detection, and a subscription tier. Developed as a full product but ultimately not launched.",
        type: "Desktop Application",
        role: "Creator & Developer",
        year: "2023",
        url: null,
        github: null,
        thumbnail: "/projects/playbot.webp",
        thumbnailPosition: "top",
        images: ["/projects/playbot.webp"],
        tileColor: "var(--tile-dune)",
        icon: "Pb",
        accentColor: "#A08B75",
        tech: ["Electron", "Nuxt.js", "NestJS", "Real-time"],
    },
];
