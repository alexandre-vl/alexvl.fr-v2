import { projects } from "../../data/projects";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

const SITE_URL = "https://alexvl.fr";

type Params = Promise<{ slug: string }>;

/**
 * Generate static paths for all projects at build time.
 */
export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.id }));
}

/**
 * Generate rich SEO metadata for each project page.
 */
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);
    if (!project) return {};

    const title = `${project.name} — ${project.type}`;
    const description = project.description;

    return {
        title,
        description,
        openGraph: {
            type: "article",
            url: `${SITE_URL}/projects/${project.id}`,
            title: `${project.name} — Alexandre Vargas Lopez`,
            description,
            siteName: "Alexandre Vargas Lopez",
            images: project.thumbnail ? [{ url: `${SITE_URL}${project.thumbnail}`, width: 1200, height: 630 }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.name} — Alexandre Vargas Lopez`,
            description,
            creator: "@alexx_vrgs",
        },
        alternates: {
            canonical: `${SITE_URL}/projects/${project.id}`,
        },
    };
}

/**
 * JSON-LD structured data for this specific project.
 */
function ProjectJsonLd({ project }: { project: (typeof projects)[number] }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": project.url ? "SoftwareApplication" : "CreativeWork",
        name: project.name,
        description: project.description,
        ...(project.url && { url: project.url }),
        image: `${SITE_URL}${project.thumbnail}`,
        creator: {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            name: "Alexandre Vargas Lopez",
        },
        dateCreated: project.year,
        keywords: project.tech,
        ...(project.type === "SaaS Platform" && { applicationCategory: "BusinessApplication" }),
        ...(project.type === "Trading Platform" && { applicationCategory: "FinanceApplication" }),
        ...(project.type === "Mobile PWA" && { applicationCategory: "EducationalApplication" }),
        ...(project.type === "Desktop Application" && { applicationCategory: "GameApplication" }),
        ...(project.type === "Discord Bot" && { applicationCategory: "EntertainmentApplication" }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

/**
 * SEO-only project page.
 * Renders metadata + JSON-LD for crawlers, then client-redirects human visitors
 * to the homepage where the project modal will open.
 */
export default async function ProjectPage({ params }: { params: Params }) {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);
    if (!project) notFound();

    redirect(`/?project=${project.id}`);

    return (
        <>
            <ProjectJsonLd project={project} />
            <main style={{ padding: "40px", maxWidth: 600, margin: "0 auto" }}>
                <h1>{project.name}</h1>
                <p>{project.type} — {project.role} ({project.year})</p>
                <p>{project.description}</p>
                <div>
                    <strong>Tech:</strong> {project.tech.join(", ")}
                </div>
                {project.url && (
                    <p><a href={project.url}>Visit Website</a></p>
                )}
                {project.github && (
                    <p><a href={project.github}>View Source</a></p>
                )}
            </main>
        </>
    );
}
