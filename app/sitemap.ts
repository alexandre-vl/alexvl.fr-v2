import type { MetadataRoute } from "next";
import { projects } from "./data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
    const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `https://alexvl.fr/projects/${p.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [
        {
            url: "https://alexvl.fr",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        ...projectEntries,
    ];
}

