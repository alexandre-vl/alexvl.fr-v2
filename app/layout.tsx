import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const SITE_URL = "https://alexvl.fr";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Alexandre Vargas Lopez — Fullstack Developer",
        template: "%s | Alexandre Vargas Lopez",
    },
    description:
        "Portfolio of Alexandre Vargas Lopez, a French fullstack developer based in Bordeaux. Specializing in React, Next.js, Vue.js, Go, and real-time SaaS applications.",
    keywords: [
        "Alexandre Vargas Lopez",
        "fullstack developer",
        "web developer",
        "frontend",
        "backend",
        "React",
        "Next.js",
        "Vue.js",
        "Go",
        "Node.js",
        "TypeScript",
        "Bordeaux",
        "France",
        "freelance",
        "portfolio",
    ],
    authors: [{ name: "Alexandre Vargas Lopez", url: SITE_URL }],
    creator: "Alexandre Vargas Lopez",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: SITE_URL,
        siteName: "Alexandre Vargas Lopez",
        title: "Alexandre Vargas Lopez — Fullstack Developer",
        description:
            "French fullstack developer specializing in React, Next.js, Vue.js, Go, and real-time SaaS applications. Available for freelance work.",
    },
    twitter: {
        card: "summary",
        title: "Alexandre Vargas Lopez — Fullstack Developer",
        description:
            "French fullstack developer specializing in React, Next.js, Vue.js, Go, and real-time SaaS applications.",
        creator: "@alexx_vrgs",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: SITE_URL,
    },
    manifest: "/manifest.json",
    icons: {
        icon: [
            { url: "/icon.svg", type: "image/svg+xml" },
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Alexandre V.L",
    },
    other: {
        "theme-color": "#2D2418",
    },
};

/** JSON-LD structured data — Person + WebSite */
function JsonLd() {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": `${SITE_URL}/#person`,
                name: "Alexandre Vargas Lopez",
                alternateName: "Alexandre V.L",
                jobTitle: "Fullstack Developer",
                url: SITE_URL,
                email: "alexandre.vargas.lopez@gmail.com",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Bordeaux",
                    addressCountry: "FR",
                },
                knowsAbout: [
                    "React",
                    "Next.js",
                    "Vue.js",
                    "TypeScript",
                    "Go",
                    "Node.js",
                    "PostgreSQL",
                    "Redis",
                    "Docker",
                    "WebSocket",
                    "REST APIs",
                    "SEO",
                ],
                sameAs: [
                    "https://github.com/alexandre-vl",
                    "https://www.linkedin.com/in/alexandre-vargas-lopez-1b6450233/",
                    "https://twitter.com/alexx_vrgs",
                ],
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: "Alexandre Vargas Lopez — Portfolio",
                description:
                    "Portfolio of Alexandre Vargas Lopez, a French fullstack developer based in Bordeaux.",
                publisher: { "@id": `${SITE_URL}/#person` },
                inLanguage: "en",
            },
            {
                "@type": "CreativeWork",
                name: "Devolab",
                description:
                    "Co-founded web agency based in Bordeaux, France. Delivers end-to-end web solutions — from design and development to deployment on self-managed servers.",
                url: "https://www.devolab.net",
                image: `${SITE_URL}/projects/devolab.webp`,
                creator: { "@id": `${SITE_URL}/#person` },
                dateCreated: "2023",
                dateModified: "2025",
                keywords: ["Vue.js", "Vite", "SEO", "Node.js"],
            },
            {
                "@type": "SoftwareApplication",
                name: "Ontrace",
                description:
                    "A full-featured SaaS platform built for Vinted resellers. Real-time product feed, automated purchasing, advanced filter management, and multi-tenant organization support.",
                applicationCategory: "BusinessApplication",
                url: `${SITE_URL}/projects/ontrace`,
                image: `${SITE_URL}/projects/vynter/banner_yellow.webp`,
                creator: { "@id": `${SITE_URL}/#person` },
                dateCreated: "2024",
                dateModified: "2026",
                keywords: [
                    "Next.js",
                    "React",
                    "Go",
                    "WebSocket",
                    "Redis",
                    "PostgreSQL",
                ],
            },
            {
                "@type": "SoftwareApplication",
                name: "Upsky",
                description:
                    "A copy-trading platform integrating with MetaTrader 5 for real-time order execution and strategy replication.",
                applicationCategory: "FinanceApplication",
                url: `${SITE_URL}/projects/upsky`,
                image: `${SITE_URL}/projects/upsky.webp`,
                creator: { "@id": `${SITE_URL}/#person` },
                dateCreated: "2023",
                dateModified: "2023",
                keywords: [
                    "Vue.js",
                    "Node.js",
                    "MetaTrader 5",
                    "WebSocket",
                ],
            },
            {
                "@type": "SoftwareApplication",
                name: "Yaprof",
                description:
                    "Open-source PWA for French students to collaboratively track teacher attendance via Pronote. Social feed with upvote/downvote verification.",
                applicationCategory: "EducationalApplication",
                url: `${SITE_URL}/projects/yaprof`,
                image: `${SITE_URL}/projects/yaprof.webp`,
                creator: { "@id": `${SITE_URL}/#person` },
                dateCreated: "2022",
                dateModified: "2022",
                keywords: ["Vue 3", "Pronote API", "PWA", "Capacitor"],
                isAccessibleForFree: true,
            },
            {
                "@type": "SoftwareApplication",
                name: "Homeflix",
                description:
                    "Discord bot for hosting movie nights — schedules screenings and streams films via screen-sharing with FFmpeg transcoding.",
                applicationCategory: "EntertainmentApplication",
                url: `${SITE_URL}/projects/homeflix`,
                image: `${SITE_URL}/projects/homeflix.webp`,
                creator: { "@id": `${SITE_URL}/#person` },
                dateCreated: "2022",
                dateModified: "2022",
                keywords: ["Node.js", "Discord.js", "FFmpeg"],
            },
            {
                "@type": "SoftwareApplication",
                name: "Playbot",
                description:
                    "Desktop application for real-time gaming matchmaking by skill level and playstyle. Features quests, leaderboards, and game detection.",
                applicationCategory: "GameApplication",
                url: `${SITE_URL}/projects/playbot`,
                image: `${SITE_URL}/projects/playbot.webp`,
                creator: { "@id": `${SITE_URL}/#person` },
                dateCreated: "2023",
                dateModified: "2023",
                keywords: ["Electron", "Nuxt.js", "NestJS"],
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <JsonLd />
            </head>
            <body>{children}</body>
        </html>
    );
}
